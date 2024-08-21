import * as React from 'react'
import Layout from '../components/layout'
import { StaticImage } from 'gatsby-plugin-image'
import { heroTitle, subtitle, heroName } from './index.module.css'
import PageHead from '../components/pageHead'

export function Head({ location, params, data, pageContext }) {
  return (
    <PageHead
      meta={{
        description: "I build software, content and communities.",
      }}
    />
  );
}

const IndexPage = () => {
  return (
    <Layout title='Home'>
      <div className='flex-grow-1 d-flex align-items-center'>
        <div className='container'>
          <div className='row'>
            <div className='col-sm-4 d-flex justify-content-center py-5 py-md-0'>
              <StaticImage
                alt='Pixel avatar of Marcus'
                src='../images/avatar.png'
              />
            </div>
            <div className='col-sm-8 d-flex align-items-center'>
              <div className='jumbotron'>
                <div className='container'>
                  <h1 className={heroTitle}>Hi, I'm <span className={heroName}>Marcus Sanatan</span></h1>
                  <h3 className={subtitle}>I build software, content and communities.</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
