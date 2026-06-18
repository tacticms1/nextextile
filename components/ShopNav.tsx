'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from './AuthProvider'
import { useCart } from './CartProvider'

export default function ShopNav() {
  const { user, logout } = useAuth()
  const { count } = useCart()
  const pathname = usePathname()

  const links = [
    { href: '/shop',       label: 'Mahsulotlar' },
    { href: '/shop/orders', label: 'Buyurtmalarim' },
  ]

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, height: 64, zIndex: 100,
      background: '#ffffff', borderBottom: '1px solid #e2e8f0',
      display: 'flex', alignItems: 'center', padding: '0 32px',
      gap: 32, boxShadow: '0 1px 12px rgba(99,102,241,.08)',
    }}>
      {/* Logo */}
      <Link href="/shop" style={{ display:'flex', alignItems:'center', gap:10, textDecoration:'none', flexShrink:0 }}>
        <div style={{ width:36, height:36, borderRadius:10, background:'linear-gradient(135deg,#6366f1,#8b5cf6)', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:800, fontSize:16 }}>N</div>
        <div>
          <div style={{ fontSize:14, fontWeight:800, color:'#1e293b' }}>NexTextile</div>
          <div style={{ fontSize:9, color:'#94a3b8', marginTop:-1 }}>Ulgurji do'kon</div>
        </div>
      </Link>

      {/* Nav links */}
      <div style={{ display:'flex', gap:4, flex:1 }}>
        {links.map(l => (
          <Link key={l.href} href={l.href} style={{
            padding: '7px 16px', borderRadius: 8,
            fontSize: 13, fontWeight: 600, textDecoration: 'none',
            color: pathname.startsWith(l.href) ? '#6366f1' : '#475569',
            background: pathname.startsWith(l.href) ? '#ede9fe' : 'transparent',
            transition: 'all .18s',
          }}>{l.label}</Link>
        ))}
      </div>

      {/* Right */}
      <div style={{ display:'flex', alignItems:'center', gap:12 }}>
        {/* Cart */}
        <Link href="/shop/cart" style={{
          position: 'relative', display:'flex', alignItems:'center', justifyContent:'center',
          width: 40, height: 40, borderRadius: 10,
          background: count > 0 ? '#ede9fe' : '#f8fafc',
          border: `1px solid ${count > 0 ? '#ddd6fe' : '#e2e8f0'}`,
          textDecoration: 'none', transition: 'all .2s',
        }}>
          <span style={{ fontSize: 18 }}>🛒</span>
          {count > 0 && (
            <div style={{
              position:'absolute', top:-6, right:-6, width:20, height:20,
              borderRadius:'50%', background:'#6366f1', color:'#fff',
              fontSize:10, fontWeight:800, display:'flex', alignItems:'center', justifyContent:'center',
              border:'2px solid #fff',
            }}>{count > 99 ? '99+' : count}</div>
          )}
        </Link>

        {/* User */}
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <div style={{ width:34, height:34, borderRadius:'50%', background:'linear-gradient(135deg,#6366f1,#8b5cf6)', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:13, fontWeight:700 }}>
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <div style={{ fontSize:12, fontWeight:600, color:'#1e293b' }}>{user?.name}</div>
            <button onClick={logout} style={{ fontSize:10, color:'#94a3b8', background:'none', border:'none', cursor:'pointer', padding:0, textAlign:'left' }}>Chiqish</button>
          </div>
        </div>
      </div>
    </nav>
  )
}
