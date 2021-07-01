import * as React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import { pageTitle } from '../styles/page.module.css'
import { postLink } from './blogList.module.css'

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
      <div className={`${pageTitle} row`}>
        <h1>Blog</h1>
      </div>
      <div className='row align-self-center'>
        <div className='col-sm-6 offset-sm-3'>
          <ol style={{ listStyle: `none` }}>
            {posts.map(post => {
              const title = post.frontmatter.title || post.fields.slug
              const postMetadata = post.frontmatter.updated ? `${post.frontmatter.date} (updated: ${post.frontmatter.updated}) - ${post.frontmatter.tags.join(', ')}` : `${post.frontmatter.date} - ${post.frontmatter.tags.join(', ')}`

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
                          <Link to={post.fields.slug} itemProp="url" className={postLink}>
                            <span itemProp="headline">{title}</span>
                          </Link>
                        </h2>
                        <small>{postMetadata}</small>
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
        </div>
      </div>
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
