'use client'
import { usePathname } from 'next/navigation'
import { useAuth } from './AuthProvider'
import Sidebar from './Sidebar'

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { user } = useAuth()

  if (pathname === '/login' || !user) {
    return <>{children}</>
  }

  return (
    <div style={{ display:'flex', minHeight:'100vh' }}>
      <Sidebar />
      <main style={{ flex:1, marginLeft:252, minHeight:'100vh', display:'flex', flexDirection:'column' }}>
        {children}
      </main>
    </div>
  )
}
