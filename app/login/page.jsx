// app/login/page.jsx
import { Suspense } from 'react';

function LoginClient() {
  'use client';
  import { useState } from 'react';
  import { useRouter, useSearchParams } from 'next/navigation';
  import { supabase } from '../../lib/supabase/client';

  // Si no usas useSearchParams, puedes comentar esta línea. La dejo por si usas ?next=
  const searchParams = useSearchParams();
  const nextPath = searchParams?.get('next') || '/cuenta';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return setError(error.message);
    router.push(nextPath);
  };

  return (
    <section>
      <h1>Iniciar sesión</h1>
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12, maxWidth: 380 }}>
        <input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input placeholder="Contraseña" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Entrar</button>
        {error && <small style={{ color: 'crimson' }}>{error}</small>}
        <a href="/registro">¿No tienes cuenta? Regístrate</a>
      </form>
    </section>
  );
}

export default function Page() {
  // Envolver el cliente en <Suspense> evita el error de prerender
  return (
    <Suspense fallback={null}>
      <LoginClient />
    </Suspense>
  );
}

