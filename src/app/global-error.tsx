'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error(error);
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'grid',
          placeItems: 'center',
          background: '#F8F7F5',
          color: '#1A1410',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        <div style={{ textAlign: 'center', padding: 24 }}>
          <p style={{ fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#DF5613', fontWeight: 700, margin: 0 }}>
            russle
          </p>
          <h1 style={{ fontSize: 32, margin: '16px 0 8px', letterSpacing: '-0.02em' }}>Something went wrong.</h1>
          <p style={{ color: 'rgba(26,20,16,0.54)', margin: 0 }}>Try again in a moment.</p>
          <button
            type="button"
            onClick={reset}
            style={{ marginTop: 24, height: 48, padding: '0 28px', borderRadius: 999, border: 0, background: '#DF5613', color: '#FFFFFF', fontWeight: 700, cursor: 'pointer' }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
