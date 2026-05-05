import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Deploy Next.js with CI/CD to Vercel',
  description: 'GitHub Actions CI/CD pipeline for Next.js deployment to Vercel',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
