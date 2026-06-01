import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    // Verificar autenticação via header
    const authHeader = request.headers.get('authorization');
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!authHeader || authHeader !== `Bearer ${adminPassword}`) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search') || '';

    let query = supabase
      .from('guests')
      .select('*')
      .order('created_at', { ascending: false });

    if (search) {
      query = query.ilike('name', `%${search}%`);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Erro ao buscar convidados:', error);
      return NextResponse.json(
        { error: 'Erro ao buscar convidados' },
        { status: 500 }
      );
    }

    // Calcular totais
    const totals = data?.reduce(
      (acc, guest) => ({
        adults: acc.adults + guest.adults,
        children: acc.children + guest.children,
        total: acc.total + guest.adults + guest.children,
      }),
      { adults: 0, children: 0, total: 0 }
    ) || { adults: 0, children: 0, total: 0 };

    return NextResponse.json({
      guests: data,
      totals,
      count: data?.length || 0,
    });
  } catch (error) {
    console.error('Erro na API:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
