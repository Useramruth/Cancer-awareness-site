import React, { useState } from 'react'
import { motion } from 'framer-motion'

export default function Banner() {
  const externalUrl =
    'https://marketplace.canva.com/EAGVQcTw2Jo/1/0/1131w/canva-orange-and-pink-gradient-minimalist-cancer-awareness-poster-uq9iTx_nzCI.jpg'
  const fallback = '/banner.jpg'
  const [src, setSrc] = useState(externalUrl)

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-rose-50 to-slate-50 py-10 md:py-16">
      <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-8">

        {/* Left text section */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:w-1/2"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-slate-900">
            Hope. Awareness. Support.
          </h1>
          <p className="mt-4 text-base md:text-lg text-slate-700 max-w-md">
            Resources and a warm community for patients, survivors, and caregivers.
            Join us in raising awareness.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="#contact" className="btn-primary">Get Support</a>
            <a
              href="#learn"
              className="px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-100 transition"
            >
              Learn more
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55 }}
          className="lg:w-1/2 w-full flex justify-center lg:justify-end"
        >
          <motion.div
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="w-[82%] sm:w-[70%] md:w-[58%] lg:w-[62%] rounded-2xl shadow-md overflow-hidden"
          >
            <img
              src={src}
              alt="Cancer awareness banner"
              loading="lazy"
              onError={() => { if (src !== fallback) setSrc(fallback) }}
              className="w-full h-64 sm:h-72 md:h-80 object-cover block"
              style={{ objectPosition: '20% 20%' }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}