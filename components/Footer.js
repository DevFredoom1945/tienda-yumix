// components/Footer.js

export default function Footer() {
  const enlacesRapidos = [
    'Computadora de escritorio', 'Portátil', 'Teléfonos inteligentes', 'Tableta',
    'Controlador de videojuegos', 'Audio y video', 'Altavoz inalámbrico', 'Dron'
  ];
  const compania = [
    'Cuidado del cabello', 'Maquillaje', 'Gel de ducha', 'Cuidado de la piel', 'Colonia', 'Perfume'
  ];
  const negocios = [
    'Collar', 'Colgante', 'Anillo de diamantes', 'Arete de plata',
    'Reloj de cuero', 'Rolex', 'Gucci'
  ];

  return (
    <footer className="site-footer">
      {/* BLOQUE SUPERIOR */}
      <div className="container footer-top">
        <div className="footer-col contact">
          <h4>Contáctanos</h4>
          <p className="muted">Atendemos 24/7</p>
          <div className="bigphone">1800 97 97 69</div>
          <p className="muted">
            502 New Design Str, Melbourne, Australia<br />
            contact@martfury.co
          </p>

          <div className="socials">
            <a href="#" aria-label="Facebook">👍</a>
            <a href="#" aria-label="X / Twitter">𝕏</a>
            <a href="#" aria-label="Google">G+</a>
            <a href="#" aria-label="YouTube">▶️</a>
            <a href="#" aria-label="Instagram">📸</a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Enlaces Rápidos</h4>
          <ul>{enlacesRapidos.map((t) => <li key={t}><a href="#">{t}</a></li>)}</ul>
        </div>

        <div className="footer-col">
          <h4>Compañía</h4>
          <ul>{compania.map((t) => <li key={t}><a href="#">{t}</a></li>)}</ul>
        </div>

        <div className="footer-col">
          <h4>Negocios</h4>
          <ul>{negocios.map((t) => <li key={t}><a href="#">{t}</a></li>)}</ul>
        </div>
      </div>

      {/* BLOQUE INTERMEDIO (categorías agrupadas) */}
      <div className="container footer-cats">
        <p>
          <strong>Salud y Belleza:</strong>{' '}
          Aires acondicionados | Audio y teatros | Electrónica para autos |
          {' '}Electrónica de oficina | Televisores | Lavadoras
        </p>
        <p>
          <strong>Joyería y Relojes:</strong>{' '}
          Impresoras | Proyectores | Escáneres | Tienda y negocios |
          {' '}TVs 4K Ultra HD | TVs LED | TVs OLED
        </p>
        <p>
          <strong>Computadoras y Tecnología:</strong>{' '}
          Utensilios de cocina | Decoración | Muebles | Herramientas de jardín |
          {' '}Equipos de jardín | Herramientas eléctricas y manuales | Utensilios y gadgets
        </p>
      </div>

      {/* BLOQUE INFERIOR (pagos + copyright) */}
      <div className="container footer-bottom">
        <p className="muted">© {new Date().getFullYear()} Yumix. Todos los derechos reservados</p>

        <div className="pay-logos">
          {/* Sube estos archivos a /public/payments/ o cambia las rutas a las que quieras */}
          <img src="/payments/western-union.png" alt="Western Union" />
          <img src="/payments/cirrus.png" alt="Cirrus" />
          <img src="/payments/mastercard.png" alt="MasterCard" />
          <img src="/payments/skrill.png" alt="Skrill" />
          <img src="/payments/visa.png" alt="Visa" />
          <img src="/payments/paypal.png" alt="PayPal" />
        </div>
      </div>
    </footer>
  );
}

