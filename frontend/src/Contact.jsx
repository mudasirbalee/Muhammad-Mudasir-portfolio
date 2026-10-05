import ContactForm from './ContactForm'
import { ArrowUpRight, Mail, ArrowUp } from 'lucide-react'
import { profile } from './content'
import './Contact.css'

const copy = {
  en: {
    eyebrow: 'LET’S WORK TOGETHER',
    title: 'Tell me what',
    highlight: 'you want to build.',
    description:
      'Need a GoHighLevel setup, a website or a workflow fixed? Share your goal, what you already have and where you need help.',
    whatsapp: 'Discuss on WhatsApp',
    email: 'Send an email',
    availability: 'Accepting new projects',
    days: 'Monday–Friday',
    markets: 'Working with clients in the USA, UK, Australia and Canada.',
    note: 'Meeting times can be agreed around our time zones.',
    elsewhere: 'Find me online',
    top: 'Back to top',
    rights: 'All rights reserved.',
    subject: 'Portfolio project enquiry',
  },
  es: {
    eyebrow: 'TRABAJEMOS JUNTOS',
    title: 'Cuéntame qué',
    highlight: 'quieres crear.',
    description:
      '¿Necesitas configurar GoHighLevel, crear un sitio web o corregir una automatización? Comparte tu objetivo, lo que ya tienes y en qué necesitas ayuda.',
    whatsapp: 'Hablemos por WhatsApp',
    email: 'Enviar un correo',
    availability: 'Disponible para nuevos proyectos',
    days: 'De lunes a viernes',
    markets:
      'Trabajo con clientes de Estados Unidos, Reino Unido, Australia y Canadá.',
    note: 'Podemos acordar reuniones según nuestras zonas horarias.',
    elsewhere: 'Encuéntrame en línea',
    top: 'Volver arriba',
    rights: 'Todos los derechos reservados.',
    subject: 'Consulta sobre un proyecto',
  },
}

export default function Contact({ language = 'en' }) {
  const t = copy[language] || copy.en

  return (
    <>
      <section
        className="contact-section"
        id="contact"
        aria-labelledby="contact-title"
      >
        <div className="contact-panel">
          <div className="contact-copy">
            <p className="eyebrow">
              <span className="eyebrow-line" />
              {t.eyebrow}
            </p>

            <h2 id="contact-title">
              {t.title}
              <span className="gradient-text">{t.highlight}</span>
            </h2>

            <p className="contact-description">{t.description}</p>

            <div className="contact-buttons">
              <a
                className="primary-button"
                href={profile.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.whatsapp}
                <ArrowUpRight size={19} aria-hidden="true" />
              </a>

              <a
                className="contact-email-button"
                href={`mailto:${profile.email}?subject=${encodeURIComponent(
                  t.subject
                )}`}
              >
                <Mail size={18} aria-hidden="true" />
                {t.email}
              </a>
            </div>

            <a
              className="contact-email-address"
              href={`mailto:${profile.email}`}
            >
              {profile.email}
            </a>
          </div>

          <aside
            className="contact-availability"
            aria-label={t.availability}
          >
            <div className="contact-status">
              <span aria-hidden="true" />
              {t.availability}
            </div>

            <p className="contact-days">{t.days}</p>
            <p className="contact-markets">{t.markets}</p>
            <p className="contact-time-note">{t.note}</p>

            <div className="contact-socials">
              <span>{t.elsewhere}</span>

              <a
                href="https://www.linkedin.com/in/muhammad-mudasir-947791296"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
                <ArrowUpRight size={17} aria-hidden="true" />
              </a>

              <a
                href={profile.upwork}
                target="_blank"
                rel="noopener noreferrer"
              >
                Upwork
                <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </div>
          </aside>
          <ContactForm language={language} />
        </div>
      </section>

      <footer className="portfolio-footer">
        <a className="footer-brand" href="#home" aria-label={profile.name}>
          mudasir<span>.</span>
        </a>

        <p>
          © {new Date().getFullYear()} {profile.name}. {t.rights}
        </p>

        <a className="footer-top" href="#home">
          {t.top}
          <ArrowUp size={17} aria-hidden="true" />
        </a>
      </footer>
    </>
  )
}