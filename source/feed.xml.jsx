import { statSync } from "fs"

export default ({ pages }) => {
  let posts = pages.filter((page) => page.meta.title && page.meta.date)
  let sortedPosts = posts.sort((a, b) => new Date(b.meta.date) - new Date(a.meta.date))
  let latestPostDate = new Date(sortedPosts[0].meta.date)

  return <feed xmlns="http://www.w3.org/2005/Atom">
    <title>Anti-pattern</title>
    <id>https://anti-pattern.com</id>
    <link href="https://anti-pattern.com" />
    <link href="https://anti-pattern.com/feed.xml" rel="self" />
    <updated>{latestPostDate.toISOString()}</updated>

    <author>
      <name>Brandon Weiss</name>
      <email>brandon@anti-pattern.com</email>
    </author>

    {
      sortedPosts.map(
        (post) => {
          let dateModified = statSync(`${__dirname}${post.path}.html.mdx`).mtime.toISOString()

          return <entry key={post.path}>
            <title>{post.meta.title}</title>
            <link href={`https://anti-pattern.com${post.path}`} />
            <id>{`https://anti-pattern.com${post.path}`}</id>
            <published>{new Date(post.meta.date).toISOString()}</published>
            <updated>{dateModified}</updated>

            <author>
              <name>Brandon Weiss</name>
              <email>brandon@anti-pattern.com</email>
            </author>

            <content type="html">
              <post.component />
            </content>
          </entry>
        }
      )
    }
  </feed>
}
