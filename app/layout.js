import './globals.css';

export const metadata = {
  title: 'Mi Tienda',
  description: 'Tienda simple en Next.js lista para Vercel',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <div className="topbar">
          {/* Fila 1: logo + búsqueda + iconos (desktop) */}
          <div className="container topbar-inner">
            <div className="brand">
              <img src="/logo.png" alt="Yumix" style={{height:'44px',objectFit:'contain'}} />
            </div>

            <form className="search" action="/buscar" method="GET">
              <input name="q" type="search" placeholder="Estoy buscando..." aria-label="Buscar productos" />
              <button type="submit">Buscar</button>
            </form>

            <div className="icons">
              <span>❤️ Favoritos</span>
              <span>🛒 Carrito (0)</span>
              <span>👤 Login</span>
            </div>
          </div>

          {/* Fila 2: menú (desktop) */}
          <div className="container topbar-menu">
            <nav>
              <a href="/" className="active">Inicio</a>
              <a href="/catalogo">Catálogo</a>
              <a href="/ofertas">Ofertas</a>
              <a href="/contacto">Contacto</a>
            </nav>
            <div className="topbar-right">
              <a href="/vender">Vende con nosotros</a>
              <span className="divider">|</span>
              <a href="/rastreo">Rastrea tu pedido</a>
            </div>
          </div>

          {/* Menú móvil (sin JS) */}
          <div className="container mobile-only">
            <details className="mobile-nav">
              <summary aria-label="Abrir menú">
                ☰ Menú
              </summary>
              <div className="mobile-panel">
                <form action="/buscar" method="GET" className="mobile-search">
                  <input name="q" type="search" placeholder="Buscar productos…" />
                  <button type="submit">Buscar</button>
                </form>
                <nav className="mobile-links">
                  <a href="/">Inicio</a>
                  <a href="/catalogo">Catálogo</a>
                  <a href="/ofertas">Ofertas</a>
                  <a href="/contacto">Contacto</a>
                  <a href="/vender">Vende con nosotros</a>
                  <a href="/rastreo">Rastrea tu pedido</a>
                  <a href="/login">Login</a>
                </nav>
              </div>
            </details>
          </div>
        </div>

        <main className="container" style={{padding:'22px 0'}}>
          {children}
        </main>
      </body>
    </html>
  );
}
