import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Menu, Moon, Palette, Sun, X } from 'lucide-react'
import Experience from './Experience'
import BackToTop from './BackToTop'
import Hero from './Hero'
import WhyMe from './WhyMe'
import Skills from './Skills'
import Reviews from './Reviews'
import Contact from './Contact'
import FAQ from './FAQ'
import Process from './Process'
import Projects from './Projects'
import Services from './Services'
import { CountUp, useScrollReveal } from './PortfolioMotion'
import { content, profile } from './content'
import CursorFollower from './CursorFollower'
import './App.css'
import './PortfolioTheme.css'

const sectionIds = [
  'home',
  'skills',
  'about',
  'experience',
  'services',
  'projects',
  'why-me',
  'process',
  'reviews',
  'faq',
  'contact',
]

const accentPalettes = [
  { name: 'Yellow', color: '#FFE000', rgb: '255, 224, 0', contrast: '#101211' },
  { name: 'Red', color: '#EF4B3F', rgb: '239, 75, 63', contrast: '#101211' },
  { name: 'Burgundy', color: '#B92E4A', rgb: '185, 46, 74', contrast: '#FFFFFF' },
  { name: 'Teal', color: '#0A9B8E', rgb: '10, 155, 142', contrast: '#101211' },
  { name: 'Orange', color: '#F28A28', rgb: '242, 138, 40', contrast: '#101211' },
  { name: 'Blue', color: '#315FEA', rgb: '49, 95, 234', contrast: '#FFFFFF' },
  { name: 'Pink', color: '#E763A5', rgb: '231, 99, 165', contrast: '#101211' },
]

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  const headerRef = useRef(null)
  const menuButtonRef = useRef(null)
  const themePickerRef = useRef(null)
  const [paletteOpen, setPaletteOpen] = useState(false)

  const [language, setLanguage] = useState(() => {
    try {
      return localStorage.getItem('portfolio-language') === 'es'
        ? 'es'
        : 'en'
    } catch {
      return 'en'
    }
  })

  const [themeMode, setThemeMode] = useState(() => {
    try {
      return localStorage.getItem('portfolio-theme-mode') === 'dark'
        ? 'dark'
        : 'light'
    } catch {
      return 'light'
    }
  })

  const [accentName, setAccentName] = useState(() => {
    try {
      return localStorage.getItem('portfolio-accent') || 'Yellow'
    } catch {
      return 'Yellow'
    }
  })
  const accent = accentPalettes.find(option => option.name === accentName)
    || accentPalettes[0]

  const es = language === 'es'
  const t = content[language]

  useScrollReveal(language)

  const navigationLinks = [
    { href: '#home', label: es ? 'Inicio' : 'Home' },
    { href: '#skills', label: es ? 'Herramientas' : 'Tools' },
    { href: '#about', label: es ? 'Sobre mí' : 'About' },
    { href: '#experience', label: es ? 'Experiencia' : 'Experience' },
    { href: '#services', label: es ? 'Servicios' : 'Services' },
    { href: '#projects', label: es ? 'Proyectos' : 'Projects' },
    { href: '#why-me', label: es ? 'Por qué yo' : 'Why Me' },
    { href: '#process', label: es ? 'Proceso' : 'Process' },
    { href: '#reviews', label: es ? 'Reseñas' : 'Reviews' },
    { href: '#faq', label: es ? 'Preguntas' : 'FAQ' },
  ]

  useEffect(() => {
    document.documentElement.lang = language
    const title = `${profile.name} | ${content[language].about.role}`
    const description = es
      ? 'Muhammad Mudasir crea CRM en GoHighLevel, automatizaciones y sistemas de IA para agencias y empresas de servicios, incluyendo sitios web, embudos, integraciones y seguimiento de clientes potenciales.'
      : 'Muhammad Mudasir builds GoHighLevel CRM, automation, and AI systems for agencies and service businesses, including websites, funnels, integrations, and lead follow-up.'

    document.title = title

    const metaValues = [
      ['meta[name="description"]', description],
      ['meta[property="og:title"]', title],
      ['meta[property="og:description"]', description],
      ['meta[property="og:image"]', new URL(profile.photo, window.location.origin).href],
      ['meta[name="twitter:title"]', title],
      ['meta[name="twitter:description"]', description],
      ['meta[name="twitter:image"]', new URL(profile.photo, window.location.origin).href],
    ]

    metaValues.forEach(([selector, value]) => {
      document.querySelector(selector)?.setAttribute('content', value)
    })

    try {
      localStorage.setItem('portfolio-language', language)
    } catch {
      // Language switching also works without browser storage.
    }
  }, [language])

  useEffect(() => {
    if (!paletteOpen) return

    function handleOutside(event) {
      if (!themePickerRef.current?.contains(event.target)) {
        setPaletteOpen(false)
      }
    }

    function handleEscape(event) {
      if (event.key === 'Escape') setPaletteOpen(false)
    }

    document.addEventListener('pointerdown', handleOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('pointerdown', handleOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [paletteOpen])

  useEffect(() => {
    if (!menuOpen) return

    function handleEscape(event) {
      if (event.key !== 'Escape') return

      setMenuOpen(false)
      menuButtonRef.current?.focus()
    }

    function handleOutside(event) {
      if (!headerRef.current?.contains(event.target)) {
        setMenuOpen(false)
      }
    }

    function handleFocus(event) {
      if (!headerRef.current?.contains(event.target)) {
        setMenuOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.addEventListener('pointerdown', handleOutside)
    document.addEventListener('focusin', handleFocus)

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('pointerdown', handleOutside)
      document.removeEventListener('focusin', handleFocus)
    }
  }, [menuOpen])

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1201px)')

    function handleResize(event) {
      if (event.matches) setMenuOpen(false)
    }

    desktop.addEventListener('change', handleResize)

    return () => {
      desktop.removeEventListener('change', handleResize)
    }
  }, [])

  useEffect(() => {
    let frame = 0

    function updateActiveSection() {
      frame = 0

      const marker =
        (headerRef.current?.getBoundingClientRect().bottom || 90) + 65

      let current = 'home'

      for (const id of sectionIds) {
        const section = document.getElementById(id)

        if (section && section.getBoundingClientRect().top <= marker) {
          current = id
        }
      }

      if (
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 8
      ) {
        current = 'contact'
      }

      setActiveSection(current)
    }

    function scheduleUpdate() {
      if (!frame) {
        frame = window.requestAnimationFrame(updateActiveSection)
      }
    }

    updateActiveSection()

    window.addEventListener('scroll', scheduleUpdate, {
      passive: true,
    })
    window.addEventListener('resize', scheduleUpdate)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
    }
  }, [language])

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <div
      className="portfolio"
      data-mode={themeMode}
      style={{
        '--accent': accent.color,
        '--accent-rgb': accent.rgb,
        '--accent-contrast': accent.contrast,
      }}
    >
      <div className="ambient-background" aria-hidden="true">
        <div className="ambient-glow glow-one" />
        <div className="ambient-glow glow-two" />
        <div className="background-grid" />
      </div>

      <a className="skip-link" href="#main">
        {t.skip}
      </a>

      <header className="site-header" ref={headerRef}>
        <a
          className="brand"
          href="#home"
          onClick={closeMenu}
          aria-label={es ? 'Mudasirr — Inicio' : 'Mudasirr — Home'}
        >
          <span className="brand-symbol" aria-hidden="true">
            m.
          </span>
          <span className="brand-name">mudasirr</span>
        </a>

        <div className="header-controls">
          <div className="theme-controls" ref={themePickerRef}>
            <button
              className="theme-mode-button"
              type="button"
              aria-label={themeMode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              title={themeMode === 'light' ? 'Dark mode' : 'Light mode'}
              onClick={() => {
                const nextMode = themeMode === 'light' ? 'dark' : 'light'
                setThemeMode(nextMode)
                try {
                  localStorage.setItem('portfolio-theme-mode', nextMode)
                } catch {
                  // Theme controls remain usable without browser storage.
                }
              }}
            >
              {themeMode === 'light'
                ? <Moon size={15} aria-hidden="true" />
                : <Sun size={15} aria-hidden="true" />}
            </button>

            <div className="theme-palette-wrap">
              <button
                className="theme-palette-button"
                type="button"
                aria-label="Choose accent color"
                aria-expanded={paletteOpen}
                aria-controls="theme-palette"
                title="Choose accent color"
                onClick={() => setPaletteOpen(open => !open)}
              >
                <Palette size={15} aria-hidden="true" />
                <span
                  className="theme-current-swatch"
                  style={{ '--swatch-color': accent.color }}
                  aria-hidden="true"
                />
              </button>

              <div
                className="theme-palette"
                id="theme-palette"
                role="group"
                aria-label="Accent color"
                hidden={!paletteOpen}
              >
                <span className="theme-palette-label">ACCENT · {accent.name.toUpperCase()}</span>
                <div className="theme-swatches">
                  {accentPalettes.map(option => (
                    <button
                      className="theme-swatch"
                      key={option.name}
                      type="button"
                      aria-label={`${option.name} accent`}
                      aria-pressed={accent.name === option.name}
                      title={option.name}
                      style={{ '--swatch-color': option.color }}
                      onClick={() => {
                        setAccentName(option.name)
                        setPaletteOpen(false)
                        try {
                          localStorage.setItem('portfolio-accent', option.name)
                        } catch {
                          // Theme controls remain usable without browser storage.
                        }
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div
            className="language-switch"
            role="group"
            aria-label={t.languageLabel}
          >
            <button
              type="button"
              lang="en"
              aria-label="English"
              aria-pressed={language === 'en'}
              onClick={() => setLanguage('en')}
            >
              EN
            </button>

            <button
              type="button"
              lang="es"
              aria-label="Español"
              aria-pressed={language === 'es'}
              onClick={() => setLanguage('es')}
            >
              ES
            </button>
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            className="menu-toggle"
            aria-label={menuOpen ? t.closeMenu : t.openMenu}
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
            onClick={() => setMenuOpen(open => !open)}
          >
            {menuOpen ? (
              <X size={22} aria-hidden="true" />
            ) : (
              <Menu size={22} aria-hidden="true" />
            )}
          </button>
        </div>

        <nav
          id="main-navigation"
          className={`navigation ${menuOpen ? 'is-open' : ''}`}
          aria-label={t.navigation}
        >
          {navigationLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              aria-current={
                activeSection === link.href.slice(1)
                  ? 'location'
                  : undefined
              }
            >
              {link.label}
            </a>
          ))}

          <a
            className="nav-cta"
            href="#contact"
            onClick={closeMenu}
            aria-current={
              activeSection === 'contact' ? 'location' : undefined
            }
          >
            {es ? 'Contacto' : 'Contact'}
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </nav>
      </header>

      <main id="main" tabIndex={-1}>
        <Hero language={language} />

        <Skills language={language} />

        <section
          className="about-section"
          id="about"
          aria-labelledby="about-title"
        >
          <div className="portrait-column">
            <div className="portrait-frame">
              <img
                src={profile.photo}
                alt={t.about.photoAlt}
                width="1086"
                height="1448"
                loading="lazy"
                decoding="async"
              />

              <a
                className="portrait-badge"
                href={profile.upwork}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="badge-star" aria-hidden="true">
                  ★
                </span>
                {t.about.badge}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>

              <div className="portrait-caption">
                <strong>{profile.name}</strong>
                <span>{t.about.role}</span>
              </div>
            </div>

            <div className="availability-card">
              <span className="availability-dot" aria-hidden="true" />

              <div>
                <strong>{t.about.availability}</strong>
                <span>{t.about.days}</span>
              </div>
            </div>
          </div>

      <div className="about-copy">
  <p className="eyebrow">
    <span className="eyebrow-line" aria-hidden="true" />
    {language === 'es' ? 'SOBRE MÍ' : 'ABOUT ME'}
  </p>

  <h2 id="about-title">
    {language === 'es'
      ? 'Tu negocio tiene muchas piezas.'
      : 'Your Business Has Moving Parts.'}
    <br />
    <span className="gradient-text">
      {language === 'es'
        ? 'Las ayudo a trabajar juntas.'
        : 'I Help Them Work Together.'}
    </span>
  </h2>

  <p className="about-paragraph">
    {language === 'es'
      ? 'Soy Muhammad Mudasir, especialista en GoHighLevel con más de 4 años de experiencia creando sistemas CRM, automatizaciones y soluciones de IA para agencias y empresas de servicios.'
      : "I'm Muhammad Mudasir, a GoHighLevel specialist with 4+ years of experience building CRM, automation, and AI systems for agencies and service businesses."}
  </p>

  <p className="about-paragraph">
    {language === 'es'
      ? 'Conecto la captación de leads, el seguimiento y las reservas para reducir el trabajo manual y mantener tu negocio organizado. Como '
      : 'I connect lead capture, follow-ups, and appointment booking to reduce manual work and keep your business organized. As a '}

    <strong className="about-credential">
      {language === 'es'
        ? 'freelancer Top Rated en Upwork'
        : 'Top Rated freelancer on Upwork'}
    </strong>

    {language === 'es' ? ' y ' : ' and a '}

    <strong className="about-credential">
      {language === 'es'
        ? 'vendedor de nivel 1 en Fiverr'
        : 'Level 1 Seller on Fiverr'}
    </strong>

    {language === 'es'
      ? ', me enfoco en soluciones prácticas, automatizaciones fiables y comunicación clara.'
      : ', I focus on practical solutions, reliable automation, and clear communication.'}
  </p>

  <div className="about-actions">
    <a className="primary-button" href="#contact">
      {language === 'es'
        ? 'Trabajemos juntos'
        : "Let's Work Together"}
      <ArrowUpRight size={18} aria-hidden="true" />
    </a>
  </div>
</div>

          <dl className="stats-grid">
            {t.stats.map((stat, index) => (
              <div className="stat-card" key={index}>
                <dt>{stat.label}</dt>

                <dd>
                  <CountUp
                    key={`${language}-${stat.value}`}
                    value={stat.value}
                  />
                </dd>
              </div>
            ))}
          </dl>
        </section>
        <Experience language={language} />
        <Services language={language} />
        <Projects language={language} />
        <WhyMe language={language} />
        <Process language={language} />
        <Reviews language={language} />
        <FAQ language={language} />
      </main>

           <Contact language={language} />
      <BackToTop language={language} />
      <CursorFollower />
    </div>
  )
}