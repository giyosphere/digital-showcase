import { Reveal } from './Reveal'
import { Mail, Github, Instagram, Linkedin, ArrowUpRight } from 'lucide-react'

const links = [
  {
    icon: Mail,
    label: 'Email',
    value: 'giodalaoyan@gmail.com',
    href: 'mailto:giodalaoyan@gmail.com',
  },
  {
    icon: Instagram,
    label: 'Instagram',
    value: '@giyoosphere',
    href: 'https://www.instagram.com/giyoosphere/',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'Geomar Dalaoyan',
    href: 'https://www.linkedin.com/in/geomar-dalaoyan-6a0b19357',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/giyosphere',
    href: 'https://github.com/giyosphere',
  },
]

export function Contact() {
  return (
    <section id="contact" className="py-20 md:py-32 px-5 sm:px-8 md:px-12 lg:px-24 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <Reveal>
              <p className="font-mono text-xs text-muted tracking-widest uppercase mb-4">
                — Let's Work Together
              </p>
              <h2 className="font-display text-4xl md:text-6xl font-bold text-text leading-tight">
                Got a project?
                <br />
                <span className="text-accent italic">Let's talk.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="font-body text-muted mt-6 leading-relaxed max-w-md">
                Available for video editing, event coverage, graphic design, and creative
                direction. Reach out — let's make something worth watching.
              </p>
            </Reveal>

            <Reveal delay={0.2} className="mt-8">
              <a
                href="mailto:giodalaoyan@gmail.com"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-accent text-white font-body font-semibold text-sm hover:bg-accent/90 active:scale-95 transition-all duration-200 min-h-[44px]"
              >
                Send a message
                <ArrowUpRight size={16} />
              </a>
            </Reveal>
          </div>

          {/* Right — links */}
          <div className="space-y-3">
            {links.map(({ icon: Icon, label, value, href }, i) => (
              <Reveal key={label} delay={0.08 * i}>
                <a
                  href={href}
                  className="group flex items-center justify-between p-5 rounded-2xl border border-border bg-surface hover:border-accent/40 hover:bg-surface/80 transition-all duration-300"
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                      <Icon size={16} className="text-accent" />
                    </div>
                    <div>
                      <p className="font-mono text-[10px] text-muted uppercase tracking-widest">
                        {label}
                      </p>
                      <p className="font-body text-sm text-text font-medium">{value}</p>
                    </div>
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="text-muted group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                  />
                </a>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Footer line */}
        <Reveal delay={0.1} className="mt-20 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="font-mono text-xs text-muted">
            © {new Date().getFullYear()} GeoVisuals. All rights reserved.
          </p>
          <p className="font-mono text-xs text-muted">
            Built with React + Framer Motion
          </p>
        </Reveal>
      </div>
    </section>
  )
}
