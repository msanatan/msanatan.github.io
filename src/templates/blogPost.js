import * as React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import { postContainer, header } from './blogPost.module.css'

const BlogPostTemplate = ({ data }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data

  const postMetadata = post.frontmatter.updated ? `${post.frontmatter.date} (updated: ${post.frontmatter.updated}) - ${post.frontmatter.tags.join(', ')}` : `${post.frontmatter.date} - ${post.frontmatter.tags.join(', ')}`

  return (
    <Layout pageTitle={siteTitle}>
      <div className={`container d-flex flex-column ${postContainer}`}>
        <div className='row'>
          <article
            className='blog-post'
            itemScope
            itemType='http://schema.org/Article'
          >
            <header className={`${header} my-3`}>
              <h1 itemProp='headline'>{post.frontmatter.title}</h1>
              <small>{postMetadata}</small>
            </header>
            <section
              dangerouslySetInnerHTML={{ __html: post.html }}
              itemProp='articleBody'
            />
          </article>
        </div>
        <div className='row my-3'>
          <nav className='blog-post-nav'>
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
                  <Link to={previous.fields.slug} rel='prev'>
                    ← {previous.frontmatter.title}
                  </Link>
                )}
              </li>
              <li>
                {next && (
                  <Link to={next.fields.slug} rel='next'>
                    {next.frontmatter.title} →
                  </Link>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        link
        tags
        date(formatString: "YYYY-MM-DD")
        updated(formatString: "YYYY-MM-DD")
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`