---
title: "MagicaVoxel Turntables to Video on Windows 10/11"
date: 2022-03-06 21:25:00
tags:
  - 3dgraphics
  - magicavoxel
---

<!-- <video>
 <source src="chicken1.mp4" type="video/mp4">
 Your browser does not support HTML5 video.
</video> -->
![Voxel models of chicken and chicks](chicken1.mp4)

I've recently been using <a href="https://ephtracy.github.io/" target="_blank" rel="noopener nofollow noreferrer">MagicaVoxel</a> to create voxel art (pixel art but 3D, think Minecraft) and I love it! It's so simple and it has a lot of power.

MagicaVoxel has a "turntable" export which takes many pictures of your rendered object as it rotates 360 degrees, or whatever you specify. It's commonly used to make gifs and videos. Getting a video on Windows 11 was a bit tricky at first.

I have WSL setup on my Windows 11 machine, so the code and commands I run are on my Ubuntu OS. However, you don't need WSL to do this.

<a href="https://medium.com/tech-notes-and-geek-stuff/voxel-art-4f8ee761a3ab" target="_blank" rel="noopener nofollow noreferrer">This guide</a> on medium pointed me in the right direction. I've never used `ffmpeg` before, it's commonly used for converting videos from one format to another. It can also convert the turntable images from MagicaVoxel into a video!

The first step is to install `ffmpeg` via WSL:

```bash
sudo apt-get install ffmpeg
```

If you're not using WSL, you can follow the instructions on their <a href="https://www.ffmpeg.org/" target="_blank" rel="noopener nofollow noreferrer">homepage</a> to install directly on Windows.

The next step is to change the file names to make it easier for MagicaVoxel. You may not have to do this if you choose an easy file name while exporting, unlike a certain developer... To change the names of all my tunrtable images in a folder, I ran this script I created:

```python
from os import listdir, rename
from os.path import isfile, join

file_path = '<Turntable Images Path>'
only_files = [f for f in listdir(file_path) if isfile(join(file_path, f))]

for idx, img_file in enumerate(only_files):
  idx_str = str(idx)
  rename(join(file_path, img_file), join(file_path, f'img{idx_str.zfill(3)}.png'))
```

Now all the files would be like `img000.png`, `img001.png`, etc. In your terminal, run the following ffmpeg command:

```bash
ffmpeg -r 30 -s 960x800 -i img%03d.png -codec:v mpeg4 -flags:v +qscale -global_quality:v 0 -codec:a libmp3lame nintendoswitch.mp4
```

For an MP4 onn Windows, I was only successful with the `mpeg4` codec. I'm no export on `ffmpeg` by a longshot, but after reading in forums and trying things out - the above command gives me the best video quality.

And that's all, have fun showing off your work with cool videos!

<!-- <video>
 <source src="./nintendoswitch.mp4" type="video/mp4">
</video> -->
![Nintendo Switch](./nintendoswitch.mp4)
