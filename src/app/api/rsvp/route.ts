import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { generateWhatsAppLink, sendWhatsAppNotification } from '@/lib/whatsapp';
import { RSVPFormData } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body: RSVPFormData = await request.json();

    // Validação básica
    if (!body.name || !body.phone || body.adults < 1) {
      return NextResponse.json(
        { error: 'Dados inválidos. Nome, telefone e quantidade de adultos são obrigatórios.' },
        { status: 400 }
      );
    }

    // Salvar no banco de dados
    const { data, error } = await supabase
      .from('guests')
      .insert([
        {
          name: body.name,
          adults: body.adults,
          children: body.children,
          phone: body.phone,
          observations: body.observations || null,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Erro Supabase:', error);
      return NextResponse.json(
        { error: 'Erro ao salvar confirmação. Tente novamente.' },
        { status: 500 }
      );
    }

    // Tentar enviar notificação WhatsApp via API
    const whatsappSent = await sendWhatsAppNotification(body);

    // Se a API não estiver configurada, retornar link para WhatsApp manual
    const response: { success: boolean; guest: typeof data; whatsappLink?: string } = {
      success: true,
      guest: data,
    };

    if (!whatsappSent) {
      response.whatsappLink = generateWhatsAppLink(body);
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error('Erro na API:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor.' },
      { status: 500 }
    );
  }
}
