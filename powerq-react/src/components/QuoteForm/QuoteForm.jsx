import { useState } from 'react'
import { serviceNavLinks } from '../../data/siteData'
import { submitQuote } from '../../utils/quoteApi'

// Excludes visually ambiguous characters (0/O, 1/I/L) so the code is easy to read back.
const CAPTCHA_CHARS = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'
const createCaptcha = () => {
  let code = ''
  for (let i = 0; i < 6; i++) {
    code += CAPTCHA_CHARS[Math.floor(Math.random() * CAPTCHA_CHARS.length)]
  }
  return { question: code, answer: code }
}

const initialForm = { name: '', email: '', phone: '', service: '', message: '', captcha: '', website: '' }
const QUOTE_EMAIL = 'info@powerq.com.au'
const QUOTE_EMAIL_CC = ['vijeta27april@gmail.com', 'Vijeta.pandey2023@gmail.com', 'neetukumarseo00@gmail.com'].join(',')
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const NAME_PATTERN = /^[A-Za-z\s]+$/
const initialFieldErrors = { name: '', email: '', phone: '', message: '', captcha: '' }

export default function QuoteForm({ title = 'Request a free Quote', className = 'form-style1', showLabels = false, showMessage = true }) {
  const [form, setForm] = useState(initialForm)
  const [captcha, setCaptcha] = useState(createCaptcha)
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState(initialFieldErrors)

  const setFieldError = (name, message) => {
    setFieldErrors((prev) => ({ ...prev, [name]: message }))
  }

  const validateField = (name, value) => {
    const trimmed = value.trim()

    if (name === 'name') {
      if (!trimmed) return 'Please enter your name.'
      if (!NAME_PATTERN.test(trimmed)) return 'Please write alphabetic characters only.'
      if (trimmed.length > 30) return 'Name must be 30 characters or less.'
    }

    if (name === 'email') {
      if (!trimmed) return 'Please enter your email address.'
      if (trimmed.length > 50) return 'Email must be 50 characters or less.'
      if (!trimmed.includes('@') || !EMAIL_PATTERN.test(trimmed)) return 'Please enter a correct form of mail.'
    }

    if (name === 'phone') {
      if (!trimmed) return 'Please enter your phone number.'
      if (!/^\d+$/.test(trimmed)) return 'Please enter numeric values only.'
      if (trimmed.length > 15) return 'Phone number must be 15 digits or less.'
    }

    if (name === 'message' && trimmed.length > 300) {
      return 'Message must be 300 characters or less.'
    }

    if (name === 'captcha' && trimmed.toUpperCase() !== captcha.answer.toUpperCase()) {
      return 'Please enter the code shown correctly.'
    }

    return ''
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    let nextValue = value
    let nextError = ''

    if (name === 'name') {
      nextValue = value.replace(/[^A-Za-z\s]/g, '').slice(0, 30)
      if (value !== nextValue) nextError = 'Please write alphabetic characters only.'
    } else if (name === 'email') {
      nextValue = value.slice(0, 50)
      if (value.length > 50) nextError = 'Email must be 50 characters or less.'
    } else if (name === 'phone') {
      nextValue = value.replace(/\D/g, '').slice(0, 15)
      if (value !== nextValue) nextError = 'Please enter numeric values only.'
    } else if (name === 'message') {
      nextValue = value.slice(0, 300)
      if (value.length > 300) nextError = 'Message must be 300 characters or less.'
    } else if (name === 'captcha') {
      nextValue = value.replace(/[^A-Za-z0-9]/g, '').slice(0, 6)
    }

    setForm((prev) => ({ ...prev, [name]: nextValue }))
    if (Object.prototype.hasOwnProperty.call(fieldErrors, name)) {
      setFieldError(name, nextError)
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    if (Object.prototype.hasOwnProperty.call(fieldErrors, name)) {
      setFieldError(name, validateField(name, value))
    }
  }

  const validate = () => {
    const nextFieldErrors = {
      name: validateField('name', form.name),
      email: validateField('email', form.email),
      phone: validateField('phone', form.phone),
      message: validateField('message', form.message),
      captcha: validateField('captcha', form.captcha),
    }
    setFieldErrors(nextFieldErrors)

    const firstFieldError = Object.values(nextFieldErrors).find(Boolean)
    if (firstFieldError) return firstFieldError
    if (!form.service) return 'Please select a service.'
    return ''
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitted(false)
    const validationError = validate()
    if (validationError) {
      setError(validationError)
      return
    }
    setSending(true)
    setError('')

    const name = form.name.trim()
    const email = form.email.trim()
    const phone = form.phone.trim()
    const message = form.message.trim()

    // Sent to both in parallel: the database (so it shows up in the admin
    // panel) and formsubmit.co directly (so the email arrives even if the
    // server's own mail sending is ever unavailable/misconfigured).
    const [dbResult, emailResult] = await Promise.allSettled([
      submitQuote({
        name,
        email,
        phone,
        service: form.service,
        message,
        source_page: title,
        website: form.website,
      }),
      fetch(`https://formsubmit.co/ajax/${QUOTE_EMAIL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: 'New Quote Request - PowerQ Website',
          _cc: QUOTE_EMAIL_CC,
          Name: name,
          Email: email,
          'Phone No.': phone,
          Service: form.service,
          Message: message,
        }),
      }),
    ])

    const dbSucceeded = dbResult.status === 'fulfilled' && dbResult.value.success
    const emailSucceeded = emailResult.status === 'fulfilled' && emailResult.value.ok

    if (dbSucceeded || emailSucceeded) {
      setSubmitted(true)
      setForm(initialForm)
      setFieldErrors(initialFieldErrors)
      setCaptcha(createCaptcha())
    } else {
      setError((dbResult.status === 'fulfilled' && dbResult.value.error) || 'Something went wrong sending your request. Please try again.')
      setCaptcha(createCaptcha())
      setForm((prev) => ({ ...prev, captcha: '' }))
      setFieldError('captcha', '')
    }
    setSending(false)
  }

  return (
    <form className={className} onSubmit={handleSubmit}>
      <h3 className="form_title">{title}</h3>
      <div className="row">
        <input
          type="text"
          name="website"
          value={form.website}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
        />
        <div className="col-md-6 col-xl-12 form-group">
          {showLabels && <label htmlFor="quote-name">Name</label>}
          <input id="quote-name" type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} onBlur={handleBlur} maxLength={30} pattern="[A-Za-z ]+" title="Please write alphabetic characters only." aria-invalid={fieldErrors.name ? 'true' : 'false'} aria-describedby={fieldErrors.name ? 'quote-name-error' : undefined} required />
          {fieldErrors.name && <p id="quote-name-error" className="field-error">{fieldErrors.name}</p>}
        </div>
        <div className="col-md-6 col-xl-12 form-group">
          {showLabels && <label htmlFor="quote-email">Email</label>}
          <input id="quote-email" type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} onBlur={handleBlur} maxLength={50} aria-invalid={fieldErrors.email ? 'true' : 'false'} aria-describedby={fieldErrors.email ? 'quote-email-error' : undefined} required />
          {fieldErrors.email && <p id="quote-email-error" className="field-error">{fieldErrors.email}</p>}
        </div>
        <div className="col-md-6 col-xl-12 form-group">
          {showLabels && <label htmlFor="quote-phone">Phone No.</label>}
          <input id="quote-phone" type="tel" name="phone" placeholder="" value={form.phone} onChange={handleChange} onBlur={handleBlur} maxLength={15} inputMode="numeric" pattern="\d+" title="Please enter numeric values only." aria-invalid={fieldErrors.phone ? 'true' : 'false'} aria-describedby={fieldErrors.phone ? 'quote-phone-error' : undefined} required />
          {fieldErrors.phone && <p id="quote-phone-error" className="field-error">{fieldErrors.phone}</p>}
        </div>
        <div className="col-md-6 col-xl-12 form-group">
          {showLabels && <label htmlFor="quote-service">Service</label>}
          <select id="quote-service" name="service" value={form.service} onChange={handleChange} required>
            <option value="" disabled>
              Select a Service
            </option>
            {serviceNavLinks.map((service) => (
              <option value={service.label} key={service.label}>
                {service.label}
              </option>
            ))}
          </select>
        </div>
        {showMessage && (
          <div className="col-md-6 col-xl-12 form-group">
            {showLabels && <label htmlFor="quote-message">Message</label>}
            <textarea id="quote-message" name="message" placeholder="Message" value={form.message} onChange={handleChange} onBlur={handleBlur} rows={4} maxLength={300} aria-invalid={fieldErrors.message ? 'true' : 'false'} aria-describedby={fieldErrors.message ? 'quote-message-error' : undefined} />
            {fieldErrors.message && <p id="quote-message-error" className="field-error">{fieldErrors.message}</p>}
          </div>
        )}
        <div className="col-md-6 col-xl-12 form-group">
          {showLabels && <label htmlFor="quote-captcha">Captcha: {captcha.question}</label>}
          <input id="quote-captcha" type="text" name="captcha" placeholder={`Captcha: ${captcha.question}`} value={form.captcha} onChange={handleChange} onBlur={handleBlur} autoCapitalize="characters" autoCorrect="off" aria-invalid={fieldErrors.captcha ? 'true' : 'false'} aria-describedby={fieldErrors.captcha ? 'quote-captcha-error' : undefined} required />
          {fieldErrors.captcha && <p id="quote-captcha-error" className="field-error">{fieldErrors.captcha}</p>}
        </div>
        <div className="col-12 form-btn">
          <button className="vs-btn style3" type="submit" disabled={sending}>
            {sending ? 'Sending...' : 'Send'}
          </button>
        </div>
        {submitted && <p className="form-message">Thanks! We’ll be in touch shortly with your free quote.</p>}
        {error && <p className="form-message form-message-error">{error}</p>}
      </div>
    </form>
  )
}
