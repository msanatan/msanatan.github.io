const path = require(`path`)
const moment = require(`moment`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Define a template for blog post
  const blogPost = path.resolve(`./src/templates/blogPost.js`)
  const blogList = path.resolve(`./src/templates/blogList.js`)
  const tagPage = path.resolve(`./src/templates/tagPage.js`)

  // Get all markdown blog posts sorted by date
  const result = await graphql(
    `
      {
        posts: allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: ASC }
          limit: 1000
        ) {
          nodes {
            id
            fields {
              slug
            }
          }
        }
        tagsGroup: allMarkdownRemark(
          limit: 1000
        ) {
          group(field: frontmatter___tags) {
            fieldValue
            totalCount
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

  const posts = result.data.posts.nodes
  const postsPerPage = 10
  const numPagesForPosts = Math.ceil(posts.length / postsPerPage)

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  Array.from({ length: numPagesForPosts }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog` : `/blog/${i + 1}`,
      component: blogList,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages: numPagesForPosts,
        currentPage: i + 1,
      },
    })
  })

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : posts[index - 1].id
      const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id

      createPage({
        path: post.fields.slug,
        component: blogPost,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
        },
      })
    })
  }

  const tags = result.data.tagsGroup.group

  tags.forEach(tag => {
    const numPagesForTag = Math.ceil(tag.totalCount / postsPerPage)

    Array.from({ length: numPagesForTag }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/tags/${slugify(tag.fieldValue)}` : `/tags/${slugify(tag.fieldValue)}/${i + 1}`,
        component: tagPage,
        context: {
          tag: tag.fieldValue,
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages: numPagesForTag,
          currentPage: i + 1,
        },
      })
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField, createRedirect } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode }).split('/')[2]
    const postDate = moment(node.frontmatter.date)
    const legacyBlogUrl = `${postDate.format('YYYY/MM/DD')}/${value}`
    const url = `/blog/${legacyBlogUrl}`

    createNodeField({
      name: `slug`,
      node,
      value: url,
    })

    createRedirect({
      fromPath: `/${legacyBlogUrl}/`,
      toPath: url,
      redirectInBrowser: true,
      isPermanent: true,
    })
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
    }

    type Fields {
      slug: String
    }
  `)
}

function slugify(str) {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  const from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  const to = "aaaaeeeeiiiioooouuuunc------";

  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  return str;
}
