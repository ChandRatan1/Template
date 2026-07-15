import PageHero from '../components/PageHero/PageHero'
import ServiceSection from '../components/ServiceSection/ServiceSection'
import { bgStyle } from '../utils/bg'
import { pricingIntro, pricingPlans, pricingFactors, experienceFactors } from '../data/pricing'
import usePageTitle from '../hooks/usePageTitle'
import './HomePage.css'
import './PricingPage.css'

export default function PricingPage() {
  usePageTitle('Test and Tag Pricing Melbourne - Affordable Rates | PowerQ')
  return (
    <>
      <PageHero title="Cost of Test & Tag in Melbourne" current="Pricing" />

      <section className="space-top space-extra-bottom">
        <div className="container">
          <ServiceSection
            heading={pricingIntro.title}
            paragraphs={[pricingIntro.paragraph, pricingIntro.paragraph2]}
            cta={{ text: 'BOOK OUR SERVICES', href: '/request-a-quote' }}
            image={pricingIntro.image}
            imageSide="right"
          />
        </div>
      </section>

      <section className="pricing-intro" data-bg-src={pricingPlans.image} style={bgStyle(pricingPlans.image)}>
        <div className="container text-center">
          <span className="sec-subtitle pricing-intro-subtitle">{pricingPlans.subtitle}</span>
          <h2 className="sec-title text-white mb-4">{pricingPlans.title}</h2>
          <div className="row justify-content-center">
            <div className="col-xl-8">
              <div className="pricing-highlight-box">
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
          <ServiceSection
            heading={pricingFactors.title}
            paragraphs={pricingFactors.paragraphs}
            image={pricingFactors.image}
            imageSide="right"
            imageContain
          />
          <ServiceSection
            image={experienceFactors.image}
            imageSide="left"
            imageContain
            heading={experienceFactors.title}
            boldLead={experienceFactors.boldLead}
            list={experienceFactors.points}
            closingNote={experienceFactors.boldNote}
          />
        </div>
      </section>
    </>
  )
}
