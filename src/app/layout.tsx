import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Heitor | 1 Ano - Star Wars Baby',
  description: 'Você está convidado para o primeiro aniversário do Heitor! Uma aventura galáctica espera por você.',
  keywords: ['aniversário', 'heitor', 'star wars', 'convite', 'baby'],
  authors: [{ name: 'Família do Heitor' }],
  openGraph: {
    title: 'Heitor | 1 Ano - Star Wars Baby',
    description: 'Você está convidado para o primeiro aniversário do Heitor!',
    images: ['/images/og-image.jpg'],
    type: 'website',
  },
  themeColor: '#030810',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
