import { Link, NavLink } from 'react-router-dom'
import { company, socialLinks, footerLinks } from '../../data/siteData'
import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  const contactRows = [
    { icon: 'fas fa-phone-alt', href: company.phoneHref, text: company.phoneDisplay },
    { icon: 'fas fa-envelope', href: `mailto:${company.email}`, text: company.email },
    { icon: 'fas fa-map-marker-alt', href: company.footerMapHref, text: company.footerAddress },
  ]

  return (
    <footer className="footer-wrapper footer-layout1 site-footer">
      <div className="widget-area">
        <div className="container-fluid footer-container">
          <div className="row gy-4">
            <div className="col-md-6 col-lg-3">
              <div className="widget footer-widget">
                <Link to="/">
                  <img src={company.footerLogo} alt={`${company.name} logo`} style={{ maxWidth: 285, marginBottom: 16 }} />
                </Link>
                <p className="footer-text">{company.footerTagline}</p>
                <div className="social-style1">
                  {socialLinks.map((social) => (
                    <a key={social.label} href={social.href} target="_blank" rel="noreferrer" aria-label={social.label}>
                      <i className={social.icon} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="widget footer-widget">
                <h3 className="widget_title">Contact Info</h3>
                <ul className="footer-contact-list">
                  {contactRows.map((row) => (
                    <li key={row.text}>
                      <a href={row.href} target={row.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                        <i className={row.icon} />
                        <span>{row.text}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="col-md-6 col-lg-2">
              <div className="widget widget_nav_menu footer-widget">
                <h3 className="widget_title">Services</h3>
                <ul className="menu">
                  {footerLinks.services.map((link) => (
                    <li key={link.label}>
                      <NavLink to={link.href}>{link.label}</NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="col-md-6 col-lg-2">
              <div className="widget widget_pages footer-widget">
                <h3 className="widget_title">General Links</h3>
                <ul>
                  {footerLinks.general.map((link) => (
                    <li key={link.label}>
                      <NavLink to={link.href} end={link.href === '/'}>
                        {link.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="col-md-6 col-lg-2">
              <div className="widget widget_pages footer-widget">
                <h3 className="widget_title">Useful Links</h3>
                <ul>
                  {footerLinks.useful.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} target="_blank" rel="noreferrer">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright-wrap">
        <div className="container-fluid footer-container">
          <p className="copyright-text">
            copyright <i className="fal fa-copyright" /> {year} By {company.name}, created By{' '}
            <a href="https://ndminfotech.com/" target="_blank" rel="noreferrer" className="copyright-credit">
              NDM Infotech
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
