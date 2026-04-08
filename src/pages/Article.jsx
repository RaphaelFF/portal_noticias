import { useParams, Link } from 'react-router-dom'
import { useNews } from '../hooks/useNews'
import { ERROR_MESSAGES } from '../utils/constants'

export default function Article() {
  const { slug } = useParams()
  const { data, loading, error } = useNews()

  // Buscar artigo no banco de dados combinando manchetaPrincipal + noticiasSecundarias
  const findArticleBySlug = () => {
    if (!data) return null
    
    // Verificar manchetaPrincipal
    if (data.manchetaPrincipal?.slug === slug) {
      return data.manchetaPrincipal
    }
    
    // Verificar noticiasSecundarias
    return data.noticiasSecundarias?.find(noticia => noticia.slug === slug) || null
  }

  const article = findArticleBySlug()

  if (loading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brasil-green" />
          <p className="text-lg text-neutral-dark font-medium">Carregando artigo...</p>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-brasil-blue mb-2">Erro ao carregar</h1>
          <p className="text-lg text-red-600 mb-4">{ERROR_MESSAGES.ARTICLE_NOT_FOUND}</p>
          <Link
            to="/"
            className="inline-block bg-brasil-green text-white px-6 py-2 rounded-lg font-semibold hover:bg-brasil-yellow hover:text-brasil-blue transition-colors"
          >
            Voltar para a home
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      <article className="max-w-3xl mx-auto px-4 py-12">
        {article ? (
          <>
            <h1 className="text-4xl font-bold mb-4 text-brasil-blue">
              {article.titulo}
            </h1>
            <div className="mb-8 pb-8 border-b border-neutral-light">
              <p className="text-neutral-dark font-semibold mb-1">Por {article.autor}</p>
              <time
                dateTime={article.data_publicacao}
                className="text-neutral-dark text-sm"
              >
                {new Date(article.data_publicacao).toLocaleDateString('pt-BR')}
              </time>
            </div>
            <img
              src={article.imagem}
              alt={article.imagemAlt || article.titulo}
              className="w-full h-96 object-cover rounded-lg mb-8"
            />
            <div className="prose prose-lg text-neutral-dark mb-8">
              <p className="text-lg leading-relaxed">{article.conteudo}</p>
            </div>
            {article.fonte && (
              <div className="text-sm text-neutral-dark py-4 border-t border-neutral-light">
                <p>
                  <span className="font-semibold">Fonte: </span>
                  <a
                    href={article.fonte}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brasil-green hover:text-brasil-yellow transition-colors underline"
                  >
                    Ver fonte
                  </a>
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-neutral-dark mb-4">
              {ERROR_MESSAGES.ARTICLE_NOT_FOUND}
            </p>
            <Link
              to="/"
              className="inline-block text-brasil-green hover:text-brasil-yellow font-semibold transition-colors"
            >
              ← Voltar para a home
            </Link>
          </div>
        )}
      </article>
    </main>
  )
}
