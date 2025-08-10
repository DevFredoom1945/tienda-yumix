import './globals.css';

export const metadata = {
  title: 'Mi Tienda',
  description: 'Tienda simple en Next.js lista para Vercel',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        {/* TOPBAR con logo, búsqueda e íconos */}
        <div className="topbar">
          <div className="container topbar-inner">
            <div className="brand">
  <img
    src="/logo.png"
    alt="Yumix"
    style={{
      height: '44px',            // ajusta si lo quieres más grande
      objectFit: 'contain',
      filter: 'drop-shadow(0 0 6px rgba(0,0,0,.45))', // contraste sobre el fondo
      backgroundColor: 'rgba(255,255,255,.14)',       // leve placa para legibilidad
      borderRadius: '10px',
      padding: '4px 8px'
    }}
  />
</div>


            <form className="search" action="/buscar" method="GET">
              <input
                name="q"
                type="search"
                placeholder="Estoy buscando..."
                aria-label="Buscar productos"
              />
              <button type="submit">Buscar</button>
            </form>

            <div className="icons">
              <span>❤️ Favoritos</span>
              <span>🛒 Carrito (0)</span>
              <span>👤 Login</span>
            </div>
          </div>
        </div>

        {/* NAV inferior */}
        <div className="nav">
          <div className="container nav-inner">
            <nav style={{display:'flex', gap:12}}>
              <a href="/">Inicio</a>
              <a href="/catalogo">Catálogo</a>
              <a href="/ofertas">Ofertas</a>
              <a href="/contacto">Contacto</a>
            </nav>
            <div style={{fontSize:12,color:'var(--muted)'}}>© {new Date().getFullYear()} Yumix</div>
          </div>
        </div>

        <main className="container" style={{padding:'22px 0'}}>
          {children}
        </main>
      </body>
    </html>
  );
}
