const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/

export const validateEmail = (email: string): boolean => {
  const trimmed = email.trim()
  if (!trimmed.length) return false

  return emailPattern.test(trimmed)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const logError = (error: unknown, ...params: any[]) : void => {
  // eslint-disable-next-line no-console
  console.error(error, params)
}
