import Link from "next/link";

interface SuccessPageProps {
  searchParams: Promise<{ id?: string }>;
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const { id } = await searchParams;

  return (
    <main style={{
      maxWidth: '600px',
      margin: '0 auto',
      padding: '80px 24px',
      textAlign: 'center',
    }}>
      {/* Green Checkmark */}
      <div style={{
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        background: 'rgba(34,197,94,0.12)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 24px',
      }}>
        <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="#22c55e" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
        </svg>
      </div>

      <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '12px' }}>Thank You!</h1>
      <p style={{ fontSize: '16px', color: 'var(--text-light)', lineHeight: 1.6, marginBottom: '12px' }}>
        Your support case has been submitted successfully.<br />
        We will get back to you soon.
      </p>

      {id && (
        <p style={{ fontSize: '13px', color: 'var(--text-light)', marginBottom: '40px' }}>
          Case ID: <span style={{ fontWeight: 700, color: '#fff' }}>{id}</span>
        </p>
      )}

      {/* Status Steps */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '48px',
        marginBottom: '48px',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '48px', height: '48px', borderRadius: '50%',
            background: 'rgba(232,93,38,0.12)', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="var(--orange)" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <span style={{ fontSize: '12px', color: 'var(--text-light)', fontWeight: 600 }}>Case<br/>Submitted</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '48px', height: '48px', borderRadius: '50%',
            background: 'rgba(232,93,38,0.12)', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="var(--orange)" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
            </svg>
          </div>
          <span style={{ fontSize: '12px', color: 'var(--text-light)', fontWeight: 600 }}>Under<br/>Review</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '48px', height: '48px', borderRadius: '50%',
            background: 'rgba(232,93,38,0.12)', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="var(--orange)" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
            </svg>
          </div>
          <span style={{ fontSize: '12px', color: 'var(--text-light)', fontWeight: 600 }}>Issue<br/>Resolved</span>
        </div>
      </div>

      {/* Go to Homepage */}
      <Link href="/" style={{
        display: 'inline-block',
        background: 'var(--orange)',
        color: '#fff',
        padding: '14px 40px',
        borderRadius: '8px',
        fontWeight: 700,
        fontSize: '14px',
        textDecoration: 'none',
      }}>
        Go to Homepage
      </Link>
    </main>
  );
}
