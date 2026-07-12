import { useState } from 'react'
import PageHero from '../components/PageHero/PageHero'
import QuoteFormModal from '../components/QuoteForm/QuoteFormModal'
import { requestQuoteIntro } from '../data/contact'
import { company } from '../data/siteData'
import usePageTitle from '../hooks/usePageTitle'
import './RequestQuotePage.css'

export default function RequestQuotePage() {
  usePageTitle('Request a Free Quote - Test and Tag Services in Melbourne')
  const [isQuoteOpen, setIsQuoteOpen] = useState(false)

  return (
    <>
      <PageHero title="Request a Quote" current="Request a Quote" />

      <section className="space-top space-extra-bottom">
        <div className="container">
          <div className="row align-items-start gx-100">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <h2 className="sec-title">{requestQuoteIntro.title}</h2>
              {requestQuoteIntro.paragraphs.map((p, i) => (
                <p className="sec-text" key={i}>
                  {p}
                </p>
              ))}
            </div>
            <div className="col-lg-6 text-center">
              <div className="quote-cta-box">
                <a href={company.phoneHref} className="vs-btn quote-cta-btn">
                  Need Our Services
                </a>
                <div className="quote-cta-icon">
                  <i className="fal fa-file-check" />
                </div>
                <button type="button" className="vs-btn quote-cta-btn" onClick={() => setIsQuoteOpen(true)}>
                  Request a Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <QuoteFormModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
    </>
  )
}
