---
title: Effective Remote Communication
description: My take on team communication in a remote world.
date: "2020-11-01T06:02:13.793Z"
categories: []
keywords: [teams, remote work, productivity]
slug: ""
---

Thanks to COVID-19, working classes are either privileged to work remotely for their company, or severely unfortunate to lose their jobs and having to rebuild their careers from scratch. While the privilege of remote work is certainly a godsend, most companies in my honest opinion are struggling to make it work effectively. Here are some of my thoughts on how to improve that. I might be wrong, feel free to [tweet](https://twitter.com/bogas04) about that to me!

## Asynchronous Communication

Pretty much all developers know how synchronous blocking code isn't really ideal when multiple actors are involved. The same applies to a team of employees. If every problem requires another employee to stop what they're doing and help you out, it causes a pipeline stall. Because they've stalled what they were doing, dependents of their work would also be stalled. It isn't immediately obvious, but as the team scales without adopting asynchronous communication, you'll see how productivity counter-intuitively decreases. This is because more actors are involved, and more resources are stalled.

![Image comparing how synchronously processes stall the pipeline while asynchronous processes do not do so](/img/blog/asynchronous-vs-synchronous.png)

## Clear Articulate Communication

> Effective written communication becomes critical the more companies embrace remote work. With an aversion to "jumping on calls" at a whim, and a preference for asynchronous communication, most of remote-friendly company's communications are text-based, and so articulate and timely articulation becomes key.

[Source](https://medium.com/swlh/the-five-levels-of-remote-work-and-why-youre-probably-at-level-2-ccaf05a25b9c)

![Image comparing 3 examples of articulation. First: _call the person directly to get answer_, Second: "a-fairly-large-module isn't working , can you join this meeting for 5 minutes?", Third: "Hey, I got complete-error-message error when running code-snippet. I've tried attempts-to-fix and saw links-to-documentation, but I'm still stuck. Here's my code branch if you want to checkout and debug.">](/img/blog/articulate-communication.png)

The first message is essentially shoulder tap equivalent of office. You completely break the flow of the person, without being considerate about their time and context switch. Please don't do this unless it's basically EMERGENT as well as URGENT. To understand the difference between the two:

> The main difference between emergency and urgency is that in emergency there is immediate threat to life, health, property or environment; whereas in urgency, there is no immediate danger or threat to life, health, property or environment but if not taken care in a given period of time, then the situation may turn into an emergency situation.

[Source](http://www.differencebetween.net/science/nature/difference-between-urgence-and-emergency/)

I hope we can all agree that first message should be reserved ONLY for emergency. If we keep crying foul, like calling a person to help with some bug that hasn't even been released, or some help with an upcoming demo, what eventually happen is that employees will lose seriousness and start skipping calls, which can be catastrophic when you really have an emergency, like a huge outage or critical crash that's costing millions of dollars.

Now that the first message is basically reserved for emergencies, let's see why the second message isn't ideal either. The problem is that it's focused only getting the fix with minimum effort. It's basically, asking someone to take over and fix your issue. This is detrimental in several ways;

- You don't actually go through the process of reading, debugging, trying, thinking, and learn less.
- You stop someone else from doing their work and making it difficult for them to resume after having disconnected the call.
- The person who you're asking help from has to ask you a bunch of questions which you could've written to avoid extra time spent on the problem. "Did you try this? Did you read this? Can you share the error message? Can you share your branch?", all this could've been avoided and saved everybody's time.
- It negatively effects the mood of the other person because deep down everyone wants to help each other, but they've to make a choice between being polite and slacking off in their job. That's a tough one and not everyone would be assertive enough to triage help.
- Chances are, by the time you read the error message, Google a bit, read documentation and try certain fixes, you might have found the fix.

### Open Communication

Now that we understand importance of asynchronous and clear articulate communication, another thing that we need is open collaboration. There's no need to discuss in small silos when you know there are several employees who might be facing the same issue, might have fixed it somehow and might have better ideas than you. So asking for helping to your favorite goto person for xyz technology is only going to wear them out and give you less imaginative solutions. Discuss in open as much as possible but in a clear way so that meaningful discussion can happen for systematic solutions.
