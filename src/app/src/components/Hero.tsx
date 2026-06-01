'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Rocket } from 'lucide-react';
import Button from './ui/Button';

interface HeroProps {
  onEnter: () => void;
}

export default function Hero({ onEnter }: HeroProps) {
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay bloqueado, video será iniciado com interação
      });
    }
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleEnter = () => {
    setShowOverlay(false);
    setTimeout(() => {
      onEnter();
    }, 500);
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-space-blue-950">
      {/* Video Background */}
      <div className="video-container">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          onLoadedData={() => setIsVideoLoaded(true)}
          className="absolute inset-0 w-full h-full object-cover"
          poster="/images/poster.jpg"
        >
          {/* O vídeo será substituído posteriormente */}
          <source src="/videos/convite.mp4" type="video/mp4" />
        </video>

        {/* Overlay escuro para melhor legibilidade */}
        <div className="absolute inset-0 bg-gradient-to-b from-space-blue-950/60 via-transparent to-space-blue-950/80" />
      </div>

      {/* Conteúdo */}
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4"
          >
            {/* Título Principal */}
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-center mb-8"
            >
              <h1 className="star-wars-title text-5xl md:text-7xl lg:text-8xl mb-4">
                HEITOR
              </h1>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="w-32 md:w-48 h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mb-6"
              />
              <p className="font-display text-gold-400 text-xl md:text-2xl tracking-[0.3em] mb-2">
                EPISÓDIO I
              </p>
              <p className="font-display text-white text-2xl md:text-3xl tracking-wider">
                O PRIMEIRO ANO
              </p>
            </motion.div>

            {/* Botão Entrar */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <Button
                size="lg"
                onClick={handleEnter}
                className="flex items-center gap-3"
              >
                <Rocket className="w-5 h-5" />
                Entrar na Galáxia
              </Button>
            </motion.div>

            {/* Controle de Som */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              onClick={toggleMute}
              className="absolute bottom-8 right-8 p-3 rounded-full bg-space-blue-800/80 border border-gold-400/30 hover:bg-space-blue-700/80 transition-all"
              aria-label={isMuted ? 'Ativar som' : 'Desativar som'}
            >
              {isMuted ? (
                <VolumeX className="w-6 h-6 text-gold-400" />
              ) : (
                <Volume2 className="w-6 h-6 text-gold-400" />
              )}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Indicador de scroll */}
      {!showOverlay && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-gold-400/50 flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-3 bg-gold-400 rounded-full mt-2"
            />
          </div>
        </motion.div>
      )}
    </section>
  );
}
