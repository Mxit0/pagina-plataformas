import Image from "next/image";
import Link from 'next/link';
import { Geist } from "next/font/google";
import Header from '@/components/Header';
import { query } from '@/lib/db'; // 👈 1. Importa tu función de BD
import type { GetServerSideProps } from 'next'; // 👈 Importa el tipo

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// ... (Las fuentes de Geist se quedan igual) ...

// ❌ 2. ELIMINA EL ARRAY 'mockProducts' DE AQUÍ ❌

/**
 * Página principal: Visualización de Catálogo.
 * Ahora recibe 'products' como props desde el servidor.
 */
// 3. Recibe 'products' como prop
export default function Home({ products }: { products: any[] }) {
  return (
    <div className={`${geistSans.className} font-sans min-h-screen bg-gray-100 dark:bg-gray-900`}>
      <Header />

      <main className="container mx-auto p-6 sm:p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
          Catálogo de Productos
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 4. Usa el prop 'products' */}
          {products.map((product) => (
            <div
              key={product.id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg shadow-md bg-white dark:bg-gray-800 overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <Image
                src={product.imageurl} // 👈 Asegúrate que los nombres
                alt={product.name}      //    coincidan con tu tabla SQL
                width={600}
                height={400}
                className="w-full h-48 object-cover"
                priority={product.id <= 3}
                unoptimized={true}
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50 truncate" title={product.name}>
                  {product.name}
                </h2>
                <p className="text-lg font-bold text-blue-600 dark:text-blue-400 mt-2">
                  ${Number(product.price).toFixed(2)}
                </p>
                <Link
                  href={`/producto/${product.id}`}
                  className="mt-4 inline-block w-full text-center bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Ver Producto
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="text-center p-6 mt-8 text-gray-500 dark:text-gray-400 text-sm">
        Proyecto de Estrés de Plataforma - Gestión de Plataformas Informáticas
      </footer>
    </div>
  );
}

/**
 * 5. Función de Server-Side Rendering (SSR)
 * Esto se ejecuta EN EL SERVIDOR en cada petición.
 * Aquí es donde hacemos la consulta a la BD.
 */
export const getServerSideProps: GetServerSideProps = async () => {
  try {
    // Asumiendo que tu tabla se llama 'products'
    const sql = 'SELECT * FROM products ORDER BY name ASC';
    const { rows } = await query(sql, []);

    return {
      props: {
        products: rows, // Pasa los productos a la página
      },
    };
  } catch (error) {
    console.error('Error al obtener productos:', error);
    return {
      props: {
        products: [], // Devuelve un array vacío en caso de error
      },
    };
  }
};