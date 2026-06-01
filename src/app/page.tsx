'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Hero from '@/components/Hero';
import Countdown from '@/components/Countdown';
import EventDetails from '@/components/EventDetails';
import RSVPForm from '@/components/RSVPForm';
import GiftSuggestions from '@/components/GiftSuggestions';
import Gallery from '@/components/Gallery';
import Footer from '@/components/Footer';
import StarField from '@/components/StarField';

export default function Home() {
  const [showContent, setShowContent] = useState(false);

  const handleEnterGalaxy = () => {
    setShowContent(true);
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <StarField />

      <AnimatePresence mode="wait">
        {!showContent ? (
          <Hero key="hero" onEnter={handleEnterGalaxy} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            {/* Header com título */}
            <section className="py-16 px-4 text-center">
              <motion.div
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <h1 className="star-wars-title text-4xl md:text-6xl mb-4">
                  HEITOR
                </h1>
                <p className="text-gold-400 font-display text-xl md:text-2xl tracking-[0.2em]">
                  FAZ 1 ANO!
                </p>
                <div className="w-32 h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mt-6" />
              </motion.div>
            </section>

            <Countdown />
            <EventDetails />
            <RSVPForm />
            <GiftSuggestions />
            <Gallery />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
