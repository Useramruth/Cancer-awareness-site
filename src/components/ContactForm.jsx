import React, { useState } from 'react'
function csvEscape(value) {
  if (value == null) return ''
  const s = String(value)
  // if contains quote/comma/newline, wrap in quotes and double internal quotes
  if (/["\r\n,]/.test(s)) {
    return `"${s.replace(/"/g, '""')}"`
  }
  return s
}
/* Save a new message to localStorage under 'messages' (keeps previous behavior) */
function saveMessage(msg) {
  const cur = JSON.parse(localStorage.getItem('messages') || '[]')
  cur.push(msg)
  localStorage.setItem('messages', JSON.stringify(cur))
}

function downloadCsv(filename, headers, rows) {
  const BOM = '\uFEFF'
  const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n')
  const blob = new Blob([BOM + csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

function exportMessagesCSV() {
  const messages = JSON.parse(localStorage.getItem('messages') || '[]')
  if (!messages.length) {
    alert('No messages to export.')
    return
  }

  const now = new Date()
  const ts = now.toISOString().replace(/[:.]/g, '-')
  const filename = `messages_${ts}_${messages.length}.csv`

  const headers = ['Name', 'Email', 'Message', 'Date']
  const rows = messages.map(m => [
    csvEscape(m.name),
    csvEscape(m.email),
    csvEscape(m.message),
    csvEscape(m.date || '')
  ])

  downloadCsv(filename, headers, rows)
}

/* Export all registered users (ca_users) to CSV */
function exportUsersCSV() {
  const users = JSON.parse(localStorage.getItem('ca_users') || '[]')
  if (!users.length) {
    alert('No users to export.')
    return
  }

  const now = new Date()
  const ts = now.toISOString().replace(/[:.]/g, '-')
  const filename = `users_${ts}_${users.length}.csv`

  const headers = ['Name', 'Email', 'AvatarPresent', 'CreatedAt']
  const rows = users.map(u => [
    csvEscape(u.name),
    csvEscape(u.email),
    csvEscape(Boolean(u.avatar)),
    csvEscape(u.createdAt || '')
  ])

  downloadCsv(filename, headers, rows)
}

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  function onChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  function onSubmit(e) {
    e.preventDefault()
    const item = { ...form, date: new Date().toISOString() }
    saveMessage(item)
    setSubmitted(true)
    setForm({ name: '', email: '', message: '' })
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <form onSubmit={onSubmit} className="space-y-4">
        <label className="block">
          <span className="text-sm font-medium">Name</span>
          <input name="name" required value={form.name} onChange={onChange} className="mt-1 block w-full rounded-lg border px-3 py-2" />
        </label>
        <label className="block">
          <span className="text-sm font-medium">Email</span>
          <input name="email" type="email" required value={form.email} onChange={onChange} className="mt-1 block w-full rounded-lg border px-3 py-2" />
        </label>
        <label className="block">
          <span className="text-sm font-medium">Message</span>
          <textarea name="message" rows={6} required value={form.message} onChange={onChange} className="mt-1 block w-full rounded-lg border px-3 py-2" />
        </label>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <button type="submit" className="btn-primary">Send Message</button>
          <div className="flex gap-3 mt-2 sm:mt-0">
            <button
              type="button"
              onClick={exportMessagesCSV}
              className="px-4 py-2 rounded-lg border hover:bg-slate-50 transition"
              aria-label="Export all messages as CSV"
            >
              Export Messages CSV
            </button>

            <button
              type="button"
              onClick={exportUsersCSV}
              className="px-4 py-2 rounded-lg border hover:bg-slate-50 transition"
              aria-label="Export all users as CSV"
            >
              Export Users CSV
            </button>
          </div>
        </div>

        {submitted && <div className="text-sm text-green-700">Thanks — saved locally (demo).</div>}
      </form>

      <aside className="card">
        <h4 className="font-semibold">Contact Info</h4>
        <p className="mt-2 text-sm text-slate-600">Email: support@example.org</p>
        <p className="mt-1 text-sm text-slate-600">Phone: +1 (555) 123-4567</p>
        <div className="mt-4">
          <h5 className="font-medium">Office</h5>
          <p className="text-sm text-slate-500">Open Mon–Fri, 9AM–5PM</p>
        </div>
      </aside>
    </div>
  )
}
