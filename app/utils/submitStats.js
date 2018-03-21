export default async function (result) {
  try {
    const res = await fetch('http://overrated.gg:8080/result', {
      method: 'POST',
      body: JSON.stringify(result),
      headers: {'Content-Type': 'application/json'}
    })
    const json = await res.json()
    console.log('Game submitted successfully!', json)
  } catch (error) {
    console.log('Failed to submit game:')
    console.error(error)
  }
}
