/**
 * Componente CategorySection
 * Seção dinâmica que exibe notícias de uma categoria específica
 * Feature 003: Seções de Categorias na Home
 */
import { Link } from 'react-router-dom'
import NewsCard from './NewsCard'
import { useNewsByCategory } from '../hooks/useNewsByCategory'

export default function CategorySection({ category, excludedNewsIds = [] }) {
  // Buscar notícias da categoria, limitadas a 4 e excluindo IDs passados
  const { news, loading, error } = useNewsByCategory(category.slug, {
    excludeIds: excludedNewsIds,
    limit: 4,
  })

  // Não renderizar nada se não houver notícias (silenciosamente, sem mensagem)
  if (!loading && !error && news.length === 0) {
    return null
  }

  // Estado de erro
  if (error) {
    return (
      <section className="bg-white px-4 py-12 md:py-16" aria-label={`Seção ${category.name}`}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-h2 text-brasil-blue mb-4">{category.name}</h2>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <p className="text-red-700 font-medium">
              Erro ao carregar notícias de {category.name.toLowerCase()}
            </p>
          </div>
        </div>
      </section>
    )
  }

  // Estado vazio ou sem notícias - renderizar mensagem apenas em casos de erro real
  if (!loading && error) {
    // Apenas mostrar mensagem se houver erro
  } else if (!loading && news.length === 0) {
    // Categoria sem notícias - renderizar null (não mostrar nada)
    return null
  }

  // Estado de loading
  if (loading) {
    return (
      <section className="bg-white px-4 py-12 md:py-16" aria-label={`Carregando seção ${category.name}`}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-h2 text-brasil-blue mb-6">{category.name}</h2>
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
    <section className="bg-white px-4 py-12 md:py-16" aria-label={`Seção de notícias: ${category.name}`}>
      <div className="max-w-7xl mx-auto">
        {/* Cabeçalho da seção */}
        <div className="mb-8">
          <h2 className="text-h2 text-brasil-blue mb-2">
            {category.name}
          </h2>
          <div className="h-1 w-16 bg-brasil-yellow rounded" aria-hidden="true" />
        </div>

        {/* Grid de notícias */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-8">
          {news.map((article) => (
            <NewsCard key={article.id} news={article} />
          ))}
        </div>

        {/* Link "Ver todas" */}
        <div className="flex justify-center">
          <Link
            to={`/categorias/${category.slug}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-brasil-green text-white font-semibold rounded-lg hover:bg-brasil-yellow hover:text-brasil-blue transition-all duration-300 shadow-md hover:shadow-lg focus:ring-2 focus:ring-brasil-yellow focus:outline-none"
            aria-label={`Ver todas as notícias de ${category.name}`}
          >
            Ver todas as notícias
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
