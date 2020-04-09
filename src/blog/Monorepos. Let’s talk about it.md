---
title: Monorepos, let's talk about it
description:
  Recall the days when you were just introduced to git or a similar type of
  version control system. I’m guessing you must have faced some…
date: "2019-09-17T07:55:58.095Z"
categories: []
keywords: [git, repository, monorepos, coding, lerna, javascript]
slug: /@bogas04/monorepos-lets-talk-about-it-4b1b7d4f1038
---

![Image credits: undraw](/img/blog/1__zWhHZUDWuxJwfEoumC1__OQ.png)

Recall the days when you were just introduced to `git` or a similar type of version control system. I’m guessing you must have faced some friction initially, how it breaks your flow, how you just can’t merge to master without rebasing/merging changes in first.

Despite that, you might agree today that it’s actually very helpful in collaborating with the team, and those pain points were necessary to get here.

Monorepos are somewhat similar.

While git was solving problems around managing single codebase with multiple team members or just better versioning, Monorepo kind of does the same but for multiple projects/codebases.

### The what.

> Is Monorepo that cool font I see on Twitter?

![Image credits: undraw](/img/blog/1__ZzlBaQH6w1BgwZdo3bIYRQ.png)

Before diving into the topic, let’s first understand what Monorepo truly means. This is what Wikipedia has to say:

> In revision control systems, a Monorepo is a software development strategy where code for many projects are stored in the same repository.

In other words, your ‘Work’ folder is close to what a Monorepo would look like. It would have packages that deal with server, web app, native app, documentation, etc.

This is different from a ‘monolith’ where all your application logic is  
centralized to one entry point as opposed to distributed services (microservices).

While code for various services would sit in a single repository, it doesn’t mean it would be deployed as a single entity, just like your ‘Work’ folder. Individual projects have separate life-cycles.

### The why.

> So, do I just `git add` my entire ‘Work’ folder?

> “Why would you want to do this? Whatever happened to separation of concern?”

There are several arguments both in favour and against Monorepos. And I don’t mean “Oh Google uses it” kind of arguments. This blog will give a sneak-peek into our problems and Monorepo’s solutions to them.

Regardless, I recommend that you identify the problems your codebase is facing, and see if Monorepo is truly the answer to those.

### The story.

Before moving to Monorepo, we as a team worked on 3 codebases at the same time;

- **dweb** (Desktop website of Swiggy)
- **mweb** (Mobile website of Swiggy)
- **service** (API proxy NodeJS middleware, used by dweb and mweb)

When I say work, I mean writing features, updating build pipeline, reviewing code and fixing bugs.

As the codebases grew, we recognized some patterns:

![Image credits: undraw](/img/blog/1____L__bUfSLVT6EboXRO7SSGg.png)

- Features written on mweb, while dissimilar enough to not to be dragged and dropped to dweb, held enough similarities to be broken into reusable parts.
- Fixes that go on mweb are also needed on dweb.
- Code reviewers often ended up reviewing the same code (between mweb and dweb) in a slightly different context.
- Code review changes on dweb are also relevant to mweb
- Changes to contracts of service, a common dependency, are also needed to be individually coded, tested, and reviewed.
- Updating dependencies like [React](https://reactjs.org/)/[Webpack](https://webpack.js.org/)/[Babel](https://babeljs.io/) becomes cumbersome between the two codebases.
- Conventions are difficult to enforce between the three repositories. One has an older version of [ESLint](https://eslint.org/), one hasn’t been updated when new lint rules were added, one is still using old test runner.
- Attempts to make a new repository to keep common code failed due to the amount of setup and code management. Imagine working with multiple team members on multiple repositories with multiple Pull Requests.

As you can see, while the projects are very different (check out [swiggy.com](https://portal-sentry.swiggyapp.com/settings/swiggy/go-front-staging/keys/) on your desktop and mobile to realize that), they still have quite a lot of common code interactions.

> Bike-shedding: Have you tried [Swiggy](https://www.swiggy.com?utm_source=medium) website on your desktop or mobile browser? We would love to hear your feedback!

### The how.

![Logo of Lerna](/img/blog/1__0WjBWfdkbcob39FMklwp7A.png)

[https://lerna.js.org/](https://lerna.js.org/)

Depending on your ecosystem, there will be different tools to help you with maintaining a Monorepo. You can obviously go vanilla and just use different folders per project. We use [Lerna](https://lerna.js.org/) for maintaining our JavaScript codebase.

Thanks to its community, there’s a [lot](https://github.com/lerna/lerna/tree/master/commands/publish) [of](https://github.com/lerna/lerna/blob/master/FAQ.md) [documentation](https://lerna.js.org/#commands) and [help](https://medium.com/mitterio/multirepo-to-lerna-js-monorepo-80f6657cb443) for Lerna [related](https://github.com/lerna/lerna/blob/master/doc/troubleshooting.md) [queries](https://github.com/lerna/lerna/blob/master/doc/guides.md).

```bash
# Install lerna globally
npm i -g lerna

# Change directory to your work folder
cd ~/Work

# Make the folder you want to keep your monorepo in
mkdir portal-web

# Change directory to monorepo folder
cd portal-web

# Initialize lerna (it will handle `git init`)
lerna init

# Commit the changes
git add . && git commit -m "Initial commit"

# Import other packages (https://github.com/lerna/lerna/tree/master/commands/import)
lerna import ~/Work/portal-mweb

# That's pretty much it!

# Fun fact: If you want to rename your package, simply rename the folder before importing.
# Fun fact 2: You might need to flatten out the commits in most cases (https://github.com/lerna/lerna/tree/master/commands/import#--flatten)
```

You may use [above scripts](https://gist.github.com/bogas04/874731db80967c040209fea396bf7804) to import existing repositories to a lerna based monorepo.

Running scripts from the root has been made simpler using these handy [npm scripts](https://docs.npmjs.com/misc/scripts).

These scripts allow for convenient way to invoke package scripts from root folder

Since our packages are hosted in [internal npm registry](https://verdaccio.org/), we inject a .npmrc in our [Jenkins](https://jenkins.io/) build the pipeline to avoid committing the authToken.

A script to find all scoped dependencies of a project

```bash
# Install monorepo dependencies from internal npm registry
npm i `../../scripts/scope-packages.js @portal`

# Fun fact:
# `npm i <package-name>` would also install other dependencies if they aren't present in node_modules,
# along with the mentioned <package-name>

# Fun fact 2:
# In presence of package-lock.json, `npm i` would use those version numbers instead of fetching the latest ones
# This essentially makes it a hybrid of `npm i` and `npm ci`
```

One interesting thing about [Lerna](https://lerna.js.org/) is that it [doesn’t](https://gist.github.com/bogas04/8c9702aba064b03b1162a0058c7b8f98) want private packages to be part of the `package-lock.json.` This means we can’t just simply use `npm ci`. We use this bash script to get past that.

### The happy part.

Within a few months of making this change, we tippled the number of packages in our Monorepo. We also saw much more work done on the linting front, leading to a more consistent codebase.

The linter is common to entire Monorepo, and each new rule affects all the packages.

- **config** (webpack config as a package, reused by mweb and dweb)
- **ui** (a package to create common patterns of design to be used in mobile and desktop, thus enabling us to work on creating a Swiggy’s design system)
- **payments** (a package of Swiggy’s payments page, used by multiple tenants)
- **reviews** (a package of Swiggy’s Ratings and Reviews page and components, used by mweb and dweb)
- **helpers** (a package of common reusable logic, something like lodash)
- **daily** (swiggydaily.com, reuses 2 components from mweb)
- **cache** (a caching module used by mweb and dweb)
- **restaurant-url** (a restaurant slug generator, multiple tenants)

![Image credits: undraw](/img/blog/1__kvwGrM__62LBXWLHxH__QwGw.png)

I think that giving the option to easily create a new package incentivizes developers to think in more modular terms. They don’t think in the context of an app but rather in a more general way.

It also discourages them from touching modules that are used by multiple tenants, and use [semantic versioning](https://semver.org/) appropriately.

The benefits we are seeing out of this are just amazing:

- Writing the same fix for dweb and mweb is faster, as it’s just one commit.
- No more `npm link` mess.
- Reviewing a fix for both dweb and mweb is faster, as it’s just one Pull Request on one repository by one team member.
- Reusing and updating build pipeline is much more seamless.
- Updating major dependencies/lint rules is super easy.
- The collocation of code encourages developers to copy-paste less and reuse more.
- Writing reusable modules becomes easier, leading to better software engineering.

### The sad part.

But it ain’t all fun. Our PR section is a bit noisier. It’s not like we’re somehow writing more code, but that changes to any package comes to spotlight and doesn’t get silently updated.

- Too many packages lead to longer bootstrap times.
- Leveraging the benefits of Monorepo takes time.
- The code navigation is slightly slower. Developers are now opening individual packages to work around that.

**Update:** There’s one more point I would like to touch upon. Our approach currently colocates applications with libraries. ‘mweb’ is a private package in the sense it isn’t published to our npm registry, however ‘ui’ is a public package that can be consumed by mulitple tenants. This leads to heterogeneity in the monorepo. We are okay with this mix as

- it reduces friction of local development (no npm links).
- colocation leads to easy refactors and library creations.
- code review is simpler when it’s all one repository.

### The verdict.

So far we’re seeing Monorepo architecture a better fit for our growing codebase and team. It also impacts the way we design new libraries and components, often promoting clearer separations of concerns.

![Image credits: undraw](/img/blog/1__O3UIYiDjYTXMAZd7GBMwVg.png)

Should you use monorepo? Like all things, it depends on TM! I hope this blog gave enough insight to you as to why we started using a Monorepo, and how it’s benefiting us.

> DISCLAIMER: We don’t advocate for any of the tools, libraries, coding practices or software development philosophies mentioned here. You are welcome to read, learn, accept, reject and critique however you see fit.
