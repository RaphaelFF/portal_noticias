import { useParams } from 'react-router-dom'
import { CATEGORIES } from '../utils/categories'

/**
 * Página que exibe notícias de uma categoria específica
 * Feature 002: Header/Navbar - Navegação por categorias
 */
export default function CategoryPage() {
  const { slug } = useParams()

  // Encontrar categoria pelos slug
  const category = CATEGORIES.find((cat) => cat.slug === slug)

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">
          {category ? category.name : 'Categoria não encontrada'}
        </h1>

        {category ? (
          <div className="text-gray-600">
            <p>
              Página de notícias para a categoria <strong>{category.name}</strong> (slug: {slug})
            </p>
            <p className="mt-4">
              [Aqui virão as notícias filtradas por esta categoria]
            </p>
            <p className="mt-4 text-sm">
              Componente NewsGrid pode ser reutilizado aqui com filtro por categoria.
            </p>
          </div>
        ) : (
          <p>Categoria não encontrada. Verifique a URL ou volte para o início.</p>
        )}
      </main>
    </div>
  )
}
