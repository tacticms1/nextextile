import { NextRequest, NextResponse } from 'next/server'

export interface Product {
  id: string
  sku: string
  name: string
  brand: string
  category: string
  stock: number
  minStock: number
  price: number
  img: string
}

let inventory: Product[] = [
  { id:'1', sku:'SM-AR-001', name:'Air Runner Pro X', brand:'SportMax', category:'Footwear', stock:1240, minStock:200, price:89.99, img:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=80&q=80' },
  { id:'2', sku:'UE-CS-002', name:'Classic Streetwear Tee', brand:'UrbanEdge', category:'Apparel', stock:3580, minStock:500, price:24.99, img:'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=80&q=80' },
  { id:'3', sku:'NP-TG-003', name:'ThermoGuard Jacket', brand:'NorthPeak', category:'Outerwear', stock:892, minStock:150, price:159.99, img:'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=80&q=80' },
  { id:'4', sku:'SC-PD-004', name:'Premium Denim Collection', brand:'StyleCraft', category:'Apparel', stock:2100, minStock:300, price:74.99, img:'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=80&q=80' },
  { id:'5', sku:'FG-PH-005', name:'Pro Performance Hoodie', brand:'FlexGear', category:'Apparel', stock:1760, minStock:250, price:54.99, img:'https://images.unsplash.com/photo-1556906781-9a412961a28e?w=80&q=80' },
  { id:'6', sku:'SS-CR-006', name:'CloudRun Elite V2', brand:'SwiftStep', category:'Footwear', stock:540, minStock:600, price:129.99, img:'https://images.unsplash.com/photo-1539185441755-769473a23570?w=80&q=80' },
  { id:'7', sku:'AP-TS-007', name:'DryFit Training Shorts', brand:'ActivePro', category:'Apparel', stock:4200, minStock:400, price:34.99, img:'https://images.unsplash.com/photo-1547153760-18fc86324498?w=80&q=80' },
  { id:'8', sku:'CW-EC-008', name:'Essential Cotton Pack (5x)', brand:'CoreWear', category:'Apparel', stock:6800, minStock:800, price:49.99, img:'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=80&q=80' },
  { id:'9', sku:'SM-TR-009', name:'Trail Blazer Boots', brand:'SportMax', category:'Footwear', stock:320, minStock:150, price:189.99, img:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=80&q=80' },
  { id:'10', sku:'NP-WV-010', name:'WindVeil Windbreaker', brand:'NorthPeak', category:'Outerwear', stock:1100, minStock:200, price:109.99, img:'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=80&q=80' },
  { id:'11', sku:'FG-SB-011', name:'Speed Boost Running Shoe', brand:'FlexGear', category:'Footwear', stock:78, minStock:150, price:114.99, img:'https://images.unsplash.com/photo-1539185441755-769473a23570?w=80&q=80' },
  { id:'12', sku:'CW-SP-012', name:'Sports Polo Collection', brand:'CoreWear', category:'Apparel', stock:3100, minStock:350, price:29.99, img:'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=80&q=80' },
]

export async function GET() {
  return NextResponse.json(inventory)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const product: Product = {
    ...body,
    id: Date.now().toString(),
    minStock: Math.floor((body.stock || 0) * 0.15),
    img: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=80&q=80',
  }
  inventory.unshift(product)
  return NextResponse.json(product, { status: 201 })
}

export async function PUT(req: NextRequest) {
  const body = await req.json()
  const idx = inventory.findIndex(p => p.id === body.id)
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  inventory[idx] = { ...inventory[idx], ...body }
  return NextResponse.json(inventory[idx])
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json()
  const before = inventory.length
  inventory = inventory.filter(p => p.id !== id)
  if (inventory.length === before) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ success: true })
}
