'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Navigation } from 'lucide-react';
import Button from './ui/Button';
import Card from './ui/Card';

export default function EventDetails() {
  const mapsUrl = process.env.NEXT_PUBLIC_MAPS_URL || '[maps.google.com](https://maps.google.com)';

  const details = [
    {
      icon: Calendar,
      label: 'Data',
      value: '02 de Agosto',
    },
    {
      icon: Clock,
      label: 'Horário',
      value: '13h',
    },
    {
      icon: MapPin,
      label: 'Local',
      value: 'Espaço Mundo Mágico',
    },
  ];

  const handleOpenMaps = () => {
    window.open(mapsUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="relative py-20 px-4" id="evento">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl text-white mb-4">
            Coordenadas da <span className="text-gold-400">Celebração</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto" />
        </motion.div>

        <Card variant="glow" className="max-w-2xl mx-auto">
          <div className="space-y-6">
            {details.map((detail, index) => (
              <motion.div
                key={detail.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-space-blue-800/50"
              >
                <div className="p-3 rounded-full bg-gold-400/20">
                  <detail.icon className="w-6 h-6 text-gold-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm uppercase tracking-wider">
                    {detail.label}
                  </p>
                  <p className="text-white text-xl font-semibold">
                    {detail.value}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-8 text-center"
          >
            <Button onClick={handleOpenMaps} className="inline-flex items-center gap-2">
              <Navigation className="w-5 h-5" />
              Traçar Rota
            </Button>
          </motion.div>
        </Card>
      </div>
    </section>
  );
}
