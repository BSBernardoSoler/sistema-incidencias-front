// app/layout.tsx
import { Outfit } from 'next/font/google'
import './globals.css'
import ClientRoot from '@/components/ClientRoot'

const outfit = Outfit({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${outfit.className} dark:bg-gray-900`}>
        <ClientRoot>
          {children}
        </ClientRoot>
      </body>
    </html>
  )
}
