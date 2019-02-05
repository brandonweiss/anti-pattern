import Layout from "./layouts/layout.html.jsx"

const groupBy = (items, callback) => {
  return items.reduce((groups, item) => {
    let key = callback(item)
    groups[key] = groups[key] || []
    groups[key].push(item)
    return groups
  }, {})
}

export default ({ environment, pages }) => {
  let posts = pages.filter((page) => page.meta.title && page.meta.date)
  let groups = groupBy(posts, (post) => new Date(post.meta.date).getFullYear())
  let sortedGroups = Object.entries(groups).sort(([a], [b]) => b - a)

  return <Layout title="Archive" environment={environment}>
    <ul className="archives list-reset">
      {
        sortedGroups.map(
          ([year, posts]) => {
            let sortedPosts = posts.sort((a, b) => new Date(b.meta.date) - new Date(a.meta.date))

            return <li key={year} className="archive-group">
              <span className="group-name">
                {year}
              </span>

              <ul className="list-reset group-contents">
                {
                  sortedPosts.map(
                    (post) => (
                      <li key={post.path}>
                        <a href={post.path}>
                          {post.meta.title}
                        </a>
                      </li>
                    )
                  )
                }
              </ul>
            </li>
          }
        )
      }
    </ul>
  </Layout>
}
