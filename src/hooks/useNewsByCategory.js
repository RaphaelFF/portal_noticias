import { useMemo } from 'react'
import { useNews } from './useNews'

/**
 * Hook para filtrar notícias por categoria
 * Feature 002: Header/Navbar - Navegação por categorias
 * Feature 003: Seções de categorias na Home
 * 
 * @param {string} categorySlug - O slug da categoria (ex: 'economia', 'esportes')
 * @param {object} options - Opções adicionais
 * @param {array} options.excludeIds - IDs de notícias a excluir (ex: manchete principal)
 * @param {number} options.limit - Número máximo de notícias a retornar
 * @returns {object} { news: array de notícias filtradas, loading, error }
 */
export function useNewsByCategory(categorySlug, options = {}) {
  const { excludeIds = [], limit = null } = options
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
    let filtered = allNews.filter((noticia) => {
      // Verificar categoria
      const matchesCategory = noticia.categoria?.toLowerCase() === categorySlug.toLowerCase()
      // Verificar exclusão
      const isExcluded = excludeIds.includes(noticia.id)
      
      return matchesCategory && !isExcluded
    })

    // Aplicar limite se especificado
    if (limit && limit > 0) {
      filtered = filtered.slice(0, limit)
    }

    return filtered
  }, [data, categorySlug, excludeIds, limit])

  return {
    news: filteredNews,
    loading,
    error,
    total: filteredNews.length,
  }
}
