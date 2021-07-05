---
title: "Add a Contact Form to Your Static Site"
date: 2019-09-09 07:57:00
categories:
- [web]
tags:
- javascript
- hexo
---

Hey Static Website developers!

Here's a quickie into a feature which a lot of static websites don't really come out of the box with \- a contact page!

Contact forms are traditionally processed via server side logic: the form data is posted to an endpoint, processed and sent to the intended recipient by the mail server. Static websites were left behind for some time. Luckily mail has become a service, so it can be sent via an API.

## Basic Page Setup

At the very least, you need a page with a form in it, pretty straigthforward. If you're using Hexo like I am then you'll add a template for your contact page's form \(usually a `.ejs` file\) and create a Markdown file in your `source` directory to use that template.

## Formspree

So there's a "Contact page as a Service" called <a href="https://formspree.io" target="_blank" rel="nofollow noopener noreferrer">Formspree</a>. It saves you from having to build and deploy an app that processes post data, and sends you an email via SendGrid/MailChimp/mail server. It has a free tier that'll suit the needs of most personal blogs and it's also <a href="https://github.com/formspree/formspree" target="_blank" rel="nofollow noopener noreferrer">open source</a>.

There's isn't much to it aside from adding their URL with your email to the form's action, and naming a couple of `input` fields. No registration required, you're just assumed to be in the free tier until you sign up for the paid one. It's built with Flask and is pretty easy to get a hold on if required.

They're not the only one though, <a href="https://formcarry.com" target="_blank" rel="nofollow noopener noreferrer">formcarry</a> and <a href="https://formspark.io" target="_blank" rel="nofollow noopener noreferrer">Formspark</a> offer similar services with prices that might be better suited for certain business cases. In any case, don't let your theme be the only thing that lets a static site fly, APIs give you wings!

Happy forming!
