import type { Metadata } from 'next'
import { Noto_Sans_JP, Cinzel_Decorative } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const notoSansJP = Noto_Sans_JP({ subsets: ["latin"], weight: ["400", "700", "900"] });
const cinzelDecorative = Cinzel_Decorative({ subsets: ["latin"], weight: ["400", "700", "900"], variable: "--font-cinzel" });

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" className={`${notoSansJP.className} ${cinzelDecorative.variable}`}>
      <head>
        {/* 重い背景画像をブラウザに最優先で先読みさせる */}
        <link rel="preload" href="/loading-bg-new.png" as="image" />
        <link rel="preload" href="/gacha-bg.png" as="image" />
        <link rel="preload" href="/quest-alpha-logo.png" as="image" />
      </head>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
