import uuid from 'uuid/v4'
import Store from 'electron-store'
import gameResult from './gameResult'
import maps from './maps'

const store = new Store()

export default function (results = []) {
  const res = results.reduce(
    (acc, match) => {
      if (acc.map[match.map]) {
        acc.map[match.map] += 1
      } else if (match.map) {
        acc.map[match.map] = 1
      }

      if (acc.result[match.result]) {
        acc.result[match.result] += 1
      } else if (match.result) {
        acc.result[match.result] = 1
      }

      if (acc.sr[match.sr]) {
        acc.sr[match.sr] += 1
      } else if (match.sr) {
        acc.sr[match.sr] = 1
      }

      if (acc.duration[match.duration]) {
        acc.duration[match.duration] += 1
      } else if (match.duration) {
        acc.duration[match.duration] = 1
      }
      return acc
    },
    {map: {}, result: {}, sr: {}, duration: {}}
  )

  const sr = findHighest(res.sr)
  const map = findHighest(res.map)
  const result = findHighest(res.result)

  validate({sr, map, result})
  return {
    user: store.get('user'),
    game: {
      result,
      map: maps[map],
      duration: findHighest(res.duration),
      completedAt: new Date(),
      id: uuid()
    },
    sr
  }
}

const findHighest = obj => Object.keys(obj).reduce((a, b) => (obj[a] > obj[b] ? a : b))

const validate = ({sr, map, result}) => {
  if (result !== gameResult.VICTORY && result !== gameResult.DEFEAT && result !== gameResult.DRAW) {
    throw new Error(`Unknown game result. ${result}`)
  }

  const srInt = parseInt(sr, 10)
  if (Number.isNaN(srInt) && sr < 0 && sr > 5000) {
    throw new Error(`SR not an int, or out of range: ${srInt} | ${sr}`)
  }

  if (!(map in maps)) {
    throw new Error(`Map not recognized as an OW map: ${map}`)
  }
}
