import { Pool } from 'pg';

// El 'Pool' es la forma correcta de manejar conexiones en una
// aplicación web. Reutiliza conexiones y previene sobrecargas.
const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: Number(process.env.PGPORT),
  ssl: false // Puedes necesitar 'true' si usas SSL, para tu VM local es 'false'
});

/**
 * Función genérica para hacer consultas.
 * Maneja la obtención y liberación de clientes del pool.
 */
export const query = (text: string, params: any[]) => {
  return pool.query(text, params);
};

// (Nota: Tendrás que reiniciar tu servidor de desarrollo 
// de Next.js (Ctrl+C y 'npm run dev') para que lea el .env.local)