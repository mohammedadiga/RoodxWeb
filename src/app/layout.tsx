import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/app/globals.css';

const inter = Inter({ variable: '--font-inter', weight: ['300', '400', '500', '600', '700', '800'], subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Roodx',
  description: 'Roodx Social media app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
