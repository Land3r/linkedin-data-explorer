import Chance from 'chance'

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
        svg: 'bicolor'
      },
      {
        id: 1,
        colors: ['#d99cd1', '#c99cd1', '#b99cd1', '#a99cd1'],
        svg: 'quadricolor'
      },
      {
        id: 2,
        colors: ['#31a50d', '#d1b022', '#74482a'],
        svg: 'tricolor'
      },
      {
        id: 3,
        colors: ['#ffd077', '#3bc4c7', '#3a9eea', '#ff4e69', '#461e47'],
        svg: 'pentacolor'
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
      svg: 'line'
    },
    {
      value: (7 / 8),
      svg: 'oblic'
    },
    {
      value: function (word) {
        var chance = new Chance(word[0])
        return chance.pickone([0, (3 / 4)])
      },
      svg: 'cross'
    },
    {
      value: function (word) {
        var chance = new Chance(word[0])
        return chance.pickone([0, (1 / 8), (3 / 4), (7 / 8)])
      },
      svg: 'star'
    },
    {
      value: function (word) {
        var chance = new Chance(word[0])
        return chance.random()
      },
      svg: 'circle'
    }
  ]
}
