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
    </section>
  );
}

