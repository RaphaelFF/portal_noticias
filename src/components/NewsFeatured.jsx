/**
 * Componente NewsFeatured / Manchete Principal
 * Layout com carrossel dinâmico (2/3) + sidebar estática (1/3)
 * Feature 004: Layout da Manchete Principal
 */
import FeaturedCarousel from './FeaturedCarousel'
import FeaturedSidebar from './FeaturedSidebar'

export default function NewsFeatured({ news = [] }) {
  if (!news || news.length === 0) return null

  // Separar notícias para carrossel e sidebar
  const carouselNews = news.slice(0, 3) // Primeiras 3 notícias para carrossel
  const sidebarNews = news.slice(3, 5) // Próximas 2 notícias para sidebar

  // Se não há notícias suficientes para carrossel, não renderizar
  if (carouselNews.length === 0) return null

  return (
    <article
      className="max-w-7xl mx-auto px-4 py-8 md:py-12"
      aria-label="Manchete principal"
    >
      {/* Grid: 2/3 para carrossel, 1/3 para sidebar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Carrossel - 2/3 */}
        <div className="md:col-span-2">
          <FeaturedCarousel news={carouselNews} />
        </div>

        {/* Sidebar - 1/3 */}
        <div className="md:col-span-1">
          <FeaturedSidebar news={sidebarNews} />
        </div>
      </div>
    </article>
  )
}
