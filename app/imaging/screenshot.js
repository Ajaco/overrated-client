import {exec as ex} from 'child_process'
import path from 'path'
import promisify from 'util-promisify'
import {readFileSync} from 'fs'
import jimp from 'jimp'

const exec = promisify(ex)

export default async function (pid) {
  const binary = path.join(global.baseDir, 'externals/screenshotter/screenshot_cli.exe')
  const filePath = path.join(global.baseDir, 'externals/ow.png')

  await exec(`${binary} pid=${pid} output=${filePath}`)

  const buffer = readFileSync(filePath)

  const img = await jimp.read(buffer)
  img.resize(jimp.AUTO, 1080)

  console.log(`Screen captured. Resolution: ${img.bitmap.width}x${img.bitmap.height}`)
  return img
}
