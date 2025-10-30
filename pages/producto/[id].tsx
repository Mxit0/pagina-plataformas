import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { Geist } from "next/font/google";
import Header from '@/components/Header';
import { useState } from 'react';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// --- Datos de simulación (Mock Data) ---
// Definimos los datos de nuevo para esta página
const mockProducts = [
  { id: 1, name: "Tarjeta Gráfica RTX 4070", price: 650.00, imageUrl: "https://placehold.co/600x400/2d3748/e2e8f0?text=RTX+4070", description: "GPU de última generación para gaming en 1440p y alta tasa de refresco. Segunda mano, 6 meses de uso." },
  { id: 2, name: "Procesador Ryzen 7 7800X3D", price: 399.00, imageUrl: "https://placehold.co/600x400/2d3748/e2e8f0?text=Ryzen+7", description: "El mejor CPU para gaming con tecnología 3D V-Cache. Prácticamente nuevo." },
  { id: 3, name: "SSD 2TB NVMe Gen4", price: 120.50, imageUrl: "https://placehold.co/600x400/2d3748/e2e8f0?text=SSD+2TB", description: "Almacenamiento ultra rápido, ideal para sistema operativo y juegos. 1 año de uso." },
  { id: 4, name: "RAM 32GB DDR5 6000MHz", price: 150.00, imageUrl: "https://placehold.co/600x400/2d3748/e2e8f0?text=RAM+DDR5", description: "Kit de 2x16GB de memoria RAM de alta velocidad. Compatible con EXPO y XMP." },
  { id: 5, name: "Placa Madre AM5 B650", price: 210.00, imageUrl: "https://placehold.co/600x400/2d3748/e2e8f0?text=Mobo+B650", description: "Placa base robusta para la nueva generación de procesadores AMD. Estado: Usada." },
  { id: 6, name: "Fuente de Poder 850W Gold", price: 130.00, imageUrl: "https://placehold.co/600x400/2d3748/e2e8f0?text=PSU+850W", description: "Fuente de poder certificada 80+ Gold, modular. Con todos sus cables." },
];
// ------------------------------------------

/**
 * Página de detalle de producto.
 * Muestra un solo producto con un diseño de 2 columnas.
 */
export default function ProductoPage() {
  const router = useRouter();
  const { id } = router.query;
  const [message, setMessage] = useState(''); // Estado para el mensaje de simulación

  // Buscamos el producto basado en el ID de la URL
  const product = mockProducts.find(p => p.id === Number(id));

  // --- Simulación de Compra (SOLO FRONTEND) ---
  const handlePurchase = () => {
    setMessage('Procesando simulación...');
    
    // Simula una espera y luego muestra el mensaje
    setTimeout(() => {
      setMessage(`¡Compra simulada con éxito para ${product?.name}!`);
      
      // Oculta el mensaje después de 3 segundos
      setTimeout(() => {
        setMessage('');
      }, 3000);
    }, 1000); // 1 segundo de espera simulada
  };

  // Si no se encuentra el producto, muestra un mensaje
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

  // Si se encuentra el producto, muestra el diseño de 2 columnas
  return (
    <div className={`${geistSans.className} font-sans min-h-screen bg-gray-100 dark:bg-gray-900`}>
      <Header />
      <main className="container mx-auto p-6 sm:p-8">
        {/* Este es el layout de 2 columnas */}
        <div className="flex flex-col md:flex-row gap-8 bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
          
          {/* Columna de Imagen */}
          <div className="md:w-1/2">
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={800}
              height={600}
              className="w-full rounded-lg object-cover border dark:border-gray-700"
            />
          </div>
          
          {/* Columna de Información y Compra */}
          <div className="md:w-1/2 flex flex-col">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-50">{product.name}</h1>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 my-4">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
              {product.description}
            </p>

            <div className="mt-auto"> {/* Empuja el botón y mensaje al final */}
              <button
                onClick={handlePurchase}
                className="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-green-700 transition-colors duration-300"
              >
                Simular Compra
              </button>
              
              {message && (
                <p className="mt-4 text-center font-medium text-green-700 dark:text-green-400">
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