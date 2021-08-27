class Range {
  // TODO: add forEach, map, filter ... ?
  // TODO: add toArray, toString, ... ?
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
  first() {
    return this._start;
  }

  /**
   * Return the last value of a range
   * @returns Last value of a range
   */
  last() {
    return this._stop;
  }

  /**
   * Return the value of the step for the range
   * @returns Value of the step
   */
  step() {
    return this._step;
  }

  /**
   * Implement iterator protocol
   */
  next() {
    if (this.i < this._stop) {
      const value = this.i;
      this.i += this._step;
      return { value, done: false };
    }

    // We reset the value once we have iterated over all values so that
    // ranges are reusable.
    this.i = this._start;

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
