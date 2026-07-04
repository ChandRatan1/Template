import PageHero from '../components/PageHero/PageHero'

export default function BlogPage() {
  return (
    <>
      <PageHero title="Blog" current="Blog" />
      <section className="space-top space-extra-bottom text-center">
        <div className="container">
          <p className="sec-text">No blog posts have been published yet. Check back soon!</p>
        </div>
      </section>
    </>
  )
}
