import { useState, useEffect } from 'react'

export default function Sidebar({ onBookSelect, onSeeAll }) {
  const [expandedYears, setExpandedYears] = useState({})
  const [booksByYear, setBooksByYear] = useState({})
  const [loading, setLoading] = useState(true)
  const [hoveredBook, setHoveredBook] = useState(null)
  const [hoveredRowRef, setHoveredRowRef] = useState(null)
  const [scrollContainerRef, setScrollContainerRef] = useState(null)

  useEffect(() => {
    fetch('/api/books?top_5=true')
      .then(response => response.json())
      .then(data => {
        console.log('Raw API data:', data)
        
        // Organize by year and fiction/non-fiction (API already filtered by top_5)
        const organizedBooks = {}
        
        Object.keys(data).forEach(year => {
          const yearBooks = data[year] // No need to filter, API already returns top_5 books
          console.log(`Year ${year} books:`, yearBooks)
          
          if (yearBooks.length > 0) {
            organizedBooks[year] = {
              fiction: yearBooks.filter(book => book.is_fiction === true),
              nonfiction: yearBooks.filter(book => book.is_fiction === false)
            }
            
            // Initialize expanded state for this year
            setExpandedYears(prev => ({ ...prev, [year]: true }))
          }
        })
        
        console.log('Organized books:', organizedBooks)
        setBooksByYear(organizedBooks)
        
        // Preload all cover images
        preloadCoverImages(organizedBooks)
        
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching books:', error)
        setLoading(false)
      })
  }, [])

  const preloadCoverImages = (booksByYear) => {
    Object.values(booksByYear).forEach(yearData => {
      [...yearData.fiction, ...yearData.nonfiction].forEach(book => {
        if (book.cover_image_url) {
          const img = new Image()
          img.src = book.cover_image_url
        }
      })
    })
  }

  const toggleYear = (year) => {
    setExpandedYears(prev => ({ ...prev, [year]: !prev[year] }))
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden", position: "relative" }}>
      <div style={{ 
        padding: "1rem", 
        borderRight: "1px solid #474747",
        borderBottom: "1px solid #474747",
        height: "200px",
        display: "flex",
        flexDirection: "column"
      }}>
        <div style={{
          width: "71%",
          fontSize: "16px"
        }}>
          <text>We checked the lists so you don't have to. We gather the most trusted end-of-year book lists from critics, publishers, and reviewers, then bring them together in one place. No endless scrolling—just the books worth your time, all neatly in one spot</text>
        </div>
      </div>
      
            {/* Scrollable book list */}
            <div
              ref={setScrollContainerRef}
              style={{
                flex: 1,
                overflowY: "auto",
                borderRight: "1px solid #474747"
              }}
            >
        {loading ? (
          <div style={{ padding: "2rem", textAlign: "center" }}>Loading books...</div>
        ) : (
          Object.keys(booksByYear)
            .sort((a, b) => parseInt(b) - parseInt(a)) // Sort years descending (most recent first)
            .map((year, index) => (
          <div key={year}>
            {/* Year Header - Sticky */}
            <div
              style={{
                position: "sticky",
                top: 0,
                backgroundColor: "white",
                zIndex: 10,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "8px 16px",
                borderTop: index === 0 ? "none" : "1px solid #474747",
                borderBottom: "1px solid #474747",
                cursor: "pointer",
                transition: "background-color 0.2s ease"
              }}
              onClick={() => toggleYear(year)}
              onMouseEnter={(e) => e.target.style.backgroundColor = "#f8f8f8"}
              onMouseLeave={(e) => e.target.style.backgroundColor = "white"}
            >
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 600,
                fontSize: "18px",
                color: "#474747"
              }}>
                {year}
              </div>
              <div style={{
                width: "20px",
                height: "21px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: expandedYears[year] ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s ease"
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                  <g clipPath="url(#clip0_2562_3503)">
                    <path d="M10 7.16675L5 12.1667L6.175 13.3417L10 9.52508L13.825 13.3417L15 12.1667L10 7.16675Z" fill="#323232"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_2562_3503">
                      <rect width="20" height="20" fill="white" transform="translate(0 0.5)"/>
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>

            {/* Year Content */}
            {expandedYears[year] && (
              <div>
                {/* Fiction Section */}
                <div style={{ padding: "8px 0" }}>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0 16px 8px 16px"
                  }}>
                    <div style={{
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 600,
                      fontSize: "18px",
                      color: "#474747"
                    }}>
                      FICTION
                    </div>
                    <div 
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        cursor: "pointer",
                        transition: "opacity 0.2s ease"
                      }}
                      onClick={() => onSeeAll(year, 'fiction')}
                      onMouseEnter={(e) => e.target.style.opacity = "0.7"}
                      onMouseLeave={(e) => e.target.style.opacity = "1"}
                    >
                      <span style={{
                        color: "var(--Off-Black, #474747)",
                        fontFamily: '"Suisse Int\'l"',
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "normal"
                      }}>
                        See all
                      </span>
                      <span style={{ fontSize: "16px", color: "#474747" }}>›</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    {booksByYear[year].fiction
                      .slice()
                      .sort((a, b) => (a.ranking || 0) - (b.ranking || 0))
                      .map((book, index) => (
                      <div 
                        key={book.id || index} 
                        style={{
                          display: "flex",
                          padding: "0 16px 0 32px",
                          alignItems: "center",
                          cursor: "pointer",
                          position: "relative"
                        }}
                        onClick={() => onBookSelect(book)}
                        onMouseEnter={(e) => {
                          setHoveredBook(book)
                          setHoveredRowRef(e.currentTarget)
                        }}
                        onMouseLeave={() => {
                          setHoveredBook(null)
                          setHoveredRowRef(null)
                        }}
                      >
                        <span 
                          style={{
                            width: "52%",
                            paddingLeft: "0.05%",
                            color: "var(--Off-Black, #474747)",
                            fontFamily: '"Neue Haas Grotesk Text Pro"',
                            fontSize: "16px",
                            fontStyle: "italic",
                            fontWeight: 500,
                            lineHeight: "normal"
                          }}
                        >
                          {book.title}
                        </span>
                        <span 
                          style={{
                            width: "48%",
                            color: "var(--Author, #4F4F4F)",
                            fontFamily: '"Neue Haas Grotesk Text Pro"',
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "normal"
                          }}
                        >
                          {book.authors}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Non-Fiction Section */}
                <div style={{ padding: "8px 0" }}>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0 16px 8px 16px"
                  }}>
                    <div style={{
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 600,
                      fontSize: "18px",
                      color: "#474747"
                    }}>
                      NON-FICTION
                    </div>
                    <div 
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        cursor: "pointer",
                        transition: "opacity 0.2s ease"
                      }}
                      onClick={() => onSeeAll(year, 'nonfiction')}
                      onMouseEnter={(e) => e.target.style.opacity = "0.7"}
                      onMouseLeave={(e) => e.target.style.opacity = "1"}
                    >
                      <span style={{
                        color: "var(--Off-Black, #474747)",
                        fontFamily: '"Suisse Int\'l"',
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "normal"
                      }}>
                        See all
                      </span>
                      <span style={{ fontSize: "16px", color: "#474747" }}>›</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    {booksByYear[year].nonfiction
                      .slice()
                      .sort((a, b) => (a.ranking || 0) - (b.ranking || 0))
                      .map((book, index) => (
                      <div 
                        key={book.id || index} 
                        style={{
                          display: "flex",
                          padding: "0 16px 0 32px",
                          alignItems: "center",
                          cursor: "pointer",
                          position: "relative"
                        }}
                        onClick={() => onBookSelect(book)}
                        onMouseEnter={(e) => {
                          setHoveredBook(book)
                          setHoveredRowRef(e.currentTarget)
                        }}
                        onMouseLeave={() => {
                          setHoveredBook(null)
                          setHoveredRowRef(null)
                        }}
                      >
                        <span 
                          style={{
                            width: "52%",
                            paddingLeft: "0.05%",
                            color: "var(--Off-Black, #474747)",
                            fontFamily: '"Neue Haas Grotesk Text Pro"',
                            fontSize: "16px",
                            fontStyle: "italic",
                            fontWeight: 500,
                            lineHeight: "normal"
                          }}
                        >
                          {book.title}
                        </span>
                        <span 
                          style={{
                            width: "48%",
                            color: "var(--Author, #4F4F4F)",
                            fontFamily: '"Neue Haas Grotesk Text Pro"',
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "normal"
                          }}
                        >
                          {book.authors}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))
        )}
      </div>

      {/* Hover cover image */}
      {hoveredBook && hoveredBook.cover_image_url && hoveredRowRef && scrollContainerRef && (
        <div
          style={{
            position: "absolute",
            top: hoveredRowRef.offsetTop + hoveredRowRef.offsetHeight / 2 - scrollContainerRef.scrollTop,
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
            pointerEvents: "none",
            opacity: 0.3,
            transition: "opacity 0.3s ease"
          }}
        >
          <img
            src={hoveredBook.cover_image_url}
            alt={`${hoveredBook.title} cover`}
            style={{
              width: "60px",
              height: "90px",
              objectFit: "cover",
              borderRadius: "4px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
            }}
          />
        </div>
      )}
    </div>
  )
}
