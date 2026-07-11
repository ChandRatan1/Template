import { Link } from 'react-router-dom'
import { bgStyle } from '../utils/bg'
import { whyChoosePoints, whyChooseBanner, relationsSection, whoWeAre, aboutIntro, beatQuote, team } from '../data/about'
import './AboutPage.css'

export default function AboutPage() {
  return (
    <>
      {/* Why choose PowerQ (doubles as this page's hero — single background image, no separate title banner) */}
      <section
        className="about-why-banner"
        data-bg-src={whyChooseBanner.image}
        style={bgStyle(whyChooseBanner.image)}
      >
        <div className="container">
          <div className="breadcumb-menu-wrap about-why-breadcrumb">
            <ul className="breadcumb-menu">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>About Us</li>
            </ul>
          </div>
          <div className="title-area text-center mb-0">
            <h2 className="sec-title text-white">Why choose PowerQ for Test &amp; Tag in Melbourne</h2>
            <p className="sec-text col-lg-8 mx-auto text-white">
              PowerQ is the leading provider of testing and tagging services in Melbourne. Our conveniently
              scheduled after-hours services ensure safety for businesses, restaurants, workshops, offices, schools,
              shops and more. We conduct detailed electrical testing and tagging inspections for our clients so that
              their properties are up to code and fully compliant with occupational health and safety regulations.
            </p>
          </div>
        </div>
      </section>

      {/* Why choose PowerQ - cards */}
      <section className="space-extra-bottom about-why-cards-section">
        <div className="container">
          <div className="row gy-4 about-why-cards-row">
            {whyChoosePoints.map((point) => (
              <div className="col-md-6 col-lg-3" key={point.title}>
                <div className="process-style1 about-hover-card text-center">
                  {point.icon && (
                    <div className="about-why-icon" style={point.iconColor ? { color: point.iconColor } : undefined}>
                      <i className={point.icon} />
                    </div>
                  )}
                  <h3 className="process-name">{point.title}</h3>
                  <p className="process-text">{point.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Relations */}
      <section className="bg-secondary space-top space-extra-bottom">
        <div className="container">
          <div className="row align-items-start gx-100">
            <div className="col-lg-6 text-center mb-4 mb-lg-0">
              <img src={relationsSection.image} alt="" className="w-100" style={{ borderRadius: 8 }} />
            </div>
            <div className="col-lg-6 text-center text-lg-start">
              <div className="title-area mb-0">
                <span className="sec-subtitle">Our Promise</span>
                <h2 className="sec-title">{relationsSection.title}</h2>
                <p className="sec-text">{relationsSection.paragraph}</p>
                <Link to="/request-a-quote" className="vs-btn">
                  Get a Quote<i className="far fa-long-arrow-right" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who we are */}
      <section className="space-top space-extra-bottom">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-9 text-center">
              <span className="sec-subtitle">Who We Are</span>
              <h2 className="sec-title">{whoWeAre.title}</h2>
              <p className="sec-text">{whoWeAre.paragraph}</p>
            </div>
          </div>
        </div>
      </section>

      {/* About intro */}
      <section className="bg-secondary space-top space-extra-bottom">
        <div className="container">
          <div className="row align-items-start gx-100">
            <div className="col-lg-6 text-center text-lg-start order-lg-2">
              <img src={aboutIntro.image} alt="" className="w-100" style={{ borderRadius: 8 }} />
            </div>
            <div className="col-lg-6 text-center text-lg-start order-lg-1">
              <div className="title-area mb-0">
                <span className="sec-subtitle">{aboutIntro.title}</span>
                <h2 className="sec-title">24/7 Testing &amp; Tagging Services</h2>
                <p className="sec-text">{aboutIntro.paragraph}</p>
                <Link to="/contact-us" className="vs-btn">
                  Contact us<i className="far fa-long-arrow-right" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Beat any quote */}
      <section className="space-top space-extra-bottom">
        <div className="container text-center">
          <div className="title-area">
            <span className="sec-subtitle">Best Value</span>
            <h2 className="sec-title">{beatQuote.title}</h2>
            <p className="sec-text col-lg-8 mx-auto">{beatQuote.paragraph}</p>
          </div>
          <div className="row justify-content-center gy-3">
            {beatQuote.points.map((point) => (
              <div className="col-md-4" key={point}>
                <p className="fw-bold mb-0">
                  <i className="fas fa-check-circle text-theme me-2" />
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-secondary space-top space-extra-bottom">
        <div className="container">
          <div className="title-area text-center">
            <span className="sec-subtitle">Our Team</span>
            <h2 className="sec-title">Meet Our Fearless Firefighters</h2>
            <p className="sec-text col-lg-8 mx-auto">
              Our team of dedicated firefighters is always ready to protect and serve, ensuring your safety with
              unmatched courage and commitment. Trained to handle any emergency, they are the first line of defense
              when it comes to fire prevention and response.
            </p>
          </div>
          <div className="row gy-4">
            {team.map((member) => (
              <div className="col-md-6 col-lg-3" key={member.name}>
                <div className="team-style1">
                  <div className="team-img">
                    <img src={member.image} alt={member.name} />
                  </div>
                  <div className="team-content">
                    <h3 className="team-name">{member.name}</h3>
                    <span className="team-degi">{member.role}</span>
                    <p className="sec-text mt-2">{member.bio}</p>
                    <p className="mb-0">
                      <a href={`tel:${member.phone}`} className="text-reset d-block">
                        {member.phone}
                      </a>
                      <a href={`mailto:${member.email}`} className="text-reset">
                        {member.email}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
