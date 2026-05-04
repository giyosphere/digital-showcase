import { useState, useEffect, useRef, forwardRef } from 'react'
import HTMLFlipBook from 'react-pageflip'
import * as pdfjsLib from 'pdfjs-dist'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react'

const base = import.meta.env.BASE_URL
const asset = (path) => path?.startsWith('http') ? path : `${base}${path.replace(/^\//, '')}`

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString()

const FlipPage = forwardRef(({ pageUrl, pageNum }, ref) => (
  <div
    ref={ref}
    className="bg-white overflow-hidden select-none flex items-center justify-center"
    style={{ width: '100%', height: '100%' }}
  >
    {pageUrl ? (
      <img
        src={pageUrl}
        alt={`Page ${pageNum}`}
        className="w-full h-full object-contain"
        draggable={false}
      />
    ) : (
      <div className="flex flex-col items-center justify-center gap-2 text-gray-300 w-full h-full">
        <BookOpen size={28} />
        <span className="text-xs font-mono">{pageNum}</span>
      </div>
    )}
  </div>
))

FlipPage.displayName = 'FlipPage'

export function BookModal({ book, onClose }) {
  const [pages, setPages] = useState([])
  const [phase, setPhase] = useState('loading') // 'loading' | 'ready'
  const [progress, setProgress] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const flipRef = useRef(null)

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  useEffect(() => {
    if (!book) return
    let cancelled = false

    async function load() {
      try {
        const pdf = await pdfjsLib.getDocument(asset(book.src)).promise
        const count = pdf.numPages
        if (cancelled) return
        setTotalPages(count)

        const urls = []
        for (let i = 1; i <= count; i++) {
          if (cancelled) break
          const page = await pdf.getPage(i)
          const viewport = page.getViewport({ scale: 1.5 })
          const canvas = document.createElement('canvas')
          canvas.width = viewport.width
          canvas.height = viewport.height
          await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise
          urls.push(canvas.toDataURL('image/jpeg', 0.8))
          setProgress(Math.round((i / count) * 100))
        }

        if (!cancelled) {
          setPages(urls)
          setPhase('ready')
        }
      } catch (err) {
        console.error('PDF load error:', err)
        if (!cancelled) setPhase('ready')
      }
    }

    load()
    return () => { cancelled = true }
  }, [book])

  if (!book) return null

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const pageW = isMobile ? 280 : 420
  const pageH = isMobile ? 396 : 594

  const prevPage = () => flipRef.current?.pageFlip().flipPrev()
  const nextPage = () => flipRef.current?.pageFlip().flipNext()

  return (
    <AnimatePresence>
      <motion.div
        key="book-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[100] bg-black/92 backdrop-blur-md flex flex-col items-center justify-center gap-5 px-4"
        onClick={onClose}
      >
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all"
        >
          <X size={16} />
        </button>

        {/* Title */}
        <p className="font-display text-white/70 text-sm md:text-base font-bold tracking-wide text-center">
          {book.title}
        </p>

        {/* Book area */}
        <div onClick={(e) => e.stopPropagation()}>
          {phase === 'loading' ? (
            <div className="flex flex-col items-center justify-center gap-5" style={{ width: pageW * 2, height: pageH }}>
              <BookOpen size={48} className="text-accent" style={{ animation: 'pulse 1.5s ease-in-out infinite' }} />
              <div className="w-48 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-accent rounded-full"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <p className="font-mono text-white/40 text-xs">
                Rendering pages… {progress}%
              </p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <HTMLFlipBook
                ref={flipRef}
                width={pageW}
                height={pageH}
                size="fixed"
                showCover
                useMouseEvents
                mobileScrollSupport={false}
                flippingTime={700}
                className="shadow-2xl"
                onFlip={(e) => setCurrentPage(e.data)}
              >
                {pages.map((url, i) => (
                  <FlipPage key={i} pageUrl={url} pageNum={i + 1} />
                ))}
              </HTMLFlipBook>
            </motion.div>
          )}
        </div>

        {/* Navigation */}
        {phase === 'ready' && pages.length > 0 && (
          <div
            className="flex items-center gap-5"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={prevPage}
              aria-label="Previous page"
              className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="font-mono text-xs text-white/40 min-w-[80px] text-center">
              {currentPage + 1} / {totalPages}
            </span>
            <button
              onClick={nextPage}
              aria-label="Next page"
              className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
