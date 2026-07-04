import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero/PageHero'
import { pricingIntro, pricingPlans, pricingFactors, experienceFactors } from '../data/pricing'

export default function PricingPage() {
  return (
    <>
      <PageHero title="Cost of Test & Tag in Melbourne" current="Pricing" />

      <section className="space-top space-extra-bottom">
        <div className="container text-center">
          <div className="title-area">
            <span className="sec-subtitle">Pricing</span>
            <h2 className="sec-title">{pricingIntro.title}</h2>
            <p className="sec-text col-lg-8 mx-auto">{pricingIntro.paragraph}</p>
          </div>
          <Link to="/request-a-quote" className="vs-btn">
            Book Our Services<i className="far fa-long-arrow-right" />
          </Link>
        </div>
      </section>

      <section className="bg-secondary space-top space-extra-bottom">
        <div className="container">
          <div className="title-area text-center">
            <span className="sec-subtitle2">Pricing Plans</span>
            <h2 className="sec-title">{pricingPlans.title}</h2>
          </div>
          <div className="row justify-content-center">
            <div className="col-xl-8">
              <div className="pricing-highlight-box" style={{ background: 'var(--white-color)' }}>
                <ul className="pricing-highlight-list">
                  {pricingPlans.items.map((item) => (
                    <li key={item.label}>
                      <span>{item.label}</span>
                      <span className="text-theme">{item.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-top space-extra-bottom">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-9">
              <h2 className="sec-title">{pricingFactors.title}</h2>
              {pricingFactors.paragraphs.map((p, i) => (
                <p className="sec-text" key={i}>
                  {p}
                </p>
              ))}
              <h3 className="h4 mt-4">{experienceFactors.title}</h3>
              <div className="list-style2">
                <ul className="list-unstyled">
                  {experienceFactors.points.map((point, i) => (
                    <li key={i}>
                      <img src="/assets/img/icon/arrow-right-box.svg" alt="" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
