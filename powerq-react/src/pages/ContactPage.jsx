import PageHero from '../components/PageHero/PageHero'
import QuoteForm from '../components/QuoteForm/QuoteForm'
import { contactCards } from '../data/contact'
import { company } from '../data/siteData'
import usePageTitle from '../hooks/usePageTitle'
import './ContactPage.css'

export default function ContactPage() {
  usePageTitle('Contact Us - PowerQ Test and Tag in Melbourne')
  return (
    <>
      <PageHero title="Contact Us" current="Contact Us" />
      <section className="space-top space-extra-bottom">
        <div className="container">
          <div className="row gy-4 justify-content-center">
            {contactCards.map((card) => (
              <div className="col-md-6 col-lg-3" key={card.title}>
                <div className="media-style5 contact-info-card flex-column text-center">
                  <div className="media-icon mx-auto">
                    <i className={card.icon} />
                  </div>
                  <div className="media-body">
                    <h3 className="media-title">{card.title}</h3>
                    {card.lines.map((line) => (
                      <p className="media-info" key={line}>
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary contact-map-section">
        <div className="row g-0 align-items-stretch contact-map-row">
          <div className="col-lg-7 contact-map-col">
            <iframe
              title="PowerQ location map"
              src={`https://www.google.com/maps?q=${encodeURIComponent(company.address)}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="col-lg-5 contact-form-col">
            <QuoteForm title="Send Us a Message" className="form-style1 contact-quote-form" showLabels showMessage />
          </div>
        </div>
      </section>
    </>
  )
}
