import { Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Home from './pages/Home'
import RegisterBuyer from './pages/RegisterBuyer'
import RegisterSeller from './pages/RegisterSeller'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/register/buyer" element={<RegisterBuyer />} />
        <Route exact path="/register/seller" element={<RegisterSeller />} />
      </Routes>
    </>
  )
}

export default App
