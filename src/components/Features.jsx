import React from 'react'
import { motion } from 'framer-motion'
import { HeartHandshake, Users, BookOpen, HandHeart } from 'lucide-react'

const items = [
  {
    icon: <BookOpen className="w-8 h-8 text-rose-500" />,
    title: 'Resources',
    desc: 'Access guides, awareness materials, and connect with verified local support groups.'
  },
  {
    icon: <Users className="w-8 h-8 text-indigo-500" />,
    title: 'Volunteer',
    desc: 'Join campaigns, participate in events, or spread awareness in your community.'
  },
  {
    icon: <HeartHandshake className="w-8 h-8 text-pink-500" />,
    title: 'Stories',
    desc: 'Read inspiring survivor journeys and share your own story to uplift others.'
  },
  {
    icon: <HandHeart className="w-8 h-8 text-amber-500" />,
    title: 'Donate',
    desc: 'Support research and provide medical help for those fighting cancer.'
  }
]

export default function Features() {
  return (
    <section className="py-16 bg-gradient-to-b from-rose-50 via-white to-slate-50">
      <div className="container mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4"
        >
          What We Offer
        </motion.h2>
        <p className="text-slate-600 max-w-2xl mx-auto mb-10">
          Empowering people through awareness, compassion, and action. Explore how you can get involved or find help.
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          {items.map((it, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-6 bg-white rounded-2xl shadow-md hover:shadow-2xl border border-rose-50 transition-transform transform hover:-translate-y-2 hover:scale-[1.03] relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-700" />
              
              <div className="flex flex-col items-center gap-4">
                {it.icon}
                <h3 className="font-semibold text-lg text-slate-900">{it.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{it.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

