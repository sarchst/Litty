import React, { useState } from 'react'
import Header from './Header'
import MainLayout from './MainLayout'

const App = () => {
  const [currentPage, setCurrentPage] = useState('home')

  return (
    <div style={{ height: "100vh", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <Header onNavigate={setCurrentPage} />
      <div style={{ flex: 1, overflow: "hidden" }}>
        <MainLayout currentPage={currentPage} />
      </div>
    </div>
  )
}

export default App
