import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import { Fruits } from './pages/Fruits'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Fruits />} />
      </Routes>
    </Router>
  )
}

export default App