import { NextRequest, NextResponse } from 'next/server'

export interface Order {
  id: string
  customer: string
  product: string
  qty: number
  price: number
  date: string
  status: 'Fulfilled' | 'Packing' | 'In Review' | 'Cancelled'
  warehouse: string
}

let orders: Order[] = [
  { id:'ORD-8841', customer:'SportZone Distributors', product:'Air Runner Pro X', qty:200, price:89.99, date:'2026-06-11', status:'Fulfilled', warehouse:'WH-Tashkent' },
  { id:'ORD-8840', customer:'Fashion Hub Uzbekistan', product:'StyleCraft Denim', qty:500, price:74.99, date:'2026-06-12', status:'Packing', warehouse:'WH-Tashkent' },
  { id:'ORD-8839', customer:'Urban Retail Group', product:'UrbanEdge Tee', qty:1000, price:24.99, date:'2026-06-12', status:'In Review', warehouse:'WH-Samarkand' },
  { id:'ORD-8838', customer:'NorthSport Ltd.', product:'NorthPeak Jacket', qty:150, price:159.99, date:'2026-06-10', status:'Fulfilled', warehouse:'WH-Tashkent' },
  { id:'ORD-8837', customer:'ActiveZone Kazakhstan', product:'FlexGear Hoodie', qty:400, price:54.99, date:'2026-06-09', status:'Fulfilled', warehouse:'WH-Samarkand' },
  { id:'ORD-8836', customer:'Gulf Sports Trading', product:'SwiftStep CloudRun', qty:80, price:129.99, date:'2026-06-08', status:'Fulfilled', warehouse:'WH-Tashkent' },
  { id:'ORD-8835', customer:'London Wholesale Fashion', product:'StyleCraft Blazer', qty:120, price:139.99, date:'2026-06-05', status:'Fulfilled', warehouse:'WH-Tashkent' },
  { id:'ORD-8834', customer:'Almaty Fashion Center', product:'CoreWear Cotton Pack', qty:600, price:49.99, date:'2026-06-07', status:'Packing', warehouse:'WH-Samarkand' },
  { id:'ORD-8833', customer:'Dubai Textile Hub', product:'Air Runner Pro X', qty:300, price:89.99, date:'2026-06-03', status:'Fulfilled', warehouse:'WH-Tashkent' },
  { id:'ORD-8832', customer:'TashSport Trade', product:'ActivePro Shorts', qty:50, price:34.99, date:'2026-05-28', status:'Cancelled', warehouse:'WH-Tashkent' },
]

export async function GET() {
  return NextResponse.json(orders)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const lastNum = orders.length > 0 ? parseInt(orders[0].id.split('-')[1]) + 1 : 8842
  const order: Order = {
    ...body,
    id: `ORD-${lastNum}`,
    date: new Date().toISOString().slice(0, 10),
    status: 'In Review',
    warehouse: 'WH-Tashkent',
  }
  orders.unshift(order)
  return NextResponse.json(order, { status: 201 })
}

export async function PUT(req: NextRequest) {
  const body = await req.json()
  const idx = orders.findIndex(o => o.id === body.id)
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  orders[idx] = { ...orders[idx], ...body }
  return NextResponse.json(orders[idx])
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json()
  orders = orders.filter(o => o.id !== id)
  return NextResponse.json({ success: true })
}
