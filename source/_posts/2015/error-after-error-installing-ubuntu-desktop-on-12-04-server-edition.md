---
title: Error After Error Installing Ubuntu Desktop on 12.04 Server Edition
date: 2015/04/20 18:47
categories:
- [linux]
tags:
- linux
- ubuntu
- virtualisation
---

While configuring a VM with Ubuntu Server 12.04, I thought I should put a GUI for other users (and fine, myself too). Yea I know it's not the latest version of Ubuntu but Precise is perfect for what's going to be hosted on it and it's a Long Term Support (LTS) release so I'm good with updates till 2017.

This is a pretty simple install:

```sh
sudo apt-get install --no-install-recommends ubuntu-desktop
```

The 'no-install-recommends' only installs the dependencies of the package (Ubuntu installs the recommended packages by default, list of packages [here](https://packages.ubuntu.com/precise/ubuntu-desktop "ubuntu-desktop packages")). That simple command failed horribly with this message:

```sh
E: Unable to correct problems, you have held broken packages.
```

After updating the repos and failing again, I did some googling and realised that I needed to enable the universe repository and then do an update! Cool, let's do just that:

```sh
sudo add-apt-repository universe
```

These commands are so nice and easy :D But no, not working! I got this error now:

```sh
sudo: add-apt-repository: command not found
```

Fair enough, the VM was just a fresh install of Ubuntu server. Quick googling told me I need two packages: "software-properties-common" and "python-software-properties". The former installed nice and easy, the latter... Well it had some unmet dependencies and wasn't going to budge. Apparently Precise had some problems with the package list so the solution was the clear it out and do an update:

```sh
sudo rm -rf /var/lib/apt/lists/*
sudo apt-get update
```

After that I was able to install python-software-properties and get the add-apt-repository command. But the version of the command I showed earlier was for those sexy new versions of Ubuntu, 12.10 and up. Here's the old school one for Precise:

```sh
sudo add-apt-repository "deb https://archive.ubuntu.com/ubuntu $(lsb_release -sc) universe"
```

Yea... not too sexy. It worked though, and I was finally able to get my ubuntu-desktop like a happy customer :).
