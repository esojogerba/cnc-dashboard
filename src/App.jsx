import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import ScrollManager from './components/ScrollManager'
import Home from './pages/Home'
import RunSummary from './pages/RunSummary'
import Scouters from './pages/Scouters'

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ScrollManager />
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scouters" element={<Scouters />} />
          <Route path="/runs/:id" element={<RunSummary />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
