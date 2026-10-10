import './Skills.css'

const rows = [
  [
    'GoHighLevel',
    'CRM Systems',
    'Websites',
    'Sales Funnels',
    'Workflow Automation',
    'AI Chatbots',
  ],
  [
    'Voice AI',
    'Memberships & Courses',
    'A2P Setup',
    'Integrations',
    'Calendars',
    'Custom Dashboards',
  ],
]

export default function Skills({ language = 'en' }) {
  return (
    <section
      id="skills"
      className="sk-ribbons"
      aria-label={language === 'es' ? 'Servicios y habilidades' : 'Services and skills'}
    >
      {rows.map((items, row) => (
        <div
          className={`sk-ribbon sk-ribbon-${row + 1}`}
          key={row}
          tabIndex={0}
          aria-label={items.join(', ')}
        >
          <div className="sk-moving">
            {[0, 1].map(copy => (
              <div
                className="sk-copy"
                key={copy}
                aria-hidden={copy === 1 ? true : undefined}
              >
                {items.map(item => (
                  <span className="sk-item" key={item}>
                    {item}
                    <span className="sk-plus" aria-hidden="true">+</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}