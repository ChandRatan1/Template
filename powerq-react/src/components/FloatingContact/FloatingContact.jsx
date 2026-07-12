import { company } from '../../data/siteData'
import './FloatingContact.css'

const AU_COUNTRY_CODE = '61'

function toWhatsAppNumber(phoneHref) {
  const digits = phoneHref.replace(/\D/g, '')
  return `${AU_COUNTRY_CODE}${digits.replace(/^0+/, '')}`
}

export default function FloatingContact() {
  const whatsappNumber = toWhatsAppNumber(company.phoneHref)

  return (
    <div className="floating-contact">
      <a href={company.phoneHref} className="floating-contact-btn floating-contact-call" aria-label="Call us">
        <i className="fas fa-phone-alt" />
      </a>
      <a
        href={`https://wa.me/${whatsappNumber}`}
        className="floating-contact-btn floating-contact-whatsapp"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <i className="fab fa-whatsapp" />
      </a>
    </div>
  )
}
