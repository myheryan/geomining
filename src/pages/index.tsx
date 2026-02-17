import Layout from "@/components/layout";
import HeadMeta from "@/components/headMeta";
import Hero from "@/components/home/Hero";
import FeaturedCarousel from "@/components/home/compactCarousel";
import { getAllFilesFrontmatter } from "@/lib/mdx-clients";


import * as React from 'react';
import { GetStaticProps } from 'next';
// ... import lainnya

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


export default function HomePage({ featuredPosts }: HomeProps) {
  return (
    <Layout>
        <HeadMeta />
        <Hero />
<FeaturedCarousel articles={featuredPosts} />

    </Layout>
  );
}

// 4. Berikan tipe juga pada getStaticProps agar lebih 'Strict'
export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const allPosts = await getAllFilesFrontmatter('insight');
  
  return {
    props: {
      // Pastikan selalu mengembalikan array meskipun data kosong
      featuredPosts: allPosts ? allPosts.slice(0, 3) : [],
    },
    revalidate: 60,
  };
};