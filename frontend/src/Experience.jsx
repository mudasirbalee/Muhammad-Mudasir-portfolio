import { useEffect, useRef } from 'react'
import './Experience.css'

const companies = [
  {
    period: '2023 — 2024',
    company: 'CTRLdone',
    role: 'GoHighLevel CRM Specialist',
    points: [
      'Built and managed CRM systems, workflows and pipelines.',
      'Configured lead capture forms, calendars, tags and custom fields.',
      'Supported funnel and website development, troubleshooting and optimization.',
    ],
  },
  {
    period: '2024 — 2025',
    company: 'HighLevers Pro',
    role: 'CRM & Workflow Automation Specialist',
    points: [
      'Configured GoHighLevel accounts, CRM structures and pipeline stages.',
      'Built workflow logic and lead follow-up sequences.',
      'Supported forms, calendars, funnels, integrations and system troubleshooting.',
    ],
  },
  {
    period: 'January — August 2026',
    company: 'NDT Legacy',
    role: 'GoHighLevel Website & Automation Specialist',
    points: [
      'Worked on GoHighLevel websites, memberships, courses and automation.',
      'Supported CRM configuration and member-facing digital experiences.',
      'Improved content organization, usability and customer journeys.',
    ],
  },
  {
    period: 'September 2026',
    company: 'Excess Elite',
    role: 'GoHighLevel & A2P Compliance Specialist',
    points: [
      'Supported A2P 10DLC applications and business messaging registration.',
      'Reviewed business details, website information and EIN/CP-575 documentation.',
      'Assisted with LC Phone, SMS configuration and registration troubleshooting.',
    ],
  },
]

const freelance = {
  period: '2023 — Present',
  company: 'Upwork · Fiverr · Independent',
  role: 'Independent GoHighLevel & AI Automation Expert',
  points: [
    'CRM implementation, workflow automation, funnels, websites and integrations for businesses and agencies.',
    'Built and maintained 100+ GoHighLevel subaccounts and worked on 200+ A2P approvals.',
    'Supported real estate, fitness, clinics, coaching and home-service businesses.',
    'Worked with APIs, webhooks, Stripe, Twilio, LeadConnector, Zapier, Make and n8n.',
    'Built membership systems and supported AI chat, voice automation and lead follow-up.',
  ],
}

const clientProjects = [
  {
    company: 'Cozy Key Collection',
    role: 'GoHighLevel Website & CRM Implementation',
    type: 'Fiverr client project',
    points: [
      'Website cleanup and mobile optimization.',
      'Properties page and reusable Property Details page.',
      'Rooms custom-object associations with properties and members.',
      'Room-status and move-in/move-out automation planning.',
    ],
  },
  {
    company: 'More Than Heart VIP',
    role: 'Membership & Stripe Integration',
    type: 'Client project',
    points: [
      'Membership experience and payment-related setup.',
      'Stripe-connected membership flow.',
      'Customer access and digital member experience.',
    ],
  },
  {
    company: 'Dreamers & Founders',
    role: 'Member Portals & Digital Experience',
    type: 'Client project',
    points: [
      'Member portals and customer-facing page development.',
      'Custom branded interface and styling.',
      'Digital content organization and user experience.',
    ],
  },
  {
    company: 'NexGen Fitness — Trophy Club',
    role: 'Fitness CRM & Funnel Automation',
    type: 'Client project',
    points: [
      'Fitness CRM and lead-management support.',
      'Funnel and follow-up automation.',
      'Lead capture and customer journey improvements.',
    ],
  },
  {
    company: 'Biotwin',
    role: 'Program Setup & Customer Journey',
    type: '10-week lifestyle & metabolic reset',
    points: [
      'Supported setup for a structured 10-week program.',
      'Stripe-connected setup and digital customer journey.',
      'Coordination with Practice Better for clinical program delivery.',
    ],
  },
  {
    company: 'GKC — Annie AI',
    role: 'AI Automation & Third-Party Integrations',
    type: 'Client project',
    points: [
      'AI follow-up cadence and automation support.',
      'TerraLeads integration-related workflows.',
      'Operational processes involving Jobber, ClickUp, Slack and calendars.',
    ],
  },
]

function ResumeCard({ item }) {
  return (
    <article className="rs-card" lang="en">
      <h4>{item.role}</h4>

      <p className="rs-company">{item.company}</p>

      {item.type && (
        <p className="rs-type">{item.type}</p>
      )}

      <ul>
        {item.points.map(point => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    </article>
  )
}

export default function Experience({ language = 'en' }) {
  const es = language === 'es'
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const motion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    )

    const items = [
      ...section.querySelectorAll('.rs-period'),
    ]

    let observer

    function setup() {
      observer?.disconnect()

      items.forEach(item => {
        item.classList.remove('rs-repeat', 'rs-in')
        item.style.removeProperty('--rs-enter-y')
      })

      if (
        motion.matches ||
        !('IntersectionObserver' in window)
      ) {
        return
      }

      observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            const item = entry.target

            if (entry.isIntersecting) {
              item.classList.add('rs-in')
            } else {
              const above =
                entry.boundingClientRect.bottom <= 0

              item.style.setProperty(
                '--rs-enter-y',
                above ? '-35px' : '35px'
              )

              item.classList.remove('rs-in')
            }
          })
        },
        {
          threshold: 0,
          rootMargin: '0px',
        }
      )

      items.forEach(item => {
        item.classList.add('rs-repeat')
        observer.observe(item)
      })
    }

    setup()
    motion.addEventListener('change', setup)

    return () => {
      observer?.disconnect()
      motion.removeEventListener('change', setup)

      items.forEach(item => {
        item.classList.remove('rs-repeat', 'rs-in')
        item.style.removeProperty('--rs-enter-y')
      })
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="rs-section"
      aria-labelledby="rs-heading"
    >
      <div className="rs-layout">
        <header className="rs-intro">
          <p className="rs-kicker">
            {es ? 'MI TRAYECTORIA' : 'MY JOURNEY'}
          </p>

          <h2 id="rs-heading">
            {es ? 'EDUCACIÓN' : 'EDUCATION'}

            <span className="rs-amp">&</span>

            <span className="rs-highlight">
              {es ? 'EXPERIENCIA' : 'EXPERIENCE'}
            </span>
          </h2>

          <p className="rs-summary">
            {es
              ? 'Mi formación, experiencia profesional y proyectos para clientes.'
              : 'My education, professional experience and selected client projects.'}
          </p>

          <a className="rs-contact" href="#contact">
            {es
              ? 'Hablemos de tu proyecto'
              : 'Let’s discuss your project'}

            <span aria-hidden="true">↗</span>
          </a>
        </header>

        <div className="rs-content">
          <div className="rs-timeline">

            {/* 1. EDUCATION */}
            <div className="rs-period">
              <span
                className="rs-marker"
                aria-hidden="true"
              />

              <p className="rs-project-label">
                {es ? 'EDUCACIÓN' : 'EDUCATION'}
              </p>

              <p className="rs-date">2023 — 2027</p>

              <article className="rs-card" lang="en">
                <h4>BS Information Technology</h4>

                <p className="rs-company">
                  University of Education · Multan Campus
                </p>

                <p className="rs-type">
                  Expected graduation: 2027
                </p>
              </article>
            </div>

            {/* 2. COMPANY EXPERIENCE */}
            {companies.map((item, index) => (
              <div
                className="rs-period"
                key={item.company}
              >
                <span
                  className="rs-marker"
                  aria-hidden="true"
                />

                {index === 0 && (
                  <p className="rs-project-label">
                    {es
                      ? 'EXPERIENCIA PROFESIONAL'
                      : 'PROFESSIONAL EXPERIENCE'}
                  </p>
                )}

                <p className="rs-date" lang="en">
                  {item.period}
                </p>

                <ResumeCard item={item} />
              </div>
            ))}

            {/* 3. FREELANCE EXPERIENCE */}
            <div className="rs-period">
              <span
                className="rs-marker"
                aria-hidden="true"
              />

              <p className="rs-project-label">
                {es
                  ? 'TRABAJO INDEPENDIENTE'
                  : 'FREELANCE EXPERIENCE'}
              </p>

              <p className="rs-date" lang="en">
                {freelance.period}
              </p>

              <ResumeCard item={freelance} />
            </div>

            {/* 4. CLIENT PROJECTS — SAME TIMELINE */}
            {clientProjects.map(item => (
              <div
                className="rs-period"
                key={item.company}
              >
                <span
                  className="rs-marker"
                  aria-hidden="true"
                />

                <p className="rs-project-label">
                  {es
                    ? 'PROYECTO DE CLIENTE'
                    : 'CLIENT PROJECT'}
                </p>

                <ResumeCard item={item} />
              </div>
            ))}

          </div>
        </div>
      </div>
    </section>
  )
}