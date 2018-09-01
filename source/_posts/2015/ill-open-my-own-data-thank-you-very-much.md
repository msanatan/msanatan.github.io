---
title: I'll Open My Own Data, Thank You Very Much
date: 2015/02/21 09:37
categories:
- [caribbean]
- [open data]
tags:
- lxml
- open data
- python
- web scraping
---

Citizen of the world: You want information to be publicly accessible? Freedom of Information Unit is neither efficient nor transparent? Information publicly available isn't in a form you can easily use? Well my friend, web scraping might just be for you!

## New Web Scraper On The Block

So I'm taking data from this page: <https://www.ttconnect.gov.tt/gortt/portal/ttconnect/!ut/p/a1/04_Sj9CPykssy0xPLMnMz0vMAfGjzOK9A40MTD0tjQ38Aw0sDYyCPA1dDUy9jd2DDIEKIlEUBLm7ARW4mhp6eIcZGxgYEKffAAdwJKg_ODVPP1w_Cq8yLwMMBZjOBCvA446C3NCICs9MRwCWELx4/dl5/d5/L2dBISEvZ0FBIS9nQSEh/?WCM_GLOBAL_CONTEXT=/gortt/wcm/connect/gortt+web+content/TTConnect/Home/Government+Ministries>. It provides links to contact information of each Government Ministry. Pretty straightforward and could be useful to complement some other data. Having wrote web scrapers before, I stuck to what I know best: Python 2.7 with lxml and requests. Many alternatives exist - considering Python alone you can use Beautiful Soup, Scrapy, webscraping and other libraries. Other languages got myriads of choices as well, you're not short of options.

It can be pretty simple too! Just look at the following code snippet:

```python
def scrape_ministry(url):
    '''Given a url, scrape the website and return a Ministry object'''
    try:
        page = requests.get(url, headers=HEADERS)
    except requests.exceptions.RequestException:
        print 'Could not reach the website'
        raise
    else:
        tree = html.fromstring(page.text)
        content = tree.xpath('//div[@class="portletMainContent"]')[0]
        name = content.xpath('./h3/text()')[0].strip()
        remaining_text = [x.strip().replace('\r\n', ' ') for x in content.xpath('.//p/text()')]
        address = remaining_text[0].split('Address:')[1].strip()
        telephone = parse_tel_nums(remaining_text[1], 'Telephone:')
        fax = parse_tel_nums(remaining_text[2], 'Fax:')
        try:
            website = content.xpath('p/a/text()')[0].strip()
        except IndexError:
            website = ''
        return Ministry(name, address, telephone, fax, website)
```

That's where the main scraping occurs. After the requests library is used to retrieve the HTML of the webpage, I use lxml to manoeuvre through the HTML and take the information I want. XPath isn't hard to learn, most of it should make sense once you know basic HTML. In all fairness the data I scraped was relatively well structured and easy - I've seen some ugly ones where these few lines won't do. Check out the entire scraper in this [gist](https://gist.github.com/msanatan/f42ab4e1a3f63ae65138 "Government Ministry web scraper". Don't be alarmed by the class and all the functions, I like encapsulation and I deliberately designed that code snippet with project scalability in mind!

## Impatience Is A Virtue, Take The Reins

Now we've gone through the what, let's discuss the why (hmm... shouldn't this be the other way around?). Trinidad and Tobago has a civilian led Open Data portal - <https://data.tt/>. It's growing quite well and I urge you all to show support by using the data, and offering to lend a hand if you can :). There is room for a lot more data though, and sometimes the available data is only stored in a proprietary format. **Open Data shouldn't be best accessible by proprietary software!** So no to .xls and (a softer) no to .xlsx - an open standard led by a commercial entity may not be entirely interest free...

And so I came up with my solution - do some web scraping and save it in vendor neutral formats like CSV and JSON (RDF for later). The goal is create 3 star and 5 star Open Data for anyone to use. 3/5 star? What am I talking about? I'm talking about Sir Tim Berners-Lee's [star scheme for Open Data](http://www.w3.org/DesignIssues/LinkedData.html) of course! Get familiar with it, and put the data you have available in perspective.

## Scrape For A More Open Nation, A More Open World

Hopefully you'll understand why I spent some time writing this scraper, it's not just for hacking's sake. It's the start of a collection of government data that can be shared with anyone, anywhere. And I want you to do the same! Let's make APIs for what we want to know. If the door to Open Data is closed, make your own key :)
