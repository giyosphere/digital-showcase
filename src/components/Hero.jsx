import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { FilmReel, Sparkle } from '@phosphor-icons/react'
import { works } from '../data/works'

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
}

const item = {
  hidden: { opacity: 0, y: 48 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

const stats = [
  { value: works.filter(w => w.category === 'video').length + '+', label: 'Videos Edited' },
  { value: works.filter(w => w.category !== 'video').length + '+', label: 'Design Works' },
  { value: '4K', label: 'Max Resolution' },
]

export function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center relative overflow-hidden px-5 sm:px-8 md:px-12 lg:px-24 pt-24 pb-20"
    >
      {/* Background accent orbs */}
      <div className="pointer-events-none absolute -top-32 -right-32 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full bg-accent/5 blur-[100px] sm:blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-[280px] sm:w-[400px] h-[280px] sm:h-[400px] rounded-full bg-accent/[3%] blur-[80px] sm:blur-[100px]" />

      {/* Grid lines decorative */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(179,255,71,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(179,255,71,0.03)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-6xl"
      >
        {/* Eyebrow */}
        <motion.div variants={item} className="flex items-center gap-2 mb-5 md:mb-8">
          <FilmReel size={16} weight="duotone" className="text-accent" />
          <span className="font-mono text-xs text-muted tracking-widest uppercase">
            Video Editor · Graphic Designer
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          variants={item}
          className="font-display font-black text-[clamp(3rem,10vw,9rem)] leading-[0.9] tracking-tight text-text"
        >
          Gio
          <br />
          <span className="text-accent">Visuals</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          variants={item}
          className="font-body text-base sm:text-lg md:text-xl text-muted max-w-xl mt-5 sm:mt-8 leading-relaxed"
        >
          Crafting cinematic stories through video and design.
          From 4K event coverage to bold graphic work — built to be remembered.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={item} className="flex flex-wrap gap-4 mt-10">
          <a
            href="#work"
            className="group flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-black font-body font-semibold text-sm hover:bg-accent/90 transition-all duration-200 min-h-[44px]"
          >
            View Work
            <Sparkle size={16} weight="fill" className="group-hover:rotate-12 transition-transform" />
          </a>
          <a
            href="#contact"
            className="flex items-center gap-2 px-6 py-3 rounded-full border border-border text-text font-body font-medium text-sm hover:border-accent hover:text-accent transition-all duration-200 min-h-[44px]"
          >
            Let's collaborate
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={item}
          className="flex flex-wrap gap-8 sm:gap-10 mt-10 sm:mt-16 pt-8 sm:pt-10 border-t border-border"
        >
          {stats.map(({ value, label }) => (
            <div key={label}>
              <p className="font-display text-3xl md:text-4xl font-bold text-text">{value}</p>
              <p className="font-mono text-xs text-muted mt-1 tracking-wide uppercase">{label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.a
        href="#work"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted hover:text-accent transition-colors group"
        aria-label="Scroll to work"
      >
        <span className="font-mono text-[10px] tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.a>
    </section>
  )
}
