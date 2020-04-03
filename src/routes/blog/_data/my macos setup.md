---
title: My macOS setup
description: Stuff I do while setting up a new mac
date: "2020-04-03T07:55:58.095Z"
categories: []
keywords: [software, macos]
slug: /@bogas04/my-macos-setup
---

![Picture of a macbook](img/blog/macos.jpg)

## Preferences

- Autohide menu bar
- Autohide dock

## Keyboard stuff

- Disable `cmd+option+space` for spotlight history (System Preferences -> Spotlight -> Keyboard Shortcuts)
- Use Caps lock as Escape (System Preferences -> Keyboard -> Modifier Keys)
- Turn on key repeating

```
defaults write -g ApplePressAndHoldEnabled -bool false
```

## Trackpad stuff

- Enable tap to click (System Preferences -> Trackpad)
- Increase cursor size (System Preferences -> Accessibility -> Display)
- Enable dragging with three fingers (System Preferences -> Accessibility -> Trackpad -> Trackpad Options)

## Application stuff

- Configure spotlight to not index a lot of stuff.
- Install [ShiftIt](https://github.com/fikovnik/ShiftIt/releases)
  - Configure it to use `cmd+option+arrow-key` for top/left/right/bottom and `cmd+option+space` for maximize
- Install [Clippy](https://github.com/Clipy/Clipy/releases)
  - Configure it to use `cmd+option+v` for menu.
