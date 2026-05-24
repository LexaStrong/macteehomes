# Mactee Homes 🏘️ | Premium Ghana Real Estate Agency Website

Welcome to the **Mactee Homes** application. Mactee Homes is a premier real estate agency located in Accra, Ghana, dedicated to providing high-quality, luxury, and fully furnished properties at affordable prices. 

**"Your Comfort, Our Priority."**

---

## 🚀 Technical Highlights & Architecture

The application is engineered with a modular, scalable React foundation powered by Vite for lighting-fast performance:

*   **Core Logic & UI**: React with functional components, modern Hooks, and Lucide React icons for high-fidelity responsive iconography.
*   **State Management (Live Synchronized Store)**:
    *   Powered by a dynamic `localStorage` store at `src/utils/listingsStore.js`.
    *   Features a custom event listener (`mactee_listings_updated`) to broadcast updates. Any listing additions, modifications, or deletions created inside the Admin page instantly sync with the homepage without manual reloads.
*   **Premium Styles**: Maximize performance and aesthetic freedom utilizing custom Vanilla CSS tokens, HSL curated pallets, smooth gradients, and glassmorphism styling features.

---

## 📱 Mobile-First Responsive Design & Layout Optimizations

Every viewport from large desktop monitors to narrow mobile screens has been meticulously optimized:

1.  **Navbar & Navigation**:
    *   Integrated the brand logo seamlessly side-by-side with responsive text styling.
    *   Collapses into a beautifully animated mobile hamburger-style dropdown with standard vertical links and a highlighted WhatsApp call to action.
2.  **Hero CTAs on Mobile**:
    *   Hid the bulky search panel under mobile views (`max-width: 768px`) to prevent visual clutter and keep focus high.
    *   Introduced sleek **"View More"** and **"Contact Us"** CTA button links directly overlaying the Dusk Glass-and-Concrete villa background.
3.  **Two-Column Mobile Footer Grid**:
    *   Automatically wraps into a perfectly balanced **2-column layout (2x2 grid)** on mobile devices.
    *   Features generous vertical and horizontal padding to create premium breathing room.
4.  **Admin Panel Grid Layout**:
    *   The property creation and modification forms dynamically morph from a multi-column desktop format into a clean single-column structure on mobile devices to prevent layout breaking or horizontal viewport stretching.

---

## 🌐 SEO, AEO, and GEO Strategy

This codebase is hyper-optimized to achieve top-tier visibility on both traditional search engine results pages and modern generative AI platforms:

### 1. SEO (Search Engine Optimization)
*   **Dynamic Metadata**: Configured deep titles, rich site descriptions, and verified keywords.
*   **Social Graph Previews**: Embedded OpenGraph (Facebook/LinkedIn) and Twitter Card tags to ensure that sharing the website link generates stunning rich cards with custom imagery.

### 2. AEO (Answer Engine Optimization)
*   **Structured JSON-LD Schema**: Embedded robust Schema.org structured data declaring the business entity `RealEstateAgent`.
*   *Purpose*: This provides semantic context for AI agents (like Gemini, ChatGPT, and Claude) to instantly parse and answer questions like *"Where is Mactee Homes located?"* or *"What are their contact details?"*.

### 3. GEO (Geographic Local SEO)
*   **Location Geocodes**: Configured strict geocode coordinates (`5.6258; -0.1415`) and ICBM values pinpointing the physical office at Kakalika Plaza, Spintex Road, Accra, Ghana.
*   *Purpose*: Signals local relevance to search algorithms, elevating search ranking for inquiries from within Accra and the Greater Accra Region.

---

## ⚙️ How to Run Locally

### 1. Installation
Clone or enter the project workspace and install dependencies:
```bash
npm install
```

### 2. Run the Development Server
Launch the server in hot-reload mode:
```bash
npm run dev
```
Open [http://localhost:5175/](http://localhost:5175/) in your browser.

### 3. Run Production Build
Verify standard compiled assets:
```bash
npm run build
```
The compiled output will be generated inside the `/dist` directory, fully minified and ready for immediate high-performance deployment.

---

## 📍 Contact & Agency Details
*   **Branding & Office Address**: Kakalika Plaza - Spintex Road, Accra, Ghana 🇬🇭
*   **WhatsApp / Phone Number**: [+233 050 581 4053](https://wa.me/+2330505814053)
*   **Social Channels**:
    *   [Facebook Page](https://www.facebook.com/Bismarck.Tee?mibextid=LQQJ4d)
    *   [Instagram Page](https://www.instagram.com/mactee_homes)
    *   [TikTok Page](https://www.tiktok.com/@macteehomes)
