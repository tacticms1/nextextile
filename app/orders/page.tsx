'use client'
import { useEffect, useState } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip } from 'chart.js'
import { Bar, Doughnut } from 'react-chartjs-2'
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip)

interface Order { id:string; customer:string; product:string; qty:number; price:number; date:string; status:'Fulfilled'|'Packing'|'In Review'|'Cancelled'; warehouse:string }

const BLANK = { customer:'', product:'', qty:1, price:0, warehouse:'WH-Tashkent' }
const SC:Record<string,string> = { Fulfilled:'t-g', Packing:'t-b', 'In Review':'t-o', Cancelled:'t-r' }

export default function Orders() {
  const [data, setData] = useState<Order[]>([])
  const [q, setQ] = useState('')
  const [status, setStatus] = useState('All')
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState<typeof BLANK>({...BLANK})

  const load = () => fetch('/api/orders').then(r=>r.json()).then(setData)
  useEffect(()=>{ load() },[])

  const filtered = data.filter(o => {
    const match = !q || o.customer.toLowerCase().includes(q.toLowerCase()) || o.id.toLowerCase().includes(q.toLowerCase()) || o.product.toLowerCase().includes(q.toLowerCase())
    return match && (status==='All' || o.status===status)
  })

  const save = async () => {
    await fetch('/api/orders',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)})
    setModal(false); load()
  }

  const updateStatus = async (id:string, newStatus:Order['status']) => {
    await fetch('/api/orders',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({id,status:newStatus})})
    load()
  }

  const del = async (id:string) => {
    if (!confirm('Cancel this order?')) return
    await fetch('/api/orders',{method:'DELETE',headers:{'Content-Type':'application/json'},body:JSON.stringify({id})})
    load()
  }

  const totalRev = data.filter(o=>o.status!=='Cancelled').reduce((a,o)=>a+o.qty*o.price,0)
  const statusCounts = ['Fulfilled','Packing','In Review','Cancelled'].map(s=>data.filter(o=>o.status===s).length)

  const monthlyRev = [48200,52100,61800,58400,71200,68900]
  const months = ['Jan','Feb','Mar','Apr','May','Jun']

  return (
    <>
      <header style={{background:'var(--bg2)',borderBottom:'1px solid var(--bd)',padding:'14px 28px',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:50}}>
        <div>
          <div style={{fontSize:17,fontWeight:600}}>Order Management (ERP)</div>
          <div style={{fontSize:11,color:'var(--tx2)',marginTop:2}}>Enterprise Resource Planning — Wholesale orders</div>
        </div>
        <button className="btn btn-p" onClick={()=>{ setForm({...BLANK}); setModal(true) }}>+ New Order</button>
      </header>

      <div style={{padding:28}}>
        {/* Stats */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:18,marginBottom:24}}>
          {[
            {label:'Total Orders',val:data.length,color:'var(--blue)',icon:'🛒'},
            {label:'Revenue (Active)',val:'$'+Math.round(totalRev/1000)+'K',color:'var(--green)',icon:'💰'},
            {label:'Fulfilled',val:data.filter(o=>o.status==='Fulfilled').length,color:'var(--green)',icon:'✅'},
            {label:'In Progress',val:data.filter(o=>o.status==='Packing'||o.status==='In Review').length,color:'var(--orange)',icon:'⚙️'},
          ].map(s=>(
            <div key={s.label} style={{background:'var(--bg2)',border:'1px solid var(--bd)',borderRadius:12,padding:16}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}>
                <span style={{fontSize:11,color:'var(--tx2)'}}>{s.label}</span>
                <span style={{fontSize:18}}>{s.icon}</span>
              </div>
              <div style={{fontSize:24,fontWeight:700,color:s.color}}>{s.val}</div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div style={{display:'grid',gridTemplateColumns:'2fr 1fr',gap:22,marginBottom:24}}>
          <div className="card" style={{marginBottom:0}}>
            <div style={{fontSize:14,fontWeight:600,marginBottom:16}}>Monthly Revenue (2026)</div>
            <Bar height={80} data={{ labels:months, datasets:[{label:'Revenue',data:monthlyRev,backgroundColor:'rgba(88,166,255,.7)',borderRadius:4}] }}
              options={{ responsive:true, plugins:{legend:{display:false}}, scales:{ x:{grid:{color:'rgba(226,232,240,.8)'},ticks:{color:'#94a3b8'}}, y:{grid:{color:'rgba(226,232,240,.8)'},ticks:{color:'#94a3b8',callback:(v:any)=>'$'+Math.round(v/1000)+'K'}}} }} />
          </div>
          <div className="card" style={{marginBottom:0}}>
            <div style={{fontSize:14,fontWeight:600,marginBottom:16}}>Order Status</div>
            <Doughnut height={130} data={{ labels:['Fulfilled','Packing','In Review','Cancelled'], datasets:[{data:statusCounts,backgroundColor:['#3fb950','#58a6ff','#f0883e','#f85149'],borderWidth:0}] }}
              options={{ cutout:'65%', plugins:{legend:{display:false}}, responsive:true }} />
            <div style={{marginTop:12,display:'flex',flexDirection:'column',gap:6}}>
              {[['Fulfilled','#3fb950'],['Packing','#58a6ff'],['In Review','#f0883e'],['Cancelled','#f85149']].map(([l,c],i)=>(
                <div key={l} style={{display:'flex',justifyContent:'space-between',fontSize:11}}>
                  <span style={{color:'var(--tx2)'}}>{l}</span>
                  <span style={{color:c,fontWeight:600}}>{statusCounts[i]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div style={{display:'flex',gap:12,marginBottom:18}}>
          <input className="nt-input" placeholder="Search orders, customer, product..." value={q} onChange={e=>setQ(e.target.value)} style={{flex:1}}/>
          <select className="nt-input" value={status} onChange={e=>setStatus(e.target.value)} style={{width:160}}>
            {['All','Fulfilled','Packing','In Review','Cancelled'].map(s=><option key={s}>{s}</option>)}
          </select>
        </div>

        {/* Table */}
        <div style={{background:'var(--bg2)',border:'1px solid var(--bd)',borderRadius:12,overflow:'hidden'}}>
          <table className="nt-table" style={{width:'100%'}}>
            <thead>
              <tr><th>Order ID</th><th>Customer</th><th>Product</th><th>Qty</th><th>Value</th><th>Date</th><th>Warehouse</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filtered.map(o=>(
                <tr key={o.id}>
                  <td><span style={{fontFamily:'monospace',fontSize:12,color:'var(--cyan)',fontWeight:600}}>{o.id}</span></td>
                  <td style={{fontSize:13}}>{o.customer}</td>
                  <td style={{fontSize:12,color:'var(--tx2)'}}>{o.product}</td>
                  <td style={{fontWeight:600}}>{o.qty.toLocaleString()}</td>
                  <td style={{fontWeight:600,color:'var(--green)'}}>${(o.qty*o.price).toLocaleString('en',{maximumFractionDigits:0})}</td>
                  <td style={{fontSize:12,color:'var(--tx2)'}}>{o.date}</td>
                  <td style={{fontSize:11}}>{o.warehouse}</td>
                  <td>
                    <select value={o.status} onChange={e=>updateStatus(o.id,e.target.value as any)}
                      style={{background:'var(--bg3)',border:'1px solid var(--bd)',borderRadius:5,color:'var(--tx)',padding:'3px 8px',fontSize:11,cursor:'pointer'}}>
                      {['Fulfilled','Packing','In Review','Cancelled'].map(s=><option key={s}>{s}</option>)}
                    </select>
                  </td>
                  <td>
                    <button className="btn" onClick={()=>del(o.id)} style={{padding:'4px 10px',fontSize:11,color:'var(--red)',borderColor:'var(--red)'}}>✕</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modal && (
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.7)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:200}} onClick={e=>{if(e.target===e.currentTarget)setModal(false)}}>
          <div style={{background:'var(--bg2)',border:'1px solid var(--bd)',borderRadius:14,padding:28,width:460,maxWidth:'90vw'}}>
            <div style={{fontSize:16,fontWeight:600,marginBottom:20}}>New Wholesale Order</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
              {[['Customer','customer','text'],['Product','product','text'],['Quantity','qty','number'],['Unit Price','price','number']].map(([l,k,t])=>(
                <div key={k}>
                  <div style={{fontSize:12,color:'var(--tx2)',marginBottom:6}}>{l}</div>
                  <input className="nt-input" type={t} value={(form as any)[k]} onChange={e=>setForm({...form,[k]:t==='number'?+e.target.value:e.target.value})} style={{width:'100%',boxSizing:'border-box'}}/>
                </div>
              ))}
              <div>
                <div style={{fontSize:12,color:'var(--tx2)',marginBottom:6}}>Warehouse</div>
                <select className="nt-input" value={form.warehouse} onChange={e=>setForm({...form,warehouse:e.target.value})} style={{width:'100%'}}>
                  <option>WH-Tashkent</option><option>WH-Samarkand</option>
                </select>
              </div>
            </div>
            <div style={{display:'flex',justifyContent:'flex-end',gap:10,marginTop:22}}>
              <button className="btn" onClick={()=>setModal(false)}>Cancel</button>
              <button className="btn btn-p" onClick={save}>Create Order</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
