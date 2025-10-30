import Link from 'next/link';

/**
 * Componente de cabecera reutilizable para la navegación.
 */
export default function Header() {
  return (
    <header className="w-full bg-gray-900 text-white p-4 shadow-md sticky top-0 z-10">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold hover:text-gray-300 transition-colors">
          PC Market (Estrés)
        </Link>
        <div className="flex gap-4">
          <Link href="/" className="text-lg hover:text-gray-300 transition-colors">
            Catálogo
          </Link>
        </div>
      </nav>
    </header>
  );
}