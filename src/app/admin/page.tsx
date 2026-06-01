'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Lock,
  Users,
  Baby,
  UserCheck,
  Download,
  Search,
  LogOut,
  RefreshCw,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import { Guest } from '@/types';
import { formatPhone } from '@/lib/utils';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [guests, setGuests] = useState<Guest[]>([]);
  const [totals, setTotals] = useState({ adults: 0, children: 0, total: 0 });
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchGuests = async (searchTerm: string = '') => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/guests?search=${encodeURIComponent(searchTerm)}`, {
        headers: {
          Authorization: `Bearer ${password}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          setIsAuthenticated(false);
          setAuthError('Sessão expirada. Faça login novamente.');
        }
        return;
      }

      const data = await response.json();
      setGuests(data.guests);
      setTotals(data.totals);
    } catch (error) {
      console.error('Erro ao buscar convidados:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    try {
      const response = await fetch('/api/guests', {
        headers: {
          Authorization: `Bearer ${password}`,
        },
      });

      if (response.ok) {
        setIsAuthenticated(true);
        const data = await response.json();
        setGuests(data.guests);
        setTotals(data.totals);
      } else {
        setAuthError('Senha incorreta');
      }
    } catch (error) {
      setAuthError('Erro ao conectar. Tente novamente.');
    }
  };

  const handleExport = async () => {
    try {
      const response = await fetch('/api/export', {
        headers: {
          Authorization: `Bearer ${password}`,
        },
      });

      if (!response.ok) throw new Error('Erro ao exportar');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `convidados-heitor-${new Date().toISOString().split('T')[0]}.xlsx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Erro ao exportar:', error);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
    setGuests([]);
    setTotals({ adults: 0, children: 0, total: 0 });
  };

  useEffect(() => {
    if (isAuthenticated) {
      const timeoutId = setTimeout(() => {
        fetchGuests(search);
      }, 300);
      return () => clearTimeout(timeoutId);
    }
  }, [search, isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-space-gradient flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <Card variant="glow" className="text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gold-400/20 flex items-center justify-center">
              <Lock className="w-8 h-8 text-gold-400" />
            </div>
            <h1 className="text-2xl font-display text-white mb-2">
              Painel Administrativo
            </h1>
            <p className="text-gray-400 mb-6">
              Aniversário do Heitor - Star Wars Baby
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="password"
                placeholder="Digite a senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={authError}
              />
              <Button type="submit" className="w-full">
                Entrar
              </Button>
            </form>
          </Card>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-space-gradient p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-display text-white">
              Painel Administrativo
            </h1>
            <p className="text-gray-400">Aniversário do Heitor</p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => fetchGuests(search)}>
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
            <Button variant="secondary" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Exportar Excel
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="text-center py-6">
            <Users className="w-8 h-8 text-gold-400 mx-auto mb-2" />
            <p className="text-3xl font-display text-white">{totals.adults}</p>
            <p className="text-gray-400">Adultos</p>
          </Card>
          <Card className="text-center py-6">
            <Baby className="w-8 h-8 text-gold-400 mx-auto mb-2" />
            <p className="text-3xl font-display text-white">{totals.children}</p>
            <p className="text-gray-400">Crianças</p>
          </Card>
          <Card variant="glow" className="text-center py-6">
            <UserCheck className="w-8 h-8 text-gold-400 mx-auto mb-2" />
            <p className="text-3xl font-display text-white">{totals.total}</p>
            <p className="text-gray-400">Total de Pessoas</p>
          </Card>
        </div>

        {/* Busca */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nome..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-space w-full pl-12 pr-4 py-3 rounded-xl"
            />
          </div>
        </div>

        {/* Lista de Convidados */}
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gold-400/20">
                  <th className="text-left py-4 px-4 text-gold-400 font-display">Nome</th>
                  <th className="text-center py-4 px-4 text-gold-400 font-display">Adultos</th>
                  <th className="text-center py-4 px-4 text-gold-400 font-display">Crianças</th>
                  <th className="text-left py-4 px-4 text-gold-400 font-display">Telefone</th>
                  <th className="text-left py-4 px-4 text-gold-400 font-display hidden md:table-cell">
                    Observações
                  </th>
                  <th className="text-left py-4 px-4 text-gold-400 font-display hidden lg:table-cell">
                    Data
                  </th>
                </tr>
              </thead>
              <tbody>
                {guests.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-gray-400">
                      {isLoading ? 'Carregando...' : 'Nenhum convidado encontrado'}
                    </td>
                  </tr>
                ) : (
                  guests.map((guest) => (
                    <tr
                      key={guest.id}
                      className="border-b border-space-blue-700 hover:bg-space-blue-800/50 transition-colors"
                    >
                      <td className="py-4 px-4 text-white">{guest.name}</td>
                      <td className="py-4 px-4 text-center text-white">{guest.adults}</td>
                      <td className="py-4 px-4 text-center text-white">{guest.children}</td>
                      <td className="py-4 px-4 text-gray-300">{formatPhone(guest.phone)}</td>
                      <td className="py-4 px-4 text-gray-400 hidden md:table-cell max-w-xs truncate">
                        {guest.observations || '-'}
                      </td>
                      <td className="py-4 px-4 text-gray-400 hidden lg:table-cell">
                        {new Date(guest.created_at).toLocaleDateString('pt-BR')}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="mt-4 pt-4 border-t border-gold-400/20 text-center text-gray-400">
            Total de confirmações: <span className="text-gold-400 font-semibold">{guests.length}</span>
          </div>
        </Card>
      </div>
    </main>
  );
}
