import { Link } from 'react-router-dom'
import { MapPin, Phone, MessageCircle, Share2, ArrowLeft } from 'lucide-react'

export default function Contact() {
  return (
    <main style={{ paddingBottom: '60px' }}>
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
          
          {/* Office Location Card */}
          <div className="contact-card">
            <div className="contact-card-icon"><MapPin size={22} /></div>
            <div>
              <h4>Our Office</h4>
              <p>Kakalika Plaza, Spintex Road<br />Accra, Ghana</p>
            </div>
          </div>
          
          {/* Phone Card */}
          <div className="contact-card">
            <div className="contact-card-icon"><Phone size={22} /></div>
            <div>
              <h4>Phone</h4>
              <p><a href="tel:+233505814053">+233 50 581 4053</a></p>
            </div>
          </div>
          
          {/* WhatsApp Card */}
          <a href="https://wa.me/233505814053" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
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
          
          {/* Social Follow Card */}
          <div className="contact-card">
            <div className="contact-card-icon"><Share2 size={22} /></div>
            <div>
              <h4>Follow Us</h4>
              <p style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <a href="https://www.facebook.com/Bismarck.Tee?mibextid=LQQJ4d" target="_blank" rel="noopener noreferrer">Facebook</a> ·{' '}
                <a href="https://www.instagram.com/mactee_homes" target="_blank" rel="noopener noreferrer">Instagram</a> ·{' '}
                <a href="https://www.tiktok.com/@macteehomes" target="_blank" rel="noopener noreferrer">TikTok</a>
              </p>
            </div>
          </div>

        </div>

        {/* Contact Form */}
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

      {/* Embedded Location Map Section */}
      <section style={{ maxWidth: '1100px', margin: '60px auto 0', padding: '0 5%' }}>
        <h3 style={{ fontSize: '1.5rem', color: 'var(--navy)', marginBottom: '20px', fontFamily: 'Playfair Display, Georgia, serif', fontWeight: 600 }}>
          Find Us Here
        </h3>
        <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-md)', border: '4px solid #fff' }}>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.435773663189!2d-0.14366668573678532!3d5.625805595921616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x11e7a0df470a1a0f%3A0xe9f79e51e70d740a!2sKakalika%20Plaza%2C%20Accra!5e0!3m2!1sen!2sgh!4v1655000000000!5m2!1sen!2sgh" 
            width="100%" 
            height="380" 
            style={{ border: 0, display: 'block' }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Mactee Homes Location Map"
          ></iframe>
        </div>
      </section>
    </main>
  )
}
