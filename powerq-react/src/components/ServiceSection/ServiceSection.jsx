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
  cornerClip,
  cornerImage,
  imageContain,
  imagePair,
  overlayCard,
  secondHeading,
  list,
  dark,
  grayBandBefore,
  bannerText,
  detailCircles,
  fullWidthNote,
  closingNote,
  stretchImage,
}) {
  const HeadingTag = `h${headingLevel}`

  const textCol = (
    <div className={`${image || imagePair ? 'col-lg-6' : 'col-lg-10 mx-auto'} text-center text-lg-start`} key="text">
      {heading && <HeadingTag className={`sec-title${dark ? ' text-white' : ''}`}>{heading}</HeadingTag>}
      {boldLead && <p className={`sec-text fw-bold mb-2${dark ? ' text-white' : ''}`}>{boldLead}</p>}
      {paragraphs.map((p, i) => (
        <p className={`sec-text${dark ? ' text-white' : ''}`} key={i}>
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
      {secondHeading && <h3 className={`sec-title mt-4${dark ? ' text-white' : ''}`}>{secondHeading}</h3>}
      {list && (
        <ol className="service-plain-list">
          {list.map((item) => (
            <li key={item}>{renderInline(item)}</li>
          ))}
        </ol>
      )}
      {closingNote && <p className="sec-text fw-bold mt-2">{renderInline(closingNote)}</p>}
    </div>
  )

  const imageCol = (
    <div className="col-lg-6 service-image-col" key="image">
      {imagePair ? (
        <div className="service-image-pair">
          {imagePair.map((src, i) => (
            <img src={src} alt="" className="service-image-pair-item" key={i} />
          ))}
        </div>
      ) : (
        <div
          className={`service-image-wrap${cornerClip ? ' service-image-wrap-clipped' : ''}${imageContain ? ' service-image-wrap-contain' : ''}${stretchImage ? ' service-image-wrap-stretch' : ''}`}
        >
          <img src={image} alt={imageAlt} className="w-100" />
          {accentBar && <span className="service-accent-bar" aria-hidden="true" />}
          {cornerImage && <img src={cornerImage} alt="" className="service-corner-image" />}
          {overlayCard && (
            <div className="service-overlay-card">
              <p>{overlayCard.text}</p>
            </div>
          )}
          {detailCircles && (
            <div className="service-detail-circles">
              {detailCircles.map((src, i) => (
                <span className="service-detail-circle" key={i}>
                  <img src={src} alt="" />
                </span>
              ))}
            </div>
          )}
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
      )}
    </div>
  )

  const hasImageCol = image || imagePair

  const row = (
    <div className={`row ${stretchImage ? 'align-items-stretch' : 'align-items-start'} gy-4 service-section`}>
      {hasImageCol ? (imageSide === 'left' ? [imageCol, textCol] : [textCol, imageCol]) : textCol}
    </div>
  )

  const fullWidthNoteEl = fullWidthNote && (
    <p className={`sec-text service-full-width-note${dark ? ' text-white' : ''}`}>{renderInline(fullWidthNote)}</p>
  )

  return (
    <>
      {grayBandBefore && <div className="service-gray-band" />}
      {bannerText && (
        <div className="service-gray-band service-gray-band-text">
          <p>{bannerText}</p>
        </div>
      )}
      {dark ? (
        <div className="service-dark-band">
          {row}
          {fullWidthNoteEl}
        </div>
      ) : (
        <>
          {row}
          {fullWidthNoteEl}
        </>
      )}
    </>
  )
}
