import type { Metadata } from "next"
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
  description: "Full Stack Developer specializing in React, Node.js, and modern web technologies. Creating beautiful, functional, and user-centered digital experiences.",
  keywords: ["Full Stack Developer", "React", "Node.js", "TypeScript", "Next.js", "Web Development"],
  authors: [{ name: "Jayant" }],
  creator: "Jayant",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jayant.dev",
    title: "Jayant - Full Stack Developer",
    description: "Full Stack Developer specializing in React, Node.js, and modern web technologies.",
    siteName: "Jayant Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jayant - Full Stack Developer",
    description: "Full Stack Developer specializing in React, Node.js, and modern web technologies.",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body className="antialiased">
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
