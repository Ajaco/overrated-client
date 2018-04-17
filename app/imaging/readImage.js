import {exec as ex} from 'child_process'
import path from 'path'
import promisify from 'util-promisify'
import tempWrite from 'temp-write'

const exec = promisify(ex)

export default async function readImage(image, config = '') {
  const binary = path.join(global.baseDir, 'externals/tesseract/tesseract.exe')
  const imgPath = await tempWrite(image)
  return exec(`${binary} ${imgPath} stdout ${config} -l eng+engow+engow2 --psm 7`)
}
