import { useRef, useState, useEffect, memo } from 'react'
import { motion } from 'framer-motion'
import { Plus, BookOpen } from 'lucide-react'

export const WorkCard = memo(function WorkCard({ work, onClick }) {
  const videoRef = useRef(null)
  const cardRef = useRef(null)
  const [loaded, setLoaded] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [playing, setPlaying] = useState(false)

  const isVideo = work.type === 'mp4'
  const isYoutube = work.type === 'youtube'
  const isBook = work.type === 'pdf'

  // Autoplay when card enters viewport, pause when it leaves
  useEffect(() => {
    if (!isVideo || !videoRef.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current.play().then(() => setPlaying(true)).catch(() => {})
        } else {
          videoRef.current.pause()
          setPlaying(false)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [isVideo])

  const handleMouseEnter = () => setHovered(true)
  const handleMouseLeave = () => setHovered(false)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="work-item"
    >
      <div
        ref={cardRef}
        className="relative overflow-hidden rounded-xl cursor-pointer bg-surface group"
        style={{
          aspectRatio: work.span === 'tall' ? '3/4' : work.span === 'wide' ? '16/9' : '4/3',
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => onClick(work)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onClick(work)}
        aria-label={`View ${work.title}`}
      >
        {/* Thumbnail / poster image — hides once video is playing */}
        {work.thumbnail && (
          <img
            src={work.thumbnail}
            alt={work.title}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
              playing ? 'opacity-0' : 'opacity-100'
            } ${loaded ? '' : 'opacity-0'}`}
          />
        )}

        {/* Book cover placeholder */}
        {isBook && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3"
            style={{ background: 'linear-gradient(135deg, #1a1208 0%, #2d1f0a 50%, #1a1208 100%)' }}
          >
            {/* Spine line */}
            <div className="absolute left-[14%] top-0 bottom-0 w-px bg-white/10" />
            {/* Cover content */}
            <BookOpen size={36} className="text-accent/70" />
            <p className="font-display text-white/80 text-sm font-bold text-center px-6 leading-snug">
              {work.title}
            </p>
            <p className="font-mono text-white/30 text-[10px] tracking-widest uppercase">
              {work.year}
            </p>
          </div>
        )}

        {/* Placeholder when no thumbnail */}
        {!work.thumbnail && !isVideo && !isYoutube && !isBook && (
          <div className="absolute inset-0 bg-surface flex items-center justify-center">
            <span className="font-mono text-xs text-muted opacity-40">No preview</span>
          </div>
        )}

        {/* Video element — always visible, autoplay via IntersectionObserver */}
        {isVideo && (
          <video
            ref={videoRef}
            src={work.src}
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300" />

        {/* Open icon */}
        <motion.div
          initial={false}
          animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.8 }}
          transition={{ duration: 0.2 }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center"
        >
          <Plus size={14} className="text-white" />
        </motion.div>

        {/* Text overlay — slides up on hover */}
        <div className="absolute inset-x-0 bottom-0 p-4">
          <motion.div
            initial={false}
            animate={{ y: hovered ? 0 : 6, opacity: hovered ? 1 : 0.85 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-2">
              {work.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-accent/20 text-accent border border-accent/30"
                >
                  {tag}
                </span>
              ))}
              <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/60">
                {work.year}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-display font-bold text-white text-lg leading-tight">
              {work.title}
            </h3>

            {/* Subtitle — visible on hover */}
            <motion.p
              initial={false}
              animate={{ opacity: hovered ? 1 : 0, height: hovered ? 'auto' : 0 }}
              transition={{ duration: 0.25 }}
              className="font-body text-xs text-white/60 mt-1 overflow-hidden"
            >
              {work.subtitle}
            </motion.p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
})
