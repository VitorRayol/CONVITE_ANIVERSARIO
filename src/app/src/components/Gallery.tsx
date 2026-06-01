'use client';

import { motion } from 'framer-motion';
import { GalleryImage } from '@/types';
import Card from './ui/Card';

export default function Gallery() {
  // Placeholder para as ilustrações dos personagens baby
  const images: GalleryImage[] = [
    {
      id: 1,
      src: '/images/baby-yoda.svg',
      alt: 'Baby Grogu',
      character: 'Grogu',
    },
    {
      id: 2,
      src: '/images/baby-vader.svg',
      alt: 'Baby Vader',
      character: 'Mini Vader',
    },
    {
      id: 3,
      src: '/images/baby-luke.svg',
      alt: 'Baby Luke',
      character: 'Baby Luke',
    },
    {
      id: 4,
      src: '/images/baby-leia.svg',
      alt: 'Baby Leia',
      character: 'Baby Leia',
    },
    {
      id: 5,
      src: '/images/baby-chewie.svg',
      alt: 'Baby Chewbacca',
      character: 'Mini Chewie',
    },
  ];

  return (
    <section className="relative py-20 px-4 nebula-bg" id="galeria">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl text-white mb-4">
            Galeria <span className="text-gold-400">Galáctica</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="group"
            >
              <Card className="p-4 text-center cursor-pointer transition-all duration-300 group-hover:glow-gold">
                {/* Placeholder para ilustração */}
                <div className="aspect-square rounded-xl bg-gradient-to-br from-space-blue-700 to-space-blue-900 mb-3 flex items-center justify-center overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-gold-400/20 to-transparent flex items-center justify-center">
                    <span className="text-4xl md:text-5xl">
                      {image.id === 1 && '👶'}
                      {image.id === 2 && '🎭'}
                      {image.id === 3 && '⚔️'}
                      {image.id === 4 && '👑'}
                      {image.id === 5 && '🐻'}
                    </span>
                  </div>
                </div>
                <p className="text-gold-400 font-display text-sm">
                  {image.character}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center text-gray-400 mt-8 text-sm"
        >
          Ilustrações inspiradas no universo Star Wars Baby ✨
        </motion.p>
      </div>
    </section>
  );
}
