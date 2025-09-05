export {};

declare global {
  var jest: typeof import("@jest/globals").jest;
  var describe: typeof import("@jest/globals").describe;
  var test: typeof import("@jest/globals").test;
  var expect: typeof import("@jest/globals").expect;
  var beforeEach: typeof import("@jest/globals").beforeEach;
}
