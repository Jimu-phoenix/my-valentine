import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ValentineCard from './components/valentineCard'
import Superman from './pages/Superman'
import './App.css'
import MemoriesPage from './pages/Memories'

function App() {

  return (
    <>
    <BrowserRouter>
    
    <Routes>
      <Route path='/' element={<Superman />} />
      <Route path='/memories' element={<MemoriesPage />} />
    </Routes>

    </BrowserRouter>
    </>
  )
}

export default App
