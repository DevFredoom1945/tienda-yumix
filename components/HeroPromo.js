// components/HeroPromo.js

export default function HeroPromo() {
  return (
    <section className="hero-promo">
      <div className="hero-main">
        <span className="hero-label">Edición Limitada</span>
        <h1 className="hero-title">
          COLECCIÓN ESCANDINAVA PARA TU HABITACIÓN SOLO <span className="hero-price">$599</span>
        </h1>
        <button className="hero-btn">Comprar ahora</button>
      </div>

      <div className="hero-side">
        <div className="promo-card">
          <img src="https://images.unsplash.com/photo-1600180758890-6b94519a8ba7?q=80&w=600" alt="Bolsos de cuero" />
          <div className="promo-info">
            <h3 className="promo-title">Bolsos de cuero Unio</h3>
            <p className="promo-sub">100% cuero hecho a mano</p>
            <span className="promo-discount">20% DTO</span>
          </div>
        </div>

        <div className="promo-card">
          <img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600" alt="iPhone 6+ 32Gb" />
          <div className="promo-info">
            <h3 className="promo-title">iPhone 6+ 32Gb</h3>
            <p className="promo-sub">El mejor smartphone del mundo</p>
            <span className="promo-discount">40% DTO</span>
          </div>
        </div>
      </div>
    </section>
  );
}
