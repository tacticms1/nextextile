'use client'
import { useState, useEffect } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler } from 'chart.js'
import { Line } from 'react-chartjs-2'
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler)

const LABELS = ['12:00','12:05','12:10','12:15','12:20','12:25','12:30','12:35','12:40','12:45','12:50','Now']
const INSTANCES_DATA = [8,8,10,10,12,12,14,14,12,12,12,12]
const LATENCY_P50 = [22,24,23,26,28,30,27,25,24,26,25,24]
const LATENCY_P95 = [48,52,49,58,62,67,61,54,51,55,52,50]
const LATENCY_P99 = [91,98,94,115,128,142,121,105,98,107,101,96]

const genInstances = () => Array.from({length:12},(_,i)=>({
  id:`i-0${Math.random().toString(16).slice(2,9)}`,
  name: i<4?`ERP-${i+1}`:i<7?`CRM-${i-3}`:i<12?`WMS-${i-6}`:`UTIL-${i-11}`,
  type: i<4?'t3.xlarge':i<7?'t3.large':'t3.xlarge',
  system: i<4?'ERP':i<7?'CRM':'WMS',
  az: `eu-west-1${['a','b','c'][i%3]}`,
  cpu: Math.floor(Math.random()*80)+10,
  mem: Math.floor(Math.random()*70)+20,
  status: Math.random()>.05?'running':'stopped',
}))

export default function Monitoring() {
  const [instances, setInstances] = useState(genInstances)

  useEffect(()=>{
    const t = setInterval(()=>setInstances(genInstances()),3000)
    return ()=>clearInterval(t)
  },[])

  const running = instances.filter(i=>i.status==='running').length
  const avgCpu = Math.round(instances.reduce((a,i)=>a+i.cpu,0)/instances.length)

  const cpuColor = (c:number) => c>80?'var(--red)':c>60?'var(--orange)':'var(--green)'
  const SC:Record<string,string> = { ERP:'#58a6ff', CRM:'#39d0d8', WMS:'#f0883e' }

  return (
    <>
      <header style={{background:'var(--bg2)',borderBottom:'1px solid var(--bd)',padding:'14px 28px',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:50}}>
        <div>
          <div style={{fontSize:17,fontWeight:700,color:'#1e293b'}}>Remodule & Avto-Scaling</div>
          <div style={{fontSize:11,color:'#94a3b8',marginTop:2}}>CloudWatch — Jonli metriklar · eu-north-1</div>
        </div>
        <div style={{display:'flex',gap:10,alignItems:'center'}}>
          <span style={{fontSize:11,color:'var(--tx2)'}}>Live (3s refresh)</span>
          <span className="tag t-g">● {running}/{instances.length} Running</span>
        </div>
      </header>

      <div style={{padding:28}}>
        {/* Stats */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:18,marginBottom:24}}>
          {[
            {label:'Running Instances',val:running,color:'var(--green)',icon:'🖥️'},
            {label:'Avg CPU',val:avgCpu+'%',color:cpuColor(avgCpu),icon:'⚡'},
            {label:'P95 Latency',val:'67ms',color:'var(--cyan)',icon:'⏱'},
            {label:'CloudWatch Alarms',val:'2',color:'var(--orange)',icon:'🔔'},
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
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:22,marginBottom:24}}>
          <div className="card" style={{marginBottom:0}}>
            <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>Auto-Scaling Events</div>
            <div style={{fontSize:11,color:'var(--tx2)',marginBottom:16}}>Instance count over time (last 60 min)</div>
            <Line height={100} data={{ labels:LABELS, datasets:[{ label:'Instances', data:INSTANCES_DATA, borderColor:'#58a6ff', backgroundColor:'rgba(88,166,255,.1)', fill:true, tension:.4, pointRadius:4, stepped:'before' as const }] }}
              options={{ responsive:true, plugins:{legend:{display:false}}, scales:{ x:{grid:{color:'rgba(226,232,240,.8)'},ticks:{color:'#94a3b8',font:{size:10}}}, y:{grid:{color:'rgba(226,232,240,.8)'},ticks:{color:'#94a3b8',stepSize:2},min:6,max:16} } }} />
          </div>
          <div className="card" style={{marginBottom:0}}>
            <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>Response Latency</div>
            <div style={{fontSize:11,color:'var(--tx2)',marginBottom:16}}>P50 / P95 / P99 percentiles (ms)</div>
            <Line height={100} data={{ labels:LABELS, datasets:[
              { label:'P50', data:LATENCY_P50, borderColor:'#3fb950', tension:.4, pointRadius:2 },
              { label:'P95', data:LATENCY_P95, borderColor:'#f0883e', tension:.4, pointRadius:2 },
              { label:'P99', data:LATENCY_P99, borderColor:'#f85149', borderDash:[4,3], tension:.4, pointRadius:2 },
            ]}}
              options={{ responsive:true, plugins:{legend:{labels:{color:'#94a3b8',boxWidth:10,font:{size:10}}}}, scales:{ x:{grid:{color:'rgba(226,232,240,.8)'},ticks:{color:'#94a3b8',font:{size:10}}}, y:{grid:{color:'rgba(226,232,240,.8)'},ticks:{color:'#94a3b8',callback:(v:any)=>v+'ms'}} } }} />
          </div>
        </div>

        {/* Instance Grid */}
        <div style={{fontSize:15,fontWeight:600,marginBottom:14}}>EC2 Instance Fleet</div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12,marginBottom:24}}>
          {instances.map(inst=>(
            <div key={inst.id} style={{background:'var(--bg2)',border:`1px solid ${inst.status==='running'?'var(--bd)':'var(--red)'}`,borderRadius:10,padding:14}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:10}}>
                <div>
                  <div style={{fontWeight:600,fontSize:13,color:SC[inst.system]}}>{inst.name}</div>
                  <div style={{fontSize:10,color:'var(--tx3)',fontFamily:'monospace'}}>{inst.id.slice(0,12)}...</div>
                </div>
                <span className={`tag ${inst.status==='running'?'t-g':'t-r'}`}>{inst.status==='running'?'●':'✕'}</span>
              </div>
              <div style={{fontSize:10,color:'var(--tx2)',marginBottom:8}}>{inst.type} · {inst.az}</div>
              <div style={{marginBottom:6}}>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:10,marginBottom:3}}>
                  <span style={{color:'var(--tx2)'}}>CPU</span><span style={{color:cpuColor(inst.cpu),fontWeight:600}}>{inst.cpu}%</span>
                </div>
                <div className="prog"><div className="prog-bar" style={{width:`${inst.cpu}%`,background:cpuColor(inst.cpu)}}></div></div>
              </div>
              <div>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:10,marginBottom:3}}>
                  <span style={{color:'var(--tx2)'}}>MEM</span><span style={{color:'var(--cyan)',fontWeight:600}}>{inst.mem}%</span>
                </div>
                <div className="prog"><div className="prog-bar" style={{width:`${inst.mem}%`,background:'var(--cyan)'}}></div></div>
              </div>
            </div>
          ))}
        </div>

        {/* Scaling Policy */}
        <div className="card">
          <div style={{fontSize:14,fontWeight:600,marginBottom:16}}>Auto-Scaling Policy</div>
          <table className="nt-table" style={{width:'100%'}}>
            <thead><tr><th>Policy</th><th>Metric</th><th>Threshold</th><th>Action</th><th>Cooldown</th></tr></thead>
            <tbody>
              {[
                ['Scale Out — ERP','CPU Utilization > 70%','Add 2 instances','Increase capacity','300s'],
                ['Scale In — ERP','CPU Utilization < 30%','Remove 1 instance','Reduce cost','600s'],
                ['Scale Out — WMS','Request Count > 5000/min','Add 3 instances','Handle peak traffic','180s'],
                ['Scale In — WMS','Request Count < 1500/min','Remove 2 instances','Optimize cost','600s'],
                ['Scale Out — All','Memory > 80%','Add 1 instance','Prevent OOM','240s'],
              ].map(([p,m,t,a,c])=>(
                <tr key={p}><td style={{fontWeight:500}}>{p}</td><td style={{fontSize:12,color:'var(--tx2)'}}>{m}</td><td><span className="tag t-o">{t}</span></td><td style={{fontSize:12}}>{a}</td><td style={{fontSize:11,color:'var(--tx2)',fontFamily:'monospace'}}>{c}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
