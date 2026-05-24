import { useState, useEffect, useRef } from 'react'
import { Search, MapPin, Home as HomeIcon, DollarSign, Bed, Bath, Maximize, Heart, ChevronRight, Shield, Clock, Star, Building } from 'lucide-react'
import { getListings } from '../utils/listingsStore'

function PropertyCard({ p }) {
  // Gracefully handle formatting
  const formattedPrice = () => {
    const raw = String(p.price || '').replace(/[₵\s,]/g, '')
    const num = parseFloat(raw)
    if (!isNaN(num)) {
      return `₵ ${num.toLocaleString()}`
    }
    return `₵ ${p.price}`
  }

  return (
    <div className="property-card" id={`property-${p.id}`}>
      <div className="property-img">
        <img src={p.img} alt={p.name} loading="lazy" />
        <span className="property-tag">{p.tag || 'Featured'}</span>
        <button className="property-fav" aria-label="Save property">
          <Heart size={16} />
        </button>
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

export default function Home() {
  const [properties, setProperties] = useState([])
  const [activeDot, setActiveDot] = useState(0)
  const observerRef = useRef(null)

  useEffect(() => {
    setProperties(getListings())

    const handleUpdate = () => {
      setProperties(getListings())
    }
    window.addEventListener('mactee_listings_updated', handleUpdate)

    const els = document.querySelectorAll('.fade-in')
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.15 })
    els.forEach(el => observerRef.current.observe(el))

    return () => {
      window.removeEventListener('mactee_listings_updated', handleUpdate)
      observerRef.current?.disconnect()
    }
  }, [])

  return (
    <main>
      {/* HERO */}
      <section className="hero" id="hero">
        <div className="hero-content">
          <div className="hero-badge">🇬🇭 Premium Ghana Properties</div>
          <h1>Finding Your <em>Dream Home</em> Is Simple</h1>
          <p className="hero-subtitle">
            Acquire the best properties in Ghana. Luxury & fully furnished apartments at affordable prices. Your comfort, our priority.
          </p>
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
            <img
              src="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&q=80"
              alt="Modern luxury home"
            />
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
            <p>
              At Mactee Homes, we've streamlined the property search process so you can find your dream home in Ghana without the usual hassle.
            </p>
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
                  <h4>Luxury & Fully Furnished</h4>
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
