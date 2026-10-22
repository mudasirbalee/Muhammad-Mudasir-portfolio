import './HeroVisual.css'

export default function HeroVisual({ language = 'en' }) {
  const es = language === 'es'

  return (
    <figure className="hero-portrait">
      <img
        className="hero-portrait-image"
        src="/mudasir.jpeg"
        alt={es ? 'Muhammad Mudasir, especialista en CRM e IA' : 'Muhammad Mudasir, CRM and AI systems specialist'}
      />
      <figcaption className="hero-portrait-caption">
        <strong>Muhammad Mudasir</strong>
        <span>CRM &amp; AI Systems Specialist</span>
      </figcaption>
    </figure>
  )
}