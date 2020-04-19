---
title: Jumping Into Phaser 3
date: 2018-06-17 11:10:00
categories:
- [game development]
tags:
- javascript
- phaser
---

[Phaser 3](http://phaser.io/) is a popular HTML5 game framework. The new version brings massive changes to key elements of version 2's API and to the credit of the developers, made a lot of the underlying architecture and code simpler and more efficient. Since its launch February 13th 2018, a whopping 10 new feature updates have been released, excluding bug fixes, at the time of writing. The good news is that things are fairly settled now and with docs covering more and more of the API it's really the best time to get started!

The best way to acquaint yourself with Phaser 3 is to make a game of course. I decided on a simple platformer with a level designed with [Tiled](https://www.mapeditor.org/). Because my artistry is as good as my mumble rap translation skills, I literally created a game full of rectangles. It's name is [boxy](https://github.com/msanatan/boxy). Here are some of my thoughts while working on it:

## &lt;Steve Balmer Voice&gt;Examples, Examples, Examples...&lt;/Steve Balmer Voice&gt;

To be fair, this was true for Phaser 2 as well. The best way to learn Phaser is to think about your game, what you're trying to do, which aspect of the API it invovles and then find an example to see it in action. Though I expect the increased documentation cover to make things easier, there were quite a few times I found myself deep into <https://labs.phaser.io/> and the source code on GitHub. Luckily there are numerous examples which cover just about everything and the source code is dead easy to read and follow. The answer is never far away :-)

## Tiled Integration

This generally works really well, it's quite easy to load tiles on the screen and set things up for collision with various conditions and parameters. One key feature missing was importing from the object layer. So for those less familiar with Tiled, think of a level in Mario. The ground and blocks you jump on would usually reside in some tilelayer. Something like the coins you collect in the game would reside in the object layer, the nature of the items placed are quite different.

Phaser 3 doesn't have an import for objects in the object layer as Phaser 2 does. The beauty of open source means we can just see what Phaser 2 did and adapt it to our game!

```javascript
// Loosely based on https://github.com/photonstorm/phaser-ce/blob/v2.10.5/src/tilemap/Tilemap.js#L379
createFromObjects(map, name, tileset, frameId, group, gravity, immovable) {
    let objectLayers = map.objects;
    objectLayers.forEach((ol) => {
        if (ol.name == name) {
        ol.objects.forEach((olObject) => {
            let obj = group.create(olObject.x, olObject.y, tileset, frameId);
            obj.body.setAllowGravity(gravity);
            obj.body.immovable = immovable;
            group.add(obj);
        });
        }
    });
}
```

Not the end of the world right? In my case, I wanted those objects to have their gravity and immovable properties all set to the same values. The objects I loaded would be in one sprite group. To make this work you also need to set the values of those properties while creating the sprite group:

```javascript
this.collidingBlocks = this.physics.add.group({
    allowGravity: false,
    immovable: true
});
```

If you don't set it in both places, it won't work.

## Phaser CLI

The first time I looked at this [tool to transpile ES2015+ code](/2017/11/06/phaser-es2015-and-breakout/), I felt that it wasn't ready for primetime. Since then it's become the create-react-app of Phaser development and it is the best option I've seen to give you wings. I highly recommend you give this a go and I'll be aiming to support this project as much as I can. Excellent work by [@nerdenough](https://github.com/nerdenough).

During my time working on boxy I literally came into a crazy [bug](https://github.com/phaser-cli/phaser-cli/issues/16), as I almost always run into an edge case in my programming life -_-. For some weird reason, if I try to load a bitmap font before loading my tilemap then I'd get an error. We're looking into it more. Thankfully that's the only issue I've come across so far but it really had me scratching my head for a while.

## The End Of The Beginning

Overall I love working with Phaser 3 and I'm completely pumped to be making more web games. While relatively new it has a lot of support and the updates are becoming more standard and better paced as time goes on. There's also an amazing community of Phaser developers you can find on <http://www.html5gamedevs.com>, <https://itch.io/>, twitter, practically anywhere. You definitely found one on this blog.

Happy game developing!
