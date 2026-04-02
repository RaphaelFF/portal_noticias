/**
 * Componente FeaturedCarouselControls
 * Botões de navegação e indicadores do carrossel
 * Feature 004: Layout da Manchete Principal
 */
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

export default function FeaturedCarouselControls({
  onNext,
  onPrev,
  currentSlide,
  totalSlides
}) {
  return (
    <>
      {/* Previous Button */}
      <button
        onClick={onPrev}
        aria-label="Notícia anterior"
        className="absolute top-1/2 left-4 -translate-y-1/2 z-20 text-white text-3xl md:text-4xl hover:text-brasil-yellow hover:scale-110 transition-all duration-200 p-2 opacity-70 group-hover:opacity-100"
        disabled={totalSlides <= 1}
      >
        <FaChevronLeft />
      </button>

      {/* Next Button */}
      <button
        onClick={onNext}
        aria-label="Próxima notícia"
        className="absolute top-1/2 right-4 -translate-y-1/2 z-20 text-white text-3xl md:text-4xl hover:text-brasil-yellow hover:scale-110 transition-all duration-200 p-2 opacity-70 group-hover:opacity-100"
        disabled={totalSlides <= 1}
      >
        <FaChevronRight />
      </button>
    </>
  )
}
