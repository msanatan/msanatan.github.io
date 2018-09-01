---
title: Of Context, Animations And Pong
date: 2015/08/26 19:48
categories:
- [game development]
tags:
- animation
- canvas
- html5
- javascript
- scoping
---

Hello people of good testing habits, thought I'd share with you some simple errors that could come your way if you're not careful with JavaScript. I'm getting to get to grips with the canvas element, starting with some basic 2D animations. What better way to do this than make a game? Don't answer that question... So I read tutorials and docs galore to develop a pong clone to my liking.

My HTML5 pong clone took about 200 lines of code, not too many bells and whistles but it worked :). And that lovely script had a function I happily stole from [thoughtbot's pong tutorial](https://robots.thoughtbot.com/pong-clone-in-javascript) (you should read their blog, really good stuff!):

```javascript
animate = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function(callback) {
    window.setTimeout(callback, 1000 / this.FPS);
  };
```

Most modern browsers support the requestAnimationFrame function but it never hurts to cover your bases. Wanting to be able to have menus, settings and other stuff you find in games, I decided to encapsulate and expand my little pong clone. Part of that had me moving the animation function scope to the game engine's object scope. It seems simple enough, just put it in like this:

```javascript
GameEngine.prototype.animate = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function(callback) {
    window.setTimeout(callback, 1000 / this.FPS);
  };
```

Done! Well, if you want to get this error (in Google Chrome): **Uncaught TypeError: Illegal invocation**. We can't just take native methods (console.log and the like) and assign them to an object's property. This is because of the function's context - the object within which the function is executed. The requestAnimationFrame needs to be executed in the context of the window object, the above code will execute the function in the context of the GameEngine's object. Luckily the solution is to simply bind the functions to the window object:

```javascript
GameEngine.prototype.animate = (window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function(callback) {
    window.setTimeout(callback, 1000 / this.FPS);
  }).bind(window);
```

That way the window context will be used when calling any of them. In my code I use `bind(this)`, which also works. Why? By default the bind function will set 'this' to the window object for those native functions.

Fun fact - there is a global variable named FPS that's passed to the GameEngine object, hence why this code will work if the last function is called even though the scope of 'this' will be the window (I know that's cheating!). Alternatively, we could keep the definition of GameEngine's animate without using bind, and use JavaScript's call function when we execute it. So instead of using the animate function like `engine.animate(step)` we leave out bind and write `engine.animate.call(window, step)`. Can't say you don't got options!

For what it's worth, it got me a working pong game. You can play it [here](https://msanatan.github.io/pong/) (with the code [here](https://github.com/msanatan/pong)).

Happy ponging!
