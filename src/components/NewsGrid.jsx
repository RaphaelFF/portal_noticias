import NewsCard from './NewsCard'

export default function NewsGrid({ articles }) {
  if (!articles || articles.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-16">
        <p className="text-center text-neutral-dark text-lg">
          Nenhuma notícia disponível no momento.
        </p>
      </section>
    )
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-16 md:py-20 bg-neutral-light">
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-brasil-blue mb-2">
          Notícias do dia
        </h2>
        <div className="h-1 w-16 bg-brasil-yellow rounded" aria-hidden="true" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {articles.map((article) => (
          <NewsCard key={article.id} news={article} />
        ))}
      </div>
    </section>
  )
}
