import { Input, Container } from '@/components'

export default function UserProfilePage({ params }: any) {
  return (
    <Container title="User Profile" className="max-w-sm">
      <p className="text-4xl">
        Profile Page
        <span className="p-2 ml-2 rounded bg-orange-500 text-black">{params.id}</span>
      </p>
    </Container>
  )
}
