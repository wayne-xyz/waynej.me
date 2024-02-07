import { Inter } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from '@next/third-parties/google'
import Script from "next/script";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Wayne",
  description: "To be next",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <GoogleAnalytics gaId="G-5K7T3SZ06Z" />
        <Script id="google-analytics">
          {` 
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
    
      gtag('config', 'G-5K7T3SZ06Z');
      `}
        </Script>
      </head>
      <body className={inter.className}>{children}</body>
      <GoogleAnalytics gaId="G-5K7T3SZ06Z" />
    </html>
  );
}
