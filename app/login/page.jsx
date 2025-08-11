import { Suspense } from 'react';
import LoginClient from './LoginClient';

export default function Page() {
  // Envolver en Suspense evita el aviso de useSearchParams en App Router
  return (
    <Suspense fallback={null}>
      <LoginClient />
    </Suspense>
  );
}
