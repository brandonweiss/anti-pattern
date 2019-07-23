import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import Layout from "../components/Layout"
import { BodyContainer } from "../components/Container"
import { Heading } from "../templates/post"
import { mainLinkStyle } from "../components/styles"

const Message = styled.p`
  text-align: center;

  ${mainLinkStyle}
`

const NotFound = ({ location }) => (
  <Layout location={location}>
    <BodyContainer>
      <Heading>Not found</Heading>

      <Message>
        That post doesn’t exist. Take a look at{" "}
        <Link to="/">all the posts</Link>.
      </Message>
    </BodyContainer>
  </Layout>
)

export default NotFound
