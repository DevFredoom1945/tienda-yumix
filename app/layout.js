import './globals.css';

export const metadata = {
  title: 'Mi Tienda',
  description: 'Tienda simple en Next.js lista para Vercel',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        {/* TOPBAR con logo, búsqueda, iconos y MENÚ */}
        <div className="topbar">
          <div className="container topbar-inner">
            <div className="brand">
              <img src="/logo 2.png" alt="Yumix" style={{height:'80px',objectFit:'contain'}} />
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

          {/* MENÚ dentro de la franja */}
          <div className="container topbar-menu">
            <nav>
              <a href="/">Inicio</a>
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
        </div>

        {/* (Quitamos la nav blanca de abajo) */}

        <main className="container" style={{padding:'22px 0'}}>
          {children}
        </main>
      </body>
    </html>
  );
}
