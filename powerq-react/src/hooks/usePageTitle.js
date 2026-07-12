import { useEffect } from 'react'

// The default <title> already in index.html — used when a page doesn't
// supply its own (matches the live site's homepage <title> exactly).
const DEFAULT_TITLE = 'PowerQ - Professional Test and Tag Services in Melbourne'

export default function usePageTitle(title) {
  useEffect(() => {
    document.title = title || DEFAULT_TITLE
    return () => {
      document.title = DEFAULT_TITLE
    }
  }, [title])
}
