'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

export type Role = 'admin' | 'user'
export interface AuthUser { name: string; role: Role; email: string }

interface AuthCtx {
  user: AuthUser | null
  login: (email: string, password: string) => boolean
  logout: () => void
}

const Ctx = createContext<AuthCtx>({ user: null, login: () => false, logout: () => {} })

const ACCOUNTS = [
  { email: 'admin@nextextile.uz', password: 'admin123', name: 'Ibrohim Baxtiyorov', role: 'admin' as Role },
  { email: 'user@nextextile.uz',  password: 'user123',  name: 'Foydalanuvchi',      role: 'user'  as Role },
]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [ready, setReady] = useState(false)
  const router   = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    try {
      const stored = localStorage.getItem('nt_user')
      if (stored) setUser(JSON.parse(stored))
    } catch {}
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    if (!user && pathname !== '/login') router.replace('/login')
    if (user  && pathname === '/login') router.replace('/')
  }, [user, ready, pathname, router])

  const login = (email: string, password: string) => {
    const acc = ACCOUNTS.find(a => a.email === email && a.password === password)
    if (!acc) return false
    const u: AuthUser = { name: acc.name, role: acc.role, email: acc.email }
    setUser(u)
    localStorage.setItem('nt_user', JSON.stringify(u))
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('nt_user')
    router.push('/login')
  }

  if (!ready) return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:'100vh', background:'var(--bg)' }}>
      <div style={{ width:36, height:36, borderRadius:'50%', border:'3px solid #e2e8f0', borderTopColor:'#6366f1', animation:'spin 0.8s linear infinite' }} />
    </div>
  )

  return <Ctx.Provider value={{ user, login, logout }}>{children}</Ctx.Provider>
}

export const useAuth = () => useContext(Ctx)
