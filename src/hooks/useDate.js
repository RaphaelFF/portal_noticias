import { useState, useEffect } from 'react'

/**
 * Hook para exibir e atualizar data/hora em português brasileiro
 * @returns {string} - Data formatada no padrão pt-BR (ex: "01 de abril de 2026")
 */
export function useDate() {
  const [date, setDate] = useState(new Date())

  useEffect(() => {
    // Update inicial
    setDate(new Date())

    // Atualizar a cada minuto
    const timer = setInterval(() => {
      setDate(new Date())
    }, 60000) // 60 segundos

    // Cleanup
    return () => clearInterval(timer)
  }, [])

  // Formatar data em português brasileiro
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date)
}
