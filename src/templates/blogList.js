import * as React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import BlogListButton from '../components/blogButton'
import { slugify } from '../utils/slugify'
import { pageTitle } from '../styles/page.module.css'
import { postLink, tagLink } from './blogList.module.css'
import PageHead from '../components/pageHead'

export function Head({ location, params, data, pageContext }) {
  return (
    <PageHead
      meta={{
        title: "Blog",
        description: "A collection of my blog posts.",
      }}
    />
  );
}

const BlogListTemplate = ({ data, pageContext }) => {

  const { currentPage, numPages } = pageContext
  const posts = data.allMarkdownRemark.nodes
  const title = currentPage > 1 ? `Blog pg. ${currentPage}` : `Blog`

  if (posts.length === 0) {
    return (
      <Layout title={title}>
        <p>
          No blog posts found. Get to writing asap!
        </p>
      </Layout >
    )
  }

  let navButtons;
  if (numPages !== 1) {
    navButtons = (
      <div className='row my-1'>
        <div className='col-6 d-flex justify-content-end' >
          {currentPage > 1 ? <BlogListButton text='Previous' link={currentPage > 2 ? `/blog/${currentPage - 1}` : `/blog`} /> : null}
        </div >
        <div className='col-6 d-flex justify-content-start'>
          {currentPage < numPages ? <BlogListButton text='Next' link={`/blog/${currentPage + 1}`} /> : null}
        </div>
      </div >
    )
  }

  return (
    <Layout title={title}>
      <div className='container-fluid d-flex flex-column'>
        <div className={`row ${pageTitle}`}>
          <h1>Blog</h1>
        </div>
        <div className='row py-3'>
          <div className='col-sm-8 offset-sm-2'>
            <ol style={{ listStyle: `none` }}>
              {posts.map(post => {
                const title = post.frontmatter.title || post.fields.slug
                const postTags = (
                  <p>
                    {post.frontmatter.tags.map((tag, i) => {
                      return i < post.frontmatter.tags.length - 1
                        ? (<span><Link to={`/tags/${slugify(tag)}`} itemProp="url" className={tagLink}>{tag}</Link>, </span>)
                        : (<Link to={`/tags/${slugify(tag)}`} itemProp="url" className={tagLink}>{tag}</Link>)
                    })}
                  </p>
                )
                const postMetadata = post.frontmatter.updated ? `${post.frontmatter.date} (updated: ${post.frontmatter.updated})` : `${post.frontmatter.date}`

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
                        {postTags}
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
              })}
            </ol>
          </div>
        </div>
        {navButtons}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query AllBlogPostsForList($skip: Int!, $limit: Int!) {
    allMarkdownRemark(sort: {frontmatter: {date: DESC}}, limit: $limit, skip: $skip) {
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
