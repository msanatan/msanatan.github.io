---
title: "Easy Emails with SendGrid"
date: 2014-11-09 12:32
categories:
- [web]
tags:
- coffeescript
- javascript
- node.js
---

Was doing a little hacking for a buddy, started off with a mobile app (based on this little PhoneGap [experiment](https://github.com/msanatan/medinform "medinform")) and I ended up coding the server as well. It didn't have to do much so some quick Node.js scripting was good enough for the task. One of the things that needed to be done was to send an email after some data was processed.

## SendGrid To The Rescue

So maybe I found out the server needed to send emails a few hours before a demonstration... I needed something that was quick to setup and easy to use. With some light googling I came across [SendGrid](https://sendgrid.com/ "SendGrid"), a company all about sending email. They got an amazing API and the docs are easy to follow. Aside from Node.js they support many other languages and frameworks, even Perl has support!

It's dead easy to get up and running, look at this small code snippet to send something off

```coffeescript
# Give it your API username and password when importing
sendgrid = require('sendgrid') config.sendgridApiUser, config.sendgridApiPassword

message = 'Some non-spammy text hopefully'

# The Email object has lots of parameters to customise your email
email = new sendgrid.Email
    to: 'some@body.com'
    from: 'you@sexything.com'
    bcc: ['keep the illuminati in the know']
    subject: 'SendGrid wins'
    text: message

# And a simple send function to do the job
sendgrid.send email, (err, json) ->
    if err?
        console.log err
    console.log json
```

And for basic purposes that'll do. You can send HTML as well, just setup your message with the right tags and switch 'text' in the Email object to 'html'. All this and so much more is covered in the [docs](https://github.com/sendgrid/sendgrid-nodejs "SendGrid for Node.js").

## SendGrid Is Not Alone

This is just the solution that I used, don't limit yourself to just SendGrid. There are an abundance of email delivery service providers out there - MailChimp, mailgun, Mailjet, the list is really long! Their free plans give you an abundance of emails to use for a small project, I thought SendGrid's 200/day was more than enough, and the popular ones got Node.js wrappers for their APIs.

You should also look at [Nodemailer](http://www.nodemailer.com/ "Nodemailer"), a library that pretty much is what it sounds like. This is truly the most popular email solution for Node.js, and they work well with SendGrid too. This library would make your email delivery service provider agnostic, which is cool :) and it can be extended with their API for plugins. Truth be told, it's as simple to use as SenGrid's library plus one step to connect to an SMTP server.
