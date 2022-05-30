---
title: Delightful React Native Development
description:
  Coming from Web Developemnt, while semantics of React Native might seem familiar, the environment and tooling can be quite intimidating. Here are some ways to make it *tolerable*.
date: "2022-05-30T012:55:58.095Z"
categories: []
keywords: [react, react-native, android]
---

## Use wireless debugging for testing features

If you've Android 11 or above, wireless debugging is absolutely Godsend to make your development loop much more efficient and stable.
Imagine you don't have to fiddle with USB cables anymore, never have the anxiety of losing connection just by touching the cable,
or you don't have restart your phone because for some reason Android can't detect you've connected it to a PC. All these things
have happened to me on daily basis, which is why I started using emulator exclusively for my development. However, emulators are slow,
not representative of actual hardware, and instantly convert your x86 PCs/Macs into two-in-one space-heater and white noise machine.

Wireless debugging is the answer, and it's quite easy to set up.

1. Open your android phone and [enable Developer Options](https://developer.android.com/studio/debug/dev-options).
2. Go to Developer Options and search for "Wireless Debugging" (needs android 11 or above).
3. Enable it and tap it, you should be presented with a dialog with an ip address, port and pairing code. 
4. Keep your phone as is and now head to your PC/Mac which is connected to same Wireless network.

```bash
# Install adb for mac if you don't have it already (using homebrew)
brew install --cask android-platform-tools

# From your phone
adb pair <ip-address>:<port>
# It'll ask for pairing code, enter it

# DONE! Test it out:
adb devices
```

## Nuke audio access to your Emulator

There are still times when I like using the emulator. Maybe my phone is away, maybe I just want to test a quick thing, maybe I've a M1 macbook.
While it runs fine, I have this issue that my audio output devices would stop receiving all channels, and it'll sound all muffled. 
One simple fix is to completely nuke access to audio lol. Thanks to [Ivo Stoyanov and Paweł Kanarek](https://stackoverflow.com/a/68392331) for this tip.

```bash
# Assuming you've only one emulator profile
vim /Users/`whoami`/.android/avd/*.avd/config.ini      
# Set hw.audioInput and hw.audioOutput to no
```
