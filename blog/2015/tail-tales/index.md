---
title: "Tail Tales"
date: 2015-12-26 14:12
categories:
- linux
tags:
- bash
---

Not too long ago I found myself in a little jam using the tail command. I needed to keep tabs on a log file which would be archived and emptied when it reaches a certain size. Since the script I was writing would need all the contents that was logged and not only what was currently in the file, I had this running in the background:

```sh
tail -f sexy_log_file.txt >> all_logged_stuff.txt
```

I thought that was straightforward enough. So after a few minutes I wanted to see if my little command works (by then the log file would have archived its old content and start over). To my not so pleasant surprise it just stopped tailing. Well that sucked. This time I was decided to watch it attentively and noticed that it stopped following the file when the old content is archived and it got emptied.

## Why Tail No Follow?

Even with the same name, the properties of the file will change. Unix file systems store the contents of the file and the metadata about the file in two separate data structures. The metadata is called an inode. They store lots of stuff about a file: it's location, the owner, permissions, timestamps and more. Each file has a unique inode number. You can get the inode number of a file with `ls -i <file>`. The -f option of tells tail to follow a file by its descriptor. So as the file is overwritten, the inode number changes and thus tail stops following. You can easily test it: create a file, check the inode number, use a text editor and add something, save changes and recheck the inode number and you'll see it's different.

## The Solution

To circumvent this issue, you simply need to make the following change

```sh
tail -F sexy_log_file.txt
```

The capital F tells tail to follow the file by its name, not its properties. If you delete a file while using `tail -F` a messages comes up saying that it's gone, and when you recreate it with the same name another message comes up saying that it's back to following its contents. Now that my tail-induced headache is gone, I can get back to scripting in peace :). Happy hacking everyone!
