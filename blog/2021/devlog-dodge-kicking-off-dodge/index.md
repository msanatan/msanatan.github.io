---
title: "Devlog for Dodge: Kicking off Dodge"
date: 2021-09-19 10:00:00
categories:
- game development
tags:
- unity
- game development
---

> This article was originally posted here: <https://msanatan.itch.io/dodge/devlog/280203/kicking-off-dodge>

Hi! This project is an interesting one - even though the gameplay loop is dead simple. So I love Godot! It has a low barrier to entry and a great 2D engine. They also have a really good tutorial to get you up and running on the website.

![Preview of Godot's tutorial game, "Dodge"](https://img.itch.zone/aW1nLzY3NDExNTYuZ2lm/original/%2FtuMSr.gif)

This image is taken from: <https://docs.godotengine.org/en/stable/getting_started/step_by_step/your_first_game.html>

I recently rebuilt my [website](/) and I want to add a game to it. I got experience with Phaser and Pixi and could build and integrate a mini-game pretty quickly with either. However, as I'm diving deeper into Unity, why not get more practice?

## Godot Signals -> Unity Events

I love Godot for two reasons: node/scene structure and signals. Godot has an intuitive and scalable way to create and structure game objects, as well as an intuitive way to send messages to each other.

I think Unity gives me more room to inefficiently structure my project and code. However, it has events that I used similarly to how I used signals. In Godot, you create a signal in your script and emit it. Other nodes then connect to that signal, and a script contains the logic that reacts to it.

Events in Unity feel like the <a href="https://en.wikipedia.org/wiki/Observer_pattern" target="_blank" rel="nofollow noopener noreferrer">Observer Pattern</a>. I create an event, and then on the game object with the script that evokes it I list the objects that react to it with the function to call. Here's a visual to make it easier:

![Unity events used in Dodge, the Player script fires an event when it's hit to two game objects, and calls specific functions](https://img.itch.zone/aW1nLzY3NDE0MTEucG5n/original/UMfzjE.png).

It gives me the flexibility I liked about Godot, so I'll make use of them as much as I can.

## Enemy Factories

I need to produce different enemies with different behaviours. In this game, the enemies have nearly identical properties, but their direction and sprites are different. It's easy to create some scripts that make them move and clone them to vary the directions, but I figure a factory was called for this.

It's pretty easy to do as well. I created a scriptable object with a coroutine. It's pretty easy to define the spawn time delays and speed ranges for the enemy. Despite this being a small project, as a software developer, I can't write crappy code that gets the job done for the sake of it. Design patterns are our friends, so use them when they fit!

## Installing the Device Simulator - Highly Recommended

Most of my website's hits come from google searches for blog posts I've written about technical issues. My viewers tend to be programmers on a desktop/laptop. I don't get a lot of mobile views, but if I'm releasing a web game I should make it mobile-friendly.

While those features haven't been developed as yet, I can confirm that the game looks good on mobile devices:

![Game simulated on an iPad Pro 11](https://img.itch.zone/aW1nLzY3NDE2NTMucG5n/original/%2FWiGvU.png)

![Game simulated on a Google Pixel 5](https://img.itch.zone/aW1nLzY3NDE2NjAucG5n/original/EXyYWn.png)

But I need some code for the iPhone notches...

![Game simulated on an iPhone X](https://img.itch.zone/aW1nLzY3NDE2NjEucG5n/original/wuBYRM.png)

The simulator is currently a <a href="https://docs.unity3d.com/Packages/com.unity.device-simulator@3.0/manual/index.html" target="_blank" rel="nofollow noopener noreferrer">preview package</a> but it's a great replacement for the standard game view. One of the best Chrome dev tool features built into Unity? Yes, please! If you're doing mobile game development this is a mandatory tool.

## Project Management

One thing that surprised me about this project was how quickly the need for project management became. Because of the guide, it's easy to take the many pieces in Godot that were required to put that tutorial game together. And when you got many other responsibilities in life... it's easy to lose track of the next important step.

As the code is in GitHub, I'm using their built-in Projects feature to help manage my tasks:

![View of my kanban board in GitHub Projects](https://img.itch.zone/aW1nLzY3NDE3MDcucG5n/original/kMYutY.png)

Eventually, my small projects typically blossom into something much more involved than planned. My goal is to do this from the start next time around. Also, one extremely useful tip I do is to separate my tasks into sprints. It's excellent in helping me prioritise my work, and ensuring I'm not trying to bite off more than I could chew.

## WebGL Builds...

As a web developer and someone familiar with Godot's HTML5 builds, I can only say that this sucks in Unity. It's **ridiculously ** slow, and the default templates aren't ideal for different devices.

A few things worked for me to improve this experience:

* Optimise for size. I honestly couldn't finish a build that was optimised for speed, they were taking over 45 minutes. I don't have the fastest laptop but 16 GB RAM and an i7  processor should be enough for most operations.
* Reuse the same build folder. Unity does incremental builds, so future build times are slower if you keep referencing the same build folder.
* Use the <a href="https://github.com/greggman/better-unity-webgl-template" target="_blank" rel="nofollow noopener noreferrer">Better Unity WebGL Template</a>. This makes your game fullscreen by default. As I'm uploading to itch.io and embedding it into other places, this is perfect for me. When I first saw how Unity built my game, I started to modify the HTML file immediately. Then I read about creating templates and figured someone probably did the same thing I wanted to do. Turns out I was correct, and it's a great package.

And one note for anyone uploading to itch.io - change the compression format from "Brotli" to "Gzip" in your Player settings. The game didn't load with the former.

## One Thing I Miss From Godot

Godot's 2D engine is pixel-based and feels 10x more natural than working with 2D in Unity. I could also be affected by working with other 2D game engines like Phaser, Pygame, and more which are similar. However, one of Godot's greatest strengths is Unity's greatest weaknesses - building UIs. I feel like I've been transported back to the stone age coming from Godot, which just has a wonderfully flexible system. Building UIs in Godot is enjoyable, it's a bit tedious in Unity.

## What's Next

I got the second sprint coming up shortly. The keys things are adding support for mobile devices and some audio. All games need juice!

Well, that's it for now. Take care till next time!
