import * as csv from 'csvtojson'

/**
 * Converts the provided csv to json.
 * @param {*} clob The csv to convert, as a string.
 */
export async function convertCsvToJson (clob) {
  return csv().fromString(clob).then((json) => {
    return new Promise((resolve, reject) => {
      resolve(normalizeData(json))
    })
  })
}

/**
 * The JSON Array where to inject mandatory rows if necessary.
 * Used to normalize the input data.
 * @param {Array} jsonArray The JSON Array to inject mandatory fields.
 */
function normalizeData (jsonArray) {
  const newJsonArray = jsonArray.map((json, index) => ({
    Row: index,

    // Overrides any other value previously set.
    ...json
  }))
  return newJsonArray
}
