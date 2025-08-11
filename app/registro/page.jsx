'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [name,setName]=useState('');
  const [error,setError]=useState('');
  const router = useRouter();

  const onSubmit = async (e)=>{
    e.preventDefault();
    setError('');

    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return setError(error.message);

    const userId = data.user?.id;
    try {
      if (userId) {
        await supabase.from('profiles').upsert({ id:userId, full_name:name });
      }
    } catch (err) {
      // no bloquees el flujo si falla, lo podrás completar luego
    }

    router.push('/cuenta');
  };

  return (
    <section>
      <h1>Crear cuenta</h1>
      <form onSubmit={onSubmit} style={{display:'grid',gap:12,maxWidth:380}}>
        <input placeholder="Nombre completo" value={name} onChange={e=>setName(e.target.value)} />
        <input placeholder="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input placeholder="Contraseña" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        <button type="submit">Registrarme</button>
        {error && <small style={{color:'crimson'}}>{error}</small>}
        <a href="/login">¿Ya tienes cuenta? Inicia sesión</a>
      </form>
    </section>
  );
}
