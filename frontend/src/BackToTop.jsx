import { useEffect, useState } from 'react'
import './BackToTop.css'

export default function BackToTop({ language = 'en' }) {
  const [scroll, setScroll] = useState({
    visible: false,
    progress: 0,
  })

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0

      const top = window.scrollY
      const height =
        document.documentElement.scrollHeight - window.innerHeight

      setScroll({
        visible: top > 250,
        progress: height > 0
          ? Math.min(1, Math.max(0, top / height))
          : 0,
      })
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)

    const observer = new ResizeObserver(schedule)
    observer.observe(document.body)

    update()

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [])

  function goToTop() {
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    window.scrollTo({
      top: 0,
      behavior: reducedMotion ? 'instant' : 'smooth',
    })
  }

  const label = language === 'es' ? 'Volver arriba' : 'Back to top'

  return (
    <button
      type="button"
      className={`btt-button${scroll.visible ? ' btt-visible' : ''}`}
      onClick={goToTop}
      aria-label={label}
      aria-hidden={!scroll.visible}
      tabIndex={scroll.visible ? 0 : -1}
    >
      <span className="btt-tooltip" aria-hidden="true">
        {label}
      </span>

      <svg
        className="btt-ring"
        viewBox="0 0 60 60"
        aria-hidden="true"
      >
        <circle className="btt-ring-track" cx="30" cy="30" r="27" />
        <circle
          className="btt-ring-progress"
          cx="30"
          cy="30"
          r="27"
          pathLength="100"
          strokeDasharray="100"
          strokeDashoffset={100 - scroll.progress * 100}
        />
      </svg>

      <span className="btt-center" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none">
          <path
            d="M6 11L12 5L18 11M12 5V19"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </button>
  )
}