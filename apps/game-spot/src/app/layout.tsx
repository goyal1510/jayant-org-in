import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Game Spot - Your Gaming Hub",
  description: "A collection of fun games including Tic Tac Toe, Rock Paper Scissors, and Dare X",
  keywords: ["games", "gaming", "tic-tac-toe", "rock-paper-scissors", "dare-x", "entertainment"],
  icons: {
    icon: [
      { url: '/assets/favicon_io/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/assets/favicon_io/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/assets/favicon_io/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'icon', url: '/assets/favicon_io/favicon.ico' },
    ],
  },
  manifest: '/assets/favicon_io/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/favicon_io/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon_io/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon_io/favicon-16x16.png" />
        <link rel="icon" href="/assets/favicon_io/favicon.ico" />
        <link rel="manifest" href="/assets/favicon_io/site.webmanifest" />
      </head>
      <body className={inter.className}>
        <div className="flex h-screen bg-gray-900">
          <Sidebar />
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
