import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"

const Heading = styled.h1`
  font-family: "Whitney Cond A", "Whitney Cond B", sans-serif;
  font-size: inherit;
  font-style: italic;
  font-weight: 700;
  line-height: 1;
  margin: 0;
  text-transform: uppercase;
`

const Logotype = props => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )
  const title = site.siteMetadata.title

  return <Heading {...props}>{title}</Heading>
}

export default Logotype
