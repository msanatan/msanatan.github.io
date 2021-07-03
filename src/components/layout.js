import * as React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import { Helmet } from 'react-helmet'
import { menuItem } from './layout.module.css'

const Layout = ({ pageTitle, children }) => {
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

  const siteTitleText = data.site.siteMetadata.title
  const title = `${pageTitle} | ${siteTitleText}`

  return (
    <div className='container d-flex flex-column min-vh-100'>
      <Helmet
        htmlAttributes={{
          lang: 'en',
        }}
        bodyAttributes={{
          className: 'h-100'
        }}
        title={title}
        meta={[
          {
            property: `og:title`,
            content: title,
          },
          {
            property: `og:type`,
            content: `website`,
          },
        ]}
      />
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
