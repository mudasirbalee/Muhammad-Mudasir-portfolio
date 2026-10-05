import './Skills.css'

export default function Skills({ language = 'en' }) {
  const es = language === 'es'

  const groups = [
    {
      title: es ? 'CRM y automatización' : 'CRM & Automation',
      items: [
        'GoHighLevel',
        es ? 'Pipelines y etapas' : 'Pipelines & Stages',
        es ? 'Flujos de seguimiento' : 'Follow-up Workflows',
        es ? 'Calendarios y reservas' : 'Calendars & Booking',
      ],
    },
    {
      title: es ? 'Sitios web y experiencias' : 'Websites & Experiences',
      items: [
        es ? 'Sitios web y embudos' : 'Websites & Funnels',
        es ? 'Formularios personalizados' : 'Custom Forms',
        'HTML & CSS',
        es ? 'Membresías y cursos' : 'Memberships & Courses',
      ],
    },
    {
      title: es ? 'IA e integraciones' : 'AI & Integrations',
      items: [
        'AI Chatbots',
        'Voice AI',
        'APIs & Webhooks',
        es ? 'Configuración de SMS y A2P' : 'SMS & A2P Setup',
      ],
    },
  ]

  return (
    <section
      id="skills"
      className="skills-section"
      aria-labelledby="skills-title"
    >
      <p className="eyebrow">
        <span className="eyebrow-line" />
        {es ? 'HABILIDADES Y HERRAMIENTAS' : 'SKILLS & TOOLS'}
      </p>

      <h2 id="skills-title">
        {es ? 'Las herramientas adecuadas.' : 'The right tools.'}
        <span className="gradient-text">
          {es ? 'Conectadas a tus objetivos.' : 'Connected to your goals.'}
        </span>
      </h2>

      <p className="skills-description">
        {es
          ? 'Selecciono las herramientas y configuraciones según el alcance de tu proyecto y los sistemas que ya utilizas.'
          : 'I choose tools and configurations around your project scope and the systems you already use.'}
      </p>

      <div className="skills-grid">
        {groups.map((group, index) => (
          <article className="skills-group" key={group.title}>
            <span className="skills-number">0{index + 1}</span>
            <h3>{group.title}</h3>
            <ul>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}