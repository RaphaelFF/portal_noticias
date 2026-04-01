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
        className="fixed inset-0 bg-black/50 z-40 md:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu lateral */}
      <nav
        className="fixed left-0 top-20 w-64 bg-gray-900 text-white h-screen z-50 overflow-y-auto"
        aria-label="Menu de navegação mobile"
      >
        <ul className="space-y-0 p-0">
          {CATEGORIES.map((category) => (
            <li key={category.id}>
              <Link
                to={`/categorias/${category.slug}`}
                onClick={onClose}
                className={`block px-4 py-3 border-l-4 transition-colors ${
                  slug === category.slug
                    ? 'bg-blue-900/30 border-blue-500 text-blue-300'
                    : 'border-gray-700 hover:bg-gray-800 text-gray-200 hover:text-white'
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
