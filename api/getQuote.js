// Vercel serverless function: proxies quotable.io to avoid CORS issues.
export default async function handler(req, res) {
  try {
    const resp = await fetch(`https://api.quotable.io/random?ts=${Date.now()}`, {
      cache: 'no-store'
    });
    if (!resp.ok) {
      const text = await resp.text().catch(() => null);
      return res.status(resp.status).send(text || `Upstream status ${resp.status}`);
    }
    const data = await resp.json();
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    return res.status(200).json(data);
  } catch (err) {
    console.error('Proxy error:', err);
    return res.status(502).json({ error: 'proxy_failed' });
  }
}
