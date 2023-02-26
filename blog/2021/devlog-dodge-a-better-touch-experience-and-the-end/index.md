---
title: "Devlog for Dodge: A Better Touch Experience, and the End"
date: 2021-11-10 23:25:00
categories:
- game development
tags:
- unity
- game development
---

> This article was originally posted here: <https://msanatan.itch.io/dodge/devlog/312065/a-better-touch-experience-and-the-end>

Hi everyone! What started as a quick experiment of making a Godot game in Unity turned out to be more of an introduction to mobile game development. Godot's tutorial project can be done in Unity, but not as easily. Unity for 2D seems much more difficult than the experience I had with Godot. That said, Unity's mobile game tools are really good, particularly getting on-screen touch controls.

## Touch Controls

The initial idea was to have players tap the screen by the edge to indicate what direction they should move towards. After some player testing, it quickly became evident that was a bad idea. Non-gamers tended to swipe and some players expected the character to follow and stop where they were tapping. Also, if someone played on a tablet or large enough mobile device, they'd have a worse experience.

In the end, we just stuck with adding a single joystick to the screen. With the new input system, that was surprisingly easy. I added an Image to the canvas with the Joystick and just added a built-in "On-Screen Stick" script to the Image. That's what you need for a joystick that can move around and go to the centre when released.

With touch controls, I only wanted the joystick to appear when the game was run on a mobile device. However, I also want to test it as well, simulating touch events with a pointer (mouse). So I created a new component with the following script:

```csharp
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MobileUIManager : MonoBehaviour
{
    [SerializeField] GameObject[] mobileUI;
    [SerializeField] bool showInEditor = true;

    // Start is called before the first frame update
    void Start()
    {
        if (!(Application.isMobilePlatform || (showInEditor && Application.isEditor))) {
            foreach (GameObject ui in mobileUI) {
                ui.SetActive(false);
            }
        }
    }
}
```

This script checks if I'm not running on a mobile or not in the editor testing the mobile UI, and simply makes them inactive. With this script, my WebGL build only shows the joystick on my phone but nothing on my laptop - pretty neat and easy to use in other projects!

## Juice

I got some portfolio feedback and one of the main criticism was the simplicity of the games and lack of juice. Can't argue with it, every game needs juice. Juice can be added in simple and large ways. The game already has audio and even some particle effects when a player collides with an enemy. I added trails to the player, which makes movement feel a bit smoother. It looks particularly good on mobile as the joystick allows movement outside the rigid four directions of the keyboard.

I also created a new enemy type that falls diagonally. Every 25 seconds (1 second = 1 point) these little guys will spawn just to mess things up a bit. It's an easy pattern the player can cater to, but some situations might catch them off guard.

And there are just a few polish items. When you press a button, the player sees a dark translucent box around it. It's a little visual acknowledgment of their action, and feedback is key for player engagement in and around the gameplay loop.

## It Was Nice

This project certainly evolved more than I originally anticipated. But I'm glad it did grow in scope, I learned so much about mobile development with Unity like how to correctly scale the canvas for your game and how to add touch controls. I decided on workflow tools as well - I'm sticking with VS Code instead of Visual Studio (I love both, but I'm faster with the former), I work on my side projects in 2 weeks sprints with a small scope, I use GitHub projects for tracking (it's not fully featured but it's dead simple), I used the debugger with Unity to step through my code, I have a group of people to give me quick player feedback and so much more!

If I were to spend more time on the game, I would add a simple mechanic like having a timer that depletes when the player doesn't move - the more they have to move the more likely they'll make a mistake. But I've got quite a few other things to learn in the Unity mobile space and more games to make!

See you all for the next one
