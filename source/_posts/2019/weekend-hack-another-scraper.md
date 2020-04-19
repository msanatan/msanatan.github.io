---
title: Weekend Hack, Another Scraper
date: 2019-01-20 21:38:00
updated: 2019-02-02 01:04:00
categories:
- [web]
tags:
- python
- beautiful soup
---

So I recently started to write programming articles for another website. I thought it'd be a good idea to link the articles in my website. I've set it up here: <https://msanatan.com/categories/other/>.

The first thing I needed to do was get all my articles in one go. The scraper consists 3 parts:

* Parse the HTML to get the articles from my user page \- <https://stackabuse.com/author/marcus>
* Save each article as Markdown files with a `link` property
* Allow users to specify which author to scrape via command line arguments

## Parsing

For parsing I used [Beautiful Soup](https://www.crummy.com/software/BeautifulSoup/), definitely one of the most popular scarping libraries for Python. I skipped on `lxml` as the page is very simple, there was no need for fancy XPath. This function returns all the posts in a list of dictionaries. I'm not copying the content, so all I need are the names, links and dates.

```python
def parse_posts(author_url):
    '''Recursively retrieves all the posts of an blog write in stack abuse'''
    logging.info('Scraping {}'.format(author_url))
    posts = []
    # It's always good to set user-agent, makes the request looks more like a
    # regualr browsing request, without it some sites would outright block you
    headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.47 Safari/537.36'}
    response = requests.get(author_url, headers=headers)
    # Don't be too hasty, check that your response was actually succesful
    if response is not None and response.status_code == 200:
        html = BeautifulSoup(response.content, 'html.parser')
        # Loop through all the articles
        for article in html.find_all('article'):
            title_tag = article.find('h2', {'class': 'post-title'}).find('a')
            title = title_tag.text
            link = BASE_URL + title_tag['href']
            meta = article.find('div', {'class': 'post-meta'})
            # The date comes like December 10, 2018
            #  We really want it like 2018-12-10
            date_text = meta.find('span', {'class': 'date'}).text
            date = datetime.datetime.strptime(date_text, '%B %d, %Y')
            post = {
                'title': title,
                'link': link,
                'date': datetime.date.strftime(date, "%Y-%m-%d"),
            }
            posts.append(post)
        logging.info('{} posts found on page'.format(len(posts)))
        # Stack Abuse paginates every 5 posts, this collects the older ones
        pagination = html.find('nav', {'class': 'pagination'}).find('a', {'class': 'older-posts'})
        if pagination is not None:
            logging.info('Retrieving older posts')
            # Who said you don't use recursion?
            return posts + parse_posts(BASE_URL + pagination['href'])
        return posts
    else:
        logging.error('Could not get a response for the link')
        return []
```

## Saving Data

I needed to convert the data to markdown so that Hexo can use it. I figured that allowing JSON and CSV formats as well, this scraper could be of more use to others. Doesn't matter too much, Python makes saving in each file type dead simple:

```python
def get_posts_json(filename, author_url):
    '''Dumps JSON for stack abuse articles'''
    posts = parse_posts(author_url)
    logging.info('Retrieved {} posts'.format(len(posts)))
    with open(filename, 'w') as json_file:
        json.dump(posts, json_file, indent=4)


def get_posts_csv(filename, author_url):
    '''Saves CSV file for stack abuse articles'''
    posts = parse_posts(author_url)
    logging.info('Retrieved {} posts'.format(len(posts)))
    headers = ['Title', 'Link', 'Date']
    with open(filename, 'w') as csv_file:
        csv_writer = csv.writer(csv_file, delimiter=',', quoting=csv.QUOTE_ALL)
        csv_writer.writerow(headers)
        for post in posts:
            csv_writer.writerow([post['title'], post['link'], post['date']])


def get_posts_markdown(author_url):
    '''Saves posts as markdown files to work in Hexo'''
    posts = parse_posts(author_url)
    logging.info('Retrieved {} posts'.format(len(posts)))
    # As markdown produces many files, it's neater to have them in one folder
    pathlib.Path('articles').mkdir(exist_ok=True)
    for post in posts:
        # Use the slug as it's a more appropriate file name
        post_slug = slugify(post['title'])
        with open('articles/{}.md'.format(post_slug), 'w') as f:
            f.writelines([
                '---\n',
                'title: {}\n'.format(post['title']),
                'date: {}\n'.format(post['date']),
                'categories: [other]\n',
                'link: {}\n'.format(post['link']),
                '---\n',
            ])
```

## Command Line Arguments

Software is used by humans, always make your programs friendly. Python comes with a flexible argument parsing library which brings some order and useful information. Even for small programs like this, it feels better than processing `sys.argv` values myself. We put the `argparse` logic in the `main` function:

```python
def main():
    '''Argument parser for scraper'''
    # I imported the library like: from argparse import ArgumentParser
    # For most cases you just need the ArgumentParser class
    parser = ArgumentParser(description='Web scraper for Stack Abuse writers')
    # Adding an argument is pretty simple, I give the short and long forms,
    # specify the property the value will be saves as in dest and write a
    # useful help message. In this case the author should be required
    parser.add_argument('-a', '--author', dest='author',
                        help='Writer whose articles you want', required=True)

    # The user selects what format they would like the data in. A file can't be
    # JSON and CSV or CSV and Markdown at the same time so we make these options
    # mutually exclusive.
    group = parser.add_mutually_exclusive_group()
    group.add_argument('--csv', action='store_true',
                       help='Save data in CSV format')
    group.add_argument('--json', action='store_true',
                       help='Save data in JSON format')
    group.add_argument('--markdown', action='store_true',
                       help='Save data as Markdown articles for Hexo')

    # A simple way to manage log levels in your app!
    parser.add_argument('-l', '--loglevel', dest='loglevel',
                        help='Select log level', default='info')
    args = parser.parse_args() # Where all the magic happens

    # Set logging preferences
    if args.loglevel == 'error':
        log_level = logging.ERROR
    elif args.loglevel == 'debug':
        log_level = logging.DEBUG
    else:
        log_level = logging.INFO

    logging.basicConfig(filename='stackabuse_scraper.log',level=log_level)

    # BASE_URL was defined earlier in the script, fyi
    author_url = '{}/author/{}/'.format(BASE_URL, args.author)
    # Determine output format
    if args.csv:
        get_posts_csv('stackabuse_articles.csv', author_url)
    elif args.json:
        get_posts_json('stackabuse_articles.json', author_url)
    elif args.markdown:
        get_posts_markdown(author_url)
    # Put a default case for that one user who'll try to break it :-/
    else:
        print(json.dumps(parse_posts(author_url)))
```

## Conclusion

When I run `python3 stackabuse_scraper.py -a marcus --markdown` I get the following Markdown file as  output:

    ---
    title: Building a GraphQL API with Django
    date: 2018-12-10
    categories: [other]
    link: https://stackabuse.com/building-a-graphql-api-with-django/
    ---

Exactly what I wanted and usable with Hexo! This was just some of the annotated code, you can find the full script at <https://github.com/msanatan/stackabuse_scraper>. That's all I got through to this weekend, till next time

Happy Hacking!
