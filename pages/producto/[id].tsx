import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { Geist } from "next/font/google";
import Header from '@/components/Header';
import { useState } from 'react';
import { query } from '@/lib/db'; // 👈 1. Importa la BD
import type { GetServerSideProps } from 'next'; // 👈 Importa el tipo

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// ... (Geist se queda igual) ...

// ❌ 2. ELIMINA EL ARRAY 'mockProducts' DE AQUÍ ❌

/**
 * Página de detalle de producto.
 * Recibe 'product' como prop desde el servidor.
 */
// 3. Recibe 'product' como prop
export default function ProductoPage({ product }: { product: any }) {
  const router = useRouter();
  const [message, setMessage] = useState('');

  // 4. Modificamos la simulación de compra (ver Paso 5)
  const handlePurchase = async () => {
    setMessage('Procesando compra real...');
    
    try {
      // Usamos 'fetch' para llamar a nuestra propia API
      const response = await fetch('/api/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId: product.id }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error en la compra');
      }
      
      setMessage(`¡Compra registrada con éxito para ${product.name}!`);

    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
    }

    // Oculta el mensaje después de 3 segundos
    setTimeout(() => {
      setMessage('');
    }, 3000);
  };

  // 5. La lógica de 'producto no encontrado' ahora funciona con los datos reales
  if (!product) {
    return (
      <div className={`${geistSans.className} font-sans min-h-screen bg-gray-100 dark:bg-gray-900`}>
        <Header />
        <main className="container mx-auto p-8 text-center">
          <h1 className="text-2xl font-bold dark:text-white">Producto no encontrado</h1>
          <Link href="/" className="text-blue-600 hover:underline mt-4 inline-block">
            Volver al catálogo
          </Link>
        </main>
      </div>
    );
  }

  // 6. El resto de la página usa el prop 'product'
  return (
    <div className={`${geistSans.className} font-sans min-h-screen bg-gray-100 dark:bg-gray-900`}>
      <Header />
      <main className="container mx-auto p-6 sm:p-8">
        <div className="flex flex-col md:flex-row gap-8 bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
          
          <div className="md:w-1/2">
            <Image
              src={product.imageurl}
              alt={product.name}
              width={800}
              height={600}
              className="w-full rounded-lg object-cover border dark:border-gray-700"
              unoptimized={true}
            />
          </div>
          
          <div className="md:w-1/2 flex flex-col">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-50">{product.name}</h1>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 my-4">
              ${Number(product.price).toFixed(2)}
            </p>
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
              {product.description}
            </p>

            <div className="mt-auto">
              <button
                onClick={handlePurchase}
                className="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-green-700 transition-colors duration-300"
              >
                Simular Compra (Real en BD)
              </button>
              
              {message && (
                <p className={`mt-4 text-center font-medium ${message.startsWith('Error') ? 'text-red-600' : 'text-green-700 dark:text-green-400'}`}>
                  {message}
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/**
 * 7. SSR para la página de detalle
 * Obtiene el 'id' del contexto y busca UN solo producto.
 */
export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { id } = context.params!; // 'id' viene de la URL (ej: /producto/3)

    // ¡IMPORTANTE! Usa consultas parametrizadas ($1)
    // para prevenir Inyección SQL.
    const sql = 'SELECT * FROM products WHERE id = $1';
    const { rows } = await query(sql, [id]);

    const product = rows[0] || null; // Obtiene el primer resultado o null

    return {
      props: {
        product: product,
      },
    };
  } catch (error) {
    console.error('Error al obtener producto:', error);
    return {
      props: {
        product: null,
      },
    };
  }
};