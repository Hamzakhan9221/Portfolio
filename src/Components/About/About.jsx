import React, { useEffect, useRef, useState } from 'react'
import './About.css'
import HAMZA_profile from '../../assets/HAMZA_profile.png'

// skills and their levels
const skills = [
  { name: 'HTML & CSS', level: 70 },
  { name: 'React JS', level: 50 },
  { name: 'JavaScript', level: 60 },
]

const stats = [
  { value: 1, label: 'YEARS OF EXPERIENCE' },
  { value: 3, label: 'PROJECTS COMPLETED' },
  { value: 5, label: 'WORDPRESS WEBSITE DELIVERED' },
]

// Element screen par aaye to true (sirf ek baar)
const useInView = (threshold = 0.2) => {
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


const Counter = ({ end, start }) => {
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!start) return
    let current = 0
    const step = Math.max(1, Math.ceil(end / 30))
    const timer = setInterval(() => {
      current += step
      if (current >= end) {
        current = end
        clearInterval(timer)
      }
      setN(current)
    }, 45)
    return () => clearInterval(timer)
  }, [start, end])

  return <>{n}+</>
}

const About = () => {
  const [titleRef, titleShow] = useInView(0.3)
  const [mainRef, mainShow] = useInView(0.2)
  const [statsRef, statsShow] = useInView(0.3)

  return (
    <section className="about" id="about">
      <div ref={titleRef} className={`about-title reveal ${titleShow ? 'show' : ''}`}>
        <h1>About Me</h1>
        <span className="about-line" />
      </div>

      <div ref={mainRef} className="about-section">
        <div className={`about-left reveal from-left ${mainShow ? 'show' : ''}`}>
          <div className="about-img-wrap">
            <img src={HAMZA_profile} alt="Muhammad Hamza" />
          </div>
        </div>

        <div className="about-right">
          <div className={`about-para reveal ${mainShow ? 'show' : ''}`} style={{ transitionDelay: '0.2s' }}>
            <p>
              I am a passionate Frontend Developer with 1+ years of professional experience in
              web development. I have worked on real-world projects at Next Step Solution and
              Marketing Solutionz, where I developed modern, responsive, and user-friendly
              websites.
            </p>
            <p>
              I enjoy turning ideas into clean and engaging web experiences while continuously
              improving my development skills.
            </p>
          </div>

          <div className="about-skills">
            {skills.map((s, i) => (
              <div
                key={s.name}
                className={`about-skill reveal ${mainShow ? 'show' : ''}`}
                style={{ transitionDelay: `${0.4 + i * 0.15}s` }}
              >
                <p>{s.name}</p>
                <div className="skill-track">
                  <div
                    className="skill-bar"
                    style={{
                      width: mainShow ? `${s.level}%` : '0%',
                      transitionDelay: `${0.6 + i * 0.2}s`,
                    }}
                  />
                </div>
                <span className="skill-percent">{s.level}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div ref={statsRef} className="about-achievements">
        {stats.map((st, i) => (
          <div
            key={st.label}
            className={`about-achievement reveal ${statsShow ? 'show' : ''}`}
            style={{ transitionDelay: `${i * 0.2}s` }}
          >
            <h1><Counter end={st.value} start={statsShow} /></h1>
            <p>{st.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default About