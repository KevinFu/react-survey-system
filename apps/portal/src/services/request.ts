const HOST = 'http://localhost:5173'

export async function get(url: string) {
  const res = await fetch(`${HOST}${url}`)

  return res.json()
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function post(url: string, body: any) {
  const res = await fetch(`${HOST}${url}`, {
    method: 'POST',
    body: JSON.stringify(body),
  })

  return res.json()
}
