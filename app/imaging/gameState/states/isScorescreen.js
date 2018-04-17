import jimp from 'jimp'
import path from 'path'
import regions from '../../regions'

export default async function (img) {
  const leaveGameTemplate = await jimp.read(path.join(global.baseDir, 'externals/assets/leave_template.png'))
  const {
    leaveGame: {
      rect: {x, y, w, h}
    }
  } = regions

  const leaveGameRegion = img.crop(x, y, w, h)

  const {percent} = jimp.diff(leaveGameTemplate, leaveGameRegion)

  return percent < 0.15
}
