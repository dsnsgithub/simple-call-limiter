/**
 * A simple function rate limiter that delays execution of functions based on a specified delay.
 */
export default class SimpleLimiter {
	/**
	 * Queue to hold functions and their arguments to be executed.
	 */
	queue: {
		fn: Function;
		args: any[];
	}[];

	/**
	 * Timestamp of the last function call.
	 */
	lastCallTime: number;

	/**
	 * Delay in milliseconds between function calls.
	 */
	delayMs: number;

	/**
	 * Creates an instance of RateLimit.
	 * @param {number} delayMs - The delay in milliseconds between function calls.
	 */
	constructor(delayMs: number) {
		this.queue = [];
		this.lastCallTime = 0;
		this.delayMs = delayMs;
	}

	/**
	 * Runs the provided function after ensuring the specified delay.
	 * If multiple calls are made within the delay period, they are queued and executed sequentially.
	 * @template T
	 * @param {(...args: any[]) => T} fn - The function to be executed.
	 * @param {...any[]} args - Arguments to be passed to the function.
	 * @returns {Promise<T>} A Promise that resolves when the function is executed.
	 */
	run<T, Args extends any[]>(fn: (...args: Args) => T, ...args: Args): Promise<T> {
		return new Promise<T>((resolve) => {
			const currentTime = new Date().getTime();
			const timeSinceLastCall = currentTime - this.lastCallTime;

			const executeFunction = () => {
				this.lastCallTime = new Date().getTime();
				resolve(fn(...args));
			};

			if (timeSinceLastCall >= this.delayMs) {
				executeFunction();
			} else {
				this.queue.push({ fn, args });

				setTimeout(() => {
					if (this.queue.length > 0) {
						const call = this.queue.shift();

						if (call) {
							executeFunction();
						}
					}
				}, this.delayMs * this.queue.length - timeSinceLastCall);
			}
		});
	}
}
