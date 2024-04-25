export const validateRequired = (value: string): boolean => {
  return !!value.trim().length
}

export const validatePositiveInteger = (value: string): boolean => {
  return /^\d*[1-9]\d*$/.test(value.trim())
}
