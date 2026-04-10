import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import { CategoryMenu } from './components/Header/CategoryMenu'
import Home from './pages/Home'
import Article from './pages/Article'
import CategoryPage from './pages/CategoryPage'

export default function App() {
  return (
    <Router>
      {/* Header (Feature 002: Header/Navbar) */}
      <Header />

      {/* Sticky Category Menu (Desktop only) */}
      <div className="hidden md:block sticky top-0 z-40 bg-brasil-blue shadow-lg border-t-2 border-b-2 border-white">
        <div className="px-8 py-4 max-w-7xl mx-auto">
          <CategoryMenu />
        </div>
      </div>

      {/* Conteúdo principal */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/noticias/:slug" element={<Article />} />
        {/* Feature 002: Rota para categorias */}
        <Route path="/categorias/:slug" element={<CategoryPage />} />
      </Routes>
    </Router>
  )
}
