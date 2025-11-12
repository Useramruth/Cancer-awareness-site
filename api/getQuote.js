// api/getQuote.js
// Robust Vercel serverless function: proxies quotable.io, adds timeout + fallback.

const FALLBACK_QUOTE = {
  content: 'Awareness is the first step toward hope and healing.',
  author: 'Cancer Awareness'
};

const API_URL = 'https://api.quotable.io/random';
const TIMEOUT_MS = 5000; // 5 seconds timeout

export default async function handler(req, res) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const resp = await fetch(`${API_URL}?ts=${Date.now()}`, {
      signal: controller.signal,
      cache: 'no-store'
    });

    clearTimeout(timeout);

    if (!resp.ok) {
      console.warn('Upstream responded with:', resp.status);
      return res.status(200).json(FALLBACK_QUOTE);
    }

    const data = await resp.json();
    const content = data?.content || FALLBACK_QUOTE.content;
    const author = data?.author || FALLBACK_QUOTE.author;

    res.setHeader(
      'Cache-Control',
      'no-store, no-cache, must-revalidate, proxy-revalidate'
    );
    return res.status(200).json({ content, author });
  } catch (err) {
    clearTimeout(timeout);
    console.error('Proxy error:', err.message || err);
    // Always return 200 with fallback instead of 502, so frontend shows something
    return res.status(200).json(FALLBACK_QUOTE);
  }
}

