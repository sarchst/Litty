import { useState, useEffect } from 'react'
import Sidebar from "./Sidebar"
import Content from "./Content"

export default function MainLayout({ currentPage }) {
  const [selectedBook, setSelectedBook] = useState(null)
  const [bookList, setBookList] = useState(null)

  // Clear selected book and book list when navigating to a different page
  useEffect(() => {
    setSelectedBook(null)
    setBookList(null)
  }, [currentPage])

  const handleBookSelect = (book) => {
    setSelectedBook(book)
    setBookList(null) // Clear book list when selecting a book
  }

  const handleSeeAll = async (year, category) => {
    setBookList({ year, category, loading: true, books: [] })
    setSelectedBook(null) // Clear selected book when viewing book list
    
    try {
      const response = await fetch('/api/books?top_5=false')
      const data = await response.json()
      const yearBooks = data[year] || []
      const filteredBooks = yearBooks.filter(book => {
        if (category === 'fiction') {
          return book.is_fiction === true
        } else {
          return book.is_fiction === false
        }
      })
      
      setBookList({ year, category, loading: false, books: filteredBooks })
    } catch (error) {
      console.error('Error fetching books:', error)
      setBookList({ year, category, loading: false, books: [] })
    }
  }

  const handleBackToMain = () => {
    setBookList(null)
    setSelectedBook(null)
  }

  return (
    <div style={{ display: "flex", height: "100%", overflow: "hidden" }}>
      <div style={{ flex: 0.48, overflow: "hidden" }}>
        <Sidebar onBookSelect={handleBookSelect} onSeeAll={handleSeeAll} />
      </div>
      <div style={{ flex: 1, overflow: "hidden" }}>
        <Content 
          selectedBook={selectedBook} 
          currentPage={currentPage} 
          bookList={bookList}
          onBackToMain={handleBackToMain}
          onBookSelect={handleBookSelect}
          onSeeAll={handleSeeAll}
        />
      </div>
    </div>
  )
}
