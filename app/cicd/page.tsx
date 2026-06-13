'use client'
import { useState, useEffect } from 'react'

const STAGES = [
  { name:'Source', icon:'📁', desc:'GitHub push triggers workflow', color:'#58a6ff', time:'0s' },
  { name:'Build', icon:'🔨', desc:'npm install + Next.js build', color:'#39d0d8', time:'45s' },
  { name:'Test', icon:'🧪', desc:'Jest unit + integration tests', color:'#a371f7', time:'1m 12s' },
  { name:'Security', icon:'🛡', desc:'SAST/DAST + dependency scan', color:'#f0883e', time:'38s' },
  { name:'Deploy', icon:'🚀', desc:'Push to ECS Fargate + S3', color:'#3fb950', time:'28s' },
  { name:'Monitor', icon:'📊', desc:'CloudWatch health checks', color:'#3fb950', time:'Live' },
]

const HISTORY = [
  { id:'#87',msg:'feat: WMS auto-scaling rules',branch:'main',time:'2m 14s',status:'running',by:'A. Karimov'},
  { id:'#86',msg:'fix: CRM email validation',branch:'main',time:'4m 01s',status:'passed',by:'N. Rashidova'},
  { id:'#85',msg:'chore: update dependencies',branch:'main',time:'3m 44s',status:'passed',by:'S. Toshmatov'},
  { id:'#84',msg:'feat: inventory CSV export',branch:'feat/csv',time:'4m 22s',status:'passed',by:'A. Karimov'},
  { id:'#83',msg:'fix: order status race condition',branch:'hotfix',time:'—',status:'failed',by:'A. Karimov'},
]

const YAML = `name: NexTextile CI/CD Pipeline

on:
  push:
    branches: [main, 'feat/**']
  pull_request:
    branches: [main]

env:
  AWS_REGION: eu-west-1
  ECR_REPOSITORY: nextextile-app
  ECS_CLUSTER: nextextile-prod
  ECS_SERVICE: nextextile-service

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test -- --coverage

      - name: Security scan (Snyk)
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: \${{ secrets.SNYK_TOKEN }}

  deploy:
    needs: build-and-test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: \${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: \${{ env.AWS_REGION }}

      - name: Build & push Docker image to ECR
        run: |
          aws ecr get-login-password | docker login --username AWS \\
            --password-stdin \${{ secrets.ECR_REGISTRY }}
          docker build -t \$ECR_REPOSITORY .
          docker push \${{ secrets.ECR_REGISTRY }}/\$ECR_REPOSITORY:latest

      - name: Deploy to ECS Fargate
        run: |
          aws ecs update-service \\
            --cluster \$ECS_CLUSTER \\
            --service \$ECS_SERVICE \\
            --force-new-deployment`

export default function CICD() {
  const [active, setActive] = useState(4)
  const [pct, setPct] = useState(62)

  useEffect(()=>{
    const t = setInterval(()=>{
      setPct(p=>{ const n=p+1; if(n>=100){ setActive(a=>Math.min(a+1,5)); return 0 } return n })
    },150)
    return ()=>clearInterval(t)
  },[])

  const SC:Record<string,string> = { passed:'t-g', failed:'t-r', running:'t-b' }

  return (
    <>
      <header style={{background:'var(--bg2)',borderBottom:'1px solid var(--bd)',padding:'14px 28px',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:50}}>
        <div>
          <div style={{fontSize:17,fontWeight:600}}>CI/CD Pipeline</div>
          <div style={{fontSize:11,color:'var(--tx2)',marginTop:2}}>GitHub Actions → AWS ECS Fargate — Continuous Deployment</div>
        </div>
        <span className="tag t-b">● Build #87 Running</span>
      </header>

      <div style={{padding:28}}>
        {/* Pipeline visual */}
        <div className="card" style={{marginBottom:24}}>
          <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>Live Pipeline — Build #87</div>
          <div style={{fontSize:11,color:'var(--tx2)',marginBottom:20}}>main · a3f9b2c · "feat: WMS auto-scaling rules"</div>
          <div style={{display:'flex',alignItems:'stretch',gap:0,overflowX:'auto'}}>
            {STAGES.map((s,i)=>{
              const done = i<active, running=i===active, pending=i>active
              return (
                <div key={s.name} style={{display:'flex',alignItems:'center',flex:1}}>
                  <div style={{
                    flex:1,background:done?`rgba(63,185,80,.08)`:running?`rgba(88,166,255,.1)`:`rgba(0,0,0,.2)`,
                    border:`1px solid ${done?'var(--green)':running?s.color:'var(--bd)'}`,
                    borderRadius:10,padding:'14px 12px',textAlign:'center',
                    opacity:pending?.4:1,transition:'all .3s',minWidth:110
                  }}>
                    <div style={{fontSize:22,marginBottom:6}}>{s.icon}</div>
                    <div style={{fontSize:12,fontWeight:600,color:done?'var(--green)':running?s.color:'var(--tx2)',marginBottom:3}}>{s.name}</div>
                    <div style={{fontSize:10,color:'var(--tx3)',marginBottom:5}}>{s.desc}</div>
                    <div style={{fontSize:10,color:done?'var(--green)':running?s.color:'var(--tx3)',fontFamily:'monospace'}}>
                      {done?'✓ '+s.time:running?'⟳ '+s.time:s.time}
                    </div>
                    {running && <div style={{marginTop:8}}><div className="prog"><div className="prog-bar" style={{width:`${pct}%`,background:s.color,transition:'width .15s'}}></div></div></div>}
                  </div>
                  {i<5 && <div style={{width:24,height:2,background:done?'var(--green)':'var(--bd)',flexShrink:0,margin:'0 2px'}}></div>}
                </div>
              )
            })}
          </div>
        </div>

        {/* Stats */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:18,marginBottom:24}}>
          {[
            {label:'Deployments (30d)',val:'34',color:'var(--blue)',icon:'🚀'},
            {label:'Success Rate',val:'97.1%',color:'var(--green)',icon:'✅'},
            {label:'Avg Build Time',val:'3m 54s',color:'var(--cyan)',icon:'⏱'},
            {label:'Coverage',val:'87.4%',color:'var(--purple)',icon:'🧪'},
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

        {/* YAML + History */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:22}}>
          <div className="card" style={{marginBottom:0}}>
            <div style={{fontSize:14,fontWeight:600,marginBottom:12}}>GitHub Actions Workflow</div>
            <pre style={{background:'var(--bg3)',border:'1px solid var(--bd)',borderRadius:8,padding:16,fontSize:11,color:'var(--tx2)',overflow:'auto',maxHeight:480,lineHeight:1.5}}>{YAML}</pre>
          </div>
          <div className="card" style={{marginBottom:0}}>
            <div style={{fontSize:14,fontWeight:600,marginBottom:16}}>Build History</div>
            <div style={{display:'flex',flexDirection:'column',gap:10}}>
              {HISTORY.map(h=>(
                <div key={h.id} style={{background:'var(--bg3)',border:'1px solid var(--bd)',borderRadius:8,padding:12}}>
                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:5}}>
                    <span style={{fontFamily:'monospace',fontSize:12,color:'var(--cyan)',fontWeight:700}}>{h.id}</span>
                    <span className={`tag ${SC[h.status]}`}>{h.status}</span>
                  </div>
                  <div style={{fontSize:12,marginBottom:3}}>{h.msg}</div>
                  <div style={{display:'flex',gap:14,fontSize:11,color:'var(--tx2)'}}>
                    <span>🌿 {h.branch}</span><span>⏱ {h.time}</span><span>👤 {h.by}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
