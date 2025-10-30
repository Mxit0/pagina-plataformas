import Image from "next/image";
import Link from 'next/link';
import { Geist } from "next/font/google";
import Header from '@/components/Header'; // Importamos el Header

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// --- Datos de simulación (Mock Data) ---
const mockProducts = [
  { id: 1, name: "Tarjeta Gráfica RTX 4070", price: 650.00, imageUrl: "https://placehold.co/600x400/2d3748/e2e8f0?text=RTX+4070" },
  { id: 2, name: "Procesador Ryzen 7 7800X3D", price: 399.00, imageUrl: "https://placehold.co/600x400/2d3748/e2e8f0?text=Ryzen+7" },
  { id: 3, name: "SSD 2TB NVMe Gen4", price: 120.50, imageUrl: "https://placehold.co/600x400/2d3748/e2e8f0?text=SSD+2TB" },
  { id: 4, name: "RAM 32GB DDR5 6000MHz", price: 150.00, imageUrl: "https://placehold.co/600x400/2d3748/e2e8f0?text=RAM+DDR5" },
  { id: 5, name: "Placa Madre AM5 B650", price: 210.00, imageUrl: "https://placehold.co/600x400/2d3748/e2e8f0?text=Mobo+B650" },
  { id: 6, name: "Fuente de Poder 850W Gold", price: 130.00, imageUrl: "https://placehold.co/600x400/2d3748/e2e8f0?text=PSU+850W" },
];
// ------------------------------------------

/**
 * Página principal: Visualización de Catálogo.
 * Muestra los productos en una cuadrícula.
 */
export default function Home() {
  return (
    <div className={`${geistSans.className} font-sans min-h-screen bg-gray-100 dark:bg-gray-900`}>
      <Header />

      <main className="container mx-auto p-6 sm:p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
          Catálogo de Productos
        </h1>

        {/* Esta es la grilla de productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockProducts.map((product) => (
            <div
              key={product.id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg shadow-md bg-white dark:bg-gray-800 overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={600}
                height={400}
                className="w-full h-48 object-cover"
                priority={product.id <= 3}
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50 truncate" title={product.name}>
                  {product.name}
                </h2>
                <p className="text-lg font-bold text-blue-600 dark:text-blue-400 mt-2">
                  ${product.price.toFixed(2)}
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