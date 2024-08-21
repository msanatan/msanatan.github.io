---
title: "Devlog for MeTwo: The Journey From Prototype to MVP"
date: 2021-09-19 09:55:00
categories:
  - game development
tags:
  - unity
  - game development
---

> This article was originally posted here: <https://gameboymarcus.itch.io/metwo/devlog/287367/the-journey-from-prototype-to-mvp>

Hi everyone!

As a newbie Unity dev, MeTwo was a great experience for me. I leveled up a lot during that game jam, far more quickly than the tutorials I follow were taking me. Between my inexperience and the time frame, it's very unpolished.

While I'm no longer under the constraints of a game jam, I'm dedicated some time to improve MeTwo from what was essentially a prototype into an MVP.

## New Coat of Paint

One of the first things I wanted to do was make the game look better. It was serviceable, but few or any person outside the game jam environment would want to play it if they saw it. I'm not artist, so I looked for suitable asset packs.

I figured a dungeon theme works nicely, and settled for this one <https://0x72.itch.io/dungeontileset-ii>. Someone already made an asset pack for Unity, which made integrations a lot easier: <https://revenger-wizard.itch.io/dungeon-tileset-assets>.

This is definitely an upgrade from what was there before! The new assets don't always completely fit the game's tile layout, but the overall wins outweigh the losses.

## Building for WebGL

One way to make your game as accessible as possible is to build it for the web. Any device can run it, and from here on out I'll be building MeTwo, and all Unity projects, for the Web. This didn't come with issues, when testing locally I would sometimes encounter tile extrusion (black lines between tiles in your tilemap). I haven't encountered this problem since deploying.

## Technical Challenges

I noticed a bug when I added a screen transition between levels. Every time the duplicate collected a gem to complete the level, it crashed. I tried to debug and no dice. Just a note to self, after setting up your external editor configs, be sure to rebuild the project files.

With the debugger working, it was easy to see that my clone sprite have the component required for loading a next level. It's a minor challenge, but getting your debugger up and running is key to quickly dealing with these issues.

## Next Steps

I do plan to continue MeTwo development. This update was more of visual swap without much else. In the near future I'd like to make it mobile friendly. Thereafter I'm thinking of a more radical update, with more free flowing 8D movement and more fun puzzles!
