# Simple Call Limiter

A simple function rate limiter that delays execution of functions based on a specified delay.

## Installation

You can install [simple-call-limiter](https://www.npmjs.com/package/simple-call-limiter) via npm:

```bash
npm install simple-call-limiter
```

## API

### SimpleLimiter(delayMs: number)

Creates a new instance of SimpleDelay with the specified delay in milliseconds.

- `delayMs`: The delay in milliseconds between function calls.

### run(fn, ...args)

Runs the provided function (with arguments) after ensuring the specified delay. If multiple calls are made within the delay period, they are queued and executed sequentially.

- `fn`: The function to be executed.
- `args`: Arguments to be passed to the function.

Returns a Promise that resolves when the function is executed. If you are using Typescript, the arguments are checked and the output is a promise with the output type of the function.

## Typescript Example

```typescript
import SimpleLimiter from "simple-call-limiter";

// Create a new instance of SimpleLimiter with a delay of 1000 milliseconds
const limiter = new SimpleLimiter(1000);

for (let i = 0; i < 5; i++) {
	limiter.run(console.log, i);
}

// output
// 0 (immediate)
// 1 (after 1 sec)
// 2 (after 2 sec)
// 3 (after 3 sec)
// 4 (after 4 sec)
```

## JavaScript Example
```javascript
const SimpleLimiter = require('simple-call-limiter').default;

// Create a new instance of SimpleLimiter with a delay of 1000 milliseconds
const limiter = new SimpleLimiter(1000);

for (let i = 0; i < 5; i++) {
	limiter.run(console.log, i);
}
```

## Typescript Promise Example
```typescript
import SimpleLimiter from "simple-call-limiter";

// Create a new instance of SimpleLimiter with a delay of 1000 milliseconds
const limiter = new SimpleLimiter(1000);

async function asyncTest(item: string) {
	return item;
}

async function run() {
	for (let i = 0; i < 5; i++) {
		const result = await limiter.run(asyncTest, "testing");
		const result2 = await limiter.run(asyncTest) //! this will be flagged since asyncTest takes an argument and none is given.

		console.log(typeof result); // type information is kept (string)
		console.log(result);
	}
}

run();
```
