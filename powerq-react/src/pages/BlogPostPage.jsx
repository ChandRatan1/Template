import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PageHero from '../components/PageHero/PageHero'
import { getPostBySlug } from '../data/blog'
import { fetchPostBySlug } from '../utils/blogApi'
import usePageTitle from '../hooks/usePageTitle'
import NotFoundPage from './NotFoundPage'

export default function BlogPostPage() {
  const { slug } = useParams()
  const localPost = getPostBySlug(slug)
  const [post, setPost] = useState(localPost)
  const [checkedApi, setCheckedApi] = useState(false)

  usePageTitle(post ? `${post.title} | PowerQ` : 'Blog | PowerQ')

  useEffect(() => {
    let cancelled = false
    fetchPostBySlug(slug).then((apiPost) => {
      if (cancelled) return
      // apiPost === null: backend unreachable, keep whatever local post we had.
      // apiPost === undefined: backend reachable but no post with this slug.
      // apiPost === object: found via the backend, it wins.
      if (apiPost) setPost(apiPost)
      else if (apiPost === undefined && !localPost) setPost(undefined)
      setCheckedApi(true)
    })
    return () => {
      cancelled = true
    }
  }, [slug, localPost])

  if (!post) {
    if (!checkedApi) return null
    return <NotFoundPage />
  }

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
              {post.contentHtml ? (
                <div className="sec-text" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
              ) : (
                post.content?.map((paragraph, i) => (
                  <p className="sec-text" key={i}>
                    {paragraph}
                  </p>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
