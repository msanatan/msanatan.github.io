---
title: "Switching From Hexo to Gatsby"
date: 2021-08-15 17:53:00
categories:
- web
tags:
- react
- gatsby
- javascript
---

## Why Did Hexo Stopped Working For Me?

My blog was built with <a href="https://hexo.io" target="_blank" rel="nofollow noopener noreferrer">Hexo</a>, a static site generator built with Node.js. Let's get it out of the way, there's absolutely nothing wrong with it. It's super easy to use and has lots of themes and plugins. I felt like it quickly got out of my way so I could focus on writing blog posts in Markdown.

After using a really simple Hexo theme for years, I wanted to switch up the look on my site. However, web development has changed a lot since Hexo was one of the more popular static site generators. The idea of creating templates with EJS was just unappealing to me. Again, there's nothing wrong with EJS but I'd prefer to use the frontend frameworks I'm accustomed to like, React.js and Vue.js.

I've looked at <a href="https://www.gatsbyjs.com" target="_blank" rel="nofollow noopener noreferrer">Gatsby</a> when it first came out, and it looked ridiculously tedious to set up. Four years ago, Hexo was the better option for me. Now Gatsby has reached version 3 and I'm a much better React.js developer - this switch has been the best thing I could think of.

## Why Did Gatsby Work Better?

At the time I started building with Gatsby the v3 tutorial was nearly complete. The info there was still more than enough to get going with all your major blog features. Plus they got really good examples on GitHub that you can use to fill the gaps. It wasn't hard to build what I needed.

I don't remember much of the Gatsby v1 tutorial. However, I remember how I felt \- I'm coding too much to build a blog.  To be fair to Gatsby, they're not just focused on blogs but static sites of other kinds. I appreciate that flexibility more now than I did the first time I tried it out. Also, it's been finetuned quite a bit since then. Using components to build my site's new UI was a joy - definitely a step up from EJS. Generally, if you're familiar with React.js and GraphQL then you'll have a great experience.

Gatsby's plugin ecosystem is vibrant. Some of the plugins I really appreciated were: `gatsby-plugin-google-gtag`, `gatsby-plugin-google-fonts`, `gatsby-plugin-feed` (RSS feeds), and `gatsby-plugin-react-helmet` (for SEO). There are tons more you can use, and of course, you can leverage the React.js &amp; Node.js ecosystem. I use `prism` for syntax highlighting in my blog posts, `moment` to handle date formatting, and `bootstrap` because I'm not doing all that CSS by hand!

Having used React so much more in career and personal projects, this is better for me. I think someone new to web development and covered just HTML, CSS and JavaScript would have an easier time with Hexo and other frameworks. But that's the beauty of all these tools, lots of options!

There are still a few more things I'd like to do with my blog. I'm much more confident of getting it exactly the way I'd like with Gatsby under the hood. Till next time,

Happy static websiting!
