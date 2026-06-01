// File: src/app/layout.tsx
import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/app/globals.css';
import { siteMeta } from '@/data/meta';
import SmoothScroll from '@/components/layout/SmoothScroll';
import CustomCursor from '@/components/layout/CustomCursor';
import Navbar from '@/components/layout/Navbar';

// Preload Geist Sans display font
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

// Preload Geist Mono technical font
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: siteMeta.seo.title,
  description: siteMeta.seo.description,
  metadataBase: new URL(siteMeta.seo.url),
  openGraph: {
    title: siteMeta.seo.title,
    description: siteMeta.seo.description,
    url: siteMeta.seo.url,
    siteName: siteMeta.name,
    images: [
      {
        url: siteMeta.seo.ogImage,
        width: 1200,
        height: 630,
        alt: siteMeta.seo.title,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteMeta.seo.title,
    description: siteMeta.seo.description,
    images: [siteMeta.seo.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full select-none antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--bg)] text-[var(--text-primary)] relative">
        {/* Film grain noise texture */}
        <div className="noise-overlay" aria-hidden="true" />

        {/* Accessibility Skip-To-Main Anchor */}
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>

        <SmoothScroll>
          {/* Velocity sensitive persistent Header */}
          <Navbar />

          {/* Desktop Spring Custom Cursor */}
          <CustomCursor />

          <main id="main-content" className="flex-grow flex flex-col justify-start">
            {children}
          </main>
        </SmoothScroll>
      </body>
    </html>
  );
}
