import React from 'react'

function IconButton({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/80 text-slate-600 shadow-sm
                 hover:text-white hover:bg-brand-500 transform hover:-translate-y-1 transition-all duration-200
                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-200"
    >
      {children}
    </a>
  )
}

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-12">
      <div className="container mx-auto px-6 py-10 grid md:grid-cols-3 gap-6">
        <div>
          <div className="font-bold text-lg">Cancer Awareness</div>
          <p className="text-sm text-slate-600 mt-2">Support, resources and community.</p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Quick links</h4>
          <ul className="text-sm text-slate-600 space-y-1">
            <li>
              <a href="#home" className="hover:text-brand-600 transition-colors">Home</a>
            </li>
            <li>
              <a href="#contact" className="hover:text-brand-600 transition-colors">Contact</a>
            </li>
            <li>
              <a href="#learn" className="hover:text-brand-600 transition-colors">Learn</a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Follow</h4>
          <div className="flex gap-3 items-center">
            {/* Twitter */}
            <IconButton href="https://twitter.com" label="Twitter">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M22 5.92c-.66.3-1.36.5-2.1.6a3.6 3.6 0 0 0 1.6-2 7.22 7.22 0 0 1-2.3.9 3.56 3.56 0 0 0-6.1 3.25A10.12 10.12 0 0 1 3.15 4.9a3.56 3.56 0 0 0 1.1 4.75c-.55-.02-1.07-.16-1.52-.4v.04a3.56 3.56 0 0 0 2.85 3.48c-.4.11-.83.14-1.25.05.36 1.12 1.4 1.93 2.64 1.96A7.13 7.13 0 0 1 2 19.54 10.07 10.07 0 0 0 7.1 21c6.8 0 10.53-5.64 10.53-10.53v-.48c.72-.52 1.28-1.17 1.77-1.9-.66.29-1.36.48-2.1.57z"/>
              </svg>
            </IconButton>

            {/* Facebook */}
            <IconButton href="https://facebook.com" label="Facebook">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M22 12.07C22 6.48 17.52 2 12 2S2 6.48 2 12.07c0 4.99 3.66 9.13 8.44 9.95v-7.05H7.9v-2.9h2.54V9.41c0-2.5 1.5-3.88 3.78-3.88 1.1 0 2.25.2 2.25.2v2.48h-1.27c-1.25 0-1.64.78-1.64 1.58v1.9h2.8l-.45 2.9h-2.35v7.05C18.34 21.2 22 17.06 22 12.07z"/>
              </svg>
            </IconButton>

            {/* Instagram */}
            <IconButton href="https://instagram.com" label="Instagram">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 6.15A3.85 3.85 0 1 0 15.85 12 3.85 3.85 0 0 0 12 8.15zM18.6 6.2a1.1 1.1 0 1 0 1.1 1.1 1.1 1.1 0 0 0-1.1-1.1zM12 9.5A2.5 2.5 0 1 1 9.5 12 2.5 2.5 0 0 1 12 9.5z"/>
              </svg>
            </IconButton>

            {/* LinkedIn */}
            <IconButton href="https://linkedin.com" label="LinkedIn">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M20.45 20.45h-3.6v-5.4c0-1.29-.02-2.96-1.8-2.96-1.8 0-2.07 1.4-2.07 2.86v5.5h-3.6V9h3.46v1.56h.05c.48-.9 1.66-1.85 3.42-1.85 3.66 0 4.34 2.41 4.34 5.54v6.7zM5.34 7.43a2.09 2.09 0 1 1 0-4.18 2.09 2.09 0 0 1 0 4.18zM7.14 20.45H3.54V9h3.6v11.45z"/>
              </svg>
            </IconButton>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-slate-500 py-4 border-t">
        Copyright © {new Date().getFullYear()} by Amruth. All rights reserved.
      </div>
    </footer>
  )
}
