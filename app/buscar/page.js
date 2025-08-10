import Link from 'next/link';
import { products } from '../../lib/products';

export const revalidate = 0;

export default function Buscar({ searchParams }) {
  const q = (searchParams?.q || '').toLowerCase().trim();
  const results = q
    ? products.filter(p =>
        (p.name + ' ' + (p.description||'')).toLowerCase().includes(q)
      )
    : [];

  return (
    <section>
      <h1 style={{fontSize:24, marginBottom:10}}>Resultados para: “{q || '…'}”</h1>

      {q === '' && <p style={{color:'#555'}}>Escribe algo en la barra de búsqueda de arriba.</p>}

      {q && results.length === 0 && (
        <p style={{color:'#555'}}>No encontramos productos que coincidan.</p>
      )}

      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(220px,1fr))', gap:16}}>
        {results.map(p => (
          <article key={p.id} style={{border:'1px solid #eee', borderRadius:12, padding:12}}>
            <div style={{height:140, background:'#fafafa', borderRadius:8, display:'grid', placeItems:'center'}}>
              <span style={{fontSize:12, color:'#666'}}>Imagen</span>
            </div>
            <h3 style={{fontSize:16, margin:'8px 0 4px'}}>{p.name}</h3>
            <p style={{margin:0, color:'#555'}}>${p.price.toLocaleString('es-CO')}</p>
            <Link href={`/producto/${p.slug}`} style={{display:'inline-block', marginTop:8}}>Ver</Link>
          </article>
        ))}
      </div>
    </section>
  );
}
