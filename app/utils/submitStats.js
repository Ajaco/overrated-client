export default async function (result) {
  try {
    const res = await fetch('http://overrated.gg:8080/result', {
      method: 'POST',
      body: JSON.stringify(result),
      headers: {'Content-Type': 'application/json'}
    })
    const json = await res.json()
    console.log('Game submitted successfully!')
    console.dir(json, {depth: null})
  } catch (error) {
    console.error('Failed to submit game:')
    console.error(error)
  }
}
