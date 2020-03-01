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
