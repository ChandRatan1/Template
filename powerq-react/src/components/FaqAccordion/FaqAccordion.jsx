import { useState } from 'react'

export default function FaqAccordion({ items, idPrefix = 'faq', defaultOpen = 0 }) {
  const [openIndex, setOpenIndex] = useState(defaultOpen)

  return (
    <div className="accordion-box">
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
                {item.q}
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
