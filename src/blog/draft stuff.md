---
title: My experience with vibe coding my favorite todo app
description:
date: "2022-07-02T06:02:13.793Z"
categories: []
keywords: [indie-web]
slug: ""
---

So this is my entry to a prompt "Write about a system you built for your life you are very happy with" I got at [an Indie Web Meetup](https://indieweb.org/Bangalore).

So, I vibe-coded a todo app? **Yay, big deal.** No, seriously, this was a big deal for me—or at least it was when I was going through what I felt was the most anxious period of my life.

## anxiety

This year sucks. Apart from wars, war crimes, loss of life, financial upheaval caused by an orange fart ball, the closure of various [game studios](https://gaminglayoffs.com/), and human-caused "natural" disasters, I also suddenly found myself in what felt like a profound crisis of purpose. AI agents have indeed become so good that, with enough tokens and relevant context, you can get them to build almost any software you want. I really felt the pain of being perceived as irrelevant and redundant, despite still having a job (so far) and having institutional knowledge and experience. It was very easy to spiral into thoughts like, "But then what's the point if it can be done with a prompt?"

I had briefly read about a talk by a fellow member of the tech community about [ego coding](https://www.linkedin.com/posts/poojabhaumik_in-this-talk-i-coined-a-new-term-ego-coding-activity-7322124840600043521-_Dsc/), and without even watching it, I felt immense pain just thinking about the title. I was indeed suffering from the "ego coding" blues. I wanted to write code myself, and now AI was sometimes—not always—better or faster than I was. I was in despair and had lost the will to do anything.

One of my colleagues at work had a different response to this dread. They immersed themselves in work and accomplished in a day what one would usually do in a month, thanks to this agentic superpower. I was genuinely scared to open Slack and see their multiple PRs in a day, complete with beautiful before-and-after screenshots. It didn't look sloppy, and it wasn't coded sloppily either. It was literally their blood, sweat, tears, and tokens.

## wait, where is this going?

Yeah, so amidst all this, therapy helped me understand why I suddenly had the urge to become a driver, open a cafe with my savings, or buy a fleet of cabs and earn a living that felt protected from AI. Now, I am not trying to tell you that I have cured my anxiety; it is often a signal of other underlying fears. But I do want to talk about a system that helped me calm down a bit, put my head down, and focus on getting work done. This is a coping mechanism, not the ultimate fix.

## a todo app?

![Screenshot of Day Planner, a todo app](https://raw.githubusercontent.com/bogas04/day-planner/main/.github/screenshot.png)

So, to fight the demon of anxiety triggered by AI, I used AI to create a todo app, like one does. This wasn't an ordinary todo app; it was something I really wanted for myself. I wanted a list of things I planned to do that day and a way to see the progress _I_ made—not in comparison to my peers or the world at large, but simply by looking at what was unfinished at the start of the day and what I had completed by the end. I also wanted to see the progress that was getting obscured by the noise of work Slack and Reddit doom posts. So I wanted to write a sentence or two reflecting on the day, along with a rating. Some days were a 1/10; some were a 9/10. That granularity helped me answer the loud critic in my head asking, "What have you done?"

I wrote it in Swift—well, I asked an LLM to write it—even though I had no clue how the language worked. I wanted it for my Mac, with Mac-like aesthetics. I didn't want to run Electron, so Swift it was. Honestly, I had no cognitive capacity to learn anything new or do anything, but I wanted a wonky gratitude journal that I would actually use.

I also wanted to have pictures by Marianne North, after becoming enamored with her art at Kew Gardens. So I had those added too. They calmed me.

![Day Planner's 20-minute break reminder](/gallery/blog/day-planner-break.png)

I then added more features to it: a 20-minute break reminder for my ergonomic exercises, a sound mixer because why not, and so on.

## does it work?

I have been using it almost daily, and my ratings have definitely improved. I was able to manage my catastrophizing mind and get things done, irrespective of what my environment felt like.

It also surprisingly did something else: it helped me understand what vibe coding can actually feel like. I would never have been able to learn Swift, build the app the way it looks, or add all these features overnight. In fact, I doubt I would have been able to do it using Electron either, with this level of polish or at this pace. It helped me truly experience parts of [this tweet](https://xcancel.com/karpathy/status/1886192184808149383?lang=en), especially the idea to "embrace exponentials." I understood the devil I was fighting a little better and came to some level of acceptance of the new reality. Life is about change. Change is painful, but it eventually becomes the new normal.

## fin

I feel less anxious now, I am able to work a bit more peacefully, and I see agentic coding as yet another form of coding—one where the syntax is high-level system design.
