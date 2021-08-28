class Range {
  // TODO: add .forEach()?
  // TODO: add .first, .last, .middle, ... ?

  _start: number;
  _stop: number;
  _step: number;
  _inclusive: boolean;

  // Counter used for iteration, so that we can iterate multiple times over
  // the same range
  i: number;

  constructor(
    start: number,
    stop: number,
    step: number = 1,
    inclusive: boolean = false
  ) {
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
    this._inclusive = Boolean(inclusive);

    // Initialise a counter for iteration
    this.i = Number(start);
  }

  /**
   * Return the start value of a range
   * @returns Start value of a range
   */
  get start(): number {
    return this._start;
  }

  /**
   * Return the stop value of a range
   * @returns Stop value of a range
   */
  get stop(): number {
    return this._stop;
  }

  /**
   * Return the value of the step for the range
   * @returns Value of the step
   */
  get step(): number {
    return this._step;
  }

  /**
   * Return `true` if range is inclusive of last value
   * @returns Value of inclusive flag
   */
  get isInclusive(): boolean {
    return this._inclusive;
  }

  /**
   * Return the first value of a range
   * @returns First value of a range
   */
  get first(): number {
    return this._start;
  }

  /**
   * Return the last value of a range
   * @returns Last value of a range
   */
  get last(): number {
    if (this.isInclusive) {
      return this._stop;
    }

    return this._stop - 1;
  }

  /**
   * Converts the range into a string
   * @returns String representatin of the range
   */
  toString(): string {
    if (this.step === 1) {
      return `${this.start}..${this.isInclusive ? "=" : ""}${this.stop}`;
    }
    return `${this.start}..${this.isInclusive ? "=" : ""}${this.stop}{${
      this.step
    }}`;
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
   * Checks if 2 ranges are equal (same start, stop and step)
   * @param range Range to compare to
   * @returns `true` if ranges are equal, `false` otherwise
   */
  equal(range: Range): boolean {
    return (
      this.start === range.start &&
      this.stop === range.stop &&
      this.step === range.step &&
      this.isInclusive === range.isInclusive
    );
  }

  /**
   * Checks if a range includes another
   * @param range Range to compare to
   * @returns `true` if given range is included in current range,
   * `false` otherwise (regardless of step)
   */
  includes(range: Range): boolean {
    if (
      this.start <= range.start &&
      this.stop >= range.stop &&
      this.isInclusive === range.isInclusive
    ) {
      return true;
    }

    if (
      range.isInclusive &&
      this.start <= range.start &&
      this.stop >= range.stop + 1
    ) {
      return true;
    }

    return false;
  }

  /**
   * Adds 2 ranges together
   * ex: range(0, 5).add(range(1, 10)) = range(0, 10);
   * @param range Range to be added
   * @returns New range
   */
  add(range: Range): Range {
    if (this.step !== range.step) {
      throw new Error("Cannot add ranges of different steps.");
    }

    return new Range(
      Math.min(this.start, range.start),
      Math.max(this.stop, range.stop),
      this.step,
      this.stop > range.stop
        ? this.isInclusive
        : this.stop === range.stop
        ? this.isInclusive || range.isInclusive
        : range.isInclusive
    );
  }

  /**
   * Implement iterator protocol
   */
  next() {
    if ((this.isInclusive && this.i <= this.stop) || this.i < this.stop) {
      const value = this.i;
      this.i += this.step;
      return { value, done: false };
    }

    // We reset the value once we have iterated over all values so that
    // ranges are reusable.
    this.i = this.start;

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
 * @param stop The value at which the range stops
 * (inclusive depending on value of `inclusive` parameter)
 * @param step The steps between each iteration within the range
 * @param inclusive Inclusive range, where stop value is returned at last
 * @returns Range object
 */
function range(
  start: number,
  stop: number,
  step: number = 1,
  inclusive: boolean = false
): Range {
  return new Range(start, stop, step, inclusive);
}

export default range;
