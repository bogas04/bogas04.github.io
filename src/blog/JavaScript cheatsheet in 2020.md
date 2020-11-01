---
title: JavaScript cheat sheet in 2020
description: List of snippets to learn basics of JavaScript
date: "2020-09-14T06:02:13.793Z"
categories: []
keywords: [javascript, ecmascript, es2015]
slug: ""
---

![Evolution of ECMAScript](/img/blog/ecmascript.png)
[Source](https://engineering.carsguide.com.au/javascript-context-ecmascript-84d709ef9165)

## Basic JavaScript syntax

If you want to learn from a book, this is a great one [https://exploringjs.com/impatient-js/toc.html](https://exploringjs.com/impatient-js/toc.html)

### **Variable definition**

```tsx
const a = 123;

let b = 123;
b = a;

var c = 123;
c = a;
```

### **Function definition**

```tsx
// function definition
function myFunction() {}

// function as a variable
const myFunction = function myFunction() {};

// anonymous function
const myFunction = function () {};

// arrow function
const myFunction = () => {};
```

### **Strings**

```jsx
const a = "Hello, world";

a.length; // 12

a.slice(3, -3); // "lo, wo"

a.split(","); // ["Hello", " world]

a.charAt(0); // "H"

a[0]; // "H"

a.replace("world", "you!"); // "Hello, you!"

a.slice(6).trim(); // " world" trims into "world"

const b = a + ". Sup?"; // "Hello, world. Sup?" (single quotes are also accepted)

const c = `${b}`; // Template strings can interpolate variables
```

### **Arrays**

```jsx
const a = ["Hello,", "world"]

a.length // 2

a.join(" "); // "Hello, world"

a[0] // "Hello,"

a[a.length -1] // "world"

a.concat("!") // ["Hello,", "world", "!"]

a.find(e ⇒ e === "!") // "!"

a.find(e ⇒ e === "definitely not in array") // undefined

a.indexOf("world") // 1

a.push("Sup?") // returns new length of mutated array ["Hello,", "world", "!", "Sup?"]

a.pop() // removes last item

b.shift() // removes  first item, shifts left, ["world", "!"]

b.unshift("Hello!") // puts new item to beginning ["Hello!", "world", "!"]

// destructuring
const [first, second] = ["Hello", "world"] // first is Hello", second is "world"
const [first, ...rest] = [1, 2, 3, 4] // first is 1, rest is [2, 3, 4]

// spreading
const c = [first, ...rest] // c is [1, 2, 3, 4]

```

### **Objects**

JSON is first class citizen. The quotes around key aren't necessary.

```jsx
const o = {

  name: "Human",

  age: 200000,

  greet () {
    console.log(`Hi! I'm ${this.name} and I'm ${this.age} years old`);
  }

}

o.greet(); // prints "Hi! I'm Human and I'm 200000 years old"
[o.name](http://o.name) // "Human"

o['age'] // 200000

const key = condition ? "name" : "age";

o[key] // depending on condition it'll be "Human" or 200000

o.newKey = [1,2,3]; // o now has name, age and newKey

Object.keys(o) // ["name", "age", "newKey"]

Object.entries(o) // [["name", "Human"], ["age", 200000], ["newKey", [1,2,3]]

// destructuring

const {name} = o; // name is Human
const {
  greet,
  ...restOfObject
} = o; // greet is function, restOfObject is {name: "Human", age: 200000}

// spreading
const myNewPerson = {
  ...restOfObject,
  greet () {
    console.log(`Yo! This is ${this.name} over here. Imma ${this.age} year old!`);
  }
}

// property shorthands

const myName = "is khan";

const object = { myName } // same as { myName: myName }
```

### **Conditional Constructs**

```jsx
if (condition) {
  a();
} else if (condition2) {
  b();
} else {
  c();
}

condition ? a() : condition2 ? b() : c();

condition && a(); // iff condition is truth-y, a would be executed

a() || b(); // if result of a() is truth-y, b won't be executed
```

### **Looping Constructs**

```jsx
// for loop
for (let i = 0; i < arr.length; i++) {}

//while loo
let i = 0;

while (i < arr.length) {
  i++;
}

// do-while
let i = 0;

do {
  i++;
} while (i < arr.length);

// for-in loop to loop through keys of an object

for (let key in object) {
}

// for-of loop to loop through values of an array

for (let value of array) {
}
```

### **Functional**

```jsx
// loops through all items of arr array
arr.forEach((index, value, array) => {});

// loops through all items of arr array and returns modified array
arr.map((index, value, array) => modifiedItem);

// returns array with items where cond(value) is true
arr.filter((index, value, array) => cond(value));

// returns true if any item has cond(value) true
arr.some((index, value, array) => cond(value));

// returns true if all items have cond(value) true
arr.every((index, value, array) => cond(value));

// returns undefined or first item matching cond(value)
arr.find((index, value, array) => cond(value));
```

### **Classes**

```jsx
class A {
  constructor(name) {
    this.name = name;
  }
  static variable = 123;
  static utilityMethod() {}
  method() {}
}

const a = new A("Human");

a.method();

A.utilityMethod();

A.variable;

// Shorthand for instance variables
class B {
  counter = 0;
  increment = () => {
    this.counter += 1;
    return this.counter;
  };
}
// same as
class B {
  constructor() {
    this.counter = 0;
    this.increment = () => {
      this.counter += 1;
      return this.counter;
    };
  }
}

// Difference between defining instance method and class method (class A#method)
// is that instance methods are created for each instance
// while class method reference is reused between all instances
// so if you're dealing with a lot of instances of same class
// method will be better memory-wise
```

### **Asynchronous code**

```jsx
// Callbacks
function executeAfterOneSecond (fn) {
  setTimeout(() => {
    fn();
  }, 1000);
}

executeAfterOneSecond(() => console.log("b"));
console.log("a");

// unlike blocking languages, setTimeout won't block execution
// we'll see "a" and "b" after a second, even if we've b being executed before

// Learn more about event loop: https://www.youtube.com/watch?v=8aGhZQkoFbQ

// In this example we saw setTimeout accepting a function and so did executeAfterOneSecond
// This makes it a higher order function, and fn is called a callback
// as in, once you're done, call [me] back.

// Promises
// Imagine everything being executed via callbacks
callApi(apiUrl, (result) => {
  convertToJson(result, (json) => {
	transformData(json, (data) => {
		callAnotherApi(apiUrl2, data, (finalResult) => {
			notifyUser(finalResult);
		});
        });
  });
});

// While this is good as our code doesn't block any user action like scrolling
// it's hard to read and is usually referred to as "Callback hell"

// Promises were designed to make this pyramid shape more flat

// A promise is an instance of class Promise that has two main methods then & catch

const callApi = apiUrl => new Promise((resolve, reject) => {
  lowLevelFunctionToCallNetwork(apiUrl, (err, data) => {
    if (err) reject(err);
    else resolve(data);
  })
});

callApi(apiUrl)
  .then(convertToJson)
  .then(transformData)
  .then((data) => callAnotheApi(apiUrl2, data))
  .then(notifyUser);

// Async/await makes it even more easier

async function () {
  const result = await callApi(apiUrl);
  const json = await transformData(result);
  const finalResult =  callAnotherApi(apiUrl2, data);
  notifyUser(finalResult);
}();
```

### **Module system**

In my opinion, frontend code grows much faster than backend code. Not only you deal with calling various APIs and data transformation techniques, you also bind all that to UI, while taking care of navigation, animations, performance, accessibility and so on.

Without the ability of converting code snippets into tiny reusable modules, you'll end up in a great spaghetti code with business logic, API logic, performance optimizations, UI, animations etc. all in one file.

Let's first cover imports

```jsx
// assuming "react" is in package.json's dependencies
// present in <root>/node_modules

// imports only the the default export.
import React from "react";
// imports all the named and default export as React.
import * as React from "react";

// you can change the name as you find fit
// note: in case of React you really need to name it React for JSX transpilation
import ICanChangeTheNameToAnything from "react";

// you can destructure from modules
import { Component, useState, useEffect } from "react";

// you can rename a destructured value from a module using `as` keyword.
import { Component as ReactComponent } from "react";

// for local imports, you need to give relative path (in context of current file)
import * as mypackage from "./my-package";

// All import paths have to be statically known, so you can't put a variable in there.
```

Now that we know how to import, let's focus on exports

```jsx
export const a = 1; // imported as import {a} from './my-package';

export function print(...args) {
  // imported as import {print} from "./my-package";
  console.log(...args);
}

const b = 2;
const c = 3;
const d = 4;

export { b, c, d }; // imported as import { b, c, d } from "./my-package";

export default a; // imported as import a from "./my-package";

export * from "./some-other-package"; // exports evertyhing in some-other-package
```
