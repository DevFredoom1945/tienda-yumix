import Link from 'next/link';
import HeroPromo from '../components/HeroPromo';
import Benefits from '../components/Benefits';
import Categories from '../components/Categories';

export default function Home() {
  return (
    <section>
      {/* Banner principal + promos laterales */}
      <HeroPromo />

      {/* Franja de beneficios */}
      <Benefits />

      {/* Categorías del mes */}
      <Categories />

      {/* Contenido original */}
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>¡Bienvenido!</h1>
      <p style={{ color: '#444' }}>Starter limpio listo para publicar en Vercel.</p>
      <p>
        <Link href="/catalogo">Ir al catálogo →</Link>
      </p>
    </section>
  );
}

