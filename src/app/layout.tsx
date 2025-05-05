import type { Metadata } from 'next';
// style
import '@/app/globals.css';
// Font
import { Inter } from 'next/font/google';
// Providers
import ReduxProvider from '@/providers/redux-provider';

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
      <body className={`${inter.variable} antialiased`}>
        <ReduxProvider>{children} </ReduxProvider>
      </body>
    </html>
  );
}
