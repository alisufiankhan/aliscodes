// Single source of truth for SEO facts about Ali Sufian.
// Set NEXT_PUBLIC_SITE_URL in your hosting env (e.g. Vercel) to your real domain.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://aliscodes.com').replace(/\/$/, '');

export const PERSON = {
  name: 'Ali Sufian',
  jobTitle: 'AI Content Creator & Software Developer',
  description:
    'Ali Sufian is an AI content creator, software developer and entrepreneur from Islamabad, Pakistan. He tests AI tools by building real projects with them and shares the results with 80k+ followers across X, Instagram and LinkedIn.',
  image: '/assets/profile.png',
  email: 'alisufiancodes@gmail.com',
  location: 'Islamabad, Pakistan',
  sameAs: [
    'https://x.com/aliscodes',
    'https://instagram.com/alis.code',
    'https://linkedin.com/in/aliscodes',
    'https://github.com/alisufiankhan',
  ],
  knowsAbout: [
    'Artificial intelligence',
    'AI tools',
    'Generative AI',
    'Vibe coding',
    'Python automation',
    'SaaS development',
    'MVP building',
    'Content creation',
  ],
};

export function personJsonLd() {
  return {
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: PERSON.name,
    alternateName: ['aliscodes', 'alis.code'],
    url: SITE_URL,
    image: `${SITE_URL}${PERSON.image}`,
    jobTitle: PERSON.jobTitle,
    description: PERSON.description,
    email: `mailto:${PERSON.email}`,
    homeLocation: {
      '@type': 'Place',
      name: PERSON.location,
    },
    nationality: { '@type': 'Country', name: 'Pakistan' },
    knowsAbout: PERSON.knowsAbout,
    sameAs: PERSON.sameAs,
  };
}
