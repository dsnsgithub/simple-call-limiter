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

Runs the provided function after ensuring the specified delay. If multiple calls are made within the delay period, they are queued and executed sequentially.

- `fn`: The function to be executed.
- `args`: Arguments to be passed to the function.

Returns a Promise that resolves when the function is executed. If you are using Typescript, the type of the Promise is the output type of function.

## Example

```javascript
import SimpleLimiter from "simple-call-limiter";

// Create a new instance of SimpleLimiter with a delay of 1000 milliseconds
const limiter = new SimpleLimiter(1000);

for (let i = 0; i < 10; i++) {
	limiter.run(console.log, i);
}

// output
// 0 (immediate)
// 1 (after 1 sec)
// 2 (after 2 sec)
// 3 (after 3 sec)
// 4 (after 4 sec)
// 5 (after 5 sec)
// 6 (after 6 sec)
// 7 (after 7 sec)
// 8 (after 8 sec)
// 9 (after 9 sec)
```
