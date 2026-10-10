import { useRef } from 'react'
import {
  Workflow,
  Layers3,
  Bot,
  CalendarDays,
  Cable,
  MessageSquare,
} from 'lucide-react'
import './HeroVisual.css'

export default function HeroVisual({ language = 'en' }) {
  const es = language === 'es'
  const sceneRef = useRef(null)

  const items = [
    { icon: Workflow, label: es ? 'Automatización' : 'Automation' },
    { icon: Layers3, label: es ? 'Sitios y embudos' : 'Websites & funnels' },
    { icon: Bot, label: es ? 'Asistentes de IA' : 'AI assistants' },
    { icon: CalendarDays, label: es ? 'Reservas' : 'Booking' },
    { icon: Cable, label: es ? 'Integraciones' : 'Integrations' },
    { icon: MessageSquare, label: es ? 'Seguimiento' : 'Follow-up' },
  ]

  function move(event) {
    if (
      event.pointerType !== 'mouse' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) return

    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5

    sceneRef.current?.style.setProperty('--rx', `${-y * 14}deg`)
    sceneRef.current?.style.setProperty('--ry', `${x * 18}deg`)
  }

  function reset() {
    sceneRef.current?.style.setProperty('--rx', '0deg')
    sceneRef.current?.style.setProperty('--ry', '0deg')
  }

  return (
    <div
      className="orb-visual"
      onPointerMove={move}
      onPointerLeave={reset}
      onPointerCancel={reset}
      role="img"
      aria-label={
        es
          ? 'GoHighLevel conectado con automatización, sitios, IA, reservas, integraciones y seguimiento.'
          : 'GoHighLevel connected with automation, websites, AI, booking, integrations and follow-up.'
      }
    >
      <div className="orb-scene" ref={sceneRef} aria-hidden="true">
        <div className="orb-aura" />
        <div className="orb-floor" />

        <div className="orb-ring orb-ring-one">
          <span />
        </div>
        <div className="orb-ring orb-ring-two">
          <span />
        </div>
        <div className="orb-ring orb-ring-three">
          <span />
        </div>

        <div className="orb-core">
          <div className="orb-core-lines" />
          <div className="orb-core-content">
            <Workflow size={36} strokeWidth={1.2} />
            <strong>GHL</strong>
            <span>{es ? 'TODO CONECTADO' : 'ALL CONNECTED'}</span>
          </div>
        </div>

        {items.map(({ icon: Icon, label }, index) => (
          <div className={`orb-node orb-node-${index + 1}`} key={label}>
            <div
              className="orb-node-inner"
              style={{ '--delay': `${index * -0.8}s` }}
            >
              <span className="orb-node-icon">
                <Icon size={20} strokeWidth={1.5} />
              </span>
              <span>{label}</span>
            </div>
          </div>
        ))}

        <div className="orb-caption">
          <span />
          {es ? 'Un sistema. Cada paso conectado.' : 'One system. Every step connected.'}
        </div>
      </div>
    </div>
  )
}