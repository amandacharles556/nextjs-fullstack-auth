'use client'
import { Input, Container, Button } from '@/components'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

export default function ProfilePage() {
  const router = useRouter()
  const [data, setData] = useState('nothing')
  const handleLogout = async () => {
    try {
      const response = await axios.get('/api/users/logout')
      toast.success('Logout successful')
      console.log('Logout success', response.data)
      router.push('/login')
    } catch (error: any) {
      console.log('Logout failed', error.message)
      toast.error(error.message)
    }
  }

  const getUserDetails = async () => {
    try {
      const res = await axios.get('/api/users/me')
      console.log(res.data)
      setData(res.data.data._id)
    } catch (error: any) {
      console.log('Failed getting user details', error.message)
      toast.error(error.message)
      router.push('/login')
    }
  }
  return (
    <Container title="Profile" className="max-w-sm">
      <p className="mb-4">Profile Page</p>
      <Button color="selected" className="mb-4">
        {data === 'nothing' ? 'Nothing' : <Link href={`/profile/${data}`}>{data}</Link>}
      </Button>
      <hr />
      <Button onClick={handleLogout} color="secondary" className="mb-4">
        Logout
      </Button>
      <Button onClick={getUserDetails}>Get user details</Button>
    </Container>
  )
}
