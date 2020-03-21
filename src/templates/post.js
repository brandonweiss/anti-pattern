import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import { mainLinkStyle } from "../components/styles"
import Pagination from "../components/Pagination"
import { HeadingContainer, BodyContainer } from "../components/Container"
import Meta from "../components/Meta"
import MDXRenderer from "gatsby-plugin-mdx/mdx-renderer"
import styled from "styled-components"
import Image from "gatsby-image"
import { MDXProvider } from "@mdx-js/react"
import MDXComponents from "../components/MDXComponents"

export const Heading = styled.h1`
  font-size: 2.8rem;
  line-height: 1.1;
  margin-top: 0;
  margin-bottom: 2.1rem;
  font-family: "Whitney A", "Whitney B", sans-serif;
  /* letter-spacing: -0.03em; */
  font-weight: 700;
  text-align: center;
`

const Body = styled.div`
  .footnotes {
    font-size: 0.9rem;
  }

  ${mainLinkStyle}
`

const ImageContainer = styled.div`
  position: relative;
`

const StyledImage = styled(Image)`
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.075);
`

const ImageAuthor = styled.a`
  color: rgba(255, 255, 255, 0.8);
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 6px;
  font-size: 0.6rem;
  padding: 0.2em 0.4em;
  position: absolute;
  bottom: 4px;
  right: 4px;
`

export const pageQuery = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      id
      body
      fields {
        localUnsplashPhoto {
          childImageSharp {
            fluid(maxWidth: 716) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        openGraphPhoto: localUnsplashPhoto {
          childImageSharp {
            fixed(width: 1200, height: 628) {
              ...GatsbyImageSharpFixed
            }
          }
        }
        slug
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        unsplashPhotoAuthor
        unsplashPhotoLink
      }
    }
  }
`

const PostTemplate = ({ data, location, pageContext }) => {
  const post = data.mdx
  const { localUnsplashPhoto, openGraphPhoto, slug } = post.fields
  const {
    description,
    title,
    unsplashPhotoAuthor,
    unsplashPhotoLink,
  } = post.frontmatter
  const { body } = post
  const { previous, next } = pageContext

  return (
    <Layout
      location={location}
      pagination={<Pagination previous={previous} next={next} />}
    >
      <MDXProvider components={MDXComponents}>
        <Meta
          title={title}
          canonical={true}
          description={description}
          slug={slug}
          type="article"
          image={openGraphPhoto && openGraphPhoto.childImageSharp.fixed.src}
        />

        <HeadingContainer>
          <Heading>{title}</Heading>
        </HeadingContainer>

        <BodyContainer>
          {localUnsplashPhoto && (
            <ImageContainer>
              <StyledImage fluid={localUnsplashPhoto.childImageSharp.fluid} />

              <ImageAuthor href={unsplashPhotoLink}>
                {unsplashPhotoAuthor}
              </ImageAuthor>
            </ImageContainer>
          )}

          <Body>
            <MDXRenderer>{body}</MDXRenderer>
          </Body>
        </BodyContainer>
      </MDXProvider>
    </Layout>
  )
}

export default PostTemplate
