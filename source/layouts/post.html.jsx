import Layout from "./layout.html.jsx"
import Subscribe from "../components/subscribe.html.jsx"
import ArchiveButton from "../components/archive-button.html.jsx"
import Pagination from "../components/pagination.html.jsx"
import Post from "../components/post.html.jsx"
import { JSDOM } from "jsdom"
import sanitizeHTML from "sanitize-html"
import ReactDOMServer from "react-dom/server"

export default ({ children, environment, pages, title }) => {
  let posts = pages.filter((page) => page.meta.title && page.meta.date)
  let sortedPosts = posts.sort((a, b) => new Date(b.meta.date) - new Date(a.meta.date))
  let currentPost = sortedPosts.find((post) => post.meta.title === title)
  let currentPostIndex = sortedPosts.indexOf(currentPost)
  let newerPost = sortedPosts[currentPostIndex - 1]
  let olderPost = sortedPosts[currentPostIndex + 1]

  let element = React.createElement(currentPost.component)
  let html = ReactDOMServer.renderToStaticMarkup(element)

  let firstParagraph = new JSDOM(html).window.document.querySelector("div > p:first-of-type").innerHTML
  let description = escape(sanitizeHTML(firstParagraph, { allowedAttributes: {}, allowedTags: [] }))
  let url = `https://anti-pattern.com${currentPost.path}`

  let head = <React.Fragment>
    <meta name="description" content={description} />

    <meta property="og:type" content="article" />
    <meta property="og:url" content={url} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:site_name" content="Anti-pattern" />

    <meta property="article:published_time" content={new Date(currentPost.meta.date).toISOString()} />

    <meta name="twitter:card" content="summary" />
    <meta name="twitter:creator" content="@brandonweiss" />

    <link rel="canonical" href={url} />
  </React.Fragment>

  return <Layout head={head} title={title} environment={environment}>
    <Post post={currentPost}>
      <div className="body">
        {children}
      </div>
    </Post>

    <Subscribe />

    <Pagination newerPost={newerPost} olderPost={olderPost} />

    <ArchiveButton text="Read more posts in the archive" />
  </Layout>
}
