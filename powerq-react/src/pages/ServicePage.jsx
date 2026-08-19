import { useParams, Navigate, Link } from 'react-router-dom'
import PageHero from '../components/PageHero/PageHero'
import ContentBlocks from '../components/ContentBlocks/ContentBlocks'
import ServiceSection from '../components/ServiceSection/ServiceSection'
import { useCatalog } from '../context/CatalogContext'
import { company } from '../data/siteData'
import usePageSeo from '../hooks/usePageSeo'

export default function ServicePage() {
  const { slug } = useParams()
  const { getServiceBySlug } = useCatalog()
  const service = getServiceBySlug(slug)

  usePageSeo({ title: service?.seoTitle, description: service?.cardText, image: service?.heroImage })

  if (!service) {
    return <Navigate to="/" replace />
  }

  return (
    <>
      <PageHero title={service.pageTitle} current={service.navTitle} image={service.heroImage} />
      <section className="space-top space-extra-bottom">
        <div className="container">
          {service.sections?.map((section, i) => <ServiceSection {...section} key={i} />)}
          {service.blocks && (
            <div className="row justify-content-center">
              <div className="col-lg-9">
                <ContentBlocks blocks={service.blocks} />
              </div>
            </div>
          )}
        </div>
      </section>
      <section className="bg-secondary space-top-extra space-extra-bottom text-center py-5">
        <div className="container">
          <h2 className="sec-title">Need {service.navTitle} in Melbourne?</h2>
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
