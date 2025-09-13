import React from 'react'
import Header from './Header'
import MainLayout from './MainLayout'

const App = () => {
  return (
    <div style={{ height: "100vh", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <Header />
      <div style={{ flex: 1, overflow: "hidden" }}>
        <MainLayout />
      </div>
    </div>
  )
}

export default App
