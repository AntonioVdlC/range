# range

[![version](https://img.shields.io/npm/v/@antoniovdlc/range.svg)](http://npm.im/@antoniovdlc/range)
[![issues](https://img.shields.io/github/issues-raw/antoniovdlc/range.svg)](https://github.com/AntonioVdlC/range/issues)
[![downloads](https://img.shields.io/npm/dt/@antoniovdlc/range.svg)](http://npm.im/@antoniovdlc/range)
[![license](https://img.shields.io/npm/l/@antoniovdlc/range.svg)](http://opensource.org/licenses/MIT)

Implement ranges in JavaScript.

## Installation

This package is distributed via npm:

```
npm install @antoniovdlc/range
```

## Motivation

Ranges are natively supported by a few (popular) programming languages. They allow for iteration over a defined space, while not having a linear increase in their memory footprint (all ranges always store a similar amount of data).

## Usage

You can use this library either as an ES module or a CommonJS package:

```js
import range from "@antoniovdlc/range";
```

_- or -_

```js
const range = require("@antoniovdlc/range");
```

To create a range:

```js
const start = 0;
const stop = 10;
const step = 2; // Defaults to `1` if not passed
const inclusive = true; // Defaults to `false` if not passed

const r = range(start, stop, step, inclusive);
```

You can also pass an options object for convenience:

```js
const start = 0;
const stop = 10;
const opts = {
  step: 2, // Defaults to `1` if not passed
  inclusive: true, // Defaults to `false` if not passed
};

const r = range(start, stop, opts);
```

### Getters

You can use the following getters on ranges:

#### .start

Returns the start value of a range:

```js
range(0, 10).start; // 0
```

#### .stop

Returns the stop value of a range:

```js
range(0, 10).stop; // 10
```

#### .step

Returns the step value of a range:

```js
range(0, 10).step; // 1 (by default)
```

#### .isInclusive

Returns `true` if the range is inclusive of its last value:

```js
range(0, 10).isInclusive; // false (by default)
```

#### .first

Returns the first value of a range:

```js
range(0, 10).first; // 0
```

#### .last

Returns the last value of a range:

```js
range(0, 10).last; // 9
range(0, 10, 1, true).last; // 10
```

### Methods

You can use the following methods on ranges:

#### .toString()

Returns a string representation of a range:

```js
range(0, 10).toString(); // 0..10
range(0, 10, 2).toString(); // 0..10{2}
range(0, 10, 2, true).toString(); // 0..=10{2}
```

#### .toArray()

Returns an array representation of a range:

```js
range(0, 10).toArray(); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
range(0, 10, 2).toArray(); // [0, 2, 4, 6, 8]
range(0, 10, 1, true).toArray(); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

> You can also use the follow syntax as `ranges` are iterable:
> `[...range(0, 10)]`

#### .equal(range)

Checks if 2 ranges are equal (same start, stop, and step):

```js
range(0, 10).equal(range(0, 10)); // true
range(0, 10, 2).equal(range(0, 10)); // false
range(0, 10, 2, true).equal(range(0, 10, 2, false)); // false
```

#### .includes(range)

Checks if one range includes another (irrespective of step values):

```js
range(0, 10).includes(range(1, 5)); // true
range(0, 10).includes(range(1, 11)); // false
```

#### .add(range)

Adds ranges together (only if step values are equal):

```js
range(0, 5).add(range(1, 10)); // range(0, 10)
```

#### .forEach(fn)

Iterate over a range and apply `fn` function to every element of the range:

```js
range(0, 10).forEach((i) => console.log(i));
// 0, 1, 2, 3, 4, 5, 6, 7, 8, 9

range(0, 10, 1, true).forEach((i) => console.log(i));
// 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10

range(0, 10, 2).forEach((i) => console.log(i));
// 0, 2, 4, 6, 8
```

#### .forEachAsync(fn)

Iterate over a range and apply `fn` function to every element of the range asynchronously:

```js
await range(0, 10).forEachAsync((i) => console.log(i));
// 0, 1, 2, 3, 4, 5, 6, 7, 8, 9

await range(0, 10, 1, true).forEachAsync((i) => console.log(i));
// 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10

await range(0, 10, 2).forEachAsync((i) => console.log(i));
// 0, 2, 4, 6, 8
```

#### .map(fn)

Map over a range and apply `fn` function to every element of the range:

```js
const result = range(0, 5).map((i) => i ** 2);
// [0, 1, 4, 9, 16]

const result = range(0, 5, 1, true).map((i) => i ** 2);
// [0, 1, 4, 9, 16, 25]

const result = range(0, 10, 2).map((i) => i ** 2);
// [0, 4, 16, 36, 64]
```

#### .mapAsync(fn)

Map over a range and apply `fn` function to every element of the range asynchronously:

```js
const result = await range(0, 5).mapAsync(
  (i) => new Promise((resolve) => resolve(i ** 2))
);
// [0, 1, 4, 9, 16]

const result = await range(0, 5, 1, true).mapAsync(
  (i) => new Promise((resolve) => resolve(i ** 2))
);
// [0, 1, 4, 9, 16, 25]

const result = await range(0, 10, 2).mapAsync(
  (i) => new Promise((resolve) => resolve(i ** 2))
);
//  [0, 4, 16, 36, 64]
```

### Iteration protocols

Ranges implement both the iterable and the iterator protocols. This allows iteration over ranges as follow:

```js
for (let i of range(0, 10)) {
  console.log(i);
}
// 0, 1, 2, 3, 4, 5, 6, 7, 8, 9

for (let i of range(0, 10, 1, true)) {
  console.log(i);
}
// 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10

for (let i of range(0, 10, 2)) {
  console.log(i);
}
// 0, 2, 4, 6, 8
```

```js
const r = range(0, 10);
console.log(r.next()); // { value: 0, done: false }
console.log(r.next()); // { value: 1, done: false }
console.log(r.next()); // { value: 2, done: false }
...
console.log(r.next()); // { value: 8, done: false }
console.log(r.next()); // { value: 9, done: false }
console.log(r.next()); // { value: undefined, done: true }
```

> Note that ranges are not consumed after a single iteration. They can be reused in consecutive iterations!

## License

MIT
