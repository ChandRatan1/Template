import { useState } from 'react'
import { Link } from 'react-router-dom'
import QuoteForm from '../components/QuoteForm/QuoteForm'
import { bgStyle } from '../utils/bg'
import {
  hero,
  whyChooseIcons,
  topServices,
  pricingIntro,
  pricingHighlights,
  specializeBanner,
  pricingTiers,
  safetyStats,
  whyChooseLong,
  featureHighlights,
  expertise,
  serviceHighlights,
  testimonials,
} from '../data/home'
import usePageTitle from '../hooks/usePageTitle'
import './HomePage.css'

const TESTIMONIALS_VISIBLE = 3

function WhyChooseSection() {
  return (
    <section className="space-top space-bottom">
      <div className="container">
        <div className="title-area text-center">
          <h2 className="sec-title">{whyChooseLong.title}</h2>
        </div>
        <div className="row align-items-start gx-100">
          <div className="col-lg-6 text-center mb-4 mb-lg-0">
            <img src={whyChooseLong.image} alt="" className="w-100" style={{ borderRadius: 8 }} />
          </div>
          <div className="col-lg-6 text-center text-lg-start">
            <div className="title-area mb-0">
              {whyChooseLong.paragraphs.map((p, i) => (
                <p className="sec-text" key={i}>
                  {p.includes(whyChooseLong.linkText) ? (
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
  )
}

export default function HomePage() {
  usePageTitle('PowerQ - Professional Test and Tag Services in Melbourne')
  const [testimonialIndex, setTestimonialIndex] = useState(0)
  const visibleTestimonials = Array.from({ length: TESTIMONIALS_VISIBLE }, (_, i) => testimonials[(testimonialIndex + i) % testimonials.length])
  const nextTestimonial = () => setTestimonialIndex((i) => (i + 1) % testimonials.length)
  const prevTestimonial = () => setTestimonialIndex((i) => (i - 1 + testimonials.length) % testimonials.length)

  return (
    <>
      {/* Hero + Quote form (merged, matching reference) */}
      <section
        className="home-hero"
        data-bg-src="/content-img/man-electrical-technician-working-switchboard-with-fuses_169016-24062.avif"
        style={bgStyle('/content-img/man-electrical-technician-working-switchboard-with-fuses_169016-24062.avif')}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
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
            <div className="col-lg-6">
              <QuoteForm title="Request a free Quote" className="form-style1 home-quote-form" showLabels />
            </div>
          </div>
        </div>
      </section>

      {/* Why choose PowerQ - icon strip */}
      <section className="why-choose-strip">
        <div className="container">
          <div className="row gy-3 justify-content-center">
            {whyChooseIcons.map((item) => (
              <div className="col-6 col-md-4 col-lg-2" key={item.label}>
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
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Plans banner */}
      <section
        className="pricing-intro"
        data-bg-src={pricingIntro.image}
        style={bgStyle(pricingIntro.image)}
      >
        <div className="container text-center">
          <span className="sec-subtitle pricing-intro-subtitle">{pricingIntro.subtitle}</span>
          <h2 className="sec-title text-white">{pricingIntro.title}</h2>
          <h3 className="pricing-section-title-white">{pricingHighlights.title}</h3>
        </div>
      </section>

      {/* Pricing Highlights */}
      <section className="pricing-cards-section space-extra-bottom">
        <div className="container">
          <div className="row gy-4 justify-content-center pricing-cards-overlap">
            {pricingTiers.tiers.map((tier) => (
              <div className="col-md-6 col-lg-3" key={tier.name}>
                <div className="pricing-tier-card h-100">
                  <div className="pricing-tier-header">
                    <h3 className="pricing-tier-name">{tier.name}</h3>
                    <p className="pricing-tier-range">{tier.range}</p>
                    <p className="pricing-tier-minfee">{tier.minFee}</p>
                  </div>
                  <div className="pricing-tier-body">
                    <p className="pricing-tier-price">
                      {tier.price}
                      <span>{tier.unit}</span>
                    </p>
                    <ul className="pricing-tier-features">
                      {tier.features.map((f) => (
                        <li key={f}>
                          <i className="fas fa-check-circle" /> {f}
                        </li>
                      ))}
                    </ul>
                    <Link to={pricingTiers.ctaHref} className="vs-btn">
                      {pricingTiers.ctaText}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <Link to="/cost-of-test-tag-in-melbourne" className="vs-btn">
              View Full Pricing<i className="far fa-long-arrow-right" />
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Highlight Checklist Cards */}
      <section className="space-extra-bottom">
        <div className="container">
          <h3 className="pricing-highlight-heading">{pricingHighlights.title}</h3>
          <div className="row gy-4">
            {pricingHighlights.cards.map((items, i) => (
              <div className="col-md-6 col-lg-3" key={i}>
                <div className="pricing-highlight-card h-100">
                  <ul className="pricing-highlight-checklist">
                    {items.map((item) => (
                      <li key={item}>
                        <span className="pricing-highlight-check">✅</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialize banner */}
      <section className="specialize-banner" data-bg-src={specializeBanner.image} style={bgStyle(specializeBanner.image)}>
        <div className="container text-center">
          <h2 className="sec-title text-white mb-4 specialize-banner-heading">{specializeBanner.title}</h2>
          <p className="sec-text text-white specialize-banner-text">
            {specializeBanner.paragraph.split(specializeBanner.linkText)[0]}
            <Link to={specializeBanner.linkHref} className="specialize-banner-link">
              {specializeBanner.linkText}
            </Link>
            {specializeBanner.paragraph.split(specializeBanner.linkText)[1]}
          </p>
          <Link to="/request-a-quote" className="vs-btn">
            Request A Quote
          </Link>
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

      {/* Feature Highlights */}
      <section className="bg-secondary space-top space-extra-bottom">
        <div className="container">
          <div className="row gy-4">
            {featureHighlights.map((f) => (
              <div className="col-md-6 col-lg-3" key={f.title}>
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
                  <div className="expertise-card-img-wrap">
                    <img src={e.image} alt={e.title} />
                  </div>
                  <h3 className="expertise-card-title">{e.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Highlights */}
      <section
        className="service-highlights-band space-top space-extra-bottom"
        data-bg-src="/content-img/man-electrical-technician-working-switchboard-with-fuses_169016-24062.avif"
        style={bgStyle('/content-img/man-electrical-technician-working-switchboard-with-fuses_169016-24062.avif')}
      >
        <div className="container">
          <div className="title-area">
            <h2 className="sec-title text-white service-highlights-heading">PowerQ Test and Tag Services</h2>
          </div>
          <div className="service-highlights-grid">
            {serviceHighlights.map((s) => (
              <div className="service-highlights-grid-item" key={s.title}>
                <Link to={s.href} className="flip-card">
                  <div className="flip-card-inner">
                    <div className="flip-card-front">
                      <img src={s.image} alt={s.title} />
                      <h3 className="flip-card-title h6">{s.title}</h3>
                    </div>
                    <div className="flip-card-back">
                      <p>{s.text}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WhyChooseSection />

      {/* Services all over Melbourne banner */}
      <section className="services-everywhere-band">
        <div className="container text-center">
          <h2 className="sec-title text-white mb-4">We offer our services all over Melbourne</h2>
          <Link to="/request-a-quote" className="vs-btn">
            Request a Quote<i className="far fa-arrow-right" />
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="google-reviews-section">
        <div className="container">
          <div className="title-area mb-0">
            <h2 className="sec-title">What Our Client Say-</h2>
          </div>
          <div className="google-reviews-row">
            <button className="google-reviews-nav google-reviews-prev" onClick={prevTestimonial} aria-label="Show previous review">
              <i className="fas fa-chevron-left" />
            </button>
            {visibleTestimonials.map((t, i) => (
              <GoogleReviewCard key={`${t.name}-${i}`} testimonial={t} />
            ))}
            <button className="google-reviews-nav google-reviews-next" onClick={nextTestimonial} aria-label="Show next review">
              <i className="fas fa-chevron-right" />
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

const TESTIMONIAL_TRUNCATE_LENGTH = 140

function GoogleReviewCard({ testimonial }) {
  const [expanded, setExpanded] = useState(false)
  const isLong = testimonial.text.length > TESTIMONIAL_TRUNCATE_LENGTH
  const shownText = expanded || !isLong ? testimonial.text : `${testimonial.text.slice(0, TESTIMONIAL_TRUNCATE_LENGTH)}…`

  return (
    <div className="google-review-card">
      <div className="google-review-avatar" style={{ backgroundColor: testimonial.avatarColor }}>
        {testimonial.initial}
        <span className="google-review-badge">
          <GoogleGIcon />
        </span>
      </div>
      <p className="google-review-name">{testimonial.name}</p>
      <p className="google-review-time">{testimonial.timeAgo}</p>
      <div className="google-review-stars">
        <i className="fas fa-star" />
        <i className="fas fa-star" />
        <i className="fas fa-star" />
        <i className="fas fa-star" />
        <i className="fas fa-star" />
        <span className="google-review-verified">
          <i className="fas fa-check" />
        </span>
      </div>
      <p className="google-review-text">
        {shownText}
        {isLong && !expanded && (
          <>
            {' '}
            <button className="google-review-more" onClick={() => setExpanded(true)}>
              Read more
            </button>
          </>
        )}
      </p>
    </div>
  )
}

function GoogleGIcon() {
  return (
    <svg viewBox="0 0 48 48" width="100%" height="100%" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"
      />
      <path
        fill="#34A853"
        d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"
      />
      <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34A21.93 21.93 0 0 0 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z" />
      <path
        fill="#EA4335"
        d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"
      />
    </svg>
  )
}
