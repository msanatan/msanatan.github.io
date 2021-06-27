import * as React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'

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
    <div className='container w-100 h-100'>
      <div className='row'>
        <header>
          <nav className='navbar navbar-expand-lg navbar-light'>
            <button className='navbar-toggler' type='button'>
              <span className='navbar-toggler-icon'></span>
            </button>
            <div className='collapse navbar-collapse' id='navBarTogglerMenu'>
              <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                <li className='nav-item'>
                  <Link to='/' className='nav-link'>Home</Link>
                </li>
                <li className='nav-item'>
                  <Link to='/blog' className='nav-link'>Blog</Link>
                </li>
              </ul>
            </div>
          </nav>
        </header>
      </div>
      <div className='row'>
        <main>
          {children}
        </main>
      </div>
    </div >
  )
}

export default Layout
