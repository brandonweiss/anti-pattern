import { statSync } from "fs"
import React from "react"
import ReactDOMServer from "react-dom/server"

export default ({ pages }) => {
  let posts = pages.filter((page) => page.meta.title && page.meta.date)
  let sortedPosts = posts.sort((a, b) => new Date(b.meta.date) - new Date(a.meta.date))

  return {
    version: "https://jsonfeed.org/version/1",
    title: "Anti-pattern",
    home_page_url: "https://anti-pattern.com",
    feed_url: "https://anti-pattern.com/feed.json",
    items: sortedPosts.map((post) => {
      let dateModified = statSync(`${__dirname}${post.path}.html.mdx`).mtime.toISOString()
      let element = React.createElement(post.component)
      let html = ReactDOMServer.renderToStaticMarkup(element)

      return {
        title: post.meta.title,
        id: `https://anti-pattern.com${post.path}`,
        url: `https://anti-pattern.com${post.path}`,
        content_html: html,
        date_published: new Date(post.meta.date).toISOString(),
        date_modified: dateModified,
        author: {
          name: "Brandon Weiss",
          url: "https://brandonweiss.me",
        },
      }
    }),
  }
}
