import { useEffect, useRef, useState } from 'react'
import {
  ArrowUpRight,
  Workflow,
  Layers3,
  Bot,
  Menu,
  X,
} from 'lucide-react'
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
import './App.css'

const expertiseIcons = [Workflow, Layers3, Bot]

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

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  const headerRef = useRef(null)
  const menuButtonRef = useRef(null)

  const [language, setLanguage] = useState(() => {
    try {
      return localStorage.getItem('portfolio-language') === 'es'
        ? 'es'
        : 'en'
    } catch {
      return 'en'
    }
  })

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
    document.title = `${profile.name} | ${content[language].about.role}`

    try {
      localStorage.setItem('portfolio-language', language)
    } catch {
      // Language switching also works without browser storage.
    }
  }, [language])

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
    <div className="portfolio">
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
          aria-label={es ? 'Mudasir — Inicio' : 'Mudasir — Home'}
        >
          <span className="brand-symbol" aria-hidden="true">
            m.
          </span>
          <span className="brand-name">mudasir</span>
        </a>

        <div className="header-controls">
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
          className="expertise-strip"
          id="expertise"
          aria-label={t.expertiseLabel}
        >
          {t.expertise.map((item, index) => {
            const Icon = expertiseIcons[index] || Workflow

            return (
              <article className="expertise-item" key={item.title}>
                <span className="expertise-number">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <Icon
                  className="expertise-icon"
                  size={26}
                  aria-hidden="true"
                />

                <div>
                  <h2>{item.title}</h2>
                  <p>{item.description}</p>
                </div>
              </article>
            )
          })}
        </section>

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
              {t.about.eyebrow}
            </p>

            <h2 id="about-title">
              {t.about.title}
              <br />
              <span className="gradient-text">
                {t.about.highlight}
              </span>
            </h2>

            {t.about.paragraphs.map((paragraph, index) => (
              <p className="about-paragraph" key={index}>
                {paragraph}
              </p>
            ))}

            <p className="markets-note">{t.about.markets}</p>

            <div className="about-actions">
              <a
                className="primary-button"
                href={profile.upwork}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.about.profileCta}
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>

              <a
                className="text-link"
                href={`mailto:${profile.email}`}
              >
                {t.about.contactCta}
                <ArrowUpRight size={17} aria-hidden="true" />
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
    </div>
  )
}