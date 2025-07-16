import 'server-only'

import { cookies } from 'next/headers'
import { Cryptography } from './Cryptography';
import { cache } from 'react'
import { redirect } from 'next/navigation'

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get('session')?.value
  const session = await Cryptography.decrypt(cookie)

  if (!session?.username) {
    redirect('/login')
  }

  return { isAuth: true, username: session.username }
})