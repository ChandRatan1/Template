import { useState } from 'react'

const initialForm = { name: '', email: '', phone: '', message: '' }
const QUOTE_EMAIL = 'neetukumarseo00@gmail.com'
const QUOTE_EMAIL_CC = 'vijeta27april@gmail.com,Vijeta.pandey2023@gmail.com'
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function QuoteForm({ title = 'Request a free Quote', className = 'form-style1', showLabels = false, showMessage = false }) {
  const [form, setForm] = useState(initialForm)
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const validate = () => {
    const name = form.name.trim()
    const email = form.email.trim()
    const phone = form.phone.trim()
    if (!name) return 'Please enter your name.'
    if (!email || !EMAIL_PATTERN.test(email)) return 'Please enter a valid email address.'
    if (!phone || phone.replace(/\D/g, '').length < 8) return 'Please enter a valid phone number.'
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
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${QUOTE_EMAIL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: 'New Quote Request - PowerQ Website',
          _cc: QUOTE_EMAIL_CC,
          Name: form.name.trim(),
          Email: form.email.trim(),
          'Phone No.': form.phone.trim(),
          ...(showMessage ? { Message: form.message.trim() } : {}),
        }),
      })
      if (!res.ok) throw new Error('Request failed')
      setSubmitted(true)
      setForm(initialForm)
    } catch {
      setError('Something went wrong sending your request. Please try again.')
    } finally {
      setSending(false)
    }
  }

  return (
    <form className={className} onSubmit={handleSubmit}>
      <h3 className="form_title">{title}</h3>
      <div className="row">
        <div className="col-md-6 col-xl-12 form-group">
          {showLabels && <label htmlFor="quote-name">Name</label>}
          <input id="quote-name" type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        </div>
        <div className="col-md-6 col-xl-12 form-group">
          {showLabels && <label htmlFor="quote-email">Email</label>}
          <input id="quote-email" type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        </div>
        <div className="col-md-6 col-xl-12 form-group">
          {showLabels && <label htmlFor="quote-phone">Phone No.</label>}
          <input id="quote-phone" type="tel" name="phone" placeholder="" value={form.phone} onChange={handleChange} required />
        </div>
        {showMessage && (
          <div className="col-md-6 col-xl-12 form-group">
            {showLabels && <label htmlFor="quote-message">Message</label>}
            <textarea id="quote-message" name="message" placeholder="Message" value={form.message} onChange={handleChange} rows={4} />
          </div>
        )}
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
