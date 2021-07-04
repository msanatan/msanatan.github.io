---
title: "How To Launch Child Processes in Node.js"
date: 2020-07-31
categories: [other]
link: https://www.digitalocean.com/community/tutorials/how-to-launch-child-processes-in-node-js
---

When a user executes a single Node.js program, it runs as a single operating system (OS) process that represents the instance of the program running. Within that process, Node.js executes programs on a single thread. As mentioned earlier in this series with the How To Write Asynchronous Code in Node.js tutorial, because only one thread can run on one process, operations that take a long time to execute in JavaScript can block the Node.js thread and delay the execution of other code. A key strategy to work around this problem is to launch a child process, or a process created by another process, when faced with long-running tasks. When a new process is launched, the operating system can employ multiprocessing techniques to ensure that the main Node.js process and the additional child process run concurrently, or at the same time.
