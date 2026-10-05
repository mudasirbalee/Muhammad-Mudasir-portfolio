import { useEffect, useRef, useState } from 'react'

export function CountUp({ value }) {
  const elementRef = useRef(null)
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    const element = elementRef.current
    const match = String(value).match(/^(\d+)(.*)$/)

    if (!element || !match) return

    const target = Number(match[1])
    const suffix = match[2]
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    )

    if (reduced.matches || !('IntersectionObserver' in window)) return

    let frame
    let started = false

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return

        started = true
        observer.disconnect()

        const start = performance.now()

        function update(now) {
          const progress = Math.min((now - start) / 1600, 1)
          const eased = 1 - Math.pow(1 - progress, 3)

          setDisplay(`${Math.round(target * eased)}${suffix}`)

          if (progress < 1) {
            frame = requestAnimationFrame(update)
          }
        }

        frame = requestAnimationFrame(update)
      },
      { threshold: 0.4 }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [value])

  return (
    <span ref={elementRef} aria-label={String(value)}>
      <span aria-hidden="true">{display}</span>
    </span>
  )
}

const specialties = {
  en: [
    'GoHighLevel Specialist',
    'Funnel Expert',
    'Automation Specialist',
    'AI Chatbot Specialist',
  ],
  es: [
    'Especialista en GoHighLevel',
    'Experto en embudos de venta',
    'Especialista en automatización',
    'Especialista en chatbots con IA',
  ],
}

export function HeroSpecialties({ language = 'en' }) {
  const locale = language === 'es' ? 'es' : 'en'
  const words = specialties[locale]
  const [text, setText] = useState(words[0])

  useEffect(() => {
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    )

    let timer
    let stopped = false
    let wordIndex = 0
    let character = words[0].length
    let deleting = true

    function tick() {
      if (stopped) return

      const word = words[wordIndex]
      character += deleting ? -1 : 1
      setText(word.slice(0, character))

      let delay = deleting ? 35 : 75

      if (!deleting && character === word.length) {
        deleting = true
        delay = 1900
      } else if (deleting && character === 0) {
        deleting = false
        wordIndex = (wordIndex + 1) % words.length
        delay = 250
      }

      timer = setTimeout(tick, delay)
    }

    function start() {
      clearTimeout(timer)
      wordIndex = 0
      character = words[0].length
      deleting = true
      setText(words[0])

      if (!reduced.matches) {
        timer = setTimeout(tick, 1900)
      }
    }

    start()
    reduced.addEventListener('change', start)

    return () => {
      stopped = true
      clearTimeout(timer)
      reduced.removeEventListener('change', start)
    }
  }, [words])

  return (
    <div className="hero-specialties">
      <span className="motion-sr-only">{words.join(', ')}</span>

      <span className="hero-typing-line" aria-hidden="true">
        {text}
        <span className="hero-typing-cursor" />
      </span>
    </div>
  )
}

export function useScrollReveal(language) {
  useEffect(() => {
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    )

    if (reduced.matches || !('IntersectionObserver' in window)) return

    // Gallery cards keep their existing horizontal movement.
    const elements = document.querySelectorAll(`
      .hero-copy > *,
      .hero-art,
      .expertise-item,
      .portrait-column,
      .about-copy > *,
      .stat-card,
      .services-heading > *,
      .service-card,
      .services-action,
      .pg-heading > *,
      .pg-filters,
      .pg-toolbar,
      .pg-gallery,
.process-intro > *,
.process-step,
.faq-intro > *,
.faq-item,
.skills-section > *,
.skills-group,
.sample-review-card,
.reviews-section > *,
.contact-copy > *,
.contact-availability,
.portfolio-footer
    `)

    const animations = new Set()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return

          observer.unobserve(entry.target)

          const animation = entry.target.animate(
            [
              { opacity: 0, translate: '0 24px' },
              { opacity: 1, translate: '0 0' },
            ],
            {
              duration: 650,
              easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
              fill: 'none',
            }
          )

          animations.add(animation)
          animation.onfinish = () => animations.delete(animation)
        })
      },
      { threshold: 0.08 }
    )

    elements.forEach((element) => observer.observe(element))

    return () => {
      observer.disconnect()
      animations.forEach((animation) => animation.cancel())
    }
  }, [language])
}