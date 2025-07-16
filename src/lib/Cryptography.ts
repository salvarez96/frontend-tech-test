import { SignJWT, jwtVerify } from 'jose'

export class Cryptography {
  private static SECRET_KEY: string
  private static ENCODED_KEY: Uint8Array

  static {
    Cryptography.SECRET_KEY = process.env.SESSION_SECRET || ''
    if (!Cryptography.SECRET_KEY)
      console.warn('SESSION_SECRET environment variable is not set!')

    Cryptography.ENCODED_KEY = new TextEncoder().encode(Cryptography.SECRET_KEY)
  }
  static async encrypt(payload: { username: string, expiresAt: Date }) {
    return new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(Cryptography.ENCODED_KEY)
  }

  static async decrypt(session: string | undefined = '') {
    try {
      const { payload } = await jwtVerify(session, Cryptography.ENCODED_KEY, {
        algorithms: ['HS256'],
      })
      return payload
    } catch (error) {
      console.log('Failed to verify session:', error)
      return null
    }
  }
}