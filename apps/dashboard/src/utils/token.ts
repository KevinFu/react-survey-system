const USER_TOKEN_KEY = 'USER_TOKEN'

export function setUserToken(token: string) {
  localStorage.setItem(USER_TOKEN_KEY, token)
}

export function getUserToken() {
  return localStorage.getItem(USER_TOKEN_KEY) || ''
}

export function removeUserToken() {
  localStorage.removeItem(USER_TOKEN_KEY)
}
