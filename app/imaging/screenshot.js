import edge from 'edge'
import path from 'path'
import fs from 'fs'

const onScreenshot = async (err, res) => {
  if (err) console.error('error', err)
  fs.writeFileSync('someScreenshot.png', res)
}

export default async function (pid) {
  const screenshot = edge.func(path.join(__dirname, '../cs/screenshotter.cs'))
  screenshot(pid, onScreenshot)
}
