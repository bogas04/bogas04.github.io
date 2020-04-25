---
title: Accessibility in web applications
description: Often we solely rely on a linter to help us avoid accessibility issues in our codebase, however it isn't always obvious how to deal with it.
date: "2016-11-27T11:48:44.318Z"
categories: []
keywords: [travel, south korea, suwon, seoul, sikh, vegetarian]
slug: /@bogas04/living-in-suwon-korea-1b3afd88a2ab
---

# Accessibility in web applications

Often we solely rely on a linter to help us avoid accessibility issues in our codebase, however it isn't always obvious how to deal with it. The solution to the linter telling you to add tabIndex/onKeyDown/role isn't to follow it (lol), but
to evaluate whether we need a button here or an anchor, or we simply need to wrap the inner callback with our function.
Linter doesn't know what is your usecase, so it tries best to make your div accessible, but that's just patch work. Before I share suggestions,

I would like to share why we should care:

#### Makes customers happy

- Someone using a keyboard, a screen reader or with some disability would be happy you cared for them.

#### Free benefits by using HTML properly!

- Element focus without any handlers
- Keyboard & screen reader accessibility
- Needs no/less JS which is better for TTI
- Less DOM elements usually
- Anchor tags work with JS disabled

#### Avoids legal issues

- https://www.change.org/p/zomato-make-zomato-accessible-with-screen-readers-for-visually-challenged-people
- https://www.usatoday.com/story/money/2019/10/07/dominos-pizza-website-accessibility-supreme-court-wont-hear-case/2002/

Some common examples:

### Div as an anchor

#### BAD:

```jsx
<div onClick={this.goToHome} />
```

#### GOOD:

```jsx
<a href={Routes.HOME} onClick={this.handleAnalyticsForHomeClick} />
```

You really want to use an anchor here.
Pros: It's automatically focussable, would work with keyboard & a screen reader, and in case of no javascript (SSR/SEO) it would know how to
handle the tap.

### Div as scroll to top

#### BAD:

```jsx
<div onClick={this.goToHome} />
```

#### GOOD:

```jsx
<a href="#id-of-element-to-scroll-to"></a>
```

You really want to use an anchor here and rely on browser to handle scrolling without JS.
Pros: It's automatically focussable, would work with keyboard & a screen reader, and in case of no javascript (SSR/SEO) it would know how to
handle the tap.

### Div as a button

#### BAD:

```jsx
<div onClick={this.onAddClick} />
```

#### GOOD:

```jsx
<button onClick={this.onAddClick} />
```

You really want to use a button here.
Pros: It's automatically focussable, would work with keyboard & a screen reader.

### Div as an click trapper

#### BAD:

```jsx
<div onClick={this.handleClick}>
  {" "}
  <button onClick={this.props.onAddClick}> Add </button>
</div>
```

#### GOOD:

```jsx
<button
  onClick={(e) => {
    this.handleClick();
    this.props.onAddClick(e);
  }}
>
  {" "}
  Add
</button>
```

You really want to wrap onAddClick. If you follow linter you'll end up with nested buttons and weird things getting focussed.
Pros: less stuff on DOM
