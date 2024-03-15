import './css/style.css'

import { Inter, Architects_Daughter, Jura, Trispace } from 'next/font/google'

import Header from '@/components/ui/header'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

const architects_daughter = Architects_Daughter({
  subsets: ['latin'],
  variable: '--font-architects-daughter',
  weight: '400',
  display: 'swap'
})

const jura = Jura({
  subsets: ['latin'],
  variable: '--font-jura',
  display: 'swap'
})

const trispace = Trispace({
  subsets: ['latin'],
  variable: '--font-trispace',
  display: 'swap'
})

export const metadata = {
  title: 'Team STEP',
  description: 'The next STEP in gaming',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${jura.variable} ${trispace.variable} ${inter.variable} ${architects_daughter.variable} font-jura antialiased bg-purple-900 text-gray-200 tracking-tight`}>
        <div className="flex flex-col min-h-screen overflow-hidden">
          <Header />
          {children}
        </div>
      </body>
    </html>
  )
}
 