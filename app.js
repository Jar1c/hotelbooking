/* ============================================================
   WINFORD RESORT & CASINO MANILA
   Room Booking System – Home Page Logic
   Guest / Registered User State Management
   ============================================================ */

// ── Room Data ──────────────────────────────────────────────
const rooms = [
  {
    id: 1,
    name: "Deluxe Room",
    type: "deluxe",
    sqm: 32,
    bed: "King Bed",
    maxGuests: 2,
    image: "images/room-deluxe.png",
    oldPrice: 8500,
    price: 6800,
    rating: 9.2,
    ratingLabel: "Superb",
    reviewCount: 124,
    available: 5,
    aiScore: 95,
    amenities: ["wifi", "tv", "wind", "coffee"],
    amenityLabels: ["WiFi", "TV", "AC", "Minibar"],
    hasDeal: true,
    dealText: "20% OFF Today",
    pastStay: "March 2024",
    description: "Elegant and spacious with stunning city views."
  },
  {
    id: 2,
    name: "Deluxe Twin Room",
    type: "deluxe",
    sqm: 32,
    bed: "Twin Beds",
    maxGuests: 2,
    image: "images/room-premium.png",
    oldPrice: 7500,
    price: 5900,
    rating: 8.8,
    ratingLabel: "Excellent",
    reviewCount: 89,
    available: 8,
    aiScore: 82,
    amenities: ["wifi", "tv", "wind", "coffee"],
    amenityLabels: ["WiFi", "TV", "AC", "Minibar"],
    hasDeal: false,
    dealText: "",
    pastStay: null,
    description: "Comfortable twin bedding perfect for friends."
  },
  {
    id: 3,
    name: "Premium Deluxe",
    type: "deluxe",
    sqm: 38,
    bed: "King Bed",
    maxGuests: 2,
    image: "images/room-suite.png",
    oldPrice: 10200,
    price: 8500,
    rating: 9.0,
    ratingLabel: "Superb",
    reviewCount: 67,
    available: 3,
    aiScore: 88,
    amenities: ["wifi", "tv", "wind", "bath"],
    amenityLabels: ["WiFi", "Smart TV", "AC", "Bathtub"],
    hasDeal: true,
    dealText: "Best Value",
    pastStay: null,
    description: "Upgraded luxury with premium amenities and extra space."
  },
  {
    id: 4,
    name: "Junior Suite",
    type: "suite",
    sqm: 45,
    bed: "King Bed",
    maxGuests: 3,
    image: "images/room-premium.png",
    oldPrice: 12500,
    price: 9800,
    rating: 9.4,
    ratingLabel: "Exceptional",
    reviewCount: 52,
    available: 2,
    aiScore: 92,
    amenities: ["wifi", "tv", "bath", "utensils"],
    amenityLabels: ["WiFi", "Smart TV", "Bathtub", "Dining"],
    hasDeal: true,
    dealText: "Special Offer",
    pastStay: "January 2025",
    description: "Spacious suite with separate living area and luxury bathrobes."
  },
  {
    id: 5,
    name: "Executive Suite",
    type: "suite",
    sqm: 55,
    bed: "King Bed",
    maxGuests: 3,
    image: "images/room-suite.png",
    oldPrice: 16000,
    price: 12500,
    rating: 9.6,
    ratingLabel: "Exceptional",
    reviewCount: 38,
    available: 1,
    aiScore: 78,
    amenities: ["wifi", "tv", "bath", "wine"],
    amenityLabels: ["WiFi", "Smart TV", "Bathtub", "Lounge"],
    hasDeal: true,
    dealText: "22% OFF",
    pastStay: null,
    description: "Premier accommodation with Executive Lounge access and butler service."
  },
  {
    id: 6,
    name: "Presidential Suite",
    type: "suite",
    sqm: 80,
    bed: "King Bed",
    maxGuests: 4,
    image: "images/room-presidential.png",
    oldPrice: null,
    price: 25000,
    rating: 9.8,
    ratingLabel: "Outstanding",
    reviewCount: 15,
    available: 0,
    aiScore: 65,
    amenities: ["wifi", "tv", "utensils", "bell-ring"],
    amenityLabels: ["WiFi", "Smart TV", "Dining", "Butler"],
    hasDeal: false,
    dealText: "",
    pastStay: null,
    description: "The ultimate luxury experience with a private dining area and panoramic views."
  }
];

// ── User Data (Registered) ────────────────────────────────
const registeredUser = {
  name: "Juan, Dela Cruz",
  initials: "JDC",
  bookings: 3
};

// ── State ─────────────────────────────────────────────────
let isLoggedIn = localStorage.getItem('winford_logged_in') === 'true';
let activeFilter = "all";
let currentSort = "recommended";
let wishlist = new Set();

// ── Date helpers ──────────────────────────────────────────
function getDefaultDates() {
  const today = new Date();
  const checkin = new Date(today);
  checkin.setDate(today.getDate() + 7);
  const checkout = new Date(checkin);
  checkout.setDate(checkin.getDate() + 2);
  return {
    checkin: checkin.toISOString().split('T')[0],
    checkout: checkout.toISOString().split('T')[0]
  };
}

function formatDateShort(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// ── Currency formatter ────────────────────────────────────
function formatPrice(amount) {
  return '₱' + amount.toLocaleString();
}

// ── SVG Icon helper (inline Lucide-like) ──────────────────
const icons = {
  hotel: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z"/><path d="m9 16 .348-.24c1.465-1.013 3.84-1.013 5.304 0L15 16"/><path d="M8 7h.01"/><path d="M16 7h.01"/><path d="M12 7h.01"/><path d="M12 11h.01"/><path d="M16 11h.01"/><path d="M8 11h.01"/></svg>`,
  search: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,
  calendar: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>`,
  users: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  chevronDown: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>`,
  arrowRight: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`,
  sparkles: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>`,
  heart: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`,
  wifi: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13a10 10 0 0 1 14 0"/><path d="M8.5 16.5a5 5 0 0 1 7 0"/><path d="M2 8.82a15 15 0 0 1 20 0"/><line x1="12" x2="12.01" y1="20" y2="20"/></svg>`,
  tv: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="15" x="2" y="7" rx="2" ry="2"/><polyline points="17 2 12 7 7 2"/></svg>`,
  wind: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/></svg>`,
  coffee: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" x2="6" y1="2" y2="4"/><line x1="10" x2="10" y1="2" y2="4"/><line x1="14" x2="14" y1="2" y2="4"/></svg>`,
  bath: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/><line x1="10" x2="8" y1="5" y2="7"/><line x1="2" x2="22" y1="12" y2="12"/><line x1="7" x2="7" y1="19" y2="21"/><line x1="17" x2="17" y1="19" y2="21"/></svg>`,
  utensils: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>`,
  wine: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 22h8"/><path d="M12 11v11"/><path d="m19 3-7 8-7-8Z"/></svg>`,
  "bell-ring": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/><path d="M4 2C2.8 3.7 2 5.7 2 8"/><path d="M22 8c0-2.3-.8-4.3-2-6"/></svg>`,
  trendingUp: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>`,
  clock: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  eye: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`,
  trendingDown: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/><polyline points="16 17 22 17 22 11"/></svg>`,
  menu: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>`,
  x: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`,
  send: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>`,
  phone: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92"/></svg>`,
  mail: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
  bookmark: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>`,
  gift: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 12 20 22 4 22 4 12"/><rect width="20" height="5" x="2" y="7"/><line x1="12" x2="12" y1="22" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>`,
  settings: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>`,
  logOut: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>`,
  user: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  facebook: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>`,
  instagram: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>`,
  twitter: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>`
};

function icon(name, size = 24) {
  return (icons[name] || '').replace(/width="\d+"/, `width="${size}"`).replace(/height="\d+"/, `height="${size}"`);
}

// ── Initialize ────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  setDefaultDates();
  renderPage();
  setupEventListeners();
});

function setDefaultDates() {
  const dates = getDefaultDates();
  const checkinInput = document.getElementById('checkin');
  const checkoutInput = document.getElementById('checkout');
  if (checkinInput) checkinInput.value = dates.checkin;
  if (checkoutInput) checkoutInput.value = dates.checkout;
}

// ── Render Everything ─────────────────────────────────────
function renderPage() {
  renderNavbar();
  renderHero();
  renderFilterPills();
  renderPersonalizedSection();
  renderRoomsSection();
  renderSignupBanner();
  renderAiInsights();
  renderFooter();
  updateStateToggle();
}

// ── Navbar ────────────────────────────────────────────────
function renderNavbar() {
  const nav = document.getElementById('navbar-content');
  if (!nav) return;

  const guestLinks = `
    <ul class="navbar__links" id="desktop-nav-links">
      <li><a href="#" class="active">Home</a></li>
      <li><a href="#">Rooms</a></li>
      <li><a href="#">Amenities</a></li>
      <li><a href="#">Contact</a></li>
    </ul>
  `;

  const registeredLinks = `
    <ul class="navbar__links" id="desktop-nav-links">
      <li><a href="#" class="active">Home</a></li>
      <li><a href="#">Rooms</a></li>
      <li><a href="#">My Bookings</a></li>
      <li><a href="#">Amenities</a></li>
    </ul>
  `;

  const guestActions = `
    <div class="navbar__actions" id="nav-actions">
      <a href="login.html" class="btn-signin">Sign In</a>
      <a href="register.html" class="btn-create-account">Create Account</a>
      <button class="navbar__hamburger" id="hamburger-btn">${icon('menu', 24)}</button>
    </div>
  `;

  const registeredActions = `
    <div class="navbar__actions" id="nav-actions">
      <div class="navbar__user">
        <span class="navbar__welcome">Welcome, ${registeredUser.name}!</span>
        <div class="navbar__profile" id="profile-dropdown">
          <button class="navbar__profile-btn" id="profile-btn">
            <div class="navbar__avatar">${registeredUser.initials}</div>
            <span class="navbar__profile-arrow">${icon('chevronDown', 16)}</span>
          </button>
          <div class="navbar__dropdown">
            <a href="#">${icon('bookmark', 18)} My Bookings</a>
            <a href="#">${icon('settings', 18)} Profile Settings</a>
            <div class="navbar__dropdown-divider"></div>
            <a href="#" class="logout" id="logout-btn">${icon('logOut', 18)} Logout</a>
          </div>
        </div>
      </div>
      <button class="navbar__hamburger" id="hamburger-btn">${icon('menu', 24)}</button>
    </div>
  `;

  nav.innerHTML = `
    <a href="#" class="navbar__logo">
      <div class="navbar__logo-icon">${icon('hotel', 22)}</div>
      <div>
        <div class="navbar__logo-text">WINFORD</div>
        <div class="navbar__logo-sub">Resort & Casino Manila</div>
      </div>
    </a>
    ${isLoggedIn ? registeredLinks : guestLinks}
    ${isLoggedIn ? registeredActions : guestActions}
  `;

  // Re-attach event listeners
  const profileBtn = document.getElementById('profile-btn');
  if (profileBtn) {
    profileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      document.getElementById('profile-dropdown').classList.toggle('open');
    });
  }

  const hamburger = document.getElementById('hamburger-btn');
  if (hamburger) {
    hamburger.addEventListener('click', () => openMobileDrawer());
  }

  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      isLoggedIn = false;
      localStorage.removeItem('winford_logged_in');
      renderPage();
    });
  }
}

// ── Hero ──────────────────────────────────────────────────
function renderHero() {
  const heroContent = document.getElementById('hero-text');
  if (!heroContent) return;

  if (isLoggedIn) {
    heroContent.innerHTML = `
      <h1 class="hero__headline">Welcome back, ${registeredUser.name}! 👋</h1>
      <p class="hero__subtext">Ready for your next getaway?</p>
    `;
  } else {
    heroContent.innerHTML = `
      <h1 class="hero__headline">Find Your Perfect Room at Winford Resort</h1>
      <p class="hero__subtext">Luxury accommodation in the heart of Manila</p>
    `;
  }

  const ctaMsg = document.getElementById('hero-cta-message');
  if (ctaMsg) {
    const budgetSelect = document.getElementById('budget');
    const budgetValue = budgetSelect ? budgetSelect.value : 'any';
    if (isLoggedIn) {
      if (budgetValue !== 'any') {
        ctaMsg.innerHTML = `${icon('sparkles', 16)} AI found <strong>rooms within your ₱${parseInt(budgetValue).toLocaleString()} budget</strong>`;
      } else {
        ctaMsg.innerHTML = `${icon('sparkles', 16)} Based on your history, we found <strong>3 perfect rooms</strong> for you`;
      }
      ctaMsg.style.display = 'flex';
    } else {
      if (budgetValue !== 'any') {
        ctaMsg.innerHTML = `${icon('sparkles', 16)} Showing rooms within your <strong>₱${parseInt(budgetValue).toLocaleString()} budget</strong>`;
      } else {
        ctaMsg.innerHTML = `💡 Sign in to unlock exclusive deals and personalized recommendations!`;
      }
      ctaMsg.style.display = 'flex';
    }
  }
}

// ── Filter Pills ──────────────────────────────────────────
function renderFilterPills() {
  const container = document.getElementById('filter-pills');
  if (!container) return;

  const filters = [
    { id: 'all', label: 'All Rooms' },
    { id: 'deluxe', label: 'Deluxe Rooms' },
    { id: 'suite', label: 'Suites' },
    { id: 'value', label: 'Best Value' },
    { id: 'ai', label: '✨ AI Recommended' },
    { id: 'available', label: 'Available Today' }
  ];

  container.innerHTML = filters.map(f => `
    <button class="filter-pill ${f.id === activeFilter ? 'active' : ''}" data-filter="${f.id}">
      ${f.label}
    </button>
  `).join('');
}

// ── Personalized Section (Registered Only) ────────────────
function renderPersonalizedSection() {
  const section = document.getElementById('personalized-section');
  if (!section) return;

  if (isLoggedIn) {
    section.classList.add('visible');
    const cardsContainer = document.getElementById('rec-cards');
    if (!cardsContainer) return;

    const recommended = rooms
      .filter(r => r.aiScore >= 80)
      .sort((a, b) => b.aiScore - a.aiScore)
      .slice(0, 4);

    cardsContainer.innerHTML = recommended.map(room => `
      <div class="rec-card" data-room="${room.id}">
        <div class="rec-card__image">
          <img src="${room.image}" alt="${room.name}" loading="lazy">
          <div class="rec-card__badge">${icon('sparkles', 12)} ${room.aiScore}% Match</div>
        </div>
        <div class="rec-card__body">
          <div class="rec-card__name">${room.name}</div>
          <div class="rec-card__specs">${room.sqm}sqm · ${room.bed}</div>
          <div class="rec-card__rating">
            <span class="rec-card__rating-badge">${room.rating}</span>
            <span class="rec-card__rating-text">${room.ratingLabel}</span>
          </div>
          <div class="rec-card__price">
            <span class="rec-card__price-current">${formatPrice(room.price)}</span>
            <span class="rec-card__price-label">per night</span>
          </div>
          <a href="#" class="rec-card__link">View Details →</a>
        </div>
      </div>
    `).join('');

    // Update header name
    const title = section.querySelector('.section-header__title');
    if (title) title.innerHTML = `🎯 Recommended Just For You, ${registeredUser.name}`;
  } else {
    section.classList.remove('visible');
  }
}

// ── Room Cards ────────────────────────────────────────────
function renderRoomsSection() {
  const container = document.getElementById('rooms-list');
  const subtitle = document.getElementById('rooms-subtitle');
  const sortSelect = document.getElementById('sort-select');
  if (!container) return;

  // Filter rooms
  let filtered = [...rooms];
  switch (activeFilter) {
    case 'deluxe':
      filtered = filtered.filter(r => r.type === 'deluxe');
      break;
    case 'suite':
      filtered = filtered.filter(r => r.type === 'suite');
      break;
    case 'value':
      filtered = filtered.filter(r => r.oldPrice && r.oldPrice > r.price);
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'ai':
      filtered.sort((a, b) => b.aiScore - a.aiScore);
      break;
    case 'available':
      filtered = filtered.filter(r => r.available > 0);
      break;
  }

  // Budget filter
  const budgetSelect = document.getElementById('budget');
  const budgetValue = budgetSelect ? budgetSelect.value : 'any';
  if (budgetValue !== 'any') {
    const maxBudget = parseInt(budgetValue);
    filtered = filtered.filter(r => r.price <= maxBudget);
  }

  // Sort
  switch (currentSort) {
    case 'price-asc':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case 'ai':
      filtered.sort((a, b) => b.aiScore - a.aiScore);
      break;
  }

  // Update subtitle
  const total = filtered.filter(r => r.available > 0).length;
  if (subtitle) {
    subtitle.textContent = `${total} rooms available for your dates`;
  }

  // Update sort options
  if (sortSelect && !sortSelect.dataset.initialized) {
    const aiOption = isLoggedIn
      ? '<option value="ai">AI Recommended</option>'
      : '';
    sortSelect.innerHTML = `
      <option value="recommended">Recommended</option>
      ${aiOption}
      <option value="price-asc">Price: Low to High</option>
      <option value="price-desc">Price: High to Low</option>
      <option value="rating">Guest Rating</option>
    `;
    sortSelect.dataset.initialized = 'true';
  }

  // Render cards
  container.innerHTML = filtered.map((room, idx) => {
    const availClass = room.available === 0 ? 'soldout' :
      room.available <= 2 ? 'limited' : 'available';
    const availIcon = room.available === 0 ? '✗' :
      room.available <= 2 ? '⚠' : '✓';
    const availText = room.available === 0 ? 'Sold Out' :
      room.available <= 2 ? `Only ${room.available} room${room.available > 1 ? 's' : ''} left!` :
      `${room.available} rooms available`;

    const nights = getNights();
    const totalPrice = room.price * nights;
    const isWishlisted = wishlist.has(room.id);

    return `
      <div class="room-card" style="animation-delay: ${idx * 0.06}s">
        <div class="room-card__image">
          <img src="${room.image}" alt="${room.name}" loading="lazy">
          <div class="room-card__badges">
            ${isLoggedIn && room.aiScore >= 80 ? `
              <span class="badge badge--ai">${icon('sparkles', 12)} ${room.aiScore}% Match</span>
            ` : ''}
            ${room.hasDeal ? `
              <span class="badge badge--offer">${room.dealText}</span>
            ` : ''}
          </div>
          ${room.hasDeal && room.oldPrice ? `
            <div class="room-card__deal-tag">
              ${icon('trendingDown', 12)} Smart Deal
            </div>
          ` : ''}
        </div>

        <div class="room-card__details">
          <h3 class="room-card__name">${room.name}</h3>
          <div class="room-card__specs">
            ${room.sqm}sqm <span>•</span> ${room.bed} <span>•</span> Max ${room.maxGuests} Guests
          </div>
          <div class="room-card__amenities">
            ${room.amenities.map((a, i) => `
              <span class="room-card__amenity">${icon(a, 16)} ${room.amenityLabels[i]}</span>
            `).join('')}
          </div>
          <div class="room-card__rating">
            <span class="rating-badge">${room.rating}</span>
            <span class="rating-label">${room.ratingLabel}</span>
            <span class="rating-count">(${room.reviewCount} reviews)</span>
          </div>
          <div class="room-card__availability ${availClass}">
            ${availIcon} ${availText}
          </div>
          ${isLoggedIn && room.pastStay ? `
            <div class="room-card__past-stay visible">
              💚 You stayed here last ${room.pastStay}
            </div>
          ` : ''}
        </div>

        <div class="room-card__pricing">
          <button class="room-card__wishlist ${isLoggedIn ? 'visible' : ''} ${isWishlisted ? 'saved' : ''}"
                  data-room-id="${room.id}" title="Save to wishlist">
            ${icon('heart', 22)}
          </button>
          ${room.oldPrice ? `<div class="room-card__old-price">${formatPrice(room.oldPrice)}</div>` : ''}
          <div class="room-card__current-price">${formatPrice(room.price)}</div>
          <div class="room-card__price-per">per night</div>
          <div class="room-card__total">${formatPrice(totalPrice)} for ${nights} night${nights > 1 ? 's' : ''}</div>
          <button class="room-card__book-btn ${room.available === 0 ? 'soldout' : ''}"
                  ${room.available === 0 ? 'disabled' : ''}>
            ${room.available === 0 ? 'Sold Out' : 'Book Now'}
          </button>
          <a href="#" class="room-card__details-link">View Details</a>
        </div>
      </div>
    `;
  }).join('');
}

function getNights() {
  const checkin = document.getElementById('checkin');
  const checkout = document.getElementById('checkout');
  if (checkin && checkout && checkin.value && checkout.value) {
    const d1 = new Date(checkin.value);
    const d2 = new Date(checkout.value);
    const diff = Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 2;
  }
  return 2;
}

// ── Signup Banner ─────────────────────────────────────────
function renderSignupBanner() {
  const banner = document.getElementById('signup-banner');
  if (!banner) return;
  if (isLoggedIn) {
    banner.classList.add('hidden');
  } else {
    banner.classList.remove('hidden');
  }
}

// ── AI Insights ───────────────────────────────────────────
function renderAiInsights() {
  // Already static in HTML, nothing dynamic needed
}

// ── Footer ────────────────────────────────────────────────
function renderFooter() {
  const footer = document.getElementById('footer-content');
  if (!footer) return;

  footer.innerHTML = `
    <div class="footer__grid">
      <div class="footer__brand">
        <div class="footer__logo">
          <div class="footer__logo-icon">${icon('hotel', 20)}</div>
          <span class="footer__logo-text">WINFORD</span>
        </div>
        <p class="footer__address">
          San Lazaro Tourism & Business Park,<br>
          MJC Drive, Sta. Cruz, Manila,<br>
          Philippines
        </p>
        <div class="footer__contact-item">${icon('phone', 16)} +63 (2) 8888-8888</div>
        <div class="footer__contact-item">${icon('mail', 16)} reservations@winfordmanila.com</div>
      </div>
      <div>
        <h4 class="footer__col-title">Quick Links</h4>
        <ul class="footer__links">
          <li><a href="#">Rooms & Suites</a></li>
          <li><a href="#">Dining</a></li>
          <li><a href="#">Amenities</a></li>
          <li><a href="#">Special Offers</a></li>
          <li><a href="#">Gallery</a></li>
        </ul>
      </div>
      <div>
        <h4 class="footer__col-title">Support</h4>
        <ul class="footer__links">
          <li><a href="#">Contact Us</a></li>
          <li><a href="#">FAQ</a></li>
          <li><a href="#">Terms & Conditions</a></li>
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Careers</a></li>
        </ul>
      </div>
      <div>
        <h4 class="footer__col-title">Stay Updated</h4>
        <p class="footer__newsletter-text">Subscribe for exclusive deals and updates.</p>
        <form class="footer__newsletter-form" onsubmit="event.preventDefault()">
          <input type="email" placeholder="Your email address" class="footer__newsletter-input">
          <button type="submit" class="footer__newsletter-btn">${icon('send', 18)}</button>
        </form>
      </div>
    </div>
    <div class="footer__bottom">
      <p class="footer__copyright">© 2026 Winford Resort and Casino Manila. All rights reserved. Prototype.</p>
      <div class="footer__socials">
        <a href="#" class="footer__social-link">${icon('facebook', 20)}</a>
        <a href="#" class="footer__social-link">${icon('instagram', 20)}</a>
        <a href="#" class="footer__social-link">${icon('twitter', 20)}</a>
      </div>
    </div>
  `;
}

// ── State Toggle ──────────────────────────────────────────
function updateStateToggle() {
  const sw = document.getElementById('state-switch');
  const label = document.getElementById('state-label');
  if (sw && label) {
    if (isLoggedIn) {
      sw.classList.add('active');
      label.textContent = 'Logged In';
    } else {
      sw.classList.remove('active');
      label.textContent = 'Guest';
    }
  }

  // Sort select reinit
  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) sortSelect.dataset.initialized = '';
}

// ── Event Listeners ───────────────────────────────────────
function setupEventListeners() {
  // State toggle
  const stateSwitch = document.getElementById('state-switch');
  if (stateSwitch) {
    stateSwitch.addEventListener('click', () => {
      isLoggedIn = !isLoggedIn;
      if (isLoggedIn) {
        localStorage.setItem('winford_logged_in', 'true');
      } else {
        localStorage.removeItem('winford_logged_in');
      }
      activeFilter = 'all';
      currentSort = 'recommended';
      renderPage();
    });
  }

  // Filter pills (delegated)
  document.getElementById('filter-pills')?.addEventListener('click', (e) => {
    const pill = e.target.closest('.filter-pill');
    if (pill) {
      activeFilter = pill.dataset.filter;
      renderFilterPills();
      renderRoomsSection();
    }
  });

  // Sort dropdown
  document.getElementById('sort-select')?.addEventListener('change', (e) => {
    currentSort = e.target.value;
    renderRoomsSection();
  });

  // Wishlist (delegated)
  document.getElementById('rooms-list')?.addEventListener('click', (e) => {
    const wishBtn = e.target.closest('.room-card__wishlist');
    if (wishBtn) {
      const roomId = parseInt(wishBtn.dataset.roomId);
      if (wishlist.has(roomId)) {
        wishlist.delete(roomId);
        wishBtn.classList.remove('saved');
      } else {
        wishlist.add(roomId);
        wishBtn.classList.add('saved');
      }
    }
  });

  // Close profile dropdown on outside click
  document.addEventListener('click', (e) => {
    const dropdown = document.getElementById('profile-dropdown');
    if (dropdown && !dropdown.contains(e.target)) {
      dropdown.classList.remove('open');
    }
  });

  // Date change recalculates totals
  document.getElementById('checkin')?.addEventListener('change', () => renderRoomsSection());
  document.getElementById('checkout')?.addEventListener('change', () => renderRoomsSection());

  // Budget change re-filters rooms
  document.getElementById('budget')?.addEventListener('change', () => {
    renderHero();
    renderRoomsSection();
  });

  // Search button
  document.getElementById('search-btn')?.addEventListener('click', (e) => {
    e.preventDefault();
    renderHero();
    renderRoomsSection();
    // Scroll to rooms
    document.getElementById('rooms-section')?.scrollIntoView({ behavior: 'smooth' });
  });
}

// ── Mobile Drawer ─────────────────────────────────────────
function openMobileDrawer() {
  const drawer = document.getElementById('mobile-drawer');
  if (drawer) {
    drawer.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Populate drawer content
    const content = drawer.querySelector('.mobile-drawer__panel');
    if (content) {
      const links = isLoggedIn
        ? ['Home', 'Rooms', 'My Bookings', 'Amenities']
        : ['Home', 'Rooms', 'Amenities', 'Contact'];

      content.innerHTML = `
        <button class="mobile-drawer__close" onclick="closeMobileDrawer()">${icon('x', 24)}</button>
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:24px;">
          <div class="navbar__logo-icon" style="width:32px;height:32px">${icon('hotel', 18)}</div>
          <span style="font-family:var(--font-primary);font-size:18px;font-weight:700;color:var(--winford-red);letter-spacing:2px">WINFORD</span>
        </div>
        ${isLoggedIn ? `
          <div style="display:flex;align-items:center;gap:12px;padding:16px;background:var(--cream);border-radius:8px;margin-bottom:24px;">
            <div class="navbar__avatar" style="width:44px;height:44px;font-size:18px;">${registeredUser.initials}</div>
            <div>
              <div style="font-family:var(--font-primary);font-weight:600;font-size:15px;">Welcome, ${registeredUser.name}!</div>
            </div>
          </div>
        ` : ''}
        <ul class="mobile-drawer__links">
          ${links.map(l => `<li><a href="#">${l}</a></li>`).join('')}
        </ul>
        <div class="mobile-drawer__actions">
          ${isLoggedIn ? `
            <button class="btn-create-account" style="background:var(--alert);" onclick="isLoggedIn=false;localStorage.removeItem('winford_logged_in');closeMobileDrawer();renderPage();">Logout</button>
          ` : `
            <a href="login.html" class="btn-signin" style="text-align:center;display:block;">Sign In</a>
            <a href="register.html" class="btn-create-account" style="text-align:center;display:block;">Create Account</a>
          `}
        </div>
      `;
    }
  }
}

function closeMobileDrawer() {
  const drawer = document.getElementById('mobile-drawer');
  if (drawer) {
    drawer.classList.remove('open');
    document.body.style.overflow = '';
  }
}
