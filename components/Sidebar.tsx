'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const nav = [
  { section: 'Overview' },
  { href: '/', icon: '📊', label: 'Dashboard' },
  { href: '/systems', icon: '🖥️', label: 'Systems' },
  { section: 'Infrastructure' },
  { href: '/network', icon: '🌐', label: 'Network Architecture' },
  { href: '/cicd', icon: '🔄', label: 'CI/CD Pipeline' },
  { href: '/monitoring', icon: '📈', label: 'Monitoring & Scaling' },
  { section: 'Business' },
  { href: '/inventory', icon: '📦', label: 'Inventory (WMS)' },
  { href: '/customers', icon: '👥', label: 'Customers (CRM)' },
  { href: '/orders', icon: '🛒', label: 'Orders (ERP)' },
  { href: '/security', icon: '🔒', label: 'Security' },
  { section: 'Analysis' },
  { href: '/compare', icon: '⚖️', label: 'Comparisons (D Block)' },
  { href: '/improvements', icon: '📈', label: 'Improvements (D.P7)' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <nav style={{
      width: 250, background: 'var(--bg2)', borderRight: '1px solid var(--bd)',
      position: 'fixed', top: 0, left: 0, height: '100vh', display: 'flex',
      flexDirection: 'column', zIndex: 100, overflowY: 'auto'
    }}>
      {/* Logo */}
      <div style={{ padding: '20px 18px', borderBottom: '1px solid var(--bd)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 38, height: 38, borderRadius: 9, flexShrink: 0,
          background: 'linear-gradient(135deg,#58a6ff,#a371f7)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17
        }}>☁️</div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700 }}>NexTextile</div>
          <div style={{ fontSize: 10, color: 'var(--tx2)' }}>Cloud Platform v2.4</div>
        </div>
      </div>

      {/* Nav */}
      <div style={{ padding: '14px 0', flex: 1 }}>
        {nav.map((item, i) =>
          'section' in item ? (
            <div key={i} style={{
              fontSize: 10, textTransform: 'uppercase', letterSpacing: '.8px',
              color: 'var(--tx3)', padding: '10px 18px 4px', marginTop: i > 0 ? 8 : 0
            }}>{item.section}</div>
          ) : (
            <Link key={item.href} href={item.href!} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '9px 18px', fontSize: 13, textDecoration: 'none',
              borderRadius: 6, margin: '1px 8px', transition: 'all .2s',
              background: pathname === item.href ? 'rgba(88,166,255,.1)' : 'transparent',
              color: pathname === item.href ? 'var(--blue)' : 'var(--tx2)',
              borderLeft: pathname === item.href ? '3px solid var(--blue)' : '3px solid transparent',
            }}>
              <span style={{ width: 16, textAlign: 'center' }}>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          )
        )}
      </div>

      {/* Footer */}
      <div style={{ padding: '14px 18px', borderTop: '1px solid var(--bd)', fontSize: 12, color: 'var(--green)' }}>
        <span style={{
          display: 'inline-block', width: 8, height: 8, borderRadius: '50%',
          background: 'var(--green)', marginRight: 6,
          animation: 'pulse 2s infinite'
        }}></span>
        All Systems Operational
      </div>
    </nav>
  )
}
