import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { MenuIcon, XIcon } from './icons'
import { getSession, signout } from '../lib/auth'

function Avatar({ name, avatar }) {
  if (avatar) {
    // avatar is expected as base64 data URL like "data:image/png;base64,...."
    return (
      <img
        src={avatar}
        alt={name}
        className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm"
      />
    )
  }
  const initials = (name || 'U').split(' ').map(s => s[0]).slice(0, 2).join('').toUpperCase()
  return (
    <div className="w-9 h-9 rounded-full bg-brand-500 text-white flex items-center justify-center font-medium">
      {initials}
    </div>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const loc = useLocation()
  const navigate = useNavigate()
  const [session, setSession] = useState(null)

  useEffect(() => {
    setSession(getSession())
    function refreshSession() {
      setSession(getSession())
    }
    window.addEventListener('storage', refreshSession)
    window.addEventListener('sessionChange', refreshSession)
    return () => {
      window.removeEventListener('storage', refreshSession)
      window.removeEventListener('sessionChange', refreshSession)
    }
  }, [])
  function handleLogout() {
    signout()
    setSession(null)
    navigate('/')
  }

  return (
    <header className="bg-white/60 backdrop-blur sticky top-0 z-40 shadow-sm">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-brand-500 flex items-center justify-center text-white font-bold">CA</div>
          <div>
            <div className="font-semibold">Cancer Awareness</div>
            <div className="text-xs text-slate-500">Support & Resources</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className={`hover:text-brand-600 ${loc.pathname === '/' ? 'text-brand-600 font-medium' : 'text-slate-700'}`}>Home</Link>
          <a href="#contact" className="text-slate-700 hover:text-brand-600">Contact</a>

          {session ? (
            <>
              <Link to="/profile" className="flex items-center gap-3">
                <Avatar name={session.user.name} avatar={session.user.avatar} />
                <span className="text-sm text-slate-700">Hello, {session.user.name.split(' ')[0]}</span>
              </Link>
              <button onClick={handleLogout} className="px-3 py-1 rounded-md border">Logout</button>
            </>
          ) : (
            <Link to="/login" className="btn-primary">Login</Link>
          )}
        </nav>

        {/* mobile */}
        <div className="md:hidden">
          <button onClick={() => setOpen(v => !v)} className="p-2 rounded-md focus:outline-none ring-1 ring-slate-200">
            {open ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white shadow-sm">
          <div className="px-6 py-4 flex flex-col gap-3">
            <Link to="/" onClick={() => setOpen(false)} className="py-2">Home</Link>
            <a href="#contact" onClick={() => setOpen(false)} className="py-2">Contact</a>
            {session ? (
              <>
                <Link to="/profile" onClick={() => setOpen(false)} className="py-2">Profile</Link>
                <button onClick={() => { setOpen(false); handleLogout(); }} className="py-2 text-left">Logout</button>
              </>
            ) : (
              <Link to="/login" onClick={() => setOpen(false)} className="py-2">Login</Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
