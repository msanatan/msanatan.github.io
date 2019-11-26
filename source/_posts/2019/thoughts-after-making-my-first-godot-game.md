---
title: Thoughts After Making My First Godot Game
date: 2019-11-25 07:57:00
categories:
- [games]
- [game development]
tags:
- godot
- game development
---

[Godot](https://godotengine.org/) is a 2D and 3D game engine that has been on my radar for quite some time. Reviews for it are mostly positive, the scripting language is similar to Python (yay), and it's open source.

The open source bit is pretty cool not just for philosophical reasons, it reduces your cost of development. For those living in countries with currencies weaker than USD, what may be a low monthly subscription or generous revenue cap still makes a sizeable dent in disposable income.

This post is just a write up on what I liked about Godot, what I didn't like about Godot, and whatever interesting experiences came up while creating my first game.

I haven't used Godot before attempting this game. Figuring out a structured way to learn the engine was the first step.

## Learning Path

I'm a web developer, hence why most of previous ventures into game development have come through [Phaser](https://phaser.io/). I did tutorials for Unity and Unreal before, but those were a couple years back so using Godot felt as close to a brand new experience as it could have been.

As with most new Godot users, my journey began with their [getting started](https://docs.godotengine.org/en/3.1/getting_started/step_by_step/index.html) guide. I read everything from the introduction to my first Godot game tutorial. It's definitely necessary reading to get an undrstanding of the engine's design and key features. Admittedly, it took me a while to truly understand all the information.

I enjoyed the tutorial game that was created, it's casual enough to be fun. The export section also shows you how to make it Android friendly - you literally create an app in your first try!

However, after finishing that game I did not feel confident enough to go on my own project. Even after looking at the simple example [projects created by the Godot team](https://github.com/godotengine/godot-demo-projects), I felt as if I needed more of a guiding hand.

### Blogs and YouTube videos

I scoured the internet for tutorials. The community seemed popular enough that I was pretty sure there would be a safe haven for Godot related resources. A lot of resources are available for version 2.1 and 3.0 - I used 3.1, the latest stable version at the time of writing, so they weren't immediately useful.

I looked a few YouTube videos and read a few blogs. For the level and confidence I had, the best resource seemed to be [Fornclake's Asteroids tutorial](https://fornclake.com/category/tutorials/asteroids). Small in scope and very well written - it was perfect. Well, almost perfect. It's incomplete... the bits where you actually destroy the asteroids were never written. To its credit, I felt it gave me the tools to work on that myself. I opted not to as it would probably take me more time than it should to get it done.

I had a positive experience with Udemy when learning React, Phaser and Unity. I saw some Godot courses when I bought a recent TypeScript course, it was time to have a second look.

### Udemy Course - Discovering Godot: Make Video Games in Python-like GDScript

This course is done by two people who are super popular on Udemy and other platforms - Ben Tristem and Yann Burrett. They both made careers out of teaching people how to create games with different engines, they do a good job at it too. After looking at the alternatives I figured this course was the best bit.

Having read the Godot tutorial and other blogs, and coupled with my familiarity with Python, it may be too basic at times. I found myself skipping over things like what are if-statements. It's not a problem that's it there, it was meant for beginners after all. But you have a similar Python background you may find yourself skipping over those bits too.

However, don't make a habit of skipping over things. The details about Godot were invaluable. As much as I read about the framework, this course does a great job of at least reinforcing how the engine works.

The first tutorial was to build a game called Loony Lips. It's a simple game that generates a random sentence given 4 user inputs. It was super simple, the small scope was perfect. After that tutorial, Godot finally clicked for me.

The next tutorial for the course was a platformer. I always like to create something after completing a section in an online course, it's a nice way to validate what I learned. So before moving onto the next class, I decided to make AV: Execute.

## November Game Project 2019 - AV: Execute

I started to play Megaman Battle Network again... it holds up so well after all these years &hearts;! So the game I created would definitely have it's 8-directional movement. Heck, let's just make it a game about viruses. In the end, I came up with [AV: Execute](https://msanatan.itch.io/av-execute).

![Screenshot of AV Execute](/images/av-execute.png)

It's your standard fare swarm shooter - you're in an arena and your goal is to derezz as many viruses that comes your way. The last high score I recall getting was 400, not bad. All the code is available on [GitHub](https://github.com/msanatan/AV-Execute) and the super basic artwork was done by yours truly.



## macOS Catalina - Bloody Hell