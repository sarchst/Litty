// React setup
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/App'

// Mount React app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('react-root')
  if (container) {
    const root = createRoot(container)
    root.render(<App />)
  }
})
