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
  const { data, loading, error } = useNews()

  // Filtrar notícias por categoria usando useMemo para performance
  const filteredNews = useMemo(() => {
    if (!data || !categorySlug) return []

    // Combinar manchetaPrincipal + noticiasSecundarias
    const allNews = []
    
    if (data.manchetaPrincipal) {
      allNews.push(data.manchetaPrincipal)
    }
    
    if (data.noticiasSecundarias && Array.isArray(data.noticiasSecundarias)) {
      allNews.push(...data.noticiasSecundarias)
    }

    // Filtrar por categoria (case-insensitive)
    return allNews.filter((noticia) => {
      return noticia.categoria?.toLowerCase() === categorySlug.toLowerCase()
    })
  }, [data, categorySlug])

  return {
    news: filteredNews,
    loading,
    error,
    total: filteredNews.length,
  }
}
