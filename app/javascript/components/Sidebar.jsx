import { useState, useEffect, useRef } from 'react'

export default function Sidebar({ onBookSelect, onSeeAll, isMobile = false, booksCache, cacheLoading, isInMenu = false }) {
  const [expandedYears, setExpandedYears] = useState({})
  const [booksByYear, setBooksByYear] = useState({})
  const [loading, setLoading] = useState(true)
  const [hoveredBook, setHoveredBook] = useState(null)
  const [hoveredRowRef, setHoveredRowRef] = useState(null)
  const [scrollContainerRef, setScrollContainerRef] = useState(null)
  const [cursorX, setCursorX] = useState(0)
  const yearContentRefs = useRef({})
  const yearHeaderRefs = useRef({})
  const previousExpandedYears = useRef({})

  // Reset expanded years when mobile state changes
  useEffect(() => {
    if (Object.keys(booksByYear).length > 0) {
      const newExpandedState = {}
      Object.keys(booksByYear).forEach(year => {
        newExpandedState[year] = !isMobile
      })
      setExpandedYears(newExpandedState)
    }
  }, [isMobile, booksByYear])

  useEffect(() => {
    if (booksCache) {
      
      // Organize by year and fiction/non-fiction
      const organizedBooks = {}
      
      Object.keys(booksCache).forEach(year => {
        const yearBooks = booksCache[year]
        // Filter for top 5 books only in sidebar
        const top5Books = yearBooks.filter(book => book.top_5 === true)
        
        if (top5Books.length > 0) {
          organizedBooks[year] = {
            fiction: top5Books.filter(book => book.is_fiction === true),
            nonfiction: top5Books.filter(book => book.is_fiction === false)
          }
          
          // Initialize expanded state for this year (closed on mobile, open on desktop)
          setExpandedYears(prev => ({ ...prev, [year]: !isMobile }))
        }
      })
      
      setBooksByYear(organizedBooks)
      
      // Preload all cover images
      preloadCoverImages(organizedBooks)
      
      setLoading(false)
    } else if (!cacheLoading) {
      // Cache failed to load
      setLoading(false)
    }
  }, [booksCache, cacheLoading, isMobile])

  // Add scroll event listener to hide cover on scroll
  useEffect(() => {
    const handleScroll = () => {
      setHoveredBook(null)
      setHoveredRowRef(null)
      setCursorX(0)
    }

    if (scrollContainerRef) {
      scrollContainerRef.addEventListener('scroll', handleScroll)
      return () => {
        scrollContainerRef.removeEventListener('scroll', handleScroll)
      }
    }
  }, [scrollContainerRef])

  // Scroll to expanded year on mobile
  useEffect(() => {
    if (!isMobile || !scrollContainerRef) {
      previousExpandedYears.current = { ...expandedYears }
      return
    }

    Object.keys(expandedYears).forEach(year => {
      const wasExpanded = previousExpandedYears.current[year]
      const isNowExpanded = expandedYears[year]

      if (!wasExpanded && isNowExpanded) {
        // Wait for content to fully render
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              setTimeout(() => {
                const headerRef = yearHeaderRefs.current[year]
                const contentRef = yearContentRefs.current[year]
                
                if (!headerRef || !contentRef || !scrollContainerRef) {
                  return
                }

                const containerRect = scrollContainerRef.getBoundingClientRect()
                const headerRect = headerRef.getBoundingClientRect()
                const contentRect = contentRef.getBoundingClientRect()
                
                const viewportHeight = containerRect.height
                const headerHeight = headerRect.height
                const currentScrollTop = scrollContainerRef.scrollTop
                const headerTopInViewport = headerRect.top - containerRect.top
                const contentTopInViewport = contentRect.top - containerRect.top
                const contentBottomInViewport = contentRect.bottom - containerRect.top
                
                const visibleScrollTop = currentScrollTop
                const visibleScrollBottom = currentScrollTop + viewportHeight
                const contentTopInScrollSpace = currentScrollTop + contentTopInViewport
                const contentBottomInScrollSpace = currentScrollTop + contentBottomInViewport
                
                // Check if content is in a comfortable viewing position
                const comfortableViewThreshold = headerHeight + 100
                const contentIsComfortablyVisible = contentTopInScrollSpace >= visibleScrollTop && 
                                                   contentTopInScrollSpace <= (visibleScrollTop + comfortableViewThreshold) &&
                                                   contentBottomInScrollSpace <= visibleScrollBottom

                if (!contentIsComfortablyVisible) {
                  const scrollHeightBeforeScroll = scrollContainerRef.scrollHeight
                  const clientHeightBeforeScroll = scrollContainerRef.clientHeight
                  const isScrollable = scrollHeightBeforeScroll > clientHeightBeforeScroll
                  
                  if (!isScrollable) {
                    // Container not scrollable yet - use scrollIntoView as fallback
                    setTimeout(() => {
                      const newScrollHeight = scrollContainerRef.scrollHeight
                      const newClientHeight = scrollContainerRef.clientHeight
                      
                      if (newScrollHeight > newClientHeight) {
                        // Now scrollable - calculate target and scroll
                        const headerPositionInScrollSpace = scrollContainerRef.scrollTop + (headerRef.getBoundingClientRect().top - scrollContainerRef.getBoundingClientRect().top)
                        scrollContainerRef.scrollTo({ top: headerPositionInScrollSpace, behavior: 'smooth' })
                      } else {
                        // Still not scrollable - use scrollIntoView
                        headerRef.scrollIntoView({ 
                          behavior: 'smooth', 
                          block: 'start',
                          inline: 'nearest'
                        })
                      }
                    }, 50)
                  } else {
                    // Container is scrollable - use normal scrollTo
                    const headerPositionInScrollSpace = currentScrollTop + headerTopInViewport
                    const maxScroll = scrollHeightBeforeScroll - viewportHeight
                    const targetScrollTop = Math.max(0, Math.min(headerPositionInScrollSpace, maxScroll))
                    scrollContainerRef.scrollTo({ top: targetScrollTop, behavior: 'smooth' })
                  }
                }
              }, 50)
            })
          })
        })
      }
    })

    previousExpandedYears.current = { ...expandedYears }
  }, [expandedYears, isMobile, scrollContainerRef])

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
      {!isInMenu && (
        <div style={{ 
          paddingTop: "32px",
          paddingLeft: "16px", 
          paddingBottom: "32px",
          paddingRight: "48px",
          borderRight: "1px solid #474747",
          borderBottom: "1px solid #474747",
          minHeight: "200px",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white"
        }}>
          <div 
            className="tk-neue-haas-grotesk-text"
            style={{
              width: "100%",
              color: "var(--Off-Black, #474747)",
              fontFamily: '"neue-haas-grotesk-text", "Neue Haas Grotesk Text Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: 300,
              lineHeight: "normal",
            }}>
            <text>We checked the lists so you don't have to. We gather the most trusted end-of-year book lists from critics, publishers, and reviewers, then bring them together in one place. No endless scrolling—just the books worth your time, all neatly in one spot</text>
          </div>
        </div>
      )}
      
            {/* Scrollable book list */}
            <div
              ref={setScrollContainerRef}
              style={{
                flex: 1,
                overflowY: "auto",
                borderRight: isInMenu ? "none" : "1px solid #474747"
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
              ref={el => yearHeaderRefs.current[year] = el}
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
                color: "var(--Off-Black, #474747)",
                fontFamily: '"New Spirit", "new-spirit", "Playfair Display", serif',
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "normal"
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
              <div ref={el => yearContentRefs.current[year] = el}>
                {/* Fiction Section */}
                <div style={{ padding: "8px 0" }}>
                  <div 
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "0 16px 8px 16px",
                      cursor: "pointer",
                      transition: "opacity 0.2s ease"
                    }}
                    onClick={(e) => {
                      e.currentTarget.style.opacity = "1"
                      onSeeAll(year, 'fiction')
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = "0.7"}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
                  >
                    <div style={{
                      color: "var(--Off-Black, #474747)",
                      fontFamily: '"New Spirit", "new-spirit", "Playfair Display", serif',
                      fontSize: "16px",
                      fontStyle: "normal",
                      fontWeight: 600,
                      lineHeight: "normal"
                    }}>
                      FICTION
                    </div>
                    <div 
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px"
                      }}
                    >
                      <span style={{
                        color: "var(--Off-Black, #474747)",
                        fontFamily: '"Suisse Int\'l", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
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
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    {booksByYear[year].fiction
                      .slice()
                      .sort((a, b) => (a.year_rank || 0) - (b.year_rank || 0))
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
                          setCursorX(e.clientX)
                        }}
                        onMouseLeave={() => {
                          setHoveredBook(null)
                          setHoveredRowRef(null)
                          setCursorX(0)
                        }}
                      >
                        <span 
                          style={{
                            width: "52%",
                            paddingLeft: "0.05%",
                            color: "var(--Off-Black, #474747)",
                            fontFamily: '"Neue Haas Grotesk Text Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                            fontSize: "16px",
                            fontStyle: "italic",
                            fontWeight: 400,
                            lineHeight: "normal"
                          }}
                        >
                          {book.title}
                        </span>
                        <span 
                          style={{
                            width: "48%",
                            color: "var(--Author, #4F4F4F)",
                            fontFamily: '"Neue Haas Grotesk Text Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 300,
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
                  <div 
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "0 16px 8px 16px",
                      cursor: "pointer",
                      transition: "opacity 0.2s ease"
                    }}
                    onClick={(e) => {
                      e.currentTarget.style.opacity = "1"
                      onSeeAll(year, 'nonfiction')
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = "0.7"}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
                  >
                    <div style={{
                      color: "var(--Off-Black, #474747)",
                      fontFamily: '"New Spirit", "new-spirit", "Playfair Display", serif',
                      fontSize: "16px",
                      fontStyle: "normal",
                      fontWeight: 600,
                      lineHeight: "normal"
                    }}>
                      NON-FICTION
                    </div>
                    <div 
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px"
                      }}
                    >
                      <span style={{
                        color: "var(--Off-Black, #474747)",
                        fontFamily: '"Suisse Int\'l", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
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
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    {booksByYear[year].nonfiction
                      .slice()
                      .sort((a, b) => (a.year_rank || 0) - (b.year_rank || 0))
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
                          setCursorX(e.clientX)
                        }}
                        onMouseLeave={() => {
                          setHoveredBook(null)
                          setHoveredRowRef(null)
                          setCursorX(0)
                        }}
                      >
                        <span 
                          style={{
                            width: "52%",
                            paddingLeft: "0.05%",
                            color: "var(--Off-Black, #474747)",
                            fontFamily: '"Neue Haas Grotesk Text Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                            fontSize: "16px",
                            fontStyle: "italic",
                            fontWeight: 400,
                            lineHeight: "normal"
                          }}
                        >
                          {book.title}
                        </span>
                        <span 
                          style={{
                            width: "48%",
                            color: "var(--Author, #4F4F4F)",
                            fontFamily: '"Neue Haas Grotesk Text Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 300,
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
      {hoveredBook && hoveredBook.cover_image_url && hoveredRowRef && scrollContainerRef && cursorX > 0 && (
        <div
          style={{
            position: "absolute",
            top: hoveredRowRef.offsetTop + hoveredRowRef.offsetHeight / 2 - scrollContainerRef.scrollTop,
            left: cursorX - scrollContainerRef.getBoundingClientRect().left,
            transform: "translate(-50%, -50%)",
            zIndex: 11,
            pointerEvents: "none",
            opacity: 0.3,
            transition: "opacity 0.3s ease"
          }}
        >
          <img
            src={hoveredBook.cover_image_url}
            alt={`${hoveredBook.title} cover`}
            style={{
              width: "90px",
              height: "135px",
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
