import { useState } from 'react'

export default function BookDetails({ book, year, category, onBack }) {
  const [activeTab, setActiveTab] = useState('description')

  if (!book) return null

  const categoryTitle = category === 'fiction' ? 'FICTION' : 'NON-FICTION'
  const title = `BEST ${categoryTitle} BOOKS OF ${year}`

  const renderTabContent = () => {
    switch (activeTab) {
      case 'description':
        return (
          <div style={{
            color: "#000",
            fontFamily: '"Neue Haas Grotesk Text Pro"',
            fontSize: "18px",
            lineHeight: "normal",
            marginBottom: "2rem"
          }}>
            <div style={{ marginBottom: "2rem" }}>
              {book.description || "No description available."}
            </div>
            {book.primary_quotes && book.primary_quotes.length > 0 && (
              <div>
                {book.primary_quotes.map((quote, index) => (
                  <p key={index} style={{ 
                    margin: index === book.primary_quotes.length - 1 ? "0" : "0 0 1rem 0"
                  }}>
                    {quote}
                  </p>
                ))}
              </div>
            )}
          </div>
        )
      case 'author':
        return (
          <div style={{
            color: "#000",
            fontFamily: '"Neue Haas Grotesk Text Pro"',
            fontSize: "18px",
            lineHeight: "normal",
            marginBottom: "2rem"
          }}>
            {book.author_bio || "No author biography available."}
          </div>
        )
      case 'book-details':
        const formatPublishedDate = (publishedAt) => {
          if (!publishedAt) return null
          const date = new Date(publishedAt)
          return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })
        }

        const firstGenre = book.genres && book.genres.length > 0 ? book.genres[0] : ''
        const firstGenreContainsFiction = firstGenre.toLowerCase().includes('fiction')
        const categoryText = firstGenreContainsFiction ? '' : (book.is_fiction ? 'Fiction' : 'Non-Fiction')
        const genresList = book.genres && book.genres.length > 0 ? book.genres.join(' · ') : ''
        const publishedDate = formatPublishedDate(book.published_at)
        
        return (
          <div style={{
            color: "#000",
            fontFamily: '"Neue Haas Grotesk Text Pro"',
            fontSize: "18px",
            lineHeight: "1.6",
            marginBottom: "2rem"
          }}>
            {/* Genre line */}
            <p style={{ margin: "0 0 1rem 0" }}>
              Genre — {categoryText && genresList ? `${categoryText} · ${genresList}` : categoryText || genresList}
            </p>
            
            {/* Published line */}
            {(book.publisher || publishedDate) && (
              <p style={{ margin: "0 0 1rem 0" }}>
                Published{book.publisher && ` by ${book.publisher}`}{publishedDate && ` on ${publishedDate}`}
              </p>
            )}
            
            {/* Length line */}
            {book.page_count && (
              <p style={{ margin: "0 0 1rem 0" }}>
                Length — {book.page_count} pages
              </p>
            )}
            
            {/* Placement line */}
            {book.ranking && (
              <p style={{ margin: "0" }}>
                Litty's Ranking — #{book.ranking}
              </p>
            )}
            
            {!categoryText && !book.publisher && !publishedDate && !book.page_count && !book.ranking && (
              <p style={{ margin: "0" }}>No book details available.</p>
            )}
          </div>
        )
      case 'accolades':
        return (
          <div style={{
            color: "#000",
            fontFamily: '"Neue Haas Grotesk Text Pro"',
            fontSize: "18px",
            lineHeight: "1.6",
            marginBottom: "2rem"
          }}>
            {book.accolades && book.accolades.length > 0 ? (
              book.accolades.map((accolade, index) => (
                <p key={index} style={{ margin: index === book.accolades.length - 1 ? "0" : "0 0 1rem 0" }}>
                  {accolade}
                </p>
              ))
            ) : (
              <p style={{ margin: "0" }}>No accolades available.</p>
            )}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div>
      {/* Title with back button */}
      <div style={{
        color: "#000",
        fontFamily: '"New Spirit"',
        fontSize: "18px",
        fontStyle: "normal",
        fontWeight: 600,
        lineHeight: "normal",
        marginBottom: "2rem",
        display: "flex",
        alignItems: "center",
        gap: "8px"
      }}>
        <button
          onClick={onBack}
          style={{
            background: "none",
            border: "none",
            color: "#000",
            fontFamily: '"New Spirit"',
            fontSize: "18px",
            fontStyle: "normal",
            fontWeight: 600,
            lineHeight: "normal",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: 0
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="7" height="11" viewBox="0 0 7 11" fill="none">
            <path d="M5.66667 0.5L6.84167 1.675L3.02501 5.5L6.84167 9.325L5.66667 10.5L0.666675 5.5L5.66667 0.5Z" fill="#323232"/>
          </svg>
          {title}
        </button>
      </div>
      
      {/* Book cover and content grid */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "minmax(200px, 448px) 31px minmax(300px, 608px)",
        gridTemplateRows: "auto",
        marginBottom: "2rem",
        gap: "0",
        maxWidth: "100%",
        overflow: "hidden"
      }}>
        
        {/* Cover image */}
        {book.cover_image_url && (
          <div style={{ position: "relative" }}>
            <img 
              src={book.cover_image_url} 
              alt={`${book.title} cover`}
              style={{ 
                width: "100%",
                maxWidth: "448px",
                height: "auto",
                aspectRatio: "2/3",
                objectFit: "cover",
                borderRadius: "4px"
              }}
            />
          </div>
        )}
        
        {/* Middle padding */}
        <div></div>
        
        {/* Title, author, tab buttons, and content */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
          {/* Title and author */}
          <div style={{ marginBottom: "2rem" }}>
            <h1 style={{
              color: "#000",
              fontFamily: '"Neue Haas Grotesk Text Pro"',
              fontSize: "32px",
              fontStyle: "italic",
              fontWeight: 500,
              lineHeight: "normal",
              margin: "0 0 0.5rem 0"
            }}>
              {book.title}
            </h1>
            <p style={{
              color: "#000",
              fontFamily: '"Neue Haas Grotesk Text Pro"',
              fontSize: "18px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "normal",
              margin: "0"
            }}>
              {book.authors}
            </p>
          </div>

          {/* Tab buttons */}
          <div style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: "2rem",
            paddingBottom: "0.5rem",
            borderBottom: "1px solid #474747",
            marginBottom: "1rem",
            width: "100%",
            maxWidth: "608px"
          }}>
            {['description', 'author', 'book-details', 'accolades'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  background: "none",
                  border: "none",
                  color: activeTab === tab ? "#000" : "#474747",
                  fontFamily: '"Neue Haas Grotesk Text Pro"',
                  fontSize: "18px",
                  fontWeight: activeTab === tab ? 700 : 400,
                  lineHeight: "normal",
                  cursor: "pointer",
                  textTransform: "capitalize",
                  padding: "0"
                }}
              >
                {tab === 'book-details' ? 'Book Details' : tab}
              </button>
            ))}
          </div>

          <div style={{ 
            width: "100%", 
            maxWidth: "608px",
            wordWrap: "break-word",
            overflowWrap: "break-word",
            hyphens: "auto"
          }}>
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  )
}
