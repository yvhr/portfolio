---
title: "Javascript: The Weird Parts"
date: 2018-09-15
description: >-
  Javascript is weird, let's get that out of the way. Still, it's not like Javascript is illogical, in fact, most of it's weirdness is a side effect of …
draft: false
---

Javascript is weird, let's get that out of the way. Still, it's not like Javascript is illogical, in fact, most of it's weirdness is a side effect of its power while coping up with programmers' whims. But once you understand why it does what it does, we'll realize that it's not that complex after all. All languages has its own fair share of quirks and nuances that we just have to learn.

This article/guide is my transcription of Anthony Alicea's lecture entitled: Javascript - Understanding the Weird Parts. I expounded and added additional explanation on topics where I felt like more examples and details are necessary. This is not for people new to Javascript, it's more for people who are familiar with Javascript, but still have huge knowledge gaps. After reading this and you still crave for more, I highly recommend reading [Eloquent Javascript](https://eloquentjavascript.net) by Marijn Haverbeke (_saying the word "eloquent" makes you feel 10x smarter already, but not as much as the word "quintessential"_) and Kyle Simpson's [You Dont Know JS](https://github.com/getify/You-Dont-Know-JS) is also one of the best.

![javascript](/images/writing/javascript-the-weird-parts/weird-javascript.png)

## Syntax Parser
A program that reads code and determines what it does and if it's grammar valid.

## Lexical Environment
Where something sits physically in the code you write. It determines how a piece of code will interact with other elements of the code. The Syntax parser makes decisions based from where a code is placed.

## Execution Context
A wrapper to help manage the code that is running. It contains some metadata, some elements that you didn't write. Javascript attaches the `this` and `outerEnvironment` that your code has access to while it runs.

## The Global Execution Context.
Everytime a function is run, a new execution context is being created. The global execution context is the root context, the main context where there is no other else that's running.

> What's executing isn't what you've written, it's being processed by the javascript engine beforehand.

### Global Object
Is the object every running javascript code has, the object associated with the global execution context. You can reference it by the special/keyword variable `this` on the root context or by the variable `window` (if you're using node, V8 engine's version is the variable `global`).

```javascript
// At the root context (not inside a function)
window === this
```

Defining a variable and function will attach it to the current execution context.

### Hoisting
The process at which the memory space of variables and functions are setup.

The execution is created in two phases:

##### Creation Phase
The phase where `this` and the `outerEnvironment` is created while also setting up the variables and functions' memory space placing on the `variable environment`, together they are what we refer to as the execution context. 

One little caveat for variables: Variables are attached to execution context with a placeholder value called `undefined`, the actual value is determined on the execution phase. Functions, on the other hand get attached as is and ready for invocation.

##### Execution Phase
Javascript runs your code line by line. Variables' values are resolved based on the result of the expressions.
```javascript
var a = 'Hello world';

function b() {
  console.log('Called b!');
}

b();
console.log(a);
```
will output:
```
Called b!
Hello world
```
Consider the following code below that in most programming languages will throw an error:
```javascript
b();
console.log(a);

var = a 'Hello world';

function b() {
  console.log('Called b!');
}
```
will output
```
Called b!
undefined
```
Noticed how `b()` was still executed properly while `a` is also available, albeit a different value.

On the creation phase, the javascript engine checks the code and for every variable declaration (eg: `var`) it sets up memory and attaches it on the execution context. The value is then resolved on the execution phase.

```javascript
b();
console.log(a);
var a = 'Hello world';
console.log(a);
function b() {
  console.log('Called b!');
}
```
```
Called b!
undefined
Hello world
```

### Single Threaded and Synchronous
The Javascript language is single threaded which means, command is being ran one at a time (under the hood, the browser maybe not) and synchronous which means, in order. Code is being ran one at a time and in order.

### The Execution Stack
Everytime a function is invocated, a new execution context is created and is placed on top of the execution stack, whichever is on top is the one currently running, once it finishes, it gets popped off the stack.

Which means, each function call gets its own separate and independent execution context, and its own `this`. Note that, the `variable environment` is not the same with `this`.

```javascript
function b() {
  var myVar;
  console.log(myVar);
}

function a() {
  var myVar = 2;
  console.log(myVar);
  b();
}

var myVar = 1;
console.log(myVar);
a();
console.log(myVar);
```
Will give the following result:
```
1
2
undefined
1
```

### The Outer Environment
In every execution context, there's a reference to the outer environment. If a certain variable is not found in the current `variable environment`, Javascript will look for it at the outer environment which refers to the `variable environment` of the one that created it, this does **NOT** refer to the previous execution context on the stack but from it's lexical environment, or the execution environment of where it was written.
```javascript
function b() {
  console.log(myVar);
}

function a() {
  var myVar = 2;
  b();
}

var myVar = 1;
a();
```
The output is:
```
1
```
In this example the outer environment of both `a()` and `b()` is the same, which is the global or root environment.
```javascript
function a() {
  
  function b() {
    console.log(myVar);
  }

  var myVar = 2;
  b();
}

var myVar = 1;
a();
```
Now, in this example `b`'s outer environment is `a`'s, while `a`'s outer environment is the global environment. Hence, the output is:
```
2
```

Also note that in the global scope, the `variable environment` resides in the global (`window`) object. We can't directly access or inspect the `variable environment` of a function's execution context but we can for the root global context because it's attached to the global object. Moreover, in the global execution context `this` === global (`window`) object.

It's a bit confusing but just remember that in the global execution context, we could roughly consider the `variable environment`, `this` and the `outer environment` to be on the same place which is the global `window` object.

##### Let
The block-scoping variable  declaration of Javascript ES6. The variable is only available on it's own block.
```javascript
if (a > b) {
  let c = true;
}
console.log(c);
```
```
undefined
```

### Primitive Types
A type of data that represents a single value. The atomic unit that make up an object.
1. `undefined`
2. `null`
3. Boolean - `true` or `false`
4. Number - a floating-point, there's always some decimals. `123`
5. String - a sequence of characters. `string`
6. Symbol - Introduced in es6.

### Operator
A special function that accepts an argument and returns a value that is just syntactically or written differently. `+`, `-`, `*`, `/`, (and etc) are just functions with special characters that are written in an infix notation instead of postfix are prefix like normal functions. ie: `+(a, b)`

#### Operator precedence
Which operator function gets executed first if there's more than one in the same line of executable code. The higher precedence gets executed first.
```javascript
var a = 3 + 4 * 5; // (4 * 5) first. Pretty basic
```

#### Associativity
When operators have the same precedence, the order from which they get called is the associativity. Left-to-right or right-to-left associativity.

```javascript
var a = 2, b = 3, c = 4;
a = b = c;
console.log(a); // 4
console.log(b); // 4
console.log(c); // 4
```
The `=` operator has *right-to-left* associativity. Here's what actually happened.
```javascript
// eq(a, eq(b, c))
a = b = c
a = (b = c)
a = (4)
```

| Precedence  | Operator Type                 | Associativity | Individual Operator |
| ----------- | ----------------------------- | ------------- | ------------------- |
| 20          | Grouping                      | n/a           | `( … )`             |
| 19          | Member Access                 | left-to-right | …` . `…             |
|             | Computed Member Access        | left-to-right | `…[…]`              |
|             | `new`(with argument list)     | n/a           | `new … (…)`         |
|             | Function call                 | left-to-right | `… (…)`             |
| 18          | `new`(without argument list)  | right-to-left | `new …`             |
| 17          | Postfix Increment             | n/a           | `…++`               |
|             | Postfix Decrement             |               | `…--`               |
| 16          | Logical NOT                   | right-to-left | `!…`                |
|             | Bitwise NOT                   |               | `~…`                |
|             | Unary Plus                    |               | `+…`                |
|             | Unary Negation                |               | `-…`                |
|             | Prefix Increment              |               | `++…`               |
|             | Prefix Decrement              |               | `--…`               |
|             | typeof                        |               | `typeof …`          |
|             | void                          |               | `void …`            |
|             | delete                        |               | `delete …`          |
|             | await                         |               | `await …`           |
| 15          | Exponentiation                | right-to-left | `… ** …`            |
| 14          | Multiplication                | left-to-right | `… * …`             |
|             | Division                      |               | `… / …`             |
|             | Remainder                     |               | `… % …`             |
| 13          | Addition                      | left-to-right | `… + …`             |
|             | Subtraction                   |               | `… - …`             |
| 12          | Bitwise Left Shift            | left-to-right | `… << …`            |
|             | Bitwise Right Shift           |               | `… >> …`            |
|             | Bitwise Unsigned Right Shift  |               | `… >>> …`           |
| 11          | Less Than                     | left-to-right | `… < …`             |
|             | Less Than or Equal            |               | `… <= …`            |
|             | Greater Than                  | left-to-right | `… > …`             |
|             | Greater Than or Equal         |               | `… >= …`            |
| 10          | Equality                      | left-to-right | `… == …`            |
|             | Inequality                    |               | `… != …`            |
|             | Strict Equality               |               | `… === …`           |
|             | Strict Inequality             |               | `… !== …`           |
| 9           | Bitwise AND                   | left-to-right | `… & …`             |
| 8           | Bitwise XOR                   | left-to-right | `… ^ …`             |
| 7           | Bitwise  OR                   | left-to-right | `… | …`             |
| 6           | Logical AND                   | left-to-right | `… && …`            |
| 5           | Logical OR                    | left-to-right | `… || …`            |
| 4           | Conditional                   | right-to-left | `… ? … : …`         |
| 3           | Assignment                    | right-to-left | `… = …`             |
|             |                               |               | `… += …`            |
|             |                               |               | `… -= …`            |
|             |                               |               | `… **= …`           |
|             |                               |               | `… *= … `           |
|             |                               |               | `… /= … `           |
|             |                               |               | `… %= … `           |
|             |                               |               | `… <<= … `          |
|             |                               |               | `… >>= … `          |
|             |                               |               | `… >>>= … `         |
|             |                               |               | `… &= … `           |
|             |                               |               | `… ^= … `           |
|             |                               |               | `… |= … `           |
| 2           | yield                         | right-to-left | `yield …`           |
|             | yield*                        |               | `yield* …`          |
| 1           | Comma / Sequence              | left-to-right | `… , …`             |



#### Type Coercion
Because Javascript is dynamically-typed, it automatically converts or attempts to convert a value from one type to another.

```javascript
var a = 1 + '2'; // '12'
```
The value `1` was coerced into a `String` by the javascript engine.

Here's a more compelling example:

```javascript
1 < 2 < 3 // true
3 < 2 < 1 // true, why??
```
The `<` operator has the same precedence with a *left-to-right* associavity. Which means:
```javascript
3 < 2 < 1
(3 < 2) < 1
false < 1 // false gets coerced into a number = 0
0 < 1
true
```
Which means, the same applies to `1 < 2 < 3`, `false < 3`, `1 < 3`. Type coercion can cause a lot of problems when you don't know what's going on.

##### Equality Comparisons and Sameness
Notice how type coercion can affect equality operators that results to weird behaviors
```javascript
3 == 3            // true
"3" == 3          // true
false == 0        // true
null < 1          // true because null coerces to 0 < 1
null == 0         // false
"" == 0           // true
"" == false       // true
```
Strict equality `===`, it compares two values but doesn't try to coerce any of them.
```javascript
3 === 3           // true
"3" === "3"       // true
"3" === 3         // false
```

##### Sameness Comparisons
| x                  |	y                |   ==  |  ===  | Object.is |	
| :----------------- | :---------------- | :---: | :---: | :-------: |
| undefined          | undefined         | true  | true  | true      |
| null               | null              | true  | true  | true      |
| true               | true              | true  | true  | true      |
| false              | false             | true  | true  | true      |
| 'foo'              | 'foo'             | true  | true  | true      |
| 0                  | 0	               | true  | true  | true      |
| +0                 | -0                | true  | true	 | false	   |
| +0                 | 0                 | true	 | true  | true	     |
| -0                 | 0                 | true  | true  | false     |
| 0	                 | false             | true  | false | false     |
| ""                 | false	           | true	 | false | false     |
| ""                 | 0                 | true  | false | false     |
| '0'                | 0                 | true  | false | false     |
| '17'               | 17                | true  | false | false     |
| [1, 2]             | '1,2'             | true  | false | false     |
| new String('foo')	 | 'foo'             | true  | false | false     |
| null               | undefined         | true  | false | false     |
| null               | false             | false | false | false     |
| undefined	         | false             | false | false | false     |
| { foo: 'bar' }     | { foo: 'bar' }    | false | false | false     |
| new String('foo')  | new String('foo') | false | false | false     |
| 0	                 | null              | false | false | false     |
| 0	                 | NaN               | false | false | false     |
| 'foo'	             | NaN               | false | false | false     |
| NaN                | NaN               | false | false | true	     |

##### Existence and Booleans
Javascript coerces `undefined`, `null`, `""` to `false`. Hence, we could write simple `if` conditions like this:
```javascript
var a;
// goes to internet to check some value
if (a) { // if it exists
  console.log('Something is there');
}
```
One caveat though, `0` coerces to `false` as well, hence if in the above code `a` was `0`, the behavior is not valid anymore. That's why people often do something like this:
```javascript
if (a || a === 0) {
  console.log('Somethign is there');
}
```
Just never check existence in this way if you expect the value could be `0`.

##### Default Values
Using type coercion and operator precedence, there's a common trick being used to create default values.

```javascript
function greet(name) {
  name = name || '<Your name here>';
  console.log('Hello ' + name);
}
greet();
greet('Feynman');
```

This works because `||` operator doesn't just return `true` or `false` but it actually returns the value that can be coerced to `true`.
```javascript
undefined || 'hello'    // hello
null || 4               // 0
```
In es6, there's a different way of assigning default value but this trick is still common and could be used not just in function parameters.

```javascript
function greet(name='Your name here') {
  console.log('Hello ' + name);
}
```

### Objects
Objects in Javascript is the same as what you expect from other languages. It's a container of primitives and other objects, which can be accessed by `.` or `[]`. The dot `.` operator and the computed member access `[]` have the same precedence and associativity.

```javascript
var person = new Object();
person['firstname'] = 'Sherlock';
person['lastname'] = 'Holmes';

var firstNameProperty = 'firstname';

console.log(person);
console.log(person[firstNameProperty]);

console.log(person['lastname']);
console.log(person.firstname);

person.address = new Object();
person.address.street = '221B Baker Street';
person.address.city = 'London';
person.address.country = 'United Kingdom';

console.log(person.address.street);
console.log(person['address']['city']);
console.log(person.address['country']);

// via object literal
var sherlock = {
  firstname: 'Sherlock',
  lastname: 'Holmes',
  address: {
    street: '221B Baker Street',
    city: 'London',
    country: 'United Kingdom'
  };
};


function greet(person) {
  console.log('Hi ' + person.firstname);
}

greet(sherlock);
greet({
  firstname: 'John',
  lastname: 'Watson'
});

```

### Functions
In Javascript, everything is either an object or a primitive. Functions are treated like usual objects as well, they could be assigned to variables, passed around, or created on the fly. Javascript functions are first-class functions.

Think of functions as special type of object that can have properties but functions also has an invocable special property called `code` and a string property called `name`.

```javascript
function greet() {
  console.log('hi');
}

greet.language = 'english';
greet.hey = function () {
  console.log('hey');
}

console.log(greet.language);
console.log(greet.hey());
```

#### Function Statement
A **Statement** is a unit of code that when executed doesn't result in a value.
```javascript

if (true == true) { // this is an if statement

}

// function statement, it will be executed 
// and created a spot in memory for greet
function greet() {
  console.log('hi');
}

greet();
```

#### Function Expression

An **Expression** is a unit of code that results in a value. `a = 1` is an expression, so is `x || 2`.

```javascript
// This is a function expression
// This will return a function.
function() {
  console.log('hi');
}

// That's why we could do this:
var greet = function() {
  console.log('hi');
}
// essentially the same with:
var greet = function greetMe() {
  console.log('hi');
}
// But since greetMe will just be reassigned to greet, it's optional.
```
Consider the following code, taking into account what we've learned about **hoisting**.
```javascript
greet(); // called and then defined.
function greet() {
  console.log('greet');
}

newGreet();
var newGreet = function() {
  console.log('hello');
}
```
`newGreet()` will throw an error. `newGreet` is a value, and in creation phase, it will be assigned to `undefined` when the memory space was set up for it. The value is function but it will be resolved when that line was executed.

Moreover, since functions are also treated as an object we could create one on the fly and pass it as an argument to other functions.
```javascript
function invoker(a) {
  a();
}

function invoker(function(){
  console.log('sup?');
});
```
##### Passing by Value and by Reference
In Javascript when a primitive value is reassigned or passed to a function as an argument, the copy of the said value is created to be used inside the function - this called *pass by value*. But when an object is reassigned or passed as an argument, what is being used is the actual reference to the object, not a copy. Which means, changing the value of object within the function will also change the original value - this called *pass by reference*.

```javascript
// by value
var a = 2;
var b = a;
b = 3;

console.log(a);   // 2
console.log(b);   // 3

// by reference
var c = { greeting: 'hi' };
var d = c;

c.greeting = 'hello';

console.log(c.greeting);    // 'hello'
console.log(d.greeting);    // 'hello'

```
Note that an assignment `=` operator also creates a new memory space, a different memory address for the said value. Hence the following code behaves as follows:
```javascript
var c = { greeting: 'hi' };
var d = c;

c = { greeting: 'hello' };
console.log(d.greeting);    // hi
console.log(c.greeting);    // hello
```

#### The `this` keyword
We've learned that when a function is invoked, a new execution context is created and put on top of the stack. The execution context has it's own `variable environment`, `outer environment` and `this`.

`this` is an object that points to a different thing depending on where it was called. In other words, `this` is dynamically bound.

```javascript

function a() {
  console.log(this);
  this.greet = 'hello';
}

var b = function() {
  console.log(this);
}

// console.log(greet) // will throw an error, not yet defined
console.log(this);
a();                  // points to the global object
b();                  // points to the global object
console.log(greet);   // 'hello'

var c = {
  name: 'The c object',
  log: function() {
    this.name = 'updated c object';
    console.log(this);    // no longer points to the global object
  }
}

c.log();          // { name: 'updated c object', log: function }
```
This will make total sense if you have something like this:
```javascript
var sayMyName = function() {
  console.log('Hello there, ' + this.name);
}

var holmes = {
  name: 'Sherlock',
  greet: sayMyName
}

var watson = {
  name: 'John',
  greet: sayMyName
}

holmes.greet();     // 'Hello there, Sherlock'
watson.greet();     // 'Hello there, John'

```
The `this.a` in `sayMayName` refers to the particular object it's attached to on the time it was called. Always remember, `this` always refers to an object. But now consider the following:
```javascript
var d = {
  name: '',
  fun: function () {
    this.name = 'Holmes'

    var setName = function(newName) {
      this.name = newName;
    }
    setName('Watson');
  }
}

d.fun();
console.log(d.name);    // Holmes
console.log(name);      // Watson
```

What happened? When `setName` was called inside `d.fun`, the `this` operator is now pointing to the global object. The object that `this` was referring to was lost and defaulted back to the global object.

To understand this, remember that `this` is always bound to the object that called it. `d.fun()`, `fun`'s `this` is bound to `d`, but right before `fun()` finished executing, `setName()` was invoked but isn't bound to any object (it was invoked by `fun`, but `fun` is not an object), hence it got thrown off to the global object.

A common solution for solving this problem is usually done by exploiting the concept of how the execution context behaves when it can't find a certain variable, it goes out to the outer environment that points to its parent lexical context until it finds it.
```javascript
var e = {
  name: '',
  fun: function () {
    var self = this
    self.name = 'Holmes'

    var setName = function(newName) {
      self.name = newName;
    }
    setName('Watson');
  }
}

e.fun();
console.log(e.name);    // Watson
// console.log(name);   // Error
```
When `setName` executes, `self` is not present in it's `variable environment`, so it goes to look on the `outer environment` which happens to point to `fun`'s execution context, where it finds `self`. `setName` is written inside `fun` that's why the `outer environment` points to `fun` and not because it's right below `setName`'s execution context on the execution stack.

There are other ways to get around and explicitly bind `this` to certain object by using Javascript's built-in methods, `call()`, `apply()` and `bind()`.

#### `call()`, `apply()` and `bind()`
Whenever a Javascript function is created, each function gets `call()`, `apply()` and `bind()` attached to them by the Javascript engine as properties that we have access to. The `this` keyword is bound to the object where it was invoked, if there's no such object, the binding is lost and `this` binds to the default binding, which is the `global` object (`undefined` when on _strict mode_). But using said functions we could explicitly bind `this` to whatever object we like.

##### `call()`
Invokes the target function binding the reference to `this` to the given first parameter.
```javascript
var person = {
  name: 'Sherlock Holmes',
  log: function() {
    console.log(this.name);
  }
}

var logFn = person.log;

var person2 = {name: 'John Watson'};
logFn.call(person2);
```
```
John Watson
```

##### `apply()`
With respect to `this` binding, `call(..)` and `apply(..)` are identical. They do behave differently when used with their additional parameters.
```javascript
var sherlock = {
  firstName: 'Sherlock',
  lastName: 'Holmes',
  getFullName: function() {
    return this.firstName + ' ' + this.lastName;
  }
}

var watson = {
  firstName: 'John',
  lastName: 'Watson',
  getFullName: function() {
    return this.firstName + ' ' + this.lastName;
  }
}

var wrappedLog = function (a, b) {
  console.log(this.getFullName())
  console.log(a, b);
  console.log('------');
}
console.log(sherlock.getFullName());
console.log('------');
wrappedLog.call(watson, 'arg1', 'arg2');
// wrappedLog.apply(watson, 'arg1', 'arg2');    // will throw an error
wrappedLog.apply(watson, ['arg1', 'arg2']);
```
```
Sherlock Holmes
------
John Watson
arg1 arg2
------
John Watson
arg1 arg2
------
```

`apply()` just unrolls its array arguments and provide it as the `targetFn`'s arguments. It doesn't seem useful at first glance but it's very convenient if you are doing some array manipulations and you want the result to be used as arguments for a generic target function.

```javascript
function someFrameworkTask = function(targetFn, targetOb, arrArgs) {
  // Do some work on arrArgs
  arrArgs.push(...);
  arrArgs.splice(...);
  // targetFn.call(targetOb, arr[0], arr[1], ...arr[2]);     // we have to know how many arguments targetFn has beforehand
  targetFn.apply(targetOb, arr);
}
```

Explicit binding is cool but what if we wanted a certain function to be permanently bound to a specific `this` without worrying that it could be modified someplace else.
```javascript
var sherlock = {
  firstName: 'Sherlock',
  lastName: 'Holmes',
  getFullName: function() {
    return this.firstName + ' ' + this.lastName;
  }
}

var watson = {
  firstName: 'John',
  lastName: 'Watson',
  getFullName: function() {
    return this.firstName + ' ' + this.lastName;
  }
}

var logName = function() {
  console.log(this.getFullName());
}

var hardbound = function() {
  logName.call(sherlock);
}

hardbound();
hardbound.call(watson);
hardbound.apply(watson);
```
```
Sherlock Holmes
Sherlock Holmes
Sherlock Holmes
```
We created a `hardbound` variable whose value is just a function that wraps a `call` invocation, explicitly binding it to `sherlock`. When `hardbound()` is invoked, it's the same as calling `call(sherlock)`, but this wrapping mechanism that we have implemented has made the binding permanent. Invoking `hardbound.call(watson)` would only bind `this` to the anonymous wrapper function that will just be ignored when `logName.call(sherlock)` is invoked.

This hard binding is so common that it was also provided by the Javascript engine called `bind()`. Of course its implementation is far more robust and less error prone than ours.


##### `bind()`
`bind()` on the other hand, takes an object as a parameter and then returns a new function where `this` is hard bound to the said object.
```javascript
var sherlock = {
  name: 'Sherlock Holmes',
  log: function() {
    console.log(this.name);
  }
}

var watson = { name: 'John Watson'};

var logName = sherlock.log.bind(watson);

logName();
logName.bind(sherlock)();
```
```
John Watson
John Watson
```

Note that it's still possible to change this binding if we used the keyword `new` that we'll explore in a different chapter.

##### Function Currying
Passing parameters to `bind()` does something interesting, it gave us the ability to curry. Currying is creating a copy of a function with some preset parameter values or partial application of parameters.
```javascript
function power(base, exponent) {
  return base ** exponent;
}

var square = power.bind(this, 2);

square(2);    // 4
square(5);    // 32
```
In this example, we're not after the `this` binding so we could just bind it to the global object, we're not using it anyway. We're more interested on how we can use currying if we pass more arguments to `bind`. Passing `2` on `power.bind(this, 2)` would make `square` a `power()` function that have it's `base` parameter permanently set to the value `2`. We say that `square` is a `power()` function whose arguments are partially applied.

Supplying more parameters to bind would just fill the arguments of the target function.

```javascript
var four = power.bind(this, 2, 2);
four(5);      // 4. 5 will be passed as the 3rd parameter that we're just ignoring.
```

Currying, is widely used in Functional style of programming. We could also create the same behavior by exploiting closures that will be discussed in the next sections.

##### Function Overloading
Javascript has no function overloading capabilities because functions are treated as objects, unlike in other languages. Javascript doesn't care about the number of parameters, it just care about the name of the function you're trying to invoke. If your function expect 2 parameters but you only pass 1 argument, the second parameter will be `undefined`. Likewise, if you expect 2 parameters and you pass 3 arguments, you'll just have no straightforward way to access the third parameter (unless you access the built-in `arguments` property a functions have).  It's still possible to convey a somewhat cleaner overloading concept by utilizing default parameters:

```javascript
function greet(firstName, greeting = "Hi", question="How are you?") {
  return `${greeting} ${firstName}!  ${question}`;
}

greet('John');                  // "Hi John! How are you?
greet('John', 'Hey');           // "Hey John! How are you?"
greet('John', 'Hey', 'Sup?');   // "Hey John! Sup?"
```

#### Immediately-Invoked Function Expressions (IIFE)
An anonymous function expression that was being immediately invoked upon load.
```javascript
function greet(name) { // Function statement
  console.log('Hello ' + name);
};

var greetFun = function(name) { // Function expression
  console.log('Hello ' + name);
};

var greeting = function(name) { // Immediately-invoked function expression
  return 'Hello ' + name;
}('John');

console.log(greeting); // 'Hello John' - Holds the result of the IIFE

// function(name) {                   // Will throw an error
//   console.log('Hello ' + name);    // Syntax parser expects
// }                                  // a function name

(function(name){
  console.log('Hi ' + name);
}('John'));
```
IIFE's are widely used among javascript frameworks and libraries for initialization while managing namespace collisions.
```javascript
// defined in someplace else ie: foo.js
var greeting = 'Hola';      // Bound to global

// somewhere in another file ie: greet.js
(function() {
  var greeting = 'Hello';
  console.log(greeting);
}());
console.log(greeting);
```
```
Hello
Hola
```

#### Function Constructors with `new`
Functions that are used to construct objects together with `new` operator. These functions are normal functions but when `new` is applied to them, Javascript engine does something different, it creates an empty `this` object and returns it.
```javascript
function Foo() {
  this.hello = 'hey';
}

var f = new Foo();
console.log(f);
```
```
f {
  hello: 'hey'
}
```
But still, don't forget that these are still normal functions. When invoked without `new`, `this` would refer to the global object like what we've learned. That's why it's a convention that any function intended to use as function constructors should always start with capital letters.
```javascript
function Foo(){
  console.log(this);
}
Foo();
new Foo();
var f = Foo();
console.log(f); // undefine because Foo() was invoked as a function
```
```
Window {...}
Foo {}
undefined
```
That being said, when creating objects using `new` don't return anything on the function constructor or it will mess up the javascript engine's decision making.
```javascript
function Foo(greeting) {
  this.greet = greeting;
  return {
    b: 'azinga'
  }
}

var f = new Foo('hello');
console.log(f);
```
```
{b: 'azinga'}
```

#### Built-in Function Constructors
Some of the most common objects has built-in function constructors shipped together with Javascript. Almost all primitive values has a wrapper object counterparts that includes some added properties and methods.
```javascript
var num = new Number(3.14151629);
num.toFixed(2);

var tesla = new String("Nikola Tesla");
tesla.toLowerCase();
```
Just a word of caution, be careful in using these wrapper objects because it can cause bugs specially when it comes to comparisons where coercion is taking place.
```javascript
var meaningOfLife = 42;
var is42 = new Number(42);

console.log(meaningOfLife == is42);   // true
console.log(meaningOfLife === is42);  // false
```

#### Determining `this`
We've seen how `bind`, `call` and `apply` work but what happens when `new` is applied into the mix? 
```javascript
var og = {
  greet: 'hello'
}

function foo() {
  console.log(this.greet);
}

var hi = {
  greet: 'hi'
}

var hardbound = foo.bind(hi);

hardbound();
hardbound.call(og);
new foo();
new hardbound();
```
```
hi
hi
undefined
undefined
```
In this example, we see that `new` overrides what `this` refers to explicitly bound by `bind`. It always creates a new empty object, that's why `undefined` was always the result.

In summary, the order of precedence to determine the `this` binding would be the following, the first rule that applies would be the `this` binding:

1. `new` binding - the newly created object.
2. Explicit binding (`call`, `apply` or `bind`) - whatever the explicit object was
3. Implicit binding - the owning or containing object from which the function was called.
4. Default binding - if none of the above it falls back to the global object, (or `undefined` on `strict-mode`)


### Closures
The ability to treat functions as values, brings up an interesting question. What happens to the functions' local variables when the said function has finished executing and was already popped off the execution stack?
```javascript
function greet(greeting) {
  return function(name) {
    console.log(greeting + ' ' + name);
  }
}

var sayHi = greet('Hi');
var sayHello = greet('Hello');
sayHi('Holmes');
sayHello('Watson');
greet('Sup')('Morty');
```
```
Hi Holmes
Hello Watson
Sup Morty
```
Remember that each function can access its outer environment whenever it wasn't able to look for a certain variable in its own environment? Not only that, functions in Javascript also maintains a reference to its outer environment even though said environment has already finished executing.

In the example above, `sayHi` is a reference to a function where `'Hi'` was passed as an argument to the parameter, said function returns yet another function where said parameter is being used in addition to the latter functions' own parameter.

When `sayHi('Holmes')` was invoked, it will execute `console.log(greeting + ' ' + name);`, it knows what the variable `name` is but `greeting` is not present in its own execution environment. It then goes out to its outer environment which is the place where it was written and looks for `greeting` variable. Javascript knows that said function was created inside `greet()`, eventhough it has already been popped off the stack, it's variable environment still persists which will be picked up by the `sayHi` invocation.

This feature &mdash; being able to still reference the variable environment of an enclosing scope, albeit said execution environment has already been executed &mdash; is called **closure**. A function that reference variables from it's outer environment is called *a closure*.

Closures can result to interesting behaviors such as:
```javascript
function buildFunctions() {
  const arr = [];
  for (var i = 0; i < 3; i++) {
    arr.push(function() {
      console.log(i);
    });
  }
  return arr;
}

const fs = buildFunctions();
fs[0]();
fs[1]();
fs[2]();
```
The result is partly alarming at first sight. We might think that the output would be something like:
```
// Did you expect?
0
1
2
```
But instead, when we run this code we would get:
```
// Actual result:
3
3
3
```
Why? The value that's being pushed in `arr` is a function that accesses the variable `i`. We know that functions doesn't get evaluated until invocation. Only when `fs[0]()` is run that it looks for `i` and has to go to its outer environment to resolve the value. But `buildFunctions()` has already been executed when we assigned the resulting array to `fs`. `buildFunctions`'s variable environment still persists but `var i`'s value has already been incremented to `3` when it finished running. Hence, when we try to reference it on our `fs[n]()` calls, what we get is the current state of the enclosing variable environment of `buildFunctions`.

We could around this by using es6's `let` variable declaration to let Javascript know that we're interested only on the block level scope value of `i`:
```javascript
function buildFunctions() {
  const arr = [];
  for (let i = 0; i < 3; i++) {
    arr.push(function() {
      console.log(i);
    });
  }
  return arr;
}
```

Or by adding what we know from IIFEs and exploiting it, we could come up with something like:
```javascript
function buildFunctions() {
  const arr = [];
  for (var i = 0; i < 3; i++) {
    arr.push(
      (function(j){
        return function() {
          console.log(j);
        }
      }(i));
    );
  }
  return arr;
}

var fs = buildFunctions();
```
This code is confusing and would be frowned upon when used in the real world but it does perfectly demonstrates what we've learned about Javascript's Closures, IIFEs and scope chains. `arr` will contain a value that is, still a function but that function is a result of an immediately-invoked function that encapsulates `i` as `j`.

Now, when we invoked `fs[0]();`, `console.log(j)` will be executed, it will look for the variable `j` but since it wasn't in its own variable environment, it will then find it as the parameter of the enclosing IIFE which was in turn a copy of the value of the parameter `i` of the enclosing function. Remember that objects are pass by reference and primitives are pass by values? The value of `j` is whatever the value of `i` at the time of its execution, subsequent changes to `i` will not affect `j`.

Going back to the original example, if it isn't a function and we immediately used the value of `i` like `arr.push(i)`, it would be a different scenario. But since it's a function along with the behavior of closures we are somehow able to retain the state of `buildFunctions`. This behavior is further demonstrated by the code below:
```javascript
function saveState() {
  const arr = [];
  return function(n) {
    arr.push(n);
    return arr;
  };
}

const myState = saveState();

console.log(myState(1));
console.log(myState('Yo'));
const test = myState('test');
console.log(myState(100));
// ... some other code here
console.log(test);
console.log(myState('7'));
```
```
[1]
[1, "Yo"]
[1, "Yo", "test", 100]
[1, "Yo", "test", 100]
[1, "Yo", "test", 100, "7"]
```

##### Function Factories
Using closures we could come up with interesting patterns like the commonly used function factory below:
```javascript
function makeGreeting(language) {
  return function(firstName, lastName) {
    if (language === 'en') {
      console.log(`Hello ${firstName} ${lastName}`);
    }
    if (language === 'es') {
      console.log(`Hola ${firstName} ${lastName}`);
    }
  }
}

var greetEnglish = makeGreeting('en');
var greetSpanish = makeGreeting('es');

greetEnglish('John', 'Doe');        // Hello John Doe
greetSpanish('John', 'Doe');        // Hola John Doe
```

##### Currying using Closures
As you might expect, due to the nature of closure we could also create currying functions without relying on `bind`
```javascript
var power = function(base) {
  return function(exponent) {
    return base ** exponent;
  }
}

var square = power(2);
square(5);    // 32
```
Or, using ES6's arrow functions we could create an arguable concise version albeit slightly confusing if we're not aware of what's actually happenning.
```javascript
let power = (base) => (exponent) => base ** exponent;
let square = power(2);
let cube = power(3);

square(5);    // 32
cube(4);      // 81
```

### Functional Programming
Using our knowledge in Closures, Functions and how Javascript treats it as first-class functions, we could now peform a certain style of programming that involves function manipulations like the following:
```javascript
var mapForEach = function(arr, work) {
  const newArr = [];
  for (var i=0; i < arr.length; i++) {
    newArr.push(work(arr[i]));
  };
  return newArr;
}

var list = [1, 2, 3];

var doubled = mapForEach(list, function(eachElem) {
  return eachElem * 2;
});
console.log(doubled);     // [2, 4, 6]
```
We created a function `mapForEach` that accepts an array and applies some `work()` on each element and then returns the new array, this sort of thing enables us to transform an array that is very generic &mdash; something that we could use in different scenarios.
```javascript
var isUnderAge = function(age) {
  return age < 18;
}

var areAllUnderage = mapForEach(list, isUnderAge);
console.log(areAllUnderAge);
```
Using closures and currying we could make the code above something more interesting.
```javascript
// Currying using bind
var checkPastLimitViaBind = function(limit) {
  return function(limiter, element) {
    return element > limter;
  }.bind(this, limit);
}

// Or we could use just plain closures
var checkPastLimit = function(limit) {
  return function(element) {
    return element > limit;
  }
}

var isAdult = checkPastLimit(18); // equal to checkPastLimitViaBind(18)
console.log(list, isAdult);
```
Building up on the above examples, we could demonstrate the power of using small, independent and granular functions to do more interesting things:
```javascript
function filterArray(arr, predicate) {
  var newArr = [];
  for(var i = 0; i < arr.length; i++) {
    if(predicate(arr[i])) {
      newArr.push(arr[i]);
    }
  }
}

var population = [15, 20, 23, 25, 16, 14, 10, 18];
var adults = filterArray(population, isAdult);
console.log(adults);

var me = {
  name: 'John Smith',
  age: 18
}

console.log(isAdult(me.age));
```
```
[20, 23, 25, 18]
true
```
Note that in ES6, `map`, `filter` and other functional utilities are available in arrays by default. There's also a good Javascript library called `lodash` that provides us with a lot of functional helpers.

## The Prototype
The Javascript engine always attaches a *prototype* whenever an object gets created. A prototype is used as the fallback source of properties. When an object gets a request for a property that it does not have, its prototype will be searched for the said property. When we create a `string` for example:
```javascript
var myString = "The quick brown fox jumps over the lazy dog";
```
After being processed by the Javascript engine, `myString` will have several properties and methods available for us that we didn't code, these methods are coming from the String prototype. We could take a look at the prototype by accessing the `__proto__` property. Or by invoking `Object.getPrototypeOf()`.
```javascript
myString.__proto__;
Object.getPrototypeOf(myString);

```
Think of the prototype as the original blueprint that describes a certain object. Note that two object can each have a prototype that refers to the same protoype object.
```javascript
Object.getPrototypeOf("new String") === Object.getPrototypeOf(myString)
```

### Prototypical Inheritance
The prototype is also an object and thus it also have a prototype. This is how the concept of inheritance is being achieved by Javascript. Instead of the conventional classes, Javascript objects are composition of various prototypes that will ultimately define the said object's behavior.
When a property is not found on the object, it will search its prototype and if not found, it will look on the prototype's prototype and so on, further down the *prototype chain* until it eventually finds the said property.

To demonstrate this, let's manually modify an object's prototype. Note that this is for demonstration purposes only and should never be done in actual development or you might mess up the background decision making of the Javascript engine as it runs your code.
```javascript
var human = {
  firstName: 'Default',
  lastName: 'Default'
  getFullName: function() {
    return this.firstName + ' ' + this.lastName;
  }
}

var watson = {
  firstName: 'John',
  lastName: 'Watson'
}


// Demo purposes only, let's reassign the prototype object
watson.__proto__ = human

console.log(watson.getFullName());
console.log(watson.firstName);

var nameless = {}
nameless.__proto__ = human
console.log(nameless.getFullName());
```
```
John Watson
John
Default Default
```
The first `console.log` references `getFullName` which the object `watson` doesn't have, the Javascript engine then goes in the prototype object which we have set to `human` and finds it there thus printing `John Watson`.
The second `console.log` on the other hand references `firstName` which `watson` already have that's why the Javascript engine doesn't search further down the prototype chain.

If we go further down to the root of the prototype chain of any object we'll discover that everything originates from the `Object` prototype.
```javascript
var str = "";
var arr = [];
var fun = function() {};
var ob = {};

console.log(str.__proto__.__proto__ === arr.__proto__.__proto__ === fun.__proto__.__proto__ === ob.__proto__);
console.log(ob.__proto__.__proto__);
```
```
true
null
```

### Reflection
A javascript object can look at itself, extend its by behavior and functionality by adding and/or modifying its own property and methods.
```javascript
var base = {
  a: 'a',
  b: 'b',
  c: 'c'
};

var z = {
  a: 'x',
  b: 'y'
}

z.__proto__ = base;

for (var prop in z) {
  if (z.hasOwnProperty(prop)) {
    console.log(z[prop]);
  }
}
```
> word of caution, don't use `for`..`in` when iterating array values, because you could also iterate through the properties of the Array object itself as well, not just the elements.
```
x
y
```
The example below is a contrived version of the inner workings of the lodash's `extend` function. `createArray()` and `lib` is actually not necessary but important to demonstrate how javascript libraries exploit functional programming to implement interesting stuff like this. `createAssigner` takes some sort of utility function, in this case a function that determines all existing props in an object, then returns another function that takes an `obj` parameter where the `getKeysFunc` will be used against. `lib` is now an object where all utility functions like `extend` exists by composing and chaining utility functions like `createAssigner`. Also notice that the resulting return function of `createAssigner` only takes one parameter but when we use `lib.extend` we passed 3 arguments. If this were any other language this wouldn't be possible but since Javascript doesn't care about parameter length, and all it cares about is the function name, it's possible to not define all parameters. After all, we can still access them via `arguments`.
```javascript
function createAssigner(getKeysFunc)
  return function(obj) {
    var length = arguments.length;
    if (length < 2 || obj == null) {
      return obj;
    }

    for (var i = 1; i < length; i++) {
      var source = arguments[i];
      var keys = getKeysFunc(source);
      for (var j = 0; j < keys.length; j++) {
        var key = keys[j];
        obj[key] = source[key];
      }
    }
  }
}

var lib = {
  extend: createAssigner(Object.keys);
}

var ob1 = {
  a: 'a',
  b: 'b'
  c: 'c'
}

var ob2 = {
  m: 'm',
  n: 'n',
  o: 'o'
}

var ob3 = {
  x: 'x',
  y: 'y',
  z: 'z'
}

lib.extend(ob1, ob2, obj3);
for (var key in ob1) {
  console.log(obj1[key]);
}
```
```
a
b
c
m
n
o
x
y
z
```
`ob1` extended its behavior by adding all properties and methods coming from `ob2` and `ob3`. And we did that dynamically at run-time.

#### Function Constructor's `.prototype`
In every javascript function there's a `.prototype` property **NOT** to be confused with `.__proto__` property. The latter is the fallback source of any object, or the source template, like what we've discussed before. On the other hand, `.prototype` is being set and used when a function is used as a function constructor upon using the `new` operator.
```javascript
function Person(name) {
  this.name = name;
}

function foo() {}

var holmes = new Person('holmes');
var watson = new Person('watson');

console.log(Person.__proto__ === foo.__proto__);
console.log(holmes.__proto__ === Person.prototype === watson.__proto__);
```
```
true
true
```
Does it make sense? `Person` itself is a function that's why its and `foo`'s `__proto__` refer to the same thing. But then `holmes` and `watson`'s `__proto__` points to `Person.prototype` because they were created with `new`. Hence, `.prototype` of a function a is a special property that points to the object that will be the `__proto__` of all the objects that will be created out of it via `new`.

#### Extending via `.prototype`
Using `.prototype` we can now extend all the objects behavior by adding or modifying it.
```javascript
function Person(firstname, lastname) {
  this.firstname = firstname;
  this.lastname = lastname;
}

Person.prototype.getFullName = function() {
  return this.firstName + ' ' + this.lastName;
}

var sherlock = new Person('Sherlock', 'Holmes');
var watson = new Person('John', 'Watson');


console.log(sherlock.getFullName());
console.log(watson.getFullName());
```
```
Sherlock Holmes
John Watson
```

### Pure Prototypal Inheritance with `Object.create`
Another way of creating objects without relying on `new` operator. Using `Object.create` is considered as the pure prototypal inheritance because it really just assigns the target object as the prototype, nothing more and nothing less. Note that `Object.create` may not be present in older javascript versions.
```javascript
var person = {
  firstname: 'Default',
  lastname: 'Default',
  greet: function() {
    return 'Hi ' + this.firstname;
  }
}

var holmes = Object.create(person);
holmes.firstname = 'Sherlock';
holmes.lastname = 'Holmes';
```

### ES6 Classes
ES6 added a better syntax to create objects without using function constructors.
```javascript
class Person {
  constructor(firstname, lastname) {
    this.firstname = firstname;
    this.lastname = lastname;
  }

  greet() {
    return 'Hello ' + this.firstname + ' ' + this.lastname;
  }
}
```
You then use the keyword `extends` to indicate the prototype
```javascript
class InformalPerson extends Person {
  constructor(firstname, lastname) {
    super(firstname, lastname);
  }

  greet() {
    return 'Yo ' + this.firstname;
  }
}
```
Tread carefully though, while it looks like Java classes and other conventional OOP classes, it's very important to remember that these are still just function constructors under the hood and they create objects. Don't try to strictly wrap your head around conventional OOP relationships when using ES6 classes.

##### Figuring out what something is, `typeof` and `instanceof`
Due to the dynamic nature of Javascript we will sometimes find ourselves trying to figure out what the type of the object truly is for some reason or another.

```javascript
var num = 4;
var str = "Hello";
var ob = {};
var arr = [];
var fun = function() {};
console.log(typeof num);                // number
console.log(typeof str);                // string
console.log(typeof ob);                 // object
console.log(typeof arr);                // object
console.log(typeof fun);                // function
console.log(typeof undefined);          // undefined
console.log(typeof null);               // object
console.log(holmes instanceof Person);  // true
```
We can see in the code above how `typeof` and `instanceof` works, and immediately you should pay attention to `arr` and `null`. `null` apparently is also an `object`, and same as arrays. It does make sense since arrays aren't really primitives but a type of an object. In order to determine if an object is an array, we could do something like this:
```javascript
// a little weird, more of a workaround
console.log(Object.prototype.toString.call(arr) === '[object Array]');      // true

// Or, in newer versions of Javascript, we could use:
console.log(arr instanceof Array);  // true
console.log(Array.isArray(arr));    // true
```

### Strict Mode
We've learned that Javascript is a bit liberal or flexible. It's useful but sometimes we want it to be a bit stricter if we use strict mode.
```javascript
var person;
persom = {};            // suppose we accidentally typed a typo
console.log(persom);    // Object {}, person is undefined.
```
If we then do this:
```javascript
"use strict"
var person;
persom = {};          // Will throw an error here.
```
Strict mode could also be applied locally on a function.
```javascript
function funfun() {
  "use strict"
  x = {};
}
var y;
z = {};
console.log(z);
funfun();
```
```
Object {}
Uncaught ReferenceError: x is not defined
```
More details about strict mode could be read over at [MDN docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode).
