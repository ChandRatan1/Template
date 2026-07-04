import { Link } from 'react-router-dom'
import QuoteForm from '../components/QuoteForm/QuoteForm'
import { bgStyle } from '../utils/bg'
import {
  hero,
  whyChooseIcons,
  topServices,
  pricingHighlights,
  safetyStats,
  whyChooseLong,
  featureHighlights,
  expertise,
  serviceHighlights,
  timeline,
  testimonials,
} from '../data/home'
import './HomePage.css'

export default function HomePage() {
  return (
    <>
      {/* Hero + Quote form (merged, matching reference) */}
      <section className="home-hero" data-bg-src="/content-img/electrician-working_53876-16064.jpg" style={bgStyle('/content-img/electrician-working_53876-16064.jpg')}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <h1 className="home-hero-title">{hero.title}</h1>
              <div className="home-hero-btns">
                <a href={hero.callHref} className="vs-btn style4">
                  <i className="fas fa-phone-alt" /> {hero.callText}
                </a>
                <Link to={hero.bookHref} className="vs-btn">
                  <i className="fas fa-user-check" /> {hero.bookText}
                </Link>
              </div>
            </div>
            <div className="col-lg-5">
              <QuoteForm title="Request a free Quote" />
            </div>
          </div>
        </div>
      </section>

      {/* Why choose PowerQ - icon strip */}
      <section className="why-choose-strip">
        <div className="container">
          <div className="row gy-3 justify-content-center">
            {whyChooseIcons.map((item) => (
              <div className="col-6 col-md-4 col-lg-2 text-center" key={item.label}>
                <div className="why-choose-icon">
                  <i className={item.icon} />
                </div>
                <p className="why-choose-label">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Services */}
      <section className="position-relative bg-secondary space-top space-extra-bottom" data-bg-src="/assets/img/bg/sr-bg-1-2.png" style={bgStyle('/assets/img/bg/sr-bg-1-2.png')}>
        <div className="container">
          <div className="title-area text-center">
            <span className="sec-subtitle2">Services</span>
            <h2 className="sec-title">Our Top Services</h2>
          </div>
          <div className="row gy-4 justify-content-center">
            {topServices.map((service) => (
              <div className="col-xl-3 col-md-6" key={service.title}>
                <div className="service-style1">
                  <div className="service-img">
                    <img src={service.image} alt={service.title} />
                  </div>
                  <div className="service-content">
                    <div className="service-body">
                      <h3 className="service-title h5">
                        <Link to={service.href} className="text-inherit">
                          {service.title}
                        </Link>
                      </h3>
                      <Link to={service.href} className="vs-btn">
                        {service.ctaText}
                        <i className="far fa-long-arrow-right" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Highlights */}
      <section className="space-top space-extra-bottom">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-8">
              <div className="title-area text-center">
                <span className="sec-subtitle">Pricing Plans</span>
                <h2 className="sec-title">{pricingHighlights.title}</h2>
              </div>
              <div className="pricing-highlight-box">
                <ul className="pricing-highlight-list">
                  {pricingHighlights.items.map((item) => {
                    const [label, price] = item.split(' - ')
                    return (
                      <li key={item}>
                        <span>{label}</span>
                        <span className="text-theme">{price}</span>
                      </li>
                    )
                  })}
                </ul>
                <p className="mt-3 mb-0 text-center">
                  <small>{pricingHighlights.note}</small>
                </p>
              </div>
              <div className="text-center mt-4">
                <Link to="/cost-of-test-tag-in-melbourne" className="vs-btn">
                  View Full Pricing<i className="far fa-long-arrow-right" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Assurance Stats */}
      <section className="bg-secondary space-top space-extra-bottom">
        <div className="container">
          <div className="title-area text-center">
            <span className="sec-subtitle">Safety Assurance</span>
            <h2 className="sec-title">Commitment to Public Safety</h2>
            <p className="sec-text col-lg-8 mx-auto">
              We are unwavering in our commitment to public safety. We understand that electrical hazards can pose
              serious risks to individuals and property, which is why we prioritize the safety and well-being of our
              employees, clients, and the community.
            </p>
          </div>
          <div className="row gy-4">
            {safetyStats.map((stat) => (
              <div className="col-md-6 col-lg-3" key={stat.title}>
                <div className="stat-card">
                  <div className="stat-percent">{stat.percent}%</div>
                  <h3 className="h5">{stat.title}</h3>
                  <p className="sec-text">{stat.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose PowerQ (long) */}
      <section className="about-wrap1 space-top space-bottom">
        <div className="container">
          <div className="row align-items-center gx-100">
            <div className="col-lg-6 text-center mb-4 mb-lg-0">
              <img src={whyChooseLong.image} alt="" className="w-100" style={{ borderRadius: 8 }} />
            </div>
            <div className="col-lg-6 text-center text-lg-start">
              <div className="title-area mb-0">
                <span className="sec-subtitle">Why Choose Us</span>
                <h2 className="sec-title">{whyChooseLong.title}</h2>
                {whyChooseLong.paragraphs.map((p, i) => (
                  <p className="sec-text" key={i}>
                    {i === whyChooseLong.paragraphs.length - 1 ? (
                      <>
                        {p.split(whyChooseLong.linkText)[0]}
                        <a href={whyChooseLong.linkHref} target="_blank" rel="noreferrer">
                          {whyChooseLong.linkText}
                        </a>
                        {p.split(whyChooseLong.linkText)[1]}
                      </>
                    ) : (
                      p
                    )}
                  </p>
                ))}
                <Link to="/request-a-quote" className="vs-btn">
                  Request a Quote<i className="far fa-arrow-right" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="bg-secondary space-top space-extra-bottom">
        <div className="container">
          <div className="row gy-4">
            {featureHighlights.map((f) => (
              <div className="col-md-4" key={f.title}>
                <div className="process-style1">
                  <h3 className="process-name">{f.title}</h3>
                  <p className="process-text">{f.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="space-top space-extra-bottom">
        <div className="container">
          <div className="title-area text-center">
            <span className="sec-subtitle">Our Expertise</span>
            <h2 className="sec-title">Commercial, Industrial &amp; Residential</h2>
          </div>
          <div className="row gy-4">
            {expertise.map((e) => (
              <div className="col-md-4" key={e.title}>
                <div className="expertise-card">
                  <img src={e.image} alt={e.title} />
                  <h3 className="expertise-card-title">{e.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Highlights */}
      <section className="bg-secondary space-top space-extra-bottom">
        <div className="container">
          <div className="title-area text-center">
            <span className="sec-subtitle">Our Services</span>
            <h2 className="sec-title">PowerQ Test and Tag Services</h2>
          </div>
          <div className="row gy-4">
            {serviceHighlights.map((s) => (
              <div className="col-md-6 col-lg-4" key={s.title}>
                <div className="blog-style1">
                  <div className="blog-img">
                    <img src={s.image} alt={s.title} />
                  </div>
                  <div className="blog-content">
                    <h3 className="blog-title h5">
                      <Link to={s.href} className="text-inherit">
                        {s.title}
                      </Link>
                    </h3>
                    <p className="blog-text">{s.text}</p>
                    <Link to={s.href} className="blog-btn">
                      Learn more<i className="fas fa-arrow-right" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="space-top space-extra-bottom">
        <div className="container">
          <div className="title-area text-center">
            <span className="sec-subtitle">How It Works</span>
            <h2 className="sec-title">Getting Started Is Easy</h2>
            <p className="sec-text col-lg-8 mx-auto">
              Getting started with our Test &amp; Tag services is simple and hassle-free. Just reach out to PowerQ,
              and our expert team will schedule a convenient time for you.
            </p>
          </div>
          <div className="row gy-4">
            {timeline.map((step) => (
              <div className="col-md-6 col-lg-3" key={step.date}>
                <div className="timeline-card">
                  <img src={step.image} alt={step.title} />
                  <span className="timeline-date">{step.date}</span>
                  <h3 className="h6">{step.title}</h3>
                  <p className="sec-text">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-secondary space-top space-extra-bottom">
        <div className="container">
          <div className="title-area text-center">
            <span className="sec-subtitle">Testimonials</span>
            <h2 className="sec-title">What Our Clients Say</h2>
          </div>
          <div className="row gy-4">
            {testimonials.map((t) => (
              <div className="col-md-6 col-lg-4" key={t.name}>
                <div className="testimonial-grid-card">
                  <div className="testi-star">
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                  </div>
                  <p>&ldquo;{t.text}&rdquo;</p>
                  <p className="testimonial-grid-name">{t.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
