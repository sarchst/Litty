export default function Content({ selectedBook }) {
  console.log("Sarchen", selectedBook?.cover_image_url)
  console.log("Sarchen", selectedBook?.title)
  return (
    <div style={{ padding: "2rem", height: "100%", overflow: "auto" }}>
      {selectedBook ? (
        <div>
          <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
            {selectedBook.cover_image_url && (
              <img 
                src={selectedBook.cover_image_url} 
                alt={`${selectedBook.title} cover`}
                style={{ 
                  width: "80px", 
                  height: "120px", 
                  objectFit: "cover",
                  borderRadius: "4px"
                }}
              />
            )}
            <div>
              <h1 style={{
                color: "var(--Off-Black, #474747)",
                fontFamily: "'Playfair Display', serif",
                fontSize: "32px",
                fontWeight: 600,
                margin: "0 0 0.5rem 0"
              }}>
                {selectedBook.title}
              </h1>
              <p style={{
                color: "var(--Author, #4F4F4F)",
                fontFamily: '"Neue Haas Grotesk Text Pro"',
                fontSize: "18px",
                margin: "0 0 1rem 0"
              }}>
                {selectedBook.authors}
              </p>
            </div>
          </div>
          {selectedBook.description && (
            <div style={{
              color: "var(--Off-Black, #474747)",
              fontFamily: '"Neue Haas Grotesk Text Pro"',
              fontSize: "16px",
              lineHeight: "1.5"
            }}>
              {selectedBook.description}
            </div>
          )}
        </div>
      ) : (
        <h2 style={{
          color: "var(--Off-Black, #474747)",
          fontFamily: "'Playfair Display', serif",
          fontSize: "64px",
          fontStyle: "normal",
          fontWeight: 600,
          lineHeight: "63px"
        }}>Find the books everyone's talking about.</h2>
      )}
    </div>
  )
}
