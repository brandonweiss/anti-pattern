import React from "react"
import styled from "styled-components"
import { mainLinkStyle } from "./styles"

const Styled = styled.p`
  font-size: 13.5px;
  margin: 0;

  ${mainLinkStyle}
`

const Description = () => (
  <Styled>
    The most popular unpopular opinions <br /> on programming by{" "}
    <a href="https://brandonweiss.me">Brandon Weiss</a>
  </Styled>
)

export default Description
