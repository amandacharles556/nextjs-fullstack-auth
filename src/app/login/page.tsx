'use client'
import React, { useEffect } from 'react'
import { Input, Container, Button } from '@/components'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import classNames from 'classnames'
import { toast } from 'react-hot-toast'

export default function LoginPage() {
  const router = useRouter()
  const [user, setUser] = React.useState({ email: '', password: '' })
  const [buttonDisabled, setButtonDisabled] = React.useState(true)
  const [loading, setLoading] = React.useState(false)
  const handleLogin = async () => {
    try {
      setLoading(true)
      const response = await axios.post('/api/users/login', user)
      console.log('Login success', response.data)
      toast.success('Login Success')
      router.push('/profile')
    } catch (error: any) {
      console.log('Login failed', error.message)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser(prevState => ({ ...prevState, [e.target.id]: e.target.value }))
  }

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [user])
  return (
    <Container title={loading ? 'Processing' : 'Login'} className="max-w-sm">
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
      <Button onClick={handleLogin} className="mb-4">
        {buttonDisabled ? 'No Login' : 'Login'}
      </Button>
      <Link href={'/signup'}>Visit signup page</Link>
    </Container>
  )
}
