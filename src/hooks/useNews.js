import { useEffect, useState } from 'react'

export function useNews() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true)
        const response = await fetch('/data/news.json')
        if (!response.ok) {
          throw new Error(`Erro ao carregar notícias: ${response.statusText}`)
        }
        const jsonData = await response.json()
        setData(jsonData)
        setError(null)
      } catch (err) {
        setError(err.message || 'Erro desconhecido ao carregar notícias')
        setData(null)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  return { data, loading, error }
}
