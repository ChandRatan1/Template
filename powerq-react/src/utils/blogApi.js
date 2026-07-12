// Talks to the custom PHP backend in /api-backend, which reads/writes the
// same live WordPress database (see api-backend/README.md). Deploy that
// folder to Hostinger alongside the built React app for this to work — in
// local dev (no PHP server), these calls fail harmlessly and callers fall
// back to the static posts in src/data/blog.js.
const API_BASE = import.meta.env.VITE_BLOG_API_URL || '/api-backend'

async function getJson(url) {
  try {
    const res = await fetch(url, { headers: { Accept: 'application/json' } })
    const contentType = res.headers.get('content-type') || ''
    if (!contentType.includes('application/json')) return null
    const data = await res.json()
    if (!res.ok) return null
    return data
  } catch {
    return null
  }
}

// Returns an array on success (possibly empty), or null if the backend
// couldn't be reached/parsed at all.
export async function fetchPosts() {
  const data = await getJson(`${API_BASE}/posts.php`)
  return Array.isArray(data) ? data : null
}

// Returns the post object, undefined if the backend says it doesn't exist,
// or null if the backend couldn't be reached at all.
export async function fetchPostBySlug(slug) {
  const data = await getJson(`${API_BASE}/post.php?slug=${encodeURIComponent(slug)}`)
  if (data === null) return null
  if (data.error) return undefined
  return data
}
