---
title: "Phaser GameObject Input Events"
date: 2020-12-19 20:50:00
categories:
- [game development]
tags:
- phaser
- javascript
- typescript
---

Usually when you got pointer interaction with sprites, `pointerevents` come to mind. They're mouse and touch friendly plus they're familiar outside of the Phaser context. Less mentioned in tutorials but incredibly useful are the `gameobjectevents`. These events are fired for all interactive game objects in a scene.

This was useful for me when designing a simple menu scene. I wanted all the icons to increase in size if I hovered over them. The `gameobjectover` and `gameobjectout` events were exactly what I needed.

Generally, you can add a GameObject event listener like this:

```javascript
function eventHandler(pointer, gameObject, event) {
  // Do stuff
};

this.input.on('gameobjectover', eventHandler);
```

I really like having the actual GameObject in the function as I'll have access to much more interesting properties than the pointer object can provide by itself. One thing to note, if you listening to a pointer event on a game object, that event will fire before this one fires.

Here's a quick example where I used the `gameobject` events to increase and decrease the size of a couple of sprites: <a href="https://repl.it/@MarcusSanatan/GameObject-Listeners" target="_blank" rel="nofollow noopener noreferrer">https://repl.it/@MarcusSanatan/GameObject-Listeners</a>.

Be sure to read the docs and see <a href="https://photonstorm.github.io/phaser3-docs/Phaser.Input.Events.html" target="_blank" rel="nofollow noopener noreferrer">all possible events</a> at your disposal.

Happy game deving!
