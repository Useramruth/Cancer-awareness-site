import React, { useEffect, useState, useRef } from 'react'
import { getSession } from '../lib/auth'

export default function Profile(){
  const session = getSession()
  const [name, setName] = useState(session?.user?.name || '')
  const [email] = useState(session?.user?.email || '')
  const [avatar, setAvatar] = useState(session?.user?.avatar || null)
  const [saved, setSaved] = useState(false)
  const fileRef = useRef(null)

  useEffect(() => {
    setName(session?.user?.name || '')
    setAvatar(session?.user?.avatar || null)
  }, [session?.user?.name, session?.user?.avatar])

  function _saveUsersArray(users){
    localStorage.setItem('ca_users', JSON.stringify(users))
  }

  function saveProfile() {
    try {
      const users = JSON.parse(localStorage.getItem('ca_users') || '[]')
      const idx = users.findIndex(u => u.email === email)
      if (idx >= 0) {
        users[idx].name = name
        users[idx].avatar = avatar || users[idx].avatar || null
        _saveUsersArray(users)
        // update session display by re-writing session (keeps same token)
        const sess = JSON.parse(localStorage.getItem('ca_session') || '{}') || {}
        localStorage.setItem('ca_session', JSON.stringify({ ...sess, email }))
        window.dispatchEvent(new Event('storage'))
        setSaved(true)
        setTimeout(()=>setSaved(false), 2500)
      }
    } catch (e) {
      console.error(e)
    }
  }

  function handleFile(e) {
    const file = e.target.files && e.target.files[0]
    if (!file) return
    const allowed = ['image/png', 'image/jpeg', 'image/webp']
    if (!allowed.includes(file.type)) {
      alert('Please select a PNG, JPG or WEBP image.')
      return
    }
    const reader = new FileReader()
    reader.onload = function(ev) {
      setAvatar(ev.target.result) 
    }
    reader.readAsDataURL(file)
  }

  function removeAvatar() {
    setAvatar(null)
    // also remove from stored users
    try {
      const users = JSON.parse(localStorage.getItem('ca_users') || '[]')
      const idx = users.findIndex(u => u.email === email)
      if (idx >= 0) {
        delete users[idx].avatar
        _saveUsersArray(users)
        const sess = JSON.parse(localStorage.getItem('ca_session') || '{}') || {}
        localStorage.setItem('ca_session', JSON.stringify({ ...sess, email }))
        window.dispatchEvent(new Event('storage'))
        setSaved(true)
        setTimeout(()=>setSaved(false), 2000)
      }
    } catch (e) {
      console.error(e)
    }
  }

  if (!session) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="card max-w-md">Please login to view your profile.</div>
      </div>
    )
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center py-12">
      <div className="w-full max-w-lg card space-y-6">
        <h3 className="text-2xl font-semibold mb-2">Your Profile</h3>

        <div className="flex items-center gap-4">
          {avatar ? (
            <img src={avatar} alt={name} className="w-20 h-20 rounded-full object-cover border" />
          ) : (
            <div className="w-20 h-20 rounded-full bg-brand-500 text-white flex items-center justify-center font-medium text-xl">
              { (name || 'U').split(' ').map(s => s[0]).slice(0,2).join('').toUpperCase() }
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label className="text-sm text-slate-600">Change photo</label>
            <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} />
            <div className="flex gap-2">
              <button onClick={() => fileRef.current && fileRef.current.click()} className="px-3 py-1 rounded-md border">Upload</button>
              <button onClick={removeAvatar} className="px-3 py-1 rounded-md border">Remove</button>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <div className="mt-1 text-slate-700">{email}</div>
        </div>

        <div>
          <label className="block text-sm font-medium">Full name</label>
          <input value={name} onChange={e=>setName(e.target.value)} className="mt-1 block w-full rounded-lg border px-3 py-2" />
        </div>

        <div className="flex items-center gap-3">
          <button onClick={saveProfile} className="btn-primary">Save changes</button>
          {saved && <div className="text-green-600">Saved.</div>}
        </div>
      </div>
    </div>
  )
}
