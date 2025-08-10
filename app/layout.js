export const metadata = {
  title: 'Mi Tienda',
  description: 'Tienda simple en Next.js lista para Vercel',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body style={{fontFamily:'system-ui, Arial', margin:0}}>
        <header style={{padding:'12px 20px', borderBottom:'1px solid #eee', position:'sticky', top:0, background:'#fff'}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', maxWidth:980, margin:'0 auto'}}>
            <strong>MiTienda</strong>
            <nav style={{display:'flex', gap:12}}>
              <a href="/">Inicio</a>
              <a href="/catalogo">Catálogo</a>
            </nav>
          </div>
        </header>
        <main style={{maxWidth:980, margin:'24px auto', padding:'0 16px'}}>
          {children}
        </main>
        <footer style={{padding:'24px', borderTop:'1px solid #eee'}}>
          <div style={{maxWidth:980, margin:'0 auto', fontSize:12, color:'#666'}}>
            © {new Date().getFullYear()} Mi Tienda.
          </div>
        </footer>
      </body>
    </html>
  );
}

