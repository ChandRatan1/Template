import PageHero from '../components/PageHero/PageHero'
import { requestQuoteIntro } from '../data/contact'

export default function RequestQuotePage() {
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
              <img src={requestQuoteIntro.bottomImage} alt="Need our services - Request a Quote" style={{ maxWidth: 400, width: '100%' }} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
