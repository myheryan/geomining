import Head from 'next/head';
import { useRouter } from 'next/router';

interface HeadMetaProps {
  templateTitle?: string;
  description?: string;
  ogImage?: string;
}

export default function HeadMeta({ templateTitle, description, ogImage }: HeadMetaProps) {
  const router = useRouter();
  const meta = {
    title: templateTitle ? `${templateTitle} | MyInsight` : 'MyInsight - Learn & Share',
    description: description || 'Platform berbagi wawasan teknis dan tutorial development.',
    image: ogImage || 'https://yourdomain.com/default-og.png',
    type: 'article',
  };

  return (
    <Head>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <link rel="canonical" href={`https://yourdomain.com${router.asPath}`} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={meta.type} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:image" content={meta.image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={meta.image} />
    </Head>
  );
}