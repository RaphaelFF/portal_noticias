/**
 * Componente DateDisplay
 * Exibe a data atual em português brasileiro
 * Feature 002: Header/Navbar
 */
import { useDate } from '../../hooks/useDate'

export function DateDisplay() {
  const date = useDate()

  return (
    <div className="text-xs md:text-sm text-gray-400 font-medium" aria-live="polite" aria-label="Data atual">
      {date}
    </div>
  )
}
