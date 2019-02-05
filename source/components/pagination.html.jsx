export default ({ newerPost, olderPost }) => (
  <React.Fragment>
    {
      newerPost && (
        <a href={newerPost.path} className="pagination newer hidden">
          <img src="/images/angle-left.svg" className="icon" />
          <span className="title">{newerPost.meta.title}</span>
        </a>
      )
    }

    {
      olderPost && (
        <a href={olderPost.path} className="pagination older hidden">
          <img src="/images/angle-right.svg" className="icon" />
          <span className="title">{olderPost.meta.title}</span>
        </a>
      )
    }
  </React.Fragment>
)
