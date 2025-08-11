const HOST = 'http://localhost:3001'

export async function get(url: string) {
  const res = await fetch(`${HOST}${url}`)

  return res.json()
}

export async function post(url: string, body: unknown) {
  const res = await fetch(`${HOST}${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  return res.json()
}
