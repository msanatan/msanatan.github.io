---
title: Things To Do After Setting Up Hexo
date: 2017-10-31 23:38:00
updated: 2017-11-02 13:13:00
categories:
- [web]
tags:
- hexo
- node.js
- javascript
- static websites
- blog
---

So I've just migrated my blog from Pelican to [Hexo](https://hexo.io/) (details about why I switched from WordPress can be found [here](/2016/09/27/switch-to-static/)). Hexo, like Pelican, is a static website generator. It's built on Node.js and what I really love Hexo's built-in support for GitHub Markdown syntax. There is honestly no Markdown like GH's own. Given that I am now fully immersed in JavaScript, VS Code is my main editor which has an awesome GH Markdown preview out of the box, and I've found myself writing loads of GH Markdown content for various purposes... I felt a switch to Hexo would further leverage my strengths by staying roughly in the same context and flow as my other work.

After reformatting my blog posts to work with Hexo, here are some things I did to make it 10x more user friendly and inline with expectations:

## Multiple Categories Without Heirarchy

You may be like me and first define your categories for a blog post as follows:

```yaml
categories:
- react
- api
```

The output of that would be to create a category "react" with a subcategory "api". If you want two independent categories simply change them to this:

```yaml
categories:
- [react]
- [api]
```

## Parse Posts In Subfolders

Since my Pelican days, I needed to have some order in my blogging life. I could never be OK with a single folder storing myriads of Markdown files, my brain won't cope. So I split my posts by year. For Hexo to read the posts in these subfolders and not just the regular root directory you'll have to modify this field in _config.xml (or whatever configuration file you're using):

```yaml
new_post_name: :layout/:title.md # File name of new posts
```

## Configure The Markdown Renderer To Handle Line Breaks

I'm someone who keeps my code before the 80 character mark, thank you PEP 8! My Markdown files are no different of course. By default, Hexo would add `<br />` tags for every line break I use - it looked hideous and disjointed. In your configuration file add the following so that the Mardown renderer does not generate those erroneous line breaks.

```yaml
marked:
  breaks: false
```

## Choose A Theme

While the default theme is... serviceable... Hexo has a fairly vibrant community that has [created lots of themes](https://hexo.io/themes/) that anyone is able to use. You'll get well over 100 options to choose from - all free! They also have a straightforward guide to [create themes as well](https://hexo.io/docs/themes.html). When adding a theme, the growing consensus is to use [Git Submodules instead of cloning](http://jr0cket.co.uk/hexo/using-git-submodules-for-custom-hexo-theme.html) for management purposes.

## Add Local Search

[hexo-generator-search](https://github.com/PaicHyperionDev/hexo-generator-search) is an awesome plugin that generates search data for your website. It produces an XML or JSON file that can be used for local searching. The [Cactus Dark](https://github.com/probberechts/cactus-dark) theme I'm using to kick off my Hexo setup has support for this plugin. Now readers have another alternative to tags and categories to find content on my site!

## Add Sitemap

Search engines and web crawlers love sitemaps, they tell them exactly how the content of a website relate to each other. [hexo-generator-sitemap](https://github.com/hexojs/hexo-generator-sitemap) would generate a new sitemap as you generate new content and publish.

## Add RSS Feed

[hexo-generator-feed](https://github.com/hexojs/hexo-generator-feed) as you would expect generates the atom.xml for those who live off RSS feeds.

## Future Developments

The flexibility of Hexo cannot be understated. There are some features I miss from my WordPress days that I'd love to see again. First of them all would be setting up a Contact page. Totally doable with the help of [Formspree](https://formspree.io/), a service that allows for such with a smooth user experience. I'd also want to get back user comments. Why not use Disqus? I don't trust them with my data. So what's possible then? Check out [Staticman](https://staticman.net/), another service that was created to give static websites wings. With these tools we can handle the dynamic elements of our website while we continue to enjoy the benefits of it being static.

Happy hexoing!
