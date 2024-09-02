---
title: "Hello React Native"
date: 2024-08-09 17:35:00
categories:
  - game development
tags:
  - mobile
---


- Been some time before I made something with React Native
- Expo is 10x better than I remembered, and the community seems to agree on that
- Data storage is simple with the default library, but I had difficulty setting up either TypeORM and Drizzle. Docs are out of date for Expo unfortunately, and time was more critical than figuring it out
- Ended up using Superbase in any case, which is a great platform, uses Postgres instead a NoSQL which made me choose it over Firebase. Integration with the Expo app was very straightforward
- At the time of writing, the new expo router is probably still too new for all the docs. It's a great improvement over how navigation had to be set up before, and someone come from Next.js would find it familiar
- My main entry point app/index.tsx pretty much sets up the supabase session, routing people to the login page if they're not logged in, and then the main app if they are
- Supabase expo examples typically pass down the session in props, however with the new router, I found that the best set up was to create a context and reducer for the session data, expose them through custom hooks and allow any component to access them
- In my previous React Native apps, I've used NativeBase to quickly get a good looking UI. Now it's unsupported and slow. I looked at other UIs, almost all seem to have major performance problems. Tamagui looks promising but checking the GitHub tags, you can see more than 3 releases in a day - I want something stable. Wix's library looked pretty good, and then I encountered the most random bug setting up a text https://github.com/wix/react-native-ui-lib/issues/2965
- The wix one ended up having a good experience, and was used for a prototype.
- However I ended up without a UI library, I'm just styling components for myself and I won't waste time with a library and eventually change drastically so I need to update code, or just stop being maintained
- Keep in mind when to use router.replace instead of router.push, I had a bug where I was pushing to the same screen and the back button was going back to add data screen.
