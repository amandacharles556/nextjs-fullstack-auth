'use client'

import Link from 'next/link'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { Input, Container, Button } from '@/components'
import { toast } from 'react-hot-toast'

export default function SignupPage() {
  const router = useRouter()
  const [user, setUser] = React.useState({ email: '', password: '', username: '' })
  const [buttonDisabled, setButtonDisabled] = React.useState(true)
  const [loading, setLoading] = React.useState(false)
  const handleSignup = async () => {
    try {
      setLoading(true)
      const response = await axios.post('/api/users/signup', user)
      console.log('Signup success', response.data)
      router.push('/login')
    } catch (error: any) {
      console.log('Signup failed', error.message)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser(prevState => ({ ...prevState, [e.target.id]: e.target.value }))
  }

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [user])
  return (
    <Container title={loading ? 'Processing' : 'Signup'} className="max-w-sm">
      <Input
        label="Username"
        id="username"
        type="text"
        value={user.username}
        onChange={handleChange}
        placeholder="username"
      />
      <Input
        label="Email"
        id="email"
        type="email"
        value={user.email}
        onChange={handleChange}
        placeholder="email"
      />
      <Input
        label="Password"
        id="password"
        type="password"
        value={user.password}
        onChange={handleChange}
        placeholder="password"
      />
      <Button onClick={handleSignup} className="mb-4">
        {buttonDisabled ? 'No signup' : 'Signup'}
      </Button>
      <Link href={'/login'}>Visit login page</Link>
    </Container>
  )
}
