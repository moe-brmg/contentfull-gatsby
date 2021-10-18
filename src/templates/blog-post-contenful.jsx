import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.contentfulPost
  const { previous, next } = data
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title={post.title} />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.title}</h1>
        </header>
        <img src={post.image.fluid.src} alt="alt" />
        <hr />
        <div
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
