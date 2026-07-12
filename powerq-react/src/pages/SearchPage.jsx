import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import PageHero from '../components/PageHero/PageHero'
import { search } from '../data/searchIndex'
import usePageTitle from '../hooks/usePageTitle'

function excerpt(text, query) {
  const lower = text.toLowerCase()
  const index = lower.indexOf(query.toLowerCase())
  if (index === -1) return text.slice(0, 140)
  const start = Math.max(0, index - 60)
  const end = Math.min(text.length, index + query.length + 80)
  return `${start > 0 ? '…' : ''}${text.slice(start, end)}${end < text.length ? '…' : ''}`
}

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  const [query, setQuery] = useState(initialQuery)

  usePageTitle(initialQuery ? `Search results for “${initialQuery}” | PowerQ` : 'Search | PowerQ')

  const results = useMemo(() => search(initialQuery), [initialQuery])

  const handleSubmit = (e) => {
    e.preventDefault()
    setSearchParams({ q: query.trim() })
  }

  return (
    <>
      <PageHero title="Search Results" current="Search" />
      <section className="space-top space-extra-bottom">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <form onSubmit={handleSubmit} className="d-flex mb-30" style={{ gap: 10 }}>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search..."
                  className="form-control"
                  style={{ flex: 1, border: '1px solid var(--border-color)', padding: '10px 14px' }}
                />
                <button type="submit" className="vs-btn">
                  Search
                </button>
              </form>

              {initialQuery && (
                <p className="sec-text">
                  {results.length
                    ? `${results.length} result${results.length === 1 ? '' : 's'} for “${initialQuery}”`
                    : `No results found for “${initialQuery}”. Try a different search term.`}
                </p>
              )}

              {results.map((result) => (
                <div key={`${result.href}-${result.title}`} className="mb-30">
                  <h3 className="h5 mb-1">
                    <Link to={result.href} className="text-inherit">
                      {result.title}
                    </Link>
                  </h3>
                  <p className="sec-text mb-0">{excerpt(result.text, initialQuery)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
