'use client'
import { useState } from 'react'
import { useAuth } from '@/components/AuthProvider'

export default function Login() {
  const { login } = useAuth()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    await new Promise(r => setTimeout(r, 400))
    const ok = login(email, password)
    if (!ok) { setError("Email yoki parol noto'g'ri"); setLoading(false) }
  }

  const quickLogin = (role: 'admin' | 'user') => {
    if (role === 'admin') { setEmail('admin@nextextile.uz'); setPassword('admin123') }
    else                  { setEmail('user@nextextile.uz');  setPassword('user123') }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0f2ff 0%, #faf5ff 50%, #eff6ff 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 20,
    }}>
      {/* Decorative blobs */}
      <div style={{ position:'fixed', top:'-10%', right:'-5%', width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle, rgba(99,102,241,.12) 0%, transparent 70%)', pointerEvents:'none' }} />
      <div style={{ position:'fixed', bottom:'-10%', left:'-5%', width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle, rgba(139,92,246,.1) 0%, transparent 70%)', pointerEvents:'none' }} />

      <div style={{ display:'flex', width:'100%', maxWidth:980, gap:60, alignItems:'center', justifyContent:'center' }}>

        {/* Left: Branding */}
        <div style={{ flex:1, display:'flex', flexDirection:'column', gap:28, maxWidth:420 }}>
          {/* Logo */}
          <div style={{ display:'flex', alignItems:'center', gap:14 }}>
            <div style={{ width:52, height:52, borderRadius:16, background:'linear-gradient(135deg,#6366f1,#8b5cf6)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:26, color:'#fff', fontWeight:900, boxShadow:'0 8px 24px rgba(99,102,241,.4)' }}>N</div>
            <div>
              <div style={{ fontSize:22, fontWeight:800, color:'#1e293b', letterSpacing:'-0.5px' }}>NexTextile</div>
              <div style={{ fontSize:12, color:'#94a3b8' }}>Cloud Platform · v3.0</div>
            </div>
          </div>

          <div>
            <h1 style={{ fontSize:32, fontWeight:800, color:'#1e293b', lineHeight:1.2, marginBottom:12 }}>
              Ulgurji savdo<br />
              <span style={{ background:'linear-gradient(90deg,#6366f1,#8b5cf6)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>boshqaruv tizimi</span>
            </h1>
            <p style={{ fontSize:14, color:'#64748b', lineHeight:1.6 }}>
              ERP, CRM, WMS va SRM tizimlarini bir joyda boshqaring.
              Inventar, mijozlar, buyurtmalar va ta'minotchilarni kuzating.
            </p>
          </div>

          {/* Features */}
          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            {[
              { icon:'📦', title:'Inventar boshqaruvi', desc:'Real-vaqt ombor hisobi' },
              { icon:'👥', title:'Mijozlar (CRM)', desc:'Ulgurji buyurtmachilar' },
              { icon:'🏭', title:"Ta'minotchilar (SRM)", desc:"Yetkazib beruvchilar bilan ishlang" },
            ].map(f => (
              <div key={f.title} style={{ display:'flex', gap:12, alignItems:'center' }}>
                <div style={{ width:36, height:36, borderRadius:10, background:'#fff', border:'1px solid #e2e8f0', display:'flex', alignItems:'center', justifyContent:'center', fontSize:16, boxShadow:'0 2px 8px rgba(0,0,0,.06)', flexShrink:0 }}>{f.icon}</div>
                <div>
                  <div style={{ fontSize:13, fontWeight:600, color:'#1e293b' }}>{f.title}</div>
                  <div style={{ fontSize:11, color:'#94a3b8' }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Login Card */}
        <div style={{ width:380, background:'#ffffff', borderRadius:24, border:'1px solid #e2e8f0', padding:36, boxShadow:'0 8px 40px rgba(99,102,241,.12)' }}>
          <div style={{ marginBottom:28 }}>
            <h2 style={{ fontSize:22, fontWeight:800, color:'#1e293b', marginBottom:6 }}>Kirish</h2>
            <p style={{ fontSize:13, color:'#94a3b8' }}>Hisobingizga kiring</p>
          </div>

          {/* Quick login shortcuts */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:24 }}>
            <button onClick={() => quickLogin('admin')} style={{
              padding:'10px 14px', borderRadius:10, border:'1px solid #ddd6fe',
              background:'#f5f3ff', cursor:'pointer', transition:'all .18s',
              display:'flex', flexDirection:'column', alignItems:'flex-start', gap:2,
            }}>
              <span style={{ fontSize:14 }}>👑</span>
              <span style={{ fontSize:11, fontWeight:700, color:'#7c3aed' }}>Admin</span>
              <span style={{ fontSize:10, color:'#94a3b8' }}>To'liq huquq</span>
            </button>
            <button onClick={() => quickLogin('user')} style={{
              padding:'10px 14px', borderRadius:10, border:'1px solid #bfdbfe',
              background:'#eff6ff', cursor:'pointer', transition:'all .18s',
              display:'flex', flexDirection:'column', alignItems:'flex-start', gap:2,
            }}>
              <span style={{ fontSize:14 }}>👤</span>
              <span style={{ fontSize:11, fontWeight:700, color:'#2563eb' }}>Foydalanuvchi</span>
              <span style={{ fontSize:10, color:'#94a3b8' }}>Cheklangan kirish</span>
            </button>
          </div>

          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:20 }}>
            <div style={{ flex:1, height:1, background:'#e2e8f0' }} />
            <span style={{ fontSize:11, color:'#94a3b8' }}>yoki qo'lda kiriting</span>
            <div style={{ flex:1, height:1, background:'#e2e8f0' }} />
          </div>

          <form onSubmit={submit}>
            <div style={{ marginBottom:14 }}>
              <label style={{ fontSize:12, fontWeight:600, color:'#475569', display:'block', marginBottom:6 }}>Email</label>
              <input
                type="email" required value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@nextextile.uz"
                style={{
                  width:'100%', padding:'11px 14px', borderRadius:10,
                  border:`1px solid ${error?'#fecaca':'#e2e8f0'}`,
                  background:'#f8fafc', fontSize:13, color:'#1e293b',
                  outline:'none', transition:'all .2s', boxSizing:'border-box',
                }}
                onFocus={e => e.target.style.borderColor='#a5b4fc'}
                onBlur={e => e.target.style.borderColor=error?'#fecaca':'#e2e8f0'}
              />
            </div>
            <div style={{ marginBottom:20 }}>
              <label style={{ fontSize:12, fontWeight:600, color:'#475569', display:'block', marginBottom:6 }}>Parol</label>
              <input
                type="password" required value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width:'100%', padding:'11px 14px', borderRadius:10,
                  border:`1px solid ${error?'#fecaca':'#e2e8f0'}`,
                  background:'#f8fafc', fontSize:13, color:'#1e293b',
                  outline:'none', transition:'all .2s', boxSizing:'border-box',
                }}
                onFocus={e => e.target.style.borderColor='#a5b4fc'}
                onBlur={e => e.target.style.borderColor=error?'#fecaca':'#e2e8f0'}
              />
            </div>

            {error && (
              <div style={{ marginBottom:14, padding:'10px 14px', borderRadius:8, background:'#fee2e2', border:'1px solid #fecaca', fontSize:12, color:'#dc2626', display:'flex', gap:6, alignItems:'center' }}>
                ⚠ {error}
              </div>
            )}

            <button type="submit" disabled={loading} style={{
              width:'100%', padding:'12px', borderRadius:12,
              background: loading ? '#c7d2fe' : 'linear-gradient(135deg,#6366f1,#8b5cf6)',
              border:'none', color:'#fff', fontSize:14, fontWeight:700,
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow:'0 4px 16px rgba(99,102,241,.35)',
              transition:'all .2s', display:'flex', alignItems:'center', justifyContent:'center', gap:8,
            }}>
              {loading ? (
                <>
                  <div style={{ width:16, height:16, borderRadius:'50%', border:'2px solid rgba(255,255,255,.3)', borderTopColor:'#fff', animation:'spin .6s linear infinite' }} />
                  Yuklanmoqda...
                </>
              ) : 'Kirish →'}
            </button>
          </form>

          {/* Credentials hint */}
          <div style={{ marginTop:20, padding:'12px 14px', borderRadius:10, background:'#f8fafc', border:'1px solid #f1f5f9' }}>
            <div style={{ fontSize:10, color:'#94a3b8', fontWeight:600, marginBottom:6, textTransform:'uppercase', letterSpacing:'.5px' }}>Demo hisoblar</div>
            <div style={{ fontSize:11, color:'#64748b', display:'flex', flexDirection:'column', gap:4 }}>
              <span>👑 admin@nextextile.uz / admin123</span>
              <span>👤 user@nextextile.uz / user123</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
