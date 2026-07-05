import PageHero from '../components/PageHero/PageHero'
import QuoteForm from '../components/QuoteForm/QuoteForm'
import { contactCards } from '../data/contact'
import { company } from '../data/siteData'
import './ContactPage.css'

export default function ContactPage() {
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

      <section className="bg-secondary space-extra-bottom">
        <div className="container">
          <div className="row align-items-stretch gx-100">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <iframe
                title="PowerQ location map"
                src={`https://www.google.com/maps?q=${encodeURIComponent(company.address)}&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: 420, borderRadius: 8 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="col-lg-6">
              <QuoteForm title="Send Us a Message" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
