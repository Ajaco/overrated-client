import jimp from 'jimp'
import regions from '../../regions'

export default async function (img) {
  const leaveGameTemplate = await jimp.read('app/assets/leave_template.png')
  const {leaveGame: {rect: {x, y, w, h}}} = regions.p1440

  const leaveGameRegion = img.crop(x, y, w, h)

  const {percent} = jimp.diff(leaveGameTemplate, leaveGameRegion)

  return percent < 0.15
}
