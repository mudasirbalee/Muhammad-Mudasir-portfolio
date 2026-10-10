import { useEffect, useRef, useState } from 'react'
import { Play, X, ArrowUpRight } from 'lucide-react'
import './Projects.css'

const categories = [
  ['all', 'All Work', 'Todos'],
  ['websites', 'Websites', 'Sitios web'],
  ['funnels', 'Funnels', 'Embudos'],
  ['automation', 'Automation & Workflows', 'Automatizaciones'],
  ['memberships', 'Memberships & Courses', 'Membresías y cursos'],
  ['forms', 'Custom Forms', 'Formularios'],
  ['dashboards', 'Custom Dashboards', 'Paneles personalizados'],
  ['a2p', 'A2P', 'A2P'],
  ['ai', 'AI Chatbots & Voice AI', 'Chatbots e IA de voz'],
  ['integrations', 'Integrations', 'Integraciones'],
]

function createImages({
  count,
  prefix,
  extension,
  categories: projectCategories,
  preview,
  en,
  es,
}) {
  return Array.from({ length: count }, (_, index) => {
    const number = String(index + 1).padStart(2, '0')

    return {
      id: `${prefix}-${number}`,
      categories: projectCategories,
      type: 'image',
      preview,
      src: `/projects/${prefix}-${number}.${extension}`,
      title: {
        en: `${en} ${number}`,
        es: `${es} ${number}`,
      },
    }
  })
}

const projects = [
  ...createImages({
    count: 11,
    prefix: 'a2p',
    extension: 'png',
    categories: ['a2p'],
    preview: 'a2p',
    en: 'A2P registration',
    es: 'Registro A2P',
  }),

  ...createImages({
    count: 5,
    prefix: 'dashboard',
    extension: 'jpg',
    categories: ['dashboards'],
    preview: 'dashboard',
    en: 'Custom dashboard',
    es: 'Panel personalizado',
  }),

  ...createImages({
    count: 7,
    prefix: 'form',
    extension: 'jpg',
    categories: ['forms'],
    preview: 'form',
    en: 'Custom form',
    es: 'Formulario personalizado',
  }),

  ...createImages({
    count: 9,
    prefix: 'website',
    extension: 'png',
    categories: ['websites', 'funnels'],
    preview: 'page',
    en: 'Web project',
    es: 'Proyecto web',
  }),

  ...createImages({
    count: 10,
    prefix: 'workflow-screen',
    extension: 'jpeg',
    categories: ['automation'],
    preview: 'workflow',
    en: 'Workflow screenshot',
    es: 'Captura de automatización',
  }),

  ...Array.from({ length: 8 }, (_, index) => {
    const number = String(index + 1).padStart(2, '0')

    return {
      id: `workflow-${number}`,
      categories: ['automation'],
      type: 'video',
      preview: 'video',
      src: `/projects/workflow-${number}.mp4`,
      thumbnail: `/projects/workflow-screen-${number}.jpeg`,
      title: {
        en: `Workflow walkthrough ${number}`,
        es: `Recorrido de automatización ${number}`,
      },
    }
  }),
]

const copy = {
  en: {
    eyebrow: 'MY PORTFOLIO',
    title: 'Explore the work.',
    accent: 'See the details.',
    description:
      'Explore websites, funnels, workflows, custom forms, dashboards and A2P registration screenshots. Open any preview for a closer look.',
    pageHint: 'Hover to scroll · Click to expand',
    imageHint: 'Click to expand the screenshot',
    videoHint: 'Play walkthrough',
    open: 'Open preview',
    close: 'Close preview',
    pause: 'Pause movement',
    resume: 'Resume movement',
    empty: 'Previews for this category will be added soon.',
    error: 'This preview could not be loaded. Please try again later.',
    thumbnailError: 'Thumbnail unavailable · Click to play',
    pageHelp: 'Scroll inside this window to explore the full page.',
    imageHelp: 'View the complete screenshot below.',
    count: 'previews',
    labels: {
      page: 'Website / Funnel',
      workflow: 'Workflow screenshot',
      video: 'Video walkthrough',
      a2p: 'A2P registration',
      dashboard: 'Custom dashboard',
      form: 'Custom form',
    },
    browserLabels: {
      page: 'WEB PREVIEW',
      workflow: 'WORKFLOW',
      video: 'WORKFLOW VIDEO',
      a2p: 'A2P',
      dashboard: 'DASHBOARD',
      form: 'CUSTOM FORM',
    },
  },

  es: {
    eyebrow: 'MI PORTAFOLIO',
    title: 'Explora mi trabajo.',
    accent: 'Descubre los detalles.',
    description:
      'Explora sitios web, embudos, automatizaciones, formularios, paneles personalizados y capturas de registros A2P. Abre una vista previa para verla de cerca.',
    pageHint: 'Pasa el cursor para desplazarte · Haz clic para ampliar',
    imageHint: 'Haz clic para ampliar la captura',
    videoHint: 'Reproducir recorrido',
    open: 'Abrir vista previa',
    close: 'Cerrar vista previa',
    pause: 'Pausar movimiento',
    resume: 'Reanudar movimiento',
    empty: 'Próximamente se añadirán ejemplos de esta categoría.',
    error: 'No se pudo cargar esta vista previa. Inténtalo más tarde.',
    thumbnailError: 'Miniatura no disponible · Haz clic para reproducir',
    pageHelp: 'Desplázate dentro de esta ventana para ver toda la página.',
    imageHelp: 'Consulta la captura completa a continuación.',
    count: 'vistas previas',
    labels: {
      page: 'Sitio web / Embudo',
      workflow: 'Captura de automatización',
      video: 'Recorrido en vídeo',
      a2p: 'Registro A2P',
      dashboard: 'Panel personalizado',
      form: 'Formulario personalizado',
    },
    browserLabels: {
      page: 'VISTA WEB',
      workflow: 'AUTOMATIZACIÓN',
      video: 'VÍDEO DEL FLUJO',
      a2p: 'A2P',
      dashboard: 'PANEL',
      form: 'FORMULARIO',
    },
  },
}

function ProjectCard({ project, locale, t, onOpen, duplicate }) {
  const [failed, setFailed] = useState(false)

  const title = project.title[locale]
  const isPage = project.preview === 'page'
  const isVideo = project.type === 'video'

  return (
    <button
      type="button"
      className={`pg-card ${
        isPage ? 'pg-page-card' : 'pg-workflow-card'
      }${isVideo ? ' pg-video-card' : ''}`}
      tabIndex={duplicate ? -1 : 0}
      aria-hidden={duplicate ? true : undefined}
      onClick={() => onOpen(project)}
      aria-label={`${t.open}: ${title}`}
    >
      <span className="pg-browser" aria-hidden="true">
        <span className="pg-dots">
          <i />
          <i />
          <i />
        </span>

        <span>{t.browserLabels[project.preview]}</span>

        <ArrowUpRight size={15} />
      </span>

      <span className="pg-preview">
        {failed ? (
          <span className="pg-file-error">
            {isVideo ? t.thumbnailError : t.error}
          </span>
        ) : (
          <img
            className={isVideo ? 'pg-video-thumbnail' : undefined}
            src={isVideo ? project.thumbnail : project.src}
            alt=""
            loading="lazy"
            decoding="async"
            draggable={false}
            onError={() => setFailed(true)}
          />
        )}

        {isVideo && (
          <span className="pg-play" aria-hidden="true">
            <Play size={24} fill="currentColor" />
          </span>
        )}

        <span className="pg-preview-hint">
          {isVideo ? t.videoHint : isPage ? t.pageHint : t.imageHint}
        </span>
      </span>

      <span className="pg-card-footer">
        <span>
          <small>{t.labels[project.preview]}</small>
          <strong>{title}</strong>
        </span>

        <ArrowUpRight size={20} aria-hidden="true" />
      </span>
    </button>
  )
}

function MovingRow({ items, reverse = false, locale, t, onOpen }) {
  if (!items.length) return null

  const loop = Array.from(
    { length: Math.max(5, items.length) },
    (_, index) => items[index % items.length]
  )

  return (
    <div className={`pg-row${reverse ? ' pg-row-reverse' : ''}`}>
      <div
        className="pg-track"
        style={{ '--pg-duration': `${loop.length * 10}s` }}
      >
        {[0, 1].map(group => (
          <div
            className="pg-group"
            key={group}
            aria-hidden={group === 1 ? true : undefined}
          >
            {loop.map((project, index) => {
              const duplicate = group === 1 || index >= items.length

              return (
                <div
                  className={`pg-slot${duplicate ? ' pg-duplicate' : ''}`}
                  key={`${project.id}-${index}`}
                >
                  <ProjectCard
                    project={project}
                    locale={locale}
                    t={t}
                    onOpen={onOpen}
                    duplicate={duplicate}
                  />
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

function ProjectModal({ project, locale, t, onClose }) {
  const dialogRef = useRef(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const dialog = dialogRef.current
    const previousFocus = document.activeElement
    const previousOverflow = document.body.style.overflow

    dialog.showModal()
    document.body.style.overflow = 'hidden'

    return () => {
      dialog.querySelector('video')?.pause()
      dialog.close()
      document.body.style.overflow = previousOverflow

      if (previousFocus?.isConnected) {
        previousFocus.focus?.({ preventScroll: true })
      }
    }
  }, [])

  function handleBackdropClick(event) {
    if (event.target !== event.currentTarget) return

    const rect = event.currentTarget.getBoundingClientRect()

    const outside =
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom

    if (outside) onClose()
  }

  return (
    <dialog
      ref={dialogRef}
      className="pg-modal"
      aria-labelledby="pg-modal-title"
      onCancel={event => {
        event.preventDefault()
        onClose()
      }}
      onClick={handleBackdropClick}
    >
      <div className="pg-modal-header">
        <div>
          <h3 id="pg-modal-title">{project.title[locale]}</h3>

          {project.type === 'image' && (
            <p>
              {project.preview === 'page' ? t.pageHelp : t.imageHelp}
            </p>
          )}
        </div>

        <div className="pg-modal-actions">
          <button
            type="button"
            onClick={onClose}
            aria-label={t.close}
            autoFocus
          >
            <X size={22} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="pg-modal-body">
        {failed ? (
          <p className="pg-file-error">{t.error}</p>
        ) : project.type === 'video' ? (
          <video
            src={project.src}
            poster={project.thumbnail}
            aria-label={project.title[locale]}
            controls
            controlsList="nodownload"
            autoPlay
            playsInline
            preload="metadata"
            onError={() => setFailed(true)}
          />
        ) : (
          <img
            src={project.src}
            alt={project.title[locale]}
            draggable={false}
            onError={() => setFailed(true)}
          />
        )}
      </div>
    </dialog>
  )
}

export default function Projects({ language = 'en' }) {
  const [active, setActive] = useState('all')
  const [paused, setPaused] = useState(false)
  const [selected, setSelected] = useState(null)

  const locale = language === 'es' ? 'es' : 'en'
  const t = copy[locale]

  const filtered =
    active === 'all'
      ? projects
      : projects.filter(project => project.categories.includes(active))

  const firstRow = filtered.filter((_, index) => index % 2 === 0)
  const secondRow = filtered.filter((_, index) => index % 2 !== 0)

  return (
    <section
      id="projects"
      className={`pg-section${paused || selected ? ' pg-paused' : ''}`}
      aria-labelledby="pg-title"
    >
      <div className="pg-heading">
        <p className="eyebrow">
          <span className="eyebrow-line" aria-hidden="true" />
          {t.eyebrow}
        </p>

        <h2 id="pg-title">
          {t.title}
          <span className="gradient-text">{t.accent}</span>
        </h2>

        <p className="pg-description">{t.description}</p>
      </div>

      <div className="pg-filters" aria-label={t.eyebrow}>
        {categories.map(([id, en, es]) => (
          <button
            key={id}
            type="button"
            aria-pressed={active === id}
            onClick={() => setActive(id)}
          >
            {locale === 'es' ? es : en}
          </button>
        ))}
      </div>

      <div className="pg-toolbar">
        <span aria-live="polite" aria-atomic="true">
          {String(filtered.length).padStart(2, '0')} {t.count}
        </span>

        {filtered.length > 0 && (
          <button
            type="button"
            aria-pressed={paused}
            onClick={() => setPaused(value => !value)}
          >
            {paused ? t.resume : t.pause}
          </button>
        )}
      </div>

      {filtered.length > 0 ? (
        <div className="pg-gallery" key={active}>
          <MovingRow
            items={firstRow}
            locale={locale}
            t={t}
            onOpen={setSelected}
          />

          <MovingRow
            items={secondRow}
            reverse
            locale={locale}
            t={t}
            onOpen={setSelected}
          />
        </div>
      ) : (
        <div className="pg-empty">{t.empty}</div>
      )}

      {selected && (
        <ProjectModal
          key={selected.id}
          project={selected}
          locale={locale}
          t={t}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  )
}