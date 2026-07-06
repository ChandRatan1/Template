import { Link } from 'react-router-dom'
import { bgStyle } from '../../utils/bg'
import './PageHero.css'

const DEFAULT_IMAGE = '/content-img/male-electrician-works-switchboard-with-electrical-connecting-cable_169016-15086.jpg'

export default function PageHero({ title, current, image = DEFAULT_IMAGE, description }) {
  return (
    <div
      className={`breadcumb-wrapper${image ? '' : ' breadcumb-wrapper-solid'}`}
      data-bg-src={image || undefined}
      style={image ? bgStyle(image) : undefined}
    >
      <div className="container z-index-common text-center">
        <div className="breadcumb-content">
          <h1 className="breadcumb-title">{title}</h1>
          {description && <p className="breadcumb-description">{description}</p>}
        </div>
        <div className="breadcumb-menu-wrap">
          <ul className="breadcumb-menu">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>{current}</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
