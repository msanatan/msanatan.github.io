---
title: Switching To A Static Website
date: 2016/09/27
categories:
- [web]
tags:
- python
- pelican
- static websites
- blog
---

So if you've ever looked at this blog in recent history you might find things have changed just a bit. The change is a lot more than a theme, my blog is now a static website. A static website serves content exactly as it's stored on the server (e.g. this blog post is an HTML file which is available on the server). My blog was first built on WordPress, which is dynamic - content is generated upon request by calling the blog post stored in the database. If you fancy a visual guide to explain explain what it is, I recommend this pretty little thing I found online <http://nilclass.com/courses/what-is-a-static-website/#1>.

Why switch?

1. **Flow** I get to write like I code. Once upon a time I had many an IDEs for many a languages and frameworks. I got pretty tired of it and started to go deeper into Vim and pretty much consolidate my development tools into one great text editor. And yes, Vim has spellcheck. Also get to use Git for my blogs. This level of version control is only a plus.
2. **Costs... but really customisation** Stop using WordPress. For my purposes, it's just not that special. The cost wasn't that high for the entire yearly period, but that money can be used elsewhere, like for DigitalOcean droplets or a Steam sale. WordPress is very configurable and has a large community of people developing for and supporting it. I'm much more comfortable with Python/JavaScript than that behemoth of a blog. Makes sense to play on your strengths.
3. **Speed** Not a big deal for me, I thought WP Super Cache did a good job to be fair. And that makes perfect sense as that plugin generate static pages to be served to your users. But if you're not using something of that nature, then a static website might give you a bit of that performance. It can make a old server seem brand new! Well that's probably a bit too far, but it's cheaper to serve static files than load content dynamically.

I settled on [Pelican](http://docs.getpelican.com/en/3.6.3/) as it had good support and is pretty easy to setup. Out of the box GitHub pages support was a plus to what I consider the simplest setups of all considered (looked at Hugo, Wintersmith and Hakyll, the last pretty much stole my heart still). As expected there was a nifty tool to migrate a WordPress export to generate Markdown files. All in all it worked out well.

Will be planning to do some more custom pages soon, and really wanted the control a WordPress shaped box makes it harder to get. I previously had HTTPS in my WP site thanks to [Let's Encrypt](https://letsencrypt.org/) and good customer service, that option doesn't seem readily available with GitHub pages. I've noticed a lot of articles suggesting I use CloudFlare to work around it, will look into it and get it back. Make the world an encrypted one. Till then,

Happy static websiting
