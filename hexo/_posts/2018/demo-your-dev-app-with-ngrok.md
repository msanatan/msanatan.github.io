---
title: Demo Your Dev App With Ngrok
date: 2018/01/01
categories:
- [web]
tags:
- bash
---

Hey developers,

I'm extremely late to the game here but I just discovered [ngrok](https://ngrok.com/) and I'm a changed man. This tool connects to your app running on localhost and securely exposes it to the world. It's really useful when you're developing a webhook to get a secure https link that can be tested immediately.

It's just one file to download and unzip. To make life easier, make a symlink to /usr/local/bin so you can run it from anywhere in the terminal:

```bash
cd /usr/local/bin
ln -s [Path to unzipped ngrok download]/ngrok ngrok
```

Now you can just run `ngrok http [port]`. It exposes http and https connections, the latter being particularly useful for things like Facebook Messenger API that require secure connections. One of the best features is the inspector, as ngrok is running head on to <http://localhost:4040/> and you'll be able to have a look at any request made to your application. There's much more to it in the [docs](https://ngrok.com/docs) and paid plans that offer unique features and reduces many restrictions.

Happy New Year and happy hacking!
