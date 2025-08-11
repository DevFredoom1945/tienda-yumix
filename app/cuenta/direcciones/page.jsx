import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function DireccionesPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: addresses } = await supabase
    .from('addresses')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending:false });

  async function addAddress(formData) {
    'use server';
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect('/login');

    const row = {
      user_id: user.id,
      label: formData.get('label') || null,
      name: formData.get('name'),
      line1: formData.get('line1'),
      line2: formData.get('line2') || null,
      city: formData.get('city'),
      state: formData.get('state') || null,
      zip: formData.get('zip') || null,
      country: formData.get('country') || 'CO',
      is_default: formData.get('is_default') === 'on'
    };

    if (row.is_default) {
      await supabase
        .from('addresses')
        .update({ is_default:false })
        .eq('user_id', user.id);
    }
    await supabase.from('addresses').insert(row);
    redirect('/cuenta/direcciones');
  }

  return (
    <section>
      <h1>Mis direcciones</h1>

      <ul style={{display:'grid',gap:10,margin:'12px 0'}}>
        {(addresses ?? []).map(a => (
          <li key={a.id} style={{padding:12,border:'1px solid #e5e7eb',borderRadius:10}}>
            <b>{a.label || 'Dirección'}</b> {a.is_default ? ' (predeterminada)' : ''}
            <div>{a.name}</div>
            <div>{a.line1}{a.line2 ? `, ${a.line2}` : ''}</div>
            <div>{a.city}{a.state ? `, ${a.state}` : ''} {a.zip ?? ''}</div>
            <div>{a.country}</div>
          </li>
        ))}
      </ul>

      <h2>Agregar nueva</h2>
      <form action={addAddress} style={{display:'grid',gap:8,maxWidth:520}}>
        <input name="label" placeholder="Etiqueta (Casa, Oficina)" />
        <input name="name" placeholder="Nombre receptor" required />
        <input name="line1" placeholder="Dirección (línea 1)" required />
        <input name="line2" placeholder="Dirección (línea 2)" />
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
          <input name="city" placeholder="Ciudad" required />
          <input name="state" placeholder="Departamento/Estado" />
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
          <input name="zip" placeholder="Código postal" />
          <input name="country" placeholder="País" defaultValue="CO" />
        </div>
        <label style={{display:'flex',gap:8,alignItems:'center'}}>
          <input type="checkbox" name="is_default" /> Usar como predeterminada
        </label>
        <button type="submit">Guardar</button>
      </form>
    </section>
  );
}
