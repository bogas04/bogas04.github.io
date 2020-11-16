---
title: Learning ReactJS in 2020
description: My take on introducing you to ReactJS
date: "2020-09-14T06:02:13.793Z"
categories: []
keywords: [react, react-native, react-native-web]
slug: ""
---

**Prerequisites**: Working knowledge of JavaScript, ES6 features (classes, arrow functions at least). Here's a [cheatsheet](/blog/javascript-cheat-sheet-in-2020-9-14-2020) for same.

![ReactJS Logo](/img/blog/reactjs.png)
Screenshot of official [ReactJS](https://reactjs.org) website.

## Why do we even need React?

- Every frontend application deals with calling APIs, transforming data, listening to user's actions (click, key presses) and updating UI accordingly.
- As you have more and more interactable/dynamic elements in your UI, keeping a reference of each element and manually changing it whenever data (let's call it state of application) changes can be cumbersome. It can also be hard to remember to update all elements that are related to one particular state variable.
- Let's take example of an app like Swiggy. When I click on add item, see how many elements update, and how many calculations are going on.

<video loop autoplay controls muted src="/video/blog/swiggy-add-to-cart.mp4"></video>

- Not just that, there are a lot of edge cases that have to be handled. Observe what happens when I try to add item from other restaurant.

<video loop autoplay controls muted src="/video/blog/swiggy-add-to-cart-edge-case.mp4"></video>

- Clearly manually updating each state variable and element is invitation to a messy codebase. And we've not yet seen how hard it can be to update UI code.
- For something as simple as updating text of any element, we've to do the following. Imagine having id's all over your HTML code and writing code to manually mutate every single field, each time one state variable changes.

```jsx
// pseudo-ish code, just to illustrate how one might tackle the problem
// with imperative procedural approach

const addToCart = document.getElementById("add-to-cart");

addToCart.addEventListener("click", (e) => {
  if (getCartRestaurant() !== getCurrentRestaurant()) {
    showPopup();
    return;
  }

  e.target.innerText = e.target.innerText + 1;

  const itemDetails = itemStore.get(addToCart.data.itemId);
  if (!cartExists()) {
    addCartToUI(); // series of commands to build up cart UI
    addItemToCartUI(itemDetails); // series of commands to update cart UI with new itemDetails
  }

  addItemToCartUI(itemDetails);
});
```

- This is where React comes handy by abstracting the imperative commands in a declarative API, while also making it reactive to state changes. So whenever our state changes, React will take care of updating the UI as defined by our code.

```jsx
<button onClick={() => addItemToCartState(itemDetails)}>Add</button>;
{
  cartExists && <Cart items={cart.items} />;
}
{
  cartExists && currentRestaurant !== cart.restaurant && <Popup />;
}
```

- React takes care of rendering to UI, we just need to make update cart state, the components would react to it naturally. By making reusable components like Cart and Popup, you don't have to duplicate code each time you want to construct UI and behavior around it. Components can naturally compose making it really easy to write code.
- React Native is another platform that uses React in its core. All fundamentals of React are ditto same in React Native, with only differences in some APIs and core components provided. The value proposition of React Native is that unlike native apps, you can use single codebase for iOS, Android and Web, while also bypassing App store/Play store for releasing non-native changes (all UI & business logic majorly). We'll discuss this point later.

## JSX - The language of React

```jsx
import React from "react";

function Person(props) {
  return (
    <div>
      <h1 style={{ color: "red" }}>{props.name}</h1>
    </div>
  );
}

// is transpiled into

import React from "react";

function Person(props) {
  return React.createElement(
    "div",
    null,
    React.createElement("h1", { style: { color: "red" } }, props.name)
  );
}
```

Before we understand React, we must first take time to understand JSX, the way you describe UI in React Applications. JSX is basically an extension to JavaScript to add support for XML like syntax. While JSX isn't necessary, it does make it much more easy to write code. React's philosophy deviates from traditional template based frameworks (Angular, Vue, Svelte) in the sense that it doesn't mix programming constructs into the template, but rather mixes HTML into JavaScript itself.

This makes writing UI code familiar to HTML, while also having access to entire JavaScript syntax. This IMO reduces a lot of boilerplate and template specific knowledge.

Note: A tool like babel or typescript can be used to do this transformation. Note, as it is JSX won't run on browser, it needs to be converted to JavaScript, hence the need of a build tool.

```tsx
<MyComponent isActive />;
// is transpiled into
React.createElement(MyComponent, { isActive: true });

<MyComponent isActive {...props} />;
// is loosely transpiled into
React.createElement(MyComponent, { isActive: true, ...props });
```

## A React component

Now that we know how to express UI in a React app efficiently (code readability wise), we can look into an actual React component now.

There are 3 primary parts to a React component. It can have internal state, it can listen to props sent by its parent component, and it can return a sub-tree of UI expressed as JSX.

There are two paradigms you can follow to make a React Component.

- Class based components

  > Any class that extends either of `React.Component` and implements at a bare minimum render method that returns JSX, is a class based component.

```jsx
// basic example
class MyComponent extends React.Component {
  render() {
    return <h1>Hello!</h1>;
  }
}
```

- Functional components

  > Any function that returns JSX is a functional component.

```jsx
// basic example
function MyComponent() {
  return <h1>Hello!</h1>;
}

// smoller plz
const MyComponent = () => {
  return <h1>Hello!</h1>;
};

// i sed smolllllll
const MyComponent = () => <h1>Hello!</h1>;
```

As you can see, functional component seem to be quite simple in their definition. Each component can accept props and can have an internal state. But how do these access props and state?

### Props

```jsx
// functional component
function MyComponent(props) {
  return <h1>{props.title}</h1>;
}

// class based component
class MyComponent extends React.Component {
  render() {
    return <h1>{this.props.title}</h1>;
  }
}
```

### State

```jsx
// functional component
function MyComponent() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}

// class based component
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }
  render() {
    return (
      <button onClick={() => this.setState({ count: this.state.count + 1 })}>
        {count}
      </button>
    );
  }
}

// smoller plz
class MyComponent extends React.Component {
  state = { count: 0 };
  render() {
    return (
      <button onClick={() => this.setState({ count: this.state.count + 1 })}>
        {count}
      </button>
    );
  }
}
```

There's fundamental difference in idea of state in a class component and functional component. In a class component, entire state is part of `this.state` and each state variable would be a key of it. While in functional component, each state variable is created individually by virtue of `useState`, a magical-looking function that somehow remembers current state value between renders, and can differentiate one from another. You can also see how state is tightly coupled to the class (it's directly inside the constructor), while in case of function, it is yet another function call. If say you had 3 state variables, you can group 3 `useState`s in one function call and use it. This isn't quite intuitively obvious when we see class based components.

Originally, we only had class based components as the only viable option as only they supported state and other features. However, React introduced concept of [hooks](http://reactjs.org/hooks) (such as `useState`), that gives a lot of flexibility to functional components making them not only on-par but actually superior in terms of code re-usability and agility.

Since it's much simpler to understand functional components, we'll go through them first so that you can contribute ASAP. When we discuss lifecycle methods, we'll learn more about the differences.

<iframe src="https://codesandbox.io/embed/stoic-ptolemy-n2h8r?fontsize=14&hidenavigation=1&theme=dark"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
  title="stoic-ptolemy-n2h8r"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

### Lifecycles and Side-effects

Having access to state and props is very powerful to create dynamic UIs. However, you also need to know about the lifecycle of a component. You may want to call an API as soon as the UI is visible to user. Or may want to cancel a polling request as soon as the component is removed from current tree of components. You may want to know when a `query` prop has been updated by a parent of a `<Search query={userQuery} />` component, to fetch new results based on updated `query`. All these are side effects of component's life cycle. Perform this side effect when some event occurs (component loads, state changes, prop changes, component unloads to name a few).

Let's see how to listen to these events in class based components first.

### Class Based Components

#### When a component loads

```jsx
class MyComponent extends React.Component {
  state = { loading: true, data: null };

  async componentDidMount() {
    // perform on load side effects
    const data = await callApi();
    this.setState({ data, loading: false });
  }

  render() {
    const { loading, data } = this.state;
    if (loading) return "Loading...";

    return <User data={data.user} />;
  }
}
```

#### When a component is removed from tree

```jsx
class MyComponent extends React.Component {
  state = { timer: 0 };

  // update state.timer every 1000 ms
  poll = () =>
    setInterval(
      () => this.setState((oldState) => ({ timer: oldState.timer + 1 })),
      1000
    );

  componentDidMount() {
    this.timer = poll();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return <h1>{this.state.timer}</h1>;
  }
}
```

#### When a prop is updated

```jsx
class MyComponent extends React.Component {
  state = {results: [], loading: true}

  componentDidMount() {
      fetchNewResultsAndUpdateState(this.props.query);
  }
  componentDidUpdate(prevProps, prevState) {
    // query updated
    if (prevProps.query !== this.props.query) {
      fetchNewResultsAndUpdateState(this.props.query);
    }
  }
  render() {
    const {results,loading} = this.state;

    if (loading) return "Getting your results...";

    return (
      <>
        {results.map(result => <SearchResult result={result} key={result.id} />)}
      </>;
    )

  }
  async fetchNewResultsAndUpdateState = query => {
     this.setState({loading: true});
     const results = await getResults(query);
     this.setState({loading: false,results});
  }
}
```

There are several more lifecycle methods provided by React.Component, but I think these 3 are enough for you to build highly dynamic UIs that are memory safe. They're quite powerful and let you know achieve a lot of complex interactions.

However, remember I told how class based components are tightly coupled to the business logic and are hence quite verbose?

- Logic to call API whenever a component loads seems to be a generic problem, but due to the way React classes are designed, it's hard to abstract this out in a neat way. There are several advanced patterns like Render Props and Higher Order Functions to mitigate that. Each time you want to call an API on load of a component, you've to write this logic in one way or another.
- Since we can define `componentDidMount`, `componentDidUpdate` and `componentWillUnmount` only once, they'll keep the logic to call APIs, unsubscribe from intervals and subscriptions, clean up other resources in a one huge block. We can't really abstract it out as they're all interdependent. In our timer example, we need to rely on `componentDidMount` to set `this.timer` so that we can clear it in `componentWillUnmount`.
- The logic to check which prop has been updated can quickly become a mess if you've to listen to changes on multiple props. What we really want to do is "whenever props.query changes, do this" but what we're actually doing is "whenever component updates, check if it updated due to change in query, if that's the case, do this". Also, since `componentDidUpdate` isn't fired when component is loaded, we need to perform the call in `componentDidMount` as well.

### Functional Components

Now that we've seen the power of lifecycle methods, let's see how functional components achieve that with basically making use `useEffect`. As you can imagine, `useEffect` seems to be a hook doing a lot of heavy lifting, so let's spend some time understanding it before going through above use cases.

Let's first see the signature of `useEffect`.

```tsx
// a function returning nothing
type CleanupType = () => void;
// a function returning a CleanupType function
type CallbackType = () => CleanupType;

// accepts CallbackType function and Dependency array, returns nothing
type UseEffectType = (CallbackType, Dependency[]) => void;

// example

useEffect(() => {
  doSomething(a);
  return () => doSomethingElse(a);
, [a]);
```

In above example, we are basically asking react to `doSomething` whenever `a` changes (dependency list tells react to listen to changes on that variable). And whenever `a` transitions from one value to another, before considering the new value, call `doSomethingElse`. This can be seen as an opportunity to do cleanup. Clear polling functions, unsubscribing event listeners, saving some state to storage etc.

An empty dependency list would imply whenever the component that has invoked this hook mounted and unmounted. If you omit the dependency list altogether, then you're essentially telling React to run your code on each render. You almost never want this.

```tsx
function MyComponent() {
  useEffect(() => {
    doSomething();
  });

  // is loosely same as
  doSomething();
}
```

We can already see how the hooks aren't tied to the functional component that is invoking them, and that we can have multiple number of `useEffect`s, just like `useState`. Lastly, it's just a function call, and multiple such `useState` and `useEffect` s could be hidden beneath one `useComplexStuff` hook call.

Let's go through the use-cases mentioned above but using functional components now.

#### When a component loads

```jsx
function MyComponent() {
  // unlike class components, each state variable is individually stored
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    callApi().then((data) => {
      setData(data);
      setLoading(false);
    });
  }, []);

  if (loading) return "Loading...";

  return <User data={data.user} />;
}
```

Please go through it and let me know if you've any questions. Try to absorb this API.

Now let's see if we can truly abstract out this logic to call API on component load.

```tsx
// so smoll. much nice.
function MyComponent() {
  const [loading, data] = useUser();

  if (loading) return "Loading...";

  return <User data={data.user} />;
}

// but how do we implement useUser?
function useUser() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    callApi().then((data) => {
      setData(data);
      setLoading(false);
    });
  }, []);

  // this is the only extra line i've added to previous code.
  // It's basically copy paste refactoring
  return [loading, data];
}
```

#### When a component is removed from tree

Remember how I said `componentWillUnmount` depends on variables set by `componentDidMount`. Well, in case of `useEffect` the cleanup function has access to all variables created by the effect part of the function. So that's convenient.

```tsx
function MyComponent() {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTimer((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  return <h1>{timer}</h1>;
}
```

And again, we can abstract this into a `useInterval` hook. These custom hooks are called, yup, custom hooks. Prefix them with a `use` so that it plays nicely with [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks).

```tsx
function MyComponent() {
  const timer = useTimer(0);

  return <h1>{timer}</h1>;
}

function useTimer(defaultValue) {
  const [timer, setTimer] = useState(defaultValue);

  useEffect(() => {
    const interval = setInterval(() => setTimer((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  return timer;
}
```

I hope you're now convinced that hooks are really powerful and highly composable. Let's see the final use case now.

#### When a prop is updated

```tsx
function MyComponent(props) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getResults(props.query).then((results) => {
      setResults(results);
      setLoading(false);
    });
  }, [props.query]);

  if (loading) return "Getting your results...";

  return (
    <>
      {results.map((result) => (
        <SearchResult result={result} key={result.id} />
      ))}
    </>
  );
}
```

You can see how just with one `useEffect` we can handle both mounting and updating stages. This makes our code less verbose and more declarative. Unlike class example, we're really asking react to get results whenever query updates.

You might have observed how I've not used `async/await` syntax within a `useEffect` yet. It's because the `CallbackType` isn't an `async` function and it's expecting a callback in return, not a promise. If you really want to use async await syntax, you should try doing this:

```tsx
useEffect(() => {
  const fetchResults = async () => {
    setLoading(true);
    const results = await getResults(props.query);
    setResults(results);
    setLoading(false);
  };
  fetchResults();
}, [props.query]);
```

Now that we've seen enough hooks code, I think it's time to go through the _[Rules of Hooks](https://reactjs.org/docs/hooks-rules.html)._ Yes, they seem to be magical, but there are some rules that we need to follow to ensure React doesn't end up minimizing into a point of singularity and breaking the universe as we know it.

1. Hooks must be only called from a React Functional Component or a custom hook.
   You can't use it in a normal business logic function, or a class based component.
2. Hooks must be at top level of wherever it's being called from.
   Basically, you can't use a hook inside a condition or loop.

Go through the [documentation](https://reactjs.org/docs/hooks-rules.html#explanation) to understand more about this.

### Styling

So far you might have this `style` prop used on various components with an object with style related values in it.

```tsx
<h1 style={{ color: "red", backgroundColor: "blue", marginRight: 10 }}></h1>
```

These are actually CSS style [rules](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference#Keyword_index) that React accepts for base components. Rules that have a hyphen are camel cased. So `margin-right` becomes `marginRight`. Also, you can pass numbers wherever applicable, `px` unit would be taken for those. So `marginRight: 10` is same as `margin-right: 10px;`

**Note:** Unlike CSS you can't define [pseudo classes](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes) like `:hover` or [pseudo elements](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements) like `::after`. You can achieve that by defining a CSS class outside of React and using it as `className` or using CSS-in-JS libraries like [styled-components](https://styled-components.com/).

## React Native

Now that we've covered most of the basic fundamentals of ReactJS, let's see how [React Native](https://reactnative.dev/) is different. In all our above examples, we're actually using ReactJS along with [ReactDOM](https://reactjs.org/docs/react-dom.html). It's the driver that knows what to do when we write a heading like follows.

```tsx
<h1 style={{ color: "red" }}>Hello</h1>
```

It converts the `h1` to respective HTML [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction) element, and applies the styling to it. So we can see that ReactJS (class components, state, lifecycle, props, composability, hooks etc.) is actually host platform agnostic. It can run on any platform as long as you provide a driver for the same. On Native platforms, [react-native](https://reactnative.dev/) does that. You can image that we can't use `h1` and the like on native as they don't understand HTML. Instead, we've things like `TextView` on Android and `UITextView` on iOS and so on for all native UI elements. The driver takes care of mapping a `<View style={{backgroundColor: 'red'}}></View>` into a `UIView` object with background property set as "red" for iOS, likewise for Android.

![https://reactnative.dev/docs/assets/diagram_ios-android-views.svg](https://reactnative.dev/docs/assets/diagram_ios-android-views.svg)

So apart from using components like `View` `Text` `TextInput` `Image` etc in place of `div` `span` `input` `img` (respectively), the fundamentals remain the same. There's one more difference however, and that is styling:

- Just like native platforms don't understand HTML, they don't understand CSS either. Authors of React Native made [Yoga](https://yogalayout.com/docs) a [flexbox](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox) implementation along with a CSS rule subset to native styling translation layer for native platforms.
- Another thing is that unlike HTML where you can basically create any sort of hierarchy of elements, even if it doesn't make sense, React Native is more strict. Strings are only accepted by `<Text/>` and you can't place strings inside a `<View />`, similarly rules around text (color, fontSize etc) don't have any effect on a `<View />`. You need to assign it to the `<Text />` directly.
- Also the API of `style` prop is slightly different. We'll cover it next.

### React Native Styling

Unlike [react-dom](https://reactjs.org/docs/react-dom.html), `style` prop is slightly different in the sense that it also accepts an array. It can also accept object created by `StyleSheet.create`

```tsx
// react-dom
<div style={{margin: 10, backgroundColor: 'red'}} />

// react-native
<View style={{margin: 10, backgroundColor: 'red'}} />
// or
<View style={[{margin: 10}, {backgroundColor: 'red'}]} />
// or
const styles = StyleSheet.create({
  container: {margin: 10, backgroundColor: 'red'}
})
<View style={styles.container} />
```

### React Native Web

We've come full circle with [React Native Web](https://necolas.github.io/react-native-web/docs/?path=/docs/overview-getting-started--page), which is basically a component library that has same API as `react-native` but is implemented with `react-dom` in mind. A view in `react-native-web` is essentially a `<div />` . This might seem futile, however the power is that you can now write your code in React Native, and use it on web using `react-native-web`.

## Advanced Patterns

These are now not as important with advent of hooks, however it's still important once in a while in your daily job. You can ignore these for now and comeback later whenever you encounter one.

### Higher Order Components

Just like Higher Order Functions can accept a function and return a new one, High Order Components are functions that accept a component and return a new one. This can be used as a way to decorate a particular component with extra behavior.

Suppose we want to show a loader if `loading` prop is true, but we don't want to write this code for all components. We can create a `withLoader` higher order component to solve this.

```tsx
function withLoader(Component) {
  return function LoaderContainer(props) {
    if (props.loading) return <Loader />;
    return <Component {...props} />;
  };
}
```

Now we can wrap our components with `withLoader` whenever we want to add this behavior.

```tsx
// UserPage.js
class UserPage extends React.Component {
  ...
}

export default withLoader(UserPage);

// Home.js
function Home () {
  const [loading, data] = useUser();

  return <UserPage loading={loading} data={data} />;
}
```

Multiple such HOCs can be used to add behavior. [react-redux](https://react-redux.js.org/api/connect) actually exposes one popular HOC `connect` that lets you connect to the [redux](https://redux.js.org/) store.

There are some caveats though:

- Our React tree will now have a `LoaderContainer` above each component using this HOC.
- We can't add this behavior dynamically or conditionally, at build time we make the choice either to wrap a component in an HOC or not.
- Passing a [ref](https://reactjs.org/docs/refs-and-the-dom.html) won't give us [ref](https://reactjs.org/docs/refs-and-the-dom.html) of our `Component`, but rather of `LoaderContainer`. To mitigate this most developers usually manually connect a `innerRef` prop to the inner component.

```tsx
function withLoader(Component) {
  return function LoaderContainer({ innerRef, ...props }) {
    if (props.loading) return <Loader />;
    return <Component ref={innerRef} {...props} />;
  };
}
```

- The static fields on the component won't be accessible from the enhanced component. Suppose `UserPage` has a `MODES` field so that you can choose which mode of `UserPage` you want to render. To mitigate this, you can [hoist](https://reactjs.org/docs/higher-order-components.html#static-methods-must-be-copied-over) the [non-react statics](https://github.com/mridgway/hoist-non-react-statics).

```tsx
// UserPage.js
class UserPage extends React.Component {
  ...
  static MODES = {LITE: 0, NORMAL: 1};
}

export default withLoader(UserPage);

// Home.js
function Home () {
  const [loading, data] = useUser();

  // ❌ Won't work as withLoader doesn't expose the MODES static field.
  return <UserPage mode={UserPage.MODES.LITE} loading={loading} data={data} />;
}
```

### Render props

While HOCs are highly powerful, they have a lot of caveats that Render Props attempt to solve. Render props are just a fancy name given to a pattern in which makes use of the fact that `children` field (or any prop for that matter) of a component can actually be a function. Using this, we can put behavior in our Render Prop accepting Component and use it like any other React Component. This is in a way inversion of control, where you decide what you want to render. For an example, let's modify the first class based example of loading data on component load. This helps us extract the behavior out of our initial example and lets us reuse that logic wherever we want.

```tsx
class UserDataFetcher extends React.Component {
  state = {loading: true, data: null}

  async componentDidMount () {
    const data = await callApi();
    this.setState({data, loading: false});
  }

  render() {
    const {loading, data} = this.state;
    return this.props.children(loading, data);
  }
}

function App () {
  return <UserDataFetcher>{(loading, data) => {
    return <UserPage loading={loading} data={data} />
   }}</WithUserData>
}
```

I guess you can see why this was so powerful in pre-hooks era.

## Optimizations

While React's internal architecture ensures app performance stays top-notch, there are some optimizations we can use to reduce load on user's system by avoiding large re-renders. See, each time reference of state or props of a component changes, React would re-render the component. This is how we achieve reactivity. However, React by default will make no checks and assumptions to see if the update prop or state is actually same as before.

```tsx
function MyComponent() {
  const [count, setCount] = useState(0);

  return (
    <>
      <button onClick={() => setCount((c) => c + 1)}>{count}</button>
      <Library version="1" />
    </>
  );
}

const Library = ({ version }) => {
  return <h1>The library version is {version}</h1>;
};
```

Whenever `count` state variable updates in `MyComponent`, `MyComponent` would re-render. And since it re-renders, it'll cause `Library` to re-render as well. React wouldn't check if version has actually changed or not. If you wish to avoid a re-render of `Library`, you can use `React.memo`

### React.memo

```tsx
function MyComponent() {
  const [count, setCount] = useState(0);

  return (
    <>
      <button onClick={() => setCount((c) => c + 1)}>{count}</button>
      <Library version="1" />
    </>
  );
}

const Library = React.memo(({ version }) => {
  return <h1>The library version is {version}</h1>;
});
```

`React.memo` will see if props passed to a functional component have been updated or not. It loops through all the keys in previous props and next props, and sees if they're referential-ly equal to each other. It accepts a second argument as well to explicit perform this check.

```tsx
const Library = React.memo(
  ({ version }) => {
    return <h1>The library version is {version}</h1>;
  },
  (prevProps, nextProps) => prevProps.version === nextProps.version
);
```

Here we are telling `React.memo` that consider props to be equal if the 2nd argument returns `true`. So the function is anwering the question `are props the same?`

One thing to note is that `React.memo` checks for reference updates and not value update. The "reference" to any variable may change even though the "value" remains same.

```jsx
let a = { version: 1 };

a = { version: 1 };
```

In the above code, by virtue of re-assignment, we've caused the reference of `a` to change, even though the value is identical. React doesn't care for the value, but the reference. This is why we can't mutate variables as React wouldn't be able to tell whether it has been updated or not. And such reassignments can happen a lot of times! Let's consider the following example now.

```tsx
function MyComponent() {
  const [count, setCount] = useState(0);

  const libraryData = { version: "1" };
  return (
    <>
      <button onClick={() => setCount((c) => c + 1)}>{count}</button>
      <Library data={libraryData} />
    </>
  );
}

const Library = ({ data: { version } }) => {
  return <h1>The library version is {version}</h1>;
};
```

Just like before, whenever the `count` state variable updates, `MyComponent` would re-render, due to which `Library` would re-render too. Even if we apply `React.memo` like before, it wouldn't help in this particular case.

```tsx
function MyComponent() {
  const [count, setCount] = useState(0);

  const libraryData = { version: "1" };
  return (
    <>
      <button onClick={() => setCount((c) => c + 1)}>{count}</button>
      <Library data={libraryData} />
    </>
  );
}

// ❌ Wouldn't work as reference of libraryData changes on each render
const Library = React.memo(({ data: { version } }) => {
  return <h1>The library version is {version}</h1>;
});
```

The reason for this is that we've passed an object literal, which would be created each time `MyComponent` updates. Same is true for functions that are created in-line.

```tsx
function MyComponent() {
  const [count, setCount] = useState(0);

  const onClick = () => alert("You clicked!");

  return (
    <>
      <button onClick={() => setCount((c) => c + 1)}>{count}</button>
      <Library version="1" onClick={onClick} />
    </>
  );
}

// ❌ Wouldn't work as reference of onClick changes on each render
const Library = React.memo(({ version, onClick }) => {
  return <h1 onClick={onClick}>The library version is {version}</h1>;
});
```

Each time `MyComponent` updates, a new function is created for `onClick` prop of `Library`. This can be fixed by some of the following techniques:

1. Moving the said object/function outside of render of `MyComponent`
2. Somehow memozing the value between renders.
3. Updating the checks performed by `React.memo` to compare the value and not just reference.

For the first method, we can just move the object to global scope. This way the reference never changes.

```tsx
const libraryData = { version: "1" };

function MyComponent() {
  const [count, setCount] = useState(0);

  return (
    <>
      <button onClick={() => setCount((c) => c + 1)}>{count}</button>
      <Library data={libraryData} />
    </>
  );
}

// ✅ Works as reference of libraryData doesn't change
const Library = React.memo(({ data: { version } }) => {
  return <h1>The library version is {version}</h1>;
});
```

#### useMemo & useCallback

Or you could update the way `Library` accepts version. Notice how earlier we were simply passing version as a prop instead of keeping it inside a data prop. Since reference to strings & numbers don't change, our usage of `React.memo` would work as expected. The insight here is that you can design the way your component accepts props to avoid such pit-falls of referential equality checks. But this might not work always as your data needs might be different.

```tsx
function MyComponent() {
  const [count, setCount] = useState(0);

  return (
    <>
      <button onClick={() => setCount((c) => c + 1)}>{count}</button>
      <Library version="1" />
    </>
  );
}

// ✅ Works as reference of strings doesn't change
const Library = React.memo(({ version }) => {
  return <h1>The library version is {version}</h1>;
});
```

Second method can help in that case. To memoize the value, in functional components we can use advanced hooks like `React.useMemo` & `React.useCallback`. Suppose we really need to pass `version` as a data object. We can ask React to memoize it between renders using `useMemo`. The second argument is a dependency array, just like `useEffect`. So here we are telling React to recompute `libraryData` whenver any item in the array passed as second argument changes. Empty array implies on component mount. So this way we can preserve the reference to `libraryData`

```tsx
function MyComponent() {
  const [count, setCount] = useState(0);

  const libraryData = useMemo(() => ({ version: 1 }), []);

  return (
    <>
      <button onClick={() => setCount((c) => c + 1)}>{count}</button>
      <Library data={libraryData} />
    </>
  );
}

// ✅ Works as reference of libraryData is now memoized.
const Library = React.memo(({ data: { version } }) => {
  return <h1>The library version is {version}</h1>;
});
```

`useCallback` is similar to `useMemo`, just that it returns a callable function instead. We can use this for functions.

```tsx
function MyComponent() {
  const [count, setCount] = useState(0);

  const onClick = useCallback(() => alert("You clicked!"), []);

  return (
    <>
      <button onClick={() => setCount((c) => c + 1)}>{count}</button>
      <Library version="1" onClick={onClick} />
    </>
  );
}

// ✅ Works as reference of onClick is now memoized.
const Library = React.memo(({ version, onClick }) => {
  return <h1 onClick={onClick}>The library version is {version}</h1>;
});
```

In fact, you can implement `useCallback` using `useMemo` as the latter works for any type of value.

```tsx
const useCallback = (fn, dependencyArray) => useMemo(() => fn, dependencyArray);
```

The last method is to just change the way `React.memo` performs the check. Though this can go pretty nasty as the number of props increase and nesting of the keys increase. And there's no neat way to do it for functions.

```tsx
function MyComponent() {
  const [count, setCount] = useState(0);

  const libraryData = { version: "1" };
  return (
    <>
      <button onClick={() => setCount((c) => c + 1)}>{count}</button>
      <Library data={libraryData} />
    </>
  );
}

// ✅ Works as we're now comparing individual key of object
const Library = React.memo(
  ({ data: { version } }) => {
    return <h1>The library version is {version}</h1>;
  },
  (prevProps, nextProps) => prevProps.data.version !== nextProps.data.version
);
```

**NOTE:** These are advanced optimizations and you should use them only if you've an actual performance regression. More often than not, the extra work done in these optimizations might give very little gains with the cost of code complexity and potential to introduce bugs. Each memoization technique described here requries extra computation (`React.memo` loops throught all props and checks their reference change), memory usage (To memoize is to store data) between renders, so the benefit would only come if the value you're trying to memozie is too expensive to calculate (some highly complicated data manipulation on an array of 1000 items) or the component you're planning to prevent re-renders for has a complicated deeply nested UI to render. In above cases it makes no sense as `<h1 />` is fairly simple component and `libraryData` is a very small object. So unless you have a performance problem caused by re-renders, you shouldn't wrap variables in `useMemo` and components in `React.memo`

### React.PureComponent

`React.memo` and the hooks like `useMemo` and `useCallback` only work for functional components. What about class components?

Let's first take our above example to a class-y world.

```tsx
class MyComponent extends React.Component {
  state = { count: 0 };

  render () {
   const libraryData = { version: "1" };
    return (
      <>
        <button
          onClick={() => this.setState(s => ({ count: s.count + 1 })}
        >
          {count}
        </button>
        <Library data={libraryData} />
      </>
    );
  }
}

class Library extends React.Component {
  render () {
    const { version } = this.props.data;
    return <h1>The library version is {version}</h1>;
  }
);
```

Class based components have access to a life cycle method `shouldComponentUpdate`. We can guess from the name that it's similar to the second argument of `React.memo` above.

```tsx
class MyComponent extends React.Component {
  state = { count: 0 };

  render () {
   const libraryData = { version: "1" };
    return (
      <>
        <button
          onClick={() => this.setState(s => ({ count: s.count + 1 })}
        >
          {count}
        </button>
        <Library data={libraryData} />
      </>
    );
  }
}

class Library extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.data.version !== nextProps.data.version;
  }
  render () {
    const { version } = this.props.data;
    return <h1>The library version is {version}</h1>;
  }
);
```

It's different in two ways than `React.memo`. Firstly, it has access to `nextState` so we can add checks for state changes. This can be helpful if a key in `this.state` is an object or function and you can't determine whether a state update is needed whenever you set it. Secondly, it is expecting answer to `should component update?` and not `are props the same?`. Other than that it's pretty much the same. You can imagine writing it by hand and having a dozen of checks for a large component can be tedious and error-prone. If only we had a default behaviour of `React.memo` for classes. Enter `React.PureComponent`

Just like `React.Component`, `React.PureComponent` is another class you can extend from to create your component. It behaves just like a regular component, but has a `shouldComponentUpdate` lifecycle method implemented for you.

```tsx
class MyComponent extends React.Component {
  state = { count: 0 };

  render () {
    return (
      <>
        <button
          onClick={() => this.setState(s => ({ count: s.count + 1 })}
        >
          {count}
        </button>
        <Library version="1" />
      </>
    );
  }
}

// ✅ Works as reference of this.props.version doesn't change as it's a string
class Library extends React.PureComponent {
  render () {
    const { version } = this.props;
    return <h1>The library version is {version}</h1>;
  }
);
```

And just like `React.memo` it would fail if the said prop is an object or function that updates in each render. However, we don't really have a simple way to memoize these variables like `useMemo`. You can instead define a class property to move it out of scope render method.

```tsx
class MyComponent extends React.Component {
  state = { count: 0 };

  libraryData = { version: "1" };

  render () {
    return (
      <>
        <button
          onClick={() => this.setState(s => ({ count: s.count + 1 })}
        >
          {count}
        </button>
        <Library data={this.libraryData} />
      </>
    );
  }
}

class Library extends React.Component {
  render () {
    const { version } = this.props.data;
    return <h1>The library version is {version}</h1>;
  }
);
```

**NOTE:** Writing `shouldComponentUpdate` by hand can cause more harm if a bug in logic prevents component from re-rendering. Relying on `PureComponent` is preferred, however if the component is simple, a re-render might be as good as comparison checks before render.
