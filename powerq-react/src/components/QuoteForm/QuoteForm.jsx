import { useState } from 'react'

const initialForm = { name: '', email: '', phone: '' }

export default function QuoteForm({ title = 'Request a free Quote', className = 'form-style1' }) {
  const [form, setForm] = useState(initialForm)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setForm(initialForm)
  }

  return (
    <form className={className} onSubmit={handleSubmit}>
      <h3 className="form_title">{title}</h3>
      <div className="row">
        <div className="col-md-6 col-xl-12 form-group">
          <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        </div>
        <div className="col-md-6 col-xl-12 form-group">
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        </div>
        <div className="col-md-6 col-xl-12 form-group">
          <input type="tel" name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
        </div>
        <div className="col-12 form-btn">
          <button className="vs-btn style3" type="submit">
            Send
          </button>
        </div>
        {submitted && <p className="form-message">Thanks! We’ll be in touch shortly with your free quote.</p>}
      </div>
    </form>
  )
}
