import { Link } from 'react-router-dom'

export default function NewsFeatured({ news }) {
  if (!news) return null

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date)
  }

  return (
    <article className="bg-gradient-to-b from-brasil-blue to-brasil-blue/90 text-white" aria-label="Manchete principal">
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Imagem - mobile em cima, desktop à esquerda */}
        <Link
          to={`/noticias/${news.slug}`}
          className="order-1 md:order-1 group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          tabIndex="0"
        >
          <img
            src={news.imagem}
            alt={news.imagemAlt}
            loading="eager"
            className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
            width={800}
            height={450}
          />
        </Link>

        {/* Texto - mobile embaixo, desktop à direita */}
        <div className="flex flex-col justify-center order-2 md:order-2 space-y-6">
          <Link
            to={`/noticias/${news.slug}`}
            className="group"
            tabIndex="0"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white group-hover:text-brasil-yellow transition-colors">
              {news.titulo}
            </h1>
          </Link>

          {/* Resumo */}
          {news.resumo && (
            <p className="text-lg md:text-xl text-white/90 leading-relaxed line-clamp-3">
              {news.resumo}
            </p>
          )}

          {/* Byline - autor • data • fonte */}
          <div className="flex flex-wrap items-center gap-3 text-sm md:text-base text-white/70 pt-2 border-t border-white/20">
            <p className="font-semibold text-white">{news.autor}</p>
            <span className="text-white/50">•</span>
            <time className="text-white/70" dateTime={news.data_publicacao}>
              {formatDate(news.data_publicacao)}
            </time>
            {news.fonte && (
              <>
                <span className="text-white/50">•</span>
                <a
                  href={news.fonte}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brasil-yellow hover:text-brasil-yellow-dark hover:underline transition-colors focus:ring-2 focus:ring-brasil-yellow focus:outline-none rounded px-1"
                  aria-label={`Fonte: ${news.fonte}`}
                >
                  Fonte
                </a>
              </>
            )}
          </div>

          {/* CTA Button */}
          <Link
            to={`/noticias/${news.slug}`}
            className="self-start mt-4 bg-brasil-yellow text-brasil-blue px-8 py-4 rounded-lg font-bold text-lg hover:bg-brasil-yellow-dark focus:ring-2 focus:ring-brasil-yellow focus:outline-none transition-all duration-200 shadow-md hover:shadow-lg group"
            aria-label={`Leia a notícia: ${news.titulo}`}
          >
            <span className="flex items-center gap-2">
              Leia a notícia completa
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </Link>
        </div>
      </div>
    </article>
  )
}
