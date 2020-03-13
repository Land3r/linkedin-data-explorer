import htmlToImage from 'html-to-image'

/**
 * Renders a dom element to an image.
 * @param {*} node The dom element to create an image from.
 */
export async function renderNodeToPng (node) {
  return htmlToImage.toPng(node)
    .then(function (dataUrl) {
      return new Promise((resolve, reject) => {
        resolve(dataUrl)
      })
    })
    .catch(function (error) {
      return new Promise((resolve, reject) => {
        reject(error)
      })
    })
}
