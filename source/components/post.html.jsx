export default ({ children, post }) => (
  <article className="post">
    <header className="clearfix">
      <h1 className="title">
        <a href={post.path}>
          {post.meta.title}
        </a>
      </h1>
    </header>

    {children}
  </article>
)
