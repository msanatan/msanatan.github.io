import * as React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import { slugify } from '../utils/slugify'
import { postContainer, header, navLink } from './blogPost.module.css'
import { tagLink } from './blogList.module.css'

const BlogPostTemplate = ({ data }) => {
  const post = data.markdownRemark
  const siteTitle = post.frontmatter.title
  const description = post.frontmatter.description || post.excerpt
  const { previous, next } = data

  const postMetadata = post.frontmatter.updated ? `${post.frontmatter.date} (updated: ${post.frontmatter.updated})` : `${post.frontmatter.date}`
  const postTags = (
    <p>
      {post.frontmatter.tags.map((tag, i) => {
        return i < post.frontmatter.tags.length - 1
          ? (<span key={i}><Link to={`/tags/${slugify(tag)}`} itemProp="url" className={tagLink}>{tag}</Link>, </span>)
          : (<Link to={`/tags/${slugify(tag)}`} itemProp="url" className={tagLink} key={i}>{tag}</Link>)
      })}
    </p>
  )

  return (
    <Layout title={siteTitle} description={description} meta={[{ keywords: post.frontmatter.tags }]}>
      <div className={`container d-flex flex-column ${postContainer}`}>
        <div className='row'>
          <div className='offset-lg-1 col-lg-10'>
            <article
              className='blog-post'
              itemScope
              itemType='http://schema.org/Article'
            >
              <header className={`${header} my-3`}>
                <h1 itemProp='headline'>{post.frontmatter.title}</h1>
                <small>{postMetadata}</small>
                {postTags}
              </header>
              <section
                dangerouslySetInnerHTML={{ __html: post.html }}
                itemProp='articleBody'
              />
            </article>
          </div>
        </div>
        <div className='row my-3'>
          <div className='offset-lg-1 col-lg-10'>
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
                    <Link to={previous.fields.slug} rel='prev' className={navLink}>
                      ← {previous.frontmatter.title}
                    </Link>
                  )}
                </li>
                <li>
                  {next && (
                    <Link to={next.fields.slug} rel='next' className={navLink}>
                      {next.frontmatter.title} →
                    </Link>
                  )}
                </li>
              </ul>
            </nav>
          </div>
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