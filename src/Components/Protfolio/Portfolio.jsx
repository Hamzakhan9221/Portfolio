import React, { useEffect, useRef, useState } from 'react'
import './Portfolio.css'
import AgencyImg from '../../assets/agency.png'
import balaajImg from '../../assets/Balaaj.png'
import movieappImg from '../../assets/movieapp.png'
import ZonauraImg from '../../assets/Zonaura.png'

const projects = [
  {
    no: '01',
    title: 'Movie App',
    desc: 'A movie browsing app where users can explore and search movies, with all movie data fetched live from an API.',
    tags: ['React', 'REST API', 'CSS'],
    image: movieappImg,
    live: 'https://reactmovieproject2026.netlify.app',
    github: 'https://github.com/Hamzakhan9221/netflix-clone-movie-app',
  },
  {
    no: '02',
    title: 'Balaaj Perfumes',
    desc: 'An online store for luxury Arabian perfumes and leather belts, with smooth animations and Cash on Delivery across Pakistan.',
    tags: ['React 19', 'Vite', 'React Router', 'Framer Motion', 'Lenis'],
    image: balaajImg,
    live: 'https://balaaj-perfumes.netlify.app/',
    github: 'https://github.com/Hamzakhan9221/BALAAJ-Perfume',
  },
  {
    no: '03',
    title: 'Agency.AI',
    desc: 'A modern landing page for an AI agency, showing its services, working process and a contact section.',
    tags: ['React', 'Responsive', 'CSS'],
    image: AgencyImg,
    live: 'https://agency-ai1.netlify.app/',
    github: '',
  },
  {
    no: '04',
    title: 'Zonaura',
    desc: 'A business website for an e-commerce agency that helps brands grow on Amazon, Walmart, TikTok Shop and Shopify.',
    tags: ['WordPress', 'Business Website'],
    image: ZonauraImg,
    live: 'https://zonaura.com/',
    github: '',
  },
]

const useInView = (threshold = 0.15) => {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, inView]
}

const Portfolio = () => {
  const [titleRef, titleShow] = useInView(0.3)
  const [gridRef, gridShow] = useInView(0.1)

  return (
    <section className="portfolio" id="portfolio">
      <div ref={titleRef} className={`portfolio-title portfolio-reveal ${titleShow ? 'show' : ''}`}>
        <h1>My Portfolio</h1>
        <span className="portfolio-line" />
      </div>

      <div ref={gridRef} className="portfolio-container">
        {projects.map((p, i) => (
          <div
            key={p.no}
            className={`portfolio-format ${gridShow ? 'show' : ''}`}
            style={{ animationDelay: `${i * 0.12}s` }}
          >
            <span className="portfolio-ring" aria-hidden="true" />

            <div className="portfolio-img">
              {p.image ? (
                <img src={p.image} alt={`${p.title} screenshot`} loading="lazy" />
              ) : (
                <div className="portfolio-img-empty">
                  <span>🖼️</span>
                  <small>Add screenshot</small>
                </div>
              )}
            </div>

            <div className="portfolio-body">
              <h3>{p.no}</h3>
              <h2>{p.title}</h2>
              <p>{p.desc}</p>

              <ul className="portfolio-tags">
                {p.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>

              <div className="portfolio-links">
                <a
                  href={p.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="portfolio-link"
                >
                  <span>View Live</span>
                  <i className="portfolio-arrow">→</i>
                </a>
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="portfolio-link"
                  >
                    <span>GitHub</span>
                    <i className="portfolio-arrow">→</i>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Portfolio