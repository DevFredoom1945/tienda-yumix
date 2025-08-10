import Link from 'next/link';
import HeroPromo from '@/components/HeroPromo'; // Asegúrate de crear este componente como te pasé antes

export default function Home() {
  return (
    <section>
      {/* Sección de hero con promociones */}
      <HeroPromo />

      {/* Contenido original */}
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>¡Bienvenido!</h1>
      <p style={{ color: '#444' }}>Starter limpio listo para publicar en Vercel.</p>
      <p>
        <Link href="/catalogo">Ir al catálogo →</Link>
      </p>
    </section>
  );
}
