import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Weather Dashboard - Real-time Weather & Forecast",
  description: "Get current weather data and 5-day forecasts for any city worldwide. Features geolocation, recent searches, and responsive design.",
  keywords: ["weather", "forecast", "dashboard", "temperature", "humidity", "wind"],
  icons: {
    icon: [
      { url: '/weather-favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/weather-favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/weather-favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'icon', url: '/weather-favicon/favicon.ico' },
    ],
  },
  manifest: '/weather-favicon/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/weather-favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/weather-favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/weather-favicon/favicon-16x16.png" />
        <link rel="icon" href="/weather-favicon/favicon.ico" />
        <link rel="manifest" href="/weather-favicon/site.webmanifest" />
      </head>
      <body>{children}</body>
    </html>
  );
}
