---
title: "React Classes and Autobinding"
date: 2017-11-03 09:51:49
categories:
- [web]
- [tutorial]
tags:
- javascript
- react
---

So a lot of people when starting off React have to deal with JavaScript's `this` and binding. It's not a problem, it's just how functions and objects behave. If you're not to familiar with JavaScript you may not be aware of how context works. `this` is determined by the object a function is called in. Let's go it through with the common example that forces React developers to deal with binding: handling events. Want to skip the context (get it?) - go [here](#Class-Properties).

```javascript
class MyComponent extends React.Component {
  // Not familiar with this syntax? We'll come back to it soon...
  state = {
    clickCount: 0
  }
  constructor(props) {
    super(props);
  }

  incrementCount() {
    this.setState({
      clickCount: this.state.clickCount + 1
    });
  }

  render() {
    // How we would normally approach something like this
    return (
      <div>
        <button onClick={this.incrementCount}>
          Click Me!
        </button>
        <div>
          <p>{`Total amount of clicks: ${this.state.clickCount}`}</p>
        </div>
      </div>
    );
  }
}
```

If you set up your component like this it won't work as you'd expect because of context. You see, the onClick handler is being called outside of the context of the MyComponent object and in this case `this` will be undefined. You can see with this [fiddle](https://jsfiddle.net/69z2wepo/90354/). Many early React tutorials came out not long after ES2015 was defined. As such, there are still many resources that suggest solutions that can potentially be detrimental to performance or not aligned with current conventions. As you read you'll come to appreciate how the developments in ECMAScript help us write succinct, declarative code.

## Execute The Function In The Render Method

If the context of `this` depends on when it's called, let's call it in the render method:

```javascript
class MyComponent extends React.Component {
  state = {
    clickCount: 0
  }
  constructor(props) {
    super(props);
  }

  incrementCount() {
    this.setState({
      clickCount: this.state.clickCount + 1
    });
  }

  render() {
    // Called within the render method who's "this" will be the instance object
    return (
      <div>
        <button onClick={() => this.incrementCount()}>
          Click Me!
        </button>
        <div>
          <p>{`Total amount of clicks: ${this.state.clickCount}`}</p>
        </div>
      </div>
    );
  }
}
```

See working fiddle [here](https://jsfiddle.net/69z2wepo/90357/). Notice that an anonymous function is created every time the render function is called. For one small component this may seem fine but in a large scale app with multiple components rendering fairly complex changes, the garbage collector would be quite busy.

## Bind The Function In The Render Method

We can bind the function within the render method. For those unfamiliar, binding explicitly sets the value for `this` i.e. sets the context for the function to run. It'll look as follows:

```javascript
class MyComponent extends React.Component {
  state = {
    clickCount: 0
  }
  constructor(props) {
    super(props);
  }

  incrementCount() {
    this.setState({
      clickCount: this.state.clickCount + 1
    });
  }

  render() {
    // Explicitly make "this" the object instance
    return (
      <div>
        <button onClick={this.incrementCount.bind(this)}>
          Click Me!
        </button>
        <div>
          <p>{`Total amount of clicks: ${this.state.clickCount}`}</p>
        </div>
      </div>
    );
  }
}
```

Here's your working [fiddle](https://jsfiddle.net/69z2wepo/90358/). Unfortunately, this suffers from the same issue as the previous solution. The `bind` function creates a new function when called, so every render we'll be giving the garbage collector more dishes to wash.

## Bind The Function In The Constructor

We're on to something with the bind function though. Render may be called often, it's probably not the best place to use `bind`. We can use it at the constructor, which is called automatically when an object instance is created. This way we ensure that a new function is only created once.

```javascript
class MyComponent extends React.Component {
  state = {
    clickCount: 0
  }
  constructor(props) {
    super(props);
    // Bind it once and only once
    this.incrementCount = this.incrementCount.bind(this);
  }

  incrementCount() {
    this.setState({
      clickCount: this.state.clickCount + 1
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.incrementCount}>
          Click Me!
        </button>
        <div>
          <p>{`Total amount of clicks: ${this.state.clickCount}`}</p>
        </div>
      </div>
    );
  }
}
```

Awesome! You can check that it works [here](https://jsfiddle.net/69z2wepo/90360/). While this is a fine, working solution we can do better and keep up with modern JavaScript improvements and conventions.

## Class Properties

With some minor syntax tweaks we can get cleaner code that accomplishes the same results:

```javascript
class MyComponent extends React.Component {
  state = {
    clickCount: 0
  };

  // No need to imperatively bind the function in the constructor or elsewhere!
  incrementCount = () => {
    this.setState({
      clickCount: this.state.clickCount + 1
    });
  };

  constructor(props) {
    super(props);
  }

  render() {
    // Like before, no binding here
    return (
      <div>
        <button onClick={this.incrementCount}>
          Click Me!
        </button>
        <div>
          <p>{`Total amount of clicks: ${this.state.clickCount}`}</p>
        </div>
      </div>
    );
  }
}
```

Class Properties is part of a [stage 3 proposal](https://github.com/tc39/proposal-class-fields), yet to belong to the official ECMAScript specification at the time of writing. Stage 3 means that the API is fully fleshed out but the implementation is under heavy testing. I encourage you to read more about the [4 stages](https://tc39.github.io/process-document/) to adding features.

This proposal allows us to declare certain fields up front. Actually, this post has been using it while defining the `state` object. It's much cleaner to define a state object for all instances using this new syntax compared to the more usual way of writing `this.state = ...` in the constructor. Class properties help solve our problem in an elegant way when we combine them with Arrow functions. Arrow functions bind `this` depending on **where it's defined**, not where it's called. That's why `this` will always refer to the instance of the class. Check out the [fiddle](https://jsfiddle.net/69z2wepo/90392/) and see that it's working for yourself.

### Event Handlers And Arguments

So we see that the syntax works well, what happens when we have to call a function in an event handler that takes arguments? Let's say we have a React component for a task management application (I know, original) and we have an option to delete a task. The function that deletes requires the unique ID of the task.

```javascript
// A method property defined in the TaskComponent class
// ...
deleteTask = (id) => {
  this.props.deleteTask(id);
}
// ...
// Somewhere in the render method
<button onClick={this.deleteTask(task.id)}>X</button>
// ...
```

Uh oh, do you see the problem? If we leave this as is we'll be calling the deleteTask function as the button is rendered. There's a simple fix for this, we just need to leverage partial application. For those unfamiliar, partial application is when we bind an argument of a function in order to produce another function with smaller arity (a nice word for the amount of arguments). With partial application, we can keep the same class properties syntax and handle arguments like this:

```javascript
deleteTask = (id) => () => {
    this.props.deleteTask(id);
}
// ...
// Somewhere in the render method
<button onClick={this.deleteTask(task.id)}>X</button>
// ...
```

Now when the button is rendered, it's creating a new function instead of executing it! At least this way we keep our syntax consistent in our codebase. More predictable code is better code.

That's all for now, happy class propertying.
