
import React from 'react';
import { Helmet } from 'react-helmet';
import {
  resolveRedirectUrl,
} from '@/config/redirects';

function App() {
  const shouldAutoRedirect = import.meta.env.PROD || import.meta.env.VITE_FORCE_REDIRECT === 'true';

  React.useEffect(() => {
    const { pathname, search } = window.location;
    const targetUrl = resolveRedirectUrl(pathname, search);

    if (shouldAutoRedirect) {
      window.location.replace(targetUrl);
    }
  }, [shouldAutoRedirect]);

  return (
    <>
      <Helmet>
        <title>Redirecting...</title>
        <meta name="description" content="Redirecting..." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <main />
    </>
  );
}

export default App;
