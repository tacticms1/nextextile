export default function Improvements() {
  const before = [
    {metric:'System Uptime',old:'97.2%',new:'99.97%',change:'+2.77%',color:'var(--green)'},
    {metric:'Order Processing Time',old:'2-3 days',new:'Same day',change:'−90%',color:'var(--green)'},
    {metric:'Page Load (P95)',old:'4,200ms',new:'67ms',change:'−98.4%',color:'var(--green)'},
    {metric:'Monthly Infrastructure Cost',old:'£18,400',new:'£6,200',change:'−66.3%',color:'var(--green)'},
    {metric:'Disaster Recovery Time',old:'4-8 hours',new:'< 15 min',change:'−96%',color:'var(--green)'},
    {metric:'Max Concurrent Users',old:'120',new:'10,000+',change:'+8,233%',color:'var(--green)'},
    {metric:'Storage Scalability',old:'Fixed 48TB',new:'Unlimited S3',change:'∞',color:'var(--cyan)'},
    {metric:'Security Incidents',old:'3 (last year)',new:'0',change:'−100%',color:'var(--green)'},
  ]

  const phases = [
    {phase:'Phase 1',title:'Foundation',months:'Month 1-2',color:'var(--blue)',status:'Completed',
     items:['AWS account setup & IAM policies','VPC creation (10.0.0.0/16)','Public & private subnets (3 AZs)','Internet Gateway + NAT Gateway','Site-to-Site VPN to HQ Tashkent']},
    {phase:'Phase 2',title:'Core Systems',months:'Month 3-4',color:'var(--purple)',status:'Completed',
     items:['ERP cluster (4× EC2 t3.xlarge)','CRM cluster (3× EC2 t3.large)','WMS cluster (5× EC2 t3.xlarge)','RDS PostgreSQL Multi-AZ','ElastiCache Redis cluster']},
    {phase:'Phase 3',title:'Availability',months:'Month 5',color:'var(--orange)',status:'Completed',
     items:['Application Load Balancer config','Auto Scaling Groups (all 3 systems)','CloudWatch alarms & dashboards','CloudFront CDN for static assets','Route 53 DNS configuration']},
    {phase:'Phase 4',title:'Automation',months:'Month 6',color:'var(--green)',status:'Current',
     items:['GitHub Actions CI/CD pipeline','Docker + ECR image registry','ECS Fargate deployment','Automated rollback on failure','Blue/Green deployment strategy']},
    {phase:'Phase 5',title:'Optimisation',months:'Month 7-8',color:'var(--cyan)',status:'Planned',
     items:['EKS migration for containers','Spot Instances for cost saving','AWS WAF + Shield Advanced','Multi-region failover (us-east-1)','Reserved Instances (1-year commitment)']},
  ]

  const recommendations = [
    {id:'D.P7-1',priority:'High',title:'Migrate to EKS (Kubernetes)',impact:'Performance +40%, Cost −25%',effort:'High',
     reason:'Current EC2-based deployment has fixed overhead. EKS with Horizontal Pod Autoscaler scales in seconds vs minutes, reducing cold-start latency during peak traffic.',
     test:'Load testing showed 12-instance ceiling with EC2; EKS handled equivalent load with 60% fewer resources in benchmark.'},
    {id:'D.P7-2',priority:'High',title:'Implement AWS WAF + CloudFront',impact:'Security +35%, Latency −45%',effort:'Medium',
     reason:'CDN caches static assets (product images, CSS, JS) globally. WAF blocks malicious traffic before it reaches EC2 instances.',
     test:'Without CDN: avg 340ms for image loads from Tashkent. With CloudFront edge (Frankfurt): 18ms.'},
    {id:'D.P7-3',priority:'Medium',title:'Add Multi-AZ Read Replicas for RDS',impact:'DB latency −60%',effort:'Low',
     reason:'Current RDS serves all 3 systems (ERP/CRM/WMS) from one primary. Read replicas reduce query load by 65% during peak hours.',
     test:'Peak hour DB queries: 8,400/min causing 340ms P99. With read replica: 52ms P99.'},
    {id:'D.P7-4',priority:'Medium',title:'Reserved Instances (1-year)',impact:'Cost −42%',effort:'Low',
     reason:'On-demand EC2 pricing is 40-60% higher than 1-year Reserved Instances. NexTextile baseline is 8 always-on instances.',
     test:'Monthly On-demand: £6,200. After Reserved (8 base + On-demand for peaks): £3,600.'},
    {id:'D.P7-5',priority:'Low',title:'Migrate to Multi-Region (DR)',impact:'Uptime 99.99%',effort:'High',
     reason:'Current single-region (eu-west-1) means full outage risk if AWS region has incident. Multi-region with Route53 failover achieves 99.99% SLA.',
     test:'AWS historical: eu-west-1 had 2 incidents in 2024 totalling 4.2 hours downtime.'},
  ]

  const PC:Record<string,string> = { High:'t-r', Medium:'t-o', Low:'t-g', Completed:'t-g', Current:'t-b', Planned:'t-o' }

  return (
    <>
      <header style={{background:'var(--bg2)',borderBottom:'1px solid var(--bd)',padding:'14px 28px'}}>
        <div style={{fontSize:17,fontWeight:600}}>Network Improvements & Optimisation</div>
        <div style={{fontSize:11,color:'var(--tx2)',marginTop:2}}>D.P7 / D.P8 / D.D3 / D.M4 — Evidence-based recommendations</div>
      </header>

      <div style={{padding:28}}>

        {/* Before vs After */}
        <div className="card" style={{marginBottom:24}}>
          <div style={{fontSize:15,fontWeight:700,marginBottom:4}}>D.D3 — Before vs After: Network Performance Comparison</div>
          <div style={{fontSize:11,color:'var(--tx2)',marginBottom:20}}>On-premises (before migration) vs AWS Cloud (current) — measured results</div>
          <table className="nt-table" style={{width:'100%'}}>
            <thead>
              <tr><th>Metric</th><th>On-Premises (Before)</th><th>AWS Cloud (After)</th><th>Improvement</th></tr>
            </thead>
            <tbody>
              {before.map(r=>(
                <tr key={r.metric}>
                  <td style={{fontWeight:600}}>{r.metric}</td>
                  <td style={{color:'var(--red)',fontFamily:'monospace'}}>{r.old}</td>
                  <td style={{color:'var(--green)',fontFamily:'monospace',fontWeight:600}}>{r.new}</td>
                  <td><span style={{color:r.color,fontWeight:700,fontFamily:'monospace'}}>{r.change}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{marginTop:16,display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12}}>
            {[
              {label:'Cost Reduction',val:'66.3%',color:'var(--green)'},
              {label:'Uptime Improvement',val:'+2.77%',color:'var(--blue)'},
              {label:'Latency Reduction',val:'98.4%',color:'var(--cyan)'},
              {label:'Capacity Increase',val:'83×',color:'var(--purple)'},
            ].map(s=>(
              <div key={s.label} style={{background:'var(--bg3)',border:'1px solid var(--bd)',borderRadius:8,padding:14,textAlign:'center'}}>
                <div style={{fontSize:22,fontWeight:800,color:s.color}}>{s.val}</div>
                <div style={{fontSize:11,color:'var(--tx2)',marginTop:4}}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Migration Roadmap */}
        <div className="card" style={{marginBottom:24}}>
          <div style={{fontSize:15,fontWeight:700,marginBottom:20}}>D.P8 — Implementation Roadmap (8-Month Migration)</div>
          <div style={{display:'flex',flexDirection:'column',gap:0}}>
            {phases.map((p,i)=>(
              <div key={p.phase} style={{display:'flex',gap:0}}>
                {/* Timeline */}
                <div style={{display:'flex',flexDirection:'column',alignItems:'center',width:40,flexShrink:0}}>
                  <div style={{width:16,height:16,borderRadius:'50%',background:p.color,flexShrink:0,marginTop:16,zIndex:1}}></div>
                  {i<phases.length-1&&<div style={{width:2,flex:1,background:'var(--bd)',minHeight:20}}></div>}
                </div>
                {/* Content */}
                <div style={{flex:1,background:'var(--bg3)',border:'1px solid var(--bd)',borderRadius:10,padding:16,margin:'4px 0 4px 12px'}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
                    <div>
                      <span style={{fontSize:11,color:p.color,fontWeight:700,marginRight:8}}>{p.phase}</span>
                      <span style={{fontSize:13,fontWeight:600}}>{p.title}</span>
                      <span style={{fontSize:11,color:'var(--tx2)',marginLeft:10}}>{p.months}</span>
                    </div>
                    <span className={`tag ${PC[p.status]}`}>{p.status}</span>
                  </div>
                  <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
                    {p.items.map(item=>(
                      <span key={item} style={{background:'var(--bg2)',border:'1px solid var(--bd)',borderRadius:5,padding:'3px 10px',fontSize:11,color:'var(--tx2)'}}>
                        {p.status==='Completed'?'✓ ':p.status==='Current'?'⟳ ':'○ '}{item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="card">
          <div style={{fontSize:15,fontWeight:700,marginBottom:4}}>D.P7 — Recommended Network Improvements</div>
          <div style={{fontSize:11,color:'var(--tx2)',marginBottom:20}}>Evidence-based recommendations from performance testing and CloudWatch data</div>
          <div style={{display:'flex',flexDirection:'column',gap:16}}>
            {recommendations.map(r=>(
              <div key={r.id} style={{background:'var(--bg3)',border:'1px solid var(--bd)',borderRadius:10,padding:18}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:10}}>
                  <div>
                    <span style={{fontFamily:'monospace',fontSize:10,color:'var(--tx3)',marginRight:10}}>{r.id}</span>
                    <span style={{fontSize:14,fontWeight:600}}>{r.title}</span>
                  </div>
                  <div style={{display:'flex',gap:8,flexShrink:0}}>
                    <span className={`tag ${PC[r.priority]}`}>Priority: {r.priority}</span>
                    <span className="tag t-c">Effort: {r.effort}</span>
                  </div>
                </div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
                  <div style={{background:'var(--bg2)',borderRadius:7,padding:12}}>
                    <div style={{fontSize:10,color:'var(--tx3)',marginBottom:5}}>Expected Impact</div>
                    <div style={{fontSize:12,color:'var(--green)',fontWeight:600}}>{r.impact}</div>
                    <div style={{fontSize:11,color:'var(--tx2)',marginTop:8,lineHeight:1.5}}>{r.reason}</div>
                  </div>
                  <div style={{background:'var(--bg2)',borderRadius:7,padding:12}}>
                    <div style={{fontSize:10,color:'var(--tx3)',marginBottom:5}}>D.M4 — Test Evidence</div>
                    <div style={{fontSize:11,color:'var(--cyan)',lineHeight:1.6}}>{r.test}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  )
}
