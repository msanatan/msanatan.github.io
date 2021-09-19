---
title: "Loading Fonts in Phaser with FontFace"
date: 2020-11-08 9:20:00
categories:
- [game development]
tags:
- phaser
- javascript
- typescript
- game development
---

For the <a href="https://itch.io/jam/devtober-2020" target="_blank" rel="nofollow noopener noreferrer">Devtober</a> I made a casual mobile game \- <a href="https://itch.io/jam/devtober-2020" target="_blank" rel="nofollow noopener noreferrer">Hyper Match</a>. I built it with Phaser 3 and TypeScript, and learned quite a few new skills in the process.

In my last Phaser game, I used the popular but old <a href="https://github.com/typekit/webfontloader" target="_blank" rel="nofollow noopener noreferrer">Web Font Loader</a> to load all my custom fonts. I didn't like that experience, and it's age isn't boding well my modern TypeScript support for all other libraries I use.

## FontFace Object

After some reading I came across the <a href="https://developer.mozilla.org/en-US/docs/Web/API/FontFace" target="_blank" rel="nofollow noopener noreferrer">FontFace</a> interface, what I assume is the JS counterpart for CSS' `@font-face` rule. Like the CSS rule, it needs a name to identify the font family and the URL of the font file.

This object is not part of any ECMAScript standard as yet. While unlikely, it's still possible for the API might change. However, most major browsers have supported it for some time now.

You use the FontFace's `load()` function like this:

```javascript
const customFont = new FontFace(fontName, `url(${fontUrl})`);
customFont.load();
```

The `load()` function returns a Promise, which beats callbacks from Web Font Loader any day. In the end, my Preload code ended up looking like this:

```javascript
import 'phaser';

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload(): void {
    // Load images and audio
  }

  async create() {
    // Load custom fonts
    try {
      await this.loadFonts('Gugi Regular', 'fonts/Gugi-Regular.ttf');
    } catch (error) {
      console.error('Could not load custom fonts');
    }

    this.scene.start('TitleScene');
  }

  async loadFonts(name: string, url: string) {
    const font = new FontFace(name, `url(${url})`);

    try {
      await font.load();
      document.fonts.add(font);
      document.body.classList.add('fonts-loaded');
    } catch (error) {
      console.error(`Could not load font ${name}: ${error.message}`);
    };
  }
}
```

I load my assets in the `preload()` function as normal. I added an `async` function `loadFonts()` which uses FontFace to load a custom font file and add it to the DOM. It **needs** to be added to the DOM so it can be used. Finally, I load my custom fonts in the `create()` function. I added `async` to the `create()` function so I can use `await` to resolve the font Promise.

**Note:** if you're using TypeScript like I do, you won't have the type definitions for the FontFace object by default. It's not part of an ECMAScript standard as yet, TypeScript only adds definitions for objects that already approved. You can get types by installing them like this:

```console
npm i -D @types/css-font-loading-module
```

Happy fonting!
