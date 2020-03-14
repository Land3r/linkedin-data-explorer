/**
 * Fills an array to the specified length, repeating the values up to the length.
 * @param {array} array The array to fill in to the specified size.
 * @param {number} length The length to fill the array up to.
 */
export function repeatToLength (array, length) {
  const result = []
  for (let i = 0; i < length; i++) {
    result.push(array[i % array.length])
  }
  return result
}
