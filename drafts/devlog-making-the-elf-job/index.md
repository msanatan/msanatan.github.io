---
title: "Devlog for The Elf Job: Making This Game"
date: 2021-12-27 09:55:00
tags:
  - godot
  - game development
---

Hello lovely people! I recently launched this short game, The Elf Job, and I'm pretty excited about it for many reasons. It was great to get back into Godot, and this is definitely going to be my game engine of choice moving forward. It was the first time I made an adventure game, with dialogue like my favourite JRPGs. I also tied for first as well, not a big deal but it's nice.

This fun and success in the game jam wasn't built in 2.5 day period alone. I was pretty deliberate in preparing for it.

## Preparing for the Jam

### From Unity to Godot

I've been learning Unity for the most part of 2021. After speaking with some career coaches, they advised I spend some time with it to increase my marketability. They were right, learning Unity opened a lot of doors \- it even gave me a one up in my current web development job. But after a year focused on Unity, releasing two small 2D games on itch.io and making some 3D mobile prototypes, I'm happy to put this on pause.

Unity is an excellent tool to make games. I really like the new input system, it's super flexible and works well for keyboard and mobile input. The documentation got me nowhere, but one of Unity's best strengths is the large community and availability of learning resources. I love the Device Simulator, being able to see how my mobile game works across platforms within the editor is awesome.

I didn't like a few things. The editor felt bloated, updates were simply huge. The actual project files were huge as well, even without large assets. Before updating to Windows 11, for whatever reason Unity would just crash randomly while loading my project. It just felt, buggy or badly developed. Not saying that it was, but the experience wasn't ideal.

With my experience with Godot and Phaser, 2D in Unity felt overcomplicated and fussy. I can't fully describe it, I felt like I was fighting the engine to get it to do what I want. I think if they made the unit of measurement in 2D games pixels, everything would be a lot smoother. I haven't done much 3D in Godot, but 3D in Unity felt like a more natural fit.

After a year of mostly good experiences, I felt that I'd be much quicker using Godot. I considered using C# and Godot as I'm familiar with it now. But I stuck with GDScript because it's simple to (re)learn and most guides for Godot use it. Godot's Nodes and Scenes system is also easier to grasp than the various things Unity offers. Although it's a recent return, I'm pretty happy with it.

### Practice Makes Perfect

Of course, I forgot a lot of Godot by now because of all the Unity I was learning. Getting back was fairly easy. I did the 2D tutorial all over again. I have some 3D tutorials to work on but I figured for this jam it's easier to stick with 2D as it's more familiar. Once the tutorial was finished I created a demo project. The idea of this demo project was to create a small scenes to practice different mechanics. I wanted to do quick iterations for a platformer, 2D adventure, and a shoot'em up. I only had time for the platformer, and I didn't even finish that!

The player couldn't move and the level was incomplete. But that doesn't mean this exercise was a waste. It reminded me how to build menus and scene transitions. I also learned to how integrate tilesets into Godot. The current implementation is a bit clunky, and I didn't fully understand it until I started this game. That said, this earlier practiced really helped get me back to thinking in Godot.

### VS Code

I think I use VS Code for everything, and Godot is no exception. The [godot-tools](https://marketplace.visualstudio.com/items?itemName=geequlim.godot-tools) extension makes writing GDScript a pleasant experience. As VS Code already has git integration, it's also useful for version control. And of course, the debugger helped a lot too!

- No more Unity, going back to Godot
- Doing the Godot tutorial again
- Making a practice Godot game, starting with a UI and platformer
- Fixing my setup with VS Code, a seemingly minor fix that made a huge improvement in my develoepr experience

## Design

- Wanting to make an adventure game
- What would this map look like? Hidden bells
- Dialogue, who would the player speak with
- Assets! I need to focus on coding, so I need good art from elsewhere

## Project Management

- Using GitHub Projects to define tasks and outline them

## Game Development

- Godot makes a lot of things easy, like 2D movement and animations for sprites.
- Tilesets were very hard to setup. It took the practice before the jam, and some tutorials during the jam for me to really figure out what's happening
- There was also a Tilemap system bug that only affected Macs... Luckily they released version 3.4.1 which fixed it
- Random rant: antivirus takes up so many resources!
- After Tilemap bug and setup, it was easy
- Didn't write my own dialogue system, 2 videos with Dialogic plugin were perfect for the task and gave it a lot of polish
- I still never finish in time to devote to music properly, but I got good free options.

## Prepping for Release

- WebGL build
- Flow: create page, submit game, improve page with gifs and instructions, and a more personal theme
- Flow for creating gifs: screen record, convert to gif, resize to appropriate dimensions and file size

## Feedback

- Very positive, the Pokemon/JRPG feel was a common kudos
- Art and music was really well received
- People needed a bit more direction to get back to Santa, or find places generally
- Lots of players ignored instructions and wandered on their own lol. That's great, I'm making the games I love playing

## Next Steps

- The environment will have more NPCs and objects - didn't have time to add them earlier
- Add signs and better environmental cues for an area, definitely want to make it easier for people to find their way back to Santa
- Let Santa, someone or some other mechanism reiterate the location of bells
- Mobile controls!
- Extra polish items, like scene transitions.
