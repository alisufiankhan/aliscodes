import Link from 'next/link';
import { SITE_URL, PERSON, personJsonLd } from '../../lib/site';
import './about.css';

export const metadata = {
  title: 'About Ali Sufian | AI Content Creator & Developer from Pakistan',
  description:
    'Who is Ali Sufian? An AI content creator and software developer from Islamabad, Pakistan with 80k+ followers. He has worked with 100+ AI brands including Lovable, HeyGen, Kling and Luma AI.',
  alternates: { canonical: '/about' },
  openGraph: {
    type: 'profile',
    url: '/about',
    title: 'About Ali Sufian | AI Content Creator & Developer',
    description:
      'AI content creator and developer from Islamabad. 80k+ followers, 100+ AI brand collaborations, and a habit of building before reviewing.',
    images: [{ url: PERSON.image, alt: 'Ali Sufian' }],
    firstName: 'Ali',
    lastName: 'Sufian',
    username: 'aliscodes',
  },
};

const BRANDS = [
  'Lovable', 'Luma AI', 'Magnific', 'PixVerse', 'Airtable', 'HeyGen',
  'Kling', 'Gamma', 'MiniMax', 'Sintra', 'Higgsfield',
];

const FAQ = [
  {
    q: 'Who is Ali Sufian?',
    a: 'Ali Sufian is an AI content creator, software developer and entrepreneur based in Islamabad, Pakistan. He makes content about AI tools for 80k+ followers on X, Instagram and LinkedIn, and builds software products of his own.',
  },
  {
    q: 'What does Ali Sufian make content about?',
    a: 'AI tools, vibe coding, Python automation and building SaaS products. Every tool he reviews, he first uses to build something real.',
  },
  {
    q: 'Which brands has Ali Sufian worked with?',
    a: `More than 100 AI companies, including ${BRANDS.join(', ')}.`,
  },
  {
    q: 'Where can I follow Ali Sufian?',
    a: 'On X as @aliscodes, on Instagram as @alis.code, and on LinkedIn at linkedin.com/in/aliscodes. His code is on GitHub at github.com/alisufiankhan.',
  },
  {
    q: 'How do I work with Ali Sufian?',
    a: 'AI brands can book sponsored content such as X posts, Instagram reels or multi-platform packages. The fastest way to reach him is on X (@aliscodes) or by email.',
  },
];

export default function AboutPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfilePage',
        '@id': `${SITE_URL}/about#page`,
        url: `${SITE_URL}/about`,
        name: 'About Ali Sufian',
        dateModified: '2026-11-24',
        mainEntity: { '@id': `${SITE_URL}/#person` },
      },
      personJsonLd(),
      {
        '@type': 'FAQPage',
        mainEntity: FAQ.map(({ q, a }) => ({
          '@type': 'Question',
          name: q,
          acceptedAnswer: { '@type': 'Answer', text: a },
        })),
      },
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="about-article">
        <Link href="/" className="about-back">&larr; back home</Link>

        <header className="about-header">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/profile.png" alt="Ali Sufian" className="about-avatar" width="88" height="88" />
          <div>
            <p className="about-kicker">about</p>
            <h1 className="about-title">Ali Sufian</h1>
            <p className="about-lede">
              AI content creator, software developer and entrepreneur from Islamabad, Pakistan.
            </p>
          </div>
        </header>

        <dl className="about-facts">
          <div><dt>audience</dt><dd>80k+ on X, Instagram &amp; LinkedIn</dd></div>
          <div><dt>brand collabs</dt><dd>100+ AI companies</dd></div>
          <div><dt>based in</dt><dd>Islamabad, Pakistan</dd></div>
          <div><dt>handle</dt><dd>@aliscodes</dd></div>
        </dl>

        <section className="about-body">
          <h2>who i am</h2>
          <p>
            I&apos;m Ali Sufian. I build software and make content about AI tools. Most people who
            review AI tools read the landing page and record a demo. I install the tool, build
            something real with it, and then tell my audience what actually happened.
          </p>
          <p>
            That habit is why more than 100 AI brands have paid me to test their products, and why
            about 80,000 people follow along on{' '}
            <a href="https://x.com/aliscodes" target="_blank" rel="noopener noreferrer">X</a>,{' '}
            <a href="https://instagram.com/alis.code" target="_blank" rel="noopener noreferrer">Instagram</a> and{' '}
            <a href="https://linkedin.com/in/aliscodes" target="_blank" rel="noopener noreferrer">LinkedIn</a>.
          </p>

          <h2>how i got here</h2>
          <p>
            I started out as a web developer, and I&apos;m fully self-taught. No bootcamp, no CS
            degree. I learned to build for the web on my own and spent my early years working as a
            freelancer, shipping projects for clients.
          </p>
          <p>
            Along the way I started making content about the AI tools I was using to build faster,
            and it clicked. I switched my focus to content creation in AI, and that&apos;s what I do
            now, while still building and shipping my own products on the side.
          </p>

          <h2>what i&apos;ve built</h2>
          <ul>
            <li>
              <a href="https://screensnipper.app" target="_blank" rel="noopener noreferrer">screensnipper.app</a>:
              a Chrome extension for screen recording where nothing leaves your machine.
            </li>
            <li>
              <strong>Stackup AI</strong>: a weekly newsletter on AI tools, with a content pipeline I built myself.
            </li>
            <li>
              <a href="https://whatsapp-privacy-extension.vercel.app/" target="_blank" rel="noopener noreferrer">WhatsApp privacy extension</a>:
              blurs chats, names and photos in WhatsApp Web.
            </li>
          </ul>

          <h2>ai brands i&apos;ve worked with</h2>
          <p>
            {BRANDS.join(', ')}, and 90+ more. Formats include X posts and threads, Instagram reels,
            and multi-platform packages with a newsletter feature.
          </p>

          <h2>education</h2>
          <p>
            I&apos;m currently pursuing my Bachelor&apos;s degree in Artificial Intelligence. Most of
            what I know, though, came from teaching myself and building real things.
          </p>

          <h2>what i make content about</h2>
          <ul>
            <li>AI tools that are useful, tested on real builds</li>
            <li>Vibe coding and shipping apps with AI</li>
            <li>Python automation</li>
            <li>Building and launching SaaS products and MVPs</li>
          </ul>
        </section>

        <section className="about-faq">
          <h2>frequently asked</h2>
          {FAQ.map(({ q, a }) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </section>

        <div className="about-cta">
          <Link href="/#work" className="btn-primary">work with me</Link>
          <a href="https://x.com/aliscodes" target="_blank" rel="noopener noreferrer" className="btn-secondary">
            follow on x
          </a>
        </div>
      </article>
    </main>
  );
}
