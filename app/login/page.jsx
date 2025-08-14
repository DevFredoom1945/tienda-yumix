'use client';
export const dynamic = 'force-dynamic';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '../../lib/supabase/client';
import { signIn } from 'next-auth/react'; // NextAuth (Google OAuth)

/** Wrapper que provee el Suspense requerido por useSearchParams */
export default function AuthPage() {
  return (
    <Suspense fallback={null}>
      <AuthInner />
    </Suspense>
  );
}

function AuthInner() {
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(false);

  const router = useRouter();
  const search = useSearchParams();

  // Si llegaste redirigido por el middleware, respeta ?next=/ruta
  const nextUrl = (search && search.get('next')) || '/cuenta';

  // -------------------------------------------
  // Helper: validación básica de contraseña
  // -------------------------------------------
  const isStrongPassword = (pwd) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(pwd); // 8+, minúscula, mayúscula, número

  // -------------------------------------------
  // Helper: upsert a la tabla public.users_app
  // -------------------------------------------
  async function upsertUsersApp({
    email,
    full_name = null,
    provider = 'email',
    auth_id = null,
    avatar_url = null,
  }) {
    if (!email) return;

    // onConflict: 'email' asegura 1 fila por email (actualiza si ya existe)
    await supabase
      .from('users_app')
      .upsert(
        {
          email,
          full_name,
          provider,
          auth_id,
          avatar_url,
          last_login: new Date().toISOString(),
        },
        { onConflict: 'email' }
      );
  }

  // =========================
  // EMAIL / PASSWORD (Supabase)
  // =========================
  const signInWithEmail = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    setLoading(false);

    if (error) {
      const msg = (error.message || '').toLowerCase();

      if (msg.includes('invalid login credentials')) {
        return setError('Datos incorrectos. ¿No tienes cuenta? Regístrate.');
      }
      if (msg.includes('email not confirmed')) {
        return setError('Debes confirmar tu correo antes de entrar.');
      }
      // mensaje genérico
      return setError('No encontramos una cuenta con ese correo. Regístrate.');
    }

    // Refresca/crea entrada en users_app
    const user = data?.user ?? (await supabase.auth.getUser()).data?.user;
    await upsertUsersApp({
      email: email.trim(),
      full_name: user?.user_metadata?.full_name || null,
      provider: 'email',
      auth_id: user?.id || null,
      avatar_url: user?.user_metadata?.avatar_url || null,
    });

    router.push(nextUrl);
  };

  const signUpWithEmail = async (e) => {
    e.preventDefault();
    setError('');

    // Reglas mínimas de seguridad
    if (!isStrongPassword(password)) {
      return setError(
        'La contraseña debe tener al menos 8 caracteres, con mayúscula, minúscula y número.'
      );
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
    });

    setLoading(false);

    if (error) {
      const msg = (error.message || '').toLowerCase();
      if (msg.includes('already registered') || msg.includes('exists')) {
        return setError('Este correo ya está registrado. Inicia sesión.');
      }
      return setError('No se pudo crear la cuenta. Intenta más tarde.');
    }

    // Crear/actualizar perfil básico en tu tabla profiles
    const userId = data.user?.id;
    if (userId) {
      await supabase.from('profiles').upsert({
        id: userId,
        full_name: name || null,
      });
    }

    // Upsert también en users_app (1 fila por email)
    await upsertUsersApp({
      email: email.trim(),
      full_name: name || null,
      provider: 'email',
      auth_id: userId || null,
    });

    // Llevar a completar perfil tras registrarse
    router.push('/cuenta/completar');
  };

  // =========================
  // GOOGLE OAUTH (NextAuth)
  // =========================
  const signInWithGoogle = async () => {
    setError('');
    setOauthLoading(true);
    try {
      // Va por NextAuth (no Supabase). El upsert a users_app debe estar
      // en tu handler de NextAuth (app/api/auth/[...nextauth]/route.js).
      await signIn('google', { callbackUrl: nextUrl });
    } catch (e) {
      setError(e?.message || 'Error conectando con Google');
    } finally {
      setOauthLoading(false);
    }
  };

  return (
    <section className="auth-wrap">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">🛍️</div>
          <h1>{mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}</h1>
          <p>{mode === 'login' ? 'Bienvenido de vuelta' : 'Regístrate para comprar más rápido'}</p>
        </div>

        <div className="auth-tabs">
          <button
            className={`tab ${mode === 'login' ? 'active' : ''}`}
            onClick={() => setMode('login')}
          >
            Entrar
          </button>
          <button
            className={`tab ${mode === 'register' ? 'active' : ''}`}
            onClick={() => setMode('register')}
          >
            Registrarme
          </button>
        </div>

        {/* Google con NextAuth */}
        <button
          className="btn btn-google"
          onClick={signInWithGoogle}
          disabled={oauthLoading}
          aria-busy={oauthLoading}
        >
          <svg aria-hidden="true" width="18" height="18" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.9 31.7 29.4 35 24 35c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34.4 5.1 29.5 3 24 3 12.3 3 3 12.3 3 24s9.3 21 21 21c10.5 0 19.3-7.6 21-17.5v-7z"/>
            <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.4 16.3 18.8 13 24 13c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34.4 5.1 29.5 3 24 3 16.1 3 9.2 7.4 6.3 14.7z"/>
            <path fill="#4CAF50" d="M24 45c5.3 0 10.1-2 13.7-5.3l-6.3-5.2C29.4 35.7 26.9 37 24 37c-5.3 0-9.8-3.4-11.4-8l-6.5 5C9 41.1 15.9 45 24 45z"/>
            <path fill="#1976D2" d="M45 24c0-1.3-.1-2.6-.4-3.8H24v8h11.3c-.9 4.2-4.8 7.3-9.3 7.3-5.3 0-9.8-3.4-11.4-8l-6.5 5C9 41.1 15.9 45 24 45c10.5 0 19.3-7.6 21-17.5V24z"/>
          </svg>
          {oauthLoading ? 'Conectando…' : 'Continuar con Google'}
        </button>

        <div className="divider"><span>o</span></div>

        {/* Mensaje de error global */}
        {error && <p className="error">{error}</p>}

        <form
          className="auth-form"
          onSubmit={mode === 'login' ? signInWithEmail : signUpWithEmail}
        >
          {mode === 'register' && (
            <div className="field">
              <label>Nombre</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tu nombre"
              />
            </div>
          )}

          <div className="field">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="usuario@correo.com"
            />
          </div>

          <div className="field">
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
            {mode === 'register' && (
              <small>Debe tener 8+ caracteres, con mayúscula, minúscula y número.</small>
            )}
          </div>

          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? 'Procesando…' : (mode === 'login' ? 'Entrar' : 'Registrarme')}
          </button>
        </form>

        <div className="auth-links">
          {mode === 'login' ? (
            <a href="/registro" onClick={(e) => { e.preventDefault(); setMode('register'); }}>
              ¿No tienes cuenta? Regístrate
            </a>
          ) : (
            <a href="/login" onClick={(e) => { e.preventDefault(); setMode('login'); }}>
              ¿Ya tienes cuenta? Inicia sesión
            </a>
          )}
          <a href="/olvide-password">¿Olvidaste tu contraseña?</a>
        </div>
      </div>
    </section>
  );
