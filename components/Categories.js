// components/Categories.js

const CATEGORIES = [
  { title: 'Electrónica',        img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600' },
  { title: 'Ropa',               img: 'https://i.ebayimg.com/thumbs/images/g/lroAAeSwCGBoevQJ/s-l1200.jpg' },
  { title: 'Computadores',       img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=600' },
  { title: 'Hogar y Cocina',     img: 'https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?q=80&w=600' },
  { title: 'Salud y Belleza',    img: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=600' },
  { title: 'Joyas y Relojes',    img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600' },
  { title: 'Juguetes Tecnológicos', img: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=600' },
  { title: 'Smartphones',        img: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=600' },
];

// para URLs limpias: "Hogar y Cocina" -> "hogar-y-cocina"
const slugify = (s) =>
  s.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

export default function Categories() {
  return (
    <section className="container cats">
      <h2 className="cats-title">Categorías destacadas del mes</h2>
      <div className="cats-grid">
        {CATEGORIES.map((c, i) => (
          <a
            key={i}
            href={`/catalogo?cat=${slugify(c.title)}`}
            className="cat-card"
            aria-label={c.title}
            title={c.title}
          >
            <div className="cat-imgwrap">
              <img src={c.img} alt={c.title} />
            </div>
            <div className="cat-name">{c.title}</div>
          </a>
        ))}
      </div>
    </section>
  );
}

