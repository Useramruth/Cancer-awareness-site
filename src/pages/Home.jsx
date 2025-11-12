import React from 'react'
import Banner from '../components/Banner'
import Features from '../components/Features'
import Quotes from '../components/Quotes'
import ContactForm from '../components/ContactForm'

export default function Home() {
  return (
    <>
      {/* Hero / Banner — give it id="home" so footer link can jump here */}
      <section id="home" aria-label="Home" className="pt-6">
        <Banner />
      </section>

      {/* Intro / Features */}
      <section id="learn" aria-label="Learn" className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <h2 className="text-3xl font-bold">Learn & Get Involved</h2>
          <p className="text-slate-600 mt-3">Read resources, stories and find ways to support the community.</p>
        </div>
        <Features />
      </section>

      {/* Quotes */}
      <section aria-label="Words of Hope" className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Words of Hope</h2>
          <Quotes />
        </div>
      </section>

      {/* Contact (footer link points here) */}
      <section id="contact" aria-label="Contact" className="container mx-auto px-6 py-12 bg-transparent">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-center">Contact & Support</h2>
          <ContactForm />
        </div>
      </section>
    </>
  )
}
