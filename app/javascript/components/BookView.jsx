import { useState, useEffect } from 'react'
import BookDetails from './BookDetails'

export default function BookView({ 
  year, 
  category, 
  books, 
  selectedBook, 
  onBookSelect, 
  onSeeAll, 
  loading = false 
}) {
  const [imageLoading, setImageLoading] = useState(true)
  const [imageError, setImageError] = useState(false)
  const [hoveredBookId, setHoveredBookId] = useState(null)

  // Reset loading state when selected book changes
  useEffect(() => {
    setImageLoading(true)
    setImageError(false)
  }, [selectedBook?.id])

  const categoryTitle = category === 'fiction' ? 'FICTION' : 'NON-FICTION'
  const title = `BEST ${categoryTitle} BOOKS OF ${year}`

  // If a specific book is selected, show book details
  if (selectedBook) {
    return (
      <BookDetails
        book={selectedBook}
        year={year}
        category={category}
        onBack={() => onSeeAll(year, category)}
      />
    )
  }

  // Show book list
  if (loading) {
    return (
      <div>
        <div style={{
          color: "#000",
          fontFamily: '"New Spirit"',
          fontSize: "18px",
          fontStyle: "normal",
          fontWeight: 600,
          lineHeight: "normal",
          marginBottom: "2rem",
          display: "flex",
          alignItems: "center",
          gap: "8px"
        }}>
          <span style={{ width: "7px", height: "11px" }}></span>
          {title}
        </div>
        <div style={{ textAlign: "center", color: "#666" }}>Loading books...</div>
      </div>
    )
  }

  return (
    <div>
      {/* Title without button */}
      <div style={{
        color: "#000",
        fontFamily: '"New Spirit"',
        fontSize: "18px",
        fontStyle: "normal",
        fontWeight: 600,
        lineHeight: "normal",
        marginBottom: "2rem",
        display: "flex",
        alignItems: "center",
        gap: "8px"
      }}>
        <span style={{ width: "7px", height: "11px" }}></span>
        {title}
      </div>

      {/* Books grid - 4 books per row */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "2rem",
        marginBottom: "2rem"
      }}>
        {books
          .slice()
          .sort((a, b) => (a.ranking || 0) - (b.ranking || 0))
          .map((book, index) => {
          const bookId = book.id || index
          const isHovered = hoveredBookId === bookId
          
          return (
            <div 
              key={bookId} 
              style={{ 
                textAlign: "center",
                cursor: "pointer",
                position: "relative"
              }}
              onClick={() => onBookSelect(book)}
              onMouseEnter={() => setHoveredBookId(bookId)}
              onMouseLeave={() => setHoveredBookId(null)}
            >
              {/* Book cover with hover overlay */}
              {book.cover_image_url && (
                <div style={{ 
                  marginBottom: "1rem",
                  position: "relative",
                  width: "100%",
                  maxWidth: "200px",
                  height: "300px",
                  margin: "0 auto 1rem auto"
                }}>
                  <img
                    src={book.cover_image_url}
                    alt={`${book.title} cover`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "4px",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                    }}
                  />
                  
                  {/* Hover overlay with description */}
                  <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    borderRadius: "4px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "1rem",
                    opacity: isHovered ? 1 : 0,
                    transition: "opacity 0.3s ease",
                    textAlign: "center",
                    pointerEvents: "none"
                  }}>
                    <div style={{
                      color: "var(--Off-Black, #474747)",
                      fontFamily: '"Neue Haas Grotesk Text Pro"',
                      fontSize: "14px",
                      fontWeight: 500,
                      lineHeight: "1.4",
                      maxHeight: "200px",
                      overflow: "hidden",
                      textOverflow: "ellipsis"
                    }}>
                      {book.short_summary || "No description available"}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Book title with ranking */}
              <div style={{
                color: "var(--Off-Black, #474747)",
                fontFamily: '"Neue Haas Grotesk Text Pro"',
                fontSize: "16px",
                fontStyle: "italic",
                fontWeight: 500,
                lineHeight: "normal",
                marginBottom: "0.5rem"
              }}>
                {book.ranking ? `${book.ranking}. ` : ""}{book.title}
              </div>
              
              {/* Author */}
              <div style={{
                color: "var(--Author, #4F4F4F)",
                fontFamily: '"Neue Haas Grotesk Text Pro"',
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "normal"
              }}>
                {book.authors}
              </div>
            </div>
          )
        })}
      </div>

      {books.length === 0 && (
        <div style={{ textAlign: "center", color: "#666" }}>
          No books found for this category and year.
        </div>
      )}
    </div>
  )
}
