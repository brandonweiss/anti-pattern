export default ({ pages }) => {
  let posts = pages.filter((page) => page.meta.title && page.meta.date)
  let sortedPosts = posts.sort((a, b) => new Date(b.meta.date) - new Date(a.meta.date))
  let latestPostDate = new Date(sortedPosts[0].meta.date)

  return <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>https://anti-pattern.com</loc>
      <lastmod>{latestPostDate.toISOString()}</lastmod>
      <changefreq>daily</changefreq>
      <priority>1.0</priority>
    </url>

    <url>
      <loc>https://anti-pattern.com/archive</loc>
      <lastmod>{latestPostDate.toISOString()}</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.7</priority>
    </url>

    {
      sortedPosts.map(
        (post) => {
          return <url key={post.path}>
            <loc>{`https://anti-pattern.com${post.path}`}</loc>
            <lastmod>{new Date(post.meta.date).toISOString()}</lastmod>
            <changefreq>daily</changefreq>
            <priority>0.7</priority>
          </url>
        }
      )
    }
  </urlset>
}
