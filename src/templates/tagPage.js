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
        title: pageContext.tag,
        description: `A collection of my blog posts tagged with ${pageContext.tag}`,
      }}
    />
  );
}

const TagsTemplate = ({ data, pageContext }) => {
  const { currentPage, numPages, tag } = pageContext
  const posts = data.allMarkdownRemark.nodes
  console.log(posts)
  const title = currentPage > 1 ? `${tag} pg. ${currentPage}` : `${tag}`

  if (posts.length === 0) {
    return (
      <Layout title={title}>
        <p>
          Yikes! Can't find no blogs with that tag. Check back later!
        </p>
      </Layout >
    )
  }

  let navButtons;
  if (numPages !== 1) {
    navButtons = (
      <div className='row my-1'>
        <div className='col-6 d-flex justify-content-end' >
          {currentPage > 1 ? <BlogListButton text='Previous' link={currentPage > 2 ? `/tags/${slugify(tag)}/${currentPage - 1}` : `/tags/${slugify(tag)}`} /> : null}
        </div >
        <div className='col-6 d-flex justify-content-start'>
          {currentPage < numPages ? <BlogListButton text='Next' link={`/tags/${slugify(tag)}/${currentPage + 1}`} /> : null}
        </div>
      </div >
    )
  }

  return (
    <Layout title={title}>
      <div className='container-fluid d-flex flex-column'>
        <div className={`row ${pageTitle}`}>
          <h1>{`Tags: ${tag}`}</h1>
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
  query AllBlogPostsForTags($tag: String, $skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: {frontmatter: {date: DESC}}
      filter: {frontmatter: {tags: {in: [$tag]}}}
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

export default TagsTemplate
