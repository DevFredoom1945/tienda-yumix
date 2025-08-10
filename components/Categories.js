// components/Categories.js
const CATEGORIES = [
  { title: 'Electronics',     img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600' },
  { title: 'Clothings',       img: 'https://images.unsplash.com/photo-1520975922284-9a1c5aa0c050?q=80&w=600' },
  { title: 'Computers',       img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=600' },
  { title: 'Home & Kitchen',  img: 'https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?q=80&w=600' },
  { title: 'Health & Beauty', img: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=600' },
  { title: 'Jewelry & Watch', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600' },
  { title: 'Technology Toys', img: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=600' },
  { title: 'Smartphones',     img: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=600' },
];

export default function Categories() {
  return (
    <section className="container cats">
      <h2 className="cats-title">Top Categories Of The Month</h2>
      <div className="cats-grid">
        {CATEGORIES.map((c, i) => (
          <a key={i} href={`/catalogo?cat=${encodeURIComponent(c.title)}`} className="cat-card">
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
