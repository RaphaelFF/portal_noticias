import { Link } from 'react-router-dom'

export default function NewsCard({ news }) {
  if (!news) return null

  return (
    <Link
      to={`/noticias/${news.slug}`}
      className="group flex flex-col h-full"
      aria-label={news.titulo}
    >
      <article className="bg-white rounded-md overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full hover:-translate-y-1">
        {/* Imagem */}
        <div className="relative overflow-hidden bg-neutral-light h-48 flex-shrink-0">
          <img
            src={news.imagem}
            alt={news.imagemAlt}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            width={400}
            height={300}
          />
          {/* Badge Categoria (se existir) */}
          {news.categoria && (
            <div className="absolute top-3 left-3 bg-brasil-yellow text-brasil-blue px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
              {news.categoria.charAt(0).toUpperCase() + news.categoria.slice(1)}
            </div>
          )}
        </div>

        {/* Conteúdo */}
        <div className="p-4 flex flex-col flex-grow space-y-3">
          {/* Título */}
          <h3 className="text-base font-bold text-brasil-blue line-clamp-2 group-hover:text-brasil-green transition-colors">
            {news.titulo}
          </h3>

          {/* Autor */}
          <p className="text-xs text-neutral-dark font-semibold">{news.autor}</p>

          {/* Spacer */}
          <div className="flex-grow" />

          {/* CTA Link */}
          <span className="text-sm font-semibold text-brasil-green group-hover:text-brasil-yellow flex items-center gap-1 transition-colors">
            Ler mais
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </span>
        </div>
      </article>
    </Link>
  )
}
