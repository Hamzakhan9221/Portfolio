import React, { useEffect, useRef, useState } from 'react'
import './Services.css'


const services = [
  {
    no: '01',
    title: 'Web design',
    desc: 'Clean and modern website layouts that look great and are easy for visitors to use.',
  },
  {
    no: '02',
    title: 'Frontend development',
    desc: 'Turning designs into fast, pixel-perfect websites using HTML, CSS and JavaScript.',
  },
  {
    no: '03',
    title: 'React development',
    desc: 'Building interactive web apps with reusable React components and smooth user experience.',
  },
  {
    no: '04',
    title: 'Responsive design',
    desc: 'Websites that adapt perfectly to mobiles, tablets and desktops of every size.',
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

const Services = () => {
  const [titleRef, titleShow] = useInView(0.3)
  const [gridRef, gridShow] = useInView(0.1)

  return (
    <section className="services" id="services">
      <div ref={titleRef} className={`services-title reveal ${titleShow ? 'show' : ''}`}>
        <h1>My Services</h1>
        <span className="services-line" />
      </div>

      <div ref={gridRef} className="services-container">
        {services.map((s, i) => (
          <div
            key={s.no}
            className={`services-format ${gridShow ? 'show' : ''}`}
            style={{ animationDelay: `${i * 0.12}s` }}
          >
            <span className="services-ring" aria-hidden="true" />
            <h3>{s.no}</h3>
            <h2>{s.title}</h2>
            <p>{s.desc}</p>
            <a href="#contact" className="services-readmore">
              <span>Read More</span>
              <i className="services-arrow">→</i>
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Services