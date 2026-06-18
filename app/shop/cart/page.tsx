'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/components/CartProvider'
import { useAuth } from '@/components/AuthProvider'

export default function Cart() {
  const { items, remove, changeQty, clear, total, count } = useCart()
  const { user } = useAuth()
  const [ordered, setOrdered] = useState(false)
  const [loading, setLoading] = useState(false)
  const [note, setNote]       = useState('')

  const checkout = async () => {
    if (items.length === 0) return
    setLoading(true)
    for (const item of items) {
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: user?.name,
          product:  item.name,
          qty:      item.qty,
          price:    item.price,
          warehouse: 'WH-Tashkent',
        }),
      })
    }
    clear()
    setLoading(false)
    setOrdered(true)
  }

  if (ordered) {
    return (
      <div style={{ maxWidth: 560, margin: '80px auto', textAlign: 'center', padding: '0 24px' }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#d1fae5', border: '2px solid #a7f3d0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, margin: '0 auto 24px' }}>✓</div>
        <h2 style={{ fontSize: 24, fontWeight: 800, color: '#1e293b', marginBottom: 10 }}>Buyurtma qabul qilindi!</h2>
        <p style={{ fontSize: 14, color: '#64748b', marginBottom: 28, lineHeight: 1.6 }}>
          Buyurtmangiz muvaffaqiyatli joylashtirildi. Tez orada siz bilan bog'lanamiz.
        </p>
        <Link href="/shop" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '12px 28px', borderRadius: 12,
          background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: '#fff',
          fontSize: 14, fontWeight: 700, textDecoration: 'none',
          boxShadow: '0 4px 16px rgba(99,102,241,.35)',
        }}>← Do'konga qaytish</Link>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div style={{ maxWidth: 480, margin: '80px auto', textAlign: 'center', padding: '0 24px' }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>🛒</div>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: '#1e293b', marginBottom: 8 }}>Savatcha bo'sh</h2>
        <p style={{ fontSize: 14, color: '#94a3b8', marginBottom: 24 }}>Mahsulotlarni qo'shing va buyurtma bering</p>
        <Link href="/shop" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 28px', borderRadius: 12,
          background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: '#fff',
          fontSize: 14, fontWeight: 700, textDecoration: 'none',
        }}>Xarid qilish →</Link>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 28px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: '#1e293b' }}>Savatcha</h1>
          <div style={{ fontSize: 13, color: '#94a3b8', marginTop: 4 }}>{count} ta mahsulot</div>
        </div>
        <Link href="/shop" style={{ fontSize: 13, color: '#6366f1', textDecoration: 'none', fontWeight: 600 }}>← Do'konga qaytish</Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 24, alignItems: 'start' }}>

        {/* Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {items.map(item => (
            <div key={item.id} style={{
              background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16,
              padding: '18px 20px', display: 'flex', gap: 16, alignItems: 'center',
            }}>
              <img src={item.img} alt={item.name} style={{ width: 70, height: 70, borderRadius: 10, objectFit: 'cover', flexShrink: 0, border: '1px solid #f1f5f9' }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#1e293b', marginBottom: 2 }}>{item.name}</div>
                <div style={{ fontSize: 12, color: '#94a3b8' }}>{item.brand} · {item.sku}</div>
              </div>

              {/* Qty controls */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <button onClick={() => changeQty(item.id, item.qty - 1)} style={{
                  width: 30, height: 30, borderRadius: 8, border: '1px solid #e2e8f0',
                  background: '#f8fafc', cursor: 'pointer', fontSize: 16, fontWeight: 700, color: '#475569',
                }}>−</button>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#1e293b', minWidth: 28, textAlign: 'center' }}>{item.qty}</span>
                <button onClick={() => changeQty(item.id, item.qty + 1)} style={{
                  width: 30, height: 30, borderRadius: 8, border: '1px solid #e2e8f0',
                  background: '#f8fafc', cursor: 'pointer', fontSize: 16, fontWeight: 700, color: '#475569',
                }}>+</button>
              </div>

              <div style={{ textAlign: 'right', minWidth: 80 }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: '#6366f1' }}>${(item.price * item.qty).toFixed(2)}</div>
                <div style={{ fontSize: 10, color: '#94a3b8' }}>${item.price.toFixed(2)} × {item.qty}</div>
              </div>

              <button onClick={() => remove(item.id)} style={{
                width: 30, height: 30, borderRadius: 8, border: '1px solid #fecaca',
                background: '#fff5f5', cursor: 'pointer', fontSize: 14, color: '#ef4444', flexShrink: 0,
              }}>✕</button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, padding: 24, position: 'sticky', top: 80 }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: '#1e293b', marginBottom: 20 }}>Buyurtma xulosasi</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
            {items.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                <span style={{ color: '#64748b' }}>{item.name} × {item.qty}</span>
                <span style={{ fontWeight: 600, color: '#1e293b' }}>${(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: 14, marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 8 }}>
              <span style={{ color: '#64748b' }}>Yetkazib berish</span>
              <span style={{ color: '#10b981', fontWeight: 600 }}>Bepul</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 18, fontWeight: 800 }}>
              <span style={{ color: '#1e293b' }}>Jami</span>
              <span style={{ color: '#6366f1' }}>${total.toFixed(2)}</span>
            </div>
          </div>

          <textarea
            placeholder="Izoh (ixtiyoriy)..."
            value={note} onChange={e => setNote(e.target.value)}
            style={{
              width: '100%', padding: '10px 12px', borderRadius: 10,
              border: '1px solid #e2e8f0', fontSize: 12, color: '#475569',
              resize: 'none', height: 72, outline: 'none', marginBottom: 14,
              fontFamily: 'inherit', boxSizing: 'border-box',
            }}
          />

          <button onClick={checkout} disabled={loading} style={{
            width: '100%', padding: '14px', borderRadius: 12, border: 'none',
            background: loading ? '#c7d2fe' : 'linear-gradient(135deg,#6366f1,#8b5cf6)',
            color: '#fff', fontSize: 15, fontWeight: 800, cursor: loading ? 'not-allowed' : 'pointer',
            boxShadow: '0 4px 16px rgba(99,102,241,.35)', transition: 'all .2s',
          }}>
            {loading ? 'Joʼnatilmoqda...' : `Buyurtma berish — $${total.toFixed(2)}`}
          </button>

          <div style={{ marginTop: 14, display: 'flex', gap: 8, justifyContent: 'center' }}>
            {['🔒 Xavfsiz', '📦 Ulgurji', '✓ Kafolat'].map(t => (
              <span key={t} style={{ fontSize: 10, color: '#94a3b8' }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
