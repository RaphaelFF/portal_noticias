/**
 * Componente CategoryMenu
 * Menu horizontal de categorias (desktop only)
 * Feature 002: Header/Navbar
 */
import { Link, useLocation } from 'react-router-dom'
import { CATEGORIES } from '../../utils/categories'

export function CategoryMenu() {
  const location = useLocation()

  // Extrair slug da URL para destacar categoria ativa
  const slug = location.pathname.split('/')[2]

  return (
    <nav className="hidden md:flex items-center gap-1 flex-wrap" role="navigation">
      {CATEGORIES.map((category) => (
        <Link
          key={category.id}
          to={`/categorias/${category.slug}`}
          className={`px-3 py-2 text-sm md:text-base font-medium rounded-md transition-all duration-200 ${
            slug === category.slug
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-gray-300 hover:text-white hover:bg-gray-800'
          }`}
          title={`Notícias de ${category.name}`}
        >
          {category.name}
        </Link>
      ))}
    </nav>
  )
}
