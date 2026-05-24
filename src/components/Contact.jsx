import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, MessageCircle, ArrowLeft } from 'lucide-react'

export default function Contact() {
  return (
    <main>
      <section className="contact-hero">
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'left', marginBottom: '20px' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.7)', transition: 'var(--transition)', fontWeight: 500 }} onMouseOver={e => e.currentTarget.style.color = '#fff'} onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}>
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </div>
        <h1>Get In Touch</h1>
        <p>Ready to find your dream home? Reach out to us and let's make it happen.</p>
      </section>

      <section className="contact-grid">
        <div className="contact-info-cards">
          <div className="contact-card">
            <div className="contact-card-icon"><MapPin size={22} /></div>
            <div>
              <h4>Our Office</h4>
              <p>Kakalika Plaza, Spintex Road<br />Accra, Ghana</p>
            </div>
          </div>
          <div className="contact-card">
            <div className="contact-card-icon"><Phone size={22} /></div>
            <div>
              <h4>Phone</h4>
              <p><a href="tel:+2330505814053">+233 050 581 4053</a></p>
            </div>
          </div>
          <a href="https://wa.me/+2330505814053" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <div className="contact-card">
              <div className="contact-card-icon" style={{ background: 'rgba(37,211,102,0.1)', color: '#25D366' }}>
                <MessageCircle size={22} />
              </div>
              <div>
                <h4>WhatsApp</h4>
                <p style={{ color: '#25D366', fontWeight: 500 }}>Chat with us now →</p>
              </div>
            </div>
          </a>
          <div className="contact-card">
            <div className="contact-card-icon"><Mail size={22} /></div>
            <div>
              <h4>Follow Us</h4>
              <p>
                <a href="https://www.facebook.com/Bismarck.Tee?mibextid=LQQJ4d" target="_blank" rel="noopener noreferrer">Facebook</a> ·{' '}
                <a href="https://www.instagram.com/mactee_homes" target="_blank" rel="noopener noreferrer">Instagram</a> ·{' '}
                <a href="https://www.tiktok.com/@macteehomes" target="_blank" rel="noopener noreferrer">TikTok</a>
              </p>
            </div>
          </div>
        </div>

        <form className="contact-form" id="contact-form" onSubmit={(e) => { e.preventDefault(); alert('Thank you! We will get back to you soon.'); }}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input id="name" type="text" placeholder="Enter your name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input id="email" type="email" placeholder="Enter your email" required />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input id="phone" type="tel" placeholder="+233..." />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" placeholder="Tell us about the property you're looking for..." required />
          </div>
          <button type="submit" className="submit-btn" id="submit-btn">Send Message</button>
        </form>
      </section>
    </main>
  )
}
