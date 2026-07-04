import { Link } from 'react-router-dom'
import { company, socialLinks, footerLinks } from '../../data/siteData'
import { bgStyle } from '../../utils/bg'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="footer-wrapper footer-layout1 bg-title"
      data-bg-src="/assets/img/bg/footer-bg-1-1.png"
      style={bgStyle('/assets/img/bg/footer-bg-1-1.png')}
    >
      <div className="container">
        <div className="footer-top">
          <div className="row align-items-center justify-content-center justify-content-md-between text-center text-md-start gy-4">
            <div className="col-md-4 col-lg-auto">
              <Link to="/">
                <img src={company.footerLogo} alt={`${company.name} logo`} style={{ maxWidth: 180 }} />
              </Link>
            </div>
            <div className="col-auto">
              <div className="media-style2">
                <div className="media-icon">
                  <img src="/assets/img/call-i.svg" alt="call icon" />
                </div>
                <div className="media-body">
                  <p className="media-title">Call any time</p>
                  <p className="media-text">
                    <a href={company.phoneHref} className="text-reset">
                      {company.phoneDisplay}
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-auto">
              <div className="social-style1">
                {socialLinks.map((social) => (
                  <a key={social.label} href={social.href} target="_blank" rel="noreferrer" aria-label={social.label}>
                    <i className={social.icon} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="widget-area">
        <div className="container">
          <div className="row justify-content-xl-between">
            <div className="col-md-6 col-xl-auto">
              <div className="widget footer-widget">
                <h3 className="widget_title">About</h3>
                <p className="footer-text" style={{ maxWidth: 280 }}>
                  {company.footerTagline}
                </p>
              </div>
            </div>

            <div className="col-md-6 col-xl-auto">
              <div className="widget widget_nav_menu footer-widget">
                <h3 className="widget_title">Services</h3>
                <div className="menu-all-pages-container footer-menu">
                  <ul className="menu">
                    {footerLinks.services.map((link) => (
                      <li key={link.label}>
                        <Link to={link.href}>{link.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-xl-auto">
              <div className="widget widget_pages footer-widget">
                <h3 className="widget_title">General Links</h3>
                <ul>
                  {footerLinks.general.map((link) => (
                    <li key={link.label}>
                      <Link to={link.href}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="col-md-6 col-xl-auto">
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

            <div className="col-md-6 col-xl-auto">
              <div className="widget footer-widget">
                <h3 className="widget_title">Contact Info</h3>
                <div className="footer-table">
                  <table>
                    <tbody>
                      <tr>
                        <td>Phone</td>
                        <td>
                          <a href={company.phoneHref} className="text-reset">
                            {company.phoneDisplay}
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td>
                          <a href={`mailto:${company.email}`} className="text-reset">
                            {company.email}
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td>Address</td>
                        <td>
                          <a href={company.mapHref} className="text-reset" target="_blank" rel="noreferrer">
                            {company.address}
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright-wrap">
        <div className="container">
          <div className="row align-items-center justify-content-between text-center text-md-start gy-2 flex-row-reverse">
            <div className="col-md-auto">
              <div className="copyright-menu">
                <ul>
                  <li>
                    <a href="https://www.powerq.com.au/privacy-policy-2/" target="_blank" rel="noreferrer">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="https://www.powerq.com.au/terms-conditions/" target="_blank" rel="noreferrer">
                      Terms &amp; Conditions
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-auto">
              <p className="copyright-text">
                copyright <i className="fal fa-copyright" /> {year} By {company.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
