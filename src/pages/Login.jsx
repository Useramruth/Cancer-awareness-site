import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signin } from '../lib/auth'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [show, setShow] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await signin({ email, password })
      navigate('/')
    } catch (err) {
      setError(err.message || 'Sign in failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center py-16">
      <div className="w-full max-w-md card">
        <h3 className="text-2xl font-semibold mb-4">Sign in</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium">Email</span>
            <input className="mt-1 block w-full rounded-lg border px-3 py-2" type="email" required value={email} onChange={e => setEmail(e.target.value)} />
          </label>

          <label className="block">
            <span className="text-sm font-medium">Password</span>
            <div className="relative mt-1">
              <input className="block w-full rounded-lg border px-3 py-2 pr-12" type={show ? 'text' : 'password'} required value={password} onChange={e => setPassword(e.target.value)} />
              <button type="button" onClick={() => setShow(s => !s)} className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-slate-500">
                {show ? 'Hide' : 'Show'}
              </button>
            </div>
          </label>

          {error && <div className="text-sm text-red-600">{error}</div>}

          <div className="flex items-center justify-between">
            <button className="btn-primary" type="submit" disabled={loading}>{loading ? 'Signing in...' : 'Sign in'}</button>
            <button type="button" className="text-sm text-slate-600" onClick={() => navigate('/signup')}>Create account</button>
          </div>
        </form>
      </div>
    </div>
  )
}
