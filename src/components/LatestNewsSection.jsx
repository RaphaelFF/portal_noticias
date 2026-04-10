/**
 * Componente LatestNewsSection
 * Seção que exibe as 4 notícias mais recentes (excluindo manchete)
 * Feature 003: Seções de Categorias na Home
 */
import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import NewsCard from './NewsCard'
import { useNews } from '../hooks/useNews'

export default function LatestNewsSection({ excludedNewsIds = [] }) {
  const { data, loading, error } = useNews()

  // Filtrar e limitar às 4 notícias mais recentes
  const latestNews = useMemo(() => {
    if (!data) return []

    // Combinar manchetaPrincipal + noticiasSecundarias
    const allNews = []
    
    if (data.manchetaPrincipal) {
      allNews.push(data.manchetaPrincipal)
    }
    
    if (data.noticiasSecundarias && Array.isArray(data.noticiasSecundarias)) {
      allNews.push(...data.noticiasSecundarias)
    }

      // Filtrar excluindo IDs passados
      let filtered = allNews.filter((noticia) => !excludedNewsIds.includes(noticia.id))

      // Ordenar por data de publicação (mais recente primeiro)
      filtered.sort((a, b) => {
        const dateA = new Date(a.data_publicacao).getTime()
        const dateB = new Date(b.data_publicacao).getTime()
        return dateB - dateA
      })

      // Limitar a 4 notícias
      return filtered.slice(0, 4)
    }, [data, excludedNewsIds])
  // Não renderizar se vazio
  if (!loading && latestNews.length === 0) {
    return null
  }

  // Estado de loading
  if (loading) {
    return (
      <section className="bg-white px-4 py-12 md:py-16" aria-label="Carregando Últimas Notícias">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-h2 text-brasil-blue mb-6">Últimas Notícias</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-neutral-light rounded-md h-48 mb-4" />
                <div className="bg-neutral-light rounded h-4 mb-2" />
                <div className="bg-neutral-light rounded h-4 w-3/4" />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Renderização normal com notícias
  return (
    <section className="bg-neutral-light px-4 py-12 md:py-16" aria-label="Últimas Notícias">
      <div className="max-w-7xl mx-auto">
        {/* Cabeçalho da seção */}
        <div className="mb-8">
          <h2 className="text-h2 text-brasil-blue mb-2">
            Últimas Notícias
          </h2>
          <div className="h-1 w-16 bg-brasil-yellow rounded" aria-hidden="true" />
        </div>

        {/* Grid de notícias */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {latestNews.map((article) => (
            <NewsCard key={article.id} news={article} />
          ))}
        </div>
      </div>
    </section>
  )
}
