import { useState, useEffect } from 'react'
import Sidebar from './Sidebar'

export default function Header({ onNavigate, booksCache, cacheLoading, onBookSelect, onSeeAll }) {
  const [isMobile, setIsMobile] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Check if screen is mobile size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  // Note: Removed click-outside-to-close functionality
  // Menu should only close when explicitly closed or when navigating to content

  const handleMenuClick = (e) => {
    e.stopPropagation()
    setIsMenuOpen(!isMenuOpen)
  }

  const handleNavClick = (page) => {
    onNavigate(page)
    setIsMenuOpen(false)
  }

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "16px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #474747"
      }}
    >
      {/* Logo Section */}
      <div 
        style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}
        onClick={() => onNavigate('home')}
      >
        {/* Logo Icon */}
        <img
          src="/images/litty_icon.png"
          alt="Litty Logo"
          style={{
            width: "32px",
            height: "32px",
            flexShrink: 0
          }}
        />
        {/* Logo Text */}
        <div
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 600,
            fontSize: "18px",
            color: "#474747",
            letterSpacing: "0.5px",
            whiteSpace: "nowrap"
          }}
        >
          LITTY
        </div>
      </div>
      
      {/* Navigation */}
      {!isMobile ? (
        // Desktop Navigation
        <nav style={{ display: "flex", gap: "32px", alignItems: "center" }}>
          <div
            onClick={() => onNavigate('the-project')}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 600,
              fontSize: "18px",
              color: "#474747",
              cursor: "pointer",
              transition: "opacity 0.2s ease"
            }}
            onMouseEnter={(e) => e.target.style.opacity = "0.7"}
            onMouseLeave={(e) => e.target.style.opacity = "1"}
          >
            THE PROJECT
          </div>
          <div
            onClick={() => onNavigate('blog')}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 600,
              fontSize: "18px",
              color: "#474747",
              cursor: "pointer",
              transition: "opacity 0.2s ease"
            }}
            onMouseEnter={(e) => e.target.style.opacity = "0.7"}
            onMouseLeave={(e) => e.target.style.opacity = "1"}
          >
            BLOG
          </div>
          <div
            onClick={() => onNavigate('about-us')}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 600,
              fontSize: "18px",
              color: "#474747",
              cursor: "pointer",
              transition: "opacity 0.2s ease"
            }}
            onMouseEnter={(e) => e.target.style.opacity = "0.7"}
            onMouseLeave={(e) => e.target.style.opacity = "1"}
          >
            ABOUT US
          </div>
        </nav>
      ) : (
        // Mobile Menu
        <div style={{ position: "relative" }}>
          <button
            onClick={handleMenuClick}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 600,
              fontSize: "18px",
              color: "#474747",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px 12px",
              transition: "opacity 0.2s ease"
            }}
            onMouseEnter={(e) => e.target.style.opacity = "0.7"}
            onMouseLeave={(e) => e.target.style.opacity = "1"}
          >
            menu
          </button>
          
          {/* Full Page Menu Overlay */}
          {isMenuOpen && (
            <div
              style={{
                position: "fixed",
                top: "0",
                left: "0",
                right: "0",
                bottom: "0",
                backgroundColor: "white",
                zIndex: 1000,
                overflow: "auto",
                padding: "0"
              }}
            >
              {/* Header with close button */}
              <div
                style={{
                  backgroundColor: "white",
                  padding: "16px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: "1px solid #474747"
                }}
              >
                {/* Logo Section */}
                <div 
                  style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}
                  onClick={() => {
                    setIsMenuOpen(false)
                    onNavigate('home')
                  }}
                >
                  <img
                    src="/images/litty_icon.png"
                    alt="Litty Logo"
                    style={{
                      width: "32px",
                      height: "32px",
                      flexShrink: 0
                    }}
                  />
                  <div
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 600,
                      fontSize: "18px",
                      color: "#474747",
                      letterSpacing: "0.5px",
                      whiteSpace: "nowrap"
                    }}
                  >
                    LITTY
                  </div>
                </div>
                
                {/* Close button */}
                <button
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 600,
                    fontSize: "18px",
                    color: "#474747",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "8px 12px"
                  }}
                >
                  close
                </button>
              </div>
              
              {/* Menu Content */}
              <div onClick={(e) => e.stopPropagation()}>
                {/* Navigation Buttons */}
                <div style={{ padding: "2rem 1rem", marginBottom: "1rem" }}>
                  <div
                    onClick={() => handleNavClick('the-project')}
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 600,
                      fontSize: "24px",
                      color: "#474747",
                      cursor: "pointer",
                      padding: "1rem 0",
                      transition: "opacity 0.2s ease"
                    }}
                    onMouseEnter={(e) => e.target.style.opacity = "0.7"}
                    onMouseLeave={(e) => e.target.style.opacity = "1"}
                  >
                    THE PROJECT
                  </div>
                  <div
                    onClick={() => handleNavClick('blog')}
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 600,
                      fontSize: "24px",
                      color: "#474747",
                      cursor: "pointer",
                      padding: "1rem 0",
                      transition: "opacity 0.2s ease"
                    }}
                    onMouseEnter={(e) => e.target.style.opacity = "0.7"}
                    onMouseLeave={(e) => e.target.style.opacity = "1"}
                  >
                    BLOG
                  </div>
                  <div
                    onClick={() => handleNavClick('about-us')}
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 600,
                      fontSize: "24px",
                      color: "#474747",
                      cursor: "pointer",
                      padding: "1rem 0",
                      transition: "opacity 0.2s ease"
                    }}
                    onMouseEnter={(e) => e.target.style.opacity = "0.7"}
                    onMouseLeave={(e) => e.target.style.opacity = "1"}
                  >
                    ABOUT US
                  </div>
                </div>
                
                {/* Modified Sidebar with "SEE THE BEST OF" header - no padding */}
                <div>
                  {/* SEE THE BEST OF Header - not clickable */}
                  <div
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 600,
                      fontSize: "18px",
                      color: "#474747",
                      padding: "8px 16px",
                      borderTop: "1px solid #474747",
                      borderBottom: "1px solid #474747",
                      backgroundColor: "white",
                      pointerEvents: "none" // Make it non-clickable
                    }}
                  >
                    SEE THE BEST OF
                  </div>
                  
                  {/* Sidebar Component */}
                  <Sidebar 
                    onBookSelect={(book) => {
                      setIsMenuOpen(false) // Close menu
                      // Don't navigate, just trigger book selection
                      onBookSelect && onBookSelect(book)
                    }}
                    onSeeAll={(year, category) => {
                      setIsMenuOpen(false) // Close menu
                      // Don't navigate, just trigger see all
                      onSeeAll && onSeeAll(year, category)
                    }}
                    isMobile={true}
                    booksCache={booksCache}
                    cacheLoading={cacheLoading}
                    isInMenu={true} // Flag to indicate this is in the menu
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
