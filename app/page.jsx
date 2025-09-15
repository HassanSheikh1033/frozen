"use client";

import { useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import CharactersSection from '../components/CharactersSection';
import TimelineSection from '../components/TimelineSection';
import SongsSection from '../components/SongsSection';
import MapSection from '../components/MapSection';
import GamesSection from '../components/GamesSection';
// import StoreSection from '../components/StoreSection';
// import CtaSection from '../components/CtaSection';
import SnowflakeCursor from '../components/SnowflakeCursor';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Gameland from '@/components/Game';

export default function Home() {
  useEffect(() => {
    // Any global scripts can be initialized here
  }, []);

  return (
    <main>
        <Navbar/>
      <SnowflakeCursor />
      <HeroSection />
      <CharactersSection />
      <TimelineSection /> 
      <SongsSection />
      <Gameland/>
      <MapSection />
      {/* <GamesSection /> */}
      <Footer />
    </main>
  );
}