// components/Footer.js

export default function Footer() {
  const quickLinks = [
    'Desktop PC', 'Laptop', 'Smartphones', 'Tablet',
    'Game Controller', 'Audio & Video', 'Wireless Speaker', 'Drone'
  ];
  const company = [
    'Hair Care', 'Makeup', 'Body Shower', 'Skin Care', 'Cologne', 'Perfume'
  ];
  const business = [
    'Necklace', 'Pendant', 'Diamond Ring', 'Silver Earring',
    'Leather Watch', 'Rolex', 'Gucci'
  ];

  return (
    <footer className="site-footer">
      {/* BLOQUE SUPERIOR */}
      <div className="container footer-top">
        <div className="footer-col contact">
          <h4>Contact Us</h4>
          <p className="muted">Call us 24/7</p>
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
          <h4>Quick Links</h4>
          <ul>{quickLinks.map((t) => <li key={t}><a href="#">{t}</a></li>)}</ul>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <ul>{company.map((t) => <li key={t}><a href="#">{t}</a></li>)}</ul>
        </div>

        <div className="footer-col">
          <h4>Business</h4>
          <ul>{business.map((t) => <li key={t}><a href="#">{t}</a></li>)}</ul>
        </div>
      </div>

      {/* BLOQUE INTERMEDIO (categorías agrupadas) */}
      <div className="container footer-cats">
        <p>
          <strong>Health & Beauty:</strong>{' '}
          Air Conditioners | Audios & Theaters | Car Electronics |
          {' '}Office Electronics | TV Televisions | Washing Machines
        </p>
        <p>
          <strong>Jewelry & Watches:</strong>{' '}
          Printers | Projectors | Scanners | Store & Business |
          {' '}4K Ultra HD TVs | LED TVs | OLED TVs
        </p>
        <p>
          <strong>Computer & Technologies:</strong>{' '}
          Cookware | Decoration | Furniture | Garden Tools |
          {' '}Garden Equipments | Powers And Hand Tools | Utensil & Gadget
        </p>
      </div>

      {/* BLOQUE INFERIOR (pagos + copyright) */}
      <div className="container footer-bottom">
        <p className="muted">© {new Date().getFullYear()} Yumix. All Rights Reserved</p>

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
