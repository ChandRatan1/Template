import { Navigate, useParams } from 'react-router-dom'
import ServicePage from './ServicePage'
import LocationPage from './LocationPage'
import { useCatalog } from '../context/CatalogContext'

// Single catch-all route dispatcher: tries services first (existing
// behavior, unchanged), then suburb location pages, else falls back to the
// same "redirect home" behavior ServicePage already used for unknown slugs.
// While the catalog's live data is still loading, an unmatched slug renders
// nothing rather than redirecting immediately — otherwise a newly
// admin-added service/location would briefly 404 before its data arrives.
export default function SlugPage() {
  const { slug } = useParams()
  const { getServiceBySlug, getLocationBySlug, loading } = useCatalog()

  if (getServiceBySlug(slug)) return <ServicePage />
  if (getLocationBySlug(slug)) return <LocationPage />
  if (loading) return null
  return <Navigate to="/" replace />
}
