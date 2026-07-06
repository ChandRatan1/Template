import PageHero from '../components/PageHero/PageHero'
import FaqAccordion from '../components/FaqAccordion/FaqAccordion'
import { faqIntro, regulatoryBlocks, faqItems } from '../data/faq'
import './FaqPage.css'

const half = Math.ceil(faqItems.length / 2)
const faqItemsLeft = faqItems.slice(0, half)
const faqItemsRight = faqItems.slice(half)

export default function FaqPage() {
  return (
    <>
      <PageHero title={faqIntro.title} current="Faq" description={faqIntro.paragraph} />

      <section className="space-top space-extra-bottom">
        <div className="container">
          <div className="row">
            <div className="col-12">
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

          <div className="row">
            <div className="col-12">
              <div className="table-responsive faq-compliance-table-wrap">
                <table className="faq-compliance-table">
                  <tbody>
                    <tr>
                      <th rowSpan={4} className="col-head">
                        Type of environment and/or equipment (a)
                      </th>
                      <th colSpan={5} className="section-head">
                        Interval between inspection and tests
                      </th>
                    </tr>
                    <tr>
                      <td rowSpan={3} className="section-head">
                        Equipment including Class I and Class II equipment, cords, cord extension sets and EPOD’s (b)
                      </td>
                      <td colSpan={4} className="section-head">
                        Residual Current Devices (RCD’s)
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2} className="section-head">
                        Push Button Test By users
                      </td>
                      <td colSpan={2} className="section-head">
                        operating time and push-button tests
                      </td>
                    </tr>
                    <tr>
                      <td className="section-head">Portable c</td>
                      <td className="section-head">Fixed c</td>
                      <td className="section-head">Portable e</td>
                      <td className="section-head">Fixed e</td>
                    </tr>
                    <tr>
                      <td>1. Factories, workshops, places of work or repair, manufacturing, assembly, maintenance and fabrication</td>
                      <td>6 months</td>
                      <td>Daily, or before every use, whichever is longer</td>
                      <td>6 months</td>
                      <td>12 months</td>
                      <td>12 months</td>
                    </tr>
                    <tr>
                      <td>2. Environment where the equipment or supply flexible cord is subjecting to flexing normal use OR is open to abuse OR is in a hostile environment</td>
                      <td>12 months</td>
                      <td>3 months</td>
                      <td>6 months</td>
                      <td>12 months</td>
                      <td>12 months</td>
                    </tr>
                    <tr>
                      <td>3. Environment where the equipment or supply cord is NOT subjecting to flexing in normal use and is NOT open to abuse and is NOT in a hostile environment</td>
                      <td>5 years</td>
                      <td>3 months</td>
                      <td>6 months</td>
                      <td>2 years</td>
                      <td>2 years</td>
                    </tr>
                    <tr>
                      <td>4. Residential type areas: hotel, residential institutions, motel, boarding houses, halls, hostel accommodations houses, and the like</td>
                      <td>2 years</td>
                      <td>6 months</td>
                      <td>6 months</td>
                      <td>2 years</td>
                      <td>2 years</td>
                    </tr>
                    <tr>
                      <td>5. Equipment used for commercial cleaning</td>
                      <td>6 Months</td>
                      <td>Daily, or before every use, whichever is longer</td>
                      <td>N/A</td>
                      <td>6 Months</td>
                      <td>N/A</td>
                    </tr>
                    <tr>
                      <td rowSpan={2}>6. Hire Equipment: Inspection / Test and Tag</td>
                      <td>prior to hire</td>
                      <td colSpan={2}>Including push-button test by hirer prior to hire</td>
                      <td>N/A</td>
                      <td>N/A</td>
                    </tr>
                    <tr>
                      <td>3 months</td>
                      <td colSpan={2}>N/A</td>
                      <td>3 months</td>
                      <td>12 months</td>
                    </tr>
                    <tr>
                      <td>7. Repaired, serviced and second-hand equipment</td>
                      <td colSpan={5}>After repair or service which could affect electrical safety, or on reintroduction to service, refer to AS/NZS 5762</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-top space-extra-bottom">
        <div className="container">
          <div className="title-area text-center">
            <h2 className="sec-title">Frequently Asked Questions (FAQ)</h2>
          </div>
          <div className="row gy-4">
            <div className="col-lg-6">
              <FaqAccordion items={faqItemsLeft} idPrefix="faq-left" defaultOpen={0} />
            </div>
            <div className="col-lg-6">
              <FaqAccordion items={faqItemsRight} idPrefix="faq-right" defaultOpen={1} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
