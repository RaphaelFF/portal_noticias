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
      className="bg-gray-900 text-white sticky top-0 z-50 shadow-md"
      role="banner"
    >
      {/* Layout Mobile */}
      {isMobile && (
        <div className="h-20 flex justify-between items-center px-4 py-3">
          {/* Botão Hambúrguer */}
          <button
            ref={buttonRef}
            onClick={toggleMenu}
            className="text-3xl hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            aria-label="Abrir menu de navegação"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            ☰
          </button>

          {/* Logo */}
          <Link
            to="/"
            className="text-xl font-bold hover:text-blue-400 transition-colors"
            title="Voltar para página inicial"
          >
            {SITE_NAME}
          </Link>

          {/* Data */}
          <DateDisplay />
        </div>
      )}

      {/* Layout Desktop */}
      {!isMobile && (
        <div className="px-6 md:px-8 py-4 md:py-6">
          {/* Linha 1: Logo + Data */}
          <div className="flex justify-between items-center mb-4">
            <Link
              to="/"
              className="text-2xl md:text-3xl font-bold hover:text-blue-400 transition-colors"
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
