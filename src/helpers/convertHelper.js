import * as csv from 'csvtojson'

/**
 * Converts the provided csv to json.
 * @param {*} clob The csv to convert, as a string.
 */
export async function convertCsvToJson (clob) {
  return csv().fromString(clob).then((json) => {
    return new Promise((resolve, reject) => {
      resolve(json)
    })
  })
}
