import { useState, useEffect } from 'react'

export default function LandingPage() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  if (isMobile) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        {/* Title */}
        <h2 style={{
          color: "var(--Off-Black, #474747)",
          fontFamily: "'Playfair Display', serif",
          fontSize: "48px",
          fontStyle: "normal",
          fontWeight: 600,
          lineHeight: "1.2",
          margin: 0
        }}>Find the books everyone's talking about.</h2>
        
        {/* Image */}
        <div style={{ display: "flex", justifyContent: "center", margin: "1rem 0" }}>
          <img
            src="/images/landing_page.png"
            alt="Landing page illustration"
            style={{
              maxWidth: "250px",
              maxHeight: "250px",
              objectFit: "contain"
            }}
          />
        </div>
      </div>
    )
  }

  // Desktop layout (unchanged)
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
