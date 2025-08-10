export default function HeroPromo() {
  // Cambia estas URLs/títulos/CTAs por los tuyos
  const main = {
    img: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1400",
    eyebrow: "Limited Edition",
    title: <>SCANDINAVIAN COLLECTION FOR YOUR<br/>BEDROOM JUST <span className="price">$599</span></>,
    ctaText: "Shop Now",
    ctaHref: "/catalogo"
  };

  const sideTop = {
    img: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=800",
    title: "Unio Leather Bags",
    subtitle: "100% leather handmade",
    badge: "20% OFF",
    href: "/catalogo"
  };

  const sideBottom = {
    img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800",
    title: "iPhone 6+ 32Gb",
    subtitle: "Best smartphone on the world",
    badge: "40% OFF",
    href: "/catalogo"
  };

  return (
    <div className="hero container">
      {/* Banner principal */}
      <a className="hero-main" href={main.ctaHref}>
        <img src={main.img} alt="Hero" />
        <div className="hero-main-overlay">
          <div className="hero-eyebrow">{main.eyebrow}</div>
          <h2 className="hero-title">{main.title}</h2>
          <button className="hero-cta">{main.ctaText}</button>
        </div>
      </a>

      {/* Columna lateral con dos promos */}
      <div className="hero-side">
        {[sideTop, sideBottom].map((p, i) => (
          <a className="hero-card" href={p.href} key={i}>
            <img src={p.img} alt={p.title} />
            <div className="hero-card-overlay">
              <div>
                <h3 className="hero-card-title">{p.title}</h3>
                <p className="hero-card-sub">{p.subtitle}</p>
              </div>
              <span className="hero-badge">{p.badge}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
