export default class StringAnalysisService {
  input = ''

  load (input) {
    this.input = this.sanitize(input)
  }

  analyze (maxWords = 100, sanitizeLocales = true) {
    let allWords = ''
    if (sanitizeLocales) {
      allWords = this.sanitizeCommonLocales(this.input).split(' ')
    } else {
      allWords = this.input.split(' ')
    }
    var words = {}

    for (let i = 0; i < allWords.length; i++) {
      const element = allWords[i].toLowerCase()
      if (words[element] != null) {
        words[element] = words[element] + 1
      } else {
        words[element] = 1
      }
    }

    let key, sortedWords = []
    for (key in words) {
      sortedWords.push({ word: key, weight: words[key] })
    }

    sortedWords = [...sortedWords]
      .sort((a, b) => (b.weight - a.weight))
      .map((element) => {
        return [element.word, element.weight]
      })

    sortedWords = sortedWords.splice(0, maxWords)

    return sortedWords
  }

  sanitize (input) {
    const output = input
      .replace('.', ' ')
      .replace(',', ' ')
      .replace(';', ' ')
      .replace(':', ' ')
      .replace('&', ' ')
      .replace('?', ' ')
      .replace('!', ' ')
      .replace('%', ' ')
      .replace('-', ' ')
      .replace('_', ' ')
      .replace('[', ' ')
      .replace(']', ' ')
      .replace('(', ' ')
      .replace(')', ' ')
      .replace('=', ' ')
      .replace('"', ' ')
      .replace('\'', ' ')
      .replace('/', ' ')
      .replace('  ', '')
    return output
  }

  sanitizeCommonLocales (input) {
    const output = input
      .replace(' des ', ' ')
      .replace(' de ', ' ')
      .replace(' à ', ' ')
      .replace(' chez ', ' ')
      .replace(' pour ', ' ')
      .replace(' la ', ' ')
      .replace(' le ', ' ')
      .replace(' the ', ' ')
    return output
  }
}
