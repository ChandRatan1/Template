import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero/PageHero'
import { renderInline } from '../utils/inlineMarkup'
import { getServiceBySlug } from '../data/services'
import { company } from '../data/siteData'
import {
  relations,
  inspect,
  compulsory,
  newLaws,
  facts,
  kitchenBathroom,
  installedIn,
  faq,
  rental,
  includedExcluded,
} from '../data/smokeAlarm'
import './SmokeAlarmPage.css'

const service = getServiceBySlug('smoke-alarm-service-melbourne')

function PlainAccordionItem({ item, isOpen, onToggle }) {
  return (
    <div className={`plain-accordion-item${isOpen ? ' active' : ''}`}>
      <button className="plain-accordion-button" type="button" onClick={onToggle}>
        <span>{item.q}</span>
        <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'}`} />
      </button>
      {isOpen && (
        <div className="plain-accordion-body">
          <p>{item.a}</p>
          {item.note && (
            <p>
              <strong>Note: {item.note}</strong>
            </p>
          )}
          {item.list && (
            <ul>
              {item.list.map((li) => (
                <li key={li}>{li}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}

export default function SmokeAlarmPage() {
  const [openFaq, setOpenFaq] = useState(0)

  return (
    <>
      <PageHero title={service.pageTitle} current={service.navTitle} image={null} />

      <section className="space-top space-extra-bottom">
        <div className="container">
          {/* We at PowerQ... (dark card) */}
          <div className="smoke-theme-dark">
            <div className="row align-items-center gy-4">
              <div className="col-lg-6">
                <h2 className="sec-title text-white">{relations.heading}</h2>
                <p className="sec-text text-white">{renderInline(relations.paragraph)}</p>
              </div>
              <div className="col-lg-6">
                <img src={relations.image} alt="" className="w-100" style={{ borderRadius: 8 }} />
              </div>
            </div>
          </div>

          {/* Inspect and test (light card) */}
          <div className="smoke-theme-light">
            <div className="row align-items-center gy-4">
              <div className="col-lg-6">
                <img src={inspect.image} alt="" className="w-100" style={{ borderRadius: 8 }} />
              </div>
              <div className="col-lg-6">
                <h2 className="sec-title">{inspect.heading}</h2>
                <h3 className="h4">{inspect.subheading}</h3>
                <div className="list-style2">
                  <ul className="list-unstyled">
                    {inspect.points.map((p) => (
                      <li key={p}>
                        <i className="fas fa-check-circle text-theme me-2" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link to={inspect.cta.href} className="vs-btn mt-3">
                  {inspect.cta.text}
                  <i className="far fa-long-arrow-right" />
                </Link>
              </div>
            </div>
          </div>

          {/* Compulsory in every home */}
          <div className="title-area text-center">
            <h2 className="sec-title">{compulsory.heading}</h2>
            <p className="sec-text col-lg-9 mx-auto">{compulsory.subheading}</p>
          </div>
          <div className="row gy-4 mb-5">
            {compulsory.cards.map((card) => (
              <div className="col-md-4" key={card.text}>
                <div className="smoke-fact-card">
                  <i className={card.icon} />
                  <p>{card.text}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="sec-text text-center col-lg-9 mx-auto mb-5">{newLaws}</p>

          {/* Smoke alarm facts + overlay image */}
          <div className="row align-items-center gy-4 mb-5">
            <div className="col-lg-6">
              <h2 className="sec-title">{facts.heading}</h2>
              {facts.groups.map((group) => (
                <div key={group.lead} className="mb-3">
                  <p className="fw-bold mb-2">{group.lead}</p>
                  {group.items.map((item) => (
                    <div className="smoke-icon-fact" key={item.text}>
                      <span className="smoke-icon-fact-circle">
                        <i className={item.icon} />
                      </span>
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="col-lg-6">
              <div className="smoke-image-overlay-wrap">
                <img src={facts.image} alt="" className="w-100" style={{ borderRadius: 8 }} />
                <div className="smoke-image-overlay-card">
                  {facts.overlayItems.map((item) => (
                    <p key={item}>
                      <i className="fas fa-check-circle me-2" />
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Kitchens and bathrooms */}
          <div className="mb-5">
            <h2 className="sec-title">{kitchenBathroom.heading}</h2>
            {kitchenBathroom.points.map((p, i) => (
              <p className="sec-text" key={i}>
                <strong>{i + 1}.</strong> {p}
              </p>
            ))}
            <h2 className="sec-title mt-4">{kitchenBathroom.secondHeading}</h2>
            <p className="sec-text">
              <strong>3.</strong> {kitchenBathroom.point3}
            </p>
          </div>

          {/* Installed in */}
          <div className="mb-3">
            <h2 className="sec-title">{installedIn.heading}</h2>
          </div>
          <div className="row gy-4 mb-5">
            {installedIn.cards.map((card) => (
              <div className="col-md-6" key={card.title}>
                <div className="smoke-install-card">
                  <span className="smoke-install-icon">
                    <i className={card.icon} />
                  </span>
                  <h3 className="process-name">{card.title}</h3>
                  {card.text && <p className="process-text">{card.text}</p>}
                </div>
              </div>
            ))}
          </div>

          {/* FAQ (plain accordion) */}
          <div className="mb-5">
            <h2 className="sec-title text-center mb-4">{faq.heading}</h2>
            <div className="plain-accordion-box">
              {faq.items.map((item, i) => (
                <PlainAccordionItem
                  key={item.q}
                  item={item}
                  isOpen={openFaq === i}
                  onToggle={() => setOpenFaq(openFaq === i ? -1 : i)}
                />
              ))}
            </div>
          </div>

          {/* Rental properties */}
          <div className="mb-5">
            <h2 className="sec-title">{rental.heading}</h2>
            {rental.paragraphs.map((p, i) => (
              <p className="sec-text" key={i}>
                {p}
              </p>
            ))}
            {rental.footnotes.map((f) => (
              <p className="smoke-footnote" key={f}>
                {f}
              </p>
            ))}
          </div>

          {/* Included / excluded */}
          <div className="row gy-4">
            <div className="col-lg-6">
              <h2 className="sec-title">{includedExcluded.includedHeading}</h2>
              <div className="list-style2">
                <ul className="list-unstyled">
                  {includedExcluded.included.map((item) => (
                    <li key={item}>
                      <i className="fas fa-check text-theme me-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-lg-6">
              <h2 className="sec-title">{includedExcluded.excludedHeading}</h2>
              {includedExcluded.excluded.map((item) => (
                <p className="sec-text" key={item}>
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary space-top-extra space-extra-bottom text-center py-5">
        <div className="container">
          <h2 className="sec-title">Need {service.navTitle} in Melbourne?</h2>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <a href={company.phoneHref} className="vs-btn style2">
              {company.phoneDisplay}
            </a>
            <Link to="/request-a-quote" className="vs-btn">
              Request a Quote<i className="far fa-long-arrow-right" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
