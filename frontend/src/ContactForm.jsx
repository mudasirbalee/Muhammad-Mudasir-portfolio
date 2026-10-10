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
    intro: 'Share your goals, requirements and a budget range to get started.',
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
      'What would you like to build or fix? Share your current setup, goals and requirements.',
    optional: 'optional',
    choose: 'Select an option',
    consent:
      'You may contact me about this project using the details I provide.',
    submit: 'Continue on WhatsApp',
    note:
      'Opens WhatsApp with your details. Review the message and press Send there. This website does not save your enquiry.',
    status:
      'Your message is ready. If WhatsApp did not open, use the link below.',
    open: 'Open prepared message',
    required: 'Fields marked * are required.',
    heading: 'New portfolio project enquiry',
    missing: 'Please complete this field.',
    invalidPhone:
      'Enter a valid phone number with 7–15 digits. You can include +, spaces, brackets and hyphens.',
  },

  es: {
    title: 'Cuéntame sobre tu proyecto',
    intro:
      'Comparte tus objetivos, requisitos y presupuesto aproximado para empezar.',
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
      '¿Qué quieres crear o corregir? Comparte tu configuración actual, objetivos y requisitos.',
    optional: 'opcional',
    choose: 'Selecciona una opción',
    consent:
      'Puedes contactarme sobre este proyecto con los datos facilitados.',
    submit: 'Continuar en WhatsApp',
    note:
      'Se abrirá WhatsApp con tus datos. Revisa el mensaje y pulsa Enviar allí. Este sitio no guarda tu consulta.',
    status:
      'Tu mensaje está listo. Si WhatsApp no se abrió, utiliza el enlace de abajo.',
    open: 'Abrir mensaje preparado',
    required: 'Los campos con * son obligatorios.',
    heading: 'Nueva consulta sobre un proyecto',
    missing: 'Completa este campo.',
    invalidPhone:
      'Introduce un teléfono válido de 7 a 15 dígitos. Puedes incluir +, espacios, paréntesis y guiones.',
  },
}

function moveFormGlow(event) {
  if (
    event.pointerType !== 'mouse' ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    return
  }

  const element = event.currentTarget
  const rect = element.getBoundingClientRect()

  if (!rect.width || !rect.height) return

  const x = Math.max(
    0,
    Math.min(100, ((event.clientX - rect.left) / rect.width) * 100)
  )

  const y = Math.max(
    0,
    Math.min(100, ((event.clientY - rect.top) / rect.height) * 100)
  )

  element.style.setProperty('--form-glow-x', `${x}%`)
  element.style.setProperty('--form-glow-y', `${y}%`)
}

function Field({ label, wide = false, children }) {
  return (
    <label className={`enquiry-field${wide ? ' enquiry-wide' : ''}`}>
      <span>{label}</span>

      <span
        className="enquiry-control"
        onPointerMove={moveFormGlow}
      >
        {children}
      </span>
    </label>
  )
}

function SelectField({ name, label, options, t, labelIndex, wide = false }) {
  return (
    <Field label={`${label} *`} wide={wide}>
      <select name={name} defaultValue="" required>
        <option value="" disabled>
          {t.choose}
        </option>

        {options.map(option => (
          <option key={option[0]} value={option[0]}>
            {option[labelIndex]}
          </option>
        ))}
      </select>
    </Field>
  )
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
    const get = name => String(data.get(name) || '').trim()

    for (const field of ['name', 'phone', 'details']) {
      const input = form.elements.namedItem(field)
      input.setCustomValidity('')

      if (!get(field)) {
        input.setCustomValidity(t.missing)
        input.reportValidity()
        return
      }
    }

    const phone = get('phone')
    const digitCount = phone.replace(/\D/g, '').length

    if (
      !/^\+?[\d\s().-]+$/.test(phone) ||
      digitCount < 7 ||
      digitCount > 15
    ) {
      const input = form.elements.namedItem('phone')
      input.setCustomValidity(t.invalidPhone)
      input.reportValidity()
      return
    }

    const selectedLabel = (options, key) =>
      options.find(([value]) => value === get(key))?.[labelIndex] || ''

    const lines = [
      t.heading,
      '',
      `${t.name}: ${get('name')}`,
      `${t.email}: ${get('email')}`,
      `${t.phone}: ${phone}`,
      ...(get('company') ? [`${t.company}: ${get('company')}`] : []),
      ...(get('website') ? [`${t.website}: ${get('website')}`] : []),
      ...(get('country') ? [`${t.country}: ${get('country')}`] : []),
      `${t.service}: ${selectedLabel(services, 'service')}`,
      `${t.budget}: ${selectedLabel(budgets, 'budget')}`,
      `${t.timeline}: ${selectedLabel(timelines, 'timeline')}`,
      '',
      `${t.details}:`,
      get('details'),
    ]

    const link = new URL(profile.whatsapp)
    link.searchParams.set('text', lines.join('\n'))

    setMessageLink(link.href)
    window.open(link.href, '_blank', 'noopener,noreferrer')
  }

  function clearFeedback(event) {
    event.target.setCustomValidity?.('')

    if (messageLink) {
      setMessageLink('')
    }
  }

  return (
    <div
      className="enquiry-panel"
      onPointerMove={moveFormGlow}
    >
      <div className="enquiry-heading">
        <h3>{t.title}</h3>
        <p>{t.intro}</p>
        <small>{t.required}</small>
      </div>

      <form
        className="enquiry-form"
        onSubmit={handleSubmit}
        onInput={clearFeedback}
        onChange={clearFeedback}
      >
        <div className="enquiry-grid">
          <Field label={`${t.name} *`}>
            <input
              name="name"
              autoComplete="name"
              required
              maxLength={100}
            />
          </Field>

          <Field label={`${t.email} *`}>
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={254}
            />
          </Field>

          <Field label={`${t.phone} *`}>
            <input
              name="phone"
              type="tel"
              autoComplete="tel"
              required
              maxLength={40}
              placeholder="+92 300 1234567"
            />
          </Field>

          <Field label={`${t.company} (${t.optional})`}>
            <input
              name="company"
              autoComplete="organization"
              maxLength={120}
            />
          </Field>

          <Field label={`${t.website} (${t.optional})`}>
            <input
              name="website"
              type="url"
              autoComplete="url"
              placeholder="https://"
              maxLength={300}
            />
          </Field>

          <Field label={`${t.country} (${t.optional})`}>
            <input
              name="country"
              maxLength={100}
            />
          </Field>

          <SelectField
            name="service"
            label={t.service}
            options={services}
            t={t}
            labelIndex={labelIndex}
            wide
          />

          <SelectField
            name="budget"
            label={t.budget}
            options={budgets}
            t={t}
            labelIndex={labelIndex}
          />

          <SelectField
            name="timeline"
            label={t.timeline}
            options={timelines}
            t={t}
            labelIndex={labelIndex}
          />

          <Field label={`${t.details} *`} wide>
            <textarea
              name="details"
              rows={3}
              required
              maxLength={2000}
              placeholder={t.placeholder}
            />
          </Field>
        </div>

        <label className="enquiry-consent">
          <input
            type="checkbox"
            name="consent"
            required
          />
          <span>{t.consent}</span>
        </label>

        <p
          className="enquiry-note"
          id="enquiry-submit-note"
        >
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