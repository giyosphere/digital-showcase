import { useState, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useTheme } from './hooks/useTheme'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { WorkGrid } from './components/WorkGrid'
import { WorkModal } from './components/WorkModal'
import { BookModal } from './components/BookModal'
import { About } from './components/About'
import { Contact } from './components/Contact'

export default function App() {
  const { dark, toggle } = useTheme()
  const [selectedWork, setSelectedWork] = useState(null)
  const [selectedBook, setSelectedBook] = useState(null)

  const handleSelect = useCallback((work) => {
    if (work.type === 'pdf') setSelectedBook(work)
    else setSelectedWork(work)
  }, [])

  return (
    <div className="min-h-screen bg-bg text-text font-body">
      <Navbar dark={dark} toggleTheme={toggle} />

      <main>
        <Hero />
        <WorkGrid onSelect={handleSelect} />
        <About />
        <Contact />
      </main>

      <AnimatePresence>
        {selectedWork && (
          <WorkModal work={selectedWork} onClose={() => setSelectedWork(null)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedBook && (
          <BookModal book={selectedBook} onClose={() => setSelectedBook(null)} />
        )}
      </AnimatePresence>
    </div>
  )
}
