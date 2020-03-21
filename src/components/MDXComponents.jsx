import React from "react"
import styled from "styled-components"

const Blockquote = styled.blockquote`
  font-size: 0.8rem;
  background-color: #ece4d3;
  margin-left: 0;
  margin-top: 0;
  margin-bottom: 0;
  padding: 1rem;
  border-radius: 3px;

  p {
    margin: 0;
  }
`

const Heading2 = styled.h2`
  margin-bottom: 0.5rem;

  & + h3,
  & + p {
    margin-top: 0;
  }
`

const Heading3 = styled.h3`
  margin-bottom: 0.5rem;

  & + h4,
  & + p {
    margin-top: 0;
  }
`

const Heading4 = styled.h4`
  margin-bottom: 0.5rem;

  & + h5,
  & + p {
    margin-top: 0;
  }
`

const Heading5 = styled.h5`
  margin-bottom: 0.5rem;

  & + h6,
  & + p {
    margin-top: 0;
  }
`

const Heading6 = styled.h6`
  margin-bottom: 0.5rem;

  & + p {
    margin-top: 0;
  }
`

const Image = styled.img`
  margin: 0 auto;
  display: block;
`

const ListOrdered = styled.ol`
  padding-left: 0;
`

const ListUnordered = styled.ul`
  padding-left: 0;
`

const ListItem = styled.li`
  margin: 0.3em 0;
`

const Paragraph = styled.p`
  &:last-child {
    margin-bottom: 0;
  }
`

const Pre = styled.pre`
  background-color: #282c34;
  color: #abb2bf;

  margin: 1.2rem -18px;
  padding: 0.8em 18px;
  overflow: auto;
  font-size: 0.7rem;

  @media (min-width: 650px) {
    border-radius: 0.3em;
    margin: 1.2rem -1em;
    padding: 0.8em 1em;
  }
`

const Terminal = ({ children }) => {
  let string = children
    .trim()
    .replace(/<GRAY>/g, '<span style="color: #5c6370;">')
    .replace(/<\/GRAY>/g, "</span>")
    .replace(/<GREEN>/g, '<span style="color: #98c379;">')
    .replace(/<\/GREEN>/g, "</span>")
    .replace(/<RED>/g, '<span style="color: #e06c75;">')
    .replace(/<\/RED>/g, "</span>")

  return <Pre dangerouslySetInnerHTML={{ __html: string }} />
}

export default {
  blockquote: Blockquote,
  h2: Heading2,
  h3: Heading3,
  h4: Heading4,
  h5: Heading5,
  h6: Heading6,
  img: Image,
  li: ListItem,
  ol: ListOrdered,
  p: Paragraph,
  ul: ListUnordered,
  Terminal,
}
