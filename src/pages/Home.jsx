import { useEffect } from 'react'
import { useNews } from '../hooks/useNews'
import NewsFeatured from '../components/NewsFeatured'
import NewsGrid from '../components/NewsGrid'
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
          <p className="text-lg text-gray-600 font-medium">Carregando notícias...</p>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Erro ao carregar</h1>
          <p className="text-lg text-red-600 mb-4">{ERROR_MESSAGES.LOADING_ERROR}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
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
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Sem notícias</h1>
          <p className="text-lg text-gray-600">{ERROR_MESSAGES.NO_NEWS}</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      <NewsFeatured news={data.manchetaPrincipal} />
      <NewsGrid articles={data.noticiasSecundarias} />
    </main>
  )
}
