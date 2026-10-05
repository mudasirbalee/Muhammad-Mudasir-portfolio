import { Search, Layers3, CheckCircle2, ArrowUpRight } from 'lucide-react'
import { profile } from './content'
import './Process.css'

const copy = {
  en: {
    eyebrow: 'HOW I WORK',
    title: 'Clear steps.',
    highlight: 'From idea to handover.',
    description:
      'We agree on the scope first, then build, review and test the setup around your business.',
    cta: 'Discuss your project',
    steps: [
      {
        title: 'Understand & plan',
        description:
          'We review your goals, current setup and the gaps you want to fix. Then we agree on deliverables, access requirements and a realistic timeline.',
        detail: 'A clear scope before the build.',
      },
      {
        title: 'Build & connect',
        description:
          'I build the agreed pages, CRM setup or automations and connect the relevant forms, calendars and tools. You review progress at agreed checkpoints.',
        detail: 'Your feedback during the build.',
      },
      {
        title: 'Test & refine',
        description:
          'I test the relevant customer journeys, check workflow conditions and review layouts across screen sizes. We resolve issues and review the agreed scope together.',
        detail: 'Checks based on your project.',
      },
      {
        title: 'Launch & hand over',
        description:
          'After your approval, we launch the agreed setup. I explain how to use it and provide the handover materials included in the scope. Ongoing support can be arranged separately.',
        detail: 'Know what happens after launch.',
      },
    ],
  },
  es: {
    eyebrow: 'CÓMO TRABAJO',
    title: 'Pasos claros.',
    highlight: 'De la idea a la entrega.',
    description:
      'Primero acordamos el alcance. Después construimos, revisamos y probamos la configuración según las necesidades de tu negocio.',
    cta: 'Hablemos de tu proyecto',
    steps: [
      {
        title: 'Entender y planificar',
        description:
          'Revisamos tus objetivos, la configuración actual y los problemas que quieres resolver. Acordamos los entregables, los accesos necesarios y un plazo realista.',
        detail: 'Un alcance claro antes de empezar.',
      },
      {
        title: 'Construir y conectar',
        description:
          'Creo las páginas, el CRM o las automatizaciones acordadas y conecto los formularios, calendarios y herramientas pertinentes. Revisas el progreso en los puntos acordados.',
        detail: 'Tu opinión durante el desarrollo.',
      },
      {
        title: 'Probar y ajustar',
        description:
          'Pruebo los recorridos del cliente, compruebo las condiciones de los flujos y reviso los diseños en diferentes tamaños de pantalla. Resolvemos los problemas y revisamos el alcance juntos.',
        detail: 'Pruebas adaptadas a tu proyecto.',
      },
      {
        title: 'Publicar y entregar',
        description:
          'Tras tu aprobación, ponemos en marcha la configuración. Explico cómo utilizarla y proporciono los materiales de entrega incluidos en el alcance. El soporte continuo se puede acordar por separado.',
        detail: 'Claridad después del lanzamiento.',
      },
    ],
  },
}

const icons = [Search, Layers3, CheckCircle2, ArrowUpRight]

export default function Process({ language = 'en' }) {
  const t = copy[language] || copy.en

  return (
    <section
      className="process-section"
      id="process"
      aria-labelledby="process-title"
    >
      <div className="process-intro">
        <p className="eyebrow">
          <span className="eyebrow-line" />
          {t.eyebrow}
        </p>

        <h2 id="process-title">
          {t.title}
          <span className="gradient-text">{t.highlight}</span>
        </h2>

        <p className="process-description">{t.description}</p>

        <a
          className="primary-button"
          href={profile.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t.cta}
          <ArrowUpRight size={18} aria-hidden="true" />
        </a>
      </div>

      <ol className="process-timeline">
        {t.steps.map((step, index) => {
          const Icon = icons[index]

          return (
            <li className="process-step" key={index}>
              <span className="process-marker" aria-hidden="true">
                <Icon size={22} strokeWidth={1.5} />
              </span>

              <div className="process-step-content">
                <span className="process-number" aria-hidden="true">
                  0{index + 1}
                </span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                <span className="process-detail">{step.detail}</span>
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}