import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { mainLinkStyle } from "./styles"

const Wrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  font-size: 0.9rem;
  justify-content: space-between;
  list-style: none;
  margin-left: 0;
  padding: 0;

  ${mainLinkStyle}
`

const Item = styled.li`
  flex: 1 1 0;

  &:last-child {
    text-align: right;
  }
`

const Separator = styled.div`
  width: 20px;
`

const Pagination = ({ previous, next }) => (
  <Wrapper>
    <Item>
      {previous && (
        <Link to={previous.fields.slug} rel="prev">
          ← {previous.frontmatter.title}
        </Link>
      )}
    </Item>

    <Separator />

    <Item>
      {next && (
        <Link to={next.fields.slug} rel="next">
          {next.frontmatter.title} →
        </Link>
      )}
    </Item>
  </Wrapper>
)

export default Pagination
