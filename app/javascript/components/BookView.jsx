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
  const [columns, setColumns] = useState(4)
  const [overlayFontSize, setOverlayFontSize] = useState(14)

  // Reset loading state when selected book changes
  useEffect(() => {
    setImageLoading(true)
    setImageError(false)
  }, [selectedBook?.id])

  // Responsive column calculation: 4 → 3 → 2 based on screen width
  // Also calculate dynamic font size: 14px at full width → 13px before switching to 3 columns
  useEffect(() => {
    const calculateColumnsAndFontSize = () => {
      const width = window.innerWidth
      
      // Calculate columns
      if (width >= 1200) {
        setColumns(4)
      } else if (width >= 900) {
        setColumns(3)
      } else {
        setColumns(2)
      }
      
      // Calculate font size: 14px at width >= 1400, sliding to 13px at 1270, 12.25px at 1204
      // Below 1200px: reset to 14px and interpolate to 12px at 800px
      if (width >= 1400) {
        setOverlayFontSize(14)
      } else if (width >= 1270) {
        // Linear interpolation: 14px at 1400, 13px at 1270
        const fontSize = 13 + ((width - 1270) / (1400 - 1270)) * (14 - 13)
        setOverlayFontSize(fontSize)
      } else if (width >= 1204) {
        // Linear interpolation: 13px at 1270, 12.25px at 1204
        const fontSize = 12.25 + ((width - 1204) / (1270 - 1204)) * (13 - 12.25)
        setOverlayFontSize(fontSize)
      } else if (width >= 1200) {
        // At exactly 1200px: maintain 12.25px from interpolation above
        setOverlayFontSize(12.25)
      } else if (width >= 900) {
        // Below 1200px: reset to 14px at 1200, interpolate to 12.25px at 900
        const fontSize = 12.25 + ((width - 900) / (1200 - 900)) * (14 - 12.25)
        setOverlayFontSize(fontSize)
      } else {
        // Below 900px: reset to 16px for 2 columns
        setOverlayFontSize(16)
      }
    }
    calculateColumnsAndFontSize()
    window.addEventListener('resize', calculateColumnsAndFontSize)
    return () => window.removeEventListener('resize', calculateColumnsAndFontSize)
  }, [])

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
      <div 
        style={{ 
          width: "100%",
          height: "100%",
          backgroundColor: "white",
          padding: "32px 16px 32px 32px",
          boxSizing: "border-box"
        }}
      >
        <div 
          style={{ 
            width: "100%",
            height: "100%",
            maxWidth: "1920px",
            maxHeight: "1080px",
            padding: "32px 16px 16px 32px",
            backgroundColor: "white",
            margin: "0 auto",
            position: "relative"
          }}
        >
          <div style={{
            position: "absolute",
            top: "0",
            left: "0"
          }}>
            <div style={{
              color: "var(--Off-Black, #474747)",
              fontFamily: '"New Spirit", "new-spirit", "Playfair Display", serif',
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
        </div>
      </div>
    )
  }

  return (
    <div 
      style={{ 
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        padding: "32px 16px 32px 32px",
        boxSizing: "border-box"
      }}
    >
      <div 
        style={{ 
          width: "100%",
          height: "100%",
          maxWidth: "1920px",
          maxHeight: "1080px",
          padding: "32px 16px 16px 32px",
          backgroundColor: "white",
          margin: "0 auto",
          position: "relative"
        }}
      >
        <div style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%"
        }}>
      {/* Title without button */}
      <div style={{
        color: "var(--Off-Black, #474747)",
        fontFamily: '"New Spirit", "new-spirit", "Playfair Display", serif',
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

      {/* Books grid - responsive: 4 → 3 → 2 columns based on screen width */}
      <div style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: columns === 2 ? "24px" : "32px",
        marginBottom: "2rem"
      }}>
        {books
          .slice()
          .sort((a, b) => (a.year_rank || 0) - (b.year_rank || 0))
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
                  aspectRatio: "2/3", // Consistent book aspect ratio for all screen sizes
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
                    backgroundColor: "rgba(255, 255, 255, 0.925)",
                    borderRadius: "4px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    paddingTop: "0.875rem",
                    paddingBottom: "0.75rem",
                    paddingLeft: "1rem",
                    paddingRight: "1rem",
                    opacity: isHovered ? 1 : 0,
                    transition: "opacity 0.3s ease",
                    textAlign: "left",
                    pointerEvents: "none"
                  }}>
                    <div style={{
                      color: "var(--Off-Black, #474747)",
                      fontFamily: '"Neue Haas Grotesk Text Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                      fontSize: `${overlayFontSize}px`,
                      fontStyle: "normal",
                      fontWeight: 300,
                      lineHeight: "normal",
                      maxHeight: "calc(100% - 1.625rem)",
                      overflow: "auto",
                      textOverflow: "ellipsis"
                    }}>
                      {book.short_summary || "No description available"}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Book title with year_rank */}
              <div style={{
                color: "var(--Off-Black, #474747)",
                textAlign: "center",
                fontFamily: '"Neue Haas Grotesk Text Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                fontSize: "16px",
                fontStyle: "italic",
                fontWeight: 400,
                lineHeight: "normal",
                marginBottom: "0.5rem"
              }}>
                {book.year_rank ? `${book.year_rank}. ` : ""}{book.title}
              </div>
              
              {/* Author */}
              <div style={{
                color: "var(--Author, #4F4F4F)",
                fontFamily: '"Neue Haas Grotesk Text Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: 300,
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
      </div>
    </div>
  )
}
