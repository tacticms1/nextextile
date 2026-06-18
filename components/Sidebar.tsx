'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from './AuthProvider'

const ADMIN_NAV = [
  { section: 'Asosiy' },
  { href: '/',          icon: '◈', label: 'Dashboard',     desc: 'Jonli metriklar' },
  { href: '/systems',   icon: '⬡', label: 'Tizimlar',      desc: 'ERP · CRM · WMS' },
  { section: 'Infratuzilma' },
  { href: '/network',   icon: '◎', label: 'Tarmoq',        desc: 'VPC arxitektura' },
  { href: '/cicd',      icon: '⟳', label: 'CI/CD Pipeline', desc: 'Avto deploy' },
  { href: '/monitoring',icon: '▣', label: 'Kuzatuv',       desc: 'Avto-scaling · Metriklar' },
  { section: 'Biznes' },
  { href: '/inventory', icon: '▦', label: 'Inventar',      desc: 'WMS · Ombor' },
  { href: '/customers', icon: '◉', label: 'Mijozlar (CRM)', desc: 'Buyurtmachilar' },
  { href: '/orders',    icon: '◆', label: 'Buyurtmalar',   desc: 'ERP · Ulgurji' },
  { href: '/suppliers', icon: '🏭', label: 'Ta\'minotchilar', desc: 'SRM · Yetkazib beruvchilar' },
  { href: '/security',  icon: '◈', label: 'Xavfsizlik',    desc: 'VPN · Firewall' },
  { section: 'Tahlil' },
  { href: '/compare',   icon: '⊞', label: 'Taqqoslash',    desc: 'Texnologiya tahlili' },
  { href: '/improvements', icon: '↑', label: 'Yaxshilashlar', desc: 'D.P7 · Yo\'l xaritasi' },
]

const USER_NAV = [
  { section: 'Asosiy' },
  { href: '/',          icon: '◈', label: 'Dashboard',     desc: 'Jonli metriklar' },
  { section: 'Biznes' },
  { href: '/inventory', icon: '▦', label: 'Inventar',      desc: 'Mahsulotlar' },
  { href: '/customers', icon: '◉', label: 'Mijozlar',      desc: 'Buyurtmachilar' },
  { href: '/orders',    icon: '◆', label: 'Buyurtmalar',   desc: 'Ulgurji buyurtmalar' },
  { href: '/suppliers', icon: '🏭', label: 'Ta\'minotchilar', desc: 'Yetkazib beruvchilar' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const nav = user?.role === 'admin' ? ADMIN_NAV : USER_NAV

  return (
    <nav style={{
      width: 252,
      background: '#ffffff',
      borderRight: '1px solid #e2e8f0',
      position: 'fixed', top: 0, left: 0, height: '100vh',
      display: 'flex', flexDirection: 'column', zIndex: 100, overflowY: 'auto',
      boxShadow: '2px 0 16px rgba(99,102,241,.06)',
    }}>

      {/* Logo */}
      <div style={{ padding:'20px 18px', borderBottom:'1px solid #f1f5f9', display:'flex', alignItems:'center', gap:12 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 12, flexShrink: 0,
          background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 18, boxShadow: '0 4px 14px rgba(99,102,241,.4)',
          color: '#fff', fontWeight: 800,
        }}>N</div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#1e293b' }}>NexTextile</div>
          <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 1 }}>Cloud Platform · v3.0</div>
        </div>
      </div>

      {/* User badge */}
      {user && (
        <div style={{ margin:'12px 12px 0', padding:'10px 12px', borderRadius:10, background: user.role==='admin' ? '#ede9fe' : '#dbeafe', border:`1px solid ${user.role==='admin'?'#ddd6fe':'#bfdbfe'}` }}>
          <div style={{ fontSize:11, fontWeight:700, color: user.role==='admin'?'#7c3aed':'#2563eb' }}>
            {user.role==='admin' ? '👑 Admin' : '👤 Foydalanuvchi'}
          </div>
          <div style={{ fontSize:11, color:'#64748b', marginTop:2, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{user.name}</div>
        </div>
      )}

      {/* Nav */}
      <div style={{ padding:'12px 10px', flex: 1 }}>
        {nav.map((item, i) =>
          'section' in item ? (
            <div key={i} style={{
              fontSize: 9, fontWeight: 700, textTransform: 'uppercase',
              letterSpacing: '1px', color: '#94a3b8',
              padding: '14px 10px 6px', marginTop: i > 0 ? 2 : 0,
            }}>{item.section}</div>
          ) : (
            <Link key={item.href} href={item.href!} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '9px 10px', borderRadius: 10,
              margin: '2px 0', textDecoration: 'none', transition: 'all .18s',
              background: pathname === item.href ? 'linear-gradient(135deg,rgba(99,102,241,.12),rgba(139,92,246,.08))' : 'transparent',
              border: pathname === item.href ? '1px solid rgba(99,102,241,.2)' : '1px solid transparent',
            }}>
              <div style={{
                width: 30, height: 30, borderRadius: 8, flexShrink: 0,
                background: pathname === item.href ? 'linear-gradient(135deg,#6366f1,#8b5cf6)' : '#f8fafc',
                border: pathname === item.href ? 'none' : '1px solid #e2e8f0',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, color: pathname === item.href ? '#fff' : '#94a3b8',
                transition: 'all .18s',
              }}>{item.icon}</div>
              <div>
                <div style={{
                  fontSize: 12, fontWeight: 600,
                  color: pathname === item.href ? '#6366f1' : '#475569',
                }}>{item.label}</div>
                <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 1 }}>{item.desc}</div>
              </div>
            </Link>
          )
        )}
      </div>

      {/* Footer */}
      <div style={{ padding:'14px 16px', borderTop:'1px solid #f1f5f9' }}>
        <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:10 }}>
          <div style={{ width:8, height:8, borderRadius:'50%', background:'#10b981', flexShrink:0, boxShadow:'0 0 6px rgba(16,185,129,.6)', animation:'pulse 2s infinite' }}></div>
          <div style={{ fontSize:11, color:'#10b981', fontWeight:600 }}>Barcha tizimlar ishlayapti</div>
        </div>
        <button onClick={logout} style={{
          width:'100%', padding:'8px 14px', borderRadius:8,
          background:'#fff', border:'1px solid #e2e8f0',
          color:'#ef4444', fontSize:12, fontWeight:600, cursor:'pointer',
          transition:'all .2s', display:'flex', alignItems:'center', justifyContent:'center', gap:6,
        }}>
          ← Chiqish
        </button>
      </div>
    </nav>
  )
}
