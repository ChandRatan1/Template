import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero/PageHero'
import { posts } from '../data/blog'

export default function BlogPage() {
  return (
    <>
      <PageHero title="Blog" current="Blog" />
      {posts.length === 0 && (
        <section className="space-top space-extra-bottom text-center">
          <div className="container">
            <p className="sec-text">There is no blog post</p>
          </div>
        </section>
      )}
      {posts.length > 0 && (
        <section className="space-top space-extra-bottom">
          <div className="container">
            <div className="row gy-4">
              {posts.map((post) => (
                <div className="col-md-6 col-lg-4" key={post.slug}>
                  <div className="blog-style1 layout3">
                    {post.image && (
                      <div className="blog-img">
                        <img src={post.image} alt={post.title} />
                      </div>
                    )}
                    <div className="blog-content">
                      <div className="blog-meta">
                        {post.date && <span>{post.date}</span>}
                        {post.author && <span>{post.author}</span>}
                      </div>
                      <h3 className="blog-title h5">
                        <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                      </h3>
                      {post.excerpt && <p className="blog-text">{post.excerpt}</p>}
                      <Link to={`/blog/${post.slug}`} className="vs-btn">
                        Read More<i className="far fa-long-arrow-right" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
