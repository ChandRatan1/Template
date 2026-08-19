export const company = {
  name: 'PowerQ',
  logo: '/content-img/powerq-logo-300x76.png',
  footerLogo: '/content-img/download-6-300x115.png',
  phoneDisplay: '0433SAFETY / 0433723389',
  phoneHref: 'tel:0433723389',
  email: 'info@powerq.com.au',
  address: '43 Wonnangatta Cres, Melton South VIC 3338, Australia',
  mapHref: 'https://www.google.com/maps/search/?q=43+Wonnangatta+Cres,+Melton+South+VIC+3338',
  footerAddress: '43 Wonnangatta Crescent, Weir Views VIC 3338',
  footerMapHref: 'https://www.google.com/maps/search/?q=43+Wonnangatta+Crescent,+Weir+Views+VIC+3338',
  footerTagline:
    'At PowerQ, we specialize in providing top-quality fire extinguishers and comprehensive fire safety services. Whether you’re looking to purchase reliable fire protection equipment or need expert installation and maintenance, we’ve got you covered.',
}

export const socialLinks = [
  { label: 'Facebook', icon: 'fab fa-facebook-f', href: 'https://www.facebook.com/profile.php?id=100033794081903' },
  { label: 'Instagram', icon: 'fab fa-instagram', href: 'https://www.instagram.com/powerqtestandtag/' },
  { label: 'LinkedIn', icon: 'fab fa-linkedin-in', href: 'https://www.linkedin.com/company/powerq-test-and-tag-melbourne/' },
]

// The "Service" nav item's children, and the footer's "Services" list, are
// now built at render time from the live service catalog (see
// CatalogContext / useCatalog) instead of a fixed list here — so a service
// added via the admin panel automatically shows up in both places. Header.jsx
// and Footer.jsx compose those dynamic pieces in with the static items below.

export const navItemsBase = [
  { label: 'Home', href: '/' },
  { label: 'About us', href: '/about-us' },
  { label: 'Pricing', href: '/cost-of-test-tag-in-melbourne' },
  { label: 'Faq', href: '/faq' },
  { label: 'Request a Quote', href: '/request-a-quote' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact us', href: '/contact-us' },
]

export const footerLinks = {
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
