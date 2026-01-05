import { useState, useEffect, useRef } from 'react'

export default function BookDetails({ book, year, category, onBack }) {
  const [activeTab, setActiveTab] = useState('description')
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef(null)

  // Reset to description tab when book changes
  useEffect(() => {
    setActiveTab('description')
  }, [book?.id])

  // Reset scroll position to top when book changes or component mounts
  useEffect(() => {
    // Use requestAnimationFrame with a small delay to ensure it happens after render
    setTimeout(() => {
      // Scroll window
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      
      // Also try scrolling the document element and body for better compatibility
      if (document.documentElement) {
        document.documentElement.scrollTop = 0
      }
      if (document.body) {
        document.body.scrollTop = 0
      }
      
      // Find and scroll the Content component's scrollable parent container
      if (containerRef.current) {
        let element = containerRef.current.parentElement
        while (element && element !== document.body) {
          const style = window.getComputedStyle(element)
          if (style.overflow === 'auto' || style.overflowY === 'auto' || style.overflow === 'scroll' || style.overflowY === 'scroll') {
            element.scrollTop = 0
            break // Found the scrollable container, stop searching
          }
          element = element.parentElement
        }
      }
    }, 0)
  }, [book?.id])

  // Mobile detection
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  if (!book) return null

  const categoryTitle = category === 'fiction' ? 'FICTION' : 'NON-FICTION'
  const title = `BEST ${categoryTitle} BOOKS OF ${year}`

  const renderTabContent = () => {
    switch (activeTab) {
      case 'description':
        return (
          <div style={{
            color: "var(--Off-Black, #474747)",
            fontFamily: '"Suisse Int\'l", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            fontSize: "18px",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "normal",
            marginBottom: "2rem"
          }}>
              <div 
                style={{ marginBottom: "2rem" }}
                dangerouslySetInnerHTML={{ 
                  __html: book.description || "No description available." 
                }}
              />
            {book.primary_quotes && book.primary_quotes.length > 0 && (
              <div>
                <h3 style={{
                  color: "var(--Off-Black, #474747)",
                  fontFamily: '"Suisse Int\'l", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                  fontSize: "18px",
                  fontStyle: "normal",
                  fontWeight: 700,
                  lineHeight: "normal",
                  margin: "0 0 1rem 0"
                }}>
                  Praise for <span style={{ fontStyle: "italic" }}>{book.title}</span>
                </h3>
                {book.primary_quotes.map((quote, index) => (
                  <p key={index} style={{ 
                    margin: index === book.primary_quotes.length - 1 ? "0" : "0 0 1rem 0"
                  }}>
                    {quote}
                  </p>
                ))}
              </div>
            )}
          </div>
        )
      case 'author':
        return (
          <div style={{
            color: "var(--Off-Black, #474747)",
            fontFamily: '"Suisse Int\'l", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            fontSize: "18px",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "normal",
            marginBottom: "2rem"
          }}>
            {book.author_bio || "No author biography available."}
          </div>
        )
      case 'book-details':
        const formatPublishedDate = (publishedAt) => {
          if (!publishedAt) return null
          const date = new Date(publishedAt)
          return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })
        }

        const firstGenre = book.genres && book.genres.length > 0 ? book.genres[0] : ''
        const firstGenreContainsFiction = firstGenre.toLowerCase().includes('fiction')
        const categoryText = firstGenreContainsFiction ? '' : (book.is_fiction ? 'Fiction' : 'Non-Fiction')
        const genresList = book.genres && book.genres.length > 0 ? book.genres.join(' · ') : ''
        const publishedDate = formatPublishedDate(book.published_at)
        
        return (
          <div style={{
            color: "var(--Off-Black, #474747)",
            fontFamily: '"Suisse Int\'l", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            fontSize: "18px",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "normal",
            marginBottom: "2rem"
          }}>
            {/* Genre line */}
            <p style={{ margin: "0 0 1rem 0" }}>
              Genre: {categoryText && genresList ? `${categoryText} · ${genresList}` : categoryText || genresList}
            </p>
            
            {/* Publisher line */}
            {book.publisher && (
              <p style={{ margin: "0 0 1rem 0" }}>
                Publisher: {book.publisher}
              </p>
            )}
            
            {/* Published Date line */}
            {publishedDate && (
              <p style={{ margin: "0 0 1rem 0" }}>
                Published Date: {publishedDate}
              </p>
            )}
            
            {/* Length line */}
            {book.page_count && (
              <p style={{ margin: "0 0 1rem 0" }}>
                Length: {book.page_count} pages
              </p>
            )}
            
            {/* Placement line */}
            {book.year_rank && (
              <p style={{ margin: "0" }}>
                Litty's Ranking: #{book.global_rank} in {book.is_fiction ? 'Fiction' : 'Non-Fiction'}
              </p>
            )}
            
            {!categoryText && !book.publisher && !publishedDate && !book.page_count && !book.year_rank && (
              <p style={{ margin: "0" }}>No book details available.</p>
            )}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div 
      ref={containerRef}
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
      {/* Title with back button */}
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
        gap: "8px",
        position: "sticky",
        top: 0,
        backgroundColor: "white",
        zIndex: 10,
        paddingTop: "16px",
        paddingBottom: "16px"
      }}>
        <button
          onClick={onBack}
          style={{
            background: "none",
            border: "none",
            color: "var(--Off-Black, #474747)",
            fontFamily: '"New Spirit", "new-spirit", "Playfair Display", serif',
            fontSize: "18px",
            fontStyle: "normal",
            fontWeight: 600,
            lineHeight: "normal",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: 0
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="7" height="11" viewBox="0 0 7 11" fill="none">
            <path d="M5.66667 0.5L6.84167 1.675L3.02501 5.5L6.84167 9.325L5.66667 10.5L0.666675 5.5L5.66667 0.5Z" fill="#323232"/>
          </svg>
          {title}
        </button>
      </div>
      
      {isMobile ? (
        /* Mobile Layout - Vertical Stack */
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {/* Cover image */}
          {book.cover_image_url && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
              <img 
                src={book.cover_image_url} 
                alt={`${book.title} cover`}
                style={{ 
                  width: "60%",
                  maxWidth: "300px",
                  height: "auto",
                  aspectRatio: "2/3",
                  objectFit: "cover",
                  borderRadius: "4px"
                }}
              />
              <p style={{
                color: "var(--Off-Black, #474747)",
                fontFamily: '"Suisse Int\'l", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "normal",
                textAlign: "center",
                margin: "0"
              }}>
                Purchase this book through our affiliate links<br />to help support us:
              </p>
              {(book.amazon_associates_link || book.amazon_associates_kindle_link || book.amazon_associates_audible_link) && (
                <div style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "1rem",
                  width: "100%",
                  maxWidth: "244px",
                  margin: "0 auto"
                }}>
                  {book.amazon_associates_link && (
                    <a 
                      href={book.amazon_associates_link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ display: "flex", alignItems: "center", flex: 1, maxWidth: "100%" }}
                    >
                      <img 
                        src="/images/amazon.svg" 
                        alt="Amazon"
                        style={{
                          height: "auto",
                          width: "100%",
                          maxWidth: "100%",
                          objectFit: "contain"
                        }}
                      />
                    </a>
                  )}
                  {book.amazon_associates_kindle_link && (
                    <a 
                      href={book.amazon_associates_kindle_link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ display: "flex", alignItems: "center", flex: 1, maxWidth: "100%" }}
                    >
                      <img 
                        src="/images/kindle.svg" 
                        alt="Kindle"
                        style={{
                          height: "auto",
                          width: "100%",
                          maxWidth: "100%",
                          objectFit: "contain"
                        }}
                      />
                    </a>
                  )}
                  {book.amazon_associates_audible_link && (
                    <a 
                      href={book.amazon_associates_audible_link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ display: "flex", alignItems: "center", flex: 1, maxWidth: "100%" }}
                    >
                      <img 
                        src="/images/audible.svg" 
                        alt="Audible"
                        style={{
                          height: "auto",
                          width: "100%",
                          maxWidth: "100%",
                          objectFit: "contain"
                        }}
                      />
                    </a>
                  )}
                </div>
              )}
            </div>
          )}
          
          {/* Title */}
          <div>
            <h1 style={{
              color: "var(--Off-Black, #474747)",
              fontFamily: '"Neue Haas Grotesk Text Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              fontSize: "32px",
              fontStyle: "italic",
              fontWeight: 500,
              lineHeight: "normal",
              margin: "0"
            }}>
              {book.title}
            </h1>
            {book.subtitle && (
              <h2 style={{
                color: "var(--Off-Black, #474747)",
                fontFamily: '"Neue Haas Grotesk Text Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                fontSize: "25px",
                fontStyle: "italic",
                fontWeight: 400,
                lineHeight: "normal",
                margin: "0 0 0.5rem 0"
              }}>
                {book.subtitle}
              </h2>
            )}
            <p style={{
              color: "var(--Author, #4F4F4F)",
              fontFamily: '"Neue Haas Grotesk Text Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              fontSize: "18px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "normal",
              margin: "0"
            }}>
              {book.authors}
            </p>
          </div>
          
          {/* Description */}
          <div>
            <h2 style={{
              color: "var(--Off-Black, #474747)",
              fontFamily: '"Neue Haas Grotesk Text Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              fontSize: "18px",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "normal",
              margin: "0 0 1rem 0"
            }}>Description</h2>
            <div style={{
              color: "var(--Off-Black, #474747)",
              fontFamily: '"Suisse Int\'l", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              fontSize: "18px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "normal",
              marginBottom: "2rem"
            }}>
              <div 
                style={{ marginBottom: "2rem" }}
                dangerouslySetInnerHTML={{ 
                  __html: book.description || "No description available." 
                }}
              />
              {book.primary_quotes && book.primary_quotes.length > 0 && (
                <div>
                  <h3 style={{
                    color: "var(--Off-Black, #474747)",
                    fontFamily: '"Suisse Int\'l", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                    fontSize: "18px",
                    fontStyle: "normal",
                    fontWeight: 700,
                    lineHeight: "normal",
                    margin: "0 0 1rem 0"
                  }}>
                    Praise for <span style={{ fontStyle: "italic" }}>{book.title}</span>
                  </h3>
                  {book.primary_quotes.map((quote, index) => (
                    <p key={index} style={{ 
                      margin: index === book.primary_quotes.length - 1 ? "0" : "0 0 1rem 0"
                    }}>
                      {quote}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Author */}
          <div>
            <h2 style={{
              color: "var(--Off-Black, #474747)",
              fontFamily: '"Neue Haas Grotesk Text Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              fontSize: "18px",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "normal",
              margin: "0 0 1rem 0"
            }}>Author</h2>
            <div style={{
              color: "var(--Off-Black, #474747)",
              fontFamily: '"Suisse Int\'l", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              fontSize: "18px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "normal",
              marginBottom: "2rem"
            }}>
              {book.author_bio || "No author biography available."}
            </div>
          </div>
          
          {/* Book Details */}
          <div>
            <h2 style={{
              color: "var(--Off-Black, #474747)",
              fontFamily: '"Neue Haas Grotesk Text Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              fontSize: "18px",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "normal",
              margin: "0 0 1rem 0"
            }}>Book Details</h2>
            <div style={{
              color: "var(--Off-Black, #474747)",
              fontFamily: '"Suisse Int\'l", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              fontSize: "18px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "normal",
              marginBottom: "2rem"
            }}>
              {(() => {
                const formatPublishedDate = (publishedAt) => {
                  if (!publishedAt) return null
                  const date = new Date(publishedAt)
                  return date.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })
                }

                const firstGenre = book.genres && book.genres.length > 0 ? book.genres[0] : ''
                const firstGenreContainsFiction = firstGenre.toLowerCase().includes('fiction')
                const categoryText = firstGenreContainsFiction ? '' : (book.is_fiction ? 'Fiction' : 'Non-Fiction')
                const genresList = book.genres && book.genres.length > 0 ? book.genres.join(' · ') : ''
                const publishedDate = formatPublishedDate(book.published_at)

                return (
                  <>
                    <p style={{ margin: "0 0 1rem 0" }}>
                      Genre: {categoryText && genresList ? `${categoryText} · ${genresList}` : categoryText || genresList}
                    </p>
                    {book.publisher && (
                      <p style={{ margin: "0 0 1rem 0" }}>
                        Publisher: {book.publisher}
                      </p>
                    )}
                    {publishedDate && (
                      <p style={{ margin: "0 0 1rem 0" }}>
                        Published Date: {publishedDate}
                      </p>
                    )}
                    {book.page_count && (
                      <p style={{ margin: "0 0 1rem 0" }}>
                        Length: {book.page_count} pages
                      </p>
                    )}
                    {book.year_rank && (
                      <p style={{ margin: "0" }}>
                        Litty's Ranking: #{book.global_rank} in {book.is_fiction ? 'Fiction' : 'Non-Fiction'}
                      </p>
                    )}
                    {!categoryText && !book.publisher && !publishedDate && !book.page_count && !book.year_rank && (
                      <p style={{ margin: "0" }}>No book details available.</p>
                    )}
                  </>
                )
              })()}
            </div>
          </div>
          
        </div>
      ) : (
        /* Desktop Layout - Grid */
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "minmax(200px, 448px) 31px minmax(300px, 608px)",
          gridTemplateRows: "auto",
          marginBottom: "2rem",
          gap: "0",
          maxWidth: "100%",
          overflow: "hidden"
        }}>
          
          {/* Cover image */}
          {book.cover_image_url && (
            <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: "1rem" }}>
              <img 
                src={book.cover_image_url} 
                alt={`${book.title} cover`}
                style={{ 
                  width: "100%",
                  maxWidth: "448px",
                  height: "auto",
                  aspectRatio: "2/3",
                  objectFit: "cover",
                  borderRadius: "4px"
                }}
              />
              <p style={{
                color: "var(--Off-Black, #474747)",
                fontFamily: '"Suisse Int\'l", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "normal",
                textAlign: "center",
                margin: "0",
                width: "100%",
                maxWidth: "448px"
              }}>
                Purchase this book through our affiliate links<br />to help support us:
              </p>
              {(book.amazon_associates_link || book.amazon_associates_kindle_link || book.amazon_associates_audible_link) && (
                <div style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "1rem",
                  width: "100%",
                  maxWidth: "302px",
                  margin: "0 auto"
                }}>
                  {book.amazon_associates_link && (
                    <a 
                      href={book.amazon_associates_link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ display: "flex", alignItems: "center", flex: 1, maxWidth: "100%" }}
                    >
                      <img 
                        src="/images/amazon.svg" 
                        alt="Amazon"
                        style={{
                          height: "auto",
                          width: "100%",
                          maxWidth: "100%",
                          objectFit: "contain"
                        }}
                      />
                    </a>
                  )}
                  {book.amazon_associates_kindle_link && (
                    <a 
                      href={book.amazon_associates_kindle_link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ display: "flex", alignItems: "center", flex: 1, maxWidth: "100%" }}
                    >
                      <img 
                        src="/images/kindle.svg" 
                        alt="Kindle"
                        style={{
                          height: "auto",
                          width: "100%",
                          maxWidth: "100%",
                          objectFit: "contain"
                        }}
                      />
                    </a>
                  )}
                  {book.amazon_associates_audible_link && (
                    <a 
                      href={book.amazon_associates_audible_link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ display: "flex", alignItems: "center", flex: 1, maxWidth: "100%" }}
                    >
                      <img 
                        src="/images/audible.svg" 
                        alt="Audible"
                        style={{
                          height: "auto",
                          width: "100%",
                          maxWidth: "100%",
                          objectFit: "contain"
                        }}
                      />
                    </a>
                  )}
                </div>
              )}
            </div>
          )}
          
          {/* Middle padding */}
          <div></div>
          
          {/* Title, author, tab buttons, and content */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
          {/* Title and author */}
          <div style={{ marginBottom: "2rem" }}>
            <h1 style={{
              color: "var(--Off-Black, #474747)",
              fontFamily: '"Neue Haas Grotesk Text Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              fontSize: "32px",
              fontStyle: "italic",
              fontWeight: 500,
              lineHeight: "normal",
              margin: "0"
            }}>
              {book.title}
            </h1>
            {book.subtitle && (
              <h2 style={{
                color: "var(--Off-Black, #474747)",
                fontFamily: '"Neue Haas Grotesk Text Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                fontSize: "25px",
                fontStyle: "italic",
                fontWeight: 400,
                lineHeight: "normal",
                margin: "0 0 0.5rem 0"
              }}>
                {book.subtitle}
              </h2>
            )}
            <p style={{
              color: "var(--Off-Black, #474747)",
              fontFamily: '"Neue Haas Grotesk Text Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              fontSize: "18px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "normal",
              margin: "0"
            }}>
              {book.authors}
            </p>
          </div>

          {/* Tab buttons */}
          <div style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: "2rem",
            paddingBottom: "0.5rem",
            borderBottom: "1px solid #474747",
            marginBottom: "1rem",
            width: "100%",
            maxWidth: "608px"
          }}>
            {['description', 'author', 'book-details'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  background: "none",
                  border: "none",
                  color: activeTab === tab ? "var(--Off-Black, #474747)" : "#474747",
                  fontFamily: '"Neue Haas Grotesk Text Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                  fontSize: "18px",
                  fontWeight: activeTab === tab ? 700 : 400,
                  lineHeight: "normal",
                  cursor: "pointer",
                  textTransform: "capitalize",
                  padding: "0"
                }}
              >
                {tab === 'book-details' ? 'Book Details' : tab}
              </button>
            ))}
          </div>

            <div style={{ 
              width: "100%", 
              maxWidth: "608px",
              wordWrap: "break-word",
              overflowWrap: "break-word",
              hyphens: "auto"
            }}>
              {renderTabContent()}
            </div>
          </div>
        </div>
      )}
        </div>
      </div>
    </div>
  )
}
