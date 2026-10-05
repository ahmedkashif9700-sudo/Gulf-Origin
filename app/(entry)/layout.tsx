import type {Metadata} from 'next';
import {Analytics} from '@vercel/analytics/next';
import '../globals.css';

const siteUrl = 'https://gulforigin.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Gulf Origin International | Dry Fruits, Dates & Spices in Riyadh',
  description:
    'Discover dates, nuts, coffee, saffron and spices at Gulf Origin International in Riyadh. Explore our collection in English and Arabic. 10% OFF first order + FREE delivery.',
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
};

export default function RootLayout({children}:{children:React.ReactNode}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
