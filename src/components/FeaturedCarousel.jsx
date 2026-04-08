/**
 * Componente FeaturedCarousel
 * Exibe múltiplas notícias em rotação com navegação
 * Feature 004: Layout da Manchete Principal
 */
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import FeaturedCarouselControls from './FeaturedCarouselControls'

export default function FeaturedCarousel({ news = [] }) {
  const navigate = useNavigate()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const autoPlayRef = useRef(null)

  const slide = news[currentSlide] || null

  if (!slide) return null

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % news.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + news.length) % news.length)
  }

  // Auto-play com pause on hover
  useEffect(() => {
    if (isPaused || news.length <= 1) return

    autoPlayRef.current = setInterval(nextSlide, 5000)

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [isPaused, news.length])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date)
  }

  return (
    <div
      className="relative h-[500px] md:h-[500px] sm:h-[350px] rounded-xl overflow-hidden group cursor-pointer"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onClick={() => navigate(`/noticias/${slide.slug}`)}
      role="region"
      aria-label="Carrossel de notícias destaque"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          navigate(`/noticias/${slide.slug}`)
        }
      }}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-300"
        style={{ backgroundImage: `url(${slide.imagem})` }}
        role="img"
        aria-label={slide.imagemAlt}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

      {/* Controls */}
      <FeaturedCarouselControls
        onNext={nextSlide}
        onPrev={prevSlide}
        currentSlide={currentSlide}
        totalSlides={news.length}
      />

      {/* Content - Text at bottom-left */}
      <div className="absolute inset-0 flex flex-col justify-end">
        <div className="p-6 text-white z-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-3">
            {slide.titulo}
          </h1>

          {slide.resumo && (
            <p className="text-sm md:text-base text-white/90 mb-4 line-clamp-2 max-w-2xl">
              {slide.resumo}
            </p>
          )}

          {/* Byline */}
          <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-white/70">
            {slide.autor && <span className="font-semibold">{slide.autor}</span>}
            {slide.data_publicacao && <span>•</span>}
            {slide.data_publicacao && (
              <time dateTime={slide.data_publicacao}>
                {formatDate(slide.data_publicacao)}
              </time>
            )}
            {slide.fonte && (
              <>
                <span>•</span>
                <a
                  href={slide.fonte}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-brasil-green hover:text-brasil-green-light transition-colors underline"
                  aria-label={`Fonte: ${slide.fonte}`}
                >
                  Fonte
                </a>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Slide indicator dots */}
      {news.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {news.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation()
                setCurrentSlide(idx)
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === currentSlide
                  ? 'bg-brasil-yellow w-6'
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Ir para slide ${idx + 1}`}
              aria-current={idx === currentSlide ? 'true' : 'false'}
            />
          ))}
        </div>
      )}
    </div>
  )
}
