import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import {
  Briefcase as BriefcaseIcon,
  Mail as MailIcon,
  Twitter as TwitterIcon,
} from "react-feather"
import avatar from "./avatar.png"
import Description from "./Description"
import Logotype from "./Logotype"
import Spacer from "./Spacer"

const Center = styled.div`
  text-align: center;
`

const LogotypeLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  font-size: 48px;
  font-weight: 700;
  display: inline-block;
  transition: all 100ms ease-in;

  &:hover {
    transform: scale(1.05);
  }
`

const Container = styled.footer`
  align-items: center;
  display: flex;
  justify-content: center;
`

const Avatar = styled.img`
  margin-bottom: 0;
  margin-right: 20px;
`

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: 18px;
`

const ListItem = styled.li`
  margin: 0;
`

const ListLink = styled.a`
  color: inherit;
  display: flex;
  align-items: center;
  padding: 6px 0;
  text-decoration: none;
  vertical-align: baseline;

  &:hover {
    text-decoration: underline;
  }
`

const Icon = styled.span`
  display: inline-flex;
  margin-right: 8px;
  vertical-align: middle;
`

const Footer = () => (
  <>
    <Center>
      <LogotypeLink to="/">
        <Logotype as="p" />
      </LogotypeLink>

      <Spacer size="8px" />

      <Description />
    </Center>

    <Spacer size="10px" />

    <Container>
      <Avatar src={avatar} width="160" height="160" />

      <List>
        <ListItem>
          <ListLink href="https://brandonweiss.me">
            <Icon>
              <BriefcaseIcon size={20} />
            </Icon>
            Check out my work
          </ListLink>
        </ListItem>

        <ListItem>
          <ListLink href="https://twitter.com/brandon_weiss">
            <Icon>
              <TwitterIcon size={20} />
            </Icon>
            Follow me on Twitter
          </ListLink>
        </ListItem>

        <ListItem>
          <ListLink href="mailto:brandon@anti-pattern.com">
            <Icon>
              <MailIcon size={20} />
            </Icon>
            Email me
          </ListLink>
        </ListItem>
      </List>
    </Container>
  </>
)

export default Footer
