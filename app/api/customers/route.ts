import { NextRequest, NextResponse } from 'next/server'

export interface Customer {
  id: string
  company: string
  contact: string
  email: string
  phone: string
  country: string
  orders: number
  value: number
  lastOrder: string
  status: 'Active' | 'Inactive' | 'VIP'
}

let customers: Customer[] = [
  { id:'CRM-001', company:'SportZone Distributors', contact:'Amir Karimov', email:'amir@sportzone.uz', phone:'+998 71 234 5678', country:'Uzbekistan', orders:48, value:284920, lastOrder:'2026-06-11', status:'VIP' },
  { id:'CRM-002', company:'Fashion Hub Uzbekistan', contact:'Nilufar Rashidova', email:'nilufar@fashionhub.uz', phone:'+998 71 345 6789', country:'Uzbekistan', orders:32, value:197440, lastOrder:'2026-06-12', status:'Active' },
  { id:'CRM-003', company:'Urban Retail Group', contact:'Sardor Toshmatov', email:'s.toshmatov@urbanretail.kz', phone:'+7 727 234 5678', country:'Kazakhstan', orders:27, value:156800, lastOrder:'2026-06-10', status:'Active' },
  { id:'CRM-004', company:'NorthSport Ltd.', contact:'Ivan Petrov', email:'ivan@northsport.ru', phone:'+7 495 123 4567', country:'Russia', orders:61, value:412300, lastOrder:'2026-06-12', status:'VIP' },
  { id:'CRM-005', company:'ActiveZone Kazakhstan', contact:'Bekzat Aliyev', email:'bekzat@activezone.kz', phone:'+7 727 456 7890', country:'Kazakhstan', orders:19, value:98500, lastOrder:'2026-06-08', status:'Active' },
  { id:'CRM-006', company:'Gulf Sports Trading', contact:'Mohammed Al-Rashid', email:'m.rashid@gulfsports.ae', phone:'+971 4 234 5678', country:'UAE', orders:14, value:321000, lastOrder:'2026-06-05', status:'Active' },
  { id:'CRM-007', company:'London Wholesale Fashion', contact:'Sarah Thompson', email:'sarah@lwf.co.uk', phone:'+44 20 7234 5678', country:'UK', orders:8, value:185600, lastOrder:'2026-05-28', status:'Active' },
  { id:'CRM-008', company:'Almaty Fashion Center', contact:'Dinara Bekova', email:'dinara@almatyfc.kz', phone:'+7 727 567 8901', country:'Kazakhstan', orders:22, value:134200, lastOrder:'2026-06-09', status:'Active' },
  { id:'CRM-009', company:'Dubai Textile Hub', contact:'Ahmed Hassan', email:'ahmed@dubaitextile.ae', phone:'+971 4 345 6789', country:'UAE', orders:11, value:278400, lastOrder:'2026-06-01', status:'VIP' },
  { id:'CRM-010', company:'TashSport Trade', contact:'Jahongir Yusupov', email:'j.yusupov@tashsport.uz', phone:'+998 71 567 8901', country:'Uzbekistan', orders:5, value:24500, lastOrder:'2026-04-15', status:'Inactive' },
]

export async function GET() {
  return NextResponse.json(customers)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const customer: Customer = {
    ...body,
    id: `CRM-${String(customers.length + 1).padStart(3,'0')}`,
    orders: 0,
    value: 0,
    lastOrder: '—',
  }
  customers.unshift(customer)
  return NextResponse.json(customer, { status: 201 })
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json()
  customers = customers.filter(c => c.id !== id)
  return NextResponse.json({ success: true })
}
