
import React from 'react';
import Layout from '@/components/layout/Layout';
import HeroBanner from '@/components/home/HeroBanner';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';

const Home = () => {
  return (
    <Layout>
      <HeroBanner />
      <HeroSection />
      <FeaturesSection />
    </Layout>
  );
};

export default Home;
