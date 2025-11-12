import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { signup } from '../lib/auth'
function passwordStrength(pw = '') {
  let score = 0
  if (pw.length >= 8) score += 2
  else if (pw.length >= 5) score += 1
  if (/[a-z]/.test(pw)) score += 1
  if (/[A-Z]/.test(pw)) score += 1
  if (/[0-9]/.test(pw)) score += 1
  if (/[^A-Za-z0-9]/.test(pw)) score += 1
  const label = score >= 5 ? 'Strong' : score >= 3 ? 'Medium' : 'Weak'
  const pct = Math.min(100, Math.round((score / 6) * 100))
  return { score, label, pct }
}
export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showPass, setShowPass] = useState(false)
  const navigate = useNavigate()

  const strength = useMemo(() => passwordStrength(form.password), [form.password])

  function onChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  async function onSubmit(e) {
    e.preventDefault()
    setError(null)

    if (!form.name.trim()) return setError('Enter your name')
    if (!form.email.trim()) return setError('Enter your email')
    if (form.password.length < 6) return setError('Password must be at least 6 characters')
    if (form.password !== form.confirm) return setError('Passwords do not match')

    setLoading(true)
    try {
      await signup({ name: form.name.trim(), email: form.email.trim(), password: form.password })
      navigate('/') // auto-logged in
    } catch (err) {
      setError(err.message || 'Sign up failed')
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="min-h-[60vh] flex items-center justify-center py-16">
      <div className="w-full max-w-md card">
        <h3 className="text-2xl font-semibold mb-4">Create an account</h3>
        <form onSubmit={onSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium">Full name</span>
            <input name="name" value={form.name} onChange={onChange} className="mt-1 block w-full rounded-lg border px-3 py-2" required />
          </label>

          <label className="block">
            <span className="text-sm font-medium">Email</span>
            <input name="email" type="email" value={form.email} onChange={onChange} className="mt-1 block w-full rounded-lg border px-3 py-2" required />
          </label>

          <label className="block">
            <span className="text-sm font-medium">Password</span>
            <div className="relative mt-1">
              <input
                name="password"
                type={showPass ? 'text' : 'password'}
                value={form.password}
                onChange={onChange}
                className="block w-full rounded-lg border px-3 py-2 pr-12"
                required
              />
              <button type="button" onClick={() => setShowPass(v => !v)} className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-slate-500">
                {showPass ? 'Hide' : 'Show'}
              </button>
            </div>

            {/* strength meter */}
            <div className="mt-2 flex items-center gap-3">
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div style={{ width: `${strength.pct}%` }} className={`h-2 rounded-full ${strength.pct >= 66 ? 'bg-green-500' : strength.pct >= 33 ? 'bg-yellow-400' : 'bg-red-500'}`} />
              </div>
              <div className="text-sm text-slate-600 w-20 text-right">{strength.label}</div>
            </div>
          </label>

          <label className="block">
            <span className="text-sm font-medium">Confirm password</span>
            <input name="confirm" type={showPass ? 'text' : 'password'} value={form.confirm} onChange={onChange} className="mt-1 block w-full rounded-lg border px-3 py-2" required />
          </label>

          {error && <div className="text-sm text-red-600">{error}</div>}

          <div className="flex items-center justify-between">
            <button type="submit" className="btn-primary" disabled={loading}>{loading ? 'Creating...' : 'Sign up'}</button>
            <button type="button" className="text-sm text-slate-600" onClick={() => navigate('/login')}>Already have an account?</button>
          </div>
        </form>
      </div>
    </div>
  )
}
