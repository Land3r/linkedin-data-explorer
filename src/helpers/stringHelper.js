// The default separator used for creating strings.
const defaultSeparator = ' '

/**
 * Coonverts a JSON Array structure to a string.
 * @param {Array} json A JSON Array of the elements to convert.
 * @param {Array} columns An Array of the name of the columns.
 */
export function convertJsonArrayToString (json, columns) {
  var result = ''

  json.map((row) => {
    console.log(row)
    for (const column in columns) {
      console.log(column)
      result += row[columns[column]] + defaultSeparator
    }
  })

  return result
}
