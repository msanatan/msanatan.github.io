---
title: "How To Write Asynchronous Code in Node.js"
date: 2020-01-31
categories: [other]
link: https://www.digitalocean.com/community/tutorials/how-to-write-asynchronous-code-in-node-js
---

For many programs in JavaScript, code is executed as the developer writes it—line by line. This is called synchronous execution, because the lines are executed one after the other, in the order they were written. However, not every instruction you give to the computer needs to be attended to immediately. For example, if you send a network request, the process executing your code will have to wait for the data to return before it can work on it. In this case, time would be wasted if it did not execute other code while waiting for the network request to be completed. To solve this problem, developers use asynchronous programming, in which lines of code are executed in a different order than the one in which they were written. With asynchronous programming, we can execute other code while we wait for long activities like network requests to finish.
