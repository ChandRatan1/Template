import PageHero from '../components/PageHero/PageHero'
import { contactCards } from '../data/contact'

export default function ContactPage() {
  return (
    <>
      <PageHero title="Contact Us" current="Contact Us" />
      <section className="space-top space-extra-bottom">
        <div className="container">
          <div className="row gy-4 justify-content-center">
            {contactCards.map((card) => (
              <div className="col-md-6 col-lg-3" key={card.title}>
                <div className="media-style5 flex-column text-center">
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
    </>
  )
}
