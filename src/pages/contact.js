import * as React from 'react'
import Layout from '../components/layout'
import { contactForm, btnSubmit } from './contact.module.css'
import { pageTitle } from '../styles/page.module.css'


const ContactPage = () => {
  return (
    <Layout title='Contact'>
      <div className='container d-flex flex-column'>
        <div className={`row ${pageTitle}`}>
          <h1>Contact Me</h1>
        </div>
        <div className='row my-3'>
          <div className='offset-2 col-8'>
            <p>Want to get in touch? Enter your details below</p>
          </div>
        </div>
        <div className='row'>
          <form action='https://formspree.io/f/mpzkakgo' method='POST' className={`offset-2 col-8 ${contactForm}`} name='contact'>
            <div className='mb-3'>
              <label htmlFor='name' className='form-label'>Name</label>
              <input type='text' className='form-control' id='name' name='name' required />
            </div>
            <div className='mb-3'>
              <label htmlFor='_replyto' className='form-label'>Email</label>
              <input type='email' className='form-control' id='email' name='_replyto' placeholder='name@example.com' required />
            </div>
            <div className='mb-3'>
              <label htmlFor='_subject' className='form-label'>Subject</label>
              <input type='text' className='form-control' id='email' name='_subject' required />
            </div>
            <div className='mb-3'>
              <label htmlFor='message' className='form-label'>Message</label>
              <textarea className='form-control' id='message' name='message' rows='5' required></textarea>
            </div>
            <button type='submit' className={`btn ${btnSubmit}`}>Submit</button>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default ContactPage