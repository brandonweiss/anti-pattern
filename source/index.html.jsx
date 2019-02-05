import Layout from "./layouts/layout.html.jsx"
import Post from "./components/post.html.jsx"
import Subscribe from "./components/subscribe.html.jsx"
import Pagination from "./components/pagination.html.jsx"
import ArchiveButton from "./components/archive-button.html.jsx"

export default ({ environment, pages }) => {
  let posts = pages.filter((page) => page.meta.title && page.meta.date)
  let sortedPosts = posts.sort((a, b) => new Date(b.meta.date) - new Date(a.meta.date))
  let latestPosts = sortedPosts.slice(0, 3)
  let olderPost = sortedPosts[3]

  return <Layout title="Anti-pattern" environment={environment}>
    {
      latestPosts.map(
        (post) => (
          <Post post={post} key={post.path}>
            <post.component />
          </Post>
        )
      )
    }

    <Pagination olderPost={olderPost} />

    <Subscribe />

    <ArchiveButton text="Read older posts in the archive" />
  </Layout>
}
