import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Survey Portal',
  description: 'Survey Portal Page',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-[100vh] max-w-[400px] mx-auto bg-gray-100">
          {children}
        </div>
      </body>
    </html>
  )
}
