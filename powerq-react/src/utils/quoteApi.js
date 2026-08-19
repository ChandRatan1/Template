// Talks to the custom PHP backend in /api-backend (see api-backend/README.md).
const API_BASE = import.meta.env.VITE_BLOG_API_URL || '/api-backend'

// Returns { success: true } on success, or { success: false, error } on
// failure (network error, unreachable backend, or a validation error the
// server rejected).
export async function submitQuote(payload) {
  try {
    const res = await fetch(`${API_BASE}/quote.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    })
    const contentType = res.headers.get('content-type') || ''
    if (!contentType.includes('application/json')) {
      return { success: false, error: 'Something went wrong sending your request. Please try again.' }
    }
    const data = await res.json()
    if (!res.ok) {
      return { success: false, error: data.error || 'Something went wrong sending your request. Please try again.' }
    }
    return { success: true }
  } catch {
    return { success: false, error: 'Something went wrong sending your request. Please try again.' }
  }
}
