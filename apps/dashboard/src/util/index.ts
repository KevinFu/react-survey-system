export function validateUsername(val: string): string {
  if (!/^[a-zA-Z][\w]{4,19}$/.test(val)) {
    if (!/^[a-zA-Z]/.test(val)) {
      return 'Username must start with a letter.'
    }
    if (val.length < 5 || val.length > 20) {
      return 'Username must be 5-20 characters.'
    }
    return 'Username can only contain letters, numbers, and underscores.'
  }
  return ''
}
