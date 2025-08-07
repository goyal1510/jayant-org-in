import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Jayant - Full Stack Developer",
  description: "Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies. Creating beautiful, functional, and user-centered digital experiences.",
  keywords: ["Full Stack Developer", "React", "Node.js", "TypeScript", "Next.js", "Web Development"],
  authors: [{ name: "Jayant" }],
  creator: "Jayant",
  icons: {
    icon: [
      { url: "/assets/Jayant_favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/assets/Jayant_favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/assets/Jayant_favicon_io/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "android-chrome-192x192", url: "/assets/Jayant_favicon_io/android-chrome-192x192.png" },
      { rel: "android-chrome-512x512", url: "/assets/Jayant_favicon_io/android-chrome-512x512.png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://portfolio.jayant.org.in",
    title: "Jayant - Full Stack Developer",
    description: "Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies.",
    siteName: "Jayant Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jayant - Full Stack Developer",
    description: "Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies.",
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body className="antialiased overflow-x-hidden">
        <ThemeProvider
          defaultTheme="system"
          storageKey="portfolio-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
