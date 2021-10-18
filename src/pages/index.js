import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { Container, Header, Segment, Button, Grid } from "semantic-ui-react"
import BlogCard from "../components/blogCard"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`

  const hero = data.allContentfulHomePage.edges[0]
  const posts = data.allContentfulPost.edges || []

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All posts" />
      <Segment className="hero">
        <Container>
          <Header inverted as="h1">
            {hero.node.header1}
          </Header>
          <Header as="h2">{hero.node.header2}</Header>
          <div style={{ marginTop: 30 }}>
            <Button inverted style={{ marginRight: 15 }} primary>
              {hero.node.buttonLeft}
            </Button>
            <Button secondary>{hero.node.buttonRight}</Button>
          </div>
        </Container>
      </Segment>
      <Container className="blogs">
        <Header as="h2" centered>
          {" "}
          Recent Blogs
        </Header>
        <Grid stackable columns={3}>
          {posts.map(post => {
            const title = post.node.title || post.node.slug
            const image = post.node.image.fluid.src
            const header = post.node.title
            const meta = post.node.subtitle
            const description =
              post.node.blogContent.childMarkdownRemark.excerpt

            return (
              <Grid.Column>
                <Link to={post.node.slug}>
                  <BlogCard
                    image={image}
                    header={header}
                    meta={meta}
                    description={description}
                  />
                </Link>
              </Grid.Column>
            )
          })}
        </Grid>
      </Container>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulHomePage {
      edges {
        node {
          buttonLeft
          buttonRight
          header1
          header2
        }
      }
    }
    allContentfulPost {
      edges {
        node {
          slug
          subtitle
          title
          id
          image {
            fluid {
              src
            }
          }
          blogContent {
            childMarkdownRemark {
              excerpt
            }
          }
        }
      }
    }
  }
`
