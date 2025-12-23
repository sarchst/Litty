import React, { useState, useEffect } from 'react'
import Header from './Header'
import MainLayout from './MainLayout'

const App = () => {
  const [currentPage, setCurrentPage] = useState('home')
  const [clearBookState, setClearBookState] = useState(0)
  const [booksCache, setBooksCache] = useState(null)
  const [cacheLoading, setCacheLoading] = useState(true)
  const [mainLayoutHandlers, setMainLayoutHandlers] = useState(null)
  const [websiteLive, setWebsiteLive] = useState(true)

  // Check if website is live from data attribute
  useEffect(() => {
    const reactRoot = document.getElementById('react-root')
    if (reactRoot) {
      const isLive = reactRoot.getAttribute('data-website-live') === 'true'
      setWebsiteLive(isLive)
    }
  }, [])


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

  // If website is not live, show pre-launch page
  if (!websiteLive) {
    return (
      <div style={{ height: "100vh", overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <Header 
          onNavigate={handleNavigate} 
          booksCache={booksCache}
          cacheLoading={cacheLoading}
          onBookSelect={mainLayoutHandlers?.onBookSelect}
          onSeeAll={mainLayoutHandlers?.onSeeAll}
          websiteLive={websiteLive}
        />
        <div style={{ 
          flex: 1, 
          display: "flex", 
          flexDirection: "column", 
          justifyContent: "center", 
          alignItems: "center",
          background: "white"
        }}>
          <img 
            src="/images/litty-pre-launch-page.svg" 
            alt="Litty Pre-Launch" 
            style={{
              height: "467px",
              maxHeight: "80vh",
              width: "auto",
              maxWidth: "90vw",
              display: "block"
            }}
          />
          <p style={{
            fontFamily: "'new-spirit', 'New Spirit', 'Playfair Display', serif",
            fontWeight: 600,
            fontSize: "19.6px",
            color: "#000000",
            margin: 0,
            marginTop: "1rem",
            textAlign: "center"
          }}>
            Just give us 5 more minutes.
          </p>
          <p style={{
            fontFamily: "'Neue Haas Grotesk Text Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
            fontWeight: 500,
            fontSize: "12.25px",
            color: "#000000",
            margin: 0,
            marginTop: "0.5rem",
            textAlign: "center"
          }}>
            Official launch date: Dec. 28, 2025
          </p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ height: "100vh", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <Header 
        onNavigate={handleNavigate} 
        booksCache={booksCache}
        cacheLoading={cacheLoading}
        onBookSelect={mainLayoutHandlers?.onBookSelect}
        onSeeAll={mainLayoutHandlers?.onSeeAll}
        websiteLive={websiteLive}
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
