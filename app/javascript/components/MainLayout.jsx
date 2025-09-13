import { useState } from 'react'
import Sidebar from "./Sidebar"
import Content from "./Content"

export default function MainLayout() {
  const [selectedBook, setSelectedBook] = useState(null)

  const handleBookSelect = (book) => {
    setSelectedBook(book)
  }

  return (
    <div style={{ display: "flex", height: "100%", overflow: "hidden" }}>
      <div style={{ flex: 1, overflow: "hidden" }}>
        <Sidebar onBookSelect={handleBookSelect} />
      </div>
      <div style={{ flex: 2, overflow: "hidden" }}>
        <Content selectedBook={selectedBook} />
      </div>
    </div>
  )
}
