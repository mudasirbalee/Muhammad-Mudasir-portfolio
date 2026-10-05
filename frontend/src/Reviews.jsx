import { ArrowUpRight, Star } from 'lucide-react'
import { profile } from './content'
import './Reviews.css'

export default function Reviews({ language = 'en' }) {
  const es = language === 'es'

  const samples = es
  ? [
      ['CRM y organización', 'La estructura propuesta facilita encontrar contactos y seguir cada oportunidad.'],
      ['Sitios web y embudos', 'El diseño presenta los servicios con claridad y ofrece un siguiente paso visible.'],
      ['Automatización', 'Los pasos del seguimiento están organizados y son fáciles de entender.'],
      ['Reservas', 'El recorrido conecta el formulario con la reserva y los recordatorios.'],
      ['Integraciones', 'La configuración conecta las herramientas necesarias en un proceso coherente.'],
      ['Entrega y soporte', 'Las explicaciones ayudan a comprender la configuración y los siguientes pasos.'],
    ]
  : [
      ['CRM & Organization', 'The proposed setup makes contacts easier to find and opportunities easier to follow.'],
      ['Websites & Funnels', 'The layout presents the services clearly and gives visitors an obvious next step.'],
      ['Workflow Automation', 'The follow-up steps are organized and easy to understand.'],
      ['Appointment Booking', 'The journey connects the enquiry form with booking and reminders.'],
      ['Connected Tools', 'The setup brings the required tools together in one consistent process.'],
      ['Handover & Support', 'The explanations make the setup and next steps easier to understand.'],
    ]

  return (
    <section
      id="reviews"
      className="reviews-section"
      aria-labelledby="reviews-title"
    >
      <div>
        <p className="eyebrow">
          <span className="eyebrow-line" />
          {es ? 'OPINIONES DE CLIENTES' : 'CLIENT FEEDBACK'}
        </p>

        <h2 id="reviews-title">
          {es ? 'Conoce la experiencia' : 'Hear from the people'}
          <span className="gradient-text">
            {es ? 'de mis clientes.' : 'I’ve worked with.'}
          </span>
        </h2>

        <p className="reviews-description">
          {es
            ? 'Visita mi perfil de Upwork para consultar las opiniones de clientes y mi historial de trabajo.'
            : 'Visit my Upwork profile to explore client feedback and my work history.'}
        </p>
      </div>

      <div className="reviews-profile">
        <span className="reviews-badge">
          <Star size={19} aria-hidden="true" />
          Top Rated · Upwork
        </span>

        <h3>{profile.name}</h3>
        <p>
          {es
            ? 'Especialista en GoHighLevel y automatización'
            : 'GoHighLevel & Automation Specialist'}
        </p>

        <a
          className="primary-button"
          href={profile.upwork}
          target="_blank"
          rel="noopener noreferrer"
        >
          {es ? 'Ver perfil y opiniones' : 'View profile & feedback'}
          <ArrowUpRight size={18} aria-hidden="true" />
        </a>
      </div>
      <div className="sample-reviews">
  <p className="sample-review-notice">
    {es
      ? 'Contenido de ejemplo: sustituir por opiniones reales antes de publicar.'
      : 'Sample content — replace with real client reviews before publishing.'}
  </p>

  {samples.map(([title, text], index) => (
    <article className="sample-review-card" key={title}>
      <span>
        {es ? 'EJEMPLO' : 'SAMPLE'} 0{index + 1}
      </span>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  ))}
</div>
    </section>
  )
}