import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowUpRight } from 'lucide-react'

export function WorkModal({ work, onClose }) {
  const videoRef = useRef(null)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  useEffect(() => {
    if (work?.type === 'mp4' && videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }, [work])

  const isYoutube = work?.type === 'youtube'

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  if (!work) return null

  // Different entrance for mobile (slide up) vs desktop (scale in)
  const mobileVariants = {
    hidden: { y: '100%', opacity: 1 },
    visible: { y: 0, opacity: 1 },
    exit: { y: '100%', opacity: 1 },
  }
  const desktopVariants = {
    hidden: { scale: 0.93, opacity: 0, x: '-50%', y: 'calc(-50% + 20px)' },
    visible: { scale: 1, opacity: 1, x: '-50%', y: '-50%' },
    exit: { scale: 0.95, opacity: 0, x: '-50%', y: 'calc(-50% + 10px)' },
  }

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22 }}
        className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <motion.div
        key="panel"
        variants={isMobile ? mobileVariants : desktopVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={work.title}
        className={[
          'fixed z-[101] bg-surface shadow-2xl overflow-hidden',
          // Mobile: bottom sheet
          'bottom-0 left-0 right-0 rounded-t-2xl max-h-[92dvh] flex flex-col',
          // Desktop: centered card
          'md:inset-auto md:top-1/2 md:left-1/2',
          'md:rounded-2xl md:w-[90vw] md:max-w-5xl md:max-h-[88vh]',
        ].join(' ')}
      >
        {/* Mobile drag handle */}
        <div className="md:hidden flex justify-center pt-3 pb-1 flex-shrink-0">
          <div className="w-10 h-1 rounded-full bg-muted/30" />
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/50 transition-all"
        >
          <X size={16} />
        </button>

        {/* Body */}
        <div className="flex flex-col md:flex-row overflow-hidden flex-1 min-h-0">

          {/* Media */}
          <div className="bg-black flex items-center justify-center flex-shrink-0
            h-52 sm:h-64
            md:h-auto md:flex-1 md:min-h-[400px]"
          >
            {isYoutube ? (
              <iframe
                src={`${work.src}?autoplay=1&rel=0&modestbranding=1`}
                allow="autoplay; fullscreen"
                allowFullScreen
                className="w-full h-full"
                title={work.title}
              />
            ) : work.type === 'mp4' ? (
              <video
                ref={videoRef}
                src={work.src}
                controls
                playsInline
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={work.src}
                alt={work.title}
                className="w-full h-full object-contain"
                loading="lazy"
              />
            )}
          </div>

          {/* Info — scrollable */}
          <div className="overflow-y-auto flex flex-col gap-4 p-5 sm:p-6 md:w-72 lg:w-80 md:flex-shrink-0">
            <div>
              <p className="font-mono text-[10px] text-accent tracking-widest uppercase mb-1">
                {work.category}
              </p>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-text leading-tight">
                {work.title}
              </h2>
              <p className="font-body text-sm text-muted mt-1">{work.subtitle}</p>
            </div>

            <div className="h-px bg-border" />

            <p className="font-body text-sm text-muted leading-relaxed">{work.description}</p>

            <div>
              <p className="font-mono text-[10px] text-muted uppercase tracking-widest mb-2">Tags</p>
              <div className="flex flex-wrap gap-1.5">
                {work.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="h-px bg-border" />

            <div className="flex items-center justify-between pb-safe">
              <div>
                <p className="font-mono text-[10px] text-muted uppercase tracking-widest">Year</p>
                <p className="font-display text-lg font-bold text-text mt-0.5">{work.year}</p>
              </div>
              {(work.type === 'mp4' || isYoutube) && (
                <a
                  href={isYoutube ? work.youtubeUrl : work.src}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 font-mono text-xs text-muted hover:text-accent transition-colors min-h-[44px]"
                >
                  {isYoutube ? 'Watch on YouTube' : 'Open file'} <ArrowUpRight size={12} />
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
