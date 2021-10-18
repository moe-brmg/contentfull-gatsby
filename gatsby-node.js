const path = require(`path`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Define a template for blog post
  const blogPost = path.resolve(`./src/templates/blog-post-contenful.jsx`)

  // Get all markdown blog posts sorted by date
  const result = await graphql(
    `
      {
        allContentfulPost {
          edges {
            node {
              slug
              title
              id
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  }

  const posts = result.data.allContentfulPost.edges

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostSlug = index === 0 ? null : posts[index - 1].node.slug
      const nextPostSlug =
        index === posts.length - 1 ? null : posts[index + 1].node.slug

      createPage({
        path: post.node.slug,
        component: blogPost,
        context: {
          slug: post.node.slug,
          previousPostSlug,
          nextPostSlug,
        },
      })
    })
  }
}
