import React from "react"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

const SEO = ({ description, meta = [], slug, title, type }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            author
            description
            siteUrl
            title
            twitterAccount
          }
        }
      }
    `
  )

  let metaDescription = description || site.siteMetadata.description

  return (
    <Helmet
      htmlAttributes={{ lang: "en" }}
      defaultTitle={site.siteMetadata.title}
      title={title}
      titleTemplate={`%s - ${site.siteMetadata.title}`}
      meta={[
        {
          name: "description",
          content: metaDescription,
        },
        {
          property: "og:description",
          content: metaDescription,
        },
        {
          property: "og:site_name",
          content: site.siteMetadata.title,
        },
        {
          property: "og:title",
          content: title,
        },
        {
          property: "og:type",
          content: type || "website",
        },
        {
          property: "og:url",
          content: slug
            ? site.siteMetadata.siteUrl + slug
            : site.siteMetadata.siteUrl,
        },
        {
          name: "twitter:card",
          content: "summary",
        },
        {
          name: "twitter:creator",
          content: site.siteMetadata.twitterAccount,
        },
        {
          name: "twitter:title",
          content: title,
        },
        {
          name: "twitter:description",
          content: metaDescription,
        },
      ].concat(meta)}
    />
  )
}

export default SEO
