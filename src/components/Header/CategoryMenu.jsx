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
    <nav className="hidden md:flex items-center gap-4 md:gap-6 flex-wrap">
      {CATEGORIES.map((category) => (
        <Link
          key={category.id}
          to={`/categorias/${category.slug}`}
          className={`text-sm md:text-base transition-colors ${
            slug === category.slug
              ? 'text-blue-400 border-b-2 border-blue-600'
              : 'text-gray-300 hover:text-blue-400'
          }`}
          title={`Notícias de ${category.name}`}
        >
          {category.name}
        </Link>
      ))}
    </nav>
  )
}
