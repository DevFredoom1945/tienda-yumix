// app/auth/callback/route.js
import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function GET(request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const next = url.searchParams.get('next') || '/cuenta';

  // preparamos la respuesta (redirige a /cuenta al final)
  const res = NextResponse.redirect(new URL(next, request.url));

  // cliente Supabase ligado a cookies de la request/response
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get: (name) => request.cookies.get(name)?.value,
        set: (name, value, options) => res.cookies.set(name, value, options),
        remove: (name, options) => res.cookies.set(name, '', options),
      },
    }
  );

  // si viene ?code=..., canjea por sesión y setea cookies
  if (code) {
    await supabase.auth.exchangeCodeForSession(code);
  }

  return res;
}
