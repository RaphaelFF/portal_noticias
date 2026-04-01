import { useParams, Link } from 'react-router-dom'
import { ERROR_MESSAGES } from '../utils/constants'

export default function Article() {
  const { slug } = useParams()

  // Placeholder: em produção, buscaria o artigo completo baseado no slug
  const mockArticles = {
    'eleicoes-2026-resultado': {
      titulo: 'Resultado das eleições 2026: vencedor eleito com 52% dos votos',
      data: '2026-04-01T09:15:00Z',
      autor: 'Maria Silva',
      imagem: 'https://images.unsplash.com/photo-1575505586569-646b2ca898fc?w=1200&h=600&fit=crop',
      conteudo: 'Este é um placeholder de artigo. Em produção, aqui estaria o conteúdo completo da notícia.'
    }
  }

  const article = mockArticles[slug]

  return (
    <main className="min-h-screen bg-white">
      <article className="max-w-3xl mx-auto px-4 py-12">
        {article ? (
          <>
            <h1 className="text-4xl font-bold mb-4 text-gray-900">
              {article.titulo}
            </h1>
            <div className="mb-8 pb-8 border-b border-gray-200">
              <p className="text-gray-600">Por {article.autor}</p>
              <p className="text-gray-600">
                {new Date(article.data).toLocaleDateString('pt-BR')}
              </p>
            </div>
            <img
              src={article.imagem}
              alt={article.titulo}
              className="w-full h-96 object-cover rounded mb-8"
            />
            <div className="prose prose-lg text-gray-700 mb-8">
              <p>{article.conteudo}</p>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 mb-4">
              {ERROR_MESSAGES.ARTICLE_NOT_FOUND}
            </p>
            <Link to="/" className="text-blue-600 hover:underline">
              Voltar para a home
            </Link>
          </div>
        )}
      </article>
    </main>
  )
}
