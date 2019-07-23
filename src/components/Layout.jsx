import React from "react"
import styled, { createGlobalStyle } from "styled-components"
import Header from "./Header"
import Footer from "./Footer"
import Spacer from "./Spacer"
import Subscribe from "./Subscribe"
import Tracking from "./Tracking"
import Helmet from "react-helmet"
import "modern-normalize"
import { BodyContainer } from "./Container"

const GlobalStyle = createGlobalStyle`
  @keyframes fade-in {
    0%    { opacity: 0; }
    25%   { opacity: 0; }
    50%   { opacity: 0; }
    75%   { opacity: 0; }
    100%  { opacity: 1; }
  }

  html {
    font-size: 18px;

    @media (min-width: 400px) {
      font-size: calc(1.125rem + ((1vw - 4px) * 0.5));
    }

    @media (min-width: 1600px) {
      font-size: 24px;
    }
  }

  body {
    animation-name: fade-in;
    animation-duration: 0.3s;
  }

  html body {
    background-color: #f7f0e0;
    line-height: 1.45;
    font-family: "Chronicle SSm A", "Chronicle SSm B", serif;
    color: #2d2d2f;
  }
`

const Wrapper = styled.div`
  padding: 36px 18px;
`

const Layout = ({ children, location, pagination }) => {
  let rootPath = `${__PATH_PREFIX__}/`

  return (
    <>
      <Helmet>
        <link rel="preconnect" href="https://cloud.typography.com" />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cloud.typography.com/6322132/6541412/css/fonts.css"
        />

        <link rel="stylesheet" type="text/css" href="/prism-one-dark.css" />

        <link
          rel="icon"
          href="/favicon-16x16.png"
          sizes="16x16"
          type="image/png"
        />
        <link
          rel="icon"
          href="/favicon-32x32.png"
          sizes="32x32"
          type="image/png"
        />
        <link rel="mask-icon" href="/logomark.svg" color="#000000" />
      </Helmet>

      <GlobalStyle />

      <Wrapper>
        <Header compact={location.pathname !== rootPath} />

        <Spacer size="50px" />

        <main>{children}</main>

        <Spacer size="70px" />

        <BodyContainer>
          <Subscribe />

          <Spacer size="70px" />

          <Footer />

          {pagination && (
            <>
              <Spacer size="70px" />

              {pagination}
            </>
          )}
        </BodyContainer>
      </Wrapper>

      <Tracking />
    </>
  )
}

export default Layout
