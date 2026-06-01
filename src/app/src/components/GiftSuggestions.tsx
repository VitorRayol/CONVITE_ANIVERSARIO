'use client';

import { motion } from 'framer-motion';
import { Shirt, Heart } from 'lucide-react';
import Card from './ui/Card';

export default function GiftSuggestions() {
  const suggestions = [
    {
      icon: '👕',
      title: 'Roupas',
      description: 'Tamanho 1 a 2 anos',
    },
    {
      icon: '🧸',
      title: 'Brinquedos',
      description: 'Pelúcias e brinquedos educativos compatíveis com a idade',
    },
  ];

  return (
    <section className="relative py-20 px-4" id="presentes">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl text-white mb-4">
            Sugestões de <span className="text-gold-400">Presentes</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {suggestions.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
            >
              <Card className="h-full text-center py-8">
                <span className="text-5xl mb-4 block">{item.icon}</span>
                <h3 className="text-xl font-display text-gold-400 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-300">{item.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Card className="text-center py-6">
            <div className="flex items-center justify-center gap-2 text-gold-400 mb-3">
              <Heart className="w-5 h-5" />
              <span className="font-display">Nota Carinhosa</span>
              <Heart className="w-5 h-5" />
            </div>
            <p className="text-gray-300 max-w-xl mx-auto">
              Sua presença é o maior presente! Estas são apenas sugestões para quem 
              desejar presentear o Heitor. O mais importante para nós é celebrar 
              este momento especial com você.
            </p>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
