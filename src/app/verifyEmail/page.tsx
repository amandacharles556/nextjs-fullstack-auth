'use client'

import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Container } from '@/components'

export default function VerifyEmailPage() {
  const [token, setToken] = useState('')
  const [verified, setVerified] = useState(false)
  const [error, setError] = useState(false)
  const searchParams = useSearchParams()

  const verifyUserEmail = async () => {
    try {
      await axios.post('/api/users/verifyEmail', { token })
      setVerified(true)
    } catch (error: any) {
      setError(true)
      console.log(error.response.data)
    }
  }

  useEffect(() => {
    const urlToken = searchParams.get('token') as string
    setToken(urlToken || '')
  }, [])
  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail()
    }
  }, [token, verifyUserEmail])

  return (
    <Container title="Verify Email">
      <h2 className="p-2 bg-orange-500 text-black">{token ? `${token}` : 'no token'}</h2>
      {verified && (
        <div>
          <h2 className="text-2xl">Email Verified</h2>
          <Link href="/login">Login</Link>
        </div>
      )}
      {error && (
        <div>
          <h2 className="text-2xl bg-red-500 text-black">Error</h2>
        </div>
      )}
    </Container>
  )
}
