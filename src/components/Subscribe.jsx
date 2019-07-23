import React from "react"
import styled from "styled-components"

const Container = styled.div`
  background-color: rgba(249, 250, 251, 0.9);
  border: 1px solid #dce1e5;
  border-radius: 4px;
  padding: 40px;
`

const Heading = styled.h2`
  margin-top: 0;
  margin-bottom: 0.5em;
`

const Message = styled.p`
  font-size: 16px;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;

  @media (min-width: 450px) {
    flex-direction: row;
  }
`

const Input = styled.input`
  border-radius: 4px;
  font-size: 16px;
  padding: 0.75em 1em;
`

const Email = styled(Input)`
  border: 1px solid #dce1e5;
  flex-grow: 1;
  margin-bottom: 0.5em;

  @media (min-width: 450px) {
    margin-bottom: 0;
    margin-right: 0.5em;
  }
`

const Submit = styled(Input)`
  border: 0;
  background-color: rgba(0, 105, 255, 0.6);
  color: white;
  cursor: pointer;
  flex: 0 0 auto;
`

const Subscribe = () => {
  const onSubmit = event => {
    window.open("https://buttondown.email/brandonweiss", "popupwindow")
  }

  return (
    <Container>
      <Heading>The newsletter</Heading>

      <Message>
        Join 400+ people learning whatever I learn, sent a few times a month.
      </Message>

      <Form
        action="https://buttondown.email/api/emails/embed-subscribe/brandonweiss"
        method="post"
        target="popupwindow"
        onSubmit={onSubmit}
      >
        <Email
          type="email"
          name="email"
          id="bd-email"
          placeholder="Your email address"
          required
        />
        <input type="hidden" value="1" name="embed" />

        <Submit type="submit" value="Subscribe" />
      </Form>
    </Container>
  )
}

export default Subscribe
