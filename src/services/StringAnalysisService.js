export default class StringAnalysisService {
  input = ''

  words = []

  load (input) {
    this.input = input
  }

  analyze () {
    const allWords = this.input.split(' ')
    allWords.sort()

    for (let i = 0; i < allWords.length; i++) {
      const element = allWords[i].toLowerCase()
      if (this.words[element] != null) {
        this.words[element]++
      } else {
        this.words[element] = 1
      }
    }
    return this.words
  }
}
