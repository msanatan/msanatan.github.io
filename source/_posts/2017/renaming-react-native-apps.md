---
title: Renaming React Native Apps
date: 2017/05/10
categories:
- [mobile]
- [web]
tags:
- react
- react native
- javascript
- app development
---

I am recently getting into the React framework (let's be real, it's barely a
library) and using React Native. I'm not interested in starting flame wars, before
this I thoroughly enjoyed using Angular and Ionic. React does seem to be easier
to get up and running, and it seems to suit my thinking a lot better as well.

While noobing through the various tutorials and blogs for React Native, I
decided to increase the scope of my practice app and I felt that a renaming was
in order. Changing the class name is fine, and the only other changes that came
to mind were the name attribute in **app.json** and the first argument in the
**registerComponent** function in the app itself.

If you then try to run `react-native run-ios` or android you'll get an alarming
red error message on the simulator. Yikes! You'll quickly observe that the app
being loaded has the old name and a quick `ls` in the android and ios folders
will make it even more obvious. The fix is easy:

1. Delete the android and ios folders
2. Run `react-native eject`

The eject command recreates the native folders for you, using what's in
**app.json** to define the project.

Next time you run you should have your app with its new name on the simulator
without problems, assuming your other bits of code are fine.

Happy hacking!

