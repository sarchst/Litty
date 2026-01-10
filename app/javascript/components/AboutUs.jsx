import { useState, useEffect } from 'react'

export default function AboutUs() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth
      const mobile = width <= 982
      console.log(`Screen width: ${width}px, isMobile: ${mobile}`)
      setIsMobile(mobile)
    }
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  return (
    <div 
      style={{ 
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        padding: isMobile ? "32px 16px 80px 16px" : "32px 16px 80px 32px",
        boxSizing: "border-box"
      }}
    >
      <div 
        style={{ 
          width: "100%",
          minHeight: "100%",
          maxWidth: "1920px",
          padding: isMobile ? "32px 16px 16px 16px" : "32px 16px 16px 32px",
          backgroundColor: "white",
          margin: "0 auto",
          boxSizing: "border-box"
        }}
      >
        <div style={{
          width: "100%",
          boxSizing: "border-box"
        }}>
          {/* Title */}
          <h1 
            className="tk-new-spirit"
            style={{
              color: "var(--Off-Black, #474747)",
              fontFamily: '"New Spirit SemiBold Condensed", "new-spirit", "Playfair Display", serif',
              fontSize: isMobile ? "48px" : "64px",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: isMobile ? "47px" : "63px",
              margin: "0 0 32px 0",
              transform: isMobile ? "scaleX(0.75)" : "scaleX(0.75)",
              transformOrigin: "left center",
              display: "inline-block"
            }}
          >
            About Us
          </h1>
          
          {/* Profile icons with text */}
          <div style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? "32px" : "16px",
            alignItems: "flex-start"
          }}>
            {/* First profile */}
            <div style={{
              display: "flex",
              flexDirection: "column",
              width: isMobile ? "100%" : "auto",
              flex: isMobile ? "none" : "1",
              minWidth: 0,
              maxWidth: isMobile ? "100%" : "300px"
            }}>
              <div style={{ width: "100%", margin: "0", padding: "0", lineHeight: "0" }}>
                <img
                  src="/images/hamish.png"
                  alt="Hamish Clark"
                  style={{
                    width: "100%",
                    height: "auto",
                    maxWidth: "100%",
                    aspectRatio: "1/1",
                    objectFit: "contain",
                    display: "block",
                    margin: "0",
                    padding: "0",
                    verticalAlign: "bottom"
                  }}
                />
              </div>
              <div style={{
                width: "100%",
                marginTop: isMobile ? "4px" : "16px",
                fontFamily: '"Neue Haas Grotesk Text Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                fontSize: "16px",
                fontWeight: 300,
                color: "var(--Off-Black, #474747)",
                lineHeight: "1.6"
              }}>
                <div style={{ 
                  fontFamily: '"New Spirit", "new-spirit", "Playfair Display", serif',
                  fontSize: "15px",
                  fontWeight: 600,
                  marginBottom: "0px" 
                }}>Hamish Clark</div>
                <div style={{ 
                  fontFamily: '"Neue Haas Grotesk Text Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                  fontSize: "15px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  marginBottom: "12px",
                  marginTop: "-4px"
                }}>Data</div>
                <p style={{ 
                  margin: "0 0 16px 0",
                  fontFamily: '"Neue Haas Grotesk Text Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                  fontSize: "15px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "1.2"
                }}>
                  Hamish's mom calls him a book savant. He calls it years of obsessive book spreadsheets. After years in publishing and now data science, one of those spreadsheets gained sentience and became litty.ca
                </p>
                {/* <div style={{ 
                  fontFamily: '"Neue Haas Grotesk Text Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                  fontSize: "15px",
                  fontWeight: 600,
                  marginBottom: "0px" 
                }}>Top 3 Books:</div>
                <div style={{ 
                  fontFamily: '"Neue Haas Grotesk Text Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                  fontSize: "15px",
                  marginBottom: "0px",
                  marginTop: "-4px" 
                }}>
                  <span style={{ fontStyle: "italic", fontWeight: 600 }}>Book Title</span> by Author Author
                </div>
                <div style={{ 
                  fontFamily: '"Neue Haas Grotesk Text Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                  fontSize: "15px",
                  marginBottom: "0px",
                  marginTop: "-4px" 
                }}>
                  <span style={{ fontStyle: "italic", fontWeight: 600 }}>Book Title</span> by Author Author
                </div>
                <div style={{ 
                  fontFamily: '"Neue Haas Grotesk Text Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                  fontSize: "15px",
                  marginBottom: "0",
                  marginTop: "-4px" 
                }}>
                  <span style={{ fontStyle: "italic", fontWeight: 600 }}>Book Title</span> by Author Author
                </div> */}
                <div style={{ 
                  fontFamily: '"Neue Haas Grotesk Text Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                  fontSize: "15px",
                  fontWeight: 600,
                  marginTop: "16px",
                  marginBottom: "0px"
                }}>Connect:</div>
                <div style={{ 
                  fontFamily: '"Neue Haas Grotesk Text Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                  fontSize: "15px",
                  marginBottom: "0",
                  marginTop: "-4px"
                }}>hamish [@] litty.ca</div>
              </div>
            </div>
            
            {/* Second profile */}
            <div style={{
              display: "flex",
              flexDirection: "column",
              width: isMobile ? "100%" : "auto",
              flex: isMobile ? "none" : "1",
              minWidth: 0,
              maxWidth: isMobile ? "100%" : "300px"
            }}>
              <div style={{ width: "100%", margin: "0", padding: "0", lineHeight: "0" }}>
                <img
                  src="/images/mark.png"
                  alt="Mark Perez"
                  style={{
                    width: "100%",
                    height: "auto",
                    maxWidth: "100%",
                    aspectRatio: "1/1",
                    objectFit: "contain",
                    display: "block",
                    margin: "0",
                    padding: "0",
                    verticalAlign: "bottom"
                  }}
                />
              </div>
              <div style={{
                width: "100%",
                marginTop: isMobile ? "4px" : "16px",
                fontFamily: '"Neue Haas Grotesk Text Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                fontSize: "16px",
                fontWeight: 300,
                color: "var(--Off-Black, #474747)",
                lineHeight: "1.6"
              }}>
                <div style={{ 
                  fontFamily: '"New Spirit", "new-spirit", "Playfair Display", serif',
                  fontSize: "15px",
                  fontWeight: 600,
                  marginBottom: "0px" 
                }}>Mark Perez</div>
                <div style={{ 
                  fontFamily: '"Neue Haas Grotesk Text Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                  fontSize: "15px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  marginBottom: "12px",
                  marginTop: "-4px"
                }}>Designer</div>
                <p style={{ 
                  margin: "0 0 16px 0",
                  fontFamily: '"Neue Haas Grotesk Text Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                  fontSize: "15px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "1.2"
                }}>
                  As a child, Mark would read in the dark before bed, causing severe nearsightedness and astigmatism. Later, he'd complete a degree in English and work in publishing, before transitioning to design.
                </p>
                {/* <div style={{ 
                  fontFamily: '"Neue Haas Grotesk Text Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                  fontSize: "15px",
                  fontWeight: 600,
                  marginBottom: "0px" 
                }}>Top 3 Books:</div>
                <div style={{ 
                  fontFamily: '"Neue Haas Grotesk Text Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                  fontSize: "15px",
                  marginBottom: "0px",
                  marginTop: "-4px" 
                }}>
                  <span style={{ fontStyle: "italic", fontWeight: 600 }}>Book Title</span> by Author Author
                </div>
                <div style={{ 
                  fontFamily: '"Neue Haas Grotesk Text Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                  fontSize: "15px",
                  marginBottom: "0px",
                  marginTop: "-4px" 
                }}>
                  <span style={{ fontStyle: "italic", fontWeight: 600 }}>Book Title</span> by Author Author
                </div>
                <div style={{ 
                  fontFamily: '"Neue Haas Grotesk Text Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                  fontSize: "15px",
                  marginBottom: "0",
                  marginTop: "-4px" 
                }}>
                  <span style={{ fontStyle: "italic", fontWeight: 600 }}>Book Title</span> by Author Author
                </div> */}
                <div style={{ 
                  fontFamily: '"Neue Haas Grotesk Text Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                  fontSize: "15px",
                  fontWeight: 600,
                  marginTop: "16px",
                  marginBottom: "0px"
                }}>Connect:</div>
                <div style={{ 
                  fontFamily: '"Neue Haas Grotesk Text Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                  fontSize: "15px",
                  marginBottom: "0px",
                  marginTop: "-4px"
                }}>
                  <a href="https://markjperez.com" target="_blank" rel="noopener noreferrer" style={{ color: "var(--Off-Black, #474747)", textDecoration: "underline" }}>markjperez.com</a>
                </div>
                <div style={{ 
                  fontFamily: '"Neue Haas Grotesk Text Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                  fontSize: "15px",
                  marginBottom: "0",
                  marginTop: "-4px"
                }}>
                  <a href="https://www.instagram.com/_markperez" target="_blank" rel="noopener noreferrer" style={{ color: "var(--Off-Black, #474747)", textDecoration: "underline" }}>@_markperez</a>
                </div>
              </div>
            </div>
            
            {/* Third profile */}
            <div style={{
              display: "flex",
              flexDirection: "column",
              width: isMobile ? "100%" : "auto",
              flex: isMobile ? "none" : "1",
              minWidth: 0,
              maxWidth: isMobile ? "100%" : "300px"
            }}>
              <div style={{ width: "100%", margin: "0", padding: "0", lineHeight: "0" }}>
                <img
                  src="/images/sarchen.png"
                  alt="Sarchen Starke"
                  style={{
                    width: "100%",
                    height: "auto",
                    maxWidth: "100%",
                    aspectRatio: "1/1",
                    objectFit: "contain",
                    display: "block",
                    margin: "0",
                    padding: "0",
                    verticalAlign: "bottom"
                  }}
                />
              </div>
              <div style={{
                width: "100%",
                marginTop: isMobile ? "4px" : "16px",
                fontFamily: '"Neue Haas Grotesk Text Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                fontSize: "16px",
                fontWeight: 300,
                color: "var(--Off-Black, #474747)",
                lineHeight: "1.6"
              }}>
                <div style={{ 
                  fontFamily: '"New Spirit", "new-spirit", "Playfair Display", serif',
                  fontSize: "15px",
                  fontWeight: 600,
                  marginBottom: "0px" 
                }}>Sarchen Starke</div>
                <div style={{ 
                  fontFamily: '"Neue Haas Grotesk Text Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                  fontSize: "15px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  marginBottom: "12px",
                  marginTop: "-4px"
                }}>Developer</div>
                <p style={{ 
                  margin: "0 0 16px 0",
                  fontFamily: '"Neue Haas Grotesk Text Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                  fontSize: "15px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "1.2"
                }}>
                  Originally from South Africa, Sarchen is a software developer who found coding at the intersection of creativity and logic. She's a lifelong reader, always chipping away at her never-ending TBR.
                </p>
                {/* <div style={{ 
                  fontFamily: '"Neue Haas Grotesk Text Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                  fontSize: "15px",
                  fontWeight: 600,
                  marginBottom: "0px" 
                }}>Top 3 Books:</div>
                <div style={{ 
                  fontFamily: '"Neue Haas Grotesk Text Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                  fontSize: "15px",
                  marginBottom: "0px",
                  marginTop: "-4px" 
                }}>
                  <span style={{ fontStyle: "italic", fontWeight: 600 }}>Klara and the Sun</span> by Kazuo Ishiguro
                </div>
                <div style={{ 
                  fontFamily: '"Neue Haas Grotesk Text Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                  fontSize: "15px",
                  marginBottom: "0px",
                  marginTop: "-4px" 
                }}>
                  <span style={{ fontStyle: "italic", fontWeight: 600 }}>The Blind Assassin</span> by Margaret Atwood
                </div>
                <div style={{ 
                  fontFamily: '"Neue Haas Grotesk Text Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                  fontSize: "15px",
                  marginBottom: "0",
                  marginTop: "-4px" 
                }}>
                  <span style={{ fontStyle: "italic", fontWeight: 600 }}>Station Eleven</span> by Emily St. John Mandel
                </div> */}
                <div style={{ 
                  fontFamily: '"Neue Haas Grotesk Text Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                  fontSize: "15px",
                  fontWeight: 600,
                  marginTop: "16px",
                  marginBottom: "0px"
                }}>Connect:</div>
                <div style={{ 
                  fontFamily: '"Neue Haas Grotesk Text Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                  fontSize: "15px",
                  marginBottom: "0px",
                  marginTop: "-4px"
                }}>
                  <a href="https://linkedin.com/in/sarchenstarke/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--Off-Black, #474747)", textDecoration: "underline" }}>linkedin.com/in/sarchenstarke/</a>
                </div>
                <div style={{ 
                  fontFamily: '"Neue Haas Grotesk Text Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                  fontSize: "15px",
                  marginBottom: "0",
                  marginTop: "-4px"
                }}>
                  <a href="https://www.instagram.com/sarchst" target="_blank" rel="noopener noreferrer" style={{ color: "var(--Off-Black, #474747)", textDecoration: "underline" }}>@sarchst</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
