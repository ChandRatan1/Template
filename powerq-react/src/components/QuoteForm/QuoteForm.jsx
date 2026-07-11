import { useState } from 'react'

const initialForm = { name: '', email: '', phone: '' }
const QUOTE_EMAIL = 'neetukumarseo00@gmail.com'

export default function QuoteForm({ title = 'Request a free Quote', className = 'form-style1', showLabels = false }) {
  const [form, setForm] = useState(initialForm)
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    setError(false)
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${QUOTE_EMAIL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: 'New Quote Request - PowerQ Website',
          Name: form.name,
          Email: form.email,
          'Phone No.': form.phone,
        }),
      })
      if (!res.ok) throw new Error('Request failed')
      setSubmitted(true)
      setForm(initialForm)
    } catch {
      setError(true)
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
        <div className="col-12 form-btn">
          <button className="vs-btn style3" type="submit" disabled={sending}>
            {sending ? 'Sending...' : 'Send'}
          </button>
        </div>
        {submitted && <p className="form-message">Thanks! We’ll be in touch shortly with your free quote.</p>}
        {error && <p className="form-message form-message-error">Something went wrong. Please try again.</p>}
      </div>
    </form>
  )
}
