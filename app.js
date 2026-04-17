/* ============================================================
   HOTEL AVA
   Room Booking System – Home Page Logic
   Guest / Registered User State Management
   ============================================================ */

// ── Room Data ──────────────────────────────────────────────
// ── Room Data handled by rooms.js ─────────────────────────


// ── User Data (Registered) ────────────────────────────────
const registeredUser = {
  name: "Juan, Dela Cruz",
  initials: "JDC",
  bookings: 3
};

// ── State ─────────────────────────────────────────────────
let isLoggedIn = localStorage.getItem('hotelava_logged_in') === 'true';
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

// ── Utilities (Provided by shared.js) ─────────────────────

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
        <div class="navbar__logo-text">HOTEL AVA</div>
        <div class="navbar__logo-sub">Boutique Hotel, Malate</div>
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
      localStorage.removeItem('hotelava_logged_in');
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
      <p class="hero__subtext">Ready for your next stay at Hotel Ava?</p>
    `;
  } else {
    heroContent.innerHTML = `
      <h1 class="hero__headline">Discover Modern Boutique Living at Hotel Ava</h1>
      <p class="hero__subtext">Your chic urban retreat in the heart of Malate, Manila</p>
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
                  ${room.available === 0 ? 'disabled' : ''}
                  onclick="openCheckout(${room.id})">
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

// ── Checkout Redirect ──────────────────────────────────────
function openCheckout(roomId) {
  const checkinValue = document.getElementById('checkin')?.value || '';
  const checkoutValue = document.getElementById('checkout')?.value || '';
  
  const url = `checkout.html?roomId=${roomId}&checkin=${checkinValue}&checkout=${checkoutValue}`;
  window.open(url, '_blank');
}

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
          <span class="footer__logo-text">HOTEL AVA</span>
        </div>
        <p class="footer__address">
          1429 M.H. del Pilar Street,<br>
          Malate, Manila,<br>
          Philippines
        </p>
        <div class="footer__contact-item">${icon('phone', 16)} +63 2 8123 4567</div>
        <div class="footer__contact-item">${icon('mail', 16)} reservations@hotelava.com</div>
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
      <p class="footer__copyright">© 2026 Hotel Ava. All rights reserved. Prototype.</p>
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
        localStorage.setItem('hotelava_logged_in', 'true');
      } else {
        localStorage.removeItem('hotelava_logged_in');
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
          <span style="font-family:var(--font-primary);font-size:18px;font-weight:700;color:#7A1B55;letter-spacing:2px">HOTEL AVA</span>
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
            <button class="btn-create-account" style="background:var(--alert);" onclick="isLoggedIn=false;localStorage.removeItem('hotelava_logged_in');closeMobileDrawer();renderPage();">Logout</button>
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
