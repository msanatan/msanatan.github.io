import * as React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
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

  return (
    <div className='container h-100 d-flex flex-column'>
      <div className='row'>
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
      </div>
      <div className='row flex-grow-1'>
        {children}
      </div>
    </div >
  )
}

export default Layout
