import findProcess from 'find-process'

export default async function () {
  const processes = await findProcess('name', 'Overwatch.exe')
  return processes.length > 0 ? parseInt(processes[0].pid, 10) : null
}
