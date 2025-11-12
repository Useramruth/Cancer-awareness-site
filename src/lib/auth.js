async function sha256Hex(str) {
  const encoder = new TextEncoder()
  const data = encoder.encode(str)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

function _loadUsers() {
  try {
    return JSON.parse(localStorage.getItem('ca_users') || '[]')
  } catch {
    return []
  }
}

function _saveUsers(users) {
  localStorage.setItem('ca_users', JSON.stringify(users))
}

function _notifySessionChange() {

  window.dispatchEvent(new Event('sessionChange'))
}

export async function signup({ name, email, password, avatar }) {
  email = (email || '').toLowerCase().trim()
  if (!name || !email || !password) throw new Error('Missing fields')
  const users = _loadUsers()
  const exists = users.find(u => u.email === email)
  if (exists) throw new Error('User already exists')
  const passHash = await sha256Hex(password)
  const newUser = { name, email, passHash, createdAt: new Date().toISOString() }
  if (avatar) newUser.avatar = avatar
  users.push(newUser)
  _saveUsers(users)

  const token = crypto.getRandomValues(new Uint32Array(4)).join('-') + '-' + Date.now()
  localStorage.setItem('ca_session', JSON.stringify({ token, email }))
  _notifySessionChange()
  return { token, user: { name, email, avatar: newUser.avatar } }
}

export async function signin({ email, password }) {
  email = (email || '').toLowerCase().trim()
  if (!email || !password) throw new Error('Missing fields')
  const users = _loadUsers()
  const user = users.find(u => u.email === email)
  if (!user) throw new Error('Invalid credentials')
  const passHash = await sha256Hex(password)
  if (user.passHash !== passHash) throw new Error('Invalid credentials')

  const token = crypto.getRandomValues(new Uint32Array(4)).join('-') + '-' + Date.now()
  localStorage.setItem('ca_session', JSON.stringify({ token, email }))
  _notifySessionChange()
  return { token, user: { name: user.name, email: user.email, avatar: user.avatar } }
}

export function signout() {
  localStorage.removeItem('ca_session')
  _notifySessionChange()
}

export function getSession() {
  try {
    const s = JSON.parse(localStorage.getItem('ca_session') || 'null')
    if (!s || !s.email) return null
    const users = _loadUsers()
    const u = users.find(x => x.email === s.email)
    if (!u) return null
    return { token: s.token, user: { name: u.name, email: u.email, avatar: u.avatar } }
  } catch {
    return null
  }
}
