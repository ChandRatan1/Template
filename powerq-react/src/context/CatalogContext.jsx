import { createContext, useContext, useEffect, useState } from 'react'
import { services as staticServices } from '../data/services'
import { locations as staticLocations } from '../data/locations'

// Same pattern as src/utils/blogApi.js: talk to the PHP backend, fall back
// to static data if it's unreachable (local dev with no PHP server, etc).
const API_BASE = import.meta.env.VITE_BLOG_API_URL || '/api-backend'

async function fetchJson(url) {
  try {
    const res = await fetch(url, { headers: { Accept: 'application/json' } })
    const contentType = res.headers.get('content-type') || ''
    if (!res.ok || !contentType.includes('application/json')) return null
    return await res.json()
  } catch {
    return null
  }
}

const CatalogContext = createContext(null)

// Services/locations start out as the bundled static data (so existing pages
// render instantly, no flash/loading state), then get replaced by the live
// database content once fetched — admin edits and new entries become the
// source of truth without a redeploy. `loading` stays true until that first
// fetch attempt settles, so callers (see SlugPage) can tell "not found yet,
// still checking" apart from "genuinely doesn't exist".
export function CatalogProvider({ children }) {
  const [services, setServices] = useState(staticServices)
  const [locations, setLocations] = useState(staticLocations)
  const [pageMeta, setPageMeta] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    Promise.all([
      fetchJson(`${API_BASE}/services.php`),
      fetchJson(`${API_BASE}/locations.php`),
      fetchJson(`${API_BASE}/page_meta.php`),
    ]).then(([svcData, locData, metaData]) => {
      if (cancelled) return
      if (Array.isArray(svcData)) setServices(svcData)
      if (Array.isArray(locData)) setLocations(locData)
      if (Array.isArray(metaData)) {
        const map = {}
        metaData.forEach((row) => {
          map[row.path] = row
        })
        setPageMeta(map)
      }
      setLoading(false)
    })
    return () => {
      cancelled = true
    }
  }, [])

  const value = {
    services,
    locations,
    pageMeta,
    loading,
    getServiceBySlug: (slug) => services.find((s) => s.slug === slug),
    getLocationBySlug: (slug) => locations.find((l) => l.slug === slug),
  }

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>
}

export function useCatalog() {
  const ctx = useContext(CatalogContext)
  if (!ctx) throw new Error('useCatalog must be used within a CatalogProvider')
  return ctx
}
