'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const nav = [
  { section: 'Overview' },
  { href: '/', icon: '◈', label: 'Dashboard', desc: 'Live metrics' },
  { href: '/systems', icon: '⬡', label: 'Systems', desc: 'ERP · CRM · WMS' },
  { section: 'Infrastructure' },
  { href: '/network', icon: '◎', label: 'Network', desc: 'VPC architecture' },
  { href: '/cicd', icon: '⟳', label: 'CI/CD Pipeline', desc: 'Auto deployment' },
  { href: '/monitoring', icon: '▣', label: 'Monitoring', desc: 'Auto-scaling' },
  { section: 'Business' },
  { href: '/inventory', icon: '▦', label: 'Inventory', desc: 'WMS · Stock' },
  { href: '/customers', icon: '◉', label: 'Customers', desc: 'CRM · Clients' },
  { href: '/orders', icon: '◆', label: 'Orders', desc: 'ERP · Wholesale' },
  { href: '/security', icon: '◈', label: 'Security', desc: 'VPN · Firewall' },
  { section: 'Analysis' },
  { href: '/compare', icon: '⊞', label: 'Comparisons', desc: 'Tech analysis' },
  { href: '/improvements', icon: '↑', label: 'Improvements', desc: 'D.P7 · Roadmap' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <nav style={{
      width: 240,
      background: 'rgba(255,255,255,0.03)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderRight: '1px solid rgba(255,255,255,0.07)',
      position: 'fixed', top: 0, left: 0, height: '100vh',
      display: 'flex', flexDirection: 'column', zIndex: 100, overflowY: 'auto',
    }}>

      {/* Logo */}
      <div style={{
        padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <div style={{
          width: 40, height: 40, borderRadius: 12, flexShrink: 0,
          background: 'linear-gradient(135deg,#4f46e5,#7c3aed,#06b6d4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 18, boxShadow: '0 4px 16px rgba(79,70,229,0.5)',
        }}>☁</div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: '-.3px', color: '#f1f5f9' }}>NexTextile</div>
          <div style={{ fontSize: 10, color: '#475569', marginTop: 1 }}>Cloud Platform · v2.4</div>
        </div>
      </div>

      {/* Nav */}
      <div style={{ padding: '16px 12px', flex: 1 }}>
        {nav.map((item, i) =>
          'section' in item ? (
            <div key={i} style={{
              fontSize: 9, fontWeight: 700, textTransform: 'uppercase',
              letterSpacing: '1px', color: '#334155',
              padding: '14px 8px 6px', marginTop: i > 0 ? 4 : 0,
            }}>{item.section}</div>
          ) : (
            <Link key={item.href} href={item.href!} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '9px 12px', borderRadius: 12,
              margin: '2px 0', textDecoration: 'none', transition: 'all .2s',
              background: pathname === item.href
                ? 'linear-gradient(135deg,rgba(79,70,229,0.3),rgba(124,58,237,0.2))'
                : 'transparent',
              border: pathname === item.href
                ? '1px solid rgba(167,139,250,0.3)'
                : '1px solid transparent',
              boxShadow: pathname === item.href
                ? '0 4px 16px rgba(79,70,229,0.2)'
                : 'none',
            }}>
              <div style={{
                width: 30, height: 30, borderRadius: 8, flexShrink: 0,
                background: pathname === item.href
                  ? 'linear-gradient(135deg,#4f46e5,#7c3aed)'
                  : 'rgba(255,255,255,0.05)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, color: pathname === item.href ? '#fff' : '#475569',
                boxShadow: pathname === item.href ? '0 2px 8px rgba(79,70,229,0.4)' : 'none',
                transition: 'all .2s',
              }}>{item.icon}</div>
              <div>
                <div style={{
                  fontSize: 12, fontWeight: 600,
                  color: pathname === item.href ? '#f1f5f9' : '#94a3b8',
                  transition: 'color .2s',
                }}>{item.label}</div>
                <div style={{ fontSize: 9, color: '#334155', marginTop: 1 }}>{item.desc}</div>
              </div>
            </Link>
          )
        )}
      </div>

      {/* Footer */}
      <div style={{
        padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <div style={{
          width: 8, height: 8, borderRadius: '50%', background: '#34d399', flexShrink: 0,
          boxShadow: '0 0 8px rgba(52,211,153,0.8)', animation: 'pulse 2s infinite',
        }}></div>
        <div>
          <div style={{ fontSize: 11, color: '#34d399', fontWeight: 600 }}>All Systems Operational</div>
          <div style={{ fontSize: 9, color: '#334155', marginTop: 1 }}>AWS eu-west-1 · 99.97% uptime</div>
        </div>
      </div>
    </nav>
  )
}
