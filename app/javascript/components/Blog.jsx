export default function Blog() {
  return (
    <div 
      style={{ 
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        padding: "32px 16px 32px 32px", // Same padding as other pages
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
          {/* Title */}
          <h1 
            className="tk-new-spirit"
            style={{
              color: "var(--Off-Black, #474747)",
              fontFamily: '"New Spirit SemiBold Condensed", "new-spirit", "Playfair Display", serif',
              fontSize: "64px",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "63px",
              margin: "0",
              transform: "scaleX(0.75)",
              transformOrigin: "left center",
              display: "inline-block"
            }}
          >
            Blog coming soon...
          </h1>
        </div>
      </div>
    </div>
  )
}
