import PageHero from '../components/PageHero/PageHero'
import FaqAccordion from '../components/FaqAccordion/FaqAccordion'
import { faqIntro, regulatoryBlocks, faqItems } from '../data/faq'

export default function FaqPage() {
  return (
    <>
      <PageHero title="FAQ" current="Faq" />

      <section className="space-top space-extra-bottom">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-9">
              <h2 className="sec-title">{faqIntro.title}</h2>
              <p className="sec-text">{faqIntro.paragraph}</p>

              {regulatoryBlocks.map((block) => (
                <div key={block.heading} className="mb-4">
                  <h3 className="h4">{block.heading}</h3>
                  {block.paragraphs.map((p, i) => (
                    <p className="sec-text" key={i}>
                      {p}
                    </p>
                  ))}
                  {block.list && (
                    <div className="list-style2">
                      <ul className="list-unstyled">
                        {block.list.map((item) => (
                          <li key={item}>
                            <img src="/assets/img/icon/arrow-right-box.svg" alt="" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {block.paragraphsAfter &&
                    block.paragraphsAfter.map((p, i) => (
                      <p className="sec-text" key={`after-${i}`}>
                        {p}
                      </p>
                    ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary space-top space-extra-bottom">
        <div className="container">
          <div className="title-area text-center">
            <span className="sec-subtitle">FAQ</span>
            <h2 className="sec-title">Frequently Asked Questions</h2>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-9">
              <FaqAccordion items={faqItems} idPrefix="faq-page" defaultOpen={-1} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
