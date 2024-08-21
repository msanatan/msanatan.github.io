import * as React from 'react'
import Layout from '../components/layout'
import { pageTitle } from '../styles/page.module.css'
import { socialLink } from './about.module.css'
import PageHead from '../components/pageHead'

export function Head({ location, params, data, pageContext }) {
  return (
    <PageHead
      meta={{
        title: "About",
        description: "Hi! I'm Marcus Sanatan, a software developer from Trinidad and Tobago",
      }}
    />
  );
}

const AboutPage = () => {
  return (
    <Layout title='About Me'>
      <div className='container d-flex flex-column'>
        <div className={`row ${pageTitle}`}>
          <h1>About</h1>
        </div>
        <div className='row my-3'>
          <div className='offset-2 col-8'>
            <p>Hi! I'm Marcus Sanatan, a software developer from Trinidad and Tobago. Here are my current tech stacks:</p>
            <ul>
              <li>Game Development with Unity</li>
              <li>Backend Development with Golang, Node.js (Express.js, NestJS, Strapi), Python (AWS Chalice, Flask)</li>
              <li>Frontend Development with React.js. I like TypeScript as well</li>
              <li>Mobile App Development with React Native</li>
            </ul>
            <p>I host <a href='https://itch.io/jams/hosted-by-gameboymarcus' target='_blank' rel='noopener nofollow noreferrer'>game jams</a> for Caribbean game developers! Feel free to join us on <a href='https://discord.gg/axGtfrk' target='_blank' rel='noopener nofollow noreferrer'>Discord</a></p>
            <p>Unless otherwise mentioned, all views expressed on this website are my own and do not represent the views of my employer or any organisation I am affiliated with.</p>
          </div>
        </div>
        <div className='row mt-3'>
          <div className='offset-2 col-8'>
            <p>Find me on:</p>
            <ul className='list-unstyled'>
              <li>
                <i className='bi bi-github'></i>
                <div className='d-inline-block px-3'>
                  <a href='https://github.com/msanatan' target='_blank' rel='noopener nofollow noreferrer' className={`${socialLink}`}>GitHub</a>
                </div>
              </li>
              <li>
                <i className='bi bi-instagram'></i>
                <div className='d-inline-block px-3'>
                  <a href='https://www.instagram.com/gameboymarcus/' target='_blank' rel='noopener nofollow noreferrer' className={socialLink}>Instagram</a>
                </div>
              </li>
              <li>
                <i className='bi bi-linkedin'></i>
                <div className='d-inline-block px-3'>
                  <a href='https://www.linkedin.com/in/msanatan/' target='_blank' rel='noopener nofollow noreferrer' className={socialLink}>LinkedIn</a>
                </div>
              </li>
              <li>
                <i className='bi bi-youtube'></i>
                <div className='d-inline-block px-3'>
                  <a href='https://www.youtube.com/c/MarcusSanatan' target='_blank' rel='noopener nofollow noreferrer' className={socialLink}>YouTube</a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AboutPage
