import { useEffect, useRef, useState } from 'react'
import './Reviews.css'

const reviews = [
  {
    title: 'GoHighLevel CRM & Automation',
    role: 'Agency Owner',
    text: 'Muhammad did an excellent job setting up our GoHighLevel CRM and automation workflows. He understood our requirements quickly and organized everything in a way that made managing leads and following up with prospects much easier.',
  },
  {
    title: 'Funnels & Landing Pages',
    role: 'Business Consultant',
    text: 'Great experience working with Muhammad on our funnel build. He paid attention to the layout, mobile responsiveness, and user journey. Communication was clear, and he made sure the important details were handled properly.',
  },
  {
    title: 'Workflow Automation',
    role: 'Marketing Agency Owner',
    text: 'Muhammad helped us structure our workflows, triggers, tags, and follow-up sequences. He took the time to understand the process before building, which made the final setup more practical and easier to manage.',
  },
  {
    title: 'Real Estate CRM Setup',
    role: 'Real Estate Professional',
    text: 'Muhammad helped organize our lead pipeline and follow-up process inside GoHighLevel. Having a clearer view of where each lead stands has made our day-to-day lead management more organized.',
  },
  {
    title: 'Calendar & Appointment Automation',
    role: 'Service Business Owner',
    text: 'Muhammad helped us configure our booking process and appointment reminders in GoHighLevel. He was detail-oriented and focused on making the customer booking experience straightforward.',
  },
  {
    title: 'SaaS & Snapshot Configuration',
    role: 'SaaS Agency Founder',
    text: 'Muhammad has a solid understanding of GoHighLevel account configuration and reusable systems. His structured approach to snapshots and account setup helped us create a more consistent foundation for our client onboarding process.',
  },
  {
    title: 'CRM Cleanup & Troubleshooting',
    role: 'Operations Manager',
    text: 'Muhammad approached our CRM issues methodically and helped us improve the overall organization of our account. I appreciated his attention to detail and his willingness to explain the changes rather than simply making them.',
  },
  {
    title: 'AI & Lead Follow-Up Systems',
    role: 'Digital Marketing Consultant',
    text: 'Muhammad helped us think through how AI-assisted conversations and automated follow-ups could fit into our lead management process. He focused on the actual business requirements and practical implementation.',
  },
  {
    title: 'Membership & Payment Integration',
    role: 'Online Coach',
    text: 'Muhammad helped us organize our membership experience and payment-related setup. He paid attention to the customer journey and the small details that make a digital offer easier to navigate.',
  },
  {
    title: 'Long-Term GHL Technical Support',
    role: 'Agency Director',
    text: 'Muhammad brings a practical, solution-focused approach to GoHighLevel projects. He communicates clearly, asks relevant questions, and understands that a good CRM build should support the business beyond the initial setup.',
  },
]

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
      const top = parseFloat(getComputedStyle(sticky).top) || 0

      // Use normal horizontal scrolling if the screen is too short.
      enabled =
        desktop.matches &&
        sticky.offsetHeight + top + 20 < window.innerHeight

      section.classList.toggle('rv-scroll-active', enabled)

      if (enabled) {
        viewport.scrollLeft = 0
        distance = Math.max(0, track.scrollWidth - viewport.clientWidth)
        section.style.height = `${sticky.offsetHeight + distance}px`
      } else {
        section.style.removeProperty('height')
        track.style.removeProperty('transform')
      }

      schedule()
    }

    const observer = new ResizeObserver(measure)
    observer.observe(sticky)
    observer.observe(viewport)

    desktop.addEventListener('change', measure)
    window.addEventListener('resize', measure)
    window.addEventListener('scroll', schedule, { passive: true })
    measure()

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      desktop.removeEventListener('change', measure)
      window.removeEventListener('resize', measure)
      window.removeEventListener('scroll', schedule)
      section.style.removeProperty('height')
      section.classList.remove('rv-scroll-active')
      track.style.removeProperty('transform')
    }
  }, [])

  return (
    <section id="reviews" className="rv-section" ref={sectionRef}>
      <div className="rv-inner" ref={stickyRef}>
        <header className="rv-heading">
          <p className="rv-eyebrow">
            {es ? 'RESEÑAS' : 'REVIEWS'}
          </p>

          <h2>
            {es ? 'El trabajo importa.' : 'The work matters.'}
            <span>
              {es
                ? 'La experiencia también.'
                : 'So does the experience.'}
            </span>
          </h2>

          <p className="rv-note">
            {es
              ? '10 reseñas de ejemplo en inglés. No son testimonios verificados.'
              : '10 sample reviews for layout preview. These are not verified client testimonials.'}
          </p>
        </header>

        <div className="rv-mobile-controls">
          <span>{es ? 'Mantén pulsado para pausar' : 'Hold a card to pause'}</span>
          <button
            type="button"
            onClick={() => setPaused(value => !value)}
            aria-pressed={paused}
          >
            {paused
              ? es ? 'Reanudar' : 'Resume'
              : es ? 'Pausar' : 'Pause'}
          </button>
        </div>

        <div
          ref={windowRef}
          className={`rv-window${paused || holding ? ' rv-paused' : ''}`}
          tabIndex={0}
          role="region"
          aria-label={es ? 'Reseñas de ejemplo' : 'Sample reviews'}
          onPointerDown={event => {
            if (event.pointerType !== 'mouse') {
              event.currentTarget.setPointerCapture(event.pointerId)
              setHolding(true)
            }
          }}
          onPointerUp={() => setHolding(false)}
          onPointerCancel={() => setHolding(false)}
          onLostPointerCapture={() => setHolding(false)}
        >
          <div className="rv-track" ref={trackRef}>
            {[0, 1].map(group => (
              <div
                className="rv-group"
                key={group}
                aria-hidden={group === 1 ? true : undefined}
              >
                {reviews.map((review, index) => (
                  <article className="rv-card" key={review.title} lang="en">
                    <div className="rv-card-top">
                      <span className="rv-stars" aria-label="5 out of 5 stars, sample">
                        ★★★★★
                      </span>
                      <span className="rv-sample">SAMPLE</span>
                    </div>

                    <h3>{review.title}</h3>
                    <blockquote>“{review.text}”</blockquote>

                    <footer className="rv-person">
                      <span className="rv-avatar" aria-hidden="true">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span>
                        <strong>{review.role}</strong>
                        <small>Sample reviewer</small>
                      </span>
                    </footer>
                  </article>
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