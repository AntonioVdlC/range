#!/usr/bin/env node

const { performance, PerformanceObserver } = require("perf_hooks");

const { range } = require("../dist/cjs/index.js");

const testBenchmark = performance.timerify(function testBenchmark() {
  let sum = 0;
  let i = 0;

  const r = range(0, process.env.SIZE);
  while (!r.next().done) {
    sum += i;
    i++;
  }
  return sum;
});

const obs = new PerformanceObserver((list) => {
  const entries = list.getEntries();
  const avgDuration =
    entries.reduce((sum, cur) => (sum += cur.duration), 0) / entries.length;

  // eslint-disable-next-line no-console
  console.log(`range(0, ${process.env.SIZE}): ${avgDuration}s`);
  obs.disconnect();
});

obs.observe({ entryTypes: ["function"] });

for (let i = 0; i < 1000; i++) {
  testBenchmark();
}

/* TypeScript
range(0, 100): 0.007962769627571106s
range(0, 1000): 0.015898147106170653s
range(0, 10000): 0.08853049981594086s
range(0, 100000): 0.8147728093862534s
range(0, 1000000): 7.5012646638154985s
*/

/* Rust / WASM
range(0, 100): 0.018000024318695067s
range(0, 1000): 0.09116293668746948s
range(0, 10000): 2.4152168154716493s
*/
