import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Shield, Eye, DollarSign, MapPin, Grid, Check, X, Search, ChevronRight } from 'lucide-react'
import { getListings, addListing, updateListing, deleteListing } from '../utils/listingsStore'

export default function Admin() {
  const [listings, setListings] = useState([])
  const [search, setSearch] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [editId, setEditId] = useState(null)
  
  // Form fields
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [price, setPrice] = useState('')
  const [tag, setTag] = useState('Featured')
  const [beds, setBeds] = useState(3)
  const [baths, setBaths] = useState(2)
  const [sqft, setSqft] = useState('2,000')
  const [img, setImg] = useState('')

  useEffect(() => {
    setListings(getListings())
    const handleUpdate = () => setListings(getListings())
    window.addEventListener('mactee_listings_updated', handleUpdate)
    return () => window.removeEventListener('mactee_listings_updated', handleUpdate)
  }, [])

  const resetForm = () => {
    setIsEditing(false)
    setEditId(null)
    setName('')
    setLocation('')
    setPrice('')
    setTag('Featured')
    setBeds(3)
    setBaths(2)
    setSqft('2,000')
    setImg('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Ensure standard image is provided, if none, use a high quality one
    const defaultImage = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80'
    const finalImg = img.trim() || defaultImage

    const listingData = {
      name,
      location,
      price,
      tag,
      beds: Number(beds),
      baths: Number(baths),
      sqft,
      img: finalImg
    }

    if (editId) {
      updateListing(editId, listingData)
    } else {
      addListing(listingData)
    }
    resetForm()
  }

  const handleEdit = (item) => {
    setIsEditing(true)
    setEditId(item.id)
    setName(item.name)
    setLocation(item.location)
    setPrice(item.price)
    setTag(item.tag || 'Featured')
    setBeds(item.beds)
    setBaths(item.baths)
    setSqft(item.sqft)
    setImg(item.img)
    // Scroll form into view smoothly
    document.getElementById('admin-form-container')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      deleteListing(id)
    }
  }

  const filtered = listings.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.location.toLowerCase().includes(search.toLowerCase()) ||
    (item.tag && item.tag.toLowerCase().includes(search.toLowerCase()))
  )

  // Calculations for stats
  const totalCount = listings.length
  const featuredCount = listings.filter(item => item.tag === 'Featured').length
  const averagePrice = listings.reduce((acc, curr) => {
    const numeric = parseFloat(curr.price.replace(/,/g, '')) || 0
    return acc + numeric
  }, 0) / (totalCount || 1)

  return (
    <main style={{ background: 'var(--bg-cream)', minHeight: '100vh', padding: '100px 5% 50px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* HEADER SECTION */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '8px' }}>
              <Shield size={16} /> ADMINISTRATOR PANEL
            </div>
            <h1 style={{ fontSize: '2.5rem', color: 'var(--navy)', margin: 0 }}>Manage Listings</h1>
            <p style={{ color: 'var(--text-gray)', marginTop: '4px' }}>Add, update, or remove properties displayed on the homepage.</p>
          </div>
          <button 
            onClick={() => { resetForm(); setIsEditing(true); }}
            style={{ 
              display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', 
              background: 'var(--primary)', color: '#fff', borderRadius: '50px', 
              fontWeight: 600, boxShadow: 'var(--shadow-md)', transition: 'var(--transition)'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'var(--primary-dark)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'var(--primary)'}
          >
            <Plus size={18} /> Add New Listing
          </button>
        </div>

        {/* STATS STRIP */}
        <div style={{ 
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
          gap: '20px', marginBottom: '40px' 
        }}>
          <div style={{ background: '#fff', padding: '24px', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-gray)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Total Properties</span>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--navy)', marginTop: '8px' }}>{totalCount}</div>
          </div>
          <div style={{ background: '#fff', padding: '24px', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-gray)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Featured Units</span>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--primary)', marginTop: '8px' }}>{featuredCount}</div>
          </div>
          <div style={{ background: '#fff', padding: '24px', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-gray)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Avg Price</span>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--accent)', marginTop: '8px' }}>
              ₵ {averagePrice.toLocaleString('en-US', { maximumFractionDigits: 0 })}
            </div>
          </div>
        </div>

        {/* DYNAMIC FORM SECTION (COLLAPSIBLE / TOGGLEABLE) */}
        {isEditing && (
          <div id="admin-form-container" style={{ 
            background: '#fff', padding: '40px', borderRadius: 'var(--radius-lg)', 
            boxShadow: 'var(--shadow-md)', marginBottom: '40px', position: 'relative',
            borderTop: '5px solid var(--primary)'
          }}>
            <button 
              onClick={resetForm}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', color: 'var(--text-gray)' }}
            >
              <X size={24} />
            </button>
            <h2 style={{ fontSize: '1.8rem', color: 'var(--navy)', marginBottom: '24px' }}>
              {editId ? 'Edit Property Listing' : 'Create New Listing'}
            </h2>
            <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
              
              <div className="form-group" style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', color: 'var(--navy)', fontSize: '0.9rem' }}>Property Name</label>
                <input 
                  type="text" required placeholder="e.g. Ocean Breeze Villa"
                  value={name} onChange={(e) => setName(e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: 'var(--radius-sm)', outline: 'none' }}
                />
              </div>

              <div className="form-group">
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', color: 'var(--navy)', fontSize: '0.9rem' }}>Location / Address</label>
                <input 
                  type="text" required placeholder="e.g. East Legon, Accra"
                  value={location} onChange={(e) => setLocation(e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: 'var(--radius-sm)', outline: 'none' }}
                />
              </div>

              <div className="form-group">
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', color: 'var(--navy)', fontSize: '0.9rem' }}>Price (₵ / Cedis)</label>
                <input 
                  type="text" required placeholder="e.g. 990,000"
                  value={price} onChange={(e) => setPrice(e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: 'var(--radius-sm)', outline: 'none' }}
                />
              </div>

              <div className="form-group">
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', color: 'var(--navy)', fontSize: '0.9rem' }}>Tag Category</label>
                <select 
                  value={tag} onChange={(e) => setTag(e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: 'var(--radius-sm)', outline: 'none', background: '#fff' }}
                >
                  <option value="Featured">Featured</option>
                  <option value="New">New</option>
                  <option value="Popular">Popular</option>
                  <option value="Luxury">Luxury</option>
                </select>
              </div>

              <div className="form-group">
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', color: 'var(--navy)', fontSize: '0.9rem' }}>Beds</label>
                <input 
                  type="number" required min="1"
                  value={beds} onChange={(e) => setBeds(e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: 'var(--radius-sm)', outline: 'none' }}
                />
              </div>

              <div className="form-group">
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', color: 'var(--navy)', fontSize: '0.9rem' }}>Baths</label>
                <input 
                  type="number" required min="1"
                  value={baths} onChange={(e) => setBaths(e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: 'var(--radius-sm)', outline: 'none' }}
                />
              </div>

              <div className="form-group">
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', color: 'var(--navy)', fontSize: '0.9rem' }}>Square Footage (sqft)</label>
                <input 
                  type="text" placeholder="e.g. 3,200"
                  value={sqft} onChange={(e) => setSqft(e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: 'var(--radius-sm)', outline: 'none' }}
                />
              </div>

              <div className="form-group" style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', color: 'var(--navy)', fontSize: '0.9rem' }}>Image URL</label>
                <input 
                  type="url" placeholder="e.g. https://images.unsplash.com/photo-..."
                  value={img} onChange={(e) => setImg(e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: 'var(--radius-sm)', outline: 'none' }}
                />
                <span style={{ fontSize: '0.8rem', color: 'var(--text-gray)', marginTop: '4px', display: 'block' }}>
                  Tip: Leave blank to auto-use a high-quality default exterior villa photograph.
                </span>
              </div>

              <div style={{ gridColumn: 'span 2', display: 'flex', gap: '12px', marginTop: '20px' }}>
                <button 
                  type="submit" 
                  style={{ 
                    padding: '14px 28px', background: 'var(--primary)', color: '#fff', 
                    fontWeight: 600, borderRadius: 'var(--radius-sm)', flex: 1 
                  }}
                >
                  {editId ? 'Save Changes' : 'Create Listing'}
                </button>
                <button 
                  type="button" onClick={resetForm}
                  style={{ 
                    padding: '14px 28px', background: 'var(--bg-light)', color: 'var(--text-dark)', 
                    fontWeight: 600, borderRadius: 'var(--radius-sm)' 
                  }}
                >
                  Cancel
                </button>
              </div>

            </form>
          </div>
        )}

        {/* LISTINGS DATA LISTING TABLE */}
        <div style={{ background: '#fff', padding: '30px', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
          
          {/* SEARCH BAR */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '15px' }}>
            <h3 style={{ fontSize: '1.3rem', color: 'var(--navy)', margin: 0 }}>Active Listings</h3>
            <div style={{ position: 'relative', width: '320px' }}>
              <input 
                type="text" placeholder="Search by name, location or tag..."
                value={search} onChange={(e) => setSearch(e.target.value)}
                style={{ 
                  width: '100%', padding: '10px 16px 10px 40px', border: '1.5px solid #e2e8f0', 
                  borderRadius: '50px', outline: 'none', fontSize: '0.85rem' 
                }}
              />
              <Search size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-gray)' }} />
            </div>
          </div>

          {/* TABLE DISPLAY */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #edf2f7', color: 'var(--text-gray)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  <th style={{ padding: '16px 8px' }}>Property</th>
                  <th style={{ padding: '16px 8px' }}>Location</th>
                  <th style={{ padding: '16px 8px' }}>Price</th>
                  <th style={{ padding: '16px 8px' }}>Tag</th>
                  <th style={{ padding: '16px 8px' }}>Specs</th>
                  <th style={{ padding: '16px 8px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(item => (
                  <tr key={item.id} style={{ borderBottom: '1px solid #edf2f7', transition: 'var(--transition)' }}>
                    
                    {/* name & image */}
                    <td style={{ padding: '16px 8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img 
                          src={item.img} alt={item.name} 
                          style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} 
                        />
                        <div>
                          <div style={{ fontWeight: 600, color: 'var(--navy)' }}>{item.name}</div>
                          <span style={{ fontSize: '0.75rem', padding: '2px 8px', background: 'var(--bg-light)', borderRadius: '50px', color: 'var(--primary)' }}>
                            ID: {item.id}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* location */}
                    <td style={{ padding: '16px 8px', color: 'var(--text-dark)', fontSize: '0.9rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <MapPin size={14} style={{ color: 'var(--primary)' }} /> {item.location}
                      </div>
                    </td>

                    {/* price */}
                    <td style={{ padding: '16px 8px', fontWeight: 700, color: 'var(--primary)' }}>
                      ₵ {parseFloat(item.price.replace(/,/g, '')).toLocaleString()}
                    </td>

                    {/* tag */}
                    <td style={{ padding: '16px 8px' }}>
                      <span style={{ 
                        fontSize: '0.75rem', fontWeight: 600, padding: '4px 10px', 
                        borderRadius: '50px', background: 'rgba(212,169,83,0.15)', color: 'var(--accent)'
                      }}>
                        {item.tag || 'Featured'}
                      </span>
                    </td>

                    {/* specs */}
                    <td style={{ padding: '16px 8px', fontSize: '0.8rem', color: 'var(--text-gray)' }}>
                      {item.beds} Beds · {item.baths} Baths · {item.sqft} sqft
                    </td>

                    {/* actions */}
                    <td style={{ padding: '16px 8px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                        <button 
                          onClick={() => handleEdit(item)}
                          style={{ 
                            width: '32px', height: '32px', borderRadius: 'var(--radius-sm)', 
                            background: 'rgba(42,111,127,0.1)', color: 'var(--primary)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'var(--transition)'
                          }}
                          title="Edit"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id)}
                          style={{ 
                            width: '32px', height: '32px', borderRadius: 'var(--radius-sm)', 
                            background: 'rgba(229,62,62,0.1)', color: '#E53E3E',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'var(--transition)'
                          }}
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-gray)' }}>
                      No properties found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>

      </div>
    </main>
  )
}
