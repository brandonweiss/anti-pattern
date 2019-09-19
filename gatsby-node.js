const path = require(`path`)
const {
  createFilePath,
  createRemoteFileNode,
} = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/post.js`)
  return graphql(
    `
      {
        allMdx(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog posts pages.
    const posts = result.data.allMdx.edges

    posts.forEach((post, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node

      const {
        node: {
          fields: { slug },
          frontmatter: { unsplashImageID },
        },
      } = post

      createPage({
        path: slug,
        component: blogPost,
        context: {
          slug: slug,
          previous,
          next,
        },
      })
    })

    return null
  })
}

exports.onCreateNode = async ({
  actions,
  cache,
  createContentDigest,
  getNode,
  node,
  reporter,
  store,
}) => {
  const { createNode, createNodeField } = actions

  if (node.internal.type === "Mdx") {
    const value = createFilePath({ node, getNode, trailingSlash: false })

    createNodeField({
      node: node,
      name: "slug",
      value: value,
    })

    if (node.frontmatter.unsplashPhoto) {
      const fileNode = await createRemoteFileNode({
        url: `${node.frontmatter.unsplashPhoto}?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjkyMTM4fQ`,
        store,
        cache,
        createNode,
        createNodeId: createContentDigest,
        reporter,
      })

      createNodeField({
        node: node,
        name: "localUnsplashPhoto___NODE",
        value: fileNode.id,
      })
    }
  }
}
