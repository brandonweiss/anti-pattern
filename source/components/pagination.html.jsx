import styled from "@emotion/styled"

const Pagination = styled.a`
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  width: 4rem;
  overflow: hidden;
  white-space: nowrap;
  color: inherit;
  opacity: 0.1;
  display: none;

  transition: width 0.20s ease,
              opacity 0.25s ease;

  @media (min-width: 750px) {
    display: block;
  }

  &:hover {
    width: 13.6rem;
    opacity: 1.0;
  }

  &.hidden {
    opacity: 0;
  }

  &.newer {
    left: 5px;
  }

  &.newer .title {
    margin-left: -0.4rem;
    text-align: left;
  }

  &.older {
    right: 5px;
    direction: rtl;
  }

  &.older .title {
    margin-right: -0.4rem;
    text-align: right;
  }
`

const Icon = styled.img`
  width: 4.5rem;
  vertical-align: middle;
`

const Title = styled.span`
  width: 9rem;
  white-space: normal;
  vertical-align: middle;
  margin-top: 0.4em;
  display: none;

  @media (min-width: 1300px) {
    display: inline-block;
  }
`

export default ({ newerPost, olderPost }) => (
  <React.Fragment>
    {
      newerPost && (
        <Pagination href={newerPost.path} className="pagination newer hidden">
          <Icon src="/images/angle-left.svg" />
          <Title className="title">{newerPost.meta.title}</Title>
        </Pagination>
      )
    }

    {
      olderPost && (
        <Pagination href={olderPost.path} className="pagination older hidden">
          <Icon src="/images/angle-right.svg" />
          <Title className="title">{olderPost.meta.title}</Title>
        </Pagination>
      )
    }
  </React.Fragment>
)
