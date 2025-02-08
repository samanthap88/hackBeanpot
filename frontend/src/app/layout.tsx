// app/layout.tsx
"use client"
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers"; 
import { InvestorsProvider } from "./InvestorsContext"; 
import { DarkModeProvider } from "./DarkModeContext";
import Head from 'next/head';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from '@vercel/speed-insights/next';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <title>AloAngels: Free AI Powered Investor Matching</title>
        <meta 
          name="description" 
          content="Find investors willing to fund your idea or business with AlgoAngels, an AI Powered Investor Matching tool"
        />
      </Head>
      <Providers>
        <InvestorsProvider> 
          <DarkModeProvider>
            <body
              className={`${geistSans.variable} ${geistMono.variable} antialiased`}
              suppressHydrationWarning
            >
              <Analytics />
              <SpeedInsights />
              {children}
            </body>
          </DarkModeProvider>
        </InvestorsProvider>
      </Providers>
    </html>
  );
}