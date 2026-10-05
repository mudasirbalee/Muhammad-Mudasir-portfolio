import { useEffect, useRef, useState } from 'react'
import { Play, X, ArrowUpRight, Workflow } from 'lucide-react'
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

// Filenames match your projects folder.
// Change a project's category here when its category is confirmed.
const imageExtensions = [
  'jpg', 'jpg', 'png', 'jpg', 'jpg', 'jpg',
  'jpg', 'png', 'jpg', 'jpg', 'jpg', 'png',
]

const projects = [
  ...imageExtensions.map((extension, index) => {
    const number = String(index + 1).padStart(2, '0')

    return {
      id: `project-${number}`,
      category: 'websites',
      type: 'image',
      src: `/projects/project-${number}.${extension}`,
      title: {
        en: `Website preview ${number}`,
        es: `Vista del sitio web ${number}`,
      },
    }
  }),
  ...Array.from({ length: 10 }, (_, index) => {
    const number = String(index + 1).padStart(2, '0')

    return {
      id: `workflow-${number}`,
      category: 'automation',
      type: 'video',
      src: `/projects/workflow-${number}.mp4`,
      title: {
        en: `Workflow walkthrough ${number}`,
        es: `Recorrido de automatización ${number}`,
      },
    }
  }),
]

const content = {
  en: {
    eyebrow: 'MY PORTFOLIO',
    title: 'Explore the work.',
    accent: 'See the details.',
    description:
      'Browse website previews and workflow walkthroughs. Open any project for a closer look.',
    hover: 'Hover to scroll · Click to expand',
    video: 'Watch walkthrough',
    open: 'Open preview',
    close: 'Close preview',
    pause: 'Pause movement',
    resume: 'Resume movement',
    empty: 'Project previews for this category will be added soon.',
    error: 'This file could not be loaded. Please check its filename.',
    imageHelp: 'Scroll inside this window to view the full page.',
    count: 'projects',
  },
  es: {
    eyebrow: 'MI PORTAFOLIO',
    title: 'Explora mi trabajo.',
    accent: 'Descubre los detalles.',
    description:
      'Explora sitios web y recorridos de automatización. Abre cualquier proyecto para verlo de cerca.',
    hover: 'Pasa el cursor para desplazarte · Haz clic para ampliar',
    video: 'Ver recorrido',
    open: 'Abrir vista previa',
    close: 'Cerrar vista previa',
    pause: 'Pausar movimiento',
    resume: 'Reanudar movimiento',
    empty: 'Próximamente se añadirán proyectos de esta categoría.',
    error: 'No se pudo cargar el archivo. Comprueba su nombre.',
    imageHelp: 'Desplázate dentro de esta ventana para ver toda la página.',
    count: 'proyectos',
  },
}

function ProjectCard({ project, locale, t, onOpen, duplicate }) {
  const [failed, setFailed] = useState(false)
  const title = project.title[locale]

  return (
    <button
      type="button"
      className="pg-card"
      tabIndex={duplicate ? -1 : 0}
      onClick={() => onOpen(project)}
      aria-label={`${t.open}: ${title}`}
    >
      <span className="pg-browser" aria-hidden="true">
        <span className="pg-dots"><i /><i /><i /></span>
        <span>{project.type === 'video' ? 'WORKFLOW' : 'WEB PREVIEW'}</span>
        <ArrowUpRight size={15} />
      </span>

      <span className="pg-preview">
        {project.type === 'image' ? (
          failed ? (
            <span className="pg-file-error">{t.error}</span>
          ) : (
            <img
              src={project.src}
              alt=""
              loading="lazy"
              decoding="async"
              onError={() => setFailed(true)}
            />
          )
        ) : (
          <span className="pg-video-art" aria-hidden="true">
            <Workflow className="pg-workflow-icon" size={45} />
            <span className="pg-flow-line" />
            <span className="pg-flow-branches">
              <i /><i /><i />
            </span>
            <span className="pg-play"><Play size={23} fill="currentColor" /></span>
          </span>
        )}

        <span className="pg-preview-hint">
          {project.type === 'video' ? t.video : t.hover}
        </span>
      </span>

      <span className="pg-card-footer">
        <span>
          <small>
            {categories.find(([id]) => id === project.category)?.[
              locale === 'es' ? 2 : 1
            ]}
          </small>
          <strong>{title}</strong>
        </span>
        <ArrowUpRight size={21} aria-hidden="true" />
      </span>
    </button>
  )
}

function MovingRow({ items, reverse, locale, t, onOpen }) {
  if (!items.length) return null

  // Enough cards in each loop to cover the gallery width.
  const loop = Array.from(
    { length: Math.max(4, items.length) },
    (_, index) => items[index % items.length]
  )

  return (
    <div className={`pg-row${reverse ? ' pg-row-reverse' : ''}`}>
      <div
        className="pg-track"
        style={{ '--pg-duration': `${loop.length * 9}s` }}
      >
        {[0, 1].map((copy) => (
          <div
            className="pg-group"
            key={copy}
            aria-hidden={copy === 1 ? true : undefined}
          >
            {loop.map((project, index) => (
              <ProjectCard
                key={`${project.id}-${index}`}
                project={project}
                locale={locale}
                t={t}
                onOpen={onOpen}
                duplicate={copy === 1 || index >= items.length}
              />
            ))}
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
      dialog.close()
      document.body.style.overflow = previousOverflow
      previousFocus?.focus?.()
    }
  }, [])

  return (
    <dialog
      ref={dialogRef}
      className="pg-modal"
      aria-labelledby="pg-modal-title"
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="pg-modal-header">
        <div>
          <h3 id="pg-modal-title">{project.title[locale]}</h3>
          {project.type === 'image' && <p>{t.imageHelp}</p>}
        </div>

        <button type="button" onClick={onClose} aria-label={t.close} autoFocus>
          <X size={23} />
        </button>
      </div>

      <div className="pg-modal-body">
        {failed ? (
          <p className="pg-file-error">{t.error}</p>
        ) : project.type === 'video' ? (
          <video
            src={project.src}
            controls
            autoPlay
            playsInline
            preload="metadata"
            onError={() => setFailed(true)}
          />
        ) : (
          <img
            src={project.src}
            alt={project.title[locale]}
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
  const t = content[locale]

  const imageCategories = [
  'websites',
  'funnels',
  'memberships',
  'forms',
  'dashboards',
]

const filtered =
  active === 'all'
    ? projects
    : projects.filter((project) =>
        imageCategories.includes(active)
          ? project.type === 'image'
          : project.type === 'video'
      )
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
          <span className="eyebrow-line" />
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
            onClick={() => setPaused((value) => !value)}
          >
            {paused ? t.resume : t.pause}
          </button>
        )}
      </div>

      {filtered.length ? (
        <div className="pg-gallery" key={active}>
          <MovingRow
            items={firstRow}
            locale={locale}
            t={t}
            onOpen={setSelected}
          />
          <MovingRow
            items={secondRow.length ? secondRow : firstRow}
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