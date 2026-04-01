import { useParams } from 'react-router-dom'
import { CATEGORIES } from '../utils/categories'
import { useNewsByCategory } from '../hooks/useNewsByCategory'
import { NewsGrid } from '../components/NewsGrid'

/**
 * Página que exibe notícias de uma categoria específica
 * Feature 002: Header/Navbar - Navegação por categorias
 */
export default function CategoryPage() {
  const { slug } = useParams()

  // Encontrar categoria pelos slug
  const category = CATEGORIES.find((cat) => cat.slug === slug)

  // Filtrar notícias pela categoria usando o novo hook
  const { news, loading, error } = useNewsByCategory(slug)

  // Se categoria não existe
  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-12">
        <main className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-red-600 mb-4">
            ❌ Categoria não encontrada
          </h1>
          <p className="text-gray-600 text-lg">
            A categoria "{slug}" não existe. Verifique a URL ou volte para o início.
          </p>
        </main>
      </div>
    )
  }

  // Se está carregando
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-12">
        <main className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">{category.name}</h1>
          <div className="text-center py-12">
            <p className="text-gray-500 animate-pulse">Carregando notícias...</p>
          </div>
        </main>
      </div>
    )
  }

  // Se teve erro
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-12">
        <main className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-red-600 mb-4">{category.name}</h1>
          <p className="text-red-500">Erro ao caregar notícias: {error}</p>
        </main>
      </div>
    )
  }

  // Se não há notícias nesta categoria
  if (news.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-12">
        <main className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">{category.name}</h1>
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-500 text-lg mb-4">
              📭 Nenhuma notícia nesta categoria ainda.
            </p>
            <p className="text-gray-400">
              Volte em breve para encontrar as últimas notícias de {category.name.toLowerCase()}.
            </p>
          </div>
        </main>
      </div>
    )
  }

  // Renderizar notícias da categoria
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <main className="max-w-6xl mx-auto">
        {/* Cabeçalho */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            {category.name}
          </h1>
          <p className="text-gray-600 text-lg">
            {news.length} {news.length === 1 ? 'notícia' : 'notícias'} nesta categoria
          </p>
          <div className="h-1 w-24 bg-blue-600 rounded mt-4"></div>
        </div>

        {/* Grid de notícias */}
        <NewsGrid news={news} />
      </main>
    </div>
  )
}
