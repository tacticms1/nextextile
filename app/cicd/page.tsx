'use client'
import { useState } from 'react'

const STAGES = [
  { name:'Source', icon:'📁', desc:'GitHub · main branch', detail:'Checkout a3f9b2c', color:'#3fb950', time:'0m 03s', status:'passed' },
  { name:'Build', icon:'🔨', desc:'Docker · node:18-alpine', detail:'Image: ecr/nextextile:88', color:'#3fb950', time:'1m 12s', status:'passed' },
  { name:'Unit Tests', icon:'🧪', desc:'Jest · 137 tests', detail:'Coverage: 87.4%', color:'#3fb950', time:'0m 47s', status:'passed' },
  { name:'Security', icon:'🛡️', desc:'Snyk · 0 vulnerabilities', detail:'All checks passed', color:'#3fb950', time:'0m 31s', status:'passed' },
  { name:'Deploy', icon:'🚀', desc:'AWS Amplify · SSR', detail:'nextextile.xyz → live', color:'#3fb950', time:'1m 28s', status:'passed' },
  { name:'Monitor', icon:'📊', desc:'CloudWatch · healthy', detail:'All systems operational', color:'#3fb950', time:'0m 12s', status:'passed' },
]

const LOGS = [
  { stage:'Source Code', status:'PASSED', lines:[
    '✓ Checkout main branch',
    '✓ Pull commit a3f9b2c',
    '→ Author: Ahmad Karimov',
    '→ Files changed: 14',
    '✓ Source ready in 3s',
  ]},
  { stage:'Build', status:'PASSED', lines:[
    '✓ Docker build initiated',
    '+ Pulling base image node:18-alpine',
    '✓ npm install (234 packages)',
    '✓ npm run build — Next.js 16',
    '✓ Image pushed: ecr/nextextile:88',
    '→ Image size: 148MB',
  ]},
  { stage:'Unit Tests', status:'PASSED', lines:[
    '✓ Test Suite: ERP (47 tests)',
    '✓ Test Suite: CRM (38 tests)',
    '✓ Test Suite: WMS (52 tests)',
    '→ Coverage: 87.4%',
    '✓ All 137 tests passed',
  ]},
  { stage:'Security Scan', status:'PASSED', lines:[
    '✓ Snyk dependency scan complete',
    '✓ 0 critical vulnerabilities',
    '✓ 0 high vulnerabilities',
    '→ 2 low (accepted)',
    '✓ OWASP Top 10 — clear',
  ]},
  { stage:'Deploy', status:'PASSED', lines:[
    '✓ Connecting to AWS Amplify...',
    '✓ Uploading build artifacts...',
    '✓ SSR functions deployed',
    '✓ CloudFront cache invalidated',
    '✓ Live: https://nextextile.xyz',
    '✓ Live: https://www.nextextile.xyz',
    '✓ Zero-downtime deployment complete',
  ]},
  { stage:'Monitor', status:'PASSED', lines:[
    '✓ CloudWatch health check — OK',
    '✓ ERP response: 48ms',
    '✓ CRM response: 31ms',
    '✓ WMS response: 55ms',
    '✓ All Systems Operational',
  ]},
]

const HISTORY = [
  { id:'#88', msg:'fix: domain DNS configuration update', branch:'main', time:'3m 33s', status:'passed', by:'A. Karimov', date:'2026-06-13 08:47', url:'https://nextextile.xyz' },
  { id:'#87', msg:'feat: add compare & improvements pages', branch:'main', time:'4m 12s', status:'passed', by:'A. Karimov', date:'2026-06-13 08:31', url:'https://nextextile.xyz' },
  { id:'#86', msg:'fix: use npm install instead of npm ci', branch:'main', time:'3m 58s', status:'passed', by:'A. Karimov', date:'2026-06-13 08:04', url:'https://nextextile.xyz' },
  { id:'#85', msg:'Initial commit: NexTextile cloud dashboard', branch:'main', time:'4m 44s', status:'passed', by:'A. Karimov', date:'2026-06-13 07:52', url:'https://nextextile.xyz' },
  { id:'#84', msg:'chore: amplify.yml build configuration', branch:'main', time:'—', status:'failed', by:'A. Karimov', date:'2026-06-13 07:41', url:'' },
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

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js 18
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm install

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

      - name: Deploy to AWS Amplify
        run: |
          aws amplify start-job \\
            --app-id d294vf1jo5bdm \\
            --branch-name main \\
            --job-type RELEASE`

export default function CICD() {
  const [activeLog, setActiveLog] = useState(0)
  const SC: Record<string, string> = { passed: 't-g', failed: 't-r', running: 't-b' }

  return (
    <>
      <header style={{ background: 'var(--bg2)', borderBottom: '1px solid var(--bd)', padding: '14px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <div>
          <div style={{ fontSize: 17, fontWeight: 600 }}>CI/CD Pipeline</div>
          <div style={{ fontSize: 11, color: 'var(--tx2)', marginTop: 2 }}>GitHub Actions → AWS Amplify · nextextile.xyz</div>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <a href="https://nextextile.xyz" target="_blank" rel="noreferrer" style={{ fontSize: 11, color: 'var(--cyan)', textDecoration: 'none' }}>🌐 nextextile.xyz ↗</a>
          <span className="tag t-g">● Build #88 Deployed</span>
        </div>
      </header>

      <div style={{ padding: 28 }}>
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 18, marginBottom: 24 }}>
          {[
            { label: 'Success Rate', val: '80%', color: 'var(--green)', icon: '✅', sub: '4 of 5 builds passed' },
            { label: 'Avg Build Time', val: '4m 12s', color: 'var(--cyan)', icon: '⏱', sub: 'Including test & deploy' },
            { label: 'Total Builds', val: '5', color: 'var(--blue)', icon: '🔄', sub: 'Since first commit' },
            { label: 'Live URL', val: 'nextextile.xyz', color: 'var(--purple)', icon: '🌐', sub: 'AWS Amplify SSR' },
          ].map(s => (
            <div key={s.label} style={{ background: 'var(--bg2)', border: '1px solid var(--bd)', borderRadius: 12, padding: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 11, color: 'var(--tx2)' }}>{s.label}</span>
                <span style={{ fontSize: 18 }}>{s.icon}</span>
              </div>
              <div style={{ fontSize: 20, fontWeight: 700, color: s.color, marginBottom: 3 }}>{s.val}</div>
              <div style={{ fontSize: 10, color: 'var(--tx3)' }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Latest Pipeline */}
        <div className="card" style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Build #88 — Deployed Successfully ✅</div>
              <div style={{ fontSize: 11, color: 'var(--tx2)', marginTop: 3 }}>
                main · a3f9b2c · "fix: domain DNS configuration update" · 2026-06-13 08:47
              </div>
            </div>
            <a href="https://nextextile.xyz" target="_blank" rel="noreferrer" className="btn btn-g" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
              🌐 View Live Site
            </a>
          </div>

          {/* Pipeline stages */}
          <div style={{ display: 'flex', alignItems: 'stretch', gap: 0, marginBottom: 24 }}>
            {STAGES.map((s, i) => (
              <div key={s.name} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                <div
                  onClick={() => setActiveLog(i)}
                  style={{
                    flex: 1, background: 'rgba(63,185,80,.08)',
                    border: `1px solid #3fb950`,
                    borderRadius: 10, padding: '12px 10px', textAlign: 'center',
                    cursor: 'pointer', transition: 'all .2s',
                    outline: activeLog === i ? '2px solid #3fb950' : 'none',
                    minWidth: 100
                  }}>
                  <div style={{ fontSize: 20, marginBottom: 5 }}>{s.icon}</div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: '#3fb950', marginBottom: 2 }}>{s.name}</div>
                  <div style={{ fontSize: 9, color: 'var(--tx3)', marginBottom: 4 }}>{s.desc}</div>
                  <div style={{ fontSize: 10, color: '#3fb950', fontFamily: 'monospace' }}>✓ {s.time}</div>
                </div>
                {i < 5 && <div style={{ width: 20, height: 2, background: '#3fb950', flexShrink: 0, margin: '0 2px' }}></div>}
              </div>
            ))}
          </div>

          {/* Stage log */}
          <div style={{ background: 'var(--bg3)', border: '1px solid var(--bd)', borderRadius: 8, padding: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--green)' }}>📋 {LOGS[activeLog].stage} — Logs</span>
              <span className="tag t-g">✓ {LOGS[activeLog].status.toUpperCase()}</span>
            </div>
            {LOGS[activeLog].lines.map((l, i) => (
              <div key={i} style={{ fontSize: 12, fontFamily: 'monospace', color: l.startsWith('✓') ? 'var(--green)' : l.startsWith('+') ? 'var(--cyan)' : 'var(--tx2)', padding: '2px 0' }}>{l}</div>
            ))}
          </div>
          <div style={{ fontSize: 10, color: 'var(--tx3)', marginTop: 8 }}>↑ Click on any stage to view its logs</div>
        </div>

        {/* YAML + History */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22 }}>
          <div className="card" style={{ marginBottom: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>GitHub Actions — Workflow File</div>
            <pre style={{ background: 'var(--bg3)', border: '1px solid var(--bd)', borderRadius: 8, padding: 16, fontSize: 11, color: 'var(--tx2)', overflow: 'auto', maxHeight: 480, lineHeight: 1.6 }}>{YAML}</pre>
          </div>
          <div className="card" style={{ marginBottom: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Build History</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {HISTORY.map(h => (
                <div key={h.id} style={{ background: 'var(--bg3)', border: `1px solid ${h.status === 'passed' ? 'var(--bd)' : 'var(--red)'}`, borderRadius: 8, padding: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                    <span style={{ fontFamily: 'monospace', fontSize: 12, color: 'var(--cyan)', fontWeight: 700 }}>{h.id}</span>
                    <span className={`tag ${SC[h.status]}`}>{h.status === 'passed' ? '✓ passed' : '✕ failed'}</span>
                  </div>
                  <div style={{ fontSize: 12, marginBottom: 4 }}>{h.msg}</div>
                  <div style={{ display: 'flex', gap: 12, fontSize: 10, color: 'var(--tx2)', flexWrap: 'wrap' }}>
                    <span>🌿 {h.branch}</span>
                    <span>⏱ {h.time}</span>
                    <span>👤 {h.by}</span>
                    <span>📅 {h.date}</span>
                  </div>
                  {h.url && (
                    <a href={h.url} target="_blank" rel="noreferrer" style={{ fontSize: 10, color: 'var(--cyan)', textDecoration: 'none', marginTop: 6, display: 'block' }}>🌐 {h.url}</a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
