---
title: Golang Shared Objects in Docker Alpine Containers
date: 2020-02-19 08:00:00
categories:
- [web]
tags:
- golang
- docker
---

Hola Go devs!

Golang has an amazing compile experience. It's quick, a lot of errors are caught because of static typing, cross-compilation is effortless and the binary just works. Not having to install a runtime is the way it should be.

At [wepala](https://wepala.com/) where I currently work, we use Golang a lot. When it comes to deploying Go binaries, we opt for [Linux Alpine](https://alpinelinux.org/) docker images as they're pretty small. Who doesn't love a container that's 25MB?

I don't usually encounter a problem with this setup, but a recent project requires me to use [Go plugins](https://golang.org/pkg/plugin/). With plugins, instead of an executable, I create an `.so` (shared object) file when I compile my Go code.

When I first tried to load my plugin with a Go app in an Alpine container, I get this error message:

```plaintext
standard_init_linux.go:211: exec user process caused "no such file or directory"
```

At the time I figured this out, googling that error did not return many useful results. Turns out the fix was pretty simple, in your Dockerfile with the Go plugin add this line:

```console
RUN apk add --no-cache libc6-compat
```

It seems that my plugin had dependencies that required some C libraries that didn't exist in the base Alpine image. I tried disabling `CGO` when building the plugins but no luck.

This solution worked best for me. Hopefully, it saves you a lot of search time!

Happy dockering!
