import PageHero from '../components/PageHero/PageHero'
import QuoteForm from '../components/QuoteForm/QuoteForm'
import { requestQuoteIntro } from '../data/contact'

export default function RequestQuotePage() {
  return (
    <>
      <PageHero title="Request a Quote" current="Request a Quote" />

      <section className="space-top space-extra-bottom">
        <div className="container">
          <div className="row align-items-center gx-100">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <img src={requestQuoteIntro.image} alt="" className="w-100" style={{ borderRadius: 8 }} />
              <h2 className="sec-title mt-4">{requestQuoteIntro.title}</h2>
              {requestQuoteIntro.paragraphs.map((p, i) => (
                <p className="sec-text" key={i}>
                  {p}
                </p>
              ))}
            </div>
            <div className="col-lg-6">
              <QuoteForm title="Request a Quote" />
            </div>
          </div>
          <div className="text-center mt-5">
            <img src={requestQuoteIntro.bottomImage} alt="Equipment Test and Tag in Melbourne" className="w-100" style={{ borderRadius: 8, maxWidth: 800 }} />
          </div>
        </div>
      </section>
    </>
  )
}
