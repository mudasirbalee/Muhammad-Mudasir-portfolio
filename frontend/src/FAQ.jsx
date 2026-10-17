import { Plus, ArrowUpRight } from 'lucide-react'
import { profile } from './content'
import './FAQ.css'

const copy = {
  en: {
    eyebrow: 'COMMON QUESTIONS',
    title: 'Before we',
    highlight: 'get started.',
    description: 'Quick answers about working together.',
    contact: 'Have another question?',
    cta: 'Ask me directly',
    items: [
      {
        question: 'What GoHighLevel services do you offer?',
        answer:
          'CRM setup, funnels, workflow automation, AI agents, integrations and A2P registration support—from individual tasks to complete systems.',
      },
      {
        question: 'Can you improve my existing setup?',
        answer:
          'Yes. I can review your account, fix issues and improve workflows, pages or integrations around your business needs.',
      },
      {
        question: 'How long will my project take?',
        answer:
          'It depends on the scope and required access or content. We agree on a clear timeline before work begins.',
      },
      {
        question: 'How much will it cost?',
        answer:
          'Pricing depends on the work involved. Share your requirements, and I’ll confirm the scope and price before we start.',
      },
      {
        question: 'Do you provide ongoing support?',
        answer:
          'Yes. Maintenance, troubleshooting and further improvements are available, with support terms agreed upfront.',
      },
    ],
  },
  es: {
    eyebrow: 'PREGUNTAS FRECUENTES',
    title: 'Antes de',
    highlight: 'empezar.',
    description: 'Respuestas rápidas sobre cómo trabajar juntos.',
    contact: '¿Tienes otra pregunta?',
    cta: 'Pregúntame directamente',
    items: [
      {
        question: '¿Qué servicios de GoHighLevel ofreces?',
        answer:
          'Configuración CRM, embudos, automatizaciones, agentes de IA, integraciones y apoyo con el registro A2P, desde tareas concretas hasta sistemas completos.',
      },
      {
        question: '¿Puedes mejorar mi configuración actual?',
        answer:
          'Sí. Puedo revisar tu cuenta, resolver problemas y mejorar automatizaciones, páginas o integraciones según las necesidades de tu negocio.',
      },
      {
        question: '¿Cuánto tardará mi proyecto?',
        answer:
          'Depende del alcance y de los accesos o contenidos necesarios. Acordamos un plazo claro antes de empezar.',
      },
      {
        question: '¿Cuánto costará?',
        answer:
          'El precio depende del trabajo necesario. Comparte tus requisitos y confirmaré el alcance y el precio antes de comenzar.',
      },
      {
        question: '¿Ofreces soporte continuo?',
        answer:
          'Sí. Ofrezco mantenimiento, resolución de problemas y mejoras adicionales, con las condiciones de soporte acordadas de antemano.',
      },
    ],
  },
}

export default function FAQ({ language = 'en' }) {
  const t = copy[language] || copy.en

  return (
    <section
      id="faq"
      className="faq-section"
      aria-labelledby="faq-title"
    >
      <div className="faq-intro">
        <p className="eyebrow">
          <span className="eyebrow-line" aria-hidden="true" />
          {t.eyebrow}
        </p>

        <h2 id="faq-title">
          {t.title}
          <span className="gradient-text">{t.highlight}</span>
        </h2>

        <p className="faq-description">{t.description}</p>

        <div className="faq-contact">
          <p>{t.contact}</p>
          <a
            href={profile.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.cta}
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="faq-list">
        {t.items.map((item, index) => (
          <details className="faq-item" key={item.question}>
            <summary>
              <span className="faq-number" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span>{item.question}</span>
              <Plus size={20} aria-hidden="true" />
            </summary>

            <div className="faq-answer">
              <p>{item.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  )
}