---
title: Lessons from Creating My First Godot Game
date: 2019-12-17 22:45:00
categories:
- [games]
- [game development]
tags:
- godot
- game development
---

Hello aspiring game devs! As you know from my previous post I've been getting into Godot, and I'm pretty excited.

As I follow this [course on Udemy](https://www.udemy.com/course/godot/), after every tutorial I try to make a game. I always make a game that's harder than what I just worked on. This way, I get to practice what I learn but I'm also forced to learn new things without a guided hand. While painful, it deepens my understanding of what's going on.

Since my last project, here are some technical bits I've picked up on that I'll carry with me for future projects.

## Folder Structure

In all development languages/frameworks, structure is a matter of personal taste and project size. For very small games or quick prototypes, you can get by with a flat structure. The one I've settled with for my small projects is:

```
|- assets
 |- audio
 |- fonts
 |- images
|- scenes
|- scripts
```

In whatever way it's done, the majority of the community prefers to separate the scenes from the scripts. Some larger games also have hierarchies in their `scenes` and `scripts` folders as the need arises.

## Safely Checking for Nodes and Properties

This is nothing big but it's something I'll probably forget. If you want to check if a node exists in a scene, use this code snippet:

```python
if some_cool_node.has_node("node_that_might_exist"):
```

But to check if a node has a property, like one you'll edit in the GUI, simply do this:

```python
if some_cool_node.property_that_might_exist:
```

## A Menu Buttons Scene

A YouTube video I can't find anymore :-( showed me this awesome technique for making menu buttons. After creating a basic menu button scene, attach this script to it:

```python
extends TextureButton

export (String) var scene_to_load
export (bool) var quit_game

func _ready():
    pass
```

We add two variables that can be configured in the GUI for menu buttons. The `scene_to_load` takes a resource path of which scene the menu button should load when it's clicked. The `quit_game` flag tells us if this button is being used to quit the game.

Then, attach a script similar to this for your menu scene:

```python
extends MarginContainer

var scene_path_to_load : String
onready var MenuButtons = $CenterContainer/HBoxContainer/MenuButtons

func _ready():
    MenuButtons.get_child(0).grab_focus()
    for button in MenuButtons.get_children():
        button.connect("pressed", self, "_on_Button_pressed", [button])


func _on_Button_pressed(button):
    if button.quit_game:
        get_tree().quit()
    scene_path_to_load = button.scene_to_load
    $FadeIn.show()
    $FadeIn.fade_in()


func _on_FadeIn_fade_finished():
    get_tree().change_scene(scene_path_to_load)
```

In the ready function, we do two things: highlight the first menu button that's added to the scene and connect the `pressed` event of the menu buttons to our `_on_Button_pressed` function. Using the for loop allows us to use one function to handle button presses for all the menu options.

The `_on_Button_pressed` function checks if a button is being used to quit the game, and handles that separately. For all other buttons, store what scene it was meant to load and play a fade animation.

Once the animation is complete, we'll switch to that scene stored in `scene_path_to_load`. This very simple setup makes scene switching in menus a breeze

Happy game developing!
