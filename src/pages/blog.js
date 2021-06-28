import * as React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import { pageTitle } from '../styles/page.module.css'

const BlogPage = ({ data }) => {
  return (
    <Layout pageTitle='Blog'>
      <h1 className={pageTitle}>Blog</h1>
      <ul>
        {
          data.allFile.nodes.map(node => (
            <li key={node.name}>
              {node.name}
            </li>
          ))
        }
      </ul>
    </Layout>
  )
}

export const query = graphql`
  query AllBlogPosts {
    allFile {
      nodes {
        name
      }
    }
  }
`

export default BlogPage
