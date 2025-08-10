import { notFound } from 'next/navigation';
import { products } from '../../../lib/products';

export default function Producto({ params }) {
  const item = products.find(p => p.slug === params.slug);
  if (!item) return notFound();

  return (
    <section>
      <h1 style={{fontSize:24}}>{item.name}</h1>
      <p style={{color:'#444'}}>Precio: ${item.price.toLocaleString('es-CO')}</p>
      <p style={{maxWidth:620}}>{item.description}</p>
      <p style={{marginTop:16, fontSize:14, color:'#666'}}>(Próximamente: carrito y pagos)</p>
    </section>
  );
}
