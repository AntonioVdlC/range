use js_sys::Error;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct Range {
    _start: i32,
    _stop: i32,
    _step: u32,
    _inclusive: bool,

    // Counter used for iteration, so that we can iterate multiple times over
    // the same range
    i: i32,
}

#[wasm_bindgen]
impl Range {
    #[wasm_bindgen(constructor)]
    pub fn new(start: i32, stop: i32, step: u32, inclusive: bool) -> Range {
        Range {
            _start: start,
            _stop: stop,
            _step: if step != 0 { step } else { 1 },
            _inclusive: inclusive,
            i: start,
        }
    }

    #[wasm_bindgen(getter)]
    pub fn start(&self) -> i32 {
        self._start
    }

    #[wasm_bindgen(getter)]
    pub fn stop(&self) -> i32 {
        self._stop
    }

    #[wasm_bindgen(getter)]
    pub fn step(&self) -> u32 {
        self._step
    }

    #[wasm_bindgen(getter)]
    #[wasm_bindgen(js_name = isInclusive)]
    pub fn is_inclusive(&self) -> bool {
        self._inclusive
    }

    #[wasm_bindgen(getter)]
    pub fn first(&self) -> i32 {
        self._start
    }

    #[wasm_bindgen(getter)]
    pub fn last(&self) -> i32 {
        if self.is_inclusive() {
            self._stop
        } else {
            self._stop - 1
        }
    }

    #[wasm_bindgen(js_name = toString)]
    pub fn to_string(&self) -> String {
        if self.step() == 1 {
            if self.is_inclusive() {
                return format!("{}..={}", self._start, self._stop);
            }
            return format!("{}..{}", self.start(), self.stop());
        } else {
            if self.is_inclusive() {
                return format!("{}..={}{{{}}}", self.start(), self.stop(), self.step());
            }
            return format!("{}..{}{{{}}}", self.start(), self.stop(), self.step());
        }
    }
}

#[wasm_bindgen]
pub fn range(start: i32, stop: i32, step: u32, inclusive: bool) -> Result<Range, JsValue> {
    if start > stop {
        return Err(Error::new(
            (format!("Cannot create a range from {} to {}", start, stop)).as_str(),
        )
        .into());
    }

    return Ok(Range::new(start, stop, step, inclusive));
}
