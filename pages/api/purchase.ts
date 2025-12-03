import type { NextApiRequest, NextApiResponse } from 'next';
import { query } from '@/lib/db'; // Importa tu conexión a la BD

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // 1. Solo permite peticiones POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const { productId } = req.body;

    // 2. Valida la entrada
    if (!productId) {
      return res.status(400).json({ message: 'Error: Falta productId' });
    }

    // 3. Inserta el registro en la base de datos
    // (Asumiendo que tienes una tabla 'transactions')
    const sql = `
      INSERT INTO transactions (product_id, amount, status)
      VALUES ($1, (SELECT price FROM products WHERE id = $1), 'completed')
      RETURNING id;
    `;
    
    const { rows } = await query(sql, [productId]);
    
    // 4. Devuelve una respuesta exitosa
    return res.status(200).json({ 
      message: 'Compra registrada con éxito',
      transactionId: rows[0].id 
    });

  } catch (error: any) {
    console.error('Error en API /api/purchase:', error);
    return res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
}