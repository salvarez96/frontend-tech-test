'use server'

import { cookies } from 'next/headers'
import { Cryptography } from './Cryptography';
import { cache } from 'react'

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get('session')?.value
  if (!cookie) return { isAuth: false }

  const session = await Cryptography.decrypt(cookie)
  if (!session?.username) return { isAuth: false }

  return { isAuth: true, username: session.username }
})