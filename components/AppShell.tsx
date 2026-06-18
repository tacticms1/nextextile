'use client'
import { usePathname } from 'next/navigation'
import { useAuth } from './AuthProvider'
import Sidebar from './Sidebar'
import ShopNav from './ShopNav'

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { user } = useAuth()

  if (pathname === '/login' || !user) {
    return <>{children}</>
  }

  if (user.role === 'user') {
    return (
      <>
        <ShopNav />
        <main style={{ paddingTop: 64, minHeight: '100vh', background: 'var(--bg)' }}>
          {children}
        </main>
      </>
    )
  }

  // Admin
  return (
    <div style={{ display:'flex', minHeight:'100vh' }}>
      <Sidebar />
      <main style={{ flex:1, marginLeft:252, minHeight:'100vh', display:'flex', flexDirection:'column' }}>
        {children}
      </main>
    </div>
  )
}
