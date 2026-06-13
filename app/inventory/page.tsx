'use client'
import { useEffect, useState } from 'react'

interface Product { id:string; sku:string; name:string; brand:string; category:string; stock:number; minStock:number; price:number; img:string }

const BLANK = { sku:'', name:'', brand:'', category:'Apparel', stock:0, price:0 }

export default function Inventory() {
  const [items, setItems] = useState<Product[]>([])
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('All')
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState<Product|null>(null)
  const [form, setForm] = useState<typeof BLANK>({...BLANK})

  const load = () => fetch('/api/inventory').then(r=>r.json()).then(setItems)
  useEffect(()=>{ load() },[])

  const cats = ['All', ...Array.from(new Set(items.map(i=>i.category)))]
  const filtered = items.filter(i => {
    const match = q ? (i.name.toLowerCase().includes(q.toLowerCase()) || i.sku.toLowerCase().includes(q.toLowerCase()) || i.brand.toLowerCase().includes(q.toLowerCase())) : true
    return match && (cat==='All' || i.category===cat)
  })

  const openAdd = () => { setEditing(null); setForm({...BLANK}); setModal(true) }
  const openEdit = (p:Product) => { setEditing(p); setForm({sku:p.sku,name:p.name,brand:p.brand,category:p.category,stock:p.stock,price:p.price}); setModal(true) }

  const save = async () => {
    if (editing) {
      await fetch('/api/inventory',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({...editing,...form})})
    } else {
      await fetch('/api/inventory',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)})
    }
    setModal(false); load()
  }

  const del = async (id:string) => {
    if (!confirm('Delete this product?')) return
    await fetch('/api/inventory',{method:'DELETE',headers:{'Content-Type':'application/json'},body:JSON.stringify({id})})
    load()
  }

  const csv = () => {
    const rows = [['SKU','Name','Brand','Category','Stock','Min Stock','Price'],
      ...filtered.map(i=>[i.sku,i.name,i.brand,i.category,i.stock,i.minStock,'$'+i.price.toFixed(2)])]
    const blob = new Blob([rows.map(r=>r.join(',')).join('\n')],{type:'text/csv'})
    const a = document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='inventory.csv'; a.click()
  }

  const total = items.reduce((a,i)=>a+i.stock*i.price,0)
  const low = items.filter(i=>i.stock<i.minStock).length

  return (
    <>
      <header style={{background:'var(--bg2)',borderBottom:'1px solid var(--bd)',padding:'14px 28px',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:50}}>
        <div>
          <div style={{fontSize:17,fontWeight:600}}>Inventory Management (WMS)</div>
          <div style={{fontSize:11,color:'var(--tx2)',marginTop:2}}>Warehouse Management System — Real-time stock levels</div>
        </div>
        <div style={{display:'flex',gap:10}}>
          <button className="btn" onClick={csv}>⬇ Export CSV</button>
          <button className="btn btn-p" onClick={openAdd}>+ Add Product</button>
        </div>
      </header>

      <div style={{padding:28}}>
        {/* Stats */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:18,marginBottom:24}}>
          {[
            {label:'Total SKUs',val:items.length,color:'var(--blue)',icon:'📦'},
            {label:'Total Units',val:items.reduce((a,i)=>a+i.stock,0).toLocaleString(),color:'var(--cyan)',icon:'🏭'},
            {label:'Stock Value',val:'$'+Math.round(total/1000)+'K',color:'var(--green)',icon:'💰'},
            {label:'Low Stock',val:low,color:low>0?'var(--red)':'var(--green)',icon:'⚠️'},
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

        {/* Filters */}
        <div style={{display:'flex',gap:12,marginBottom:18,flexWrap:'wrap'}}>
          <input className="nt-input" placeholder="Search products, SKU, brand..." value={q} onChange={e=>setQ(e.target.value)} style={{flex:1,minWidth:220}} />
          <select className="nt-input" value={cat} onChange={e=>setCat(e.target.value)} style={{width:160}}>
            {cats.map(c=><option key={c}>{c}</option>)}
          </select>
        </div>

        {/* Table */}
        <div style={{background:'var(--bg2)',border:'1px solid var(--bd)',borderRadius:12,overflow:'hidden'}}>
          <table className="nt-table" style={{width:'100%'}}>
            <thead>
              <tr><th>Product</th><th>SKU</th><th>Category</th><th>Stock</th><th>Stock Level</th><th>Price</th><th>Value</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filtered.map(p=>{
                const pct = Math.min(100,Math.round(p.stock/Math.max(p.minStock*3,1)*100))
                const isLow = p.stock < p.minStock
                return (
                  <tr key={p.id}>
                    <td>
                      <div style={{display:'flex',alignItems:'center',gap:10}}>
                        <img src={p.img} alt="" style={{width:36,height:36,borderRadius:6,objectFit:'cover'}}/>
                        <div>
                          <div style={{fontWeight:500,fontSize:13}}>{p.name}</div>
                          <div style={{fontSize:11,color:'var(--tx2)'}}>{p.brand}</div>
                        </div>
                      </div>
                    </td>
                    <td><span style={{fontFamily:'monospace',fontSize:12,color:'var(--tx2)'}}>{p.sku}</span></td>
                    <td><span className="tag">{p.category}</span></td>
                    <td>
                      <div style={{fontWeight:600,color:isLow?'var(--red)':'var(--tx)'}}>{p.stock.toLocaleString()}</div>
                      <div style={{fontSize:10,color:'var(--tx2)'}}>min {p.minStock}</div>
                    </td>
                    <td style={{minWidth:100}}>
                      <div className="prog"><div className="prog-bar" style={{width:`${pct}%`,background:isLow?'var(--red)':pct>60?'var(--green)':'var(--orange)'}}></div></div>
                    </td>
                    <td>${p.price.toFixed(2)}</td>
                    <td style={{color:'var(--cyan)',fontWeight:600}}>${(p.stock*p.price).toLocaleString('en',{maximumFractionDigits:0})}</td>
                    <td>
                      <div style={{display:'flex',gap:6}}>
                        <button className="btn" onClick={()=>openEdit(p)} style={{padding:'4px 10px',fontSize:11}}>✏️</button>
                        <button className="btn" onClick={()=>del(p.id)} style={{padding:'4px 10px',fontSize:11,color:'var(--red)',borderColor:'var(--red)'}}>🗑</button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.7)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:200}} onClick={e=>{if(e.target===e.currentTarget)setModal(false)}}>
          <div style={{background:'var(--bg2)',border:'1px solid var(--bd)',borderRadius:14,padding:28,width:480,maxWidth:'90vw'}}>
            <div style={{fontSize:16,fontWeight:600,marginBottom:20}}>{editing?'Edit Product':'Add New Product'}</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
              {[['Product Name','name','text'],['Brand','brand','text'],['SKU Code','sku','text'],['Price (USD)','price','number'],['Stock Qty','stock','number']].map(([l,k,t])=>(
                <div key={k}>
                  <div style={{fontSize:12,color:'var(--tx2)',marginBottom:6}}>{l}</div>
                  <input className="nt-input" type={t} value={(form as any)[k]} onChange={e=>setForm({...form,[k]:t==='number'?+e.target.value:e.target.value})} style={{width:'100%',boxSizing:'border-box'}}/>
                </div>
              ))}
              <div>
                <div style={{fontSize:12,color:'var(--tx2)',marginBottom:6}}>Category</div>
                <select className="nt-input" value={form.category} onChange={e=>setForm({...form,category:e.target.value})} style={{width:'100%'}}>
                  {['Apparel','Footwear','Outerwear','Accessories'].map(c=><option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div style={{display:'flex',justifyContent:'flex-end',gap:10,marginTop:22}}>
              <button className="btn" onClick={()=>setModal(false)}>Cancel</button>
              <button className="btn btn-p" onClick={save}>{editing?'Save Changes':'Add Product'}</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
