import { RSVPFormData } from '@/types';
import { formatPhone } from './utils';

const WHATSAPP_NUMBER = process.env.WHATSAPP_NUMBER || '';
const WHATSAPP_API_TOKEN = process.env.WHATSAPP_API_TOKEN;
const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;

export function generateWhatsAppMessage(data: RSVPFormData): string {
  const message = `
🌟 *NOVA CONFIRMAÇÃO DE PRESENÇA* 🌟

*Aniversário do Heitor - Star Wars Baby*

👤 *Nome:* ${data.name}
👨‍👩‍👧‍👦 *Adultos:* ${data.adults}
👶 *Crianças:* ${data.children}
📱 *Telefone:* ${formatPhone(data.phone)}
${data.observations ? `📝 *Observações:* ${data.observations}` : ''}

✅ Presença confirmada!
  `.trim();

  return message;
}

export function generateWhatsAppLink(data: RSVPFormData): string {
  const message = generateWhatsAppMessage(data);
  const encodedMessage = encodeURIComponent(message);
  return `[wa.me](https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage})`;
}

// Função para envio via API do WhatsApp Business (opcional)
export async function sendWhatsAppNotification(data: RSVPFormData): Promise<boolean> {
  if (!WHATSAPP_API_TOKEN || !WHATSAPP_PHONE_NUMBER_ID) {
    console.log('WhatsApp API não configurada, usando fallback');
    return false;
  }

  try {
    const response = await fetch(
      `[graph.facebook.com](https://graph.facebook.com/v18.0/${WHATSAPP_PHONE_NUMBER_ID}/messages)`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${WHATSAPP_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: WHATSAPP_NUMBER,
          type: 'text',
          text: {
            body: generateWhatsAppMessage(data),
          },
        }),
      }
    );

    return response.ok;
  } catch (error) {
    console.error('Erro ao enviar WhatsApp:', error);
    return false;
  }
}
