import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Vannabe — Data Science & IoT Engineer',
  description: 'Portfolio of Vannabe, a data science student building useful systems from data, sensors and thoughtful design.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>
}
