import {
  Workflow,
  Layers3,
  Bot,
  CalendarDays,
  Cable,
  MessageSquare,
  Copy,
  Wrench,
  ArrowUpRight,
} from 'lucide-react'
import { profile } from './content'

const servicesContent = {
  en: {
    eyebrow: 'WHAT I CAN HELP WITH',
    title: 'The right systems.',
    highlight: 'Built around your business.',
    description:
      'From a fresh GoHighLevel setup to improving an existing account, I connect the tools and processes behind your customer journey.',
    cta: 'Discuss your requirements',
    items: [
      {
        title: 'GoHighLevel CRM & Workflows',
        description:
          'CRM setup, pipelines, custom fields and workflows that organize leads and keep follow-up consistent.',
        tags: ['CRM setup', 'Pipelines', 'Automation'],
      },
      {
        title: 'Websites & Sales Funnels',
        description:
          'Responsive websites, landing pages and funnels connected to your forms, CRM and follow-up sequences.',
        tags: ['Websites', 'Landing pages', 'Forms'],
      },
      {
        title: 'AI Chatbots & Voice AI',
        description:
          'AI assistants configured around your FAQs, lead qualification and booking process, with clear handoffs to your team.',
        tags: ['Chatbots', 'Voice AI', 'Lead qualification'],
      },
      {
        title: 'Calendars & Appointment Booking',
        description:
          'Booking calendars, confirmations, reminders and cancellation or no-show follow-up built around your schedule.',
        tags: ['Calendars', 'Reminders', 'Booking'],
      },
      {
        title: 'Integrations & Data Flow',
        description:
          'Connect GoHighLevel with your other tools using supported integrations, APIs and webhooks.',
        tags: ['Integrations', 'APIs', 'Webhooks'],
      },
      {
        title: 'A2P Registration & SMS Setup',
        description:
          'Help with A2P registration, consent collection and SMS workflow setup. Approval remains subject to provider review.',
        tags: ['A2P registration', 'SMS', 'Consent'],
      },
      {
        title: 'Snapshots & Account Setup',
        description:
          'Reusable snapshots and organized account setups that make it easier to roll out your processes across subaccounts.',
        tags: ['Snapshots', 'Subaccounts', 'Templates'],
      },
      {
        title: 'Audits, Fixes & Ongoing Support',
        description:
          'Review existing setups, investigate workflow issues, test changes and maintain the systems your team relies on.',
        tags: ['Audits', 'Troubleshooting', 'Support'],
      },
    ],
  },

  es: {
    eyebrow: 'CÓMO PUEDO AYUDARTE',
    title: 'Los sistemas adecuados.',
    highlight: 'Diseñados para tu negocio.',
    description:
      'Desde una nueva configuración de GoHighLevel hasta la mejora de una cuenta existente, conecto las herramientas y los procesos que acompañan a tus clientes.',
    cta: 'Hablemos de tus necesidades',
    items: [
      {
        title: 'CRM y flujos de trabajo en GoHighLevel',
        description:
          'Configuración del CRM, procesos de venta, campos personalizados y automatizaciones para organizar clientes potenciales y mantener un seguimiento constante.',
        tags: ['Configuración del CRM', 'Ventas', 'Automatización'],
      },
      {
        title: 'Sitios web y embudos de venta',
        description:
          'Sitios web adaptables, páginas de destino y embudos conectados a tus formularios, CRM y secuencias de seguimiento.',
        tags: ['Sitios web', 'Páginas de destino', 'Formularios'],
      },
      {
        title: 'Chatbots y asistentes de voz con IA',
        description:
          'Asistentes de IA configurados para tus preguntas frecuentes, la calificación de clientes potenciales y las reservas, con derivación a tu equipo cuando sea necesario.',
        tags: ['Chatbots', 'IA de voz', 'Calificación de leads'],
      },
      {
        title: 'Calendarios y reservas de citas',
        description:
          'Calendarios, confirmaciones, recordatorios y seguimiento de cancelaciones o ausencias adaptados a tu horario.',
        tags: ['Calendarios', 'Recordatorios', 'Reservas'],
      },
      {
        title: 'Integraciones y flujo de datos',
        description:
          'Conecto GoHighLevel con tus otras herramientas mediante integraciones compatibles, API y webhooks.',
        tags: ['Integraciones', 'API', 'Webhooks'],
      },
      {
        title: 'Registro A2P y configuración de SMS',
        description:
          'Ayuda con el registro A2P, la recopilación del consentimiento y los flujos de SMS. La aprobación depende de la revisión del proveedor.',
        tags: ['Registro A2P', 'SMS', 'Consentimiento'],
      },
      {
        title: 'Snapshots y configuración de cuentas',
        description:
          'Snapshots reutilizables y cuentas organizadas para implementar tus procesos en distintas subcuentas con mayor facilidad.',
        tags: ['Snapshots', 'Subcuentas', 'Plantillas'],
      },
      {
        title: 'Auditorías, correcciones y soporte',
        description:
          'Reviso configuraciones existentes, investigo problemas, pruebo cambios y mantengo los sistemas que utiliza tu equipo.',
        tags: ['Auditorías', 'Resolución de problemas', 'Soporte'],
      },
    ],
  },
}

const icons = [
  Workflow,
  Layers3,
  Bot,
  CalendarDays,
  Cable,
  MessageSquare,
  Copy,
  Wrench,
]

export default function Services({ language = 'en' }) {
  const t = servicesContent[language] || servicesContent.en

  return (
    <section
      className="services-section"
      id="services"
      aria-labelledby="services-title"
    >
      <div className="services-heading">
        <p className="eyebrow">
          <span className="eyebrow-line" />
          {t.eyebrow}
        </p>

        <h2 id="services-title">
          {t.title}
          <br />
          <span className="gradient-text">{t.highlight}</span>
        </h2>

        <p className="services-description">{t.description}</p>
      </div>

      <div className="services-grid">
        {t.items.map((service, index) => {
          const Icon = icons[index]

          return (
            <article
  className="service-card"
  key={index}
  onPointerMove={(event) => {
    if (event.pointerType === 'touch') return

    const card = event.currentTarget
    const rect = card.getBoundingClientRect()

    const x = Math.max(
      0,
      Math.min(100, ((event.clientX - rect.left) / rect.width) * 100)
    )
    const y = Math.max(
      0,
      Math.min(100, ((event.clientY - rect.top) / rect.height) * 100)
    )

    card.style.setProperty('--service-glow-x', `${x}%`)
    card.style.setProperty('--service-glow-y', `${y}%`)
  }}
>
  <span className="service-border-glow" aria-hidden="true" />
              <div className="service-card-top">
                <span className="service-icon">
                  <Icon size={25} strokeWidth={1.5} aria-hidden="true" />
                </span>
                <span className="service-number" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              <h3>{service.title}</h3>
              <p>{service.description}</p>

              <ul className="service-tags">
                {service.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </article>
          )
        })}
      </div>

      <div className="services-action">
        <a
          className="primary-button"
          href={profile.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t.cta}
          <ArrowUpRight size={19} aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}