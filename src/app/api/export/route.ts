import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import * as XLSX from 'xlsx';

export async function GET(request: NextRequest) {
  try {
    // Verificar autenticação
    const authHeader = request.headers.get('authorization');
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!authHeader || authHeader !== `Bearer ${adminPassword}`) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    const { data, error } = await supabase
      .from('guests')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json(
        { error: 'Erro ao buscar dados' },
        { status: 500 }
      );
    }

    // Preparar dados para Excel
    const excelData = data?.map((guest) => ({
      Nome: guest.name,
      Adultos: guest.adults,
      Crianças: guest.children,
      'Total Pessoas': guest.adults + guest.children,
      Telefone: guest.phone,
      Observações: guest.observations || '-',
      'Data Confirmação': new Date(guest.created_at).toLocaleDateString('pt-BR'),
    }));

    // Criar workbook
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(excelData || []);

    // Ajustar largura das colunas
    ws['!cols'] = [
      { wch: 30 }, // Nome
      { wch: 10 }, // Adultos
      { wch: 10 }, // Crianças
      { wch: 15 }, // Total
      { wch: 20 }, // Telefone
      { wch: 40 }, // Observações
      { wch: 20 }, // Data
    ];

    XLSX.utils.book_append_sheet(wb, ws, 'Convidados');

    // Gerar buffer
    const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="convidados-heitor-${new Date().toISOString().split('T')[0]}.xlsx"`,
      },
    });
  } catch (error) {
    console.error('Erro ao exportar:', error);
    return NextResponse.json(
      { error: 'Erro ao exportar dados' },
      { status: 500 }
    );
  }
}
