const required = (propertyType: string, customErrorMessage?: string) => {
  return (v: string) =>
    (v && v.length > 0) ||
    customErrorMessage ||
    `You must input a ${propertyType}`
}
const equality = (propertyType: string, value: string) => {
  return (v: string) => (v && value === v) || `Must be equal to ${propertyType}`
}
const minLength = (propertyType: string, minLength: number) => {
  return (v: string) => {
    if (!v) {
      return true
    }

    return (
      v.length >= minLength ||
      `${propertyType} must be at least ${minLength} characters`
    )
  }
}
const maxLength = (propertyType: string, maxLength: number) => {
  return (v: string) =>
    (v && v.length <= maxLength) ||
    `${propertyType} must be less than ${maxLength} characters`
}

const emailFormat = () => {
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,24})+$/
  return (v: string) => (v && regex.test(v)) || 'Must be a valid email'
}

export { required, minLength, maxLength, emailFormat, equality }
