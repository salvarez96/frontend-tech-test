import { cookies } from "next/headers"

export class Cookies {
  private ENVIRONMENT = process.env.NEXT_PUBLIC_ENVIRONMENT || 'local'
  protected COOKIE_LIFETIME: number
  protected COOKIE_NAME: string

  constructor(
    protected tokenLifetime: number,
    protected cookie_name: string
  ) {
    this.COOKIE_LIFETIME = tokenLifetime * 1000
    this.COOKIE_NAME = cookie_name
  }

  protected async createCookie(value: string) {
    const cookieStore = await cookies()

    cookieStore.set({
      name: this.COOKIE_NAME,
      value: value,
      expires: new Date(Date.now() + this.COOKIE_LIFETIME),
      secure: this.ENVIRONMENT === 'local' ? false : true
    })

    return true
  }

  protected async deleteCookie() {
    const cookieStore = await cookies()

    cookieStore.delete(this.COOKIE_NAME)

    return true
  }

  protected async getCookie() {
    const cookieStore = await cookies()

    if (cookieStore.has(this.COOKIE_NAME)) {
      return cookieStore.get(this.COOKIE_NAME)
    }

    return false
  }
}