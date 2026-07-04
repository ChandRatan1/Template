import { services } from './services'
import { faqItems } from './faq'

const staticPages = [
  { title: 'Home', href: '/', text: 'Test and Tag in Melbourne electrical safety compliance PowerQ' },
  { title: 'About Us', href: '/about-us', text: 'Why choose PowerQ for test and tag in Melbourne, our team, firefighters' },
  { title: 'Pricing', href: '/cost-of-test-tag-in-melbourne', text: 'Cost of test and tag in Melbourne, pricing plans, fire extinguisher inspection fees' },
  { title: 'FAQ', href: '/faq', text: 'Frequently asked questions about electrical test and tag, OHS, WHS compliance' },
  { title: 'Request a Quote', href: '/request-a-quote', text: 'Request a free quote for electrical testing and tagging services' },
  { title: 'Contact Us', href: '/contact-us', text: 'Contact PowerQ, hours, location, phone, email' },
  { title: 'Blog', href: '/blog', text: 'PowerQ blog news updates' },
]

const serviceEntries = services.map((s) => ({
  title: s.pageTitle,
  href: `/${s.slug}`,
  text: `${s.navTitle} ${s.cardTitle} ${s.cardText} ${s.blocks
    .filter((b) => b.type === 'paragraph' || b.type === 'heading')
    .map((b) => b.text)
    .join(' ')}`,
}))

const faqEntries = faqItems.map((f) => ({
  title: f.q,
  href: '/faq',
  text: f.a,
}))

const searchIndex = [...staticPages, ...serviceEntries, ...faqEntries]

export function search(query) {
  const q = query.trim().toLowerCase()
  if (!q) return []
  return searchIndex.filter(
    (entry) => entry.title.toLowerCase().includes(q) || entry.text.toLowerCase().includes(q)
  )
}
