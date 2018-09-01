---
title: Adding More Hops to Your Brew
date: 2018/03/25
categories:
- [mac]
tags:
- homebrew
- mac
- python
---

Hey everyone! This one is the Mac users out there. While working on some Python projects I encountered an unusual error:

```
dyld: Library not loaded: @executable_path/../.Python
  Referenced from: /Library/Frameworks/Python.framework/Versions/3.6/bin/python3.6
  Reason: image not found
Abort trap: 6
```

Seems that my virtual environment didn't appreciate me upgrading my Python in homebrew and then running `brew cleanup` to remove the older version. The virtual envs were pointing to paths that no longer exists. Luckily this can be fixed with a simple unlinking and relinking of the Python brew. Granted I rather not remember to do this every breaking upgrade and cleanup, I added the following to my `.bash_profile` so I can get a command to relink all my brews.

```bash
function brewrelink() {
  brew list -1 | while read line; do brew unlink $line; brew link $line; done;
}

export -f brewrelink
```

And now my virtual envs are as dandy (yep... I used that word) as I am. Happy brewing!
