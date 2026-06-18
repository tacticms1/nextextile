'use client'
import { useEffect, useState } from 'react'
import { useCart } from '@/components/CartProvider'

interface Product {
  id: string; sku: string; name: string; brand: string
  category: string; stock: number; price: number; img: string
}

const CATS = ['Barchasi', 'Apparel', 'Footwear', 'Outerwear', 'Accessories']
const CAT_UZ: Record<string, string> = {
  Apparel: 'Kiyimlar', Footwear: 'Oyoq kiyimlari',
  Outerwear: 'Ustki kiyimlar', Accessories: 'Aksessuarlar',
}

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([])
  const [q, setQ]               = useState('')
  const [cat, setCat]           = useState('Barchasi')
  const [added, setAdded]       = useState<Record<string, boolean>>({})
  const { add }                 = useCart()

  useEffect(() => {
    fetch('/api/inventory').then(r => r.json()).then(setProducts)
  }, [])

  const filtered = products.filter(p => {
    const matchQ   = !q || p.name.toLowerCase().includes(q.toLowerCase()) || p.brand.toLowerCase().includes(q.toLowerCase())
    const matchCat = cat === 'Barchasi' || p.category === cat
    return matchQ && matchCat
  })

  const handleAdd = (p: Product) => {
    add({ id: p.id, sku: p.sku, name: p.name, brand: p.brand, price: p.price, img: p.img })
    setAdded(a => ({ ...a, [p.id]: true }))
    setTimeout(() => setAdded(a => ({ ...a, [p.id]: false })), 1500)
  }

  const badge = (p: Product) => {
    if (p.stock > 3000) return { label: '🔥 Top sotuv', bg: '#fef3c7', color: '#d97706', border: '#fde68a' }
    if (p.stock < p.stock * 0.3 || p.stock < 200) return { label: '⚡ Kam qoldi', bg: '#fee2e2', color: '#dc2626', border: '#fecaca' }
    return null
  }

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 28px' }}>

      {/* Hero */}
      <div style={{
        borderRadius: 20, marginBottom: 32, padding: '36px 40px',
        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', overflow: 'hidden', position: 'relative',
      }}>
        <div style={{ position:'absolute', top:-40, right:-40, width:200, height:200, borderRadius:'50%', background:'rgba(255,255,255,.07)' }} />
        <div style={{ position:'absolute', bottom:-30, right:120, width:140, height:140, borderRadius:'50%', background:'rgba(255,255,255,.05)' }} />
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,.7)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 }}>NexTextile Wholesale</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#fff', marginBottom: 10, lineHeight: 1.2 }}>
            Ulgurji Tekstil<br />Do'koni
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,.8)', maxWidth: 380 }}>
            Eng sifatli kiyimlar, oyoq kiyimlari va aksessuarlar. Ulgurji narxlarda buyurtma bering.
          </p>
        </div>
        <div style={{ fontSize: 80, opacity: .25, flexShrink: 0, userSelect: 'none' }}>👗</div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 220 }}>
          <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 14, color: '#94a3b8' }}>🔍</span>
          <input
            placeholder="Mahsulot qidiring..."
            value={q} onChange={e => setQ(e.target.value)}
            style={{
              width: '100%', padding: '10px 14px 10px 38px', borderRadius: 12,
              border: '1px solid #e2e8f0', background: '#fff', fontSize: 13, color: '#1e293b',
              outline: 'none', boxSizing: 'border-box',
            }}
          />
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {CATS.map(c => (
            <button key={c} onClick={() => setCat(c)} style={{
              padding: '8px 18px', borderRadius: 20, border: `1px solid ${cat === c ? '#6366f1' : '#e2e8f0'}`,
              background: cat === c ? '#6366f1' : '#fff', color: cat === c ? '#fff' : '#64748b',
              fontSize: 12, fontWeight: 600, cursor: 'pointer', transition: 'all .18s',
            }}>{c === 'Barchasi' ? c : (CAT_UZ[c] || c)}</button>
          ))}
        </div>
      </div>

      {/* Count */}
      <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 20 }}>
        <span style={{ fontWeight: 700, color: '#1e293b' }}>{filtered.length}</span> ta mahsulot topildi
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20 }}>
        {filtered.map(p => {
          const b = badge(p)
          const isAdded = added[p.id]
          return (
            <div key={p.id} style={{
              background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16,
              overflow: 'hidden', transition: 'all .2s', boxShadow: '0 1px 4px rgba(0,0,0,.04)',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = '#c7d2fe'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 24px rgba(99,102,241,.1)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = '#e2e8f0'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 1px 4px rgba(0,0,0,.04)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)' }}
            >
              {/* Image */}
              <div style={{ position: 'relative', height: 200, overflow: 'hidden', background: '#f8fafc' }}>
                <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                {b && (
                  <span style={{
                    position: 'absolute', top: 10, left: 10, padding: '4px 10px',
                    borderRadius: 20, fontSize: 10, fontWeight: 700,
                    background: b.bg, color: b.color, border: `1px solid ${b.border}`,
                  }}>{b.label}</span>
                )}
                <span style={{
                  position: 'absolute', top: 10, right: 10, padding: '3px 8px',
                  borderRadius: 6, fontSize: 10, fontWeight: 600,
                  background: 'rgba(255,255,255,.92)', color: '#64748b', border: '1px solid #e2e8f0',
                }}>{CAT_UZ[p.category] || p.category}</span>
              </div>

              {/* Info */}
              <div style={{ padding: '16px 18px 18px' }}>
                <div style={{ fontSize: 10, color: '#94a3b8', fontWeight: 600, marginBottom: 4 }}>{p.brand}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#1e293b', marginBottom: 4, lineHeight: 1.3 }}>{p.name}</div>
                <div style={{ fontSize: 10, color: '#94a3b8', marginBottom: 12 }}>
                  SKU: {p.sku} · {p.stock.toLocaleString()} dona mavjud
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: 20, fontWeight: 800, color: '#6366f1' }}>${p.price.toFixed(2)}</div>
                    <div style={{ fontSize: 10, color: '#94a3b8' }}>dona narxi</div>
                  </div>
                  <button onClick={() => handleAdd(p)} style={{
                    padding: '9px 18px', borderRadius: 10, border: 'none',
                    background: isAdded ? '#d1fae5' : 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                    color: isAdded ? '#059669' : '#fff', fontSize: 12, fontWeight: 700,
                    cursor: 'pointer', transition: 'all .2s',
                    boxShadow: isAdded ? 'none' : '0 4px 12px rgba(99,102,241,.3)',
                  }}>
                    {isAdded ? '✓ Qo\'shildi' : '+ Savat'}
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#94a3b8' }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
          <div style={{ fontSize: 16, fontWeight: 600, color: '#1e293b' }}>Mahsulot topilmadi</div>
          <div style={{ fontSize: 13, marginTop: 6 }}>Boshqa so'z bilan qidiring</div>
        </div>
      )}
    </div>
  )
}
