import { Link } from 'react-router-dom'
import { bgStyle } from '../../utils/bg'

export default function PageHero({ title, current }) {
  return (
    <div
      className="breadcumb-wrapper"
      data-bg-src="/content-img/male-electrician-works-switchboard-with-electrical-connecting-cable_169016-15086.jpg"
      style={bgStyle('/content-img/male-electrician-works-switchboard-with-electrical-connecting-cable_169016-15086.jpg')}
    >
      <div className="container z-index-common">
        <div className="breadcumb-content">
          <h1 className="breadcumb-title">{title}</h1>
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
