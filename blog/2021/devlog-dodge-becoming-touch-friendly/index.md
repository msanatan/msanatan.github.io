---
title: "Devlog for Dodge: Becoming Touch Friendly"
date: 2021-09-19 10:05:00
tags:
- unity
- game development
---

> This article was originally posted here: <https://msanatan.itch.io/dodge/devlog/289626/becoming-touch-friendly>

Hi everyone! This was a small update to make the game mobile friendly. Previously we could only use the keyboard to play, which isn't that great if someone is using their phone... After some initial feedback, this isn't the final update for mobile. But usable enough that we can put it on my website.

## Touch Controls

Touch positions aren't hard to get in Unity. It's less common to find out how to in the new Input System. For this version, you move the player by touching the edges. In Unity, this required creating a touch input action, and then retrieving its position. Refactoring to manage touch input as well as keyboard input was easy - while the input system is buggy it's the way to go!

About being buggy... I encountered a strange bug where the Input System would not capture the first touch on the screen but would work for all subsequent touches. I touch it was an issue with version 2020, but it persists with 2021 as well. And that upgrade also broke the simulator, yay me.

After reading this thread, <https://answers.unity.com/questions/1841066/new-input-system-returns-zero-touch-position-on-fi.html>, I ran out of some ideas. I did some testing and quickly realized that the Primary Touch/Touch Contact input action binding was not working. However, pretty much every other binding worked. So, I changed the binding to Touch 0/Touch Contact and it's fine. Not ideal, but enough to move forward.

## Music

Audio-less games aren't fun, they're incomplete. This is a chilled casual game, so I got a nice lo-fi track to go with it. I copied the audio manager I made for MeTwo - my game jam entry. It's nice to start building some packages that are common with my games so soon!

There was a challenge with this, however. In the main menu, there are buttons to turn sound on or off. They work fine when you first load the game. But they crash when you switch come from another scene and try to use the buttons again.

When debugging I noticed that the sound button had a null reference to the music manager's node, even though the music was still playing in the background. I figured it had something to do with "DontDestroyOnLoad" and switching scenes, and I was right: <https://forum.unity.com/threads/dontdestroyonload-object-reference-goes-missing-after-scene-change.795126/>. After modifying the music singleton - everything works as expected.

## Next Steps

A few other nice features came into this one. We now play the game in the safe area, so phones with notches won't block the game. We also added a pause button and a simple menu for it.

I'll get some feedback first, particularly for the controls. There are minor fixes to make for the buttons in the main scene, and the new pause button as well (the touch input moves the player). We also want to add a bit of juice in the game!
