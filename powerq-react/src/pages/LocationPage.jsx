import { useParams, Navigate, Link } from 'react-router-dom'
import PageHero from '../components/PageHero/PageHero'
import ServiceSection from '../components/ServiceSection/ServiceSection'
import { useCatalog } from '../context/CatalogContext'
import { company } from '../data/siteData'
import usePageSeo from '../hooks/usePageSeo'

export default function LocationPage() {
  const { slug } = useParams()
  const { getLocationBySlug, services } = useCatalog()
  const location = getLocationBySlug(slug)

  usePageSeo({
    title: `Test and Tag in ${location?.suburb} | PowerQ`,
    description: location?.intro,
  })

  if (!location) {
    return <Navigate to="/" replace />
  }

  const serviceLinks = services.map(
    (service) => `[${service.navTitle}](/${service.slug}) available in ${location.suburb}.`,
  )

  return (
    <>
      <PageHero title={`Test and Tag in ${location.suburb}`} current={location.suburb} />
      <section className="space-top space-extra-bottom">
        <div className="container">
          <ServiceSection
            heading={`Electrical Test and Tag Services in ${location.suburb}`}
            paragraphs={[location.intro]}
            secondHeading="Services we offer in your area"
            list={serviceLinks}
            closingNote={`Every job in ${location.suburb} comes with a written compliance report, so you have clear, dated evidence for your records, your insurer, or a workplace audit.`}
          />
        </div>
      </section>
      <section className="bg-secondary space-top-extra space-extra-bottom text-center py-5">
        <div className="container">
          <h2 className="sec-title">Need Test and Tag in {location.suburb}?</h2>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <a href={company.phoneHref} className="vs-btn style2">
              {company.phoneDisplay}
            </a>
            <Link to="/request-a-quote" className="vs-btn">
              Request a Quote<i className="far fa-long-arrow-right" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
