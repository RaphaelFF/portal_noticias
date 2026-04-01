import { Link } from 'react-router-dom'

export default function NewsCard({ news }) {
  if (!news) return null

  return (
    <Link
      to={`/noticias/${news.slug}`}
      className="group flex flex-col h-full"
      aria-label={news.titulo}
    >
      <article className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-gray-300 flex flex-col h-full hover:bg-gray-50">
        {/* Imagem */}
        <div className="relative overflow-hidden bg-gray-200 h-48 flex-shrink-0">
          <img
            src={news.imagem}
            alt={news.imagemAlt}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            width={400}
            height={300}
          />
        </div>

        {/* Conteúdo */}
        <div className="p-5 flex flex-col flex-grow space-y-3">
          {/* Título */}
          <h3 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {news.titulo}
          </h3>

          {/* Autor */}
          <p className="text-sm text-gray-600 font-medium">{news.autor}</p>

          {/* Spacer */}
          <div className="flex-grow" />

          {/* CTA Link */}
          <span className="text-sm font-semibold text-blue-600 group-hover:text-blue-700 flex items-center gap-1 transition-colors">
            Ler mais
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </span>
        </div>
      </article>
    </Link>
  )
}
