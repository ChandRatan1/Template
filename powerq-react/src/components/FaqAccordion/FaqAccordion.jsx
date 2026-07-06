import { useState } from 'react'
import './FaqAccordion.css'

export default function FaqAccordion({ items, idPrefix = 'faq', defaultOpen = 0 }) {
  const [openIndex, setOpenIndex] = useState(defaultOpen)

  return (
    <div className="accordion-box icon-accordion-box">
      {items.map((item, index) => {
        const isOpen = openIndex === index
        const collapseId = `${idPrefix}-collapse-${index}`
        const headingId = `${idPrefix}-heading-${index}`
        return (
          <div className={`accordion-item${isOpen ? ' active' : ''}`} key={headingId}>
            <div className="accordion-header" id={headingId}>
              <button
                className={`accordion-button${isOpen ? '' : ' collapsed'}`}
                type="button"
                aria-expanded={isOpen}
                aria-controls={collapseId}
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
              >
                <span className="accordion-icon-box">
                  <i className="fas fa-user-friends" />
                </span>
                <span className="accordion-button-text">{item.q}</span>
                <i className={`accordion-chevron fas fa-angle-${isOpen ? 'up' : 'down'}`} />
              </button>
            </div>
            <div
              id={collapseId}
              className={`accordion-collapse collapse${isOpen ? ' show' : ''}`}
              aria-labelledby={headingId}
            >
              <div className="accordion-body">
                <p>{item.a}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
