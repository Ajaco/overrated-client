import edge from 'edge'
import path from 'path'
import fs from 'fs'
import promisify from 'util-promisify'

export default async function (pid) {
  try {
    const ss = edge.func(path.join(__dirname, '../cs/screenshotter.cs'))
    const screenshot = promisify(ss)
    const buffer = await screenshot(pid)
    fs.writeFileSync('app/assets/ow.png', buffer)
    return buffer
  } catch (error) {
    console.error('error')
  }
}
