'use client'
import { createContext, useContext, useEffect, useState } from 'react'

export interface CartItem {
  id: string; sku: string; name: string; brand: string
  price: number; img: string; qty: number
}

interface CartCtx {
  items: CartItem[]
  add: (item: Omit<CartItem, 'qty'>) => void
  remove: (id: string) => void
  changeQty: (id: string, qty: number) => void
  clear: () => void
  total: number
  count: number
}

const Ctx = createContext<CartCtx>({
  items:[], add:()=>{}, remove:()=>{}, changeQty:()=>{}, clear:()=>{}, total:0, count:0,
})

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    try {
      const s = localStorage.getItem('nt_cart')
      if (s) setItems(JSON.parse(s))
    } catch {}
  }, [])

  const save = (next: CartItem[]) => {
    setItems(next)
    localStorage.setItem('nt_cart', JSON.stringify(next))
  }

  const add = (item: Omit<CartItem, 'qty'>) => {
    setItems(prev => {
      const exists = prev.find(i => i.id === item.id)
      const next = exists
        ? prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i)
        : [...prev, { ...item, qty: 1 }]
      localStorage.setItem('nt_cart', JSON.stringify(next))
      return next
    })
  }

  const remove = (id: string) => save(items.filter(i => i.id !== id))

  const changeQty = (id: string, qty: number) => {
    if (qty < 1) return remove(id)
    save(items.map(i => i.id === id ? { ...i, qty } : i))
  }

  const clear = () => save([])

  const total = items.reduce((a, i) => a + i.price * i.qty, 0)
  const count = items.reduce((a, i) => a + i.qty, 0)

  return <Ctx.Provider value={{ items, add, remove, changeQty, clear, total, count }}>{children}</Ctx.Provider>
}

export const useCart = () => useContext(Ctx)
