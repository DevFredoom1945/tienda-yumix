import Link from 'next/link';

export default function Home() {
  return (
    <section>
      <h1 style={{fontSize:28, marginBottom:8}}>¡Bienvenido!</h1>
      <p style={{color:'#444'}}>Starter limpio listo para publicar en Vercel.</p>
      <p><Link href="/catalogo">Ir al catálogo →</Link></p>
    </section>
  );
}
