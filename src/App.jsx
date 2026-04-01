import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Article from './pages/Article'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/noticias/:slug" element={<Article />} />
      </Routes>
    </Router>
  )
}
