import * as React from 'react'
import Layout from '../components/layout'
import { Link } from 'gatsby'
import { heroTitle, subtitle, heroName } from './index.module.css'
import PageHead from '../components/pageHead'

export function Head({ location, params, data, pageContext }) {
  return (
    <PageHead
      meta={{
        title: "Not Found",
        description: "Sorry, seems like you were trying to visit a page that doesn't exist! Maybe go back home?",
      }}
    />
  );
}

const NotFoundPage = () => {
  return (
    <Layout title='Not Found'>
      <div className='flex-grow-1 d-flex align-items-center'>
        <div className='container'>
          <div className='row'>
            <div className='jumbotron'>
              <div className='container'>
                <h1 className={`${heroTitle} ${heroName}`} style={{ textAlign: 'center' }}>Page not found</h1>
                <p className={subtitle}>Sorry, seems like you were trying to visit a page that doesn't exist! Maybe go back <Link to='/'>home</Link>?</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default NotFoundPage
