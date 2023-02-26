---
title: "Micro Games with Kontra.js"
date: 2018-08-31 20:40:00
categories:
- game development
tags:
- javascript
- kontra
- js13k
- game development
---

Hello game developers,

So my good friend <a href="https://twitter.com/metasansana" target="_blank" rel="nofollow noopener noreferrer">Lasana</a> put me on to a month long game competition: <a href="https://js13kgames.com" target="_blank" rel="nofollow noopener noreferrer">Js13kGames</a>. Essentially you got to make a game in JavaScript that when zipped is 13kb or less. Sounds like fun!

The constraints forces some interesting creativity, from my observations the winners had the following traits:

* Streamlined build process to ensure they don't go over the limit
* Little to no external assets - all were converted to JS beforehand
* Procedurally generated maps
* Awesome canvas code or a microframework

I've done games from the canvas API before but it can be tedious if it becomes sufficiently complex. So looking for some viable options I discovered <a href="https://straker.github.io/kontra" target="_blank" rel="nofollow noopener noreferrer">Kontra.js</a>. This microframework was pretty much built to help compete in this competition, it boasts a winner using it as well.

While the game engine is easy to use you should still expect to use some canvas code when you'll want to customise. It doesn't take long to get started, I made a little playground for myself to get a hang of core mechanics <https://msanatan.com/kontra-playground>. There's also an excellent tutorial from the developer who created Kontra: <a href="https://medium.com/web-maker/making-asteroids-with-kontra-js-and-web-maker-95559d39b45f" target="_blank" rel="nofollow noopener noreferrer">https://medium.com/web-maker/making-asteroids-with-kontra-js-and-web-maker-95559d39b45f</a>.

Hopefully this little snippet was enough to get you guys interested and push forward your HTML5 game development journey

Happy micro-game developing!
