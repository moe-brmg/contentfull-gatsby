import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { Container, Header, Image } from "semantic-ui-react"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.contentfulPost
  const { previous, next } = data
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title={post.title} />
      <Container style={{ marginTop: 50 }}>
        <article
          className="blog-post"
          itemScope
          itemType="http://schema.org/Article"
        >
          <Header as="h2">{post.title}</Header>
          <Image src={post.image.fluid.src} fluid style={{ marginTop: 25 }} />

          <div
            style={{ marginTop: 25 }}
            contentEditable="true"
            dangerouslySetInnerHTML={{
              __html: post.blogContent.childMarkdownRemark.html,
            }}
          ></div>
        </article>
        <nav className="blog-post-nav">
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
            }}
          >
            <li>
              {previous && (
                <Link to={`/${previous.slug}`} rel="prev">
                  ← {previous.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={`/${next.slug}`} rel="next">
                  {next.title} →
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </Container>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query ContentfulPostBySlug(
    $slug: String!
    $previousPostSlug: String
    $nextPostSlug: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulPost(slug: { eq: $slug }) {
      slug
      subtitle
      title
      id
      blogContent {
        childMarkdownRemark {
          html
        }
      }
      image {
        fluid {
          src
        }
      }
    }
    previous: contentfulPost(slug: { eq: $previousPostSlug }) {
      slug
      title
    }
    next: contentfulPost(slug: { eq: $nextPostSlug }) {
      slug
      title
    }
  }
`
