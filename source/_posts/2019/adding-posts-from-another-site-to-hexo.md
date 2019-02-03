---
title: Add Posts from Another Site to Hexo
date: 2019-02-03 14:14:00
categories:
- [web]
tags:
- hexo
- javascript
- static websites
- blog
---

Hey everyone!

In my last post I wrote about scraping another website I write articles for, which I include here <https://msanatan.com/categories/other/>. This is how I integrated them in the site.

## First Attempt with JSON

I first tried to load the extra blog posts as a [data file](https://hexo.io/docs/data-files.html). Hexo allows content stored as JSON or YAML in the `source/_data` directory to be loaded in templates. The scraper I built orginally stored the articles as JSON, and it worked. However, there were a couple of things I didn't like.

I needed to create new templates to load from the data files. This is added maintenance for my theme. If I write for more than one external site, I would have to scrape the other sites and integrate each site's blog posts into one JSON blob. While not a herculean effort, data files for such dynamic thing like posts do not feel intuitive.

Themes paginate easily for markdown files processed as posts. If you're reading from a data file, you'll have to implement pagination yourself. Doable, but I couldn't help but think there was a better way.

## Stick with Markdown for Posts

If you look at the Hexo docs for [variables](https://hexo.io/docs/variables.html), you can see two things:

* Pages have a `link` attribute that's described as "The external link of the article (Used in link posts)"
* Posts have all the variables Pages have

Therfore, we can link to an external post by the setting the appropriate markdown variable like this:

```
---
title: Your blog title
date: 2019-02-03
categories: [other]
link: https://example.com/other-post-from-you/
---
```

## Adding a Page for Linked Posts

The next time you run `hexo g` the posts would appear on your page just like the posts you write on your blog.

In my example, I used the 'other' as the category for the external post. That was intentional. If I'd like to create a page for those articles I just need to add `Other Writing: /categories/other/` to my theme's `_config.yml` navigation section:

```yaml
nav:
  Home: /
  About: /about/
  Archives: /archives/
  Other Writing: /categories/other/
  Search: /search/
  Contact: /contact/
```

Each theme has it's own way to define navigation, in my experience they're usually a configuration. The key thing is that it links to the `/categories/other/`. In my theme, a category page uses the archive template, something common in most themes as well. The archive template has pagination! So there's no need to recreate the same functionality for data files.

As the posts are markdown files, integrating blogs from different websites is easy. There's no need for consolidation into one file as I would have done with the JSON blob. This setup bypasses my 2 gripes with data files.

I didn't figure this out on my own, major thanks to [Tony Crowe](https://github.com/tcrowe) for dealing with my GitHub [issue](https://github.com/hexojs/hexo/issues/3423). He also gave me some pointers on how to filter posts with links and even highlight them with icons. The Hexo community is pretty helpful, when in doubt just give a shout.

Happy blogging!
