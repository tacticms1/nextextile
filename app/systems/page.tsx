export default function Systems() {
  const products = [
    {name:'Air Runner Pro X',brand:'SportMax',cat:'Footwear',price:'$89.99',stock:'1,240 units',img:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80'},
    {name:'Classic Streetwear Tee',brand:'UrbanEdge',cat:'Apparel',price:'$24.99',stock:'3,580 units',img:'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&q=80'},
    {name:'ThermoGuard Jacket',brand:'NorthPeak',cat:'Outerwear',price:'$159.99',stock:'892 units',img:'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&q=80'},
    {name:'Premium Denim',brand:'StyleCraft',cat:'Apparel',price:'$74.99',stock:'2,100 units',img:'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80'},
    {name:'Pro Performance Hoodie',brand:'FlexGear',cat:'Apparel',price:'$54.99',stock:'1,760 units',img:'https://images.unsplash.com/photo-1556906781-9a412961a28e?w=400&q=80'},
    {name:'CloudRun Elite V2',brand:'SwiftStep',cat:'Footwear',price:'$129.99',stock:'540 units',img:'https://images.unsplash.com/photo-1539185441755-769473a23570?w=400&q=80'},
    {name:'DryFit Training Shorts',brand:'ActivePro',cat:'Apparel',price:'$34.99',stock:'4,200 units',img:'https://images.unsplash.com/photo-1547153760-18fc86324498?w=400&q=80'},
    {name:'Essential Cotton Pack',brand:'CoreWear',cat:'Apparel',price:'$49.99',stock:'6,800 units',img:'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&q=80'},
  ]

  return (
    <>
      <header style={{background:'var(--bg2)',borderBottom:'1px solid var(--bd)',padding:'14px 28px'}}>
        <div style={{fontSize:17,fontWeight:600}}>Business Systems Overview</div>
        <div style={{fontSize:11,color:'var(--tx2)',marginTop:2}}>ERP · CRM · WMS — NexTextile Wholesale Ltd</div>
      </header>

      <div style={{padding:28}}>
        {/* System Cards */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:20,marginBottom:32}}>
          {[
            { name:'ERP System', icon:'⚙️', color:'var(--blue)', grad:'linear-gradient(135deg,#58a6ff,#a371f7)',
              desc:'Enterprise Resource Planning', inst:'4× t3.xlarge', mem:'6.2 GB', req:'48ms',
              features:['Purchase order management','Supplier & vendor tracking','Financial ledger & reporting','Multi-warehouse coordination','Production planning'] },
            { name:'CRM System', icon:'👥', color:'var(--cyan)', grad:'linear-gradient(135deg,#39d0d8,#3fb950)',
              desc:'Customer Relationship Mgmt', inst:'3× t3.large', mem:'4.8 GB', req:'31ms',
              features:['Wholesale client accounts','Sales pipeline tracking','Contact & lead management','Email & communication logs','Revenue analytics'] },
            { name:'WMS System', icon:'🏭', color:'var(--orange)', grad:'linear-gradient(135deg,#f0883e,#f85149)',
              desc:'Warehouse Management System', inst:'5× t3.xlarge', mem:'5.1 GB', req:'55ms',
              features:['Real-time stock tracking','Barcode/RFID scanning','Pick-pack-ship workflow','Zone & bin management','Stock reorder automation'] },
          ].map(s=>(
            <div key={s.name} style={{background:'var(--bg2)',border:'1px solid var(--bd)',borderRadius:14,overflow:'hidden'}}>
              <div style={{background:s.grad,padding:'20px 20px 18px',position:'relative'}}>
                <div style={{fontSize:32,marginBottom:8}}>{s.icon}</div>
                <div style={{fontSize:16,fontWeight:700,color:'#fff'}}>{s.name}</div>
                <div style={{fontSize:11,color:'rgba(255,255,255,.7)'}}>{s.desc}</div>
              </div>
              <div style={{padding:18}}>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:10,marginBottom:16}}>
                  {[['Instances',s.inst],['Memory',s.mem],['Response',s.req]].map(([l,v])=>(
                    <div key={l} style={{background:'var(--bg3)',borderRadius:7,padding:'8px 10px',textAlign:'center'}}>
                      <div style={{fontSize:10,color:'var(--tx2)',marginBottom:3}}>{l}</div>
                      <div style={{fontSize:12,fontWeight:600,color:s.color}}>{v}</div>
                    </div>
                  ))}
                </div>
                <div style={{fontSize:11,color:'var(--tx3)',textTransform:'uppercase',letterSpacing:'.5px',marginBottom:10}}>Key Features</div>
                {s.features.map(f=>(
                  <div key={f} style={{fontSize:12,color:'var(--tx2)',display:'flex',gap:7,marginBottom:6}}>
                    <span style={{color:s.color}}>▸</span>{f}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Cloud Migration Comparison */}
        <div className="card" style={{marginBottom:28}}>
          <div style={{fontSize:14,fontWeight:600,marginBottom:16}}>Cloud Migration: On-Premises vs Cloud vs Hybrid</div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:0,overflow:'hidden',borderRadius:8,border:'1px solid var(--bd)'}}>
            {[
              { label:'On-Premises', color:'var(--tx2)', items:[
                ['Cost','High upfront CAPEX','negative'],['Scaling','Manual, weeks delay','negative'],
                ['Uptime','~99.5% typical','neutral'],['Security','Full control','positive'],
                ['Disaster Recovery','Complex, costly','negative'],['Updates','Manual patching','negative'],
              ]},
              { label:'☁️ AWS Cloud (Current)', color:'var(--blue)', items:[
                ['Cost','Pay-as-you-go OPEX','positive'],['Scaling','Auto-scaling (seconds)','positive'],
                ['Uptime','99.97% SLA','positive'],['Security','Shared responsibility','positive'],
                ['Disaster Recovery','Multi-AZ, automated','positive'],['Updates','Managed services','positive'],
              ]},
              { label:'Hybrid', color:'var(--purple)', items:[
                ['Cost','Mixed (moderate)','neutral'],['Scaling','Cloud portion scales','neutral'],
                ['Uptime','Depends on design','neutral'],['Security','Complex management','neutral'],
                ['Disaster Recovery','Partial cloud backup','neutral'],['Updates','Split responsibility','neutral'],
              ]},
            ].map((col,ci)=>(
              <div key={col.label} style={{borderRight:ci<2?'1px solid var(--bd)':'none'}}>
                <div style={{padding:'12px 16px',background:'var(--bg3)',borderBottom:'1px solid var(--bd)',fontWeight:600,fontSize:13,color:col.color,textAlign:'center'}}>{col.label}</div>
                {col.items.map(([k,v,s])=>(
                  <div key={k} style={{padding:'10px 16px',borderBottom:'1px solid #f1f5f9',display:'flex',flexDirection:'column',gap:3}}>
                    <div style={{fontSize:10,color:'var(--tx3)',textTransform:'uppercase',letterSpacing:'.4px'}}>{k}</div>
                    <div style={{fontSize:12,color:s==='positive'?'var(--green)':s==='negative'?'var(--red)':'var(--tx2)'}}>{v}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Product Catalogue */}
        <div style={{fontSize:15,fontWeight:600,marginBottom:16}}>Wholesale Product Catalogue</div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:16}}>
          {products.map(p=>(
            <div key={p.name} style={{background:'var(--bg2)',border:'1px solid var(--bd)',borderRadius:12,overflow:'hidden'}}>
              <img src={p.img} alt={p.name} style={{width:'100%',height:160,objectFit:'cover'}}/>
              <div style={{padding:14}}>
                <div style={{fontSize:12,fontWeight:600,marginBottom:3}}>{p.name}</div>
                <div style={{fontSize:11,color:'var(--tx2)',marginBottom:8}}>{p.brand} · <span className="tag" style={{marginLeft:0}}>{p.cat}</span></div>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <span style={{fontWeight:700,color:'var(--green)',fontSize:14}}>{p.price}</span>
                  <span style={{fontSize:10,color:'var(--tx2)'}}>{p.stock}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
