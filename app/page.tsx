'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Filler } from 'chart.js'
import { Line, Doughnut } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Filler)

const HOURS = ['00:00','02:00','04:00','06:00','08:00','10:00','12:00','14:00','16:00','18:00','22:00','Now']
const TRAFFIC = [1200,800,600,900,2200,3800,4200,4827,4600,3900,2800,4827]
const INSTS   = [4,4,4,4,6,8,10,12,11,10,7,12]

const SYSTEMS = [
  { key:'erp', icon:'⚙️', name:'ERP System', desc:'Enterprise Resource Planning', color:'var(--blue)', res:'48ms', cpu:'34%', mem:'6.2GB', inst:4, load:67, grad:'linear-gradient(90deg,#58a6ff,#a371f7)' },
  { key:'crm', icon:'👥', name:'CRM System', desc:'Customer Relationship Mgmt', color:'var(--cyan)', res:'31ms', cpu:'28%', mem:'4.8GB', inst:3, load:52, grad:'linear-gradient(90deg,#39d0d8,#3fb950)' },
  { key:'wms', icon:'🏭', name:'WMS System', desc:'Warehouse Management', color:'var(--orange)', res:'55ms', cpu:'78%', mem:'5.1GB', inst:5, load:78, grad:'linear-gradient(90deg,#f0883e,#f85149)' },
]

const PIPE = ['Source','Build','Test','Security','Deploy','Monitor']

export default function Dashboard() {
  const [time, setTime] = useState('')
  const [rqpm, setRqpm] = useState(4827)
  const [inst, setInst] = useState(12)

  useEffect(() => {
    const t = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000)
    const r = setInterval(() => { setRqpm(4000 + Math.floor(Math.random()*1400)); setInst(10 + Math.floor(Math.random()*4)) }, 4000)
    return () => { clearInterval(t); clearInterval(r) }
  }, [])

  return (
    <>
      <header style={{ background:'var(--bg2)', borderBottom:'1px solid var(--bd)', padding:'14px 28px', display:'flex', alignItems:'center', justifyContent:'space-between', position:'sticky', top:0, zIndex:50 }}>
        <div>
          <div style={{ fontSize:17, fontWeight:600 }}>Cloud Dashboard</div>
          <div style={{ fontSize:11, color:'var(--tx2)', marginTop:2 }}>NexTextile Wholesale Ltd — AWS eu-west-1 | {time}</div>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <span className="tag t-g">● Production</span>
          <Link href="/cicd" className="btn btn-p">🚀 Deploy</Link>
          <div style={{ width:34,height:34,borderRadius:'50%',background:'linear-gradient(135deg,#58a6ff,#a371f7)',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,fontSize:12 }}>NT</div>
        </div>
      </header>

      <div style={{ padding:28 }}>
        {/* Metrics */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:18, marginBottom:28 }}>
          {[
            { label:'System Uptime', val:'99.97%', color:'var(--green)', icon:'✅', note:'↑ 0.02% vs last month' },
            { label:'Active Instances', val:inst, color:'var(--blue)', icon:'🖥️', note:'↑ Auto-scaled from 8' },
            { label:'Requests/min', val:rqpm.toLocaleString(), color:'var(--cyan)', icon:'⚡', note:'↑ Peak traffic' },
            { label:'Cost Savings', val:'43%', color:'var(--purple)', icon:'🐷', note:'↑ vs on-premises' },
          ].map(m => (
            <div key={m.label} style={{ background:'var(--bg2)', border:'1px solid var(--bd)', borderRadius:12, padding:18 }}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:10 }}>
                <span style={{ fontSize:12, color:'var(--tx2)' }}>{m.label}</span>
                <span style={{ fontSize:18 }}>{m.icon}</span>
              </div>
              <div style={{ fontSize:26, fontWeight:700, color:m.color, marginBottom:5 }}>{m.val}</div>
              <div style={{ fontSize:11, color:'var(--green)' }}>{m.note}</div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:22, marginBottom:28 }}>
          <div className="card" style={{ marginBottom:0 }}>
            <div style={{ fontSize:14, fontWeight:600, marginBottom:4 }}>Traffic & Auto-Scaling</div>
            <div style={{ fontSize:11, color:'var(--tx2)', marginBottom:16 }}>Requests/min vs active instances (24h)</div>
            <Line height={100} data={{
              labels:HOURS,
              datasets:[
                { label:'Req/min', data:TRAFFIC, borderColor:'#58a6ff', backgroundColor:'rgba(88,166,255,.08)', fill:true, tension:.4, pointRadius:3, yAxisID:'y' },
                { label:'Instances', data:INSTS, borderColor:'#f0883e', borderDash:[5,5], tension:.4, pointRadius:3, yAxisID:'y1' },
              ]
            }} options={{ responsive:true, plugins:{legend:{display:false}}, scales:{
              x:{grid:{color:'rgba(48,54,61,.5)'},ticks:{color:'#8b949e',font:{size:10}}},
              y:{grid:{color:'rgba(48,54,61,.5)'},ticks:{color:'#8b949e',font:{size:10}},position:'left'},
              y1:{grid:{display:false},ticks:{color:'#f0883e',font:{size:10}},position:'right'}
            }}} />
          </div>
          <div className="card" style={{ marginBottom:0 }}>
            <div style={{ fontSize:14, fontWeight:600, marginBottom:16 }}>Load Distribution</div>
            <Doughnut height={150} data={{ labels:['ERP','CRM','WMS'], datasets:[{ data:[38,34,28], backgroundColor:['#58a6ff','#39d0d8','#a371f7'], borderWidth:0 }] }} options={{ cutout:'68%', plugins:{legend:{display:false}}, responsive:true }} />
            <div style={{ marginTop:14, display:'flex', flexDirection:'column', gap:7 }}>
              {[['ERP','#58a6ff','38%'],['CRM','#39d0d8','34%'],['WMS','#a371f7','28%']].map(([l,c,v])=>(
                <div key={l} style={{ display:'flex', justifyContent:'space-between', fontSize:12 }}>
                  <span style={{ color:'var(--tx2)' }}>{l}</span><span style={{ color:c, fontWeight:600 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Systems */}
        <div style={{ fontSize:15, fontWeight:600, marginBottom:16 }}>Core Business Systems</div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:18, marginBottom:28 }}>
          {SYSTEMS.map(s => (
            <div key={s.key} style={{ background:'var(--bg2)', border:'1px solid var(--bd)', borderRadius:12, padding:18, position:'relative', overflow:'hidden' }}>
              <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:s.grad }}></div>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:14 }}>
                <div style={{ display:'flex', gap:10, alignItems:'center' }}>
                  <div style={{ width:44,height:44,borderRadius:10,background:'var(--bg3)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:22 }}>{s.icon}</div>
                  <div><div style={{ fontWeight:600, fontSize:14 }}>{s.name}</div><div style={{ fontSize:11, color:'var(--tx2)' }}>{s.desc}</div></div>
                </div>
                <span className="tag t-g">● Online</span>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:12 }}>
                {[['Response',s.res,'var(--green)'],['CPU',s.cpu,s.color],['Memory',s.mem,''],['Instances',s.inst+'×','var(--cyan)']].map(([l,v,c])=>(
                  <div key={l} style={{ background:'var(--bg3)', borderRadius:7, padding:9 }}>
                    <div style={{ fontSize:10, color:'var(--tx2)', marginBottom:3 }}>{l}</div>
                    <div style={{ fontSize:15, fontWeight:600, color:(c||'var(--tx)') as string }}>{v}</div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize:11, color:'var(--tx2)', display:'flex', justifyContent:'space-between', marginBottom:5 }}>
                <span>Load</span><span>{s.load}%</span>
              </div>
              <div className="prog"><div className="prog-bar" style={{ width:`${s.load}%`, background:s.color }}></div></div>
            </div>
          ))}
        </div>

        {/* CI/CD mini */}
        <div className="card">
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:16 }}>
            <div><div style={{ fontSize:14, fontWeight:600 }}>Latest CI/CD Pipeline — Build #87</div><div style={{ fontSize:11, color:'var(--tx2)' }}>main · commit a3f9b2c · "feat: WMS auto-scaling rules"</div></div>
            <Link href="/cicd" className="btn btn-o">View Full →</Link>
          </div>
          <div style={{ display:'flex', alignItems:'center', flexWrap:'wrap' }}>
            {PIPE.map((s, i) => {
              const done = i < 4, running = i === 4, pending = i === 5
              return (
                <div key={s} style={{ display:'flex', alignItems:'center' }}>
                  <div style={{
                    background: done?'rgba(63,185,80,.1)':running?'rgba(88,166,255,.1)':'var(--bg3)',
                    border:`1px solid ${done?'var(--green)':running?'var(--blue)':'var(--bd)'}`,
                    borderRadius:6, padding:'5px 12px', fontSize:11, display:'flex', alignItems:'center', gap:5,
                    opacity:pending?.4:1, animation:running?'blink 1.5s infinite':'none'
                  }}>
                    {s} {done&&<span style={{ color:'var(--green)',fontSize:9 }}>✓</span>}
                    {running&&<span style={{ color:'var(--blue)',fontSize:9,animation:'spin 1s linear infinite',display:'inline-block' }}>⟳</span>}
                  </div>
                  {i<5&&<div style={{ width:24,height:2,background:'var(--bd)',margin:'0 3px',position:'relative' }}><span style={{ position:'absolute',right:-6,top:-9,color:'var(--tx3)',fontSize:14 }}>›</span></div>}
                </div>
              )
            })}
          </div>
          <div style={{ marginTop:12, display:'flex', gap:20, fontSize:11, color:'var(--tx2)' }}>
            <span>⏱ Running 2m 14s</span><span>🌿 main</span><span style={{ color:'var(--green)' }}>✓ 4/6 passed</span>
          </div>
        </div>
      </div>
    </>
  )
}
