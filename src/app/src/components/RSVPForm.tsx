'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Users, Baby, Phone, MessageSquare, Check, Send } from 'lucide-react';
import Button from './ui/Button';
import Input from './ui/Input';
import Card from './ui/Card';
import { RSVPFormData } from '@/types';

export default function RSVPForm() {
  const [formData, setFormData] = useState<RSVPFormData>({
    name: '',
    adults: 1,
    children: 0,
    phone: '',
    observations: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao confirmar presença');
      }

      setIsSuccess(true);

      // Se a API do WhatsApp não está configurada, abrir link do WhatsApp
      if (data.whatsappLink) {
        window.open(data.whatsappLink, '_blank');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao enviar confirmação');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof RSVPFormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section className="relative py-20 px-4 nebula-bg" id="confirmar">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl text-white mb-4">
            Confirme sua <span className="text-gold-400">Presença</span>
          </h2>
          <p className="text-gray-300">
            Registre-se para embarcar nessa aventura galáctica!
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mt-4" />
        </motion.div>

        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center"
            >
              <Card variant="glow" className="py-12">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center"
                >
                  <Check className="w-10 h-10 text-green-400" />
                </motion.div>
                <h3 className="text-2xl font-display text-white mb-4">
                  Presença Confirmada!
                </h3>
                <p className="text-gray-300 mb-2">
                  Obrigado, {formData.name}!
                </p>
                <p className="text-gray-400">
                  Mal podemos esperar para celebrar com você!
                </p>
                <p className="text-gold-400 mt-4 text-lg">
                  Que a Força esteja com você! ✨
                </p>
              </Card>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
            >
              <Card variant="glow">
                <div className="space-y-6">
                  {/* Nome */}
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold-400 mt-3" />
                    <Input
                      label="Seu Nome"
                      placeholder="Digite seu nome completo"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className="pl-12"
                      required
                    />
                  </div>

                  {/* Adultos e Crianças */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold-400 mt-3" />
                      <Input
                        label="Adultos"
                        type="number"
                        min={1}
                        max={10}
                        value={formData.adults}
                        onChange={(e) => handleChange('adults', parseInt(e.target.value) || 1)}
                        className="pl-12"
                        required
                      />
                    </div>
                    <div className="relative">
                      <Baby className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold-400 mt-3" />
                      <Input
                        label="Crianças"
                        type="number"
                        min={0}
                        max={10}
                        value={formData.children}
                        onChange={(e) => handleChange('children', parseInt(e.target.value) || 0)}
                        className="pl-12"
                      />
                    </div>
                  </div>

                  {/* Telefone */}
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold-400 mt-3" />
                    <Input
                      label="Telefone"
                      type="tel"
                      placeholder="(00) 00000-0000"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className="pl-12"
                      required
                    />
                  </div>

                  {/* Observações */}
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-9 w-5 h-5 text-gold-400" />
                    <label className="block text-gold-400 font-medium mb-2 text-sm">
                      Observações (opcional)
                    </label>
                    <textarea
                      placeholder="Alguma restrição alimentar ou observação?"
                      value={formData.observations}
                      onChange={(e) => handleChange('observations', e.target.value)}
                      className="input-space w-full px-4 py-3 pl-12 rounded-xl text-white placeholder-gray-400 font-body min-h-[100px] resize-none"
                    />
                  </div>

                  {/* Erro */}
                  {error && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-red-400 text-center"
                    >
                      {error}
                    </motion.p>
                  )}

                  {/* Botão Submit */}
                  <Button
                    type="submit"
                    size="lg"
                    isLoading={isSubmitting}
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    Confirmar Presença
                  </Button>
                </div>
              </Card>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
