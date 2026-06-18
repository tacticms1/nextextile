import { NextRequest, NextResponse } from 'next/server'

export interface Supplier {
  id: string
  company: string
  contact: string
  email: string
  phone: string
  country: string
  materials: string
  leadTime: number
  minOrder: number
  paymentTerms: string
  rating: number
  status: 'Active' | 'Preferred' | 'Inactive'
  since: string
}

let suppliers: Supplier[] = [
  { id:'SRM-001', company:'Fergana Tekstil Zavodi',     contact:'Bobur Yusupov',    email:'bobur@fergana-tex.uz',    phone:'+998 73 244 5678', country:'Uzbekistan', materials:'Paxta, Chit',           leadTime:7,  minOrder:5000,  paymentTerms:'Net 30', rating:4.9, status:'Preferred', since:'2021-03' },
  { id:'SRM-002', company:'Bukhara Silk Factory',       contact:'Zulfiya Mirzayeva', email:'zulfiya@bsf.uz',         phone:'+998 65 123 4567', country:'Uzbekistan', materials:'Ipak, Atlas',           leadTime:14, minOrder:3000,  paymentTerms:'Net 45', rating:4.7, status:'Preferred', since:'2020-07' },
  { id:'SRM-003', company:'Istanbul Fabric House',      contact:'Mehmet Yilmaz',    email:'m.yilmaz@istfabric.tr',  phone:'+90 212 345 6789', country:'Turkey',     materials:'Juniper, Lycra, Denim', leadTime:21, minOrder:10000, paymentTerms:'Net 60', rating:4.5, status:'Active',    since:'2022-01' },
  { id:'SRM-004', company:'Guangzhou Textile Co.',      contact:'Li Wei',           email:'li.wei@gztextile.cn',    phone:'+86 20 8765 4321', country:'China',      materials:'Poliester, Nylon',      leadTime:28, minOrder:20000, paymentTerms:'LC 60',  rating:4.2, status:'Active',    since:'2019-11' },
  { id:'SRM-005', company:'Andijan Paxta Kombinat',     contact:'Sardor Xolmatov',  email:'sardor@andijan-pak.uz',  phone:'+998 74 223 4567', country:'Uzbekistan', materials:'Xom paxta, Ip',        leadTime:5,  minOrder:8000,  paymentTerms:'Net 15', rating:4.6, status:'Preferred', since:'2023-02' },
  { id:'SRM-006', company:'Karachi Cotton Mills',       contact:'Asif Raza',        email:'asif@kcmills.pk',        phone:'+92 21 3456 7890', country:'Pakistan',   materials:'Paxta ip, Kanvas',     leadTime:30, minOrder:15000, paymentTerms:'LC 90',  rating:3.8, status:'Active',    since:'2021-09' },
  { id:'SRM-007', company:'Ivanovo Textile (RU)',       contact:'Olga Smirnova',    email:'o.smirnova@ivantex.ru', phone:'+7 493 234 5678',  country:'Russia',     materials:'Zig, Flanel',          leadTime:18, minOrder:7000,  paymentTerms:'Net 45', rating:4.0, status:'Inactive',  since:'2022-06' },
  { id:'SRM-008', company:'Tashkent Stitching Hub',     contact:'Dilnoza Karimova', email:'dilnoza@tshub.uz',       phone:'+998 71 456 7890', country:'Uzbekistan', materials:'Ishlov berish, Tikish', leadTime:3,  minOrder:2000,  paymentTerms:'Net 7',  rating:4.8, status:'Preferred', since:'2023-08' },
]

export async function GET() {
  return NextResponse.json(suppliers)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const s: Supplier = {
    ...body,
    id: `SRM-${String(suppliers.length + 1).padStart(3,'0')}`,
    rating: 4.0,
    since: new Date().toISOString().slice(0,7),
  }
  suppliers.unshift(s)
  return NextResponse.json(s, { status: 201 })
}

export async function PUT(req: NextRequest) {
  const body = await req.json()
  const idx = suppliers.findIndex(s => s.id === body.id)
  if (idx === -1) return NextResponse.json({ error:'Not found' }, { status:404 })
  suppliers[idx] = { ...suppliers[idx], ...body }
  return NextResponse.json(suppliers[idx])
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json()
  suppliers = suppliers.filter(s => s.id !== id)
  return NextResponse.json({ success: true })
}
