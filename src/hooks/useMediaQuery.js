import { useState, useEffect } from 'react'

/**
 * Hook para detectar media queries e breakpoints responsivos
 * @param {string} query - A query CSS media (ex: '(max-width: 768px)')
 * @returns {boolean} - true se a media query bate, false caso contrário
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    
    // Set inicial
    if (media.matches !== matches) {
      setMatches(media.matches)
    }

    // Listener para mudanças de tamanho
    const listener = () => setMatches(media.matches)
    media.addListener(listener)

    // Cleanup
    return () => media.removeListener(listener)
  }, [matches, query])

  return matches
}
