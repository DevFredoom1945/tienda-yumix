// app/layout.js
import './globals.css';
import Footer from '../components/Footer';
import { createClient } from '../lib/supabase/server';

export const metadata = {
  title: 'Yumix',
  description: 'Tienda simple en Next.js lista para Vercel',
  icons: {
    icon: '/favicon.ico', // Aquí agregamos el favicon
  },
};

export default async function RootLayout({ children }) {
  // Lee la sesión en el servidor para pintar Login/Mi cuenta
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <header className="topbar">
          {/* Fila 1: logo + búsqueda + iconos (desktop) */}
          <div className="container topbar-inner">
            <div className="brand">
              <img src="/logo 2x.png" alt="Yumix" style={{ height: 64, objectFit: 'contain' }} />
            </div>

            <form className="search" action="/buscar" method="GET">
              <input name="q" type="search" placeholder="Estoy buscando..." aria-label="Buscar productos" />
              <button type="submit">Buscar</button>
            </form>

            <div className="icons">
              <span>❤️ Favoritos</span>
              <span>🛒 Carrito (0)</span>
              {user
                ? <a href="/cuenta" style={{ color:'#fff', textDecoration:'none' }}>👤 Mi cuenta</a>
                : <a href="/login"  style={{ color:'#fff', textDecoration:'none' }}>👤 Login</a>}
            </
