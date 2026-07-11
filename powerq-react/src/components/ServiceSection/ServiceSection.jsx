import { Link } from 'react-router-dom'
import { renderInline } from '../../utils/inlineMarkup'
import './ServiceSection.css'

function isInternal(href) {
  return typeof href === 'string' && href.startsWith('/')
}

function CtaButton({ cta }) {
  if (!cta) return null
  const content = (
    <>
      {cta.text}
      <i className="far fa-long-arrow-right" />
    </>
  )
  return isInternal(cta.href) ? (
    <Link to={cta.href} className="vs-btn">
      {content}
    </Link>
  ) : (
    <a href={cta.href} className="vs-btn" target="_blank" rel="noreferrer">
      {content}
    </a>
  )
}

export default function ServiceSection({
  heading,
  headingLevel = 2,
  boldLead,
  paragraphs = [],
  numberedList,
  boldNote,
  cta,
  centerCta,
  image,
  imageAlt = '',
  imageSide = 'right',
  statCard,
  accentBar,
  grayBandBefore,
  bannerText,
}) {
  const HeadingTag = `h${headingLevel}`

  const textCol = (
    <div className="col-lg-6 text-center text-lg-start" key="text">
      {heading && <HeadingTag className="sec-title">{heading}</HeadingTag>}
      {boldLead && <p className="sec-text fw-bold mb-2">{boldLead}</p>}
      {paragraphs.map((p, i) => (
        <p className="sec-text" key={i}>
          {renderInline(p)}
        </p>
      ))}
      {numberedList &&
        numberedList.map((item, i) => (
          <p className="sec-text" key={i}>
            <strong>
              {i + 1}. {item.label}
              {item.label.endsWith(':') ? '' : ':'}
            </strong>{' '}
            {renderInline(item.text)}
          </p>
        ))}
      {boldNote && <p className="sec-text fw-bold">{boldNote}</p>}
      {cta && <div className={centerCta ? 'text-center' : ''}>{<CtaButton cta={cta} />}</div>}
    </div>
  )

  const imageCol = (
    <div className="col-lg-6 service-image-col" key="image">
      <div className="service-image-wrap">
        <img src={image} alt={imageAlt} className="w-100" style={{ borderRadius: 8 }} />
        {accentBar && <span className="service-accent-bar" aria-hidden="true" />}
        {statCard && (
          <div className="service-stat-card">
            <img src={statCard.image} alt="" />
            <div>
              <p className="service-stat-value">{statCard.value}</p>
              <p className="service-stat-label">{statCard.label}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <>
      {grayBandBefore && <div className="service-gray-band" />}
      {bannerText && (
        <div className="service-gray-band service-gray-band-text">
          <p>{bannerText}</p>
        </div>
      )}
      <div className="row align-items-start gy-4 service-section">
        {imageSide === 'left' ? [imageCol, textCol] : [textCol, imageCol]}
      </div>
    </>
  )
}
