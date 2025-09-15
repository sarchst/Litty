import { useState, useEffect } from 'react'
import TheProject from './TheProject'
import Blog from './Blog'
import AboutUs from './AboutUs'
import BookView from './BookView'

export default function Content({ selectedBook, currentPage, bookList, onBackToMain, onBookSelect, onSeeAll }) {
  const [imageLoading, setImageLoading] = useState(true)
  const [imageError, setImageError] = useState(false)
  
  // Reset loading state when book changes
  useEffect(() => {
    setImageLoading(true)
    setImageError(false)
  }, [selectedBook?.id])
  
  const renderContent = () => {
    // If viewing a book list or book details, show BookView component
    if (bookList || selectedBook) {
      // Determine the context for BookView
      let year, category, books = []
      
      if (selectedBook) {
        // Book details mode
        year = selectedBook.published_at ? new Date(selectedBook.published_at).getFullYear() : selectedBook.published_year
        category = selectedBook.is_fiction ? 'fiction' : 'nonfiction'
        books = [] // No books list needed for details view
      } else if (bookList) {
        // Book list mode
        year = bookList.year
        category = bookList.category
        books = bookList.books || []
      }
      
      return (
        <BookView
          year={year}
          category={category}
          books={books}
          selectedBook={selectedBook}
          onBookSelect={onBookSelect}
          onSeeAll={onSeeAll}
          loading={bookList?.loading || false}
        />
      )
    }

    // If no book selected, show page content based on currentPage
    switch (currentPage) {
      case 'the-project':
        return <TheProject />
      case 'blog':
        return <Blog />
      case 'about-us':
        return <AboutUs />
      default:
        return (
          <div style={{ position: "relative", height: "100%" }}>
            <h2 style={{
              color: "var(--Off-Black, #474747)",
              fontFamily: "'Playfair Display', serif",
              fontSize: "64px",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "63px"
            }}>Find the books everyone's talking about.</h2>
            
            {/* Landing page image in bottom right */}
            <img
              src="/images/landing_page.png"
              alt="Landing page illustration"
              style={{
                position: "absolute",
                bottom: "0",
                right: "0",
                maxWidth: "300px",
                maxHeight: "300px",
                objectFit: "contain"
              }}
            />
          </div>
        )
    }
  }

  return (
    <div style={{ padding: "2rem", height: "100%", overflow: "auto" }}>
      {renderContent()}
    </div>
  )
}
