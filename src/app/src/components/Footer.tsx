'use client';

import { motion } from 'framer-motion';
import { Heart, Star } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative py-12 px-4 border-t border-gold-400/20">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="star-wars-title text-3xl md:text-4xl mb-4">
            HEITOR
          </h3>
          <p className="text-gold-400 font-display mb-6">
            02 de Agosto de 2025
          </p>

          <div className="flex items-center justify-center gap-2 text-gray-400 mb-8">
            <Star className="w-4 h-4 text-gold-400" />
            <span>Que a Força esteja com você!</span>
            <Star className="w-4 h-4 text-gold-400" />
          </div>

          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mb-6" />

          <p className="text-gray-500 text-sm flex items-center justify-center gap-1">
            Feito com <Heart className="w-4 h-4 text-red-400" /> para o primeiro ano do Heitor
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
