import {exec as ex} from 'child_process'
import path from 'path'
import promisify from 'util-promisify'
import tempWrite from 'temp-write'

const exec = promisify(ex)

export default async function readImage(image) {
  const binary = path.join(__dirname, '../dll/tesseract/tesseract.exe')
  const imgPath = await tempWrite(image)
  return exec(`${binary} ${imgPath} stdout -l eng+engow+engow2 --psm 7`)
}
