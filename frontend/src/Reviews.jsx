import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { profile } from './content'
import './Reviews.css'

const fiverrUrl = 'https://www.fiverr.com/s/9ddXpyE'

const reviews = [
  {
    platform: 'Fiverr',
    title: 'GoHighLevel Setup',
    rating: 5,
    text: 'Muhammad did a great job with my GoHighLevel setup. He was professional, communicated well, and delivered the landing page, form, and automation workflow as agreed. Highly recommended for anyone looking for a reliable GHL specialist!',
  },
  {
    platform: 'Fiverr',
    title: 'GHL Workflow Cleanup',
    rating: 5,
    text: 'Really happy with the work. Muhammad understood what we needed, cleaned up the GHL workflows, and made sure everything was working properly. Communication was easy and he kept me updated throughout the project. Would definitely work with him again.',
  },
  {
    platform: 'Fiverr',
    title: 'CRM & Automation Setup',
    rating: 5,
    text: 'Excellent GHL expert! Very professional, responsive, and delivered exactly what I needed. The automation and CRM setup were clean and well-structured. Highly recommended!',
  },
  {
    platform: 'Fiverr',
    title: 'GoHighLevel Support',
    rating: 5,
    text: 'Muhammad did an amazing job! He exceeded our expectations, we will definitely use his as our GHL expert for future projects.',
  },
  {
    platform: 'Fiverr',
    title: 'GHL Systems & Automation',
    rating: 5,
    text: 'Excellent experience working together. Delivered a clean, well-structured GHL system with smooth automation and clear communication throughout. Highly recommended.',
  },
  {
    platform: 'Fiverr',
    title: 'GoHighLevel Website',
    rating: 5,
    text: 'Muhammad Mudasir created a lovely small website for us on GoHighLevel. His work was very professional, creative, and timely. He paid great attention to detail and exceeded our expectations. Everything was completed smoothly and efficiently. We would definitely recommend Muhammad Mudasir!',
  },
  {
    platform: 'Fiverr',
    title: 'CRM, Funnels & Automation',
    rating: 5,
    text: 'Delivered top-tier CRM setup, funnels, and automation using GoHighLevel. The workflow was seamless, highly effective, and aligned perfectly with my business goals. Great expertise and support throughout!',
  },
  {
    platform: 'Fiverr',
    title: 'Client Feedback',
    rating: 5,
    text: 'love your work a very good and honest person',
  },
  {
    platform: 'Fiverr',
    title: 'Landing Page & Lead Capture',
    rating: 5,
    text: 'Muhammad did a great job creating my landing page and setting up the lead capture form and automated email in GoHighLevel. Communication was smooth, and the delivery matched my requirements. Highly recommend his GHL services!',
  },
  {
    platform: 'Upwork',
    title: 'CRM Workflows, Funnels & Zapier Automation',
    rating: 5,
    text: 'Great experience working with this seller! They set up my GoHighLevel workflows, funnels, and Zapier automation exactly as I needed. Everything was done on time and works perfectly.',
    excerpt: true,
  },
  {
    platform: 'Upwork',
    title: 'Duda Connection Integration',
    rating: 5,
    text: 'It was a great experience working with Muhammad on our GHL project. We will definitely make use of his services again',
  },
  {
    platform: 'Upwork',
    title: 'GoHighLevel CRM Automation',
    rating: 5,
    text: 'Muhammad is a highly skilled GoHighLevel expert who handled our landing page, CRM setup, workflows, and chatbot automation efficiently.',
    excerpt: true,
  },
  {
    platform: 'Upwork',
    title: 'Customer Sales Funnels',
    rating: 4,
    text: 'Executes work and is professional. Thanks!',
  },
  {
    platform: 'Upwork',
    title: 'Funnel & Appointment Booking',
    rating: 5,
    text: "I had a great experience with Muhammad. He's very communicative and good at GHL stuff.",
  },
  {
    platform: 'Upwork',
    title: 'Automation',
    rating: 5,
    text: 'Muhammed Mudasir is very hard working. He will get whatever you need done so fast and it will be done 100% correctly. He is worth every penny.',
    excerpt: true,
  },
  {
    platform: 'Upwork',
    title: 'Landing Page Creation',
    rating: 5,
    text: 'Very good work.',
  },
  {
    platform: 'Upwork',
    title: 'Custom GoHighLevel Dashboard',
    rating: 5,
    text: 'Good job',
  },
  {
    platform: 'Upwork',
    title: 'A2P Verification',
    rating: 5,
    text: '',
  },
  {
    platform: 'Upwork',
    title: 'GoHighLevel Home Page Design & Setup',
    rating: 5,
    text: '',
  },
]

function ReviewCard({ review, es, duplicate }) {
  const url = review.platform === 'Fiverr'
    ? fiverrUrl
    : profile.upwork

  return (
    <article className="rv-card">
      <div className="rv-card-top">
        <span
          className="rv-stars"
          role="img"
          aria-label={`${review.rating} ${es ? 'de 5 estrellas' : 'out of 5 stars'}`}
        >
          <span aria-hidden="true">
            {'★'.repeat(review.rating)}
            <span className="rv-star-empty">
              {'★'.repeat(5 - review.rating)}
            </span>
          </span>
        </span>

        <span className="rv-platform">
          {review.platform}
        </span>
      </div>

      <p className="rv-card-label">
        {es ? 'LO QUE DICEN LOS CLIENTES' : 'WHAT CLIENTS SAY'}
      </p>

      <h3 lang="en">{review.title}</h3>

      {review.text ? (
        <blockquote lang="en">
          “{review.text}”
          {review.excerpt && (
            <small className="rv-excerpt">
              {es ? 'Extracto de la reseña' : 'Review excerpt'}
            </small>
          )}
        </blockquote>
      ) : (
        <p className="rv-rating-only">
  {es
    ? 'El cliente dejó una valoración sin comentario escrito.'
    : 'The client left a star rating without written feedback.'}
</p>
      )}

      <footer className="rv-person">
        <span className="rv-avatar" aria-hidden="true">
          {review.platform === 'Fiverr' ? 'fi' : 'up'}
        </span>

        <span className="rv-person-copy">
          <strong>
            {review.platform} {es ? 'cliente' : 'client'}
          </strong>
        
        </span>

        <a
          className="rv-source"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={duplicate ? -1 : undefined}
          aria-label={`${es ? 'Ver perfil en' : 'View profile on'} ${review.platform}`}
        >
          <ArrowUpRight size={18} aria-hidden="true" />
        </a>
      </footer>
    </article>
  )
}

export default function Reviews({ language = 'en' }) {
  const sectionRef = useRef(null)
  const stickyRef = useRef(null)
  const windowRef = useRef(null)
  const trackRef = useRef(null)
  const [paused, setPaused] = useState(false)
  const [holding, setHolding] = useState(false)
  const es = language === 'es'

  useEffect(() => {
    const section = sectionRef.current
    const sticky = stickyRef.current
    const viewport = windowRef.current
    const track = trackRef.current

    if (!section || !sticky || !viewport || !track) return

    const desktop = window.matchMedia(
      '(min-width: 1100px) and (prefers-reduced-motion: no-preference)'
    )

    let frame = 0
    let distance = 0
    let enabled = false

    const update = () => {
      frame = 0
      if (!enabled) return

      const top = parseFloat(getComputedStyle(sticky).top) || 0
      const travelled = Math.max(
        0,
        Math.min(distance, top - section.getBoundingClientRect().top)
      )

      track.style.transform = `translate3d(${-travelled}px, 0, 0)`
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    const measure = () => {
  enabled = desktop.matches

  section.classList.toggle('rv-scroll-active', enabled)

  if (enabled) {
    // Tall sections can settle higher so the cards remain visible.
    const stickyTop = Math.min(
      90,
      window.innerHeight - sticky.offsetHeight - 16
    )

    sticky.style.top = `${stickyTop}px`
    viewport.scrollLeft = 0

    distance = Math.max(
      0,
      track.scrollWidth - viewport.clientWidth
    )

    section.style.height = `${sticky.offsetHeight + distance}px`
  } else {
    sticky.style.removeProperty('top')
    section.style.removeProperty('height')
    track.style.removeProperty('transform')
  }

  schedule()
}

    const observer = new ResizeObserver(measure)
    observer.observe(sticky)
    observer.observe(viewport)
    observer.observe(track)

    desktop.addEventListener('change', measure)
    window.addEventListener('resize', measure)
    window.addEventListener('scroll', schedule, { passive: true })
    measure()

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      sticky.style.removeProperty('top')
      desktop.removeEventListener('change', measure)
      window.removeEventListener('resize', measure)
      window.removeEventListener('scroll', schedule)
      section.style.removeProperty('height')
      section.classList.remove('rv-scroll-active')
      track.style.removeProperty('transform')
    }
  }, [])

  return (
    <section
      id="reviews"
      className="rv-section"
      ref={sectionRef}
      aria-labelledby="reviews-title"
    >
      <div className="rv-inner" ref={stickyRef}>
        <header className="rv-heading">
          <p className="rv-eyebrow">
            {es ? 'RESEÑAS DE CLIENTES' : 'CLIENT REVIEWS'}
          </p>

          <h2 id="reviews-title">
            {es ? 'No te quedes solo' : "Don't Just Take"}
            <span>
              {es ? 'con mi palabra.' : 'My Word for It.'}
            </span>
          </h2>

          <p className="rv-note">
            {es
              ? 'Opiniones de clientes con quienes he trabajado para mejorar sus sistemas CRM, optimizar flujos de trabajo y simplificar sus operaciones.'
              : "Real feedback from clients I've worked with to build better CRM systems, streamline workflows, and simplify business operations."}
          </p>
        </header>

        <div className="rv-trust-row">
          <div className="rv-trust">
            <a
              href={profile.upwork}
              target="_blank"
              rel="noopener noreferrer"
            >
              Top Rated on Upwork
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>

            <a
              href={fiverrUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Level 1 Seller on Fiverr
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>

            <span>
              {es ? 'Enfoque en el cliente' : 'Client-Focused Delivery'}
            </span>
          </div>

          <a className="rv-work-link" href="#projects">
            {es ? 'Ver mis proyectos' : 'View My Work'}
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>

        <div className="rv-playback">
          <span>
            {es ? 'Opiniones de Fiverr y Upwork' : 'Feedback from Fiverr & Upwork'}
          </span>

          <button
            type="button"
            onClick={() => setPaused(value => !value)}
            aria-pressed={paused}
            aria-label={
              paused
                ? es ? 'Reanudar movimiento' : 'Resume review movement'
                : es ? 'Pausar movimiento' : 'Pause review movement'
            }
          >
            <span aria-hidden="true">{paused ? '▶' : 'Ⅱ'}</span>
          </button>
        </div>

        <div
          ref={windowRef}
          className={`rv-window${paused || holding ? ' rv-paused' : ''}`}
          tabIndex={0}
          role="region"
          aria-label={es ? 'Reseñas de clientes' : 'Client reviews'}
          onPointerDown={event => {
            if (event.pointerType !== 'mouse') setHolding(true)
          }}
          onPointerUp={() => setHolding(false)}
          onPointerCancel={() => setHolding(false)}
          onPointerLeave={() => setHolding(false)}
        >
          <div className="rv-track" ref={trackRef}>
            {[0, 1].map(group => (
              <div
                className="rv-group"
                key={group}
                aria-hidden={group === 1 ? true : undefined}
              >
                {reviews.map((review, index) => (
                  <ReviewCard
                    key={`${review.platform}-${index}`}
                    review={review}
                    es={es}
                    duplicate={group === 1}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        <p className="rv-hint">
          {es
            ? 'Desplázate para explorar las reseñas.'
            : 'Scroll to explore the reviews.'}
        </p>
      </div>
    </section>
  )
}