import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

// Initialize the next-intl plugin
const withNextIntl = createNextIntlPlugin({
  // You can define locale options here if needed
  // locales: ['en', 'ar'],
  // defaultLocale: 'en'
});

// Configure Next.js without the need for middleware: true
const nextConfig: NextConfig = {
  // Add any other Next.js configuration options here
  reactStrictMode: true,
  // ...etc
};

// Export the configuration wrapped with next-intl plugin
export default withNextIntl(nextConfig);
