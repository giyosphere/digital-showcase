import { Reveal } from './Reveal'
import { VideoCamera, PaintBrush, Lightning } from '@phosphor-icons/react'

const skills = [
  { icon: VideoCamera, label: 'Video Editing', tools: ['Premiere Pro', 'DaVinci Resolve', '4K / 1080p'] },
  { icon: PaintBrush, label: 'Graphic Design', tools: ['Photoshop', 'Illustrator', 'Canva'] },
  { icon: Lightning, label: 'Motion & Color', tools: ['Color Grading', 'Motion Graphics', 'Sound Design'] },
]

const badges = [
  'Adobe Premiere Pro', 'DaVinci Resolve', 'Adobe Photoshop',
  'Adobe Illustrator', 'Canva Pro', 'Color Grading',
  '4K Production', 'Event Coverage', 'Graphic Design',
  'Infographics', 'Brand Identity', 'Motion Design',
]

export function About() {
  return (
    <section id="about" className="py-20 md:py-32 px-5 sm:px-8 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left — bio */}
          <div>
            <Reveal>
              <p className="font-mono text-xs text-muted tracking-widest uppercase mb-4">— About</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-text leading-tight mb-8">
                Telling stories
                <br />
                <span className="text-accent">frame by frame.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="space-y-4 font-body text-muted text-base leading-relaxed">
                <p>
                  I'm <strong className="text-text">Gio</strong> — a video editor and graphic designer
                  focused on creating cinematic, high-impact visual content. Based in the Philippines,
                  I specialize in event coverage, documentary-style editing, and institutional
                  graphic design.
                </p>
                <p>
                  From 4K encampment films to graduation books and infographic campaigns, every
                  project is built with intention — sharp cuts, balanced color, and design that
                  communicates clearly.
                </p>
                <p>
                  My work spans school events, scouting productions, branding pieces, and
                  community outreach visuals — always delivering polished, memorable output.
                </p>
                <p>
                  Beyond visuals, I also build for the web.{' '}
                  <a
                    href="https://giyosphere.github.io/gio.dev/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-text font-semibold underline underline-offset-4 decoration-accent/60 hover:text-accent hover:decoration-accent transition-colors duration-200"
                  >
                    See my dev portfolio →
                  </a>
                </p>
              </div>
            </Reveal>

            {/* Skill badges */}
            <Reveal delay={0.2} className="mt-10">
              <div className="flex flex-wrap gap-2">
                {badges.map((b) => (
                  <span
                    key={b}
                    className="font-mono text-[11px] px-3 py-1.5 rounded-full border border-border text-muted hover:border-accent/50 hover:text-accent transition-colors duration-200 cursor-default min-h-[36px] flex items-center"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right — skill cards */}
          <div className="space-y-4">
            {skills.map(({ icon: Icon, label, tools }, i) => (
              <Reveal key={label} delay={0.1 * i}>
                <div className="group p-6 rounded-2xl border border-border bg-surface hover:border-accent/30 hover:bg-surface/80 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                      <Icon size={20} weight="duotone" className="text-accent" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-text text-lg">{label}</h3>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {tools.map((t) => (
                          <span key={t} className="font-mono text-[10px] text-muted">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}

            {/* Accent quote block */}
            <Reveal delay={0.3}>
              <div className="p-6 rounded-2xl bg-accent/5 border border-accent/15">
                <p className="font-display italic text-lg text-text leading-relaxed">
                  "Every frame tells a story. Every pixel has purpose."
                </p>
                <p className="font-mono text-xs text-accent mt-3">— GeoVisuals</p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
