export default function LandingPage() {
  return (
    <div 
      style={{ 
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        padding: "32px 16px 32px 32px", // Add padding to show pink around the blue div
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
          margin: "0 auto", // Center the blue div
          position: "relative"
        }}
      >
        {/* Text box flush with top left corner */}
        <h2 
          className="tk-new-spirit"
          style={{
            width: "608px",
            color: "var(--Off-Black, #474747)",
            fontFamily: '"new-spirit", "Playfair Display", serif',
            fontSize: "64px",
            fontStyle: "normal",
            fontWeight: 600,
            lineHeight: "63px",
            margin: "0",
            padding: "0",
            position: "absolute",
            top: "0",
            left: "0",
            transform: "scaleX(0.75)", // Condensed for elongated appearance
            transformOrigin: "left center", // Scale from left edge
            display: "inline-block" // Ensure transform applies correctly
          }}
        >
          Find the books everyone's talking about.
        </h2>
        
        {/* Landing page image - flush bottom right corner */}
        <img
          src="/images/landing-kitty.png"
          alt="Landing page illustration"
          style={{
            position: "absolute",
            bottom: "0",
            right: "0",
            maxWidth: "428px",
            maxHeight: "428px",
            objectFit: "contain"
          }}
        />
      </div>
    </div>
  )
}
