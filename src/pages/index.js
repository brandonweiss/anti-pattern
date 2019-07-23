import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/Layout"
import { PostListContainer } from "../components/Container"
import Meta from "../components/Meta"
import styled from "styled-components"
import { mainLinkStyle } from "../components/styles"

const Post = styled.div`
  margin: 1.5rem 0;

  &:first-of-type {
    margin-top: 0;
  }

  &:last-of-type {
    margin-bottom: 0;
  }
`

const Title = styled.h2`
  font-size: 1.5rem;
  line-height: 1.2;
  margin: 0;
  margin-bottom: 0.3rem;
  font-family: "Whitney A", "Whitney B", sans-serif;
  font-weight: 700;

  ${mainLinkStyle}
`

const TitleLink = styled(Link)`
  text-decoration: none;
`

const Description = styled.p`
  margin: 0;
  font-size: 0.9rem;
`

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMdx.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <Meta />

        <PostListContainer>
          {posts.map(({ node }) => (
            <Post key={node.fields.slug}>
              <Title>
                <TitleLink to={node.fields.slug}>
                  {node.frontmatter.title}
                </TitleLink>
              </Title>

              <Description>{node.frontmatter.description}</Description>
            </Post>
          ))}
        </PostListContainer>
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
