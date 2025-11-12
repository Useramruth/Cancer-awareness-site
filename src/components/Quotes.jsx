import React, { useEffect, useRef, useState } from 'react'
const MAX_RETRIES = 3
const RETRY_BASE_MS = 350
// fallback quote in case API fails
const FALLBACK_QUOTE = {
  content: 'Hope is the companion of power and mother of success.',
  author: 'Samuel Smiles'
}
export default function Quotes() {
  const [quote, setQuote] = useState(FALLBACK_QUOTE)
  const [loading, setLoading] = useState(false)
  const requestIdRef = useRef(0)
  const abortRef = useRef(null)
  async function doFetch(signal) {
    const url =
      process.env.NODE_ENV === 'production'
        ? `/api/getQuote?ts=${Date.now()}`
        : `https://api.quotable.io/random?ts=${Date.now()}`

    const res = await fetch(url, { signal, cache: 'no-store' })
    if (!res.ok) throw new Error(`Proxy returned ${res.status}`)
    const data = await res.json()
    return { content: data.content, author: data.author || 'Unknown' }
  }

  async function fetchQuote() {
    setLoading(true)
    const myId = ++requestIdRef.current

    if (abortRef.current) {
      try { abortRef.current.abort() } catch { }
    }
    abortRef.current = new AbortController()
    const { signal } = abortRef.current

    let attempt = 0
    while (attempt < MAX_RETRIES) {
      try {
        const result = await doFetch(signal)
        if (myId === requestIdRef.current) {
          setQuote(result)
          setLoading(false)
        }
        return
      } catch (err) {
        if (err.name === 'AbortError') return
        console.warn(`Quote fetch failed (try ${attempt + 1}):`, err)
        attempt += 1
        if (attempt >= MAX_RETRIES) {
          // show fallback silently
          if (myId === requestIdRef.current) {
            setQuote(FALLBACK_QUOTE)
            setLoading(false)
          }
          return
        }
        const waitMs = RETRY_BASE_MS * Math.pow(2, attempt - 1)
        await new Promise(res => setTimeout(res, waitMs))
      }
    }
  }
  useEffect(() => {
    fetchQuote()
    const t = setInterval(fetchQuote, 20000)
    return () => {
      clearInterval(t)
      if (abortRef.current) abortRef.current.abort()
    }
  }, [])

  return (
    <div className="quotes text-center p-4">
      {loading && <div className="muted text-slate-500">Loading...</div>}

      {quote && (
        <blockquote className="italic text-lg text-slate-800 mt-2">
          “{quote.content}”
          <footer className="mt-2 text-slate-600">— {quote.author}</footer>
        </blockquote>
      )}

      <div className="quote-actions mt-4">
        <button
          className="btn small px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition"
          onClick={fetchQuote}
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? 'Loading…' : 'New Quote'}
        </button>
      </div>
    </div>
  )
}
