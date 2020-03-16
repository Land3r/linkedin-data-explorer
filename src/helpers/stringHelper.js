// The default separator used for creating strings.
const defaultSeparator = ' '

/**
 * Converts a JSON Array structure to a string.
 * @param {Array} json A JSON Array of the elements to convert.
 * @param {Array} columns An Array of the name of the columns.
 */
export function convertJsonArrayToString (json, columns) {
  var result = ''
  console.dir(json)

  json.map((row) => {
    for (const column in columns) {
      result += row[columns[column]] + defaultSeparator
    }
  })

  return result
}

/**
 * Converts a JSON structure to a string.
 * @param {Object} json A JSON of the elements to convert.
 * @param {Array} columns An Array of the name of the columns.
 */
export function convertJsonToString (json, columns) {
  var result = ''

  for (const column in columns) {
    result += json[columns[column]] + defaultSeparator
  }

  return result
}
