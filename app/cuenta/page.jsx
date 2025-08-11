import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function CuentaPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  async function signOut() {
    'use server';
    const supabase = createClient();
    await supabase.auth.signOut();
    redirect('/');
  }

  return (
    <section>
      <h1>Mi cuenta</h1>
      <p><b>Correo:</b> {user.email}</p>
      <p><b>Nombre:</b> {profile?.full_name ?? '—'}</p>

      <div style={{display:'flex',gap:12,marginTop:10}}>
        <Link href="/cuenta/direcciones">Mis direcciones</Link>
        <form action={signOut}><button type="submit">Cerrar sesión</button></form>
      </div>
    </section>
  );
}
