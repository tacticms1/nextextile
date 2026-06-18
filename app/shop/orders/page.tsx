'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/components/AuthProvider'

interface Order {
  id: string; customer: string; product: string; qty: number
  price: number; date: string; status: string; warehouse: string
}

const SC: Record<string, { label: string; bg: string; color: string; border: string }> = {
  Fulfilled:  { label: '✓ Yetkazildi',   bg: '#d1fae5', color: '#059669', border: '#a7f3d0' },
  Packing:    { label: '📦 Qadoqlanmoqda', bg: '#dbeafe', color: '#2563eb', border: '#bfdbfe' },
  'In Review':{ label: '⏳ Koʻrib chiqilmoqda', bg: '#fef3c7', color: '#d97706', border: '#fde68a' },
  Cancelled:  { label: '✕ Bekor qilindi', bg: '#fee2e2', color: '#dc2626', border: '#fecaca' },
}

export default function MyOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const { user } = useAuth()

  useEffect(() => {
    fetch('/api/orders').then(r => r.json()).then((all: Order[]) => {
      setOrders(all.filter(o => o.customer === user?.name))
    })
  }, [user])

  const total = orders.filter(o => o.status !== 'Cancelled').reduce((a, o) => a + o.qty * o.price, 0)

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 28px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: '#1e293b' }}>Buyurtmalarim</h1>
          <div style={{ fontSize: 13, color: '#94a3b8', marginTop: 4 }}>
            {orders.length} ta buyurtma · Jami: <span style={{ color: '#6366f1', fontWeight: 700 }}>${total.toFixed(2)}</span>
          </div>
        </div>
        <Link href="/shop" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: 10,
          background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: '#fff',
          fontSize: 13, fontWeight: 700, textDecoration: 'none',
        }}>+ Yangi buyurtma</Link>
      </div>

      {orders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>📋</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#1e293b', marginBottom: 8 }}>Buyurtmalar yo'q</div>
          <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 24 }}>Do'kondan mahsulot tanlang va buyurtma bering</div>
          <Link href="/shop" style={{
            display: 'inline-flex', padding: '11px 24px', borderRadius: 12,
            background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: '#fff',
            fontSize: 13, fontWeight: 700, textDecoration: 'none',
          }}>Do'konga o'tish →</Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {orders.map(o => {
            const st = SC[o.status] || SC['In Review']
            return (
              <div key={o.id} style={{
                background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, padding: '18px 22px',
                display: 'flex', alignItems: 'center', gap: 18,
              }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: '#f0f4ff', border: '1px solid #e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>📦</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#1e293b', marginBottom: 3 }}>{o.product}</div>
                  <div style={{ fontSize: 11, color: '#94a3b8' }}>
                    {o.id} · {o.date} · {o.warehouse} · {o.qty.toLocaleString()} dona
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: '#6366f1' }}>${(o.qty * o.price).toLocaleString()}</div>
                  <div style={{ fontSize: 10, color: '#94a3b8' }}>${ o.price} × {o.qty}</div>
                </div>
                <span style={{
                  padding: '5px 12px', borderRadius: 20, fontSize: 11, fontWeight: 700,
                  background: st.bg, color: st.color, border: `1px solid ${st.border}`,
                  whiteSpace: 'nowrap', flexShrink: 0,
                }}>{st.label}</span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
