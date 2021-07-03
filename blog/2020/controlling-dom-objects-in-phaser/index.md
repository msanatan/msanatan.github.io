---
title: "Controlling DOM Objects in Phaser"
date: 2020-12-15 10:00:00
categories:
- [game development]
tags:
- phaser
- javascript
- typescript
---

I had an interesting code challenge where I needed to do a few non-gamey things with Phaser. One of them neeed me to control some DOM nodes in Phaser like sprites. As with most things, Phaser has out-of-the box support for that scenario.

## DOMElement

The [DOMElement](https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.DOMElement.html) is a game object that can control HTML elements. You need to include this configuration to work with them:

```javascript
dom: {
  createContainer: true
}
```

The docs explain how it works. Phaser puts a container div on top of the game canvas. This is to ensure consistency with sizing and scaling. I like this info because if you weren't using Phaser, you can use the same setup. The bit of magic remaining would be to map canvas coordinates to DOM coordinates relative to the parent div, as these objects are still rendered on the DOM.

From there, you can use `this.add.dom()` to control a DOM element

```javascript
domSprite = this.add.dom(50, 100, '#domID')
```

The first two arguments are the x and y coordinates respectively. The last argument is the ID of the object you want to control. You can also provide the JavaScript object for a DOM node instead of it's ID.

In my code, I had to extend it add some speed properties:

```javascript
import 'phaser';

export default class DOMSprite extends Phaser.GameObjects.DOMElement {
  speedX: number;
  speedY: number;

  constructor(scene: Phaser.Scene, x: number, y: number, element: string) {
    super(scene, x, y, element);
    // Ensure that the DOM node is added to the scene we create it in
    this.scene = scene;
    this.scene.add.existing(this);
    // Set a default, random speed
    this.speedX = Phaser.Math.Between(-2, 2);
    this.speedY = Phaser.Math.Between(-2, 2);
  }
}
```

That's all there is to it! If you'd like a working example, check out this repl: <https://repl.it/@MarcusSanatan/Control-DOM-Objects-in-Phaser>.

Happy game deving!
