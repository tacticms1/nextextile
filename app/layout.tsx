import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/components/AuthProvider'
import { CartProvider } from '@/components/CartProvider'
import AppShell from '@/components/AppShell'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NexTextile Cloud Platform',
  description: 'Cloud networking platform for NexTextile Wholesale Ltd — ERP, CRM, WMS, SRM',
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body style={{ background: 'var(--bg)', color: 'var(--tx)' }}>
        <AuthProvider>
          <CartProvider>
            <AppShell>{children}</AppShell>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
