/**
 * Componente FeaturedSidebar
 * Exibe 2 notícias estáticas empilhadas
 * Feature 004: Layout da Manchete Principal
 */
import { Link } from 'react-router-dom'

export default function FeaturedSidebar({ news = [] }) {
  if (news.length < 2) return null

  const items = news.slice(0, 2)

  return (
    <div
      className="flex flex-col gap-2 h-[500px] md:h-[500px] sm:h-[350px]"
      role="region"
      aria-label="Notícias secundárias em destaque"
    >
      {items.map((item, idx) => (
        <Link
          key={item.id || idx}
          to={`/noticias/${item.slug}`}
          className="flex-1 relative rounded-xl overflow-hidden group hover:shadow-lg transition-shadow"
          style={{
            backgroundImage: `url(${item.imagem})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent group-hover:from-black/95 transition-all" />

          {/* Image element for accessibility */}
          <img
            src={item.imagem}
            alt={item.imagemAlt}
            className="absolute inset-0 w-full h-full object-cover opacity-0 pointer-events-none"
            loading="lazy"
          />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-4 z-10">
            <h3 className="text-lg md:text-xl font-bold text-white leading-tight line-clamp-3 group-hover:text-brasil-yellow transition-colors">
              {item.titulo}
            </h3>

            {item.autor && (
              <p className="text-xs md:text-sm text-white/70 mt-2">
                {item.autor}
              </p>
            )}
          </div>
        </Link>
      ))}
    </div>
  )
}
