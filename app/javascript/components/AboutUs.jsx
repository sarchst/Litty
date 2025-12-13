export default function AboutUs() {
  return (
    <div 
      style={{ 
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        padding: "32px 16px 32px 32px", // Same padding as landing page
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
            About Us
          </h1>
          
          {/* Content container with image and text side by side */}
          <div style={{
            display: "flex",
            marginTop: "64px", // 64px padding between title and content
            gap: "2.5%", // 33px = ~2.5% of 1296px
            width: "100%"
          }}>
            {/* Image - flush left */}
            <img
              src="/images/about-us.png"
              alt="About Us illustration"
              style={{
                width: "46.8%", // 607px = ~46.8% of 1296px
                aspectRatio: "607/256",
                objectFit: "contain",
                flexShrink: 0
              }}
            />
            
            {/* Text content */}
            <div style={{
              width: "46.9%", // 608px = ~46.9% of 1296px
              color: "var(--Off-Black, #474747)",
              fontFamily: '"Neue Haas Grotesk Text Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              fontSize: "24px",
              fontStyle: "normal",
              fontWeight: 300,
              lineHeight: "normal",
              flexShrink: 0
            }}>
              <p style={{ margin: "0 0 1rem 0" }}>
                Lorem ipsum dolor sit amet consectetur. Quis mauris turpis non tincidunt at nulla sodales quis. Lectus scelerisque enim volutpat nulla leo etiam ipsum.
              </p>
              <p style={{ margin: "0" }}>
                Cursus elementum non eget felis ac diam. Nec purus tellus in eget risus. Viverra arcu elementum scelerisque convallis potenti diam elit mauris. Mauris condimentum euismod mauris euismod tristique quisque nec sed etiam. Interdum magna quisque fermentum elit tempus sed tortor sapien.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
