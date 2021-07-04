import * as React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import { menuItem } from './layout.module.css'
import Seo from './seo'

const Layout = ({ pageTitle, description, meta, children }) => {
  const data = useStaticQuery(graphql`
  query GetBuildInfo {
    site {
      buildTime
      siteMetadata {
        title
      }
    }
  }
  `)

  const title = `${pageTitle}`

  return (
    <div className='container d-flex flex-column min-vh-100'>
      <Seo title={title} description={description} meta={meta} />
      <header>
        <nav className='navbar navbar-expand-lg navbar-light'>
          <button className='navbar-toggler' type='button' data-bs-toggle="collapse" data-bs-target="#navBarTogglerMenu" aria-controls="navBarTogglerMenu" aria-expanded="false" aria-label="Toggle navigation">
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse justify-content-lg-center' id='navBarTogglerMenu'>
            <ul className='navbar-nav mr-auto mb-2 mb-lg-0'>
              <li className='nav-item'>
                <Link to='/' className={`nav-link ${menuItem}`}>Home</Link>
              </li>
              <li className='nav-item'>
                <Link to='/blog' className={`nav-link ${menuItem}`}>Blog</Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <main className='flex-grow-1 d-flex'>
        {children}
      </main>
      <footer className='footer mt-auto py-2'>
        <div className='container'>
          <span>&copy; {new Date().getFullYear()} Marcus Sanatan</span>
        </div>
      </footer>
    </div>
  )
}

export default Layout
