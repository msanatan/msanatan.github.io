import * as React from 'react'
import { Link } from 'gatsby'

const NotFoundPage = () => {
  return (
    <main>
      <title>Not Found</title>
      <h1>Page not found</h1>
      <p>Sorry, seems like you were trying to visit a page that doesn't exist! Maybe go back <Link to='/'>home</Link>?</p>
    </main>
  )
}

export default NotFoundPage
