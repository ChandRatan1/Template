import { Navigate, useParams } from 'react-router-dom'
import ServicePage from './ServicePage'
import LocationPage from './LocationPage'
import { getServiceBySlug } from '../data/services'
import { getLocationBySlug } from '../data/locations'

// Single catch-all route dispatcher: tries services first (existing
// behavior, unchanged), then suburb location pages, else falls back to the
// same "redirect home" behavior ServicePage already used for unknown slugs.
export default function SlugPage() {
  const { slug } = useParams()

  if (getServiceBySlug(slug)) return <ServicePage />
  if (getLocationBySlug(slug)) return <LocationPage />
  return <Navigate to="/" replace />
}
