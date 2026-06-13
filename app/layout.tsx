import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Sidebar from '@/components/Sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NexTextile Cloud Platform',
  description: 'Cloud networking platform for NexTextile Wholesale Ltd — ERP, CRM, WMS',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="flex min-h-screen" style={{ background: 'var(--bg)', color: 'var(--tx)' }}>
        <Sidebar />
        <main className="flex-1 flex flex-col" style={{ marginLeft: '240px', minHeight: '100vh' }}>
          {children}
        </main>
      </body>
    </html>
  )
}
