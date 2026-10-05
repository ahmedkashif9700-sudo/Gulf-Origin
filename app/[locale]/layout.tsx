import type {Metadata} from 'next';
import {Analytics} from '@vercel/analytics/next';
import '../globals.css';

const siteUrl = 'https://gulforigin.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Gulf Origin International | Dry Fruits, Dates & Spices in Riyadh',
    template: '%s | Gulf Origin International Riyadh',
  },
  description:
    'Premium dry fruits, dates, nuts, saffron and spices in Riyadh — Gulf Origin International roastery & عطارة in Al Zahra. 10% OFF your first order + FREE delivery. تمور ومكسرات الرياض.',
  keywords: [
    'dry fruits Riyadh', 'dates Riyadh', 'nuts Riyadh', 'spices Riyadh',
    'roastery Riyadh', 'saffron Riyadh', 'cardamom Riyadh', 'coffee Riyadh',
    'مكسرات الرياض', 'تمور الرياض', 'بهارات الرياض', 'محمصة الرياض', 'عطارة الرياض',
  ],
  alternates: { canonical: '/en', languages: { en: '/en', ar: '/ar' } },
  openGraph: {
    title: 'Gulf Origin International | Dry Fruits, Dates & Spices in Riyadh',
    description:
      'Premium dry fruits, dates, nuts, saffron & spices in Riyadh. 10% OFF first order + FREE delivery.',
    url: siteUrl + '/en',
    siteName: 'Gulf Origin International',
    locale: 'en_SA',
    type: 'website',
    images: [
      {
        url: '/hero.webp',
        width: 1200,
        height: 630,
        alt: 'Dry fruits, dates and spices — Gulf Origin International, Riyadh',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gulf Origin International | Dry Fruits, Dates & Spices in Riyadh',
    description:
      'Premium dry fruits, dates, nuts, saffron & spices in Riyadh. 10% OFF first order + FREE delivery.',
    images: ['/hero.webp'],
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'GroceryStore',
  name: 'Gulf Origin International',
  alternateName: 'عطارة و محاماص',
  description:
    'Premium dry fruits, dates, nuts, saffron, cardamom and spices in Riyadh — roastery & عطارة.',
  url: siteUrl + '/en',
  telephone: '+966508275432',
  priceRange: 'SAR',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '3770 Badi Az Zaman Al Hamathani, Al Zahra District',
    addressLocality: 'Riyadh',
    postalCode: '12986',
    addressCountry: 'SA',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 24.7136, longitude: 46.6753 },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
  ],
  sameAs: [
    'https://www.facebook.com/profile.php?id=61595221821438',
    'https://www.instagram.com/gulforigin26/',
  ],
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
