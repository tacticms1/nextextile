export default function Security() {
  const score = 94
  const logs = [
    {time:'14:32:11',user:'amir.karimov',action:'ConsoleLogin',resource:'AWS Console',ip:'195.69.x.x',result:'Success'},
    {time:'14:28:44',user:'ci-deploy-bot',action:'UpdateService',resource:'ecs:nextextile-service',ip:'AWS Internal',result:'Success'},
    {time:'14:15:02',user:'root',action:'FailedLogin',resource:'AWS Console',ip:'203.0.113.x',result:'Denied'},
    {time:'13:58:30',user:'nilufar.r',action:'GetSecretValue',resource:'secretsmanager:db-creds',ip:'10.0.2.x',result:'Success'},
    {time:'13:45:17',user:'unknown',action:'DescribeInstances',resource:'ec2:*',ip:'45.33.x.x',result:'Denied'},
    {time:'13:22:05',user:'sardor.t',action:'PutObject',resource:'s3:nextextile-backups',ip:'10.0.2.x',result:'Success'},
  ]
  const fw = {
    inbound:[
      {rule:100,proto:'TCP',port:'443',src:'0.0.0.0/0',desc:'HTTPS from internet',allow:true},
      {rule:110,proto:'TCP',port:'80',src:'0.0.0.0/0',desc:'HTTP (redirect only)',allow:true},
      {rule:120,proto:'TCP',port:'22',src:'10.0.1.20/32',desc:'SSH from Bastion only',allow:true},
      {rule:130,proto:'TCP',port:'5432',src:'10.0.2.0/24',desc:'PostgreSQL internal',allow:true},
      {rule:900,proto:'ALL','port':'ALL',src:'0.0.0.0/0',desc:'Default deny all',allow:false},
    ],
    outbound:[
      {rule:100,proto:'TCP',port:'443',dst:'0.0.0.0/0',desc:'HTTPS to AWS APIs',allow:true},
      {rule:110,proto:'TCP',port:'443',dst:'0.0.0.0/0',desc:'HTTPS outbound via NAT',allow:true},
      {rule:120,proto:'UDP',port:'123',dst:'169.254.169.123/32',desc:'NTP time sync',allow:true},
      {rule:900,proto:'ALL',port:'ALL',dst:'0.0.0.0/0',desc:'Default deny all',allow:false},
    ]
  }

  const circumference = 2 * Math.PI * 54
  const dash = circumference * (1 - score/100)

  return (
    <>
      <header style={{background:'var(--bg2)',borderBottom:'1px solid var(--bd)',padding:'14px 28px'}}>
        <div style={{fontSize:17,fontWeight:600}}>Security Centre</div>
        <div style={{fontSize:11,color:'var(--tx2)',marginTop:2}}>IAM · Security Groups · VPN · CloudTrail — AWS Security Hub</div>
      </header>

      <div style={{padding:28}}>
        {/* Score + VPN */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 2fr',gap:22,marginBottom:24}}>
          <div className="card" style={{marginBottom:0,textAlign:'center'}}>
            <div style={{fontSize:14,fontWeight:600,marginBottom:20}}>Security Score</div>
            <svg width="140" height="140" viewBox="0 0 140 140" style={{margin:'0 auto',display:'block'}}>
              <circle cx="70" cy="70" r="54" fill="none" stroke="var(--bg3)" strokeWidth="12"/>
              <circle cx="70" cy="70" r="54" fill="none" stroke="#3fb950" strokeWidth="12"
                strokeDasharray={circumference} strokeDashoffset={dash}
                strokeLinecap="round" transform="rotate(-90 70 70)" style={{transition:'stroke-dashoffset 1s'}}/>
              <text x="70" y="65" textAnchor="middle" fill="#3fb950" fontSize="28" fontWeight="800">{score}</text>
              <text x="70" y="82" textAnchor="middle" fill="#8b949e" fontSize="11">/ 100</text>
            </svg>
            <div style={{marginTop:16,display:'flex',flexDirection:'column',gap:8}}>
              {[['IAM Policies','✓','t-g'],['MFA Enabled','✓','t-g'],['SSL/TLS','✓','t-g'],['Logging','✓','t-g'],['Public Buckets','0 open','t-g'],['Open SSH Ports','Bastion only','t-g']].map(([l,v,c])=>(
                <div key={l} style={{display:'flex',justifyContent:'space-between',fontSize:12}}>
                  <span style={{color:'var(--tx2)'}}>{l}</span><span className={`tag ${c}`}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={{marginBottom:0}}>
            <div style={{fontSize:14,fontWeight:600,marginBottom:16}}>VPN Tunnels</div>
            <div style={{display:'flex',flexDirection:'column',gap:12}}>
              {[
                {name:'HQ Tashkent — AWS eu-west-1',ip:'195.69.43.10',proto:'IKEv2/IPSec',status:'Up',uptime:'14d 6h 22m',bw:'↑ 45 Mbps / ↓ 38 Mbps'},
                {name:'Samarkand WH — AWS eu-west-1',ip:'185.22.14.92',proto:'IKEv2/IPSec',status:'Up',uptime:'7d 2h 11m',bw:'↑ 28 Mbps / ↓ 21 Mbps'},
                {name:'DR Site London — AWS eu-west-1',ip:'51.140.x.x',proto:'OpenVPN/TLS',status:'Standby',uptime:'72d (passive)',bw:'Not active'},
                {name:'Dev Client VPN (Remote Work)',ip:'Dynamic',proto:'AWS Client VPN',status:'Up',uptime:'Active sessions: 4',bw:'↑ 12 Mbps / ↓ 9 Mbps'},
              ].map(v=>(
                <div key={v.name} style={{background:'var(--bg3)',border:'1px solid var(--bd)',borderRadius:8,padding:14,display:'flex',justifyContent:'space-between',alignItems:'center',gap:16}}>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:600,fontSize:13,marginBottom:4}}>{v.name}</div>
                    <div style={{display:'flex',gap:16,fontSize:11,color:'var(--tx2)'}}>
                      <span>IP: {v.ip}</span><span>{v.proto}</span><span>{v.bw}</span>
                    </div>
                  </div>
                  <div>
                    <div style={{marginBottom:4}}><span className={`tag ${v.status==='Up'?'t-g':v.status==='Standby'?'t-o':'t-r'}`}>{v.status==='Up'?'●':v.status==='Standby'?'◉':'✕'} {v.status}</span></div>
                    <div style={{fontSize:10,color:'var(--tx2)',textAlign:'right'}}>{v.uptime}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Firewall Rules */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:22,marginBottom:24}}>
          {(['inbound','outbound'] as const).map(dir=>(
            <div key={dir} className="card" style={{marginBottom:0}}>
              <div style={{fontSize:14,fontWeight:600,marginBottom:12,textTransform:'capitalize'}}>{dir} Rules — Security Group</div>
              <table className="nt-table" style={{width:'100%'}}>
                <thead><tr><th>Rule</th><th>Proto</th><th>Port</th><th>{dir==='inbound'?'Source':'Dest'}</th><th>Action</th></tr></thead>
                <tbody>
                  {fw[dir].map(r=>(
                    <tr key={r.rule}>
                      <td style={{fontFamily:'monospace',fontSize:11}}>{r.rule}</td>
                      <td style={{fontSize:11}}>{r.proto}</td>
                      <td style={{fontSize:11,fontFamily:'monospace',color:'var(--cyan)'}}>{r.port}</td>
                      <td style={{fontSize:11,color:'var(--tx2)'}}>{dir==='inbound'?(r as any).src:(r as any).dst}</td>
                      <td><span className={`tag ${r.allow?'t-g':'t-r'}`}>{r.allow?'ALLOW':'DENY'}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>

        {/* CloudTrail */}
        <div className="card">
          <div style={{fontSize:14,fontWeight:600,marginBottom:16}}>CloudTrail — Recent Access Logs</div>
          <table className="nt-table" style={{width:'100%'}}>
            <thead><tr><th>Time</th><th>User / Role</th><th>Action</th><th>Resource</th><th>Source IP</th><th>Result</th></tr></thead>
            <tbody>
              {logs.map(l=>(
                <tr key={l.time+l.action}>
                  <td style={{fontFamily:'monospace',fontSize:11,color:'var(--tx2)'}}>{l.time}</td>
                  <td style={{fontSize:12,fontWeight:500}}>{l.user}</td>
                  <td><span className="tag">{l.action}</span></td>
                  <td style={{fontSize:11,color:'var(--tx2)',fontFamily:'monospace'}}>{l.resource}</td>
                  <td style={{fontSize:11,color:'var(--tx2)'}}>{l.ip}</td>
                  <td><span className={`tag ${l.result==='Success'?'t-g':'t-r'}`}>{l.result}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
