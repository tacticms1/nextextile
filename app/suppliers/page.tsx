'use client'
import { useEffect, useState } from 'react'
import { useAuth } from '@/components/AuthProvider'

interface Supplier {
  id: string; company: string; contact: string; email: string; phone: string
  country: string; materials: string; leadTime: number; minOrder: number
  paymentTerms: string; rating: number; status: 'Active'|'Preferred'|'Inactive'; since: string
}

const BLANK = { company:'', contact:'', email:'', phone:'', country:'Uzbekistan', materials:'', leadTime:14, minOrder:5000, paymentTerms:'Net 30', status:'Active' as 'Active'|'Preferred'|'Inactive' }

const STARS = (r:number) => '★'.repeat(Math.round(r)) + '☆'.repeat(5-Math.round(r))
const SC:Record<string,string> = { Preferred:'t-p', Active:'t-g', Inactive:'t-r' }
const FL:Record<string,string> = { Uzbekistan:'🇺🇿', Turkey:'🇹🇷', China:'🇨🇳', Pakistan:'🇵🇰', Russia:'🇷🇺' }

export default function Suppliers() {
  const [data, setData]     = useState<Supplier[]>([])
  const [q, setQ]           = useState('')
  const [status, setStatus] = useState('All')
  const [modal, setModal]   = useState(false)
  const [editing, setEditing] = useState<Supplier|null>(null)
  const [form, setForm]     = useState<typeof BLANK>({...BLANK})
  const { user } = useAuth()
  const isAdmin = user?.role === 'admin'

  const load = () => fetch('/api/suppliers').then(r=>r.json()).then(setData)
  useEffect(() => { load() }, [])

  const filtered = data.filter(s => {
    const match = !q || s.company.toLowerCase().includes(q.toLowerCase()) || s.materials.toLowerCase().includes(q.toLowerCase()) || s.country.toLowerCase().includes(q.toLowerCase())
    return match && (status==='All' || s.status===status)
  })

  const openAdd  = () => { setEditing(null); setForm({...BLANK}); setModal(true) }
  const openEdit = (s:Supplier) => { setEditing(s); setForm({ company:s.company, contact:s.contact, email:s.email, phone:s.phone, country:s.country, materials:s.materials, leadTime:s.leadTime, minOrder:s.minOrder, paymentTerms:s.paymentTerms, status:s.status }); setModal(true) }

  const save = async () => {
    if (editing) {
      await fetch('/api/suppliers',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({...editing,...form})})
    } else {
      await fetch('/api/suppliers',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)})
    }
    setModal(false); load()
  }

  const del = async (id:string) => {
    if (!confirm("Bu ta'minotchini o'chirilsinmi?")) return
    await fetch('/api/suppliers',{method:'DELETE',headers:{'Content-Type':'application/json'},body:JSON.stringify({id})})
    load()
  }

  const preferred = data.filter(s=>s.status==='Preferred').length
  const avgLead   = data.length ? Math.round(data.reduce((a,s)=>a+s.leadTime,0)/data.length) : 0
  const avgRating = data.length ? (data.reduce((a,s)=>a+s.rating,0)/data.length).toFixed(1) : '0'

  return (
    <>
      <header style={{background:'#fff',borderBottom:'1px solid #e2e8f0',padding:'14px 28px',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:50}}>
        <div>
          <div style={{fontSize:17,fontWeight:700,color:'#1e293b'}}>Ta'minotchilar (SRM)</div>
          <div style={{fontSize:11,color:'#94a3b8',marginTop:2}}>Supplier Relationship Management — Yetkazib beruvchilar</div>
        </div>
        {isAdmin && (
          <button className="btn btn-p" onClick={openAdd}>+ Ta'minotchi qo'shish</button>
        )}
      </header>

      <div style={{padding:28}}>
        {/* Stats */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:18,marginBottom:24}}>
          {[
            {label:"Jami ta'minotchilar", val:data.length,        color:'#6366f1', icon:'🏭', bg:'#ede9fe', bc:'#ddd6fe'},
            {label:"Preferred",           val:preferred,           color:'#7c3aed', icon:'⭐', bg:'#f5f3ff', bc:'#ddd6fe'},
            {label:"O'rtacha yetkazish",  val:avgLead+' kun',      color:'#0891b2', icon:'⏱',  bg:'#cffafe', bc:'#a5f3fc'},
            {label:"O'rtacha reyting",    val:avgRating+' / 5',   color:'#d97706', icon:'★',  bg:'#fef3c7', bc:'#fde68a'},
          ].map(s=>(
            <div key={s.label} style={{background:s.bg,border:`1px solid ${s.bc}`,borderRadius:14,padding:18}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}>
                <span style={{fontSize:11,fontWeight:600,color:s.color}}>{s.label}</span>
                <span style={{fontSize:20}}>{s.icon}</span>
              </div>
              <div style={{fontSize:26,fontWeight:800,color:s.color}}>{s.val}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div style={{display:'flex',gap:12,marginBottom:18,flexWrap:'wrap'}}>
          <input className="nt-input" placeholder="Kompaniya, material, mamlakat..." value={q} onChange={e=>setQ(e.target.value)} style={{flex:1,minWidth:220}}/>
          <select className="nt-input" value={status} onChange={e=>setStatus(e.target.value)} style={{width:160}}>
            {['All','Preferred','Active','Inactive'].map(s=><option key={s}>{s}</option>)}
          </select>
        </div>

        {/* Table */}
        <div style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:14,overflow:'hidden',boxShadow:'0 1px 3px rgba(0,0,0,.05)'}}>
          <table className="nt-table" style={{width:'100%'}}>
            <thead>
              <tr>
                <th>Kompaniya</th>
                <th>Aloqa</th>
                <th>Mamlakat</th>
                <th>Materiallar</th>
                <th>Yetkazish (kun)</th>
                <th>Min Buyurtma</th>
                <th>To'lov</th>
                <th>Reyting</th>
                <th>Status</th>
                {isAdmin && <th>Harakatlar</th>}
              </tr>
            </thead>
            <tbody>
              {filtered.map(s=>(
                <tr key={s.id}>
                  <td>
                    <div style={{fontWeight:700,fontSize:13,color:'#1e293b'}}>{s.company}</div>
                    <div style={{fontSize:10,color:'#94a3b8',fontFamily:'monospace',marginTop:2}}>{s.id}</div>
                  </td>
                  <td>
                    <div style={{fontSize:12,color:'#1e293b'}}>{s.contact}</div>
                    <div style={{fontSize:11,color:'#94a3b8'}}>{s.email}</div>
                  </td>
                  <td>
                    <span style={{fontSize:13}}>{FL[s.country]||'🌍'} {s.country}</span>
                  </td>
                  <td>
                    <div style={{fontSize:12,color:'#6366f1',fontWeight:500}}>{s.materials}</div>
                  </td>
                  <td>
                    <div style={{display:'flex',alignItems:'center',gap:6}}>
                      <div className="prog" style={{width:50}}>
                        <div className="prog-bar" style={{width:`${Math.min(100,s.leadTime/30*100)}%`}}></div>
                      </div>
                      <span style={{fontWeight:600,color:'#1e293b',fontSize:12}}>{s.leadTime}</span>
                    </div>
                  </td>
                  <td><span style={{fontWeight:600,color:'#059669',fontSize:12}}>${s.minOrder.toLocaleString()}</span></td>
                  <td><span style={{fontSize:11,color:'#64748b',background:'#f8fafc',padding:'3px 8px',borderRadius:6,border:'1px solid #e2e8f0'}}>{s.paymentTerms}</span></td>
                  <td>
                    <div>
                      <span style={{color:'#f59e0b',fontSize:11,letterSpacing:1}}>{STARS(s.rating)}</span>
                      <span style={{fontSize:11,color:'#94a3b8',marginLeft:4}}>{s.rating}</span>
                    </div>
                  </td>
                  <td><span className={`tag ${SC[s.status]}`}>{s.status}</span></td>
                  {isAdmin && (
                    <td>
                      <div style={{display:'flex',gap:6}}>
                        <button className="btn" onClick={()=>openEdit(s)} style={{padding:'4px 10px',fontSize:11}}>✏️</button>
                        <button className="btn" onClick={()=>del(s.id)} style={{padding:'4px 10px',fontSize:11,color:'#ef4444',borderColor:'#fecaca'}}>🗑</button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <div style={{position:'fixed',inset:0,background:'rgba(15,23,42,.4)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:200,backdropFilter:'blur(4px)'}} onClick={e=>{if(e.target===e.currentTarget)setModal(false)}}>
          <div style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:20,padding:32,width:520,maxWidth:'90vw',boxShadow:'0 20px 60px rgba(0,0,0,.15)'}}>
            <div style={{fontSize:18,fontWeight:800,color:'#1e293b',marginBottom:22}}>{editing ? "Ta'minotchini tahrirlash" : "Yangi ta'minotchi qo'shish"}</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
              {([['Kompaniya nomi','company','text'],['Aloqa shaxsi','contact','text'],['Email','email','email'],['Telefon','phone','text'],['Materiallar','materials','text'],['Yetkazish (kun)','leadTime','number'],['Min Buyurtma ($)','minOrder','number']] as [string,string,string][]).map(([l,k,t])=>(
                <div key={k} style={k==='materials'?{gridColumn:'1/-1'}:{}}>
                  <div style={{fontSize:12,fontWeight:600,color:'#475569',marginBottom:6}}>{l}</div>
                  <input className="nt-input" type={t} value={(form as any)[k]} onChange={e=>setForm({...form,[k]:t==='number'?+e.target.value:e.target.value})} style={{width:'100%',boxSizing:'border-box'}}/>
                </div>
              ))}
              <div>
                <div style={{fontSize:12,fontWeight:600,color:'#475569',marginBottom:6}}>Mamlakat</div>
                <select className="nt-input" value={form.country} onChange={e=>setForm({...form,country:e.target.value})} style={{width:'100%'}}>
                  {['Uzbekistan','Turkey','China','Pakistan','Russia','UAE','India'].map(c=><option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <div style={{fontSize:12,fontWeight:600,color:'#475569',marginBottom:6}}>To'lov shartlari</div>
                <select className="nt-input" value={form.paymentTerms} onChange={e=>setForm({...form,paymentTerms:e.target.value})} style={{width:'100%'}}>
                  {['Net 7','Net 15','Net 30','Net 45','Net 60','LC 60','LC 90'].map(t=><option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <div style={{fontSize:12,fontWeight:600,color:'#475569',marginBottom:6}}>Status</div>
                <select className="nt-input" value={form.status} onChange={e=>setForm({...form,status:e.target.value as any})} style={{width:'100%'}}>
                  <option>Active</option><option>Preferred</option><option>Inactive</option>
                </select>
              </div>
            </div>
            <div style={{display:'flex',justifyContent:'flex-end',gap:10,marginTop:24}}>
              <button className="btn" onClick={()=>setModal(false)}>Bekor qilish</button>
              <button className="btn btn-p" onClick={save}>{editing ? 'Saqlash' : "Qo'shish"}</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
