import { useEffect, useRef } from 'react'
import {
  Search,
  Layers3,
  CircleCheck,
  ArrowUpRight,
} from 'lucide-react'
import './Process.css'

const steps = [
  {
    icon: Search,
    en: {
      title: 'Understand & plan',
      text: 'We review your goals, current setup and the gaps you want to fix. Then we agree on deliverables, access requirements and a realistic timeline.',
      note: 'A clear scope before the build.',
    },
    es: {
      title: 'Entender y planificar',
      text: 'Revisamos tus objetivos, la configuración actual y lo que necesitas mejorar. Después acordamos los entregables, los accesos y un plazo realista.',
      note: 'Un alcance claro antes de empezar.',
    },
  },
  {
    icon: Layers3,
    en: {
      title: 'Build & connect',
      text: 'I build the agreed pages, CRM setup or automations and connect the relevant forms, calendars and tools. You review progress at agreed checkpoints.',
      note: 'Your feedback during the build.',
    },
    es: {
      title: 'Crear y conectar',
      text: 'Creo las páginas, el CRM o las automatizaciones acordadas y conecto los formularios, calendarios y herramientas. Revisas el progreso en los puntos acordados.',
      note: 'Tu opinión durante el desarrollo.',
    },
  },
  {
    icon: CircleCheck,
    en: {
      title: 'Test & refine',
      text: 'I test the relevant customer journeys, check workflow conditions and review layouts across screen sizes. We resolve issues and review the agreed scope together.',
      note: 'Checks based on your project.',
    },
    es: {
      title: 'Probar y mejorar',
      text: 'Pruebo los recorridos del cliente, reviso las condiciones de automatización y compruebo el diseño en distintos tamaños de pantalla. Resolvemos los problemas y revisamos el alcance.',
      note: 'Pruebas adaptadas a tu proyecto.',
    },
  },
  {
    icon: ArrowUpRight,
    en: {
      title: 'Handover & support',
      text: 'I walk you through the completed setup, explain how to manage it and share the agreed handover materials. We clarify any remaining questions and next steps.',
      note: 'A clear handover for your team.',
    },
    es: {
      title: 'Entrega y soporte',
      text: 'Te explico la configuración terminada, cómo gestionarla y los materiales de entrega acordados. Aclaramos las dudas y los siguientes pasos.',
      note: 'Una entrega clara para tu equipo.',
    },
  },
]

export default function Process({ language = 'en' }) {
  const sectionRef = useRef(null)
  const locale = language === 'es' ? 'es' : 'en'
  const es = locale === 'es'

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const items = [...section.querySelectorAll('.pr-step')]
    const motion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    )
    let observer

    function setup() {
      observer?.disconnect()
      items.forEach(item => {
        item.classList.remove('pr-reveal', 'pr-visible')
      })

      if (motion.matches || !('IntersectionObserver' in window)) {
        return
      }

      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          entry.target.classList.toggle(
            'pr-visible',
            entry.isIntersecting
          )
        })
      }, { threshold: 0 })

      items.forEach(item => {
        item.classList.add('pr-reveal')
        observer.observe(item)
      })
    }

    setup()
    motion.addEventListener('change', setup)

    return () => {
      observer?.disconnect()
      motion.removeEventListener('change', setup)
      items.forEach(item => {
        item.classList.remove('pr-reveal', 'pr-visible')
      })
    }
  }, [])

  return (
    <section
      id="process"
      className="pr-section"
      ref={sectionRef}
      aria-labelledby="pr-title"
    >
      <div className="pr-layout">
        <header className="pr-intro">
          <p className="pr-eyebrow">
            {es ? 'CÓMO TRABAJO' : 'HOW I WORK'}
          </p>

          <h2 id="pr-title">
            {es ? 'PASOS CLAROS.' : 'CLEAR STEPS.'}
            <span>
              {es ? 'DE LA IDEA' : 'FROM IDEA'}
            </span>
            <mark>
              {es ? 'A LA ENTREGA.' : 'TO HANDOVER.'}
            </mark>
          </h2>

          <p className="pr-summary">
            {es
              ? 'Primero acordamos el alcance. Después creamos, revisamos y probamos la solución para tu negocio.'
              : 'We agree on the scope first, then build, review and test the setup around your business.'}
          </p>

          <a href="#contact" className="pr-cta">
            {es ? 'Hablemos de tu proyecto' : 'Discuss your project'}
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </header>

        <ol className="pr-timeline">
          {steps.map((step, index) => {
            const Icon = step.icon
            const text = step[locale]

            return (
              <li className="pr-step" key={index}>
                <span className="pr-icon" aria-hidden="true">
                  <Icon size={23} strokeWidth={1.6} />
                </span>

                <article className="pr-card">
                  <span className="pr-number">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3>{text.title}</h3>
                  <p>{text.text}</p>
                  <small>{text.note}</small>
                </article>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}