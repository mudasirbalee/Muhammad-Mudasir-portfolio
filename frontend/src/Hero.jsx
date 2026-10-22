import { useEffect, useState } from 'react'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { HeroSpecialties } from './PortfolioMotion'
import HeroVisual from './HeroVisual'
import './Hero.css'

function LiveAvailability({ es }) {
  const [time, setTime] = useState('')

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Karachi',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    })

    const update = () => {
      setTime(formatter.format(new Date()))
    }

    update()
    const timer = window.setInterval(update, 1000)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <div className="live-availability">
      <span className="live-availability-status">
        <span
          className="live-availability-dot"
          aria-hidden="true"
        />
        {es
          ? 'Disponible para proyectos'
          : 'Available for new projects'}
      </span>

      <span className="live-availability-clock">
        <span>PKT</span>
        <time
          aria-label={
            es ? 'Hora de Pakistán' : 'Pakistan time'
          }
        >
          {time || '--:--:--'}
        </time>
      </span>
    </div>
  )
}

export default function Hero({ language = 'en' }) {
  const es = language === 'es'

  return (
    <section
      id="home"
      className="hero-section hero-v2"
      aria-labelledby="hero-title"
    >
      <div className="hv-copy">
        <LiveAvailability es={es} />

        <p className="hv-intro">
          {es
            ? 'Hola, soy Muhammad Mudasir.'
            : "Hi, I'm Muhammad Mudasir."}
        </p>

        <div className="hv-role-row">
          <span className="hv-role-fixed">
            GoHighLevel
          </span>
          <HeroSpecialties language={language} />
        </div>

        <h1 id="hero-title">
          <span className="hv-headline-main">
            {es
              ? 'Menos trabajo manual.'
              : 'Less Manual Work.'}
          </span>
          <span className="hv-headline-highlight">
            <span className="hv-headline-highlight-text">
              {es
                ? 'Más oportunidades que avanzan.'
                : 'More Leads Moving Forward.'}
            </span>
          </span>
        </h1>

        <div className="hv-description">
          <p>
            {es
              ? 'Creo sistemas CRM, automatizaciones y soluciones de IA en GoHighLevel para ayudar a agencias y empresas de servicios a captar leads, dar seguimiento más rápido y convertir consultas en citas.'
              : 'I build GoHighLevel CRM, automation, and AI systems that help agencies and service businesses capture leads, follow up faster, and turn enquiries into booked appointments.'}
          </p>

          <p>
            {es
              ? 'Con más de 4 años de experiencia práctica, conecto tus embudos, flujos de trabajo y herramientas en un sistema organizado, adaptado a cómo funciona tu negocio.'
              : 'With 4+ years of hands-on experience, I connect your funnels, workflows, and tools into one organized system—built around how your business works.'}
          </p>
        </div>

        <div className="hv-actions">
          <a className="hv-primary" href="#contact">
            {es
              ? 'Hablemos de tu proyecto'
              : "Let's Discuss Your Project"}
            <ArrowUpRight size={19} aria-hidden="true" />
          </a>

          <a className="hv-secondary" href="#projects">
            {es ? 'Ver mis proyectos' : 'View My Work'}
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>

        <p className="hv-markets">
          {es ? 'Lun–Vie' : 'Mon–Fri'}
          <span aria-hidden="true"> / </span>
          USA · UK · Australia · Canada
        </p>
      </div>

      <HeroVisual language={language} />

      <a className="hv-scroll" href="#skills">
        <ArrowDown size={16} aria-hidden="true" />
        {es
          ? 'Explora las herramientas'
          : 'Explore the toolkit'}
      </a>
    </section>
  )
}