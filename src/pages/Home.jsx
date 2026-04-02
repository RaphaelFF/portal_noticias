import { useEffect } from 'react'
import { useNews } from '../hooks/useNews'
import NewsFeatured from '../components/NewsFeatured'
import NewsGrid from '../components/NewsGrid'
import CategorySection from '../components/CategorySection'
import { CATEGORIES } from '../utils/categories'
import { ERROR_MESSAGES } from '../utils/constants'

export default function Home() {
  const { data, loading, error } = useNews()

  useEffect(() => {
    // Atualizar título da página
    document.title = 'PortalNoticias - Últimas Notícias e Informações da Rádio'
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brasil-green" />
          <p className="text-lg text-neutral-dark font-medium">Carregando notícias...</p>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-brasil-blue mb-2">Erro ao carregar</h1>
          <p className="text-lg text-red-600 mb-4">{ERROR_MESSAGES.LOADING_ERROR}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-brasil-green text-white px-6 py-2 rounded-lg font-semibold hover:bg-brasil-yellow hover:text-brasil-blue transition-colors"
          >
            Tentar novamente
          </button>
        </div>
      </main>
    )
  }

  if (!data || !data.manchetaPrincipal) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-brasil-blue mb-2">Sem notícias</h1>
          <p className="text-lg text-neutral-dark">{ERROR_MESSAGES.NO_NEWS}</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      <NewsFeatured news={data.manchetaPrincipal} />
      <NewsGrid articles={data.noticiasSecundarias} />
      
      {/* Seções dinâmicas de categorias */}
      {CATEGORIES.map((category) => (
        <CategorySection
          key={category.id}
          category={category}
          excludedNewsIds={[data.manchetaPrincipal.id]}
        />
      ))}
    </main>
  )
}
