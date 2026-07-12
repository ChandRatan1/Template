import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero/PageHero'
import usePageTitle from '../hooks/usePageTitle'

export default function PlaceholderPage({ title, message }) {
  usePageTitle(`${title} | PowerQ`)
  return (
    <>
      <PageHero title={title} current={title} />
      <section className="space-top space-extra-bottom text-center">
        <div className="container">
          <p className="sec-text">{message}</p>
          <Link to="/" className="vs-btn">
            Back to Home<i className="far fa-long-arrow-right" />
          </Link>
        </div>
      </section>
    </>
  )
}
