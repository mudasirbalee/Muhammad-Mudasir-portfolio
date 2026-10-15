import { useEffect, useState } from 'react'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { HeroSpecialties } from './PortfolioMotion'
import HeroVisual from './HeroVisual'
import './Hero.css'

function LiveAvailability({ es }) {
  const [time, setTime] = useState('')

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Karachi',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
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
          {es
            ? 'Creo sistemas GoHighLevel que convierten'
            : 'I Build GoHighLevel Systems That Turn'}
          {' '}
          <span>
            {es
              ? 'Leads en clientes.'
              : 'Leads Into Customers.'}
          </span>
        </h1>

        <div className="hv-description">
          <p>
            {es
              ? 'Soy Muhammad Mudasir, especialista en GoHighLevel con más de 4 años de experiencia práctica creando sistemas completos de CRM, automatización e inteligencia artificial para agencias y empresas de servicios.'
              : "I'm Muhammad Mudasir, a GoHighLevel specialist with 4+ years of hands-on experience building complete CRM, automation, and AI-powered systems for agencies and service-based businesses."}
          </p>

          <p>
            {es
              ? 'Desde embudos y flujos de trabajo hasta agentes de IA, integraciones y configuración A2P, ayudo a las empresas a simplificar sus operaciones, automatizar el seguimiento y mejorar la experiencia de sus clientes.'
              : 'From funnels and workflows to AI agents, integrations, and A2P setup, I help businesses streamline operations, automate follow-ups, and build better customer journeys.'}
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

        <div className="hv-proof">
          <div>
            <strong>4+</strong>
            <span>
              {es
                ? 'Años de experiencia'
                : 'Years Experience'}
            </span>
          </div>

          <div>
            <strong>100+</strong>
            <span>
              {es
                ? 'Subcuentas GHL'
                : 'GHL Sub-Accounts'}
            </span>
          </div>

          <div>
            <strong>200+</strong>
            <span>
              {es
                ? 'Aprobaciones A2P gestionadas'
                : 'A2P Approvals Handled'}
            </span>
          </div>
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