/**
 * Componente Header / Navbar
 * Componente principal do header com LogIn, data, menu de navegação
 * Feature 002: Header/Navbar
 */
import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { DateDisplay } from './DateDisplay'
import { CategoryMenu } from './CategoryMenu'
import { MobileMenu } from './MobileMenu'
import { SITE_NAME } from '../../utils/categories'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isMobile = useMediaQuery('(max-width: 768px)')
  const menuRef = useRef(null)
  const buttonRef = useRef(null)

  // Fechar menu ao clicar fora
  useEffect(() => {
    function handleClickOutside(event) {
      // Se clicou fora do menu e do botão, fecha
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMenuOpen])

  // Fechar menu automaticamente ao redimensionar para desktop
  useEffect(() => {
    if (!isMobile && isMenuOpen) {
      setIsMenuOpen(false)
    }
  }, [isMobile, isMenuOpen])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <header
      className="bg-gradient-to-b from-gray-900 to-gray-800 text-white sticky top-0 z-50 shadow-lg border-b border-gray-700 transition-all duration-300"
      role="banner"
    >
      {/* Layout Mobile */}
      {isMobile && (
        <div className="h-20 px-4 py-4 flex justify-between items-center gap-4 animate-fadeIn">
          {/* Botão Hambúrguer */}
          <button
            ref={buttonRef}
            onClick={toggleMenu}
            className={`text-2xl p-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded ${
              isMenuOpen
                ? 'text-blue-400 rotate-90'
                : 'text-gray-300 hover:text-blue-400 active:scale-95'
            }`}
            aria-label="Abrir menu de navegação"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            ☰
          </button>

          {/* Logo */}
          <Link
            to="/"
            className="text-lg font-bold hover:text-blue-400 transition-colors flex-1 text-center hover:scale-105"
            title="Voltar para página inicial"
          >
            {SITE_NAME}
          </Link>

          {/* Data (menor em mobile) */}
          <div className="text-xs text-gray-400 whitespace-nowrap">
            <DateDisplay />
          </div>
        </div>
      )}

      {/* Layout Desktop */}
      {!isMobile && (
        <div className="px-8 py-6 max-w-7xl mx-auto animate-fadeIn">
          {/* Linha 1: Logo + Data */}
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-700">
            <Link
              to="/"
              className="text-3xl font-bold text-white hover:text-blue-400 transition-all duration-300 hover:scale-105"
              title="Voltar para página inicial"
            >
              {SITE_NAME}
            </Link>
            <DateDisplay />
          </div>

          {/* Linha 2: Menu de Categorias */}
          <CategoryMenu />
        </div>
      )}

      {/* Menu Mobile Overlay */}
      <div ref={menuRef} id="mobile-menu">
        <MobileMenu isOpen={isMenuOpen} onClose={closeMenu} />
      </div>
    </header>
  )
}
