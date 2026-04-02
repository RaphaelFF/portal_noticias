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
      className="bg-gradient-to-b from-brasil-green to-brasil-green-light text-white shadow-lg transition-all duration-300"
      role="banner"
    >
      {/* Layout Mobile */}
      {isMobile && (
        <div className="h-20 px-4 py-4 flex justify-between items-center gap-4 animate-fadeIn bg-gradient-to-b from-brasil-green to-brasil-green-light">
          {/* Botão Hambúrguer */}
          <button
            ref={buttonRef}
            onClick={toggleMenu}
            className={`text-2xl p-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brasil-yellow focus:ring-offset-2 focus:ring-offset-brasil-green rounded ${
              isMenuOpen
                ? 'text-brasil-yellow rotate-90'
                : 'text-white hover:text-brasil-yellow active:scale-95'
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
            className="flex-1 flex justify-center hover:opacity-80 transition-opacity"
            title="Voltar para página inicial"
          >
            <img
              src="https://res.cloudinary.com/dgacxy9ga/image/upload/q_auto/f_auto/v1775149573/logo_1_pnelx9.png"
              alt="Logo - Portal de Notícias"
              className="h-12 object-contain"
            />
          </Link>

          {/* Data (menor em mobile) */}
          <div className="text-xs text-white/80 whitespace-nowrap font-medium">
            <DateDisplay />
          </div>
        </div>
      )}

      {/* Layout Desktop */}
      {!isMobile && (
        <div className="px-8 py-6 max-w-7xl mx-auto animate-fadeIn">
          {/* Linha 1: Logo + Data */}
          <div className="flex justify-between items-center pb-4">
            <Link
              to="/"
              className="hover:opacity-80 transition-opacity"
              title="Voltar para página inicial"
            >
              <img
                src="https://res.cloudinary.com/dgacxy9ga/image/upload/q_auto/f_auto/v1775151483/logo_1_peq3af.png"
                alt="Logo - Portal de Notícias"
                className="h-32 object-contain"
              />
            </Link>
            <DateDisplay />
          </div>
        </div>
      )}

      {/* Menu Mobile Overlay */}
      <div ref={menuRef} id="mobile-menu">
        <MobileMenu isOpen={isMenuOpen} onClose={closeMenu} />
      </div>
    </header>
  )
}
