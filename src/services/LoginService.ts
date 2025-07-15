import { LoginToken } from "@/auth/LoginToken"

const loginToken = new LoginToken()

export class LoginService {
  private static VALID_USERNAME = process.env.NEXT_PUBLIC_VALID_USERNAME
  private static VALID_PASSWORD = process.env.NEXT_PUBLIC_VALID_PASSWORD

  static async login(username: string, password: string) {
    return new Promise(async (resolve, reject) => {
      if (
        username === this.VALID_USERNAME &&
        password === this.VALID_PASSWORD
      ) {
        await loginToken.createLoginToken()

        resolve({
          success: true,
          message: "Login successful"
        })
      } else {
        reject('Invalid username or password')
      }
    })
  }

  static async logout() {
    return new Promise(async (resolve) => {
      const isTokenDeleted = await loginToken.deleteLoginToken()

      resolve(isTokenDeleted)
    })
  }
}