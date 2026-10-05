import { Plus, ArrowUpRight } from 'lucide-react'
import { profile } from './content'
import './FAQ.css'

const copy = {
  en: {
    eyebrow: 'COMMON QUESTIONS',
    title: 'Before we',
    highlight: 'get started.',
    description:
      'A few practical details about working together.',
    contact: 'Have another question?',
    cta: 'Ask me directly',
    items: [
      {
        question: 'Can you improve my existing GoHighLevel account?',
        answer:
          'Yes. I can review your current CRM, workflows, pages and integrations, identify the changes needed and agree on a focused scope with you before making updates.',
      },
      {
        question: 'Can I hire you for one specific task?',
        answer:
          'Yes. We can start with a specific task, such as a landing page, workflow repair, calendar setup or integration. Larger projects can be divided into agreed milestones.',
      },
      {
        question: 'What do you need before starting?',
        answer:
          'A description of your goals, the deliverables you need and any relevant designs or content. After reviewing the scope, I will confirm which account permissions and tool access are required.',
      },
      {
        question: 'How much will my project cost, and how long will it take?',
        answer:
          'Pricing and timing depend on the scope, complexity and readiness of your content and accounts. We agree on the cost, deliverables and timeline before work begins.',
      },
      {
        question: 'Do you work with clients in my country?',
        answer:
          'I work remotely with clients in the USA, UK, Australia and Canada. My working days are Monday to Friday, and we can agree on meeting times that suit our time zones.',
      },
      {
        question: 'Can you help with A2P registration?',
        answer:
          'Yes. I can assist with registration preparation, opt-in forms and SMS setup. Approval and review times are determined by the provider and cannot be guaranteed.',
      },
      {
        question: 'Is support available after handover?',
        answer:
          'Yes. We can discuss ongoing maintenance, troubleshooting or further improvements. The support period and included tasks are agreed as part of the project or a separate arrangement.',
      },
    ],
  },
  es: {
    eyebrow: 'PREGUNTAS FRECUENTES',
    title: 'Antes de',
    highlight: 'empezar.',
    description:
      'Algunos detalles prácticos sobre cómo trabajar juntos.',
    contact: '¿Tienes otra pregunta?',
    cta: 'Pregúntame directamente',
    items: [
      {
        question: '¿Puedes mejorar mi cuenta actual de GoHighLevel?',
        answer:
          'Sí. Puedo revisar tu CRM, automatizaciones, páginas e integraciones, identificar los cambios necesarios y acordar contigo un alcance definido antes de realizar actualizaciones.',
      },
      {
        question: '¿Puedo contratarte para una tarea concreta?',
        answer:
          'Sí. Podemos empezar con una página de destino, la reparación de un flujo, la configuración de un calendario o una integración. Los proyectos más grandes pueden dividirse en hitos acordados.',
      },
      {
        question: '¿Qué necesitas antes de empezar?',
        answer:
          'Una descripción de tus objetivos, los entregables que necesitas y los diseños o contenidos pertinentes. Después de revisar el alcance, confirmaré qué permisos y accesos se requieren.',
      },
      {
        question: '¿Cuánto costará mi proyecto y cuánto tardará?',
        answer:
          'El precio y el plazo dependen del alcance, la complejidad y la disponibilidad de tus contenidos y cuentas. Acordamos el coste, los entregables y el calendario antes de empezar.',
      },
      {
        question: '¿Trabajas con clientes de mi país?',
        answer:
          'Trabajo a distancia con clientes de Estados Unidos, Reino Unido, Australia y Canadá. Mis días de trabajo son de lunes a viernes y podemos acordar reuniones según nuestras zonas horarias.',
      },
      {
        question: '¿Puedes ayudarme con el registro A2P?',
        answer:
          'Sí. Puedo ayudar con la preparación del registro, los formularios de consentimiento y la configuración de SMS. La aprobación y los plazos de revisión dependen del proveedor y no se pueden garantizar.',
      },
      {
        question: '¿Ofreces soporte después de la entrega?',
        answer:
          'Sí. Podemos acordar mantenimiento, resolución de problemas o mejoras adicionales. El periodo de soporte y las tareas incluidas se definen dentro del proyecto o mediante un acuerdo separado.',
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
          <span className="eyebrow-line" />
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
          <details className="faq-item" key={index}>
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