// components/UserEntry.tsx (Server Component)
import Link from "next/link";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options"; // o de tu route actual

export default async function UserEntry() {
  // 1) NextAuth (Google)
  const session = await getServerSession(authOptions);
  if (session?.user) {
    return <Link href="/cuenta" className="header-link">Cuenta</Link>;
  }

  // 2) Supabase (email+password)
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name) => cookies().get(name)?.value,
        set() {},
        remove() {},
      },
    }
  );
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    return <Link href="/cuenta" className="header-link">Cuenta</Link>;
  }

  // 3) Sin sesión
  return <Link href="/login" className="header-link">Login</Link>;
}
