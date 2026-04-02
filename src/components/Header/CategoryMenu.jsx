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
    <nav className="hidden md:flex items-center gap-2 flex-wrap" role="navigation">
      {CATEGORIES.map((category) => {
        // Se for 'INICIO', redirecionar para home; senão para categoria
        const linkPath = category.id === 'inicio' ? '/' : `/categorias/${category.slug}`
        const isActive = category.id === 'inicio' 
          ? location.pathname === '/'
          : location.pathname.split('/')[2] === category.slug

        return (
          <Link
            key={category.id}
            to={linkPath}
            className={`px-4 py-2 text-sm md:text-base font-semibold rounded-full transition-all duration-300 ${
              isActive
                ? 'bg-brasil-yellow text-brasil-blue shadow-md scale-105'
                : 'text-white hover:bg-brasil-yellow/20 hover:text-brasil-yellow'
            }`}
            title={`${category.id === 'inicio' ? 'Voltar para' : 'Notícias de'} ${category.name}`}
          >
            {category.name}
          </Link>
        )
      })}
    </nav>
  )
}
