import type { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg'; // Asumiendo que usas 'pg'

// Tu configuración de pool existente
const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: Number(process.env.PGPORT),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const client = await pool.connect(); // Obtener un cliente exclusivo

  try {
    const { productId } = req.body;

    // 1. INICIAR LA TRANSACCIÓN
    await client.query('BEGIN');

    // 2. VERIFICAR Y BLOQUEAR (SELECT ... FOR UPDATE)
    // Esto es CLAVE: 'FOR UPDATE' bloquea la fila del producto.
    // Nadie más puede leer ni modificar este producto hasta que tú termines.
    const productRes = await client.query(
      'SELECT price, stock FROM products WHERE id = $1 FOR UPDATE', 
      [productId]
    );

    if (productRes.rows.length === 0) {
      throw new Error('Producto no encontrado');
    }

    const product = productRes.rows[0];

    // (Opcional) Verificar si hay stock
    /*
    if (product.stock <= 0) {
      throw new Error('Sin stock');
    }
    */

    // 3. REGISTRAR LA TRANSACCIÓN (COMPRA)
    const insertRes = await client.query(
      `INSERT INTO transactions (product_id, amount, status) 
       VALUES ($1, $2, 'completed') RETURNING id`,
      [productId, product.price]
    );

    // 4. ACTUALIZAR STOCK (Opcional, pero recomendado)
    /*
    await client.query(
      'UPDATE products SET stock = stock - 1 WHERE id = $1',
      [productId]
    );
    */

    // 5. CONFIRMAR TODO (COMMIT)
    // Recién aquí se guardan los cambios permanentemente.
    await client.query('COMMIT');

    res.status(200).json({ 
      message: 'Compra OK', 
      transactionId: insertRes.rows[0].id 
    });

  } catch (error) {
    // 6. SI ALGO FALLA, DESHACER TODO (ROLLBACK)
    await client.query('ROLLBACK');
    console.error('Error en transacción:', error);
    res.status(500).json({ message: 'Error procesando compra' });
  } finally {
    // 7. LIBERAR EL CLIENTE
    client.release();
  }
}