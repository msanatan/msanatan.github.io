---
title: 'React Native: Lessons From First App'
date: 2017/06/18
categories:
- [mobile]
tags:
- javascript
- react
- react native
---

React is pretty easy to get into and the community tends to encourage intelligent design principles for highly reusable code. Coming from a background in Ionic and Xamarin, I had high standards for what a cross-platform solution needs to provide to get me using it. React Native can more than match up with the other frameworks. I created another [GitHub API interfacing app](https://github.com/msanatan/GitHubProjects) which simply allows you to search for GitHub users, select a repository and view the README for that repo. As I'm still learning RN I've been focusing on developing the right way. While I don't have all the answers to my questions just yet, here are some concerns and issues I had and the decisions I made to address them.

## Code Sharing Across Platforms

When you start a RN project you'll see two files: index.android.js and index.ios.js. No hard guesses why each of them are there but... it's not like we're going to write the same code twice. So the first thing I did was create an index.js file which would have the logic for the app. Now all I need my platform specific index files to do is reference the index.js file.

The index.js file has the component which kicks off the application:

```javascript
import {
  StackNavigator,
} from 'react-navigation';
import SearchScreen from './scenes/SearchScreen';
import RepoViewScreen from './scenes/RepoViewScreen';

const GitHubProjects = StackNavigator({
  Search: {
    screen: SearchScreen,
    navigationOptions: {
      title: 'GitHub Search'
    }},
  RepoView: {
    screen: RepoViewScreen
  },
});

export default GitHubProjects;
```

The index.android.js and index.ios.js will now import the app's primary component and register it:

```javascript
import React from 'react';
import { AppRegistry } from 'react-native';
import GitHubProjects from './src';

AppRegistry.registerComponent('GitHubProjects', () => GitHubProjects);
```

The index file isn't explicitly referenced because it's placed in the src directory. This worked well for my example app as it didn't have any platform specific setup to do. At worst it would have platform specific componenents which could be easily segmented at the component level using the Platform module.

## Application Structure

Ionic and Xamarin have strong opinions about how applications should be developed, your app's structure comes as part of the package in a way. React has a philosophy which applies to both the DOM and Native elements but does not impose an application structure with a heavy hand. I didn't want this app to be one page magic wand. I wanted a structure that was scalable, facilitates component reusability and wouldn't be alien to the community.

After my fair share of reading I felt the best match for my requirements were described in a [blog post by JS developer Alex Mangin](https://medium.com/@alexmngn/how-to-better-organize-your-react-applications-2fd3ea1920f1).

I can't encourage you enough to have a look. In summary, I stuck with the following architecture and will continue to do so for React and React Native applications:

```
|-index.android.js
|-index.ios.js
|-all other top-level files/directories
|-src
  |-components
    |-Component1
      |-components
      |-index.js
      |-styles.js
  |-scenes
    |-Scene1
      |-components
      |-services
      |-styles.js
      |-index.js
  |-services
    |-service
      |-index.js
```

The top-level components are global ones that can be reused anywhere in the app. Scenes refer to a page in the application and could have components, services and styles that are specific to it. Services would contain your APIs.

## Theming

One of the things I really liked about Ionic was its natural beauty. A default app looked georgous and that made the whole world happy. There's no real escaping from styling an application but there can be better foundations than a blank palette. While searching for what's out there I came across this neat list of UI component kits for RN on [Quora](https://www.quora.com/What-is-the-best-UI-Kit-for-react-native).

I gave [React Native Elements](https://react-native-training.github.io/react-native-elements/) a go but after a closer look at each I'm gravitating towards [NativeBase](https://nativebase.io/) more and and more.

### React Native Elements And Lists

So if you use React Native Elements you'll be happy to see how much easier it is to populate a list compared to the default ListView that was standard before version 0.45 came out with FlatList components. The ListView component inherited from the ScrollView component but React Native Elements' List component inherits from View. So if you want that scroll be sure to wrap it around the List:

```xml
<ScrollView>
  <List>
    ...amazing ListItem stuff here
  </List>
</ScrollView>
```

## Event Handlers

If a parent component passes down a function to child component for an event handler, React would not [automatically bind 'this'](https://facebook.github.io/react/blog/2015/01/27/react-v0.13.0-beta-1.html#autobinding). Many a blog posts and tutorials would show you event handlers like the following: `onPress={() => doSomething()}`. It's been noted by many that creating functions in a component's render function is a bad idea for [performance reasons](https://medium.com/@esamatti/react-js-pure-render-performance-anti-pattern-fb88c101332f).

Unfortunately I did not read the lovely React blog early enough and as much I could I manually bind the event handlers in the component's constructor. Your best bet is to use ES7's class properties with the arrow function which would automatically bind 'this' for you.

## So Much More To Go

Even though I'd like for this information to be useful I'm hoping that it's really obvious to you because that means I'm on the right path. React and React Native are fun but the rabbit hole goes deep. But sure to read the myriad of blogs out there as you're probably not the first person facing your problem.

Happy React Nativing!
