import * as csv from 'csvtojson'

export function convertToJson (clob) {
  csv().fromString(clob).then((json) => {
    return new Promise((resolve, reject) => {
      resolve(json)
    })
  })
}

export class CsvToJsonService {
  getSample () {
    const csvFilePath = '../samples/Connections.csv'
    const csv = require('csvtojson')
    csv()
      .fromFile(csvFilePath)
      .then((jsonObj) => {
        console.log(jsonObj)
      })

    // Async / await usage
    return csv().fromFile(csvFilePath)
  }
}
