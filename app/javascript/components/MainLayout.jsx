import { useState, useEffect } from 'react'
import Sidebar from "./Sidebar"
import Content from "./Content"

export default function MainLayout({ currentPage, clearBookState, booksCache, cacheLoading, onSetHandlers }) {
  const [selectedBook, setSelectedBook] = useState(null)
  const [bookList, setBookList] = useState(null)
  const [isMobile, setIsMobile] = useState(false)

  // Clear selected book and book list when navigation happens
  useEffect(() => {
    if (clearBookState > 0) {
      setSelectedBook(null)
      setBookList(null)
    }
  }, [clearBookState])

  // Mobile detection
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const handleBookSelect = (book) => {
    setSelectedBook(book)
    setBookList(null) // Clear book list when selecting a book
  }

  // Expose handlers to parent component (for header menu)
  // Update handlers whenever booksCache changes
  useEffect(() => {
    if (onSetHandlers) {
      onSetHandlers({
        onBookSelect: handleBookSelect,
        onSeeAll: handleSeeAll
      })
    }
  }, [onSetHandlers, booksCache]) // Add booksCache as dependency

  const handleSeeAll = (year, category) => {
    setBookList({ year, category, loading: true, books: [] })
    setSelectedBook(null) // Clear selected book when viewing book list
    
    if (!booksCache) {
      // Wait a bit for cache to load, then try again
      setTimeout(() => {
        if (booksCache) {
          handleSeeAll(year, category)
        } else {
          setBookList({ year, category, loading: false, books: [] })
        }
      }, 100)
      return
    }
    
    const yearBooks = booksCache[year] || []
    
    const filteredBooks = yearBooks.filter(book => {
      if (category === 'fiction') {
        return book.is_fiction === true
      } else {
        return book.is_fiction === false
      }
    })
    
    setBookList({ year, category, loading: false, books: filteredBooks })
  }

  const handleBackToMain = () => {
    setBookList(null)
    setSelectedBook(null)
  }

  // Check if we're on landing page and mobile
  const isLandingPageMobile = isMobile && currentPage === 'home' && !selectedBook && !bookList

  if (isLandingPageMobile) {
    // Mobile landing page layout: single continuous scroll
    return (
      <div style={{ height: "100%", overflow: "auto" }}>
        {/* Title and Image with padding */}
        <div style={{ padding: "0.5rem" }}>
          {/* Title - full width, left aligned */}
          <h2 
            className="tk-new-spirit"
            style={{
            color: "var(--Off-Black, #474747)",
            fontFamily: '"new-spirit", "Playfair Display", serif',
            fontSize: "48px",
            fontStyle: "normal",
            fontWeight: 600,
            lineHeight: "47px",
            margin: "1.5rem 0 2rem 0",
            textAlign: "left",
            width: "100%",
            transform: "scaleX(0.75)",
            transformOrigin: "left center",
            display: "inline-block"
          }}>Find the books everyone's talking about.</h2>
          
          {/* Image - full width */}
          <div style={{ width: "100%", marginBottom: "2rem" }}>
            <img
              src="/images/landing-kitty.png"
              alt="Landing page illustration"
              style={{
                width: "100%",
                maxHeight: "385px",
                objectFit: "contain"
              }}
            />
          </div>
        </div>
        
        {/* Sidebar content - no padding, lines go edge to edge */}
        <div style={{ width: "100%" }}>
          <Sidebar 
            onBookSelect={handleBookSelect} 
            onSeeAll={handleSeeAll} 
            isMobile={isMobile}
            booksCache={booksCache}
            cacheLoading={cacheLoading}
          />
        </div>
      </div>
    )
  }

  // Check if we're showing book content (book details or book list)
  const isShowingBookContent = selectedBook || bookList
  
  // Check if we're on static pages (no sidebar needed on mobile)
  const isStaticPage = ['the-project', 'blog', 'about-us'].includes(currentPage)
  
  // Mobile book view - full screen, no sidebar
  if (isMobile && isShowingBookContent) {
    return (
      <div style={{ height: "100%", overflow: "hidden" }}>
        <Content 
          selectedBook={selectedBook} 
          currentPage={currentPage} 
          bookList={bookList}
          onBackToMain={handleBackToMain}
          onBookSelect={handleBookSelect}
          onSeeAll={handleSeeAll}
        />
      </div>
    )
  }

  // Mobile static pages - content only, no sidebar
  if (isMobile && isStaticPage) {
    return (
      <div style={{ height: "100%", overflow: "hidden" }}>
        <Content 
          selectedBook={selectedBook} 
          currentPage={currentPage} 
          bookList={bookList}
          onBackToMain={handleBackToMain}
          onBookSelect={handleBookSelect}
          onSeeAll={handleSeeAll}
        />
      </div>
    )
  }

  // Desktop layout or mobile non-book pages
  return (
    <div style={{ display: "flex", height: "100%", overflow: "hidden", flexDirection: isMobile ? "column" : "row" }}>
      {isMobile && !isLandingPageMobile && (
        <div style={{ flex: 1, overflow: "hidden" }}>
          <Content 
            selectedBook={selectedBook} 
            currentPage={currentPage} 
            bookList={bookList}
            onBackToMain={handleBackToMain}
            onBookSelect={handleBookSelect}
            onSeeAll={handleSeeAll}
          />
        </div>
      )}
      <div style={{ flex: isMobile ? 'none' : 0.48, overflow: "hidden", maxHeight: isMobile ? "50vh" : "none" }}>
        <Sidebar 
          onBookSelect={handleBookSelect} 
          onSeeAll={handleSeeAll} 
          isMobile={isMobile}
          booksCache={booksCache}
          cacheLoading={cacheLoading}
        />
      </div>
      {!isMobile && (
        <div style={{ flex: 1, overflow: "hidden" }}>
          <Content 
            selectedBook={selectedBook} 
            currentPage={currentPage} 
            bookList={bookList}
            onBackToMain={handleBackToMain}
            onBookSelect={handleBookSelect}
            onSeeAll={handleSeeAll}
          />
        </div>
      )}
    </div>
  )
}
