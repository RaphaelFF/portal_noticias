import { useMemo } from 'react'
import { useNews } from './useNews'

/**
 * Hook para filtrar notícias por categoria
 * Feature 002: Header/Navbar - Navegação por categorias
 * 
 * @param {string} categorySlug - O slug da categoria (ex: 'economia', 'esportes')
 * @returns {object} { news: array de notícias filtradas, loading, error }
 */
export function useNewsByCategory(categorySlug) {
  const { news, loading, error } = useNews()

  // Filtrar notícias por categoria usando useMemo para performance
  const filteredNews = useMemo(() => {
    if (!news || !categorySlug) return []

    return news.filter((noticia) => {
      // Comparar categoria (case-insensitive para segurança)
      return noticia.categoria?.toLowerCase() === categorySlug.toLowerCase()
    })
  }, [news, categorySlug])

  return {
    news: filteredNews,
    loading,
    error,
    total: filteredNews.length,
  }
}
