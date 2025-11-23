import React, { useState, useEffect } from 'react'
import Header from './Header'
import MainLayout from './MainLayout'

const App = () => {
  const [currentPage, setCurrentPage] = useState('home')
  const [clearBookState, setClearBookState] = useState(0)
  const [booksCache, setBooksCache] = useState(null)
  const [cacheLoading, setCacheLoading] = useState(true)
  const [mainLayoutHandlers, setMainLayoutHandlers] = useState(null)


  // Cache all books on app load
  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const response = await fetch('/api/books')
        if (response.ok) {
          const data = await response.json()
          console.log('🔍 Books cache loaded successfully:', Object.keys(data))
          setBooksCache(data)
        } else {
          console.error('🔍 Failed to load books cache:', response.status)
        }
      } catch (error) {
        console.error('🔍 Error loading books cache:', error)
      } finally {
        setCacheLoading(false)
      }
    }

    fetchAllBooks()
  }, [])
  
  const handleNavigate = (page) => {
    // Trigger book state clearing immediately
    setClearBookState(prev => prev + 1)
    setCurrentPage(page)
  }

  return (
    <div style={{ height: "100vh", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <Header 
        onNavigate={handleNavigate} 
        booksCache={booksCache}
        cacheLoading={cacheLoading}
        onBookSelect={mainLayoutHandlers?.onBookSelect}
        onSeeAll={mainLayoutHandlers?.onSeeAll}
      />
      <div style={{ flex: 1, overflow: "hidden" }}>
        <MainLayout 
          currentPage={currentPage} 
          clearBookState={clearBookState}
          booksCache={booksCache}
          cacheLoading={cacheLoading}
          onSetHandlers={setMainLayoutHandlers}
        />
      </div>
    </div>
  )
}

export default App
