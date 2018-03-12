import { exec as ex } from 'child_process'
import path from 'path'
import promisify from 'util-promisify'

const exec = promisify(ex)

export default async function readImage(imagePath) {
  const binary = path.join(__dirname, '../dll/tesseract/tesseract.exe')
  return exec(`${binary} ${imagePath} stdout -l eng+engow+engow2`)
}
