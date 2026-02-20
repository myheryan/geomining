import Layout from "@/components/layout";
import HeadMeta from "@/components/headMeta";
import Hero from "@/components/home/hero";
import AboutUs from "@/components/home/aboutUs";
import MentorExpertise from "@/components/home/mentorExpertise";
import ContactSection from "@/components/contact";
import LatestInsights  from "@/components/home/latestInsights";
/* ... import lainnya
import { GetStaticProps } from 'next';

// 1. Definisikan tipe data Artikel (sesuaikan dengan frontmatter MDX kamu)
interface Article {
  slug: string;
  title: string;
  description: string;
  category: string;
  publishedAt: string;
  readingTime: any;
}

// 2. Definisikan tipe untuk Props halaman
interface HomeProps {
  featuredPosts: Article[];
}
  */


export default function HomePage() {
  return (
    <Layout>
        <HeadMeta />
        <Hero />
        <AboutUs />
        <MentorExpertise />
        <LatestInsights />
        <ContactSection />
    </Layout>
  );
}

