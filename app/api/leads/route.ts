// Server-side proxy: forwards form submissions to the secret webhook URL
// kept in the LEADS_WEBHOOK_URL Vercel env var (never sent to the browser).
export const runtime = 'edge';

export async function POST(req) {
  const url = process.env.LEADS_WEBHOOK_URL;
  if (!url) {
    return Response.json({ ok: false, error: 'config_missing' }, { status: 500 });
  }
  try {
    const body = await req.json();
    const upstream = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(body),
    });
    const text = await upstream.text();
    return new Response(text, {
      status: upstream.ok ? 200 : 502,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return Response.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
