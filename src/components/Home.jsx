import { useState, useEffect, useRef } from 'react'
import { Search, MapPin, Bed, Bath, Maximize, Heart, Shield, Clock, Star, Building,
         Phone, MessageCircle, Share2, X, DollarSign } from 'lucide-react'
import { getListings } from '../utils/listingsStore'

/* ── Contact Modal ─────────────────────────────────────────────── */
function ContactModal({ onClose }) {
  // Close on backdrop click
  const handleBackdrop = (e) => { if (e.target === e.currentTarget) onClose() }
  // Prevent body scroll while open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <div className="modal-backdrop" onClick={handleBackdrop} role="dialog" aria-modal="true" aria-label="Contact Us">
      <div className="modal-sheet">

        {/* Header */}
        <div className="modal-header">
          <div>
            <p className="modal-label">We'd love to hear from you</p>
            <h2 className="modal-title">Get In Touch</h2>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Close contact modal">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">

          {/* Contact cards row */}
          <div className="modal-cards">
            <div className="modal-card">
              <div className="modal-card-icon"><MapPin size={18} /></div>
              <div>
                <h4>Our Office</h4>
                <p>Kakalika Plaza, Spintex Road<br />Accra, Ghana</p>
              </div>
            </div>

            <a href="https://wa.me/233505814053" target="_blank" rel="noopener noreferrer" className="modal-card modal-card-wa">
              <div className="modal-card-icon modal-card-icon-wa"><MessageCircle size={18} /></div>
              <div>
                <h4>WhatsApp</h4>
                <p>Chat with us now →</p>
              </div>
            </a>

            <div className="modal-card">
              <div className="modal-card-icon"><Phone size={18} /></div>
              <div>
                <h4>Phone</h4>
                <p><a href="tel:+233505814053">+233 50 581 4053</a></p>
              </div>
            </div>

            <div className="modal-card">
              <div className="modal-card-icon"><Share2 size={18} /></div>
              <div>
                <h4>Follow Us</h4>
                <p style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  <a href="https://www.facebook.com/Bismarck.Tee?mibextid=LQQJ4d" target="_blank" rel="noopener noreferrer">Facebook</a>
                  <span style={{ color: 'var(--text-light)' }}>·</span>
                  <a href="https://www.instagram.com/mactee_homes" target="_blank" rel="noopener noreferrer">Instagram</a>
                  <span style={{ color: 'var(--text-light)' }}>·</span>
                  <a href="https://www.tiktok.com/@macteehomes" target="_blank" rel="noopener noreferrer">TikTok</a>
                </p>
              </div>
            </div>
          </div>

          {/* Message form */}
          <form
            className="modal-form"
            onSubmit={(e) => { e.preventDefault(); alert('Thank you! We will get back to you soon.'); onClose() }}
          >
            <div className="modal-form-row">
              <div className="form-group">
                <label htmlFor="modal-name">Full Name</label>
                <input id="modal-name" type="text" placeholder="Your name" required />
              </div>
              <div className="form-group">
                <label htmlFor="modal-email">Email Address</label>
                <input id="modal-email" type="email" placeholder="Your email" required />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="modal-phone">Phone Number</label>
              <input id="modal-phone" type="tel" placeholder="+233..." />
            </div>
            <div className="form-group">
              <label htmlFor="modal-message">Message</label>
              <textarea id="modal-message" rows="4" placeholder="Tell us about the property you're looking for..." required />
            </div>
            <button type="submit" className="submit-btn" style={{ width: '100%' }}>Send Message</button>
          </form>

          {/* Map */}
          <div className="modal-map-wrap">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.435773663189!2d-0.14366668573678532!3d5.625805595921616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x11e7a0df470a1a0f%3A0xe9f79e51e70d740a!2sKakalika%20Plaza%2C%20Accra!5e0!3m2!1sen!2sgh!4v1655000000000!5m2!1sen!2sgh"
              width="100%"
              height="240"
              style={{ border: 0, display: 'block' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mactee Homes Location Map"
            />
          </div>

        </div>
      </div>
    </div>
  )
}

/* ── Property Card ─────────────────────────────────────────────── */
function PropertyCard({ p }) {
  const formattedPrice = () => {
    const raw = String(p.price || '').replace(/[₵\s,]/g, '')
    const num = parseFloat(raw)
    return isNaN(num) ? `₵ ${p.price}` : `₵ ${num.toLocaleString()}`
  }

  return (
    <div className="property-card" id={`property-${p.id}`}>
      <div className="property-img">
        <img src={p.img} alt={p.name} loading="lazy" />
        <span className="property-tag">{p.tag || 'Featured'}</span>
        <button className="property-fav" aria-label="Save property"><Heart size={16} /></button>
      </div>
      <div className="property-info">
        <h3 className="property-name">{p.name}</h3>
        <p className="property-location"><MapPin size={14} /> {p.location}</p>
        <p className="property-price">{formattedPrice()}</p>
        <div className="property-amenities">
          <span className="amenity"><Bed size={16} /> {p.beds} Beds</span>
          <span className="amenity"><Bath size={16} /> {p.baths} Baths</span>
          <span className="amenity"><Maximize size={16} /> {p.sqft} sqft</span>
        </div>
      </div>
    </div>
  )
}

/* ── Home Page ─────────────────────────────────────────────────── */
export default function Home() {
  const [properties, setProperties] = useState([])
  const [activeDot, setActiveDot] = useState(0)
  const [contactOpen, setContactOpen] = useState(false)
  const observerRef = useRef(null)

  useEffect(() => {
    setProperties(getListings())
    const handleUpdate = () => setProperties(getListings())
    window.addEventListener('mactee_listings_updated', handleUpdate)

    const els = document.querySelectorAll('.fade-in')
    observerRef.current = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.15 }
    )
    els.forEach(el => observerRef.current.observe(el))

    return () => {
      window.removeEventListener('mactee_listings_updated', handleUpdate)
      observerRef.current?.disconnect()
    }
  }, [])

  return (
    <main>
      {/* Contact Modal */}
      {contactOpen && <ContactModal onClose={() => setContactOpen(false)} />}

      {/* HERO */}
      <section className="hero" id="hero">
        <div className="hero-content">
          <div className="hero-badge">🇬🇭 Premium Ghana Properties</div>
          <h1>Finding Your <em>Dream Home</em> Is Simple</h1>
          <p className="hero-subtitle">
            Acquire the best properties in Ghana. Luxury &amp; fully furnished apartments at affordable prices. Your comfort, our priority.
          </p>
          <div className="hero-ctas">
            <a href="#featured" className="hero-cta-primary">View More</a>
            <button
              className="hero-cta-secondary"
              onClick={() => setContactOpen(true)}
              id="hero-contact-btn"
            >
              Contact Us
            </button>
          </div>
          <div className="search-panel" id="search-panel">
            <div className="search-field">
              <label htmlFor="search-location">Location</label>
              <select id="search-location">
                <option>Accra, Ghana</option>
                <option>Kumasi, Ghana</option>
                <option>Tema, Ghana</option>
                <option>Spintex Road</option>
              </select>
            </div>
            <div className="search-field">
              <label htmlFor="search-type">Property Type</label>
              <select id="search-type">
                <option>All Types</option>
                <option>Villa</option>
                <option>Apartment</option>
                <option>Penthouse</option>
                <option>Cottage</option>
              </select>
            </div>
            <div className="search-field">
              <label htmlFor="search-price">Price Range</label>
              <select id="search-price">
                <option>Any Price</option>
                <option>Under ₵ 500,000</option>
                <option>₵ 500,000 - ₵ 800,000</option>
                <option>₵ 800,000 - ₵ 1,200,000</option>
                <option>Above ₵ 1,200,000</option>
              </select>
            </div>
            <button className="search-btn" id="search-btn" aria-label="Search properties">
              <Search size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* FEATURED PROPERTIES */}
      <section className="section" id="featured" style={{ background: 'var(--bg-cream)' }}>
        <div className="section-header fade-in">
          <span className="section-label">Our Properties</span>
          <h2 className="section-title">Most Viewed Listings</h2>
          <p className="section-desc">
            Discover our handpicked selection of premium properties across Ghana, from luxury villas to modern apartments.
          </p>
        </div>
        <div className="properties-grid fade-in">
          {properties.map(p => <PropertyCard key={p.id} p={p} />)}
        </div>
        <div className="carousel-dots">
          {[0, 1, 2].map(i => (
            <button
              key={i}
              className={`carousel-dot${activeDot === i ? ' active' : ''}`}
              onClick={() => setActiveDot(i)}
              aria-label={`Page ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* EASIEST METHOD */}
      <section className="easiest" id="easiest">
        <div className="easiest-inner">
          <div className="easiest-image fade-in">
            <img src="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&q=80" alt="Modern luxury home" />
            <div className="easiest-badge">
              <div className="easiest-badge-icon"><Building size={22} /></div>
              <div className="easiest-badge-text">
                <span>200+</span>
                <small>Properties Listed</small>
              </div>
            </div>
          </div>
          <div className="easiest-content fade-in">
            <span className="section-label">Why Choose Us</span>
            <h2>The Easiest Method To Find Your Perfect Home</h2>
            <p>At Mactee Homes, we've streamlined the property search process so you can find your dream home in Ghana without the usual hassle.</p>
            <div className="feature-list">
              <div className="feature-item">
                <div className="feature-icon"><Shield size={20} /></div>
                <div className="feature-text">
                  <h4>Verified Properties</h4>
                  <p>Every listing is personally verified by our team for authenticity.</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon"><DollarSign size={20} /></div>
                <div className="feature-text">
                  <h4>Affordable Pricing</h4>
                  <p>Premium homes at prices that won't break the bank.</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon"><Clock size={20} /></div>
                <div className="feature-text">
                  <h4>24/7 Support</h4>
                  <p>Our dedicated team is always ready to assist you.</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon"><Star size={20} /></div>
                <div className="feature-text">
                  <h4>Luxury &amp; Fully Furnished</h4>
                  <p>Move-in ready apartments with premium furnishings.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats" id="stats">
        <div className="stats-grid fade-in">
          <div className="stat-item">
            <div className="stat-number">200+</div>
            <div className="stat-label">Properties Listed</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">150+</div>
            <div className="stat-label">Happy Clients</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">10+</div>
            <div className="stat-label">Years Experience</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">5⭐</div>
            <div className="stat-label">Client Rating</div>
          </div>
        </div>
      </section>
    </main>
  )
}
