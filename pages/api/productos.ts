import type { NextApiRequest, NextApiResponse } from 'next';
import { query } from '@/lib/db'; // ¡Usamos tu conector!

/**
 * ENDPOINT DE LECTURA 1: CONSULTA DE PRODUCTOS (CATÁLOGO)
 * Este endpoint cumple con la solicitud de "consulta de producto".
 * Devuelve la lista completa de productos.
 * JMeter atacará: GET /api/productos
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Método ${req.method} no permitido`);
  }

  try {
    // 1. Ejecuta la consulta (usamos la tabla 'products' en inglés)
    const sql = 'SELECT id, name, price, imageurl, description FROM products ORDER BY id ASC';
    const { rows } = await query(sql, []);

    // 2. Devuelve los resultados
    res.status(200).json(rows);

  } catch (error) {
    console.error('Error en API /api/productos:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}