import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useCatalog } from '../context/CatalogContext'

// Canonical/OG URLs always point at the real production domain, regardless
// of what host the page is actually being viewed from (localhost, etc.) —
// that's standard practice for canonical tags.
const SITE_ORIGIN = 'https://www.powerq.com.au'

const DEFAULT_TITLE = 'PowerQ - Professional Test and Tag Services in Melbourne'
const DEFAULT_DESCRIPTION =
  'PowerQ provides expert test and tag services in Melbourne, ensuring electrical safety compliance for homes and businesses with certified technicians.'
const DEFAULT_IMAGE = `${SITE_ORIGIN}/content-img/powerq-logo-300x76.png`

function setMeta(attr, key, value) {
  let el = document.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}

function setCanonical(href) {
  let el = document.querySelector('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function applyTags(title, description, image, url, noIndex) {
  document.title = title
  setMeta('name', 'description', description)
  setCanonical(url)
  setMeta('property', 'og:title', title)
  setMeta('property', 'og:description', description)
  setMeta('property', 'og:image', image)
  setMeta('property', 'og:url', url)
  setMeta('property', 'og:type', 'website')
  setMeta('name', 'twitter:card', 'summary_large_image')
  setMeta('name', 'twitter:title', title)
  setMeta('name', 'twitter:description', description)
  setMeta('name', 'twitter:image', image)
  setMeta('name', 'robots', noIndex ? 'noindex, follow' : 'index, follow')
}

// Sets document.title, meta description, canonical link, Open Graph/Twitter
// card tags, and (optionally) a noindex robots tag for the current page,
// reverting to site defaults on unmount. `image` may be a root-relative path
// (e.g. '/content-img/x.jpg') or a full URL. Pass `noIndex: true` for pages
// that shouldn't be indexed (search results, 404).
export default function usePageSeo({ title, description, image, noIndex = false } = {}) {
  const location = useLocation()
  const { pageMeta } = useCatalog()
  const override = pageMeta[location.pathname]

  useEffect(() => {
    // An admin-set override (Page SEO tab) wins over what the page itself
    // passed in; that in turn wins over the site-wide default.
    const finalTitle = override?.title || title || DEFAULT_TITLE
    const finalDescription = override?.description || description || DEFAULT_DESCRIPTION
    const finalImage = image ? (image.startsWith('http') ? image : `${SITE_ORIGIN}${image}`) : DEFAULT_IMAGE
    const finalUrl = `${SITE_ORIGIN}${location.pathname}`

    applyTags(finalTitle, finalDescription, finalImage, finalUrl, noIndex)

    return () => {
      applyTags(DEFAULT_TITLE, DEFAULT_DESCRIPTION, DEFAULT_IMAGE, `${SITE_ORIGIN}/`, false)
    }
  }, [title, description, image, noIndex, location.pathname, override])
}
