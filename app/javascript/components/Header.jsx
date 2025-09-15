export default function Header({ onNavigate }) {
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
    </div>
  )
}
