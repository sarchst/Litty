import { useState, useEffect, useRef } from 'react'
import Sidebar from './Sidebar'

export default function Header({ onNavigate, booksCache, cacheLoading, onBookSelect, onSeeAll, websiteLive = true }) {
  const [isMobile, setIsMobile] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const logoRef = useRef(null)
  const menuLogoRef = useRef(null)

  // Check if screen is mobile size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  // Force GIF to loop continuously by reloading it with cache-busting parameter
  useEffect(() => {
    const restartGif = (imgRef) => {
      if (imgRef?.current) {
        const img = imgRef.current
        // Use cache-busting query parameter to force reload and restart animation
        const baseSrc = img.src.split('?')[0]
        img.src = `${baseSrc}?t=${Date.now()}`
      }
    }

    // Restart GIFs every 10 seconds to ensure continuous looping
    // This reloads the GIF to restart the animation cycle
    // Adjust the interval based on your GIF's animation duration
    const interval = setInterval(() => {
      restartGif(logoRef)
      restartGif(menuLogoRef)
    }, 10000)

    return () => clearInterval(interval)
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
        height: "64px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "stretch",
        borderBottom: "1px solid #474747"
      }}
    >
      {/* Logo Frame */}
      <div 
        style={{ 
          display: "flex", 
          alignItems: "center", 
          padding: "16px",
          cursor: "pointer" 
        }}
        onClick={() => onNavigate('home')}
      >
        {/* Animated Logo */}
        <img
          ref={logoRef}
          src="/images/animated-logo.gif"
          alt="Litty Logo"
          style={{
            height: "32px",
            width: "auto",
            flexShrink: 0
          }}
        />
      </div>
      
      {/* Navigation */}
      {websiteLive && !isMobile ? (
        // Desktop Navigation Frame
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          paddingRight: "16px",
          gap: "32px"
        }}>
          <div
            className="tk-new-spirit"
            onClick={() => onNavigate('the-project')}
            style={{
              width: "137px",
              height: "23px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--Off-Black, #474747)",
              fontFamily: '"New Spirit", "new-spirit", "Playfair Display", serif',
              fontSize: "18px",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "normal",
              cursor: "pointer",
              transition: "opacity 0.2s ease"
            }}
            onMouseEnter={(e) => e.target.style.opacity = "0.7"}
            onMouseLeave={(e) => e.target.style.opacity = "1"}
          >
            THE PROJECT
          </div>
          {/* Temporarily hidden - pages not ready for launch */}
          {/* <div
            className="tk-new-spirit"
            onClick={() => onNavigate('blog')}
            style={{
              width: "55px",
              height: "23px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--Off-Black, #474747)",
              fontFamily: '"New Spirit", "new-spirit", "Playfair Display", serif',
              fontSize: "18px",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "normal",
              cursor: "pointer",
              transition: "opacity 0.2s ease"
            }}
            onMouseEnter={(e) => e.target.style.opacity = "0.7"}
            onMouseLeave={(e) => e.target.style.opacity = "1"}
          >
            BLOG
          </div> */}
          <div
            className="tk-new-spirit"
            onClick={() => onNavigate('about-us')}
            style={{
              width: "99px",
              height: "23px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--Off-Black, #474747)",
              fontFamily: '"New Spirit", "new-spirit", "Playfair Display", serif',
              fontSize: "18px",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "normal",
              cursor: "pointer",
              transition: "opacity 0.2s ease"
            }}
            onMouseEnter={(e) => e.target.style.opacity = "0.7"}
            onMouseLeave={(e) => e.target.style.opacity = "1"}
          >
            ABOUT US
          </div>
        </div>
      ) : websiteLive && isMobile ? (
        // Mobile Menu
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          paddingRight: "16px"
        }}>
          <button
            className="tk-new-spirit"
            onClick={handleMenuClick}
            style={{
              width: "55px",
              height: "23px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--Off-Black, #474747)",
              fontFamily: '"New Spirit", "new-spirit", "Playfair Display", serif',
              fontSize: "18px",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "normal",
              background: "none",
              border: "none",
              cursor: "pointer",
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
                  height: "64px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "stretch",
                  borderBottom: "1px solid #474747"
                }}
              >
                {/* Logo Frame */}
                <div 
                  style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    padding: "16px",
                    cursor: "pointer" 
                  }}
                  onClick={() => {
                    setIsMenuOpen(false)
                    onNavigate('home')
                  }}
                >
                  {/* Animated Logo */}
                  <img
                    ref={menuLogoRef}
                    src="/images/animated-logo.gif"
                    alt="Litty Logo"
                    style={{
                      height: "32px",
                      width: "auto",
                      flexShrink: 0
                    }}
                  />
                </div>
                
                {/* Close button */}
                <div
                  style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    paddingRight: "16px"
                  }}
                >
                  <button
                    className="tk-new-spirit"
                    onClick={() => setIsMenuOpen(false)}
                    style={{
                      width: "55px",
                      height: "23px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--Off-Black, #474747)",
                      fontFamily: '"New Spirit", "new-spirit", "Playfair Display", serif',
                      fontSize: "18px",
                      fontStyle: "normal",
                      fontWeight: 600,
                      lineHeight: "normal",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      transition: "opacity 0.2s ease"
                    }}
                    onMouseEnter={(e) => e.target.style.opacity = "0.7"}
                    onMouseLeave={(e) => e.target.style.opacity = "1"}
                  >
                    close
                  </button>
                </div>
              </div>
              
              {/* Menu Content */}
              <div onClick={(e) => e.stopPropagation()}>
                {/* Navigation Buttons */}
                <div style={{ padding: "2rem 1rem 1rem 1rem", marginBottom: "1rem" }}>
                  <div
                    className="tk-new-spirit"
                    onClick={() => handleNavClick('the-project')}
                    style={{
                      fontFamily: '"New Spirit", "new-spirit", "Playfair Display", serif',
                      fontWeight: 600,
                      fontSize: "16px",
                      color: "var(--Off-Black, #474747)",
                      cursor: "pointer",
                      padding: "1rem 0",
                      transition: "opacity 0.2s ease"
                    }}
                    onMouseEnter={(e) => e.target.style.opacity = "0.7"}
                    onMouseLeave={(e) => e.target.style.opacity = "1"}
                  >
                    THE PROJECT
                  </div>
                  {/* Temporarily hidden - pages not ready for launch */}
                  {/* <div
                    className="tk-new-spirit"
                    onClick={() => handleNavClick('blog')}
                    style={{
                      fontFamily: '"New Spirit", "new-spirit", "Playfair Display", serif',
                      fontWeight: 600,
                      fontSize: "16px",
                      color: "var(--Off-Black, #474747)",
                      cursor: "pointer",
                      padding: "1rem 0",
                      transition: "opacity 0.2s ease"
                    }}
                    onMouseEnter={(e) => e.target.style.opacity = "0.7"}
                    onMouseLeave={(e) => e.target.style.opacity = "1"}
                  >
                    BLOG
                  </div> */}
                  <div
                    className="tk-new-spirit"
                    onClick={() => handleNavClick('about-us')}
                    style={{
                      fontFamily: '"New Spirit", "new-spirit", "Playfair Display", serif',
                      fontWeight: 600,
                      fontSize: "16px",
                      color: "var(--Off-Black, #474747)",
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
                    className="tk-new-spirit"
                    style={{
                      fontFamily: '"New Spirit", "new-spirit", "Playfair Display", serif',
                      fontWeight: 600,
                      fontSize: "16px",
                      color: "var(--Off-Black, #474747)",
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
      ) : null}
    </div>
  )
}
