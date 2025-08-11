'use client';

import { useState } from 'react';
import { supabase } from '../../lib/supabase/client';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LoginPage() {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [error,setError]=useState('');
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get('next') || '/cuenta';

  const onSubmit = async (e)=>{
    e.preventDefault();
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return setError(error.message);
    router.push(next);
  };

  return (
    <section>
      <h1>Iniciar sesión</h1>
      <form onSubmit={onSubmit} style={{display:'grid',gap:12,maxWidth:380}}>
        <input placeholder="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input placeholder="Contraseña" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        <button type="submit">Entrar</button>
        {error && <small style={{color:'crimson'}}>{error}</small>}
        <a href="/registro">¿No tienes cuenta? Regístrate</a>
      </form>
    </section>
  );
}
