import { Routes, Route } from 'react-router-dom'
import { EstimatorApp } from './components/EstimatorApp'
import { InformacionPage } from './pages/InformacionPage'
import './App.css'

function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<EstimatorApp />} />
        <Route path="/informacion" element={<InformacionPage />} />
      </Routes>
    </div>
  )
}

export default App
