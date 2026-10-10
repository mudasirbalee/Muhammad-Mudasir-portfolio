import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { HeroSpecialties } from './PortfolioMotion'
import { profile } from './content'
import HeroVisual from './HeroVisual'
import './Hero.css'
import { useEffect, useState } from 'react'

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

    const update = () => setTime(formatter.format(new Date()))

    update()
    const timer = window.setInterval(update, 1000)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <div className="live-availability">
      <span className="live-availability-status">
        <span className="live-availability-dot" aria-hidden="true" />
        {es ? 'Disponible para proyectos' : 'Available for new projects'}
      </span>

      <span className="live-availability-clock">
        <span>PKT</span>
        <time aria-label={es ? 'Hora de Pakistán' : 'Pakistan time'}>
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
          {es ? 'Hola, soy' : 'Hi, I’m'} {profile.name}.
        </p>

        <HeroSpecialties language={language} />

        <h1 id="hero-title">
          {es ? 'Tu próximo cliente.' : 'Your next customer.'}
          <span>
            {es
              ? 'Un recorrido mejor conectado.'
              : 'A better-connected journey.'}
          </span>
        </h1>

        <p className="hv-description">
          {es
            ? 'Diseño sitios web, embudos y automatizaciones en GoHighLevel que conectan el primer clic con el seguimiento y las reservas. Menos tareas manuales. Un proceso más claro para tu equipo.'
            : 'I design websites, funnels and GoHighLevel automations that connect the first click with follow-up and booking. Less manual work. A clearer process for your team.'}
        </p>

        <div className="hv-actions">
          <a className="hv-primary" href="#contact">
            {es ? 'Hablemos de tu proyecto' : 'Let’s discuss your project'}
            <ArrowUpRight size={19} aria-hidden="true" />
          </a>

          <a className="hv-secondary" href="#projects">
            {es ? 'Explorar proyectos' : 'Explore projects'}
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>

        <div className="hv-proof">
          <div>
            <strong>4+</strong>
            <span>
              {es ? 'años con GoHighLevel' : 'years with GoHighLevel'}
            </span>
          </div>

          <a
            href={profile.upwork}
            target="_blank"
            rel="noopener noreferrer"
          >
            <strong>Top Rated</strong>
            <span>
              {es ? 'Ver perfil en Upwork' : 'View Upwork profile'}
              <ArrowUpRight size={13} aria-hidden="true" />
            </span>
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
        {es ? 'Explora las herramientas' : 'Explore the toolkit'}
      </a>
    </section>
  )
}