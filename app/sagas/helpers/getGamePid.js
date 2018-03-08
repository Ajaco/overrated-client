import findProcess from 'find-process'

export default async function () {
  const processes = await findProcess('name', 'Overwatch.exe')
  console.log('processes', processes)
  return processes.length > 0 ? processes[0].pid : null
}
