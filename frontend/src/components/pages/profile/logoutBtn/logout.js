'use server'

import { cookies } from "next/headers"

export  async function logout() {
  const coo = await cookies()
  coo.delete('jwt')
}