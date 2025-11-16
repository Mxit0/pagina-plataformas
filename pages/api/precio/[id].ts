import type { NextApiRequest, NextApiResponse } from 'next';
import { query } from '@/lib/db'; // ¡Usamos tu conector!

/**
 * ENDPOINT DE LECTURA 2: CONSULTA DE PRECIO (ESPECÍFICO)
 * Este endpoint cumple con la solicitud de "consulta específica de precio".
 * Devuelve solo el precio de un producto específico.
 * JMeter atacará: GET /api/precio/1 (o /2, /3)
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Método ${req.method} no permitido`);
  }

  // 1. Obtenemos el ID de la URL (ej. /api/precio/1)
  const { id } = req.query;

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ message: 'ID de producto no válido' });
  }

  try {
    // 2. Ejecuta la consulta para OBTENER SOLO EL PRECIO
    const sql = 'SELECT id, price FROM products WHERE id = $1';
    const { rows } = await query(sql, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    // 3. Devuelve el resultado
    res.status(200).json(rows[0]);

  } catch (error) {
    console.error(`Error en API /api/precio/${id}:`, error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}