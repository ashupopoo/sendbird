"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.conditionChaining = conditionChaining;
exports.hash = hash;
exports.pick = pick;
exports.replace = replace;
/**
 * Converts a given string to a hashed string.
 * */
function hash(str) {
  return String(Math.abs(str.split('').reduce((a, c) => (a << 5) - a + c.charCodeAt(0) | 0, 0)));
}

/**
 * Replace a specific range of text in the string with another text.
 * */
function replace(str, start, end, text) {
  return str.slice(0, start) + text + str.slice(end);
}

/**
 * Returns the value corresponding to the first true index of a given condition array.
 * */
function conditionChaining(conditions, values) {
  const idx = conditions.findIndex(state => Boolean(state));
  return idx > -1 ? values[idx] : values[values.length - 1];
}

/**
 * Returns a new object with only the specified keys from the input object.
 *
 * @param {Object} obj - The input object to pick keys from.
 * @param {Array<string>} keys - An array of keys to pick from the input object.
 * @returns {Object} - A new object containing only the specified keys from the input object.
 * @example
 * ```ts
 *   pick({ a: 1, b: '2', c: true }, ['a', 'c']); // returns { a: 1, c: true }
 * ```
 */
function pick(obj, keys) {
  return keys.reduce((pickedObj, key) => {
    pickedObj[key] = obj[key];
    return pickedObj;
  }, {});
}
//# sourceMappingURL=index.js.map