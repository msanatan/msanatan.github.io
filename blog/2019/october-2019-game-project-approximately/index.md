---
title: "October 2019 Game Project: Approximately"
date: 2019-10-06 14:45:00
categories:
  - game development
tags:
  - javascript
  - typescript
  - phaser
  - game development
---

To be honest, this is really more of an August \- October game project. It started at the end of <a href="https://itch.io/jam/jammin-2019" target="_blank" rel="nofollow noopener noreferrer">Jammin 2019</a> and I was finally able to close it off in October. The theme for that jam was Growth, so the game plays on that concept with a super simple puzzler.

You'll be presented with a group of balls on the top half of the screen, and you'll need to guess their colletive size on the bottom half of the screen. You can increase/grow the size of the current ball you got, and add up to 2 more balls as well. Check it out!

<a href="https://gameboymarcus.itch.io/approximately" target="_blank" rel="nofollow noopener noreferrer">https://gameboymarcus.itch.io/approximately</a>

## Tech Things

This project was done with <a href="https://phaser.io" target="_blank" rel="nofollow noopener noreferrer">Phaser 3</a> and <a href="http://www.typescriptlang.org" target="_blank" rel="nofollow noopener noreferrer">TypeScript</a>. Phaser was not needed for this game as it doesn't need a game loop. However, it was a good opportunity to try Phaser 3's scaling options and see how they work on mobile devices.

As the user interacts with a mouse on desktop, touch automatically works on mobile. The `FIT` mode was the best option for this game, and with little effort everything was mobile friendly!

I used <a href="https://parceljs.org" target="_blank" rel="nofollow noopener noreferrer">Parcel</a> to bundle the code as it's dead simple. That simplicity sacrifices speed as building the app could take anywhere from 2 \- 10 seconds. For a larger web game, I rather invest some time getting webpack optimised.

Uploading the game to <a href="https://itch.io" target="_blank" rel="nofollow noopener noreferrer">https://itch.io</a> was pretty straightforward, at least for a free one. As itch provides a stream of just released games \(and there are many new indie games released all the time, what a beautiful platform\), I got a few more players than I expected. That was pretty cool.

**Note**: If you're deploying a web game on itch then you'll have to add `--public-url '.'` when building the app. Itch can host your web games but they need to use relative URLs. By default, parcel builds with absolute URLs.

## Reflections

I really enjoyed working on this! Phaser has always been one of those intuitive frameworks that I got attached too.

The scaling options open so many doors for mobile friendly games, I'm honestly pretty excited by what can be done. Credit to the Phaser devs for making it so easy.

I'm also all for TypeScript in my Phaser games. It isn't necessary to get something going, even a large game can be done comfortably with standard EcmaScript. However, those errors I got about functions not being available for a certain type and being able see the types of function arguments were so helpful. All little time savings add up!

There's a lot of work that can be done to improve this game: more levels, menu, music and saving progress to name a few. The play time is about 5 minutes, somewhat reflective of the time I used to develop it. You can get the code here: <a href="https://github.com/msanatan/approximately" target="_blank" rel="nofollow noopener noreferrer">https://github.com/msanatan/approximately</a>

Happy game developing!
