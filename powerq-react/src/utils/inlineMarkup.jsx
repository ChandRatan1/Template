import { Link } from 'react-router-dom'

function isInternal(href) {
  return typeof href === 'string' && href.startsWith('/')
}

// Parses a tiny markdown-lite subset used in service page copy:
// **bold text** and [link text](href). Kept intentionally minimal —
// only what the real site's copy actually uses.
export function renderInline(text) {
  const tokenPattern = /\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\)/g
  const nodes = []
  let lastIndex = 0
  let match
  let key = 0

  while ((match = tokenPattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index))
    }
    if (match[1] !== undefined) {
      nodes.push(<strong key={key++}>{match[1]}</strong>)
    } else {
      const linkText = match[2]
      const href = match[3]
      if (isInternal(href)) {
        nodes.push(
          <Link to={href} key={key++}>
            {linkText}
          </Link>,
        )
      } else {
        nodes.push(
          <a href={href} key={key++} target="_blank" rel="noreferrer">
            {linkText}
          </a>,
        )
      }
    }
    lastIndex = tokenPattern.lastIndex
  }
  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex))
  }
  return nodes
}
