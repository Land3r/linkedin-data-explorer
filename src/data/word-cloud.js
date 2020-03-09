import Chance from 'chance'

var svgNS = 'http://www.w3.org/2000/svg'

/**
 * The default configuration for the word cloud.
 */
export const DefaultWordCloudConfig = {
  animations: {
    durations: [0, 1000, 5000, 10000],
    easings: ['ease', 'linear', 'ease-in', 'ease-out', 'ease-in-out', 'cubic-bezier(0.1,0.7,1.0,0.1)'],
    animations: [
      {
        label: 'bounce',
        value: ['bounceIn', 'bounceOut']
      },
      {
        label: 'fade',
        value: ['fadeIn', 'fadeOut']
      },
      {
        label: 'flipX',
        value: ['flipInX', 'flipOutX']
      },
      {
        label: 'flipY',
        value: ['flipInY', 'flipOutY']
      },
      {
        label: 'rotate',
        value: ['rotateIn', 'rotateOut']
      },
      {
        label: 'zoom',
        value: ['zoomIn', 'zoomOut']
      }
    ],
    overlaps: [0, (1 / 5), (1 / 2), 1]
  },
  colors: {
    schemes: [
      {
        id: 0,
        colors: ['#403030', '#f97a7a'],
        svg: (function () {
          var div = document.createElement('div')
          div.appendChild((function () {
            var svg = document.createElementNS(svgNS, 'svg')
            svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
            svg.setAttribute('height', '12')
            svg.setAttribute('width', '12')
            svg.appendChild((function () {
              var rectangle = document.createElementNS(svgNS, 'rectangle')
              rectangle.setAttribute('x', '0')
              rectangle.setAttribute('y', '0')
              rectangle.setAttribute('height', '100%')
              rectangle.setAttribute('width', '6')
              rectangle.setAttribute('fill', '#403030')
              return rectangle
            })())
            svg.appendChild((function () {
              var rectangle = document.createElementNS(svgNS, 'rectangle')
              rectangle.setAttribute('x', '6')
              rectangle.setAttribute('y', '0')
              rectangle.setAttribute('height', '100%')
              rectangle.setAttribute('width', '6')
              rectangle.setAttribute('fill', '#f97a7a')
              return rectangle
            })())
            return svg
          })())
          return div.innerHTML
        })()
      },
      {
        id: 1,
        colors: ['#d99cd1', '#c99cd1', '#b99cd1', '#a99cd1'],
        svg: (function () {
          var div = document.createElement('div')
          div.appendChild((function () {
            var svg = document.createElementNS(svgNS, 'svg')
            svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
            svg.setAttribute('viewBox', '0 0 12 12')
            svg.appendChild((function () {
              var rectangle = document.createElementNS(svgNS, 'rectangle')
              rectangle.setAttribute('x', '0')
              rectangle.setAttribute('y', '0')
              rectangle.setAttribute('height', '100%')
              rectangle.setAttribute('width', '3')
              rectangle.setAttribute('fill', '#d99cd1')
              return rectangle
            })())
            svg.appendChild((function () {
              var rectangle = document.createElementNS(svgNS, 'rectangle')
              rectangle.setAttribute('x', '3')
              rectangle.setAttribute('y', '0')
              rectangle.setAttribute('height', '100%')
              rectangle.setAttribute('width', '3')
              rectangle.setAttribute('fill', '#c99cd1')
              return rectangle
            })())
            svg.appendChild((function () {
              var rectangle = document.createElementNS(svgNS, 'rectangle')
              rectangle.setAttribute('x', '6')
              rectangle.setAttribute('y', '0')
              rectangle.setAttribute('height', '100%')
              rectangle.setAttribute('width', '3')
              rectangle.setAttribute('fill', '#b99cd1')
              return rectangle
            })())
            svg.appendChild((function () {
              var rectangle = document.createElementNS(svgNS, 'rectangle')
              rectangle.setAttribute('x', '9')
              rectangle.setAttribute('y', '0')
              rectangle.setAttribute('height', '100%')
              rectangle.setAttribute('width', '3')
              rectangle.setAttribute('fill', '#a99cd1')
              return rectangle
            })())
            return svg
          })())
          return URL.createObjectURL(new Blob([div.innerHTML], { type: 'image/svg+xml' }))
        })()
      },
      {
        id: 2,
        colors: ['#31a50d', '#d1b022', '#74482a'],
        svg: (function () {
          var div = document.createElement('div')
          div.appendChild((function () {
            var svg = document.createElementNS(svgNS, 'svg')
            svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
            svg.setAttribute('viewBox', '0 0 12 12')
            svg.appendChild((function () {
              var rectangle = document.createElementNS(svgNS, 'rectangle')
              rectangle.setAttribute('x', '0')
              rectangle.setAttribute('y', '0')
              rectangle.setAttribute('height', '100%')
              rectangle.setAttribute('width', '4')
              rectangle.setAttribute('fill', '#31a50d')
              return rectangle
            })())
            svg.appendChild((function () {
              var rectangle = document.createElementNS(svgNS, 'rectangle')
              rectangle.setAttribute('x', '4')
              rectangle.setAttribute('y', '0')
              rectangle.setAttribute('height', '100%')
              rectangle.setAttribute('width', '4')
              rectangle.setAttribute('fill', '#d1b022')
              return rectangle
            })())
            svg.appendChild((function () {
              var rectangle = document.createElementNS(svgNS, 'rectangle')
              rectangle.setAttribute('x', '8')
              rectangle.setAttribute('y', '0')
              rectangle.setAttribute('height', '100%')
              rectangle.setAttribute('width', '4')
              rectangle.setAttribute('fill', '#74482a')
              return rectangle
            })())
            return svg
          })())
          return URL.createObjectURL(new Blob([div.innerHTML], { type: 'image/svg+xml' }))
        })()
      },
      {
        id: 3,
        colors: ['#ffd077', '#3bc4c7', '#3a9eea', '#ff4e69', '#461e47'],
        svg: (function () {
          var div = document.createElement('div')
          div.appendChild((function () {
            var svg = document.createElementNS(svgNS, 'svg')
            svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
            svg.setAttribute('viewBox', '0 0 10 10')
            svg.appendChild((function () {
              var rectangle = document.createElementNS(svgNS, 'rectangle')
              rectangle.setAttribute('x', '0')
              rectangle.setAttribute('y', '0')
              rectangle.setAttribute('height', '100%')
              rectangle.setAttribute('width', '2')
              rectangle.setAttribute('fill', '#ffd077')
              return rectangle
            })())
            svg.appendChild((function () {
              var rectangle = document.createElementNS(svgNS, 'rectangle')
              rectangle.setAttribute('x', '2')
              rectangle.setAttribute('y', '0')
              rectangle.setAttribute('height', '100%')
              rectangle.setAttribute('width', '2')
              rectangle.setAttribute('fill', '#3bc4c7')
              return rectangle
            })())
            svg.appendChild((function () {
              var rectangle = document.createElementNS(svgNS, 'rectangle')
              rectangle.setAttribute('x', '4')
              rectangle.setAttribute('y', '0')
              rectangle.setAttribute('height', '100%')
              rectangle.setAttribute('width', '2')
              rectangle.setAttribute('fill', '#3a9eea')
              return rectangle
            })())
            svg.appendChild((function () {
              var rectangle = document.createElementNS(svgNS, 'rectangle')
              rectangle.setAttribute('x', '6')
              rectangle.setAttribute('y', '0')
              rectangle.setAttribute('height', '100%')
              rectangle.setAttribute('width', '2')
              rectangle.setAttribute('fill', '#ff4e69')
              return rectangle
            })())
            svg.appendChild((function () {
              var rectangle = document.createElementNS(svgNS, 'rectangle')
              rectangle.setAttribute('x', '8')
              rectangle.setAttribute('y', '0')
              rectangle.setAttribute('height', '100%')
              rectangle.setAttribute('width', '2')
              rectangle.setAttribute('fill', '#461e47')
              return rectangle
            })())
            return svg
          })())
          return URL.createObjectURL(new Blob([div.innerHTML], { type: 'image/svg+xml' }))
        })()
      }
    ],
    functions: {
      bicolor (color1, color2) {
        return ([, weight]) => weight > 10 ? color1 : color2
      },
      tricolor (color1, color2, color3) {
        return ([, weight]) => weight > 10 ? color1 : weight > 5 ? color2 : color3
      },
      quadricolor (color1, color2, color3, color4) {
        return ([, weight]) => weight > 15 ? color1 : weight > 10 ? color2 : weight > 5 ? color3 : color4
      },
      rdncolor (...args) {
        var chance = new Chance()
        return ([, weight]) => chance.pickone([...args])
      }
    }
  },
  fonts: {
    families: [
      'Roboto',
      'Abril Fatface',
      'Annie Use Your Telescope',
      'Anton',
      'Bahiana',
      'Baloo Bhaijaan',
      'Barrio',
      'Finger Paint',
      'Fredericka the Great',
      'Gloria Hallelujah',
      'Indie Flower',
      'Life Savers',
      'Londrina Sketch',
      'Love Ya Like A Sister',
      'Merienda',
      'Nothing You Could Do',
      'Pacifico',
      'Quicksand',
      'Righteous',
      'Sacramento',
      'Shadows Into Light'
    ],
    ratio: [0, (1 / 20), (1 / 5), (1 / 2), 1]
  },
  rotations: [
    {
      value: 0,
      svg: (function () {
        var div = document.createElement('div')
        div.appendChild((function () {
          var svg = document.createElementNS(svgNS, 'svg')
          svg.setAttribute('viewBox', '0 0 12 12')
          svg.appendChild((function () {
            var path = document.createElementNS(svgNS, 'path')
            path.setAttribute('d', 'M0 7 L0 5 L12 5 L12 7 Z')
            return path
          })())
          return svg
        })())
        return URL.createObjectURL(new Blob([div.innerHTML]))
      })()
    },
    {
      value: (7 / 8),
      svg: (function () {
        var div = document.createElement('div')
        div.appendChild((function () {
          var svg = document.createElementNS(svgNS, 'svg')
          svg.setAttribute('viewBox', '0 0 12 12')
          svg.appendChild((function () {
            var path = document.createElementNS(svgNS, 'path')
            path.setAttribute('d', 'M0 7 L0 5 L12 5 L12 7 Z')
            path.setAttribute('transform', 'rotate(315 6 6)')
            return path
          })())
          return svg
        })())
        return URL.createObjectURL(new Blob([div.innerHTML]))
      })()
    },
    {
      value: function (word) {
        var chance = new Chance(word[0])
        return chance.pickone([0, (3 / 4)])
      },
      svg: (function () {
        var div = document.createElement('div')
        div.appendChild((function () {
          var svg = document.createElementNS(svgNS, 'svg')
          svg.setAttribute('viewBox', '0 0 12 12')
          svg.appendChild((function () {
            var path = document.createElementNS(svgNS, 'path')
            path.setAttribute('d', 'M0 7 L0 5 L12 5 L12 7 Z')
            return path
          })())
          svg.appendChild((function () {
            var path = document.createElementNS(svgNS, 'path')
            path.setAttribute('d', 'M0 7 L0 5 L12 5 L12 7 Z')
            path.setAttribute('transform', 'rotate(90 6 6)')
            return path
          })())
          return svg
        })())
        return URL.createObjectURL(new Blob([div.innerHTML]))
      })()
    },
    {
      value: function (word) {
        var chance = new Chance(word[0])
        return chance.pickone([0, (1 / 8), (3 / 4), (7 / 8)])
      },
      svg: (function () {
        var div = document.createElement('div')
        div.appendChild((function () {
          var svg = document.createElementNS(svgNS, 'svg')
          svg.setAttribute('viewBox', '0 0 12 12')
          svg.appendChild((function () {
            var path = document.createElementNS(svgNS, 'path')
            path.setAttribute('d', 'M0 7 L0 5 L12 5 L12 7 Z')
            return path
          })())
          svg.appendChild((function () {
            var path = document.createElementNS(svgNS, 'path')
            path.setAttribute('d', 'M0 7 L0 5 L12 5 L12 7 Z')
            path.setAttribute('transform', 'rotate(45 6 6)')
            return path
          })())
          svg.appendChild((function () {
            var path = document.createElementNS(svgNS, 'path')
            path.setAttribute('d', 'M0 7 L0 5 L12 5 L12 7 Z')
            path.setAttribute('transform', 'rotate(90 6 6)')
            return path
          })())
          svg.appendChild((function () {
            var path = document.createElementNS(svgNS, 'path')
            path.setAttribute('d', 'M0 7 L0 5 L12 5 L12 7 Z')
            path.setAttribute('transform', 'rotate(315 6 6)')
            return path
          })())
          return svg
        })())
        return URL.createObjectURL(new Blob([div.innerHTML]))
      })()
    },
    {
      value: function (word) {
        var chance = new Chance(word[0])
        return chance.random()
      },
      svg: (function () {
        var div = document.createElement('div')
        div.appendChild((function () {
          var svg = document.createElementNS(svgNS, 'svg')
          svg.setAttribute('viewBox', '0 0 2 2')
          svg.appendChild((function () {
            var circle = document.createElementNS(svgNS, 'circle')
            circle.setAttribute('cx', 1)
            circle.setAttribute('cy', 1)
            circle.setAttribute('r', 1)
            return circle
          })())
          return svg
        })())
        return URL.createObjectURL(new Blob([div.innerHTML]))
      })()
    }
  ]
}
