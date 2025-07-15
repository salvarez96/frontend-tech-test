const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const lowerCase = upperCase.toLowerCase()
const numbers = '0123456789'
const symbols = '!#$%&()=?@*+-_.:,;'

export function generateToken(length = 12) {
  let token = ''
  const characters = upperCase + lowerCase + numbers + symbols

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    token += characters.charAt(randomIndex)
  }

  return token
}
