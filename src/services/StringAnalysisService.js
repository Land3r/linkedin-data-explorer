/**
 * StringAnalysisService class.
 * Responsible for analysing a provided string
 */
export default class StringAnalysisService {
  /**
   * The input string to analyze.
   */
  input = ''

  /**
   * Initializes a new instance of the StringAnalysisService class.
   * @param {string} input The input string to analyze.
   */
  constructor (input = '') {
    this.input = this.sanitize(input)
  }

  /**
   * Loads in the string to analyze.
   * @param {string} input The input string to analyze.
   */
  load (input) {
    this.input = this.sanitize(input)
  }

  /**
   * Analyzes the provided string.
   * @param {number} maxWords The number of words to get.
   * @param {boolean} sanitizeLocales Whether to remove common locales string from input or not.
   */
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

    if (maxWords > 0) {
      sortedWords = sortedWords.splice(0, maxWords)
    }

    return sortedWords
  }

  /**
   * Sanitize the input string from common special chars.
   * @param {string} input The input string to sanitize.
   */
  sanitize (input) {
    const output = input
      .replace(/\./gm, ' ')
      .replace(/,/gm, ' ')
      .replace(/;/gm, ' ')
      .replace(/:/gm, ' ')
      .replace(/&/gm, ' ')
      .replace(/\?/gm, ' ')
      .replace(/!/gm, ' ')
      .replace(/%/gm, ' ')
      .replace(/-/gm, ' ')
      .replace(/_/gm, ' ')
      .replace(/\[/gm, ' ')
      .replace(/\]/gm, ' ')
      .replace(/\(/gm, ' ')
      .replace(/\)/gm, ' ')
      .replace(/｜/gm, ' ')
      .replace(/\|/gm, ' ')
      .replace(/=/gm, ' ')
      .replace(/"/gm, ' ')
      .replace(/'/gm, ' ')
      .replace(/>/gm, ' ')
      .replace(/</gm, ' ')
      .replace(/@/gm, ' ')
      .replace(/\//gm, ' ')
      .replace(/ {2,}/gm, ' ')
    return output
  }

  /**
   * Sanitize the input string from 'fr-FR' French language common words.
   * @param {string} input The input string to sanitize.
   */
  sanitizeCommonLocales (input) {
    const output = input
      .replace(/ des /gm, ' ')
      .replace(/ de /gm, ' ')
      .replace(/ d /gm, ' ')
      .replace(/ à /gm, ' ')
      .replace(/ et /gm, ' ')
      .replace(/ chez /gm, ' ')
      .replace(/ pour /gm, ' ')
      .replace(/ en /gm, ' ')
      .replace(/ un /gm, ' ')
      .replace(/ une /gm, ' ')
      .replace(/ la /gm, ' ')
      .replace(/ le /gm, ' ')
      .replace(/ l /gm, ' ')
      .replace(/ the /gm, ' ')
      .replace(/ {2,}/, ' ')
    return output
  }
}
