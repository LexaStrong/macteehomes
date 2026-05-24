const INITIAL_PROPERTIES = [
  {
    id: 1, name: 'Ocean Breeze Villa', location: 'East Legon, Accra',
    price: '990,000', tag: 'Featured', beds: 4, baths: 3, sqft: '3,200',
    img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80'
  },
  {
    id: 2, name: 'Jackson House', location: 'Airport Hills, Accra',
    price: '750,000', tag: 'New', beds: 3, baths: 2, sqft: '2,400',
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80'
  },
  {
    id: 3, name: 'Lakeside Cottage', location: 'Aburi, Eastern Region',
    price: '540,000', tag: 'Popular', beds: 3, baths: 2, sqft: '1,800',
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80'
  },
  {
    id: 4, name: 'Spintex Penthouse', location: 'Spintex Road, Accra',
    price: '1,200,000', tag: 'Luxury', beds: 5, baths: 4, sqft: '4,100',
    img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80'
  },
  {
    id: 5, name: 'Tropical Garden Villa', location: 'Cantonments, Accra',
    price: '850,000', tag: 'Featured', beds: 4, baths: 3, sqft: '2,800',
    img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80'
  },
  {
    id: 6, name: 'Skyline Apartment', location: 'Ridge, Accra',
    price: '620,000', tag: 'New', beds: 2, baths: 2, sqft: '1,600',
    img: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&q=80'
  },
];

export const getListings = () => {
  const listings = localStorage.getItem('mactee_listings');
  if (!listings) {
    localStorage.setItem('mactee_listings', JSON.stringify(INITIAL_PROPERTIES));
    return INITIAL_PROPERTIES;
  }
  return JSON.parse(listings);
};

export const saveListings = (listings) => {
  localStorage.setItem('mactee_listings', JSON.stringify(listings));
  // Dispatch custom event to notify other components
  window.dispatchEvent(new Event('mactee_listings_updated'));
};

export const addListing = (listing) => {
  const listings = getListings();
  const newListing = {
    ...listing,
    id: Date.now(), // Unique ID
  };
  listings.push(newListing);
  saveListings(listings);
  return newListing;
};

export const updateListing = (id, updatedFields) => {
  const listings = getListings();
  const index = listings.findIndex(item => item.id === Number(id));
  if (index !== -1) {
    listings[index] = { ...listings[index], ...updatedFields };
    saveListings(listings);
    return listings[index];
  }
  return null;
};

export const deleteListing = (id) => {
  const listings = getListings();
  const filtered = listings.filter(item => item.id !== Number(id));
  saveListings(filtered);
};
