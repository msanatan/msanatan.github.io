---
title: "Automated Unity Builds from GitHub to itch.io"
date: 2024-07-23 20:30:00
updated: 2024-08-05 17:20:00
categories:
  - game development
tags:
  - unity
  - game development
  - ci
---

We're all too old to make manual builds, over and over again. Let's free up some local computer resources and build in the cloud! Anytime I'm taking part in a game jam, no matter the engine, the first thing I do is set up the repo on GitHub, and add some basic CI/CD. Automated builds save so much of your time!

What do our automated builds typically do?

- They can lint and test code (I've never done this in a game jam but I've definitely done this for companies)
- Build your app i.e. create the exe, app, apk, whatever you need to deploy
- Push it somewhere, in this case itch.io, but it can be the Google/App Store as well for example

This post will show you how to automatically deploy your Unity project as a WebGL game on itch.io when you push your code to your GitHub repository.

## Prerequisites

I'm assuming that:

- You have admin access to a GitHub repo with a Unity project
- You have admin access to an itch.io project
- You have a basic understanding of [GitHub Actions](https://docs.github.com/en/actions)

## High Level Breakdown

Since we're using GitHub, we should use GitHub Actions for workflow automation. You're not limited to GH Actions, but it has a generous free tier and it's supported out the box.

One key GH Action we'll be using is the [GameCI](https://game.ci/) Unity builder. GameCI abstracts a lot of the Unity set up and work for us. It also works with Gitlab Actions, Docker and other CI/CD options and tools.

The other key GH Action that we use is the [Butler Push](https://github.com/yeslayla/butler-publish-itchio-action) action. [Butler](https://itch.io/docs/butler/) is a CLI tool developed by itch.io to facilitate automated deployments. The Butler Push action was created by a developer to set up the CLI tool, and push an executable to our project.

You don't need these actions to build a Unity game, or push to itch.io. You can install and set up Unity yourself and run its build commands. You can also install Butler CLI and run the publish command. That way, it's closer to what you do manually on your computer. If it's set up that way and something goes wrong, it's very easy to debug by testing the commands on your PC! However, using pre-made, battle-tested GH actions save you a load of time.

> **Note**: Just because software is open source, doesn't mean you should trust it. This also applies to these GitHub Actions. I **_highly recommend_** looking through the source code of every GitHub Action you use, especially when you need to give it your credentials. Malicious actors have and will use software for legitimate purposes to steal your data. Also, when using these GH Actions, use a specific version of it. This mitigates the chance of your build breaking because something you depended on changed with an update.

So that's our flow, we'll be setting up GitHub Actions to build our Unity game with GameCI, and deploy it to itch.io with the Butler Push action.

## Setup

To use GameCI, and deploy to itch.io, we need to set up the following repository secrets and environment variables:

- **UNITY_LICENSE** - Follow the guide to get this, as it's a bit more difficult for personal licenses: <https://game.ci/docs/github/activation/>
- **UNITY_EMAIL**
- **UNITY_PASSWORD**
- **BUTLER_CREDENTIALS** - On itch.io, create API keys on this page: <https://itch.io/user/settings/api-keys>

And 2 variables:

- **ITCH_GAME** - The URL slug of your project e.g. `https://<YOUR_USER>.itch.io/<YOUR_GAME>`, use the last part of the URL
- **ITCH_USER** - Your username

You can configure these in your project settings page -> Secrets and variables -> Actions:

![Image of GitHub project setings page, showing the location of the repository secrets and variables required to make the CI/CD set up work](./github-settings.jpg)

With the basic set up done, let's see some code.

## GitHub Actions YAML

Here's the YAML file that automatically uploads my Unity games to itch.io:

```yaml
name: Build and deploy

on:
  push:
    branches:
      - main

env:
  PROJECT_NAME: YOUR_GAME

jobs:
  buildAndTestForLinuxBasedPlatforms:
    name: Build for ${{ matrix.targetPlatform }}
    runs-on: ubuntu-24.04
    strategy:
      fail-fast: false
      matrix:
        projectPath:
          - ./
        unityVersion:
          - 2022.3.12f1
        targetPlatform:
          - WebGL # Must be valid options for Unity: https://docs.unity3d.com/ScriptReference/BuildTarget.html
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      # Unity builds take some time, so we do some caching to make builds faster
      - uses: actions/cache@v3
        with:
          path: ${{ matrix.projectPath }}/Library
          key: Library-${{ env.PROJECT_NAME }}-${{ matrix.unityVersion }}-${{ matrix.targetPlatform }}
          restore-keys: |
            Library-${{ env.PROJECT_NAME }}-${{ matrix.unityVersion }}-
            Library-${{ env.PROJECT_NAME }}-
            Library-
      # We use Game CI (https://game.ci/) to buld the project
      - uses: game-ci/unity-builder@v4
        env:
          UNITY_LICENSE: ${{ secrets.UNITY_LICENSE }}
          UNITY_EMAIL: ${{ secrets.UNITY_EMAIL }}
          UNITY_PASSWORD: ${{ secrets.UNITY_PASSWORD }}
        with:
          projectPath: ${{ matrix.projectPath }}
          unityVersion: ${{ matrix.unityVersion }}
          targetPlatform: ${{ matrix.targetPlatform }}
          buildName: ${{ env.PROJECT_NAME }}
          buildsPath: build/${{ matrix.unityVersion }}/${{ matrix.targetPlatform }}
      # Publish the build to itch.io
      - uses: manleydev/butler-publish-itchio-action@v1.0.3
        env:
          BUTLER_CREDENTIALS: ${{ secrets.BUTLER_CREDENTIALS }}
          CHANNEL: html5
          ITCH_GAME: ${{ vars.ITCH_GAME }}
          ITCH_USER: ${{ vars.ITCH_USER }}
          PACKAGE: build/${{ matrix.unityVersion }}/${{ matrix.targetPlatform }}
```

Let's break down what each section is doing!

To start, we give the job a name:

```yaml
name: Build and deploy
```

And tell GitHub to run this action every time we push code on the `main` branch:

```yaml
on:
  push:
    branches:
      - main
```

Yes, this triggers if you make a branch and merge it to main as well.

You can define environment variables in the repository settings, and in your files:

```yaml
env:
  PROJECT_NAME: YOUR_GAME
```

> **Note**: secrets, environment variables defined in the settings and environment variables defined in the workflow files are all referenced different. Their namespaces are `secrets`, `vars`, and `env` respectively. This may trip you up sometimes, as it has for the author...

Now we define our `job`:

```yaml
jobs:
  buildAndTestForLinuxBasedPlatforms:
    name: Build for ${{ matrix.targetPlatform }}
    runs-on: ubuntu-24.04
    strategy:
      fail-fast: false
      matrix:
        projectPath:
          - ./
        unityVersion:
          - 2022.3.12f1
        targetPlatform:
          - WebGL
```

I want to draw your attention to a few things. First, we run this code on Ubuntu, as of the time of writing, the most recent stable version. Why? When you're using GitHub's servers (or hosts as they call it) to deploy your software, Linux OSes are cheaper to use than Windows or Mac. Unless a particular library you're using needs Windows/MacOS to build, if you're making a web game it's cheaper to use a Linux distro. Of course, if you're automating Windows or Mac builds, you need to use their OSes as well.

Note how we define the Unity version and the target platform. These will later be used for the GameCI step. However, having it in an array here allows us to do multiple builds with different parameters as we see fit, in addition to making it easy to reference by various steps.

After setting up the job, we start by adding our first step, which is a caching step:

```yaml
steps:
  - uses: actions/checkout@v4
    with:
      fetch-depth: 0
  - uses: actions/cache@v3
    with:
      path: ${{ matrix.projectPath }}/Library
      key: Library-${{ env.PROJECT_NAME }}-${{ matrix.unityVersion }}-${{ matrix.targetPlatform }}
      restore-keys: |
        Library-${{ env.PROJECT_NAME }}-${{ matrix.unityVersion }}-
        Library-${{ env.PROJECT_NAME }}-
        Library-
```

Unity caches data in the Library folder, I encourage you to [read more](https://docs.unity3d.com/6000.0/Documentation/Manual/AssetDatabase.html) from their docs. As GitHub Actions run on a clean slate every build, we have to do this step to preserve the Library folder. This can significantly speed up subsequent builds!

Now, we actually make the build:

```yaml
- uses: game-ci/unity-builder@v4
  env:
    UNITY_LICENSE: ${{ secrets.UNITY_LICENSE }}
    UNITY_EMAIL: ${{ secrets.UNITY_EMAIL }}
    UNITY_PASSWORD: ${{ secrets.UNITY_PASSWORD }}
  with:
    projectPath: ${{ matrix.projectPath }}
    unityVersion: ${{ matrix.unityVersion }}
    targetPlatform: ${{ matrix.targetPlatform }}
    buildName: ${{ env.PROJECT_NAME }}
    buildsPath: build/${{ matrix.unityVersion }}/${{ matrix.targetPlatform }}
```

Once we have our secrets set up correctly, this should interact with Unity engine to build for us. Notice how we configure the action with `projectPath`, `unityVersion`, and `targetPlatform` that were defined when we set up the job. If we wanted to build with multiple versions of Unity, or more likely, build for multiple target platforms, we should be able to do that without the project files of each variation clashing with each other!

Finally, we push the game's build to itch.io:

```yaml
- uses: manleydev/butler-publish-itchio-action@v1.0.3
  env:
    BUTLER_CREDENTIALS: ${{ secrets.BUTLER_CREDENTIALS }}
    CHANNEL: html5
    ITCH_GAME: ${{ vars.ITCH_GAME }}
    ITCH_USER: ${{ vars.ITCH_USER }}
    PACKAGE: build/${{ matrix.unityVersion }}/${{ matrix.targetPlatform }}
```

It's super important to ensure that the `PACKAGE` value matches the location of the build i.e. the `buildsPath` value in the GameCI step.

And that's it! Add this YAML to a file in your `.github/workflows` folder (make one if it doesn't exist) - and you'll have automated builds!

## One Time itch.io Configuration

For web builds, once the first build is pushed up, you need to:

- Head over to your itch.io project page
- Under the “Uploads” section, select the checkbox to indicate the build is going to be played in the browser

![Image of itch.io project settings page, showing the checkbox that makes the web build playable](./itchio-html-build-checkbox.jpg).

And with that, you're good to go!

## Conclusion

Automated builds are a timesaver, after setting this once you deploy new versions of your game without having to think - all you need to do is push your code. Of course, this article is geared towards game jams. In other real projects, you might to create Android build files, or Windows executables. Instead of automatically updating itch.io, you might want to download and test the game first and manually deploy. Deeper knowledge of GitHub Actions will take you far, but this is a good place to start.

Happy game deving!
