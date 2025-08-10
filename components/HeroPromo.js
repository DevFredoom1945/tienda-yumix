// components/HeroPromo.js
import Link from 'next/link';

export default function HeroPromo() {
  // Solo textos en español — mantenemos las mismas clases CSS
  const main = {
    img: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1400',
    eyebrow: 'Edición limitada',
    title: (
      <>
        COLECCIÓN ESCANDINAVA PARA TU
        <br />
        HABITACIÓN SOLO <span className="price">$599</span>
      </>
    ),
    ctaText: 'Comprar ahora',
    ctaHref: '/catalogo',
  };

  const sideTop = {
    img: 'https://images.unsplash.com/photo-1600180758890-6b94519a8ba7?q=80&w=800',
    title: 'Bolsos de cuero Unio',
    subtitle: '100% cuero hecho a mano',
    badge: '20% DTO',
    href: '/catalogo',
  };

  const sideBottom = {
    img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800',
    title: 'iPhone 6+ 32Gb',
    subtitle: 'El mejor smartphone del mundo',
    badge: '40% DTO',
    href: '/catalogo',
  };

  return (
    <div className="hero container">
      {/* Banner principal */}
      <Link className="hero-main" href={main.ctaHref}>
        <img src={main.img} alt="Colección escandinava para tu habitación" />
        <div className="hero-main-overlay">
          <div className="hero-eyebrow">{main.eyebrow}</div>
          <h2 className="hero-title">{main.title}</h2>
          <button className="hero-cta">{main.ctaText}</button>
        </div>
      </Link>

      {/* Columna lateral con dos promos */}
      <div className="hero-side">
        {[sideTop, sideBottom].map((p, i) => (
          <Link className="hero-card" href={p.href} key={i}>
            <img src={p.img} alt={p.title} />
            <div className="hero-card-overlay">
              <div>
                <h3 className="hero-card-title">{p.title}</h3>
                <p className="hero-card-sub">{p.subtitle}</p>
              </div>
              <span className="hero-badge">{p.badge}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
