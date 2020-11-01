---
title: Effective Remote Communication
description: My take on team communication in a remote world.
date: "2020-11-01T06:02:13.793Z"
categories: []
keywords: [teams, remote work, productivity]
slug: ""
---

Thanks to COVID-19, working classes are either privileged to work remotely for their company, or severely unfortunate to lose their jobs and having to rebuild their careers from scratch. While the privilege of remote work is certainly a godsend, most companies, in my honest opinion, are struggling to make it work effectively. Here are some of my thoughts on how to improve that. I might be wrong or missing some points, would be more than happy to discuss about it on [Twitter](https://twitter.com/bogas04)!

## Asynchronous Communication

Pretty much all developers know how synchronous blocking code isn't really ideal, especially when multiple actors are involved. The same applies to a team of employees. If every problem requires another employee to stop what they're doing and help you out, it causes a pipeline stall. Because they've stalled what they were doing, dependents of their work would also be stalled. It isn't immediately obvious, but as the team scales without adopting asynchronous communication, productivity counter-intuitively decreases, despite the increase of workforce. In my opinion addition of new members doesn't also mean improvement of efficient communication amongst them.

![Image comparing how synchronously processes stall the pipeline while asynchronous processes do not do so](/img/blog/asynchronous-vs-synchronous.png)

## Clear Articulate Communication

> Effective written communication becomes critical the more companies embrace remote work. With an aversion to "jumping on calls" at a whim, and a preference for asynchronous communication, most of remote-friendly company's communications are text-based, and so articulate and timely articulation becomes key.

[Source](https://medium.com/swlh/the-five-levels-of-remote-work-and-why-youre-probably-at-level-2-ccaf05a25b9c)

![Image comparing 3 examples of articulation. First: _call the person directly to get answer_, Second: "a-fairly-large-module isn't working , can you join this meeting for 5 minutes?", Third: "Hey, I got complete-error-message error when running code-snippet. I've tried attempts-to-fix and saw links-to-documentation, but I'm still stuck. Here's my code branch if you want to checkout and debug.">](/img/blog/articulate-communication.png)

The next problem is that folks prefer to communicate as little as possible about their issue, while expect an immediate fix for their issue. Observe the three scenarios above. The first message is essentially a [shoulder tap equivalent of office](https://chelseatroy.com/2018/04/17/but-what-if-i-cannot-tap-my-remote-employee-on-the-shoulder/). You completely break the flow of the other person, without being considerate about their time and their context switch. Please don't do this unless it's basically EMERGENT as well as URGENT. To understand the difference between the two, let's look at this quote:

> The main difference between emergency and urgency is that in emergency there is immediate threat to life, health, property or environment; whereas in urgency, there is no immediate danger or threat to life, health, property or environment but if not taken care in a given period of time, then the situation may turn into an emergency situation.

[Source](http://www.differencebetween.net/science/nature/difference-between-urgence-and-emergency/)

I hope we can all agree that first message should ONLY be reserved for emergencies. If we keep crying foul, like calling a person to help with an unreleased software or upcoming demo, what eventually happens is that employees lose seriousness and start skipping calls. This can be catastrophic when you really have an emergency, like a huge outage or critical crash that's costing millions of dollars.

Now that we've established that the first message is basically reserved for emergencies, let's see why the second message isn't ideal either. The problem is that it's focused only in getting the solution, but with minimum effort. It's basically like asking someone to take over and fix your issue, i.e. [spoon feeding](https://theleegroup.com/spoon-fed-vs-supportive-management/). This is detrimental in several ways;

- You don't actually go through the process of reading, debugging, trying, thinking, and learn less.
- You stop someone else from doing their work and making it difficult for them to resume after having disconnected the call.
- The person who you're asking help from has to ask you a bunch of questions which you could've written to avoid extra time spent on the problem. "Did you try this? Did you read this? Can you share the error message? Can you share your branch?", all this could've been avoided and saved everybody's time.
- It negatively effects the mood of the other person because deep down everyone wants to help each other, but they've to make a choice between being polite and slacking off in their job. That's a tough one and not everyone would be assertive enough to triage help.
- Chances are, by the time you read the error message, Google a bit, read documentation and try certain fixes, you might have found the fix.

### Open Communication

Now that we understand importance of asynchronous and clear articulate communication, last thing that we need is open communication. There's no need to discuss in small silos when you know there are several of employees who might be facing the same issue, might have fixed it somehow and might have better ideas than the person you're taking help from. So asking for helping to your favorite goto person for xyz type of issue is only going to wear them out and give you less imaginative solutions. Discuss in open as much as possible, albeit in a clear articulate fashion, so as to enable meaningful discussion for systematic solutions.

I hope this post made some sense to you and encourages you to form [boundaries](https://www.careercontessa.com/advice/healthy-boundaries-at-work/) for your sanity and that of your team members. I'll highly recommend you to go through the links I've shared in this blog to learn more.
