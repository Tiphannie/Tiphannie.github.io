// pages/_app.tsx
import '../styles/rate_styles.css';

import type { AppProps } from 'next/app';

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
