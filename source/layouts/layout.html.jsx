import Tracking from "../components/tracking.html.jsx"

export default ({ children, environment, head, title }) => (
  <html lang="en">
    <head>
      <title>{title}</title>

      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="author" content="Brandon Weiss" />

      <link href="/stylesheets/application.css" rel="stylesheet" />
      <script src="/javascripts/application.js"></script>

      <link rel="alternate" type="application/json" title="Anti-pattern" href="/feed.json" />
      <link rel="alternate" type="application/atom+xml" title="Anti-pattern" href="/feed.xml" />

      {head && head}
    </head>

    <body>
      <header className="header">
        <p className="center">
          This is <a href="/">Anti-pattern</a><span className="show-small">—thoughts on programming
          {" "}
          <span className="show-medium">and whatnot</span>
          {" "}
          by <a href="http://brandonweiss.me">Brandon Weiss</a></span>.
        </p>
      </header>

      <section className="content">
        {children}
      </section>

      <footer className="footer">
        <div className="avatar center">
          <img src="/images/avatar.png" />
        </div>

        <p className="h3 center name">Brandon Weiss</p>

        <p className="links center">
          <a href="https://brandonweiss.me" className="button">
            brandonweiss.me
          </a>

          <a href="https://twitter.com/brandon_weiss" className="button">
            @brandon_weiss
          </a>

          <a href="mailto:brandon@anti-pattern.com" className="button">
            brandon@anti-pattern.com
          </a>
        </p>
      </footer>

      <Tracking environment={environment} />
    </body>
  </html>
)
