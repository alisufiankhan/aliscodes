import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ToastProvider } from '../components/Toast';
import CalScript from '../components/CalScript';
import VibeCodingAudio from '../components/VibeCodingAudio';
import { SITE_URL, personJsonLd } from '../lib/site';

const DESCRIPTION =
  'Ali Sufian is an AI content creator and software developer from Islamabad, Pakistan. 80k+ followers, 100+ AI brand collaborations, and real builds behind every review.';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Ali Sufian | AI Content Creator, Developer & Entrepreneur',
    template: '%s',
  },
  description: DESCRIPTION,
  applicationName: 'Ali Sufian',
  authors: [{ name: 'Ali Sufian', url: SITE_URL }],
  creator: 'Ali Sufian',
  keywords: [
    'Ali Sufian',
    'aliscodes',
    'AI content creator',
    'AI content creator Pakistan',
    'AI tools reviews',
    'vibe coding',
    'AI influencer',
    'tech content creator',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'Ali Sufian',
    title: 'Ali Sufian | AI Content Creator & Developer',
    description: DESCRIPTION,
    images: [{ url: '/assets/profile.png', alt: 'Ali Sufian' }],
  },
  twitter: {
    card: 'summary',
    site: '@aliscodes',
    creator: '@aliscodes',
    title: 'Ali Sufian | AI Content Creator & Developer',
    description: DESCRIPTION,
    images: ['/assets/profile.png'],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: '/assets/profile.png',
  },
};

const siteJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'Ali Sufian',
      publisher: { '@id': `${SITE_URL}/#person` },
    },
    personJsonLd(),
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="screenbar-active">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
        <ToastProvider>
          <div className="grain-overlay" />
          <div className="ambient-night-cone" />
          <Navbar />
          <div className="container">
            {children}
            <Footer />
          </div>
          <VibeCodingAudio />
        </ToastProvider>
        <CalScript />
      </body>
    </html>
  );
}
