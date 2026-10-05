import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { profile } from './content'
import './ContactForm.css'

const services = [
  ['website', 'Website / Landing Page', 'Sitio web / Página de destino'],
  ['funnel', 'Sales Funnel', 'Embudo de ventas'],
  ['crm', 'CRM & Pipelines', 'CRM y procesos de venta'],
  ['automation', 'Workflow Automation', 'Automatización de flujos'],
  ['membership', 'Memberships & Courses', 'Membresías y cursos'],
  ['forms', 'Custom Forms', 'Formularios personalizados'],
  ['dashboard', 'Custom Dashboard', 'Panel personalizado'],
  ['ai', 'AI Chatbot / Voice AI', 'Chatbot / IA de voz'],
  ['integration', 'Integrations', 'Integraciones'],
  ['a2p', 'A2P & SMS Setup', 'A2P y configuración de SMS'],
  ['support', 'Audit / Fixes / Support', 'Auditoría / Correcciones / Soporte'],
  ['other', 'Other / Multiple Services', 'Otro / Varios servicios'],
]

const budgets = [
  ['under250', 'Under $250', 'Menos de $250'],
  ['250-500', '$250–$500', '$250–$500'],
  ['500-1000', '$500–$1,000', '$500–$1,000'],
  ['1000-2500', '$1,000–$2,500', '$1,000–$2,500'],
  ['2500plus', '$2,500+', '$2,500+'],
  ['discuss', 'Let’s discuss', 'Por definir'],
]

const timelines = [
  ['asap', 'As soon as possible', 'Lo antes posible'],
  ['2weeks', 'Within 2 weeks', 'En 2 semanas'],
  ['month', 'Within a month', 'En un mes'],
  ['flexible', 'Flexible / Exploring options', 'Flexible / Explorando opciones'],
]

const copy = {
  en: {
    title: 'Tell me about your project',
    intro: 'Share a few details so we can discuss the right scope.',
    name: 'Full name',
    email: 'Email address',
    phone: 'Phone / WhatsApp',
    company: 'Company name',
    website: 'Website URL',
    country: 'Country / Time zone',
    service: 'Service needed',
    budget: 'Estimated budget (USD)',
    timeline: 'Preferred timeline',
    details: 'Project details',
    placeholder:
      'What do you want to build or fix? Include your current setup, main goals and any specific requirements.',
    optional: 'optional',
    choose: 'Select an option',
    consent: 'You may contact me about this project using the details I provide.',
    submit: 'Continue on WhatsApp',
    note:
      'This opens WhatsApp with your project details. Review the message and press Send there. Nothing is submitted to this website.',
    status:
      'Your WhatsApp message is ready. If WhatsApp did not open, use the link below.',
    open: 'Open prepared message',
    required: 'Fields marked * are required.',
    heading: 'New portfolio project enquiry',
  },
  es: {
    title: 'Cuéntame sobre tu proyecto',
    intro: 'Comparte algunos detalles para definir el alcance adecuado.',
    name: 'Nombre completo',
    email: 'Correo electrónico',
    phone: 'Teléfono / WhatsApp',
    company: 'Nombre de la empresa',
    website: 'URL del sitio web',
    country: 'País / Zona horaria',
    service: 'Servicio necesario',
    budget: 'Presupuesto estimado (USD)',
    timeline: 'Plazo preferido',
    details: 'Detalles del proyecto',
    placeholder:
      '¿Qué quieres crear o corregir? Describe tu configuración actual, objetivos y requisitos específicos.',
    optional: 'opcional',
    choose: 'Selecciona una opción',
    consent: 'Puedes contactarme sobre este proyecto con los datos facilitados.',
    submit: 'Continuar en WhatsApp',
    note:
      'Se abrirá WhatsApp con los detalles del proyecto. Revisa el mensaje y pulsa Enviar allí. No se envía ningún formulario a este sitio web.',
    status:
      'Tu mensaje está listo. Si WhatsApp no se abrió, utiliza el enlace de abajo.',
    open: 'Abrir mensaje preparado',
    required: 'Los campos con * son obligatorios.',
    heading: 'Nueva consulta sobre un proyecto',
  },
}

export default function ContactForm({ language = 'en' }) {
  const locale = language === 'es' ? 'es' : 'en'
  const t = copy[locale]
  const labelIndex = locale === 'es' ? 2 : 1
  const [messageLink, setMessageLink] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    const form = event.currentTarget
    const data = new FormData(form)
    const get = (name) => String(data.get(name) || '').trim()

    for (const field of ['name', 'details']) {
      const input = form.elements.namedItem(field)

      if (!get(field)) {
        input.setCustomValidity(
          locale === 'es'
            ? 'Completa este campo.'
            : 'Please complete this field.'
        )
        input.reportValidity()
        return
      }
    }

    const selectedLabel = (options, key) =>
      options.find(([value]) => value === get(key))?.[labelIndex] || ''

    const lines = [
      t.heading,
      '',
      `${t.name}: ${get('name')}`,
      `${t.email}: ${get('email')}`,
      get('phone') && `${t.phone}: ${get('phone')}`,
      get('company') && `${t.company}: ${get('company')}`,
      get('website') && `${t.website}: ${get('website')}`,
      get('country') && `${t.country}: ${get('country')}`,
      `${t.service}: ${selectedLabel(services, 'service')}`,
      `${t.budget}: ${selectedLabel(budgets, 'budget')}`,
      `${t.timeline}: ${selectedLabel(timelines, 'timeline')}`,
      '',
      `${t.details}:`,
      get('details'),
    ].filter((line) => line !== false)

    const link = new URL(profile.whatsapp)
    link.searchParams.set('text', lines.join('\n'))

    setMessageLink(link.href)
    window.open(link.href, '_blank', 'noopener,noreferrer')
  }

  function clearFeedback(event) {
    event.target.setCustomValidity?.('')
    if (messageLink) setMessageLink('')
  }

  return (
    <div className="enquiry-panel">
      <div className="enquiry-heading">
        <h3>{t.title}</h3>
        <p>{t.intro}</p>
        <small>{t.required}</small>
      </div>

      <form
        className="enquiry-form"
        onSubmit={handleSubmit}
        onInput={clearFeedback}
      >
        <div className="enquiry-grid">
          <label className="enquiry-field">
            <span>{t.name} *</span>
            <input
              name="name"
              autoComplete="name"
              required
              maxLength={100}
            />
          </label>

          <label className="enquiry-field">
            <span>{t.email} *</span>
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={254}
            />
          </label>

          <label className="enquiry-field">
            <span>{t.phone} ({t.optional})</span>
            <input
              name="phone"
              type="tel"
              autoComplete="tel"
              maxLength={40}
              placeholder="+1 / +44 / +92 ..."
            />
          </label>

          <label className="enquiry-field">
            <span>{t.company} ({t.optional})</span>
            <input
              name="company"
              autoComplete="organization"
              maxLength={120}
            />
          </label>

          <label className="enquiry-field">
            <span>{t.website} ({t.optional})</span>
            <input
              name="website"
              type="url"
              autoComplete="url"
              placeholder="https://"
              maxLength={300}
            />
          </label>

          <label className="enquiry-field">
            <span>{t.country} ({t.optional})</span>
            <input name="country" maxLength={100} />
          </label>

          <label className="enquiry-field enquiry-wide">
            <span>{t.service} *</span>
            <select name="service" defaultValue="" required>
              <option value="" disabled>{t.choose}</option>
              {services.map((option) => (
                <option key={option[0]} value={option[0]}>
                  {option[labelIndex]}
                </option>
              ))}
            </select>
          </label>

          <label className="enquiry-field">
            <span>{t.budget} *</span>
            <select name="budget" defaultValue="" required>
              <option value="" disabled>{t.choose}</option>
              {budgets.map((option) => (
                <option key={option[0]} value={option[0]}>
                  {option[labelIndex]}
                </option>
              ))}
            </select>
          </label>

          <label className="enquiry-field">
            <span>{t.timeline} *</span>
            <select name="timeline" defaultValue="" required>
              <option value="" disabled>{t.choose}</option>
              {timelines.map((option) => (
                <option key={option[0]} value={option[0]}>
                  {option[labelIndex]}
                </option>
              ))}
            </select>
          </label>

          <label className="enquiry-field enquiry-wide">
            <span>{t.details} *</span>
            <textarea
              name="details"
              rows={5}
              required
              maxLength={2000}
              placeholder={t.placeholder}
            />
          </label>
        </div>

        <label className="enquiry-consent">
          <input type="checkbox" name="consent" required />
          <span>{t.consent}</span>
        </label>

        <p className="enquiry-note" id="enquiry-submit-note">
          {t.note}
        </p>

        <button
          type="submit"
          className="primary-button enquiry-submit"
          aria-describedby="enquiry-submit-note"
        >
          {t.submit}
          <ArrowUpRight size={19} aria-hidden="true" />
        </button>

        {messageLink && (
          <div className="enquiry-feedback">
            <p role="status">{t.status}</p>
            <a
              href={messageLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.open}
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        )}
      </form>
    </div>
  )
}