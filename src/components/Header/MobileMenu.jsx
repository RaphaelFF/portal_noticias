/**
 * Componente MobileMenu
 * Menu overlay lateral para mobile (< 768px)
 * Feature 002: Header/Navbar
 */
import { Link, useLocation } from 'react-router-dom'
import { CATEGORIES } from '../../utils/categories'

export function MobileMenu({ isOpen, onClose }) {
  const location = useLocation()
  const slug = location.pathname.split('/')[2]

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop semi-transparente */}
      <div
        className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu lateral */}
      <nav
        className="fixed left-0 top-20 w-72 bg-gray-900 text-white h-[calc(100vh-80px)] z-50 overflow-y-auto shadow-xl border-r border-gray-700 transition-all duration-300 animate-slideInLeft"
        aria-label="Menu de navegação mobile"
      >
        <ul className="space-y-0 p-2">
          {CATEGORIES.map((category) => (
            <li key={category.id}>
              <Link
                to={`/categorias/${category.slug}`}
                onClick={onClose}
                className={`block px-4 py-3 rounded-md font-medium transition-all duration-200 ${
                  slug === category.slug
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}
