---
title: My First Arduboy Game - The Social Distance Game
date: 2020-04-13 10:30:00
categories:
- [games]
- [game development]
tags:
- arduboy
- c++
---

It's a pretty strange time all around the world as we manoeuvre through the COVID-19 pandemic. Right before my country's lockdown began, I collected my long-awaited Arduboy.

I guess this game's idea was natural. You play as an adorable sprite called Ghostie (why not?) and try your best to avoid contact with the various pedestrians. Here's a screenshot of my first Arduboy game \- The Social Distance Game:

![Screenshot of Social Distance Game](/images/my-first-arduboy-game-the-social-distance-game/screenshot01.png)

Like life, it's unfair so don't stress about racking up high points. We should try to stay home as well!

You can check out the game on <a rel="nofollow noopener" target="_blank" href="https://msanatan.itch.io/the-social-distance-game">itch.io</a>, or just play it on this emulator:

<https://felipemanga.github.io/ProjectABE/?url=https://community.arduboy.com/uploads/short-url/tDhSFHoyFSrMawGHAXNMEYPkgs5.hex>

This was my first game for the Arduboy. While simple to conceive and execute, I've learnt a lot. If you're new or considering getting the Arduboy, I hope my reflections will help out!

## Setting up on Mac

When I first got the Arduboy, it came loaded with a really fun game called <a rel="nofollow noopener" target="_blank" href="https://community.arduboy.com/t/sirene-tenth-team-a-r-g-game/2206">Sirène</a>. I wanted to play a few other games as the catalogue really impressed me.

On the main website it has a <a rel="nofollow noopener" target="_blank" href="https://arduboy.com/upload-games/">list of software</a> to upload Arduboy binaries (a .hex file or the community created .arduboy file).

Unfortunately, at this point in time I can only use the <a rel="nofollow noopener" target="_blank" href="https://www.arduino.cc/en/Main/Software#download">Arduino IDE</a>. The IDE is easy to use and works well but I imagine it's a lot less convenient than the dedicated loaders.

Well, I'm experimenting with a Python and Node.js script to see which works better for me. If either works out, I'll make a small GUI for it.

In any case, <a rel="nofollow noopener" target="_blank" href="https://community.arduboy.com/t/arduboy-uploader-for-mac/8728">I asked the community about it</a>. Seems that with a bit of patience I'll have my game loader on Mac!

## The Community and Github

While talking about setting up on the Mac, I've mentioned the community a lot. The community is one of the strengths of the Arduboy. The members are active, helpful, respectful and sometimes inspiring.

When developing this game, the community forum was one of my most important resources. A lot of questions you have are probably already there. When you ask a question, it's safe to expect a genuinely helpful response.

Another major resource for me to figure out how to make games were Github repositories. Arduboy and Open Source were married from the start. As someone who hasn't touched C++ in a while, the plethora of example code helped me determine the best way forward more than once.

On that note...

## Re-learning C++

I last consistently coded in C++ 10 years ago. My oh my, how things have changed. Arduino also doesn't have the standard C++ libraries which probably reduced the familiarity a bit more as well.

I spent a good bit of time making this game on re-learning C++ and trying to catch up with modern best practices. I actually want to spend some time learning it from scratch once more. The best developers don't keep swimming in shallow water, at some point I have to do a deep dive into the language and the Arduino ecosystem to be really competent.

## A Better Development Experience

The Arduino IDE was my gateway to playing games as well as developing them. The tutorials used them, and their integration made it pretty sensible to use.

If you don't mind having one big file with all your code.

At most, my file was about 400 lines long which is pretty manageable. And yet, it still felt wrong. Admittedly I didn't spend a lot of time getting to know the IDE's short cuts and customizations. Truth is, I don't want to.

I'm pretty happy with <a rel="nofollow noopener" target="_blank" href="https://vscodium.com/">VS Codium</a>(VS Code without the Microsoft tracking and other non-OSS bits). Thankfully, there's an excellent but preview VS Codium extension aptly called "Arduino". It can compile and upload your game (using the IDE it seems).

The extension was created by Microsoft, they're doing a good job! What about the reason for switching to VS Codium? Well, the extension is under the MIT license. The privacy policy...

## Art and Sound

Pixel art is fun, and the sprites for this game were pretty simple. However, the standard for art and music is <a rel="nofollow noopener" target="_blank" href="https://www.youtube.com/watch?v=bSXqe7TXcM8">pretty darn high</a>.

This game I used a lot of different things. The sprites were created in <a rel="nofollow noopener" target="_blank" href="https://www.piskelapp.com/">Piskel</a>. It's free, online and easy to use. Animations are quite cool too.

However, it's a bit hard to manage when you got a lot of sprites. Piskel would do a lot better by being able to create folders. I guess that's where we come in and help out in OSS right?

I also looked away from Piskel because writing text was hard. Fonts that work for a screen that's 128px wide and 64px long are few and far between. Drawing letters are a bit tricky for me right now.

At this time I went back to <a rel="nofollow noopener" target="_blank" href="https://www.gimp.org/">Gimp</a>, which I experimented with for pixel art a bit over a year ago. I used the monospace fonts to write the text for my basic title screen. Given the scope of this mini-game, it was fine.

Art is one part of a good game. Music is right up there as well! I have the least amount of experience in this domain. Thankfully some good folks created a track editor for Arduboy games: <http://teamarg.github.io/trackerEditor/>. I only wanted one sound effect and got it pretty easily. It didn't' work in Chrome but all was well in Firefox.

## Another One

Working on this game got me more excited about the Arduboy and the community I've now become a part of. My partner and I wrote down a few ideas of what to build, but I think I'll work on a platformer next.

Happy gaming everyone!
