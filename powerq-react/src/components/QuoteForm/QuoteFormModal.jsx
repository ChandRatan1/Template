import { useEffect } from 'react'
import QuoteForm from './QuoteForm'
import './QuoteFormModal.css'

export default function QuoteFormModal({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return undefined
    document.body.style.overflow = 'hidden'
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="quote-modal-overlay" onClick={onClose}>
      <div className="quote-modal-dialog" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="quote-modal-close" onClick={onClose} aria-label="Close">
          <i className="fal fa-times" />
        </button>
        <QuoteForm title="Request a free Quote" className="form-style1" showLabels />
      </div>
    </div>
  )
}
