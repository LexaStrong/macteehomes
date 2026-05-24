import { Shield, Heart, Eye, Users } from 'lucide-react'

export default function About() {
  return (
    <main>
      <section className="about-hero">
        <h1>About Mactee Homes</h1>
        <p>Your trusted partner for luxury, fully furnished properties across Ghana. Your comfort, our priority.</p>
      </section>

      <section className="about-content">
        <h2>Who We Are</h2>
        <p>
          Mactee Homes is a premier real estate agency based at Kakalika Plaza, Spintex Road, Accra, Ghana.
          We specialize in acquiring the best properties in Ghana — from luxury villas to fully furnished
          apartments — all at affordable prices.
        </p>
        <p>
          Our mission is simple: to make finding your dream home effortless. Whether you're looking for a
          cozy apartment or a sprawling estate, we've got the perfect property waiting for you.
        </p>

        <h2>Our Values</h2>
        <div className="values-grid">
          <div className="value-card">
            <div className="value-card-icon"><Shield size={24} /></div>
            <h3>Trust & Transparency</h3>
            <p>Every property is verified and every deal is conducted with complete transparency.</p>
          </div>
          <div className="value-card">
            <div className="value-card-icon"><Heart size={24} /></div>
            <h3>Client Comfort</h3>
            <p>Your comfort is our top priority — from the first viewing to handing over the keys.</p>
          </div>
          <div className="value-card">
            <div className="value-card-icon"><Eye size={24} /></div>
            <h3>Quality First</h3>
            <p>We only list properties that meet our rigorous standards for quality and luxury.</p>
          </div>
          <div className="value-card">
            <div className="value-card-icon"><Users size={24} /></div>
            <h3>Community Focused</h3>
            <p>Building lasting relationships with our clients and the communities we serve.</p>
          </div>
        </div>

        <h2>Visit Us</h2>
        <p>
          📍 Kakalika Plaza, Spintex Road, Accra, Ghana<br />
          We'd love to meet you in person. Walk in anytime or reach out through our social channels.
        </p>
      </section>
    </main>
  )
}
