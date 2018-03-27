import {exec as ex} from 'child_process'
import path from 'path'
import promisify from 'util-promisify'
import {readFileSync} from 'fs'

const exec = promisify(ex)

export default async function (pid) {
  const binary = path.join(__dirname, './dist/screenshotter/screenshot_cli.exe')
  const filePath = './app/assets/ow.png'
  await exec(`${binary} pid=${pid} output=${filePath}`)
  const buffer = readFileSync(filePath)
  return buffer
}
