export default function Network() {
  return (
    <>
      <header style={{background:'var(--bg2)',borderBottom:'1px solid var(--bd)',padding:'14px 28px'}}>
        <div style={{fontSize:17,fontWeight:600}}>Network Architecture</div>
        <div style={{fontSize:11,color:'var(--tx2)',marginTop:2}}>AWS VPC Topology — eu-west-1 (Ireland)</div>
      </header>

      <div style={{padding:28}}>
        {/* VPC Diagram */}
        <div className="card" style={{marginBottom:24}}>
          <div style={{fontSize:14,fontWeight:600,marginBottom:6}}>VPC Network Topology Diagram</div>
          <div style={{fontSize:11,color:'var(--tx2)',marginBottom:20}}>CIDR: 10.0.0.0/16 · 3 Availability Zones · eu-west-1</div>
          <svg viewBox="0 0 900 520" style={{width:'100%',fontFamily:'inherit'}}>
            {/* Internet */}
            <rect x="360" y="10" width="180" height="40" rx="8" fill="rgba(88,166,255,.15)" stroke="#58a6ff" strokeWidth="1.5"/>
            <text x="450" y="35" textAnchor="middle" fill="#58a6ff" fontSize="13" fontWeight="600">🌐 Internet</text>
            {/* Arrow down */}
            <line x1="450" y1="50" x2="450" y2="80" stroke="#484f58" strokeWidth="2"/>
            <polygon points="445,80 455,80 450,88" fill="#484f58"/>
            {/* IGW */}
            <rect x="330" y="90" width="240" height="40" rx="8" fill="rgba(57,208,216,.1)" stroke="#39d0d8" strokeWidth="1.5"/>
            <text x="450" y="115" textAnchor="middle" fill="#39d0d8" fontSize="12" fontWeight="600">🔀 Internet Gateway (IGW)</text>
            <line x1="450" y1="130" x2="450" y2="155" stroke="#484f58" strokeWidth="2"/>
            <polygon points="445,155 455,155 450,163" fill="#484f58"/>
            {/* VPC outer box */}
            <rect x="20" y="165" width="860" height="340" rx="12" fill="none" stroke="#30363d" strokeWidth="2" strokeDasharray="8,4"/>
            <text x="35" y="188" fill="#484f58" fontSize="11" fontWeight="600">VPC — 10.0.0.0/16</text>
            {/* Public Subnet */}
            <rect x="40" y="195" width="380" height="160" rx="8" fill="rgba(88,166,255,.05)" stroke="#58a6ff" strokeWidth="1.5" strokeDasharray="5,3"/>
            <text x="55" y="212" fill="#58a6ff" fontSize="10">Public Subnet — 10.0.1.0/24 (AZ-a)</text>
            {/* Public components */}
            {[
              {x:60,y:225,w:100,h:36,col:'#3fb950',icon:'⚖️',label:'ALB',sub:'Load Balancer'},
              {x:175,y:225,w:100,h:36,col:'#f0883e',icon:'🔄',label:'NAT GW',sub:'10.0.1.10'},
              {x:60,y:278,w:100,h:36,col:'#a371f7',icon:'🔐',label:'VPN GW',sub:'Site-to-Site'},
              {x:175,y:278,w:100,h:36,col:'#39d0d8',icon:'🛡',label:'Bastion',sub:'SSH Access'},
            ].map(c=>(
              <g key={c.label}>
                <rect x={c.x} y={c.y} width={c.w} height={c.h} rx="6" fill="rgba(0,0,0,.3)" stroke={c.col} strokeWidth="1.2"/>
                <text x={c.x+c.w/2} y={c.y+14} textAnchor="middle" fill={c.col} fontSize="10" fontWeight="600">{c.icon} {c.label}</text>
                <text x={c.x+c.w/2} y={c.y+26} textAnchor="middle" fill="#8b949e" fontSize="9">{c.sub}</text>
              </g>
            ))}
            {/* Arrow public->private */}
            <line x1="420" y1="275" x2="480" y2="275" stroke="#484f58" strokeWidth="2"/>
            <polygon points="480,270 480,280 488,275" fill="#484f58"/>
            {/* Private Subnet */}
            <rect x="490" y="195" width="370" height="280" rx="8" fill="rgba(240,136,62,.05)" stroke="#f0883e" strokeWidth="1.5" strokeDasharray="5,3"/>
            <text x="505" y="212" fill="#f0883e" fontSize="10">Private Subnet — 10.0.2.0/24 (AZ-a,b,c)</text>
            {/* Private components */}
            {[
              {x:510,y:225,w:100,h:40,col:'#58a6ff',icon:'⚙️',label:'ERP',sub:'t3.xlarge ×4'},
              {x:630,y:225,w:100,h:40,col:'#39d0d8',icon:'👥',label:'CRM',sub:'t3.large ×3'},
              {x:510,y:280,w:100,h:40,col:'#f0883e',icon:'🏭',label:'WMS',sub:'t3.xlarge ×5'},
              {x:630,y:280,w:100,h:40,col:'#a371f7',icon:'🗄',label:'RDS',sub:'PostgreSQL'},
              {x:510,y:340,w:100,h:40,col:'#3fb950',icon:'💾',label:'ElastiCache',sub:'Redis cluster'},
              {x:630,y:340,w:100,h:40,col:'#f85149',icon:'🔒',label:'S3/KMS',sub:'Encrypted'},
            ].map(c=>(
              <g key={c.label}>
                <rect x={c.x} y={c.y} width={c.w} height={c.h} rx="6" fill="rgba(0,0,0,.3)" stroke={c.col} strokeWidth="1.2"/>
                <text x={c.x+c.w/2} y={c.y+16} textAnchor="middle" fill={c.col} fontSize="10" fontWeight="600">{c.icon} {c.label}</text>
                <text x={c.x+c.w/2} y={c.y+28} textAnchor="middle" fill="#8b949e" fontSize="9">{c.sub}</text>
              </g>
            ))}
            {/* On-prem */}
            <rect x="40" y="400" width="220" height="80" rx="8" fill="rgba(163,113,247,.08)" stroke="#a371f7" strokeWidth="1.5"/>
            <text x="150" y="425" textAnchor="middle" fill="#a371f7" fontSize="11" fontWeight="600">🏢 On-Premises DC</text>
            <text x="150" y="442" textAnchor="middle" fill="#8b949e" fontSize="9">NexTextile HQ — Tashkent</text>
            <text x="150" y="456" textAnchor="middle" fill="#8b949e" fontSize="9">Site-to-Site VPN</text>
            <text x="150" y="470" textAnchor="middle" fill="#8b949e" fontSize="9">BGP Routing</text>
            {/* VPN line */}
            <line x1="260" y1="440" x2="110" y2="296" stroke="#a371f7" strokeWidth="1.5" strokeDasharray="6,3"/>
          </svg>
        </div>

        {/* Network Components Table */}
        <div className="card" style={{marginBottom:24}}>
          <div style={{fontSize:14,fontWeight:600,marginBottom:16}}>Network Components</div>
          <table className="nt-table" style={{width:'100%'}}>
            <thead><tr><th>Component</th><th>Type</th><th>IP / CIDR</th><th>Purpose</th><th>Status</th></tr></thead>
            <tbody>
              {[
                ['Internet Gateway','AWS IGW','—','Enables internet access for public subnet','t-g'],
                ['Application Load Balancer','ALB','10.0.1.5','Distributes HTTP/S traffic to ERP/CRM/WMS','t-g'],
                ['NAT Gateway','NAT GW','10.0.1.10','Private subnet internet access (outbound only)','t-g'],
                ['Site-to-Site VPN','VPN Gateway','10.0.1.15','Encrypted tunnel to on-premises HQ','t-g'],
                ['Bastion Host','EC2 t3.micro','10.0.1.20','Secure SSH jump server for admin access','t-g'],
                ['ERP Cluster','EC2 Auto Scaling','10.0.2.0/28','4× t3.xlarge running ERP application','t-g'],
                ['CRM Cluster','EC2 Auto Scaling','10.0.2.16/28','3× t3.large running CRM application','t-g'],
                ['WMS Cluster','EC2 Auto Scaling','10.0.2.32/28','5× t3.xlarge running WMS application','t-g'],
                ['RDS PostgreSQL','Multi-AZ RDS','10.0.2.100','Primary database with standby replica','t-g'],
                ['ElastiCache','Redis Cluster','10.0.2.110','Session cache, 6× cache.r6g.large','t-g'],
              ].map(([c,t,ip,p,s])=>(
                <tr key={c}><td style={{fontWeight:500}}>{c}</td><td><span className="tag">{t}</span></td><td style={{fontFamily:'monospace',fontSize:11,color:'var(--cyan)'}}>{ip}</td><td style={{fontSize:12,color:'var(--tx2)'}}>{p}</td><td><span className={`tag ${s}`}>Active</span></td></tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cloud Models */}
        <div style={{fontSize:15,fontWeight:600,marginBottom:16}}>Cloud Service Models — IaaS vs PaaS vs SaaS</div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:18}}>
          {[
            { model:'IaaS', full:'Infrastructure as a Service', color:'var(--blue)', grad:'linear-gradient(135deg,#58a6ff,#39d0d8)', services:['EC2 Instances','VPC & Subnets','EBS Storage','Elastic Load Balancer','Auto Scaling Groups'], examples:'AWS EC2, Azure VMs, GCP Compute', control:'Full OS & runtime control', who:'DevOps / Cloud Engineers' },
            { model:'PaaS', full:'Platform as a Service', color:'var(--purple)', grad:'linear-gradient(135deg,#a371f7,#f0883e)', services:['AWS RDS (Database)','AWS Lambda','AWS Elastic Beanstalk','AWS ECS/EKS','AWS Amplify'], examples:'Heroku, Google App Engine', control:'App code only, platform managed', who:'Developers' },
            { model:'SaaS', full:'Software as a Service', color:'var(--green)', grad:'linear-gradient(135deg,#3fb950,#39d0d8)', services:['AWS WorkMail','Salesforce CRM','Microsoft 365','Slack / Teams','GitHub / GitLab'], examples:'Gmail, Zoom, Dropbox', control:'Configuration only', who:'End Users / Business' },
          ].map(m=>(
            <div key={m.model} style={{background:'var(--bg2)',border:'1px solid var(--bd)',borderRadius:12,padding:20,position:'relative',overflow:'hidden'}}>
              <div style={{position:'absolute',top:0,left:0,right:0,height:3,background:m.grad}}></div>
              <div style={{fontSize:28,fontWeight:800,color:m.color,marginBottom:4}}>{m.model}</div>
              <div style={{fontSize:12,color:'var(--tx2)',marginBottom:14}}>{m.full}</div>
              <div style={{fontSize:11,color:'var(--tx3)',textTransform:'uppercase',letterSpacing:'.5px',marginBottom:8}}>AWS Services Used</div>
              {m.services.map(s=>(
                <div key={s} style={{fontSize:12,color:'var(--tx2)',display:'flex',alignItems:'center',gap:6,marginBottom:5}}>
                  <span style={{color:m.color}}>▸</span>{s}
                </div>
              ))}
              <div style={{marginTop:14,borderTop:'1px solid var(--bd)',paddingTop:12}}>
                <div style={{fontSize:10,color:'var(--tx3)',marginBottom:4}}>Examples</div>
                <div style={{fontSize:11,color:'var(--tx2)'}}>{m.examples}</div>
              </div>
              <div style={{marginTop:10}}>
                <div style={{fontSize:10,color:'var(--tx3)',marginBottom:4}}>Control Level</div>
                <div style={{fontSize:11,color:m.color,fontWeight:500}}>{m.control}</div>
              </div>
              <div style={{marginTop:10}}>
                <div style={{fontSize:10,color:'var(--tx3)',marginBottom:4}}>Used By</div>
                <div style={{fontSize:11,color:'var(--tx2)'}}>{m.who}</div>
              </div>
            </div>
          ))}
        </div>
        {/* DNS + CDN */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:22,marginBottom:24}}>
          <div className="card" style={{marginBottom:0}}>
            <div style={{fontSize:14,fontWeight:600,marginBottom:16}}>DNS — Amazon Route 53</div>
            <div style={{display:'flex',flexDirection:'column',gap:10}}>
              {[
                {type:'A Record',name:'erp.nextextile.com',value:'ALB DNS → 10.0.1.5',ttl:'60s',desc:'ERP system entry point'},
                {type:'A Record',name:'crm.nextextile.com',value:'ALB DNS → 10.0.1.5',ttl:'60s',desc:'CRM system entry point'},
                {type:'A Record',name:'wms.nextextile.com',value:'ALB DNS → 10.0.1.5',ttl:'60s',desc:'WMS system entry point'},
                {type:'CNAME',name:'www.nextextile.com',value:'CloudFront Distribution',ttl:'300s',desc:'Static website via CDN'},
                {type:'MX',name:'nextextile.com',value:'mail.nextextile.com',ttl:'3600s',desc:'Email routing'},
              ].map(r=>(
                <div key={r.name} style={{background:'var(--bg3)',border:'1px solid var(--bd)',borderRadius:8,padding:12}}>
                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:4}}>
                    <span className="tag t-c">{r.type}</span>
                    <span style={{fontSize:10,color:'var(--tx3)'}}>TTL: {r.ttl}</span>
                  </div>
                  <div style={{fontSize:12,fontWeight:600,color:'var(--cyan)',marginBottom:2}}>{r.name}</div>
                  <div style={{fontSize:11,color:'var(--tx2)'}}>{r.value}</div>
                  <div style={{fontSize:10,color:'var(--tx3)',marginTop:4}}>{r.desc}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="card" style={{marginBottom:0}}>
            <div style={{fontSize:14,fontWeight:600,marginBottom:16}}>CDN — Amazon CloudFront</div>
            <div style={{background:'var(--bg3)',border:'1px solid var(--bd)',borderRadius:8,padding:14,marginBottom:12}}>
              <div style={{fontSize:12,fontWeight:600,color:'var(--orange)',marginBottom:8}}>How CloudFront Works</div>
              <div style={{display:'flex',alignItems:'center',gap:6,flexWrap:'wrap',fontSize:11}}>
                {['User Request','→','DNS (Route 53)','→','Nearest Edge Location','→','Cache Hit? Serve instantly','Miss? → Origin (AWS eu-west-1)'].map((s,i)=>(
                  <span key={i} style={{color:s==='→'?'var(--tx3)':s.includes('?')?'var(--green)':'var(--tx2)'}}>{s}</span>
                ))}
              </div>
            </div>
            {[
              {label:'Edge Locations',val:'600+ worldwide',color:'var(--blue)'},
              {label:'Cache Hit Rate (target)',val:'>90%',color:'var(--green)'},
              {label:'Latency (cached)',val:'< 20ms',color:'var(--cyan)'},
              {label:'Origin Protection',val:'WAF + Shield',color:'var(--purple)'},
              {label:'Protocols',val:'HTTP/2, HTTP/3, WebSocket',color:'var(--orange)'},
              {label:'SSL/TLS',val:'ACM Certificate (free)',color:'var(--green)'},
            ].map(r=>(
              <div key={r.label} style={{display:'flex',justifyContent:'space-between',fontSize:12,padding:'7px 0',borderBottom:'1px solid var(--bd)'}}>
                <span style={{color:'var(--tx2)'}}>{r.label}</span>
                <span style={{color:r.color,fontWeight:600}}>{r.val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Network Standards */}
        <div className="card">
          <div style={{fontSize:14,fontWeight:600,marginBottom:16}}>A.M1 — Network Standards & Protocols</div>
          <table className="nt-table" style={{width:'100%'}}>
            <thead><tr><th>Standard / Protocol</th><th>Layer (OSI)</th><th>Purpose</th><th>Used in NexTextile</th></tr></thead>
            <tbody>
              {[
                ['TCP/IP','Layer 3-4','Core internet protocol suite — IP addressing & reliable delivery','All EC2 ↔ EC2, EC2 ↔ RDS, Client ↔ ALB'],
                ['HTTPS / TLS 1.3','Layer 7','Encrypted web traffic — prevents man-in-the-middle attacks','All external traffic via ALB + CloudFront'],
                ['BGP (Border Gateway Protocol)','Layer 3','Dynamic routing between networks — VPN path selection','Site-to-Site VPN ↔ HQ Tashkent router'],
                ['DNS (RFC 1035)','Layer 7','Resolves domain names to IP addresses','Route 53 for all NexTextile subdomains'],
                ['IPSec / IKEv2','Layer 3','Encrypts IP packets — VPN tunnel security','Site-to-Site VPN tunnels (IKEv2)'],
                ['HTTP/2','Layer 7','Multiplexed web requests — reduces latency','CloudFront CDN + ALB to ECS containers'],
                ['VLAN / VPC','Layer 2-3','Network segmentation — isolates traffic','Public subnet vs Private subnet isolation'],
                ['OSPF / BGP','Layer 3','Interior/exterior routing protocols','AWS backbone routing + VPN BGP'],
                ['NTP (UDP 123)','Layer 4-7','Time synchronisation — critical for logs & TLS','All EC2 instances sync via AWS NTP'],
                ['SNMP / CloudWatch','Layer 7','Network monitoring — metrics & alerting','CloudWatch monitors all AWS resources'],
              ].map(([s,l,p,u])=>(
                <tr key={s}><td style={{fontWeight:500,color:'var(--cyan)'}}>{s}</td><td><span className="tag">{l}</span></td><td style={{fontSize:12,color:'var(--tx2)'}}>{p}</td><td style={{fontSize:11,color:'var(--green)'}}>{u}</td></tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </>
  )
}
