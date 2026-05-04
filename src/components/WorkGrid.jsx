import { useState, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { WorkCard } from './WorkCard'
import { works, categories } from '../data/works'
import { Reveal } from './Reveal'

export function WorkGrid({ onSelect }) {
  const [active, setActive] = useState('all')

  const filtered = useMemo(
    () => (active === 'all' ? works : works.filter((w) => w.category === active)),
    [active]
  )

  return (
    <section id="work" className="py-20 md:py-32 px-5 sm:px-8 md:px-12 lg:px-24">
      {/* Header */}
      <Reveal>
        <div className="flex flex-col md:flex-row md:items-end gap-6 mb-12">
          <div className="flex-1">
            <p className="font-mono text-xs text-muted tracking-widest uppercase mb-3">
              — Selected Works
            </p>
            <h2 className="font-display text-4xl md:text-6xl font-bold text-text leading-tight">
              The Archive
            </h2>
          </div>
          <p className="font-body text-sm text-muted max-w-xs leading-relaxed">
            A curated collection of video productions and graphic design work spanning events, branding, and institutional campaigns.
          </p>
        </div>
      </Reveal>

      {/* Filter tabs */}
      <Reveal delay={0.1}>
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              whileTap={{ scale: 0.95 }}
              className={`font-mono text-xs px-4 py-2 rounded-full border transition-all duration-200 min-h-[36px] ${
                active === cat.id
                  ? 'bg-accent border-accent text-white'
                  : 'border-border text-muted hover:border-accent/50 hover:text-text'
              }`}
            >
              {cat.label}
              <span className="ml-2 opacity-50">
                {cat.id === 'all'
                  ? works.length
                  : works.filter((w) => w.category === cat.id).length}
              </span>
            </motion.button>
          ))}
        </div>
      </Reveal>

      {/* Masonry grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="work-grid"
        >
          <AnimatePresence>
            {filtered.map((work, i) => (
              <WorkCard key={work.id} work={work} onClick={onSelect} />
            ))}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>

      {/* Count line */}
      <Reveal delay={0.05} className="mt-10 pt-8 border-t border-border">
        <p className="font-mono text-xs text-muted">
          Showing <span className="text-accent">{filtered.length}</span> of {works.length} works
        </p>
      </Reveal>
    </section>
  )
}
