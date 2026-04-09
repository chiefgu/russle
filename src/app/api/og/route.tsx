import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'russle';
  const subtitle =
    searchParams.get('subtitle') ||
    'Web design, development, and branding';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          background: '#F8F7F5',
          color: '#1A1410',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span
            style={{
              fontSize: '40px',
              fontWeight: 500,
              letterSpacing: '-0.04em',
            }}
          >
            russle
          </span>
          <span
            style={{
              width: '14px',
              height: '14px',
              borderRadius: '999px',
              background: '#DF5613',
            }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <p
            style={{
              fontSize: '24px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: '#1A141052',
              margin: 0,
            }}
          >
            {subtitle}
          </p>
          <h1
            style={{
              fontSize: '96px',
              fontWeight: 500,
              letterSpacing: '-0.05em',
              lineHeight: 1,
              margin: '32px 0 0 0',
              maxWidth: '90%',
            }}
          >
            {title}
          </h1>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
