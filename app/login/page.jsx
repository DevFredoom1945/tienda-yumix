'use client';
export const dynamic = 'force-dynamic';

import { Suspense, useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '../../lib/supabase/client';
import { signIn } from 'next-auth/react'; // Google con NextAuth

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
  const [hint, setHint] = useState(''); // mensajito positivo
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(false);

  const router = useRouter();
  const search = useSearchParams();

  // Si llegaste redirigido por el middleware, respeta ?next=/ruta
  const nextUrl = (search && search.get('next')) || '/cuenta';

  // Si ya está logueado, no mostrar login
  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) {
        router.replace(nextUrl);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Helper: upsert a la tabla public.users_app (única por email)
  async function upsertUsersApp({
    email,
    full_name = null,
    provider = 'email',
    auth_id = null,
    avatar_url = null,
  }) {
    if (!email) return;

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

  // Validación de contraseña
  const passError = useMemo(() => {
    if (mode !== 'register') return '';
    if (!password) return '';
    const hasLen = password.length >= 8;
    const hasUpper = /[A-ZÁÉÍÓÚÜÑ]/.test(password);
    const hasLower = /[a-záéíóúüñ]/.test(password);
    const hasNum = /\d/.test(password);
    if (!hasLen || !hasUpper || !hasLower || !hasNum) {
      return 'La contraseña debe tener 8+ caracteres e incluir mayúscula, minúscula y número.';
    }
    return '';
  }, [password, mode]);

  // EMAIL / PASSWORD (Supabase)
  const signInWithEmail = async (e) => {
    e.preventDefault();
    setError('');
    setHint('');
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    setLoading(false);

    if (error) {
      if (/Invalid login credentials/i.test(error.message)) {
        setError('Correo o contraseña no válidos. ¿Aún no tienes cuenta? Regístrate.');
      } else {
        setError(error.message);
      }
      return;
    }

    const user =
      data?.user ?? (await supabase.auth.getUser()).data?.user;

    await upsertUsersApp({
      email: email.trim(),
      full_name: user?.user_metadata?.full_name || null,
      provider: 'email',
      auth_id: user?.id || null,
      avatar_url: user?.user_metadata?.avatar_url || null,
    });

    router.replace(nextUrl);
  };

  const signUpWithEmail = async (e) => {
    e.preventDefault();
    setError('');
    setHint('');

    if (passError) {
      setError(passError);
      return;
    }

    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      // options: { emailRedirectTo: typeof window !== 'undefined' ? `${window.location.origin}/cuenta` : 'https://yumix.com.co/cuenta' },
    });
    setLoading(false);

    if (error) {
      if (/user.*exists/i.test(error.message) || /already/i.test(error.message)) {
        setError('Este correo ya está registrado. Inicia sesión.');
      } else {
        setError(error.message);
      }
      return;
    }

    const userId = data.user?.id;
    if (userId) {
      await supabase.from('profiles').upsert({
        id: userId,
        full_name: name || null,
      });
    }

    await upsertUsersApp({
      email: email.trim(),
      full_name: name || null,
      provider: 'email',
      auth_id: userId || null,
    });

    setHint('¡Cuenta creada con éxito! Te redirigimos a tu perfil…');
    setTimeout(() => {
      router.replace('/cuenta/perfil?welcome=1');
    }, 800);
  };

  // GOOGLE OAUTH (NextAuth)
  const signInWithGoogle = async () => {
    setError('');
    setHint('');
    setOauthLoading(true);
    try {
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

        {/* Avisos */}
        {hint && <p className="hint" role="status">{hint}</p>}
        {error && <p className="error" role="alert">{error}</p>}

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
              autoComplete="email"
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
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              aria-invalid={!!passError}
            />
            {mode === 'register' && (
              <small className="help">
                Debe tener 8+ caracteres, con mayúscula, minúscula y número.
              </small>
            )}
          </div>

          <button
            className="btn btn-primary"
            type="submit"
            disabled={loading || (!!passError && mode === 'register')}
          >
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
}
