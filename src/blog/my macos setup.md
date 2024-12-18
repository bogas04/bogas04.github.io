---
title: My macOS setup
description: Stuff I do while setting up a new mac
date: "2020-04-03T07:55:58.095Z"
categories: []
keywords: [software, macos]
slug: /@bogas04/my-macos-setup
---

![Picture of a macbook](/img/blog/macos.jpg)

## Preferences

I dislike macOS's fullscreen mode, so in order to get maximum screen real estate, I autohide menu bar and dock.

### Autohide menu bar

Refer to [this](https://www.cnet.com/how-to/how-to-hide-the-menu-bar-in-os-x-el-capitan/) article.

### Autohide dock & disable recent applications

I also like a clean setup, so I keep only essential items in the dock for quick access, for rest I use spotlight.

Refer to [this](https://www.cnet.com/how-to/macos-mojave-shows-recent-apps-in-the-dock-heres-how-to-hide-them/) article.

## Git default push to current branch

```bash
git config push.default current --global
```

## Oh My ZSH with Auto Suggest

[Oh my ZSH](https://ohmyz.sh/)

[zsh-autosuggestions plugin](https://github.com/zsh-users/zsh-autosuggestions/blob/master/INSTALL.md#oh-my-zsh)

## Keyboard stuff

- Disable `cmd+option+space` for spotlight history (System Preferences -> Spotlight -> Keyboard Shortcuts)

Spotlight history is of no good use really, and that key combination can be utilized for a better purpose that we'll talk about later.

![Screenshot of spotlight keyboard settings](/img/blog/spotlight-history.png)

- Use Caps lock as Escape (System Preferences -> Keyboard -> Modifier Keys)

As a vim user, I'm used to keeping Caps Lock as Escape key.

![Screenshot of capslock modifier](/img/blog/caps-escape.png)

- Turn on key repeating

```bash
# Open Terminal.app and past the following command.
defaults write -g ApplePressAndHoldEnabled -bool false
```

I don't know why this isn't the default behaviour. I don't have much use for macOS's character suggestions on holding a key.

## Expanded TouchBar

I prefer expanded touch bar over app specific touchbar.
System Preferences > Keyboard > "Touch Bar shows" - Expanded Control Strip.

## Trackpad stuff

### Enable tap to click (System Preferences -> Trackpad)

I prefer tap over physical clicks.

### Increase cursor size (System Preferences -> Accessibility -> Display)

A big cursor is easier to find and makes things easy to move around.

- Enable dragging with three fingers (System Preferences -> Accessibility -> Trackpad -> Trackpad Options)
- Click and hold is worse experience in my opinion.

## Application stuff

### Configure spotlight to not index a lot of stuff.

In my setup, I don't need use spotlight to open files, so indexing them (_cough_ `node_modules` _cough_) is unnecessary waste of resources.

### Install [ShiftIt](https://github.com/fikovnik/ShiftIt/releases)

This window management utility is helpful and highly configurable.
Configure it to use `cmd+option+arrow-key` for top/left/right/bottom and `cmd+option+space` for maximize

_Update:_ ShiftIt isn't optimized for M1 yet, so you can use [Rectangle](https://rectangleapp.com/) instead.

### Install [Clipy](https://github.com/Clipy/Clipy/releases)

Clipboard management of my choice.
Configure it to use `cmd+option+v` for menu.

_Update:_ Clipy isn't optimized for M1 yet, so you can use [Maccy](https://maccy.app/) instead.

### [Itsycal](https://www.mowglii.com/itsycal/)

Statusbar calendar of my choice.

## dot-files

If you're interested in my dot-files, you can view them [here](https://github.com/bogas04/dot-files).
