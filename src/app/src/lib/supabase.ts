import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// SQL para criar a tabela no Supabase:
/*
CREATE TABLE guests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  adults INTEGER NOT NULL DEFAULT 1,
  children INTEGER NOT NULL DEFAULT 0,
  phone VARCHAR(20) NOT NULL,
  observations TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar Row Level Security
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;

-- Política para permitir inserções públicas
CREATE POLICY "Allow public inserts" ON guests
  FOR INSERT WITH CHECK (true);

-- Política para permitir leitura apenas com autenticação ou via API
CREATE POLICY "Allow authenticated reads" ON guests
  FOR SELECT USING (true);
*/
