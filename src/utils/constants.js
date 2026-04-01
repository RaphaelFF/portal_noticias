// Constantes de aplicação
export const SITE_TITLE = 'PortalNoticias'
export const SITE_DESCRIPTION = 'As melhores notícias do dia em um só lugar'

// Mensagens de erro
export const ERROR_MESSAGES = {
  LOADING_ERROR: 'Erro ao carregar notícias. Tente novamente mais tarde.',
  NO_NEWS: 'Nenhuma notícia disponível no momento.',
  ARTICLE_NOT_FOUND: 'Artigo não encontrado.'
}

// Cores Tailwind com contraste WCAG AA validado
export const COLORS = {
  primary: 'bg-gray-900',      // #111827
  primaryText: 'text-gray-900', // #111827
  secondary: 'bg-blue-600',     // #2563eb
  secondaryText: 'text-blue-600', // #2563eb
  light: 'bg-white',
  lightText: 'text-white',
  border: 'border-gray-200',
  success: 'bg-green-600'
}

// Breakpoints (Tailwind defaults)
export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px'
}

// Data format options
export const DATE_FORMAT_OPTIONS = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  locale: 'pt-BR'
}
