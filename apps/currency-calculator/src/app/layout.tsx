import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cash Counter - Currency Calculator",
  description: "Your Personal Money Management Tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
