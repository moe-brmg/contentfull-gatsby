import * as React from "react"
import { Link } from "gatsby"
import { Container, Header, Icon, Segment } from "semantic-ui-react"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = (
      <Segment inverted className="MainHead">
        <Container>
          <h1 className="main-heading"></h1>
          <Header as="h1" inverted>
            <Link to="/">
              <Icon name="blogger b" /> {title}
            </Link>
          </Header>
        </Container>
      </Segment>
    )
  } else {
    header = (
      <Segment inverted className="MainHead">
        <Container>
          <h1 className="main-heading"></h1>
          <Header as="h1" inverted>
            <Link to="/">
              <Icon name="blogger b" /> {title}
            </Link>
          </Header>
        </Container>
      </Segment>
    )
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">{header}</header>
      <main>{children}</main>
      <footer>
        <Segment inverted>
          <Container>
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.com">Gatsby</a>
          </Container>
        </Segment>
      </footer>
    </div>
  )
}

export default Layout
