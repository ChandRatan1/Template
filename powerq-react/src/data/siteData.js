export const company = {
  name: 'PowerQ',
  logo: '/content-img/powerq-logo-300x76.png',
  footerLogo: '/content-img/download-6-300x115.png',
  phoneDisplay: '0433SAFETY / 0433723389',
  phoneHref: 'tel:0433723389',
  email: 'info@powerq.com.au',
  address: '43 Wonnangatta Crescent, Weir Views VIC 3338',
  mapHref: 'https://www.google.com/maps/search/?q=43+Wonnangatta+Crescent,+Weir+Views+VIC+3338',
  footerTagline:
    'At PowerQ, we specialize in providing top-quality fire extinguishers and comprehensive fire safety services. Whether you’re looking to purchase reliable fire protection equipment or need expert installation and maintenance, we’ve got you covered.',
}

export const socialLinks = [
  { label: 'Facebook', icon: 'fab fa-facebook-f', href: 'https://www.facebook.com/profile.php?id=100033794081903' },
  { label: 'Instagram', icon: 'fab fa-instagram', href: 'https://www.instagram.com/powerqtestandtag/' },
  { label: 'LinkedIn', icon: 'fab fa-linkedin-in', href: 'https://www.linkedin.com/company/powerq-test-and-tag-melbourne/' },
]

export const serviceNavLinks = [
  { label: 'Electrical test and tag', href: '/electrical-test-and-tag-in-melbourne' },
  { label: 'Fire Extinguishers', href: '/fire-extinguisher-melbourne' },
  { label: 'RCD/Safety Switches', href: '/rcd-safety-switches-in-melbourne' },
  { label: 'Three Phase Testing', href: '/three-phase-testing-melbourne' },
  { label: 'Microwave Testing', href: '/microwave-testing-in-melbourne' },
  { label: 'Emergency Exit Light Testing', href: '/emergency-exit-light-testing-in-melbourne' },
  { label: 'Smoke Alarm Service', href: '/smoke-alarm-service-melbourne' },
]

export const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About us', href: '/about-us' },
  { label: 'Service', href: '#', children: serviceNavLinks },
  { label: 'Pricing', href: '/cost-of-test-tag-in-melbourne' },
  { label: 'Faq', href: '/faq' },
  { label: 'Request a Quote', href: '/request-a-quote' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact us', href: '/contact-us' },
]

export const footerLinks = {
  services: serviceNavLinks.slice(1),
  general: [
    { label: 'Home', href: '/' },
    { label: 'About us', href: '/about-us' },
    { label: 'Contact us', href: '/contact-us' },
    { label: 'Request a Quote', href: '/request-a-quote' },
  ],
  useful: [
    { label: 'Privacy Policy', href: 'https://www.powerq.com.au/privacy-policy-2/' },
    { label: 'Terms & Conditions', href: 'https://www.powerq.com.au/terms-conditions/' },
  ],
}
