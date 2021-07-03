import * as React from 'react'
import { Link } from 'gatsby'
import { btnNav } from './blogButton.module.css'

const BlogListButton = ({ text, link }) => {
  return (
    <Link to={link} type='button' className={`btn ${btnNav}`} role='button'>{text}</Link>
  )
}

export default BlogListButton
