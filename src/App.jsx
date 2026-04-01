import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Home from './pages/Home'
import Article from './pages/Article'
import CategoryPage from './pages/CategoryPage'

export default function App() {
  return (
    <Router>
      {/* Header (Feature 002: Header/Navbar) */}
      <Header />

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
