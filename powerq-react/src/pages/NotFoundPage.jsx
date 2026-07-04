import { Link } from 'react-router-dom'

export default function NotFoundPage() {
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
