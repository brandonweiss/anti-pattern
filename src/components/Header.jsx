import React from "react"
import { Link } from "gatsby"
import Description from "./Description"
import Logomark from "./Logomark"
import Logotype from "./Logotype"
import Spacer from "./Spacer"
import styled from "styled-components"

const FullHeader = styled.header`
  text-align: center;
`

const CompactHeader = styled.header`
  @media (min-width: 620px) {
    margin-left: 18px;
  }
`

const StyledLogomark = styled(Logomark)`
  height: 80px;
  width: auto;
`

const HeadingLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  display: inline-block;
  transition: all 100ms ease-in;

  &:hover {
    transform: scale(1.1);
  }
`

const StyledLogotype = styled(Logotype)`
  font-size: 73px;
`

const Header = ({ compact }) => {
  if (compact) {
    return (
      <CompactHeader>
        <nav>
          <HeadingLink to="/">
            <StyledLogomark />
          </HeadingLink>
        </nav>
      </CompactHeader>
    )
  }

  return (
    <FullHeader>
      <nav>
        <StyledLogomark />
      </nav>

      <Spacer size="16px" />

      <StyledLogotype />

      <Spacer size="8px" />

      <Description />
    </FullHeader>
  )
}

export default Header
