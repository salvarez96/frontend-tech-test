import { Cookies } from '@/helpers/Cookies'
import { Cryptography } from './Cryptography'

export class Session {
  private static TOKEN_LIFETIME: number
  private static Cookies: Cookies

  static {
    Session.TOKEN_LIFETIME = Number(process.env.ACCESS_TOKEN_LIFETIME) || 90
    if (isNaN(Session.TOKEN_LIFETIME) || Session.TOKEN_LIFETIME <= 0)
      console.warn('TOKEN_LIFETIME environment variable is not set! Using default of 90 minutes')

    Session.Cookies = new Cookies(Session.TOKEN_LIFETIME, 'session')
  }

  static async createSession(username: string) {
    const expiresAt = new Date(Date.now() + Session.TOKEN_LIFETIME * 60 * 1000)
    const session = await Cryptography.encrypt({ username, expiresAt })

    return await Session.Cookies.createCookie(session)
  }

  static async updateSession() {
    const session = await Session.Cookies.getCookie()

    if (session) {
      const payload = await Cryptography.decrypt(session)

      if (!payload) return null
    } else {
      return null
    }

    return await Session.Cookies.createCookie(session)
  }

  static async deleteSession() {
    return await Session.Cookies.deleteCookie()
  }
}