import { Cookies } from "@/helpers/Cookies"
import { generateToken } from "@/helpers/tokenGenerator"

export class LoginToken extends Cookies {
  constructor() {
    super(
      Number(process.env.NEXT_PUBLIC_ACCESS_TOKEN_LIFETIME) || 60,
      'access_token'
    )
  }

  async createLoginToken() {
    return await super.createCookie(generateToken(16))
  }

  async getLoginToken() {
    return await super.getCookie()
  }

  async deleteLoginToken() {
    return await super.deleteCookie()
  }
}