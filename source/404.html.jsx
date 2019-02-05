import Layout from "./layouts/layout.html.jsx"

export default ({ environment }) => (
  <Layout title="Not Found" environment={environment}>
    <h1 className="center">
      404 Not Found
    </h1>

    <p className="center">
      That page doesn’t exist.
      Take a look in the <a href="/archive">archive</a> instead.
    </p>
  </Layout>
)
