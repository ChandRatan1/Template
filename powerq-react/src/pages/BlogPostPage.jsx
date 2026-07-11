import { useParams } from 'react-router-dom'
import PageHero from '../components/PageHero/PageHero'
import { getPostBySlug } from '../data/blog'
import NotFoundPage from './NotFoundPage'

export default function BlogPostPage() {
  const { slug } = useParams()
  const post = getPostBySlug(slug)

  if (!post) return <NotFoundPage />

  return (
    <>
      <PageHero title={post.title} current="Blog" />
      <section className="space-top space-extra-bottom">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-9">
              {post.image && <img src={post.image} alt={post.title} className="w-100 mb-4" style={{ borderRadius: 8 }} />}
              {(post.date || post.author) && (
                <div className="blog-meta mb-4">
                  {post.date && <span>{post.date}</span>}
                  {post.author && <span>{post.author}</span>}
                </div>
              )}
              {post.content.map((paragraph, i) => (
                <p className="sec-text" key={i}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
