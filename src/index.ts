class Range {
  // TODO: add forEach, map, filter ... ?
  // TODO: add basic operations such as equal, includes, add, ... ?
  // TODO: allow for inclusive ranges (similar to Rust)?

  _start: number;
  _stop: number;
  _step: number;

  // Counter used for iteration, so that we can iterate multiple times over
  // the same range
  i: number;

  constructor(start: number, stop: number, step: number = 1) {
    if (start > stop) {
      // TODO: allow reverse ranges?
      throw new Error(`Cannot create a range from ${start} to ${stop}`);
    }

    if (isNaN(Number(start))) {
      throw new Error(`${start} is not a Number`);
    }
    if (isNaN(Number(stop))) {
      throw new Error(`${stop} is not a Number`);
    }
    if (isNaN(Number(step))) {
      throw new Error(`${step} is not a Number`);
    }

    this._start = Number(start);
    this._stop = Number(stop);
    this._step = Number(step);

    // Initialise a counter for iteration
    this.i = Number(start);
  }

  /**
   * Return the first value of a range
   * @returns First value of a range
   */
  first(): number {
    return this._start;
  }

  /**
   * Return the last value of a range
   * @returns Last value of a range
   */
  last(): number {
    return this._stop;
  }

  /**
   * Return the value of the step for the range
   * @returns Value of the step
   */
  step(): number {
    return this._step;
  }

  /**
   * Converts the range into a string
   * @returns String representatin of the range
   */
  toString(): string {
    // TODO: change representation if support for inclusive ranges
    if (this.step() === 1) {
      return `${this.first()}..${this.last()}`;
    }
    return `${this.first()}..${this.last()}{${this.step()}}`;
  }

  /**
   * Converts the range into an array
   * @returns Array representatino of the range
   */
  toArray(): number[] {
    const arr: number[] = [];

    let next = this.next();
    while (!next.done) {
      if (next.value !== undefined) {
        arr.push(next.value);
      }

      next = this.next();
    }

    return arr;
  }

  /**
   * Implement iterator protocol
   */
  next() {
    if (this.i < this.last()) {
      const value = this.i;
      this.i += this.step();
      return { value, done: false };
    }

    // We reset the value once we have iterated over all values so that
    // ranges are reusable.
    this.i = this.first();

    return { value: undefined, done: true };
  }

  /**
   * Implement iterable protocol
   */
  [Symbol.iterator]() {
    return this;
  }
}

/**
 * Function exported to allow for the following API: `range(start, stop, step)`
 * @param start The value at which the range starts (inclusive)
 * @param stop The value at which the range stops (inclusive)
 * @param step The steps between each iteration within the range
 * @returns Range object
 */
function range(start: number, stop: number, step: number = 1): Range {
  return new Range(start, stop, step);
}

export default range;
