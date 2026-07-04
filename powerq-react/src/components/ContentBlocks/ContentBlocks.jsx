import { Link } from 'react-router-dom'

function isInternal(href) {
  return typeof href === 'string' && href.startsWith('/')
}

function SmartLink({ href, className, children }) {
  if (isInternal(href)) {
    return (
      <Link to={href} className={className}>
        {children}
      </Link>
    )
  }
  return (
    <a href={href} className={className} target={href?.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
      {children}
    </a>
  )
}

export default function ContentBlocks({ blocks }) {
  return (
    <>
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`
        switch (block.type) {
          case 'heading': {
            const level = block.level || 2
            const Tag = `h${level}`
            return (
              <Tag className="sec-title" key={key}>
                {block.text}
              </Tag>
            )
          }
          case 'paragraph':
            return (
              <p className="sec-text" key={key}>
                {block.text}
                {block.linkText && (
                  <>
                    {' '}
                    <SmartLink href={block.linkHref}>{block.linkText}</SmartLink>
                  </>
                )}
              </p>
            )
          case 'list':
            return (
              <div className="list-style2" key={key}>
                <ul className="list-unstyled">
                  {block.items.map((item) => (
                    <li key={item}>
                      <img src="/assets/img/icon/arrow-right-box.svg" alt="" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )
          case 'image':
            return (
              <div className="mb-30" key={key}>
                <img src={block.src} alt={block.alt || ''} className="w-100" style={{ borderRadius: 8 }} />
              </div>
            )
          case 'stat':
            return (
              <div className="exp-box d-inline-block mb-30" key={key}>
                <p className="exp-year">{block.value}</p>
                <p className="exp-text">{block.label}</p>
              </div>
            )
          case 'cta':
            return (
              <div className="mb-30" key={key}>
                <SmartLink href={block.href} className="vs-btn">
                  {block.text}
                  <i className="far fa-long-arrow-right" />
                </SmartLink>
              </div>
            )
          case 'miniFaq':
            return (
              <div className="mb-30" key={key}>
                {block.items.map((item) => (
                  <div key={item.q} className="mb-20">
                    <h4 className="h6">{item.q}</h4>
                    <p className="sec-text">{item.a}</p>
                  </div>
                ))}
              </div>
            )
          default:
            return null
        }
      })}
    </>
  )
}
