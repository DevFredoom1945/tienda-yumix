import { Suspense } from 'react';
import RegisterClient from './RegisterClient';

export const dynamic = 'force-dynamic';

export default function Page() {
  return (
    <Suspense fallback={<p style={{padding:12}}>Cargando registro…</p>}>
      <RegisterClient />
    </Suspense>
  );
}
