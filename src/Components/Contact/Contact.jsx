import React, { useEffect, useRef, useState } from 'react'
import './Contact.css'

// ✏️ Apni details yahan badlo
const CONTACT = {
  email: 'm.hamzakhan200404@gmail.com',
  phone: '+92 306 8886012',
  whatsapp: '92308886012', 
  location: 'Multan, Pakistan',
  github: 'https://github.com/Hamzakhan9221',
  linkedin: 'https://www.linkedin.com/in/your-profile',
}


const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY
const infoCards = [
  {
    icon: 'mail',
    label: 'Email',
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
  },
  {
    icon: 'whatsapp',
    label: 'WhatsApp',
    value: CONTACT.phone,
    href: `https://wa.me/${CONTACT.whatsapp}`,
  },
  {
    icon: 'pin',
    label: 'Location',
    value: CONTACT.location,
  },
]

const socials = [
  { icon: 'github', label: 'GitHub', href: CONTACT.github },
  { icon: 'linkedin', label: 'LinkedIn', href: CONTACT.linkedin },
]


const Icon = ({ name }) => {
  const icons = {
    mail: (
      <>
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </>
    ),
    whatsapp: (
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    ),
    pin: (
      <>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </>
    ),
    github: (
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    ),
    linkedin: (
      <>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </>
    ),
    send: (
      <>
        <line x1="22" y1="2" x2="11" y2="13" />
        <polygon points="22 2 15 22 11 13 2 9 22 2" />
      </>
    ),
    check: <polyline points="20 6 9 17 4 12" />,
  }

  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {icons[name]}
    </svg>
  )
}


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

const Contact = () => {
  const [titleRef, titleShow] = useInView(0.3)
  const [wrapRef, wrapShow] = useInView(0.1)

  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  
  useEffect(() => {
    if (!sent) return
    const t = setTimeout(() => setSent(false), 4000)
    return () => clearTimeout(t)
  }, [sent])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSending(true)

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      })

      const data = await res.json()

      if (data.success) {
        setSent(true)
        setForm({ name: '', email: '', message: '' })
      } else {
        setError('Message send nahi ho saka. Dobara try karo.')
      }
    } catch (err) {
      console.error('Web3Forms error:', err)
      setError('Message send nahi ho saka. Dobara try karo.')
    } finally {
      setSending(false)
    }
  }

  return (
    <section className="contact" id="contact">
      <div ref={titleRef} className={`contact-title contact-reveal ${titleShow ? 'show' : ''}`}>
        <h1>Contact Me</h1>
        <span className="contact-line" />
        <p>Have a project in mind or just want to say hi? Send me a message.</p>
      </div>

      <div ref={wrapRef} className="contact-wrap">
        {/* Left side: info cards + socials */}
        <div className="contact-info">
          {infoCards.map((c, i) => {
            const Tag = c.href ? 'a' : 'div'
            const extra = c.href && c.href.startsWith('http')
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : {}
            return (
              <Tag
                key={c.label}
                href={c.href}
                {...extra}
                className={`contact-card ${wrapShow ? 'show' : ''}`}
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                <span className="contact-ring" aria-hidden="true" />
                <span className="contact-icon">
                  <Icon name={c.icon} />
                </span>
                <div className="contact-card-text">
                  <h3>{c.label}</h3>
                  <p>{c.value}</p>
                </div>
              </Tag>
            )
          })}

          <div
            className={`contact-socials ${wrapShow ? 'show' : ''}`}
            style={{ animationDelay: '0.4s' }}
          >
            <span>Find me on</span>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="contact-social"
              >
                <Icon name={s.icon} />
              </a>
            ))}
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className={`contact-form ${wrapShow ? 'show' : ''}`}
          style={{ animationDelay: '0.2s' }}
        >
          <span className="contact-ring" aria-hidden="true" />
          <h2>Send a message</h2>

          <div className="contact-field">
            <input
              id="contact-name"
              name="name"
              type="text"
              placeholder=" "
              value={form.name}
              onChange={handleChange}
              required
            />
            <label htmlFor="contact-name">Your name</label>
          </div>

          <div className="contact-field">
            <input
              id="contact-email"
              name="email"
              type="email"
              placeholder=" "
              value={form.email}
              onChange={handleChange}
              required
            />
            <label htmlFor="contact-email">Your email</label>
          </div>

          <div className="contact-field">
            <textarea
              id="contact-message"
              name="message"
              rows="5"
              placeholder=" "
              value={form.message}
              onChange={handleChange}
              required
            />
            <label htmlFor="contact-message">Your message</label>
          </div>

          <button type="submit" className="contact-btn" disabled={sending}>
            <span>{sending ? 'Sending...' : 'Send Message'}</span>
            <i className="contact-btn-icon">
              <Icon name="send" />
            </i>
          </button>

          {error && <p className="contact-error">{error}</p>}

          <p className={`contact-success ${sent ? 'show' : ''}`} role="status">
            <Icon name="check" />
            <span>Thanks! Your message has been sent.</span>
          </p>
        </form>
      </div>
    </section>
  )
}

export default Contact