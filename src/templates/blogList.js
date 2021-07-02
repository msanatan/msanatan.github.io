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
      <div className='container-fluid d-flex flex-column'>
        <div className={pageTitle}>
          <h1>Blog</h1>
        </div>
        <div className='row py-3'>
          <div className='col-sm-8 offset-sm-2'>
            <ol style={{ listStyle: `none` }}>
              {posts.map(post => {
                const title = post.frontmatter.title || post.fields.slug
                const postMetadata = post.frontmatter.updated ? `${post.frontmatter.date} (updated: ${post.frontmatter.updated}) - ${post.frontmatter.tags.join(', ')}` : `${post.frontmatter.date} - ${post.frontmatter.tags.join(', ')}`

                if (!post.frontmatter.link) {
                  return (
                    <li key={post.fields.slug} className='py-1'>
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
        <div className='row my-1'>
          <div className='col-4 d-flex justify-content-end'>
            <button type='button' className='btn btn-dark'>Previous</button>
          </div>
          <div className='offset-4 col-4 d-flex justify-content-start'>
            <button type='button' className='btn btn-dark'>Next</button>
          </div>
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
