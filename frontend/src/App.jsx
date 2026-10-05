import Skills from './Skills'
import Reviews from './Reviews'
import Contact from './Contact'
import FAQ from './FAQ'
import Process from './Process'
import {
  CountUp,
  HeroSpecialties,
  useScrollReveal,
} from './PortfolioMotion'
import { useEffect, useState } from 'react'
import {
  ArrowDown,
  ArrowUpRight,
  Workflow,
  Layers3,
  Bot,
  Menu,
  X,
} from 'lucide-react'
import Projects from './Projects'
import Services from './Services'
import { content, profile } from './content'
import './App.css'

const expertiseIcons = [Workflow, Layers3, Bot]

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  const [language, setLanguage] = useState(() => {
    try {
      return localStorage.getItem('portfolio-language') === 'es'
        ? 'es'
        : 'en'
    } catch {
      return 'en'
    }
  })

  const t = content[language]
useScrollReveal(language)
const navigationLinks = [
  { href: '#home', label: language === 'es' ? 'Inicio' : 'Home' },
  { href: '#about', label: language === 'es' ? 'Sobre mí' : 'About' },
  { href: '#services', label: language === 'es' ? 'Servicios' : 'Services' },
  { href: '#projects', label: language === 'es' ? 'Portafolio' : 'Portfolio' },
  { href: '#skills', label: language === 'es' ? 'Habilidades' : 'Skills' },
  { href: '#process', label: language === 'es' ? 'Proceso' : 'Process' },
  { href: '#reviews', label: language === 'es' ? 'Opiniones' : 'Reviews' },
  { href: '#faq', label: language === 'es' ? 'Preguntas' : 'FAQ' },
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
    function handleEscape(event) {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [])

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

      <header className="site-header">
        <a className="brand" href="#home" onClick={closeMenu}>
          <span className="brand-symbol">m.</span>
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
            type="button"
            className="menu-toggle"
            aria-label={menuOpen ? t.closeMenu : t.openMenu}
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
            onClick={() => setMenuOpen((open) => !open)}
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
          {navigationLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
            >
              {link.label}
            </a>
          ))}

         <a
  className="nav-cta"
  href="#contact"
  onClick={closeMenu}
>
  {t.nav.contact}
  <ArrowUpRight size={17} aria-hidden="true" />
</a>
        </nav>
      </header>

      <main id="main">
        <section className="hero-section" id="home">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="eyebrow-line" />
              {t.hero.eyebrow}
            </p>

            <p className="hero-intro">{t.hero.intro}</p>
<HeroSpecialties language={language} />
            <h1>
              {t.hero.title}
              <br />
              <span className="gradient-text">
                {t.hero.highlight}
              </span>
            </h1>

           <p className="hero-description">
  {language === 'es'
    ? '¿Se pierden clientes potenciales entre tus formularios, mensajes y reservas? Configuro CRM, embudos y automatizaciones en GoHighLevel para conectar cada paso y facilitar el seguimiento de tu equipo.'
    : 'Losing leads between forms, messages and bookings? I build GoHighLevel CRM systems, funnels and automations that connect each step and help your team follow up consistently.'}
</p>

            <div className="hero-actions">
              <a
                className="primary-button"
                href={profile.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.hero.cta}
                <ArrowUpRight size={20} aria-hidden="true" />
              </a>

              <a className="text-link" href="#about">
                {t.hero.secondaryCta}
                <ArrowDown size={16} aria-hidden="true" />
              </a>
            </div>

            <div className="hero-note">
              <span className="note-line" />
              {t.hero.note}
            </div>
          </div>

          <div className="hero-art" aria-hidden="true">
            <div className="art-halo" />

            <div className="orbital-system">
              <div className="orbit orbit-one" />
              <div className="orbit orbit-two" />
              <div className="orbit orbit-three" />
              <div className="core-sphere">
                <Workflow size={54} strokeWidth={1.2} />
              </div>
            </div>

            <div className="floating-label label-automation">
              <Workflow size={20} />
              <span>{t.hero.automation}</span>
            </div>

            <div className="floating-label label-design">
              <Layers3 size={20} />
              <span>{t.hero.design}</span>
            </div>

            <div className="floating-label label-ai">
              <Bot size={20} />
              <span>{t.hero.ai}</span>
            </div>

            <span className="art-caption">
              {t.hero.caption}
            </span>
          </div>

          <a className="scroll-cue" href="#expertise">
            <ArrowDown size={17} aria-hidden="true" />
            {t.hero.scroll}
          </a>
        </section>

        <section
          className="expertise-strip"
          id="expertise"
          aria-label={t.expertiseLabel}
        >
          {t.expertise.map((item, index) => {
            const Icon = expertiseIcons[index]

            return (
              <article className="expertise-item" key={index}>
                <span className="expertise-number">
                  0{index + 1}
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
              <span className="eyebrow-line" />
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

            <p className="markets-note">
              {t.about.markets}
            </p>

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
  <CountUp key={`${language}-${stat.value}`} value={stat.value} />
</dd>
              </div>
            ))}
          </dl>
        </section>

        <Services language={language} />
        <Projects language={language} />
        <Skills language={language} />
        <Process language={language} />
        <Reviews language={language} />
                <FAQ language={language} />
      </main>

      <Contact language={language} />
    </div>
  )
}