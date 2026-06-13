'use client'
import { useEffect, useState } from 'react'

interface Customer { id:string; company:string; contact:string; email:string; phone:string; country:string; orders:number; value:number; lastOrder:string; status:'Active'|'Inactive'|'VIP' }

const BLANK = { company:'', contact:'', email:'', phone:'', country:'', status:'Active' as const }

export default function Customers() {
  const [data, setData] = useState<Customer[]>([])
  const [q, setQ] = useState('')
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState<typeof BLANK>({...BLANK})

  const load = () => fetch('/api/customers').then(r=>r.json()).then(setData)
  useEffect(()=>{ load() },[])

  const filtered = data.filter(c =>
    !q || c.company.toLowerCase().includes(q.toLowerCase()) || c.contact.toLowerCase().includes(q.toLowerCase()) || c.country.toLowerCase().includes(q.toLowerCase())
  )

  const save = async () => {
    await fetch('/api/customers',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)})
    setModal(false); load()
  }

  const del = async (id:string) => {
    if (!confirm('Remove this customer?')) return
    await fetch('/api/customers',{method:'DELETE',headers:{'Content-Type':'application/json'},body:JSON.stringify({id})})
    load()
  }

  const totalVal = data.reduce((a,c)=>a+c.value,0)
  const vip = data.filter(c=>c.status==='VIP').length

  const SC:Record<string,string> = { VIP:'t-p', Active:'t-g', Inactive:'t-r' }

  return (
    <>
      <header style={{background:'var(--bg2)',borderBottom:'1px solid var(--bd)',padding:'14px 28px',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:50}}>
        <div>
          <div style={{fontSize:17,fontWeight:600}}>Customer Relationship Management</div>
          <div style={{fontSize:11,color:'var(--tx2)',marginTop:2}}>CRM System — Wholesale client accounts</div>
        </div>
        <button className="btn btn-p" onClick={()=>{ setForm({...BLANK}); setModal(true) }}>+ Add Customer</button>
      </header>

      <div style={{padding:28}}>
        {/* Stats */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:18,marginBottom:24}}>
          {[
            {label:'Total Clients',val:data.length,color:'var(--blue)',icon:'👥'},
            {label:'Total Revenue',val:'$'+Math.round(totalVal/1000)+'K',color:'var(--green)',icon:'💰'},
            {label:'VIP Accounts',val:vip,color:'var(--purple)',icon:'⭐'},
            {label:'Avg Order Value',val:data.length?'$'+Math.round(totalVal/Math.max(data.reduce((a,c)=>a+c.orders,0),1)):'-',color:'var(--cyan)',icon:'📊'},
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

        {/* Search */}
        <input className="nt-input" placeholder="Search by company, contact, country..." value={q} onChange={e=>setQ(e.target.value)} style={{width:'100%',marginBottom:18,boxSizing:'border-box'}}/>

        {/* Table */}
        <div style={{background:'var(--bg2)',border:'1px solid var(--bd)',borderRadius:12,overflow:'hidden'}}>
          <table className="nt-table" style={{width:'100%'}}>
            <thead>
              <tr><th>Company</th><th>Contact</th><th>Country</th><th>Orders</th><th>Total Value</th><th>Last Order</th><th>Status</th><th>Action</th></tr>
            </thead>
            <tbody>
              {filtered.map(c=>(
                <tr key={c.id}>
                  <td>
                    <div style={{fontWeight:600,fontSize:13}}>{c.company}</div>
                    <div style={{fontSize:11,color:'var(--tx3)',fontFamily:'monospace'}}>{c.id}</div>
                  </td>
                  <td>
                    <div style={{fontSize:13}}>{c.contact}</div>
                    <div style={{fontSize:11,color:'var(--tx2)'}}>{c.email}</div>
                  </td>
                  <td><span style={{fontSize:13}}>{c.country}</span></td>
                  <td><span style={{fontWeight:600,color:'var(--cyan)'}}>{c.orders}</span></td>
                  <td><span style={{fontWeight:600,color:'var(--green)'}}>${c.value.toLocaleString()}</span></td>
                  <td style={{fontSize:12,color:'var(--tx2)'}}>{c.lastOrder}</td>
                  <td><span className={`tag ${SC[c.status]}`}>{c.status}</span></td>
                  <td>
                    <button className="btn" onClick={()=>del(c.id)} style={{padding:'4px 10px',fontSize:11,color:'var(--red)',borderColor:'var(--red)'}}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modal && (
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.7)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:200}} onClick={e=>{if(e.target===e.currentTarget)setModal(false)}}>
          <div style={{background:'var(--bg2)',border:'1px solid var(--bd)',borderRadius:14,padding:28,width:480,maxWidth:'90vw'}}>
            <div style={{fontSize:16,fontWeight:600,marginBottom:20}}>Add New Customer</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
              {[['Company Name','company'],['Contact Person','contact'],['Email Address','email'],['Phone Number','phone'],['Country','country']].map(([l,k])=>(
                <div key={k}>
                  <div style={{fontSize:12,color:'var(--tx2)',marginBottom:6}}>{l}</div>
                  <input className="nt-input" value={(form as any)[k]} onChange={e=>setForm({...form,[k]:e.target.value})} style={{width:'100%',boxSizing:'border-box'}}/>
                </div>
              ))}
              <div>
                <div style={{fontSize:12,color:'var(--tx2)',marginBottom:6}}>Status</div>
                <select className="nt-input" value={form.status} onChange={e=>setForm({...form,status:e.target.value as any})} style={{width:'100%'}}>
                  <option>Active</option><option>VIP</option><option>Inactive</option>
                </select>
              </div>
            </div>
            <div style={{display:'flex',justifyContent:'flex-end',gap:10,marginTop:22}}>
              <button className="btn" onClick={()=>setModal(false)}>Cancel</button>
              <button className="btn btn-p" onClick={save}>Add Customer</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
