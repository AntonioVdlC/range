import range from "../src/index.ts";

describe("range", () => {
  it("is a function", () => {
    expect(typeof range).toBe("function");
  });

  it("creates a new range object", () => {
    expect(typeof range(0, 10)).toBe("object");
  });

  it("throws if not passed a valid range (start > stop)", () => {
    expect(() => range(10, 0)).toThrow();
  });

  it("throws if not passed a valid range (start is not a number)", () => {
    expect(() => range("hello", 3)).toThrow();
  });

  it("throws if not passed a valid range (stop is not a number)", () => {
    expect(() => range(3, "hello")).toThrow();
  });

  it("throws if not passed a valid range (step is not a number)", () => {
    expect(() => range(0, 3, "hello")).toThrow();
  });

  describe(".start", () => {
    it("is a getter", () => {
      expect(typeof range(0, 10).start).toBe("number");
    });

    it("returns the start value of a range", () => {
      const start = 0;
      const stop = 10;

      const expected = start;
      const actual = range(start, stop).start;

      expect(actual).toEqual(expected);
    });
  });

  describe(".stop", () => {
    it("is a getter", () => {
      expect(typeof range(0, 10).stop).toBe("number");
    });

    it("returns the stop value of a range", () => {
      const start = 0;
      const stop = 10;

      const expected = stop;
      const actual = range(start, stop).stop;

      expect(actual).toEqual(expected);
    });
  });

  describe(".step", () => {
    it("is a getter", () => {
      expect(typeof range(0, 10).step).toBe("number");
    });

    it("returns the step value of a range", () => {
      const start = 0;
      const stop = 10;
      const step = 1;

      const expected = step;
      const actual = range(start, stop, step).step;

      expect(actual).toEqual(expected);
    });
  });

  describe(".isInclusive", () => {
    it("is a getter", () => {
      expect(typeof range(0, 10).isInclusive).toBe("boolean");
    });

    it("returns the step value of a range", () => {
      const start = 0;
      const stop = 10;
      const step = 1;
      const inclusive = true;

      const expected = inclusive;
      const actual = range(start, stop, step, inclusive).isInclusive;

      expect(actual).toEqual(expected);
    });
  });

  describe(".first", () => {
    it("is a getter", () => {
      expect(typeof range(0, 10).first).toBe("number");
    });

    it("returns the first value of a range", () => {
      const start = 0;
      const stop = 10;

      const expected = start;
      const actual = range(start, stop).first;

      expect(actual).toEqual(expected);
    });
  });

  describe(".last", () => {
    it("is a getter", () => {
      expect(typeof range(0, 10).last).toBe("number");
    });

    it("returns the last value of a range", () => {
      const start = 0;
      const stop = 10;

      const expected = stop - 1;
      const actual = range(start, stop).last;

      expect(actual).toEqual(expected);
    });

    it("returns the last value of a range (inclusive)", () => {
      const start = 0;
      const stop = 10;

      const expected = stop;
      const actual = range(start, stop, 1, true).last;

      expect(actual).toEqual(expected);
    });
  });

  describe(".next()", () => {
    it("is a function", () => {
      expect(typeof range(0, 10).next).toBe("function");
    });

    it("iterates over a range", () => {
      const start = 0;
      const stop = 5;

      const r = range(start, stop);

      expect(r.next()).toEqual({ done: false, value: start });
      expect(r.next()).toEqual({ done: false, value: start + 1 });
      expect(r.next()).toEqual({ done: false, value: start + 2 });
      expect(r.next()).toEqual({ done: false, value: start + 3 });
      expect(r.next()).toEqual({ done: false, value: start + 4 });
      expect(r.next()).toEqual({ done: true, value: undefined });
    });

    it("iterates over a range (step = 2)", () => {
      const start = 0;
      const stop = 9;
      const step = 2;

      const r = range(start, stop, step);

      expect(r.next()).toEqual({ done: false, value: start });
      expect(r.next()).toEqual({ done: false, value: start + 2 });
      expect(r.next()).toEqual({ done: false, value: start + 4 });
      expect(r.next()).toEqual({ done: false, value: start + 6 });
      expect(r.next()).toEqual({ done: false, value: start + 8 });
      expect(r.next()).toEqual({ done: true, value: undefined });
    });

    it("iterates over a range (inclusive", () => {
      const start = 0;
      const stop = 5;

      const r = range(start, stop, 1, true);

      expect(r.next()).toEqual({ done: false, value: start });
      expect(r.next()).toEqual({ done: false, value: start + 1 });
      expect(r.next()).toEqual({ done: false, value: start + 2 });
      expect(r.next()).toEqual({ done: false, value: start + 3 });
      expect(r.next()).toEqual({ done: false, value: start + 4 });
      expect(r.next()).toEqual({ done: false, value: start + 5 });
      expect(r.next()).toEqual({ done: true, value: undefined });
    });

    it("iterates over a range multiple times", () => {
      const start = 0;
      const stop = 5;
      const step = 1;

      const r = range(start, stop, step);

      expect(r.next()).toEqual({ done: false, value: start });
      expect(r.next()).toEqual({ done: false, value: start + 1 });
      expect(r.next()).toEqual({ done: false, value: start + 2 });
      expect(r.next()).toEqual({ done: false, value: start + 3 });
      expect(r.next()).toEqual({ done: false, value: start + 4 });
      expect(r.next()).toEqual({ done: true, value: undefined });
      expect(r.next()).toEqual({ done: false, value: start });
      expect(r.next()).toEqual({ done: false, value: start + 1 });
      expect(r.next()).toEqual({ done: false, value: start + 2 });
      expect(r.next()).toEqual({ done: false, value: start + 3 });
      expect(r.next()).toEqual({ done: false, value: start + 4 });
      expect(r.next()).toEqual({ done: true, value: undefined });
      expect(r.next()).toEqual({ done: false, value: start });
      expect(r.next()).toEqual({ done: false, value: start + 1 });
      expect(r.next()).toEqual({ done: false, value: start + 2 });
      expect(r.next()).toEqual({ done: false, value: start + 3 });
      expect(r.next()).toEqual({ done: false, value: start + 4 });
      expect(r.next()).toEqual({ done: true, value: undefined });
    });
  });

  describe("for..of", () => {
    it("is an iterable", () => {
      expect(typeof range(0, 10)[Symbol.iterator]).toBe("function");
    });

    it("iterates over a range", () => {
      const start = 0;
      const stop = 5;

      const expected = [0, 1, 2, 3, 4];

      const actual = [];
      for (let i of range(start, stop)) {
        actual.push(i);
      }

      expect(actual).toEqual(expected);
    });

    it("iterates over a range (inclusive)", () => {
      const start = 0;
      const stop = 5;

      const expected = [0, 1, 2, 3, 4, 5];

      const actual = [];
      for (let i of range(start, stop, 1, true)) {
        actual.push(i);
      }

      expect(actual).toEqual(expected);
    });

    it("iterates over a range (step = 2)", () => {
      const start = 0;
      const stop = 9;
      const step = 2;

      const expected = [0, 2, 4, 6, 8];

      const actual = [];
      for (let i of range(start, stop, step)) {
        actual.push(i);
      }

      expect(actual).toEqual(expected);
    });

    it("iterates over a range multiple times", () => {
      const start = 0;
      const stop = 9;
      const step = 2;

      const r = range(start, stop, step);

      const expected = [0, 2, 4, 6, 8];

      const actual = [];
      for (let i of r) {
        actual.push(i);
      }

      expect(actual).toEqual(expected);

      const actual2 = [];
      for (let i of r) {
        actual2.push(i);
      }

      expect(actual2).toEqual(expected);
    });
  });

  describe(".toString()", () => {
    it("is a function", () => {
      expect(typeof range(0, 10).toString).toBe("function");
    });

    it("returns a string representation of a range", () => {
      const start = 0;
      const stop = 10;

      const expected = "0..10";
      const actual = range(start, stop).toString();

      expect(actual).toEqual(expected);
    });

    it("returns a string representation of a range (inclusive)", () => {
      const start = 0;
      const stop = 10;

      const expected = "0..=10";
      const actual = range(start, stop, 1, true).toString();

      expect(actual).toEqual(expected);
    });

    it("returns a string representation of a range (step != 1)", () => {
      const start = 0;
      const stop = 10;
      const step = 2;

      const expected = "0..10{2}";
      const actual = range(start, stop, step).toString();

      expect(actual).toEqual(expected);
    });

    it("returns a string representation of a range (step != 1, inclusive)", () => {
      const start = 0;
      const stop = 10;
      const step = 2;

      const expected = "0..=10{2}";
      const actual = range(start, stop, step, true).toString();

      expect(actual).toEqual(expected);
    });
  });

  describe(".toArray()", () => {
    it("is a function", () => {
      expect(typeof range(0, 10).toArray).toBe("function");
    });

    it("returns an array from a range", () => {
      const start = 0;
      const stop = 9;
      const step = 2;

      const expected = [0, 2, 4, 6, 8];
      const actual = range(start, stop, step).toArray();

      expect(actual).toEqual(expected);
    });

    it("returns an array from a range (inclusive)", () => {
      const start = 0;
      const stop = 10;
      const step = 2;

      const expected = [0, 2, 4, 6, 8, 10];
      const actual = range(start, stop, step, true).toArray();

      expect(actual).toEqual(expected);
    });

    it("returns an array from a range ([...range()])", () => {
      const start = 0;
      const stop = 5;
      const step = 1;

      const expected = [0, 1, 2, 3, 4];
      const actual = [...range(start, stop, step)];

      expect(actual).toEqual(expected);
    });
  });

  describe(".equal()", () => {
    it("is a function", () => {
      expect(typeof range(0, 10).equal).toBe("function");
    });

    it("returns `true` if given range is equal", () => {
      const expected = true;
      const actual = range(0, 10, 2).equal(range(0, 10, 2));

      expect(actual).toEqual(expected);
    });

    it("returns `false` if given range is not equal", () => {
      const expected = false;
      const actual = range(0, 10, 2).equal(range(0, 10));

      expect(actual).toEqual(expected);
    });
  });

  describe(".includes()", () => {
    it("is a function", () => {
      expect(typeof range(0, 10).includes).toBe("function");
    });

    it("returns `true` if given range is included", () => {
      const expected = true;
      const actual = range(0, 10).includes(range(0, 5));

      expect(actual).toEqual(expected);
    });

    it("returns `true` if given range is included (range inclusive)", () => {
      const expected = true;
      const actual = range(0, 10).includes(range(0, 9, 1, true));

      expect(actual).toEqual(expected);
    });

    it("returns `true` if given range is equal", () => {
      const expected = true;
      const actual = range(0, 10).includes(range(0, 10));

      expect(actual).toEqual(expected);
    });

    it("returns `false` if given range is not included", () => {
      const expected = false;
      const actual = range(0, 5).includes(range(0, 10));

      expect(actual).toEqual(expected);
    });

    it("returns `false` if given range is not included (range inclusive", () => {
      const expected = false;
      const actual = range(0, 10).includes(range(0, 10, 1, true));

      expect(actual).toEqual(expected);
    });
  });

  describe(".add()", () => {
    it("is a function", () => {
      expect(typeof range(0, 10).add).toBe("function");
    });

    it("throws if trying to add ranges with different steps", () => {
      expect(() => range(0, 5, 2).add(range(1, 10))).toThrow();
    });

    it("adds ranges correctly (this.stop < range.stop)", () => {
      const expected = range(0, 10);
      const actual = range(0, 5).add(range(1, 10));

      expect(actual.equal(expected)).toBeTrue();
    });

    it("adds ranges correctly (this.stop > range.stop)", () => {
      const expected = range(0, 10);
      const actual = range(0, 10).add(range(1, 5));

      expect(actual.equal(expected)).toBeTrue();
    });

    it("adds ranges correctly (this.stop === range.stop)", () => {
      const expected = range(0, 10);
      const actual = range(0, 10).add(range(1, 10));

      expect(actual.equal(expected)).toBeTrue();
    });

    it("adds ranges correctly (equal, inclusive)", () => {
      const expected = range(0, 10, 1, true);
      const actual = range(0, 10, 1, true).add(range(1, 10));

      expect(actual.equal(expected)).toBeTrue();
    });
  });
});
