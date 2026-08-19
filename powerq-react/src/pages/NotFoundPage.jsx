import { Link } from 'react-router-dom'
import usePageSeo from '../hooks/usePageSeo'

export default function NotFoundPage() {
  usePageSeo({
    title: '404 Page Not Found | PowerQ',
    description: "The page you're looking for doesn't exist. Return to the PowerQ homepage or browse our test and tag services in Melbourne.",
    noIndex: true,
  })
  return (
    <section className="space-top space-extra-bottom text-center" style={{ paddingTop: 160 }}>
      <div className="container">
        <h1 className="sec-title">404</h1>
        <p className="sec-text">The page you’re looking for doesn’t exist.</p>
        <Link to="/" className="vs-btn">
          Back to Home<i className="far fa-long-arrow-right" />
        </Link>
      </div>
    </section>
  )
}
