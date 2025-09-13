export default function Header() {
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
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {/* Logo Icon */}
        <div
          style={{
            width: "32px",
            height: "32px",
            backgroundColor: "#474747",
            borderRadius: "4px",
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
      
      {/* Navigation - keeping for now but can be removed if not needed */}
      <nav style={{ display: "flex", gap: "32px", alignItems: "center" }}>
        <div
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
          Contact
        </div>
        <div
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
          About Us
        </div>
        <div
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
          Shop
        </div>
      </nav>
    </div>
  )
}
