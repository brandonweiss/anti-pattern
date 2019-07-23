module.exports = {
  siteMetadata: {
    author: "Brandon Weiss",
    description:
      "The most popular unpopular opinions on programming by Brandon Weiss.",
    title: "Anti-pattern",
    twitterAccount: "@brandonweiss",
    siteUrl: "https://anti-pattern.com",
  },
  plugins: [
    {
      resolve: "gatsby-mdx",
      options: {
        gatsbyRemarkPlugins: [
          "gatsby-remark-copy-linked-files",
          "gatsby-remark-images",
          "gatsby-remark-responsive-iframe",
          "gatsby-remark-prismjs",
        ],
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/content/blog`,
        name: "blog",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/content/assets`,
        name: "assets",
      },
    },
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-plugin-feed-generator",
      options: {
        rss: true,
        json: true,
        siteQuery: `
          {
            site {
              siteMetadata {
                author
                description
                title
                siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            name: "feed",
            query: `
            {
              allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
                edges {
                  node {
                    html
                    fields {
                      slug
                    }
                    frontmatter {
                      date
                      title
                      description
                    }
                  }
                }
              }
            }
          `,
            normalize: ({ query: { site, allMdx } }) => {
              return allMdx.edges.map(({ node: post }) => {
                return {
                  date: post.frontmatter.date,
                  html: post.html,
                  title: post.frontmatter.title,
                  url: site.siteMetadata.siteUrl + post.fields.slug,
                }
              })
            },
          },
        ],
      },
    },
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /components\/.+\.svg$/,
        },
      },
    },
    "gatsby-plugin-sitemap",
    "gatsby-plugin-styled-components",
  ],
}
