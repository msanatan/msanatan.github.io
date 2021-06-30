import * as React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import { pageTitle } from '../styles/page.module.css'

const BlogListTemplate = ({ data }) => {

  const posts = data.allMarkdownRemark.nodes

  if (posts.length === 0) {
    return (
      <Layout pageTitle='Blog'>
        <p>
          No blog posts found. Get to writing asap!
        </p>
      </Layout >
    )
  }

  return (
    <Layout pageTitle='Blog'>
      <h1 className={pageTitle}>Blog</h1>
      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug

          if (!post.frontmatter.link) {
            return (
              <li key={post.fields.slug}>
                <article
                  className="post-list-item"
                  itemScope
                  itemType="http://schema.org/Article"
                >
                  <header>
                    <h2>
                      <Link to={post.fields.slug} itemProp="url">
                        <span itemProp="headline">{title}</span>
                      </Link>
                    </h2>
                    <small>{post.frontmatter.date} - {post.frontmatter.tags.join(', ')}</small>
                  </header>
                  <section>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: post.frontmatter.description || post.excerpt,
                      }}
                      itemProp="description"
                    />
                  </section>
                </article>
              </li>
            )
          }
        })}
      </ol>
    </Layout>
  )
}

export const query = graphql`
query AllBlogPostsForList($skip: Int!, $limit: Int!) {
  allMarkdownRemark(
    sort: { fields: [frontmatter___date], order: DESC }
    filter: {frontmatter: {link: {eq: null}}}
    limit: $limit
    skip: $skip
    ) {
    nodes {
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
        updated(formatString: "YYYY-MM-DD")
        tags
      }
    }
  }
}
`

export default BlogListTemplate
