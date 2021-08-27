import add from "../src/index.ts";

describe("add", () => {
  it("is a function", () => {
    expect(typeof add).toBe("function");
  });

  it("adds 2 number", () => {
    const expected = 4;
    const actual = add(2, 2);

    expect(actual).toEqual(expected);
  });
});
