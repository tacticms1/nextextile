export default function Compare() {
  return (
    <>
      <header style={{background:'var(--bg2)',borderBottom:'1px solid var(--bd)',padding:'14px 28px'}}>
        <div style={{fontSize:17,fontWeight:600}}>Technology Comparisons</div>
        <div style={{fontSize:11,color:'var(--tx2)',marginTop:2}}>D Block — VPN · Cloud Types · VM vs Container · Deployment Models</div>
      </header>

      <div style={{padding:28}}>

        {/* 1. Site-to-Site vs Client-to-Site VPN */}
        <div className="card" style={{marginBottom:24}}>
          <div style={{fontSize:15,fontWeight:700,marginBottom:4}}>Site-to-Site VPN vs Client-to-Site VPN</div>
          <div style={{fontSize:11,color:'var(--tx2)',marginBottom:20}}>NexTextile uses both types for different connectivity needs</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:18}}>
            {[
              { title:'Site-to-Site VPN', icon:'🏢↔️☁️', color:'var(--blue)', use:'HQ Tashkent ↔ AWS eu-west-1\nSamarkand Warehouse ↔ AWS',
                pros:['Permanent encrypted tunnel','Entire office network connected','No software on end devices','BGP dynamic routing support','High throughput (up to 1.25 Gbps)'],
                cons:['Fixed endpoints required','Higher setup cost','Single point if not redundant'],
                tech:'IKEv2 / IPSec Protocol',
                example:'NexTextile HQ → AWS VPN Gateway → Private Subnet (ERP/CRM/WMS)' },
              { title:'Client-to-Site VPN', icon:'💻↔️☁️', color:'var(--purple)', use:'Remote employees\nWork-from-home staff',
                pros:['Individual device connects','Dynamic IP supported','Per-user access control','MFA authentication','AWS Client VPN managed service'],
                cons:['Software required on each device','Higher per-user cost','Slower than Site-to-Site'],
                tech:'OpenVPN / TLS Protocol',
                example:'Remote Dev → AWS Client VPN Endpoint → Private Subnet' },
            ].map(v=>(
              <div key={v.title} style={{background:'var(--bg3)',border:`1px solid ${v.color}`,borderRadius:12,padding:20}}>
                <div style={{fontSize:24,marginBottom:8}}>{v.icon}</div>
                <div style={{fontSize:15,fontWeight:700,color:v.color,marginBottom:4}}>{v.title}</div>
                <div style={{fontSize:11,color:'var(--tx2)',marginBottom:12,whiteSpace:'pre-line'}}>{v.use}</div>
                <div style={{fontSize:10,color:'var(--tx3)',textTransform:'uppercase',letterSpacing:'.5px',marginBottom:8}}>Advantages</div>
                {v.pros.map(p=><div key={p} style={{fontSize:12,color:'var(--green)',display:'flex',gap:6,marginBottom:4}}><span>✓</span>{p}</div>)}
                <div style={{fontSize:10,color:'var(--tx3)',textTransform:'uppercase',letterSpacing:'.5px',margin:'12px 0 8px'}}>Limitations</div>
                {v.cons.map(c=><div key={c} style={{fontSize:12,color:'var(--orange)',display:'flex',gap:6,marginBottom:4}}><span>⚠</span>{c}</div>)}
                <div style={{marginTop:14,background:'var(--bg2)',borderRadius:8,padding:10}}>
                  <div style={{fontSize:10,color:'var(--tx3)',marginBottom:4}}>Protocol</div>
                  <div style={{fontSize:12,color:v.color,fontWeight:600}}>{v.tech}</div>
                  <div style={{fontSize:10,color:'var(--tx2)',marginTop:6}}>{v.example}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Public vs Private vs Multi-Cloud */}
        <div className="card" style={{marginBottom:24}}>
          <div style={{fontSize:15,fontWeight:700,marginBottom:20}}>Public Cloud vs Private Cloud vs Multi-Cloud</div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:18}}>
            {[
              { title:'Public Cloud', icon:'☁️', color:'var(--blue)', example:'AWS (current)', cost:'Pay-as-you-go',
                pros:['No upfront hardware cost','Global availability (25+ regions)','Managed services (RDS, S3, ECS)','Auto-scaling built-in','99.99% SLA'],
                cons:['Data leaves company premises','Shared infrastructure','Internet dependency'],
                suitable:'✅ Best for NexTextile — scalable ERP/CRM/WMS' },
              { title:'Private Cloud', icon:'🏢', color:'var(--purple)', example:'On-premises DC', cost:'High CAPEX',
                pros:['Full data control','No shared resources','Meets strict compliance','Custom hardware','No internet needed'],
                cons:['Expensive to build & maintain','Limited scalability','IT team required','No managed services'],
                suitable:'❌ Too expensive for NexTextile scale' },
              { title:'Multi-Cloud', icon:'🌐', color:'var(--cyan)', example:'AWS + Azure + GCP', cost:'Variable',
                pros:['No vendor lock-in','Best service from each provider','Geographic redundancy','Risk distribution'],
                cons:['Complex management','Higher networking cost','Skills gap risk','Inter-cloud latency'],
                suitable:'⚠️ Future option as NexTextile grows' },
            ].map(c=>(
              <div key={c.title} style={{background:'var(--bg3)',border:'1px solid var(--bd)',borderRadius:12,padding:18}}>
                <div style={{fontSize:28,marginBottom:8}}>{c.icon}</div>
                <div style={{fontSize:14,fontWeight:700,color:c.color,marginBottom:3}}>{c.title}</div>
                <div style={{fontSize:11,color:'var(--tx2)',marginBottom:4}}>{c.example}</div>
                <div style={{fontSize:11,color:'var(--orange)',marginBottom:12}}>Cost: {c.cost}</div>
                {c.pros.map(p=><div key={p} style={{fontSize:11,color:'var(--green)',display:'flex',gap:5,marginBottom:3}}><span>+</span>{p}</div>)}
                <div style={{margin:'8px 0'}}></div>
                {c.cons.map(p=><div key={p} style={{fontSize:11,color:'var(--red)',display:'flex',gap:5,marginBottom:3}}><span>–</span>{p}</div>)}
                <div style={{marginTop:12,padding:'8px 10px',background:'var(--bg2)',borderRadius:6,fontSize:11,color:'var(--tx)'}}>{c.suitable}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. VM vs Docker vs Kubernetes */}
        <div className="card" style={{marginBottom:24}}>
          <div style={{fontSize:15,fontWeight:700,marginBottom:20}}>Virtualization vs Containerization</div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:18,marginBottom:20}}>
            {[
              { title:'Virtual Machines', icon:'🖥️', color:'var(--orange)', layer:'Hypervisor (VMware/KVM)',
                props:[['Boot time','1-3 minutes'],['Size','GBs (full OS)'],['Isolation','Full OS isolation'],['Density','~10-20 per host'],['AWS service','EC2 Instances']],
                use:'NexTextile EC2: ERP cluster (t3.xlarge ×4), CRM (t3.large ×3), WMS (t3.xlarge ×5)' },
              { title:'Docker Containers', icon:'🐳', color:'var(--blue)', layer:'Docker Engine / containerd',
                props:[['Boot time','Milliseconds'],['Size','MBs (shared kernel)'],['Isolation','Process isolation'],['Density','100s per host'],['AWS service','ECS Fargate']],
                use:'NexTextile CI/CD: Docker images built & pushed to ECR, deployed via ECS Fargate' },
              { title:'Kubernetes (K8s)', icon:'⚙️', color:'var(--cyan)', layer:'Container Orchestration',
                props:[['Boot time','Seconds'],['Size','MBs + control plane'],['Isolation','Namespace isolation'],['Density','1000s across cluster'],['AWS service','EKS (Elastic K8s)']],
                use:'Future: NexTextile could migrate to EKS for advanced auto-scaling across regions' },
            ].map(t=>(
              <div key={t.title} style={{background:'var(--bg3)',border:'1px solid var(--bd)',borderRadius:12,padding:18}}>
                <div style={{fontSize:26,marginBottom:8}}>{t.icon}</div>
                <div style={{fontSize:14,fontWeight:700,color:t.color,marginBottom:3}}>{t.title}</div>
                <div style={{fontSize:10,color:'var(--tx2)',marginBottom:14}}>{t.layer}</div>
                {t.props.map(([k,v])=>(
                  <div key={k} style={{display:'flex',justifyContent:'space-between',fontSize:11,marginBottom:7,padding:'5px 0',borderBottom:'1px solid var(--bd)'}}>
                    <span style={{color:'var(--tx2)'}}>{k}</span>
                    <span style={{color:t.color,fontWeight:500}}>{v}</span>
                  </div>
                ))}
                <div style={{marginTop:12,fontSize:11,color:'var(--tx2)',lineHeight:1.5}}>{t.use}</div>
              </div>
            ))}
          </div>
          {/* Architecture diagram */}
          <div style={{background:'var(--bg3)',border:'1px solid var(--bd)',borderRadius:10,padding:18}}>
            <div style={{fontSize:12,fontWeight:600,marginBottom:12}}>Architecture Stack Comparison</div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12}}>
              {[
                {title:'VM Stack',color:'var(--orange)',layers:['Application','Guest OS (Linux)','Hypervisor','Physical Hardware']},
                {title:'Container Stack',color:'var(--blue)',layers:['App A','App B','App C','Docker Engine','Host OS (Linux)','Physical Hardware']},
                {title:'K8s Stack',color:'var(--cyan)',layers:['Pod A','Pod B','Pod C','Kubernetes Control Plane','Container Runtime','Host OS','Physical/Cloud Hardware']},
              ].map(s=>(
                <div key={s.title} style={{textAlign:'center'}}>
                  <div style={{fontSize:11,fontWeight:600,color:s.color,marginBottom:8}}>{s.title}</div>
                  {s.layers.map((l,i)=>(
                    <div key={l} style={{background:i===0?`${s.color}22`:'var(--bg2)',border:`1px solid ${i===0?s.color:'var(--bd)'}`,borderRadius:4,padding:'5px 8px',fontSize:10,marginBottom:3,color:i===0?s.color:'var(--tx2)'}}>{l}</div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4. Cloud effect on business operations */}
        <div className="card">
          <div style={{fontSize:15,fontWeight:700,marginBottom:20}}>Cloud Impact on NexTextile Daily Operations</div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:18}}>
            {[
              { dept:'Warehouse (WMS)', icon:'🏭', color:'var(--orange)',
                before:['Manual stock count (daily)','Paper-based orders','No real-time visibility','Local server downtime risk'],
                after:['Real-time barcode/RFID scanning','Auto stock alerts via CloudWatch','Live dashboard from any device','99.97% uptime SLA'] },
              { dept:'Order Processing (ERP)', icon:'⚙️', color:'var(--blue)',
                before:['Manual order entry','Slow processing (2-3 days)','No inter-warehouse sync','Data silos'],
                after:['Automated order pipeline','Same-day processing','Real-time inter-warehouse sync','Centralised ERP on AWS RDS'] },
              { dept:'Customer Service (CRM)', icon:'👥', color:'var(--cyan)',
                before:['Local CRM, office only','No remote access','Slow customer response','Data loss risk'],
                after:['Cloud CRM anywhere','Client VPN for remote staff','Instant customer history','Daily S3 backups, KMS encrypted'] },
            ].map(d=>(
              <div key={d.dept} style={{background:'var(--bg3)',border:'1px solid var(--bd)',borderRadius:12,padding:18}}>
                <div style={{fontSize:22,marginBottom:8}}>{d.icon}</div>
                <div style={{fontSize:13,fontWeight:700,color:d.color,marginBottom:14}}>{d.dept}</div>
                <div style={{fontSize:10,color:'var(--tx3)',textTransform:'uppercase',letterSpacing:'.5px',marginBottom:8}}>Before (On-Premises)</div>
                {d.before.map(b=><div key={b} style={{fontSize:11,color:'var(--red)',display:'flex',gap:5,marginBottom:4}}><span>✕</span>{b}</div>)}
                <div style={{fontSize:10,color:'var(--tx3)',textTransform:'uppercase',letterSpacing:'.5px',margin:'12px 0 8px'}}>After (AWS Cloud)</div>
                {d.after.map(a=><div key={a} style={{fontSize:11,color:'var(--green)',display:'flex',gap:5,marginBottom:4}}><span>✓</span>{a}</div>)}
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  )
}
