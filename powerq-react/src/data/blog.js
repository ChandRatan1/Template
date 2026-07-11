// Empty by default — BlogPage shows "There is no blog post" until entries exist here.
//
// To publish a post: add an entry to this array and redeploy. Each entry becomes a
// listing card on /blog and its own page at /blog/<slug>. Shape:
// {
//   slug: 'my-post-slug',        // used in the URL: /blog/my-post-slug
//   title: 'Post title',
//   date: 'January 1, 2026',
//   author: 'PowerQ Team',
//   image: '/content-img/some-image.jpg',
//   excerpt: 'One or two sentences shown on the blog listing card.',
//   content: ['First paragraph.', 'Second paragraph.'],
// }
export const posts = []

export const getPostBySlug = (slug) => posts.find((p) => p.slug === slug)
