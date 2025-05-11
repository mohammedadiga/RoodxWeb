import type { Metadata } from 'next';
// style
import '@/app/globals.css';
// Font
import { Inter } from 'next/font/google';
// Providers
import { NextIntlClientProvider, useLocale } from 'next-intl';
import ReduxProvider from '@/providers/redux-provider';
import ThemeProvider from '@/providers/theme-provider';

const inter = Inter({ variable: '--font-inter', weight: ['300', '400', '500', '600', '700', '800'], subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Roodx',
  description: 'Roodx Social media app',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const locale = useLocale();
  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <ReduxProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <NextIntlClientProvider>{children}</NextIntlClientProvider>
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
