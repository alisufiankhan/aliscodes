import { SITE_URL } from '../lib/site';

export default function sitemap() {
  const now = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/story`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
  ];
}
