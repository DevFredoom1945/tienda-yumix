// middleware.js
import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function middleware(req) {
  // Solo protegemos rutas que empiecen por /cuenta
  if (!req.nextUrl.pathname.startsWith('/cuenta')) {
    return NextResponse.next();
  }

  const res = NextResponse.next();

  // Cliente de Supabase en el edge/middleware
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get: (name) => req.cookies.get(name)?.value,
        set: (name, value, options) => res.cookies.set(name, value, options),
        remove: (name, options) => res.cookies.set(name, '', options),
      },
    }
  );

  // ¿Hay usuario?
  const { data: { user } } = await supabase.auth.getUser();

  // Si NO hay sesión, redirigimos a /login y pasamos la ruta original en ?next=
  if (!user) {
    const url = new URL('/login', req.url);
    url.searchParams.set('next', req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return res;
}

// Solo aplicar el middleware a /cuenta/*
export const config = {
  matcher: ['/cuenta/:path*'],
};
