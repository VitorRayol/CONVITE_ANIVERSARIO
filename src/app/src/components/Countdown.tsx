'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { calculateTimeLeft } from '@/lib/utils';
import Card from './ui/Card';

interface TimeUnit {
  value: number;
  label: string;
}

export default function Countdown() {
  const eventDate = new Date(process.env.NEXT_PUBLIC_EVENT_DATE || '2025-08-02T13:00:00');
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(eventDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(eventDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [eventDate]);

  const timeUnits: TimeUnit[] = [
    { value: timeLeft.days, label: 'Dias' },
    { value: timeLeft.hours, label: 'Horas' },
    { value: timeLeft.minutes, label: 'Minutos' },
    { value: timeLeft.seconds, label: 'Segundos' },
  ];

  return (
    <section className="relative py-20 px-4 nebula-bg">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl text-white mb-4">
            Dias restantes para a{' '}
            <span className="text-gold-400">missão</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {timeUnits.map((unit, index) => (
            <motion.div
              key={unit.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card variant="glow" className="text-center py-8">
                <motion.span
                  key={unit.value}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  className="block text-4xl md:text-6xl font-display font-bold text-gold-400 mb-2"
                >
                  {String(unit.value).padStart(2, '0')}
                </motion.span>
                <span className="text-gray-300 font-medium text-sm md:text-base uppercase tracking-wider">
                  {unit.label}
                </span>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
