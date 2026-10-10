import { ArrowUpRight } from 'lucide-react'
import './WhyMe.css'

export default function WhyMe({ language = 'en' }) {
  const es = language === 'es'

  const reasons = [
    {
      number: '01',
      label: es ? 'EXPERIENCIA PRÁCTICA' : 'HANDS-ON EXPERIENCE',
      title: es ? '4+ años con GoHighLevel.' : '4+ years with GoHighLevel.',
      text: es
        ? 'Experiencia práctica en configuración de CRM, embudos y automatización.'
        : 'Practical experience across CRM setup, funnels and automation.',
    },
    {
      number: '02',
      label: es ? 'VISIÓN COMPLETA' : 'THE COMPLETE JOURNEY',
      title: es ? 'Cada paso, conectado.' : 'Every step, connected.',
      text: es
        ? 'Páginas, formularios, pipelines y seguimiento diseñados para trabajar juntos.'
        : 'Pages, forms, pipelines and follow-up designed to work together.',
    },
    {
      number: '03',
      label: es ? 'CLARIDAD DESDE EL INICIO' : 'CLARITY FROM THE START',
      title: es ? 'Sabes qué esperar.' : 'Know what to expect.',
      text: es
        ? 'Alcance, accesos necesarios y entregables definidos antes de comenzar.'
        : 'Scope, required access and deliverables defined before work begins.',
    },
    {
      number: '04',
      label: es ? 'ATENCIÓN AL DETALLE' : 'ATTENTION TO DETAIL',
      title: es ? 'Pruebas y entrega clara.' : 'Tested. Then handed over.',
      text: es
        ? 'Pruebas de los recorridos acordados y una explicación clara de la configuración.'
        : 'Testing of agreed customer journeys and a clear walkthrough of the setup.',
    },
  ]

  return (
    <section
      id="why-me"
      className="wm-section"
      aria-labelledby="wm-title"
    >
      <div className="wm-heading why-intro">
        <p className="wm-eyebrow">
          {es ? 'POR QUÉ TRABAJAR CONMIGO' : 'WHY WORK WITH ME'}
        </p>

        <h2 id="wm-title">
          {es ? 'Tu negocio merece' : 'Your business deserves'}
          <br />
          <span>
            {es ? 'más que una configuración.' : 'more than a setup.'}
          </span>
        </h2>

        <p className="wm-description">
          {es
            ? 'Sistemas bien pensados, un alcance claro y atención a los detalles que importan.'
            : 'Thoughtful systems, a clear scope and attention to the details that matter.'}
        </p>
      </div>

      <div className="wm-grid">
        {reasons.map((reason, index) => (
          <article
            className={`why-item wm-card ${index === 0 ? 'wm-featured' : ''}`}
            key={reason.number}
          >
            <div className="wm-card-top">
              <span className="wm-label">{reason.label}</span>
              <span className="wm-number" aria-hidden="true">
                {reason.number}
              </span>
            </div>

            <div className="wm-card-copy">
              <h3>{reason.title}</h3>
              <p>{reason.text}</p>
            </div>
          </article>
        ))}
      </div>

      <a className="wm-cta" href="#contact">
        <span>
          {es ? 'Hablemos de tu proyecto' : 'Let’s talk about your project'}
        </span>
        <ArrowUpRight size={21} aria-hidden="true" />
      </a>
    </section>
  )
}