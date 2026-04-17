/* ============================================================
   HOTEL AVA – ADMIN DASHBOARD JS
   Mock data, stat cards, charts (canvas), bookings table
   Management: Staff, Registered Users (Tiers), Guests (Frequent)
   ============================================================ */

// ── Mock Data ─────────────────────────────────────────────
const bookings = [
  { id: 'AVA-1001', guest: 'Juan Dela Cruz', email: 'juan@email.com', initials: 'JD', room: 'Ava Deluxe 101', type: 'Ava Deluxe', checkin: '2026-04-18', checkout: '2026-04-20', status: 'confirmed', amount: 8400, guests: 2 },
  { id: 'AVA-1002', guest: 'Maria Santos', email: 'maria@email.com', initials: 'MS', room: 'Ava Executive 205', type: 'Ava Executive', checkin: '2026-04-19', checkout: '2026-04-22', status: 'pending', amount: 27000, guests: 3 },
  { id: 'AVA-1003', guest: 'Pedro Reyes', email: 'pedro@email.com', initials: 'PR', room: 'Ava Premier 108', type: 'Ava Premier', checkin: '2026-04-17', checkout: '2026-04-19', status: 'checkedin', amount: 13000, guests: 2 },
  { id: 'AVA-1004', guest: 'Ana Garcia', email: 'ana@email.com', initials: 'AG', room: 'Ava Deluxe Twin 103', type: 'Ava Deluxe Twin', checkin: '2026-04-15', checkout: '2026-04-17', status: 'checkedout', amount: 7600, guests: 2 },
  { id: 'AVA-1005', guest: 'Carlos Lim', email: 'carlos@email.com', initials: 'CL', room: 'Ava Grand Suite 301', type: 'Ava Grand Suite', checkin: '2026-04-20', checkout: '2026-04-23', status: 'confirmed', amount: 33000, guests: 2 },
];

const staffMembers = [
  { id: "S001", name: "Juan Admin", email: "juan@hotelava.com", phone: "+63 912 345 6789", role: "Administrator", lastLogin: "2 hours ago", dateAdded: "2022-01-15", status: "Active" },
  { id: "S002", name: "Maria Santos", email: "maria@hotelava.com", phone: "+63 923 456 7890", role: "Manager", lastLogin: "1 day ago", dateAdded: "2022-03-20", status: "Active" },
  { id: "S003", name: "Pedro Reyes", email: "pedro@hotelava.com", phone: "+63 945 678 9012", role: "Receptionist", lastLogin: "3 hours ago", dateAdded: "2023-01-10", status: "Active" },
  { id: "S004", name: "Ana Garcia", email: "ana@hotelava.com", phone: "+63 934 567 8901", role: "Receptionist", lastLogin: "5 hours ago", dateAdded: "2023-02-15", status: "Active" },
  { id: "S005", name: "Carlos Tan", email: "carlos@hotelava.com", phone: "+63 956 789 0123", role: "Maintenance", lastLogin: "2 days ago", dateAdded: "2022-11-05", status: "Inactive" },
  { id: "S006", name: "Lisa Wong", email: "lisa@hotelava.com", phone: "+63 917 890 1234", role: "Manager", lastLogin: "30 minutes ago", dateAdded: "2022-06-18", status: "Active" },
  { id: "S007", name: "Ramon Cruz", email: "ramon@hotelava.com", phone: "+63 928 901 2345", role: "Receptionist", lastLogin: "1 hour ago", dateAdded: "2023-05-22", status: "Active" },
  { id: "S008", name: "Elena Diaz", email: "elena@hotelava.com", phone: "+63 939 012 3456", role: "Administrator", lastLogin: "Just now", dateAdded: "2022-02-10", status: "Active" },
  { id: "S009", name: "Miguel Torres", email: "miguel@hotelava.com", phone: "+63 940 123 4567", role: "Maintenance", lastLogin: "1 week ago", dateAdded: "2023-08-01", status: "Inactive" },
  { id: "S010", name: "Sofia Lim", email: "sofia@hotelava.com", phone: "+63 951 234 5678", role: "Receptionist", lastLogin: "4 hours ago", dateAdded: "2023-09-12", status: "Active" }
];

const registeredUsers = [
  { id: "U001", name: "Lisa Wong", email: "lisa@email.com", phone: "+63 917 890 1234", totalBookings: 15, totalSpent: 204000, lastStay: "2024-04-14", memberTier: "Gold", registeredDate: "2022-08-12", status: "Active" },
  { id: "U002", name: "Antonio Flores", email: "antonio@email.com", phone: "+63 984 567 8901", totalBookings: 13, totalSpent: 176800, lastStay: "2024-04-13", memberTier: "Gold", registeredDate: "2022-09-08", status: "Active" },
  { id: "U003", name: "Juan Dela Cruz", email: "juan@email.com", phone: "+63 912 345 6789", totalBookings: 12, totalSpent: 156000, lastStay: "2024-04-10", memberTier: "Gold", registeredDate: "2023-01-15", status: "Active" },
  { id: "U004", name: "Carla Mendoza", email: "carla@email.com", phone: "+63 973 456 7890", totalBookings: 9, totalSpent: 122400, lastStay: "2024-04-11", memberTier: "Silver", registeredDate: "2022-12-15", status: "Active" },
  { id: "U005", name: "Ramon Cruz", email: "ramon@email.com", phone: "+63 928 901 2345", totalBookings: 6, totalSpent: 81600, lastStay: "2024-03-30", memberTier: "Silver", registeredDate: "2023-05-18", status: "Active" },
  { id: "U006", name: "Maria Santos", email: "maria@email.com", phone: "+63 923 456 7890", totalBookings: 5, totalSpent: 68000, lastStay: "2024-04-12", memberTier: "Silver", registeredDate: "2023-03-20", status: "Active" },
  { id: "U007", name: "Sofia Lim", email: "sofia@email.com", phone: "+63 951 234 5678", totalBookings: 4, totalSpent: 54400, lastStay: "2024-03-28", memberTier: "Regular", registeredDate: "2023-07-14", status: "Active" },
  { id: "U008", name: "Ana Garcia", email: "ana@email.com", phone: "+63 934 567 8901", totalBookings: 3, totalSpent: 40800, lastStay: "2024-03-25", memberTier: "Regular", registeredDate: "2023-06-10", status: "Active" },
  { id: "U009", name: "Pedro Reyes", email: "pedro@email.com", phone: "+63 945 678 9012", totalBookings: 1, totalSpent: 13600, lastStay: "2024-02-14", memberTier: "Regular", registeredDate: "2024-02-01", status: "Pending" },
  { id: "U010", name: "Carlos Tan", email: "carlos@email.com", phone: "+63 956 789 0123", totalBookings: 8, totalSpent: 95200, lastStay: "2024-04-05", memberTier: "Silver", registeredDate: "2022-11-05", status: "Suspended" },
  { id: "U011", name: "Roberto Aquino", email: "roberto@email.com", phone: "+63 962 345 6789", totalBookings: 7, totalSpent: 88400, lastStay: "2024-04-02", memberTier: "Silver", registeredDate: "2023-02-28", status: "Active" },
  { id: "U012", name: "Miguel Torres", email: "miguel@email.com", phone: "+63 940 123 4567", totalBookings: 11, totalSpent: 149600, lastStay: "2024-04-08", memberTier: "Gold", registeredDate: "2022-10-22", status: "Active" },
  { id: "U013", name: "Elena Diaz", email: "elena@email.com", phone: "+63 939 012 3456", totalBookings: 2, totalSpent: 27200, lastStay: "2024-03-10", memberTier: "Regular", registeredDate: "2023-12-01", status: "Active" },
  { id: "U014", name: "Beatriz Ramos", email: "beatriz@email.com", phone: "+63 995 678 9012", totalBookings: 2, totalSpent: 27200, lastStay: "2024-01-20", memberTier: "Regular", registeredDate: "2024-01-10", status: "Blocked" },
  { id: "U015", name: "Vicente Lopez", email: "vicente@email.com", phone: "+63 906 789 0123", totalBookings: 10, totalSpent: 136000, lastStay: "2024-04-09", memberTier: "Gold", registeredDate: "2023-04-05", status: "Active" }
];

const guestUsers = [
  { id: "G001", name: "Carlos Lim", email: "carlos.guest@email.com", phone: "+63 911 222 3333", bookingCount: 20, lastVisit: "2024-04-15", firstBooking: "2022-11-20", totalSpent: 272000 },
  { id: "G002", name: "Sofia Rivera", email: null, phone: "+63 916 222 7777", bookingCount: 1, lastVisit: "2024-04-15", firstBooking: "2024-04-15", totalSpent: 13600 },
  { id: "G003", name: "Fernando Valdez", email: "fernando@email.com", phone: "+63 966 777 8888", bookingCount: 12, lastVisit: "2024-04-14", firstBooking: "2023-02-18", totalSpent: 163200 },
  { id: "G004", name: "Carmen Villanueva", email: null, phone: "+63 909 000 1111", bookingCount: 9, lastVisit: "2024-04-13", firstBooking: "2023-01-28", totalSpent: 122400 },
  { id: "G005", name: "Diego Santos", email: "diego@email.com", phone: "+63 922 333 4444", bookingCount: 3, lastVisit: "2024-04-12", firstBooking: "2023-08-05", totalSpent: 40800 },
  { id: "G006", name: "Isabel Morales", email: null, phone: "+63 933 444 5555", bookingCount: 15, lastVisit: "2024-04-10", firstBooking: "2022-12-01", totalSpent: 204000 },
  { id: "G007", name: "Ricardo Gomez", email: "ricardo@email.com", phone: "+63 944 555 6666", bookingCount: 5, lastVisit: "2024-04-08", firstBooking: "2023-05-15", totalSpent: 68000 },
  { id: "G008", name: "Melissa Cruz", email: null, phone: "+63 955 666 7777", bookingCount: 2, lastVisit: "2024-03-28", firstBooking: "2024-01-10", totalSpent: 27200 },
  { id: "G009", name: "Pedro Reyes", email: null, phone: "+63 917 888 4321", bookingCount: 8, lastVisit: "2024-04-05", firstBooking: "2023-06-10", totalSpent: 95200 },
  { id: "G010", name: "Gabriela Torres", email: null, phone: "+63 977 888 9999", bookingCount: 4, lastVisit: "2024-04-11", firstBooking: "2023-09-22", totalSpent: 54400 },
  { id: "G011", name: "Rodrigo Pascual", email: "rodrigo@email.com", phone: "+63 988 999 0000", bookingCount: 7, lastVisit: "2024-04-09", firstBooking: "2023-04-12", totalSpent: 88400 },
  { id: "G012", name: "Alejandro Ramos", email: "alejandro@email.com", phone: "+63 920 111 2222", bookingCount: 6, lastVisit: "2024-04-07", firstBooking: "2023-07-05", totalSpent: 81600 },
  { id: "G013", name: "Lucia Fernandez", email: null, phone: "+63 931 222 3333", bookingCount: 11, lastVisit: "2024-04-06", firstBooking: "2022-10-14", totalSpent: 149600 },
  { id: "G014", name: "Javier Mendez", email: "javier@email.com", phone: "+63 942 333 4444", bookingCount: 1, lastVisit: "2024-02-20", firstBooking: "2024-02-20", totalSpent: 13600 },
  { id: "G015", name: "Rosa Delgado", email: null, phone: "+63 953 444 5555", bookingCount: 13, lastVisit: "2024-04-04", firstBooking: "2023-03-10", totalSpent: 176800 }
];

const stats = {
  totalBookings: 127,
  totalTrend: 12,
  checkinToday: 8,
  checkinTrend: 3,
  checkoutToday: 5,
  checkoutTrend: -1,
  revenueToday: 124500,
  revenueTrend: 8
};

const roomStatus = {
  occupied: 38,
  available: 10,
  maintenance: 2,
  total: 50
};

const bookingTrends = [
  { day: 'Mon', count: 18 },
  { day: 'Tue', count: 24 },
  { day: 'Wed', count: 20 },
  { day: 'Thu', count: 28 },
  { day: 'Fri', count: 35 },
  { day: 'Sat', count: 42 },
  { day: 'Sun', count: 38 },
];

const hotelRooms = [
  { no: '101', type: 'Ava Deluxe', status: 'occupied', guest: 'Juan Dela Cruz' },
  { no: '102', type: 'Ava Deluxe', status: 'available', guest: '' },
  { no: '103', type: 'Ava Deluxe Twin', status: 'occupied', guest: 'Ana Garcia' },
  { no: '104', type: 'Ava Deluxe Twin', status: 'maintenance', guest: '' },
  { no: '111', type: 'Ava Premier', status: 'available', guest: '' },
  { no: '112', type: 'Ava Premier', status: 'occupied', guest: 'Miguel Torres' },
  { no: '205', type: 'Ava Executive', status: 'occupied', guest: 'Maria Santos' },
  { no: '301', type: 'Ava Grand Suite', status: 'occupied', guest: 'Carlos Lim' },
  { no: '401', type: 'Ava Penthouse', status: 'available', guest: '' },
];

// ── Helpers ───────────────────────────────────────────────
function formatPeso(amount) {
  return '₱' + amount.toLocaleString();
}

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function formatLongDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
}

function isRecent(dateStr, days = 7) {
  const d = new Date(dateStr);
  const diff = (new Date() - d) / (1000 * 60 * 60 * 24);
  return diff < days;
}

function statusLabel(s) {
  const labels = { confirmed: 'Confirmed', pending: 'Pending', cancelled: 'Cancelled', checkedin: 'Checked In', checkedout: 'Checked Out' };
  return labels[s] || s;
}

function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

function maskPhone(phone) {
  return phone ? phone.replace(/(\d{3})\s\d{4}$/, "$1 XXXX") : '—';
}

function getTierBadge(bookings) {
  if (bookings >= 10) return '<span class="badge badge--gold">🥇 Gold</span>';
  if (bookings >= 5) return '<span class="badge badge--silver">🥈 Silver</span>';
  return '<span class="badge badge--regular">Regular</span>';
}

function getRoleBadge(role) {
  const colors = {
    'Administrator': '#7A1B55',
    'Manager': '#77BCBC',
    'Receptionist': '#2196F3',
    'Maintenance': 'var(--medium-gray)'
  };
  return `<span class="badge" style="background:${colors[role] || '#666'}; color:white; border:none;">${role}</span>`;
}

function getStatusBadge(status) {
  const colors = {
    'Active': 'badge--success',
    'Pending': 'badge--warning',
    'Suspended': 'badge--danger',
    'Blocked': 'badge--danger',
    'Inactive': 'badge--danger'
  };
  const icon = status === 'Active' ? '✓' : (status === 'Pending' ? '⚠' : (status === 'Blocked' ? '🚫' : '⛔'));
  return `<span class="badge ${colors[status] || ''}">${icon} ${status}</span>`;
}

// ── Initialize ────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderPage('dashboard');
  setupSidebarNav();
});

// ── View Routing ──────────────────────────────────────────
function renderPage(page) {
  const main = document.getElementById('dashboard-content');
  if (!main) return;
  main.innerHTML = '';

  // Update Breadcrumb & Title
  const titleMap = {
    'dashboard': ['Dashboard', 'Admin / Dashboard'],
    'bookings': ['Bookings', 'Admin / Bookings'],
    'rooms': ['Rooms', 'Admin / Rooms'],
    'user-management': ['Registered Users', 'Admin / Registered Users'],
    'guest-management': ['Guest Management', 'Admin / Guest Management'],
    'staff-management': ['Staff Management', 'Admin / Staff Management']
  };
  
  if (titleMap[page]) {
    document.getElementById('page-title').textContent = titleMap[page][0];
    document.getElementById('page-breadcrumb').textContent = titleMap[page][1];
  }

  // Update Nav Active State
  document.querySelectorAll('.sidebar__link').forEach(link => {
    link.classList.toggle('active', link.getAttribute('data-page') === page);
  });

  switch (page) {
    case 'dashboard': renderDashboardView(main); break;
    case 'bookings': renderBookingsView(main); break;
    case 'rooms': renderRoomsView(main); break;
    case 'user-management': renderUserManagementView(main); break;
    case 'guest-management': renderGuestManagementView(main); break;
    case 'staff-management': renderStaffManagementView(main); break;
    default: renderDashboardView(main);
  }
}

function setupSidebarNav() {
  document.querySelectorAll('.sidebar__link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const page = link.getAttribute('data-page');
      if (page) renderPage(page);
    });
  });
}

// ── Dashboard View ────────────────────────────────────────
function renderDashboardView(container) {
  container.innerHTML = `
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-card__info">
          <div class="stat-card__label">Total Bookings</div>
          <div class="stat-card__value">${stats.totalBookings}</div>
          <div class="stat-card__trend trend--up">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
            ${stats.totalTrend}% vs last month
          </div>
        </div>
        <div class="stat-card__icon" style="background: rgba(122, 27, 85, 0.1); color: #7A1B55;">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-card__info">
          <div class="stat-card__label">Check-ins Today</div>
          <div class="stat-card__value">${stats.checkinToday}</div>
          <div class="stat-card__trend trend--up">+${stats.checkinTrend} more than yesterday</div>
        </div>
        <div class="stat-card__icon" style="background: rgba(40, 167, 69, 0.1); color: #28a745;">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" x2="3" y1="12" y2="12"/></svg>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-card__info">
          <div class="stat-card__label">Check-outs Today</div>
          <div class="stat-card__value">${stats.checkoutToday}</div>
          <div class="stat-card__trend trend--down">${stats.checkoutTrend} vs expected</div>
        </div>
        <div class="stat-card__icon" style="background: rgba(220, 53, 69, 0.1); color: #dc3545;">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-card__info">
          <div class="stat-card__label">Revenue Today</div>
          <div class="stat-card__value">${formatPeso(stats.revenueToday)}</div>
          <div class="stat-card__trend trend--up">${stats.revenueTrend}% since 8 AM</div>
        </div>
        <div class="stat-card__icon" style="background: rgba(119, 188, 188, 0.12); color: #77BCBC;">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
        </div>
      </div>
    </div>

    <div class="dashboard-grid">
      <div class="chart-card">
        <div class="chart-card__header">
          <h3 class="chart-card__title">Booking Trends</h3>
          <select class="chart-card__filter">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
          </select>
        </div>
        <div class="chart-container">
          <canvas id="bookingTrendChart"></canvas>
        </div>
      </div>
      <div class="chart-card">
        <div class="chart-card__header">
          <h3 class="chart-card__title">Room Availability</h3>
        </div>
        <div class="chart-container" style="display: flex; align-items: center; justify-content: space-around;">
          <canvas id="roomAvailabilityChart" style="max-width: 200px;"></canvas>
          <div class="room-stats">
            <div class="room-stat-item">
              <span class="room-stat-dot" style="background:#7A1B55"></span>
              <span>Occupied</span>
              <strong>${roomStatus.occupied}</strong>
            </div>
            <div class="room-stat-item">
              <span class="room-stat-dot" style="background:#77BCBC"></span>
              <span>Available</span>
              <strong>${roomStatus.available}</strong>
            </div>
            <div class="room-stat-item">
              <span class="room-stat-dot" style="background:#E5E5E5"></span>
              <span>Maintenance</span>
              <strong>${roomStatus.maintenance}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="table-card">
      <div class="table-card__header">
        <h3 class="table-card__title">Recent Bookings</h3>
        <button class="btn btn--outline btn--sm" onclick="renderPage('bookings')">View All</button>
      </div>
      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Guest</th>
              <th>Room</th>
              <th>Check-in</th>
              <th>Status</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${bookings.map(b => `
              <tr>
                <td><span class="text-muted">${b.id}</span></td>
                <td>
                  <div class="guest-cell">
                    <div class="staff-avatar">${b.initials}</div>
                    <div class="guest-info">
                      <div class="guest-name">${b.guest}</div>
                      <div class="guest-email">${b.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="room-info">
                    <div class="room-no">${b.room}</div>
                    <div class="room-type">${b.type}</div>
                  </div>
                </td>
                <td>${formatDate(b.checkin)}</td>
                <td><span class="badge badge--${b.status}">${statusLabel(b.status)}</span></td>
                <td><strong>${formatPeso(b.amount)}</strong></td>
                <td>
                  <button class="btn-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
  
  // Fake charts using standard Canvas API
  setTimeout(() => {
    drawTrendChart();
    drawDonutChart();
  }, 100);
}

// ── Chart Drawing Logic ───────────────────────────────────
function drawTrendChart() {
  const canvas = document.getElementById('bookingTrendChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.parentElement.clientWidth;
  const h = 200;
  canvas.width = w;
  canvas.height = h;

  ctx.strokeStyle = '#7A1B55';
  ctx.lineWidth = 3;
  ctx.beginPath();
  
  const step = w / (bookingTrends.length - 1);
  bookingTrends.forEach((t, i) => {
    const x = i * step;
    const y = h - (t.count * 4);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
    
    // Points
    ctx.fillStyle = '#7A1B55';
    ctx.fillRect(x-3, y-3, 6, 6);
  });
  ctx.stroke();
  
  // Fill under
  ctx.lineTo(w, h);
  ctx.lineTo(0, h);
  ctx.fillStyle = 'rgba(122, 27, 85, 0.05)';
  ctx.fill();
}

function drawDonutChart() {
  const canvas = document.getElementById('roomAvailabilityChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const size = 200;
  canvas.width = size;
  canvas.height = size;
  
  const data = [roomStatus.occupied, roomStatus.available, roomStatus.maintenance];
  const colors = ['#7A1B55', '#77BCBC', '#E5E5E5'];
  const total = data.reduce((a, b) => a + b, 0);
  
  let startAngle = -Math.PI / 2;
  data.forEach((val, i) => {
    const sliceAngle = (val / total) * 2 * Math.PI;
    ctx.fillStyle = colors[i];
    ctx.beginPath();
    ctx.moveTo(size/2, size/2);
    ctx.arc(size/2, size/2, size/2, startAngle, startAngle + sliceAngle);
    ctx.closePath();
    ctx.fill();
    startAngle += sliceAngle;
  });
  
  // Inner circle
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.arc(size/2, size/2, size/3, 0, 2 * Math.PI);
  ctx.fill();
  
  ctx.fillStyle = '#2C2C2C';
  ctx.font = 'bold 20px Poppins';
  ctx.textAlign = 'center';
  ctx.fillText(Math.round((roomStatus.occupied/total)*100) + '%', size/2, size/2 + 7);
}

// ── Bookings View ─────────────────────────────────────────
function renderBookingsView(container) {
  container.innerHTML = `
    <div class="view-header">
      <div class="view-header__filters">
        <select class="chart-card__filter">
          <option>All Status</option>
          <option>Confirmed</option>
          <option>Pending</option>
          <option>Checked In</option>
        </select>
        <input type="date" class="chart-card__filter" value="2026-04-16">
      </div>
      <div class="view-header__actions">
        <button class="btn btn--outline">Download Report</button>
        <button class="btn btn--primary">+ New Booking</button>
      </div>
    </div>
    <div class="table-container" style="background: white; border-radius: 12px; border: 1px solid var(--light-gray); overflow: hidden;">
        <table class="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Guest</th>
              <th>Room</th>
              <th>Check-in</th>
              <th>Check-out</th>
              <th>Status</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${bookings.map(b => `
              <tr>
                <td class="text-muted">${b.id}</td>
                <td><strong class="clickable-name" onclick="viewUserProfile('${b.id}')">${b.guest}</strong></td>
                <td>${b.room}</td>
                <td>${formatDate(b.checkin)}</td>
                <td>${formatDate(b.checkout)}</td>
                <td><span class="badge badge--${b.status}">${statusLabel(b.status)}</span></td>
                <td><strong>${formatPeso(b.amount)}</strong></td>
                <td><button class="btn-icon">•••</button></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
    </div>
  `;
}

// ── Rooms View ────────────────────────────────────────────
function renderRoomsView(container) {
  container.innerHTML = `
    <div class="view-header">
      <div class="view-header__filters">
        <select class="chart-card__filter">
          <option>All Floors</option>
          <option>1st Floor</option>
          <option>2nd Floor</option>
        </select>
      </div>
    </div>
    <div class="rooms-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 20px;">
      ${hotelRooms.map(r => `
        <div class="room-status-card" style="background:white; padding:16px; border-radius:12px; border:1px solid var(--light-gray); text-align:center;">
          <div style="font-size:12px; color:#666; margin-bottom:4px;">${r.type}</div>
          <div style="font-size:24px; font-weight:700; color:#7A1B55; margin-bottom:8px;">${r.no}</div>
          <div class="badge badge--${r.status}" style="width:100%; display:block; margin-bottom:12px;">${r.status.toUpperCase()}</div>
          <div style="font-size:12px; color:${r.guest ? '#2C2C2C' : '#999'}">${r.guest || 'Vacant'}</div>
        </div>
      `).join('')}
    </div>
  `;
}

// ── Final Management Views ─────────────────────────────────

function renderUserManagementView(container) {
  let filteredUsers = [...registeredUsers];
  let searchQuery = '';
  let statusFilter = 'All Users';
  let sortKey = 'Recent Activity';
  let currentPage = 1;
  const itemsPerPage = 10;

  function updateList() {
    let list = registeredUsers.filter(u => {
      const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             u.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'All Users' || 
                             (statusFilter === 'Suspended' && u.status === 'Suspended') ||
                             (statusFilter === 'Blocked' && u.status === 'Blocked') ||
                             (statusFilter === 'Active Only' && u.status === 'Active') ||
                             (statusFilter === 'Gold Members' && u.memberTier === 'Gold') ||
                             (statusFilter === 'Silver Members' && u.memberTier === 'Silver') ||
                             (statusFilter === 'Regular Members' && u.memberTier === 'Regular');
      return matchesSearch && matchesStatus;
    });

    if (sortKey === 'Name (A-Z)') list.sort((a,b) => a.name.localeCompare(b.name));
    else if (sortKey === 'Most Bookings') list.sort((a,b) => b.totalBookings - a.totalBookings);
    else if (sortKey === 'Total Spent') list.sort((a,b) => b.totalSpent - a.totalSpent);
    else if (sortKey === 'Registration Date') list.sort((a,b) => new Date(b.registeredDate) - new Date(a.registeredDate));
    else list.sort((a,b) => new Date(b.lastStay) - new Date(a.lastStay));

    filteredUsers = list;
    render();
  }

  function render() {
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const startIdx = (currentPage - 1) * itemsPerPage;
    const paginatedUsers = filteredUsers.slice(startIdx, startIdx + itemsPerPage);

    container.innerHTML = `
      <div class="view-header">
        <div class="view-header__top">
          <div>
            <h2 class="view-header__title">Registered Users</h2>
            <p class="view-header__subtitle">Admin / Registered Users</p>
          </div>
          <div class="view-header__actions">
            <button class="btn btn--outline" onclick="handleExport('registered-users')">Export CSV</button>
            <button class="btn btn--primary" onclick="handleAddUser()">+ Add User</button>
          </div>
        </div>

        <div class="action-bar">
          <div class="action-bar__search">
            <input type="text" class="topbar__search-input" id="user-search" placeholder="Search users by name or email..." value="${searchQuery}">
          </div>
          <div class="action-bar__filters">
            <select class="chart-card__filter" id="user-status-filter">
              <option ${statusFilter === 'All Users' ? 'selected' : ''}>All Users</option>
              <option ${statusFilter === 'Gold Members' ? 'selected' : ''}>Gold Members</option>
              <option ${statusFilter === 'Silver Members' ? 'selected' : ''}>Silver Members</option>
              <option ${statusFilter === 'Regular Members' ? 'selected' : ''}>Regular Members</option>
              <option ${statusFilter === 'Active Only' ? 'selected' : ''}>Active Only</option>
              <option ${statusFilter === 'Suspended' ? 'selected' : ''}>Suspended</option>
              <option ${statusFilter === 'Blocked' ? 'selected' : ''}>Blocked</option>
            </select>
            <select class="chart-card__filter" id="user-sort-filter">
              <option ${sortKey === 'Recent Activity' ? 'selected' : ''}>Recent Activity</option>
              <option ${sortKey === 'Name (A-Z)' ? 'selected' : ''}>Name (A-Z)</option>
              <option ${sortKey === 'Most Bookings' ? 'selected' : ''}>Most Bookings</option>
              <option ${sortKey === 'Total Spent' ? 'selected' : ''}>Total Spent</option>
              <option ${sortKey === 'Registration Date' ? 'selected' : ''}>Registration Date</option>
            </select>
          </div>
        </div>
      </div>

      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th class="text-center">Total Bookings</th>
              <th>Last Stay</th>
              <th>Member Tier</th>
              <th>Account Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${paginatedUsers.length ? paginatedUsers.map(u => `
              <tr>
                <td>
                  <div class="staff-avatar">${getInitials(u.name)}</div>
                </td>
                <td><strong class="clickable-name" onclick="viewUserProfile('${u.id}')">${u.name}</strong></td>
                <td class="text-muted">${u.email}</td>
                <td class="text-muted">${maskPhone(u.phone)}</td>
                <td class="text-center"><strong>${u.totalBookings}</strong></td>
                <td><span class="${isRecent(u.lastStay) ? 'text-success' : 'text-muted'}">${formatLongDate(u.lastStay)}</span></td>
                <td>${getTierBadge(u.totalBookings)}</td>
                <td>${getStatusBadge(u.status)}</td>
                <td>
                  <div class="action-menu-container">
                    <button class="btn-icon" onclick="toggleActionMenu(event, '${u.id}')">•••</button>
                    <div class="action-menu" id="menu-${u.id}">
                      <div class="action-menu__item" onclick="viewUserProfile('${u.id}')">👁️ View Full Profile</div>
                      <div class="action-menu__item" onclick="viewUserHistory('${u.id}')">📋 View Booking History</div>
                      <div class="action-menu__item" onclick="sendUserEmail('${u.id}')">✉️ Send Email</div>
                      <div class="action-menu__divider"></div>
                      <div class="action-menu__item text-warning" onclick="handleAccountAction('${u.id}', 'Suspend')">⚠️ Suspend Account</div>
                      <div class="action-menu__item text-danger" onclick="handleAccountAction('${u.id}', 'Block')">🚫 Block Account</div>
                      <div class="action-menu__item text-danger" onclick="handleAccountAction('${u.id}', 'Delete')">🗑️ Delete User</div>
                    </div>
                  </div>
                </td>
              </tr>
            `).join('') : `<tr><td colspan="9" class="text-center py-4">No users found matching your criteria.</td></tr>`}
          </tbody>
        </table>
      </div>

      <div class="pagination">
        <div class="pagination__info">Showing ${paginatedUsers.length ? startIdx + 1 : 0} to ${Math.min(startIdx + itemsPerPage, filteredUsers.length)} of ${filteredUsers.length} users</div>
        <div class="pagination__controls">
          <button class="pagination__btn" ${currentPage === 1 ? 'disabled' : ''} onclick="window.changeUserPage(${currentPage - 1})">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          ${Array.from({length: totalPages}, (_, i) => i + 1).map(p => `
            <button class="pagination__btn ${p === currentPage ? 'active' : ''}" onclick="window.changeUserPage(${p})">${p}</button>
          `).join('')}
          <button class="pagination__btn" ${currentPage === totalPages ? 'disabled' : ''} onclick="window.changeUserPage(${currentPage + 1})">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
      </div>
    `;

    document.getElementById('user-search').addEventListener('input', e => {
      searchQuery = e.target.value;
      currentPage = 1;
      updateList();
    });
    document.getElementById('user-status-filter').addEventListener('change', e => {
      statusFilter = e.target.value;
      currentPage = 1;
      updateList();
    });
    document.getElementById('user-sort-filter').addEventListener('change', e => {
      sortKey = e.target.value;
      updateList();
    });

    window.changeUserPage = (p) => {
      currentPage = p;
      render();
    };
  }

  render();
}

function renderGuestManagementView(container) {
  let filteredGuests = [...guestUsers];
  let searchQuery = '';
  let guestFilter = 'All Guests';
  let sortKey = 'Recent Visit';

  function updateList() {
    filteredGuests = guestUsers.filter(g => {
      const matchesSearch = g.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             (g.email && g.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
                             g.phone.includes(searchQuery);
      const matchesFilter = guestFilter === 'All Guests' ||
                             (guestFilter === 'Recent Visitors' && isRecent(g.lastVisit, 30)) ||
                             (guestFilter === 'Frequent Guests' && g.bookingCount >= 10) ||
                             (guestFilter === 'One-time Guests' && g.bookingCount === 1);
      return matchesSearch && matchesFilter;
    });

    if (sortKey === 'Name (A-Z)') filteredGuests.sort((a,b) => a.name.localeCompare(b.name));
    else if (sortKey === 'Most Bookings') filteredGuests.sort((a,b) => b.bookingCount - a.bookingCount);
    else filteredGuests.sort((a,b) => new Date(b.lastVisit) - new Date(a.lastVisit));

    render();
  }

  function render() {
    container.innerHTML = `
      <div class="view-header">
        <div class="view-header__top">
          <div>
            <h2 class="view-header__title">Guest Management</h2>
            <p class="view-header__subtitle">Admin / Guest Management</p>
          </div>
          <div class="view-header__actions">
            <button class="btn btn--outline" onclick="handleExport('guests')">Export CSV</button>
          </div>
        </div>

        <div class="action-bar">
          <div class="action-bar__search">
            <input type="text" class="topbar__search-input" id="guest-search" placeholder="Search guests by name, email or phone..." value="${searchQuery}">
          </div>
          <div class="action-bar__filters">
            <select class="chart-card__filter" id="guest-type-filter">
              <option ${guestFilter === 'All Guests' ? 'selected' : ''}>All Guests</option>
              <option ${guestFilter === 'Recent Visitors' ? 'selected' : ''}>Recent Visitors</option>
              <option ${guestFilter === 'Frequent Guests' ? 'selected' : ''}>Frequent Guests</option>
              <option ${guestFilter === 'One-time Guests' ? 'selected' : ''}>One-time Guests</option>
            </select>
            <select class="chart-card__filter" id="guest-sort-filter">
              <option ${sortKey === 'Recent Visit' ? 'selected' : ''}>Recent Visit</option>
              <option ${sortKey === 'Most Bookings' ? 'selected' : ''}>Most Bookings</option>
              <option ${sortKey === 'Name (A-Z)' ? 'selected' : ''}>Name (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Guest Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th class="text-center">Booking Count</th>
              <th>Last Visit</th>
              <th>System Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${filteredGuests.map(g => `
              <tr>
                <td>
                  <div style="display:flex; flex-direction:column; gap:4px;">
                    <strong class="clickable-name" onclick="viewGuestDetails('${g.id}')">${g.name}</strong>
                    ${g.bookingCount >= 10 ? '<span class="badge badge--gold" style="width:fit-content; font-size:10px; padding:2px 8px;">⭐ Frequent Guest</span>' : ''}
                  </div>
                </td>
                <td class="text-muted">${g.email || '—'}</td>
                <td class="text-muted">${maskPhone(g.phone)}</td>
                <td class="text-center">
                  <strong class="${g.bookingCount >= 10 ? 'text-danger' : ''}">${g.bookingCount}</strong>
                </td>
                <td><span class="${isRecent(g.lastVisit) ? 'text-success' : 'text-muted'}">${formatLongDate(g.lastVisit)}</span></td>
                <td>
                  <span class="badge" style="background:#F8F9FA; color:#666; border:1px solid #E5E5E5;">
                    👤 Guest User
                  </span>
                </td>
                <td>
                  <div class="action-menu-container">
                    <button class="btn-icon" onclick="toggleActionMenu(event, '${g.id}')">•••</button>
                    <div class="action-menu" id="menu-${g.id}">
                      <div class="action-menu__item" onclick="viewGuestHistory('${g.id}')">👁️ View Booking History</div>
                      <div class="action-menu__item" onclick="viewGuestDetails('${g.id}')">📋 View Guest Details</div>
                      <div class="action-menu__item ${!g.email ? 'disabled' : ''}" onclick="${g.email ? `sendUserEmail('${g.id}')` : ''}">✉️ Send Email</div>
                      <div class="action-menu__divider"></div>
                      <div class="action-menu__item text-primary" onclick="inviteToRegister('${g.id}')">➕ Convert to Registered User</div>
                      <div class="action-menu__item text-danger" onclick="handleAccountAction('${g.id}', 'Delete')">🗑️ Delete Guest Record</div>
                    </div>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;

    document.getElementById('guest-search').addEventListener('input', e => {
      searchQuery = e.target.value;
      updateList();
    });
    document.getElementById('guest-type-filter').addEventListener('change', e => {
      guestFilter = e.target.value;
      updateList();
    });
    document.getElementById('guest-sort-filter').addEventListener('change', e => {
      sortKey = e.target.value;
      updateList();
    });
  }

  render();
}

function renderStaffManagementView(container) {
  let filteredStaff = [...staffMembers];
  let searchQuery = '';
  let roleFilter = 'All Roles';
  let sortKey = 'Name';

  function updateList() {
    filteredStaff = staffMembers.filter(s => {
      const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             s.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRole = roleFilter === 'All Roles' || 
                           s.role === roleFilter ||
                           (roleFilter === 'Active Only' && s.status === 'Active') ||
                           (roleFilter === 'Inactive Only' && s.status === 'Inactive');
      return matchesSearch && matchesRole;
    });

    if (sortKey === 'Name') filteredStaff.sort((a,b) => a.name.localeCompare(b.name));
    else if (sortKey === 'Role') filteredStaff.sort((a,b) => a.role.localeCompare(b.role));
    else if (sortKey === 'Date Added') filteredStaff.sort((a,b) => new Date(b.dateAdded) - new Date(a.dateAdded));
    else filteredStaff.sort((a,b) => b.lastLogin.localeCompare(a.lastLogin)); // Simple string sort for mock

    render();
  }

  function render() {
    container.innerHTML = `
      <div class="view-header">
        <div class="view-header__top">
          <div>
            <h2 class="view-header__title">Staff Management</h2>
            <p class="view-header__subtitle">Admin / Staff Management</p>
          </div>
          <div class="view-header__actions">
            <button class="btn btn--outline" onclick="handleExport('staff')">Export CSV</button>
            <button class="btn btn--primary" onclick="handleAddStaff()">+ Add Staff</button>
          </div>
        </div>

        <div class="action-bar">
          <div class="action-bar__search">
            <input type="text" class="topbar__search-input" id="staff-search" placeholder="Search staff by name or email..." value="${searchQuery}">
          </div>
          <div class="action-bar__filters">
            <select class="chart-card__filter" id="staff-role-filter">
              <option>All Roles</option>
              <option>Administrator</option>
              <option>Manager</option>
              <option>Receptionist</option>
              <option>Maintenance</option>
              <option>Active Only</option>
              <option>Inactive Only</option>
            </select>
            <select class="chart-card__filter" id="staff-sort-filter">
              <option>Name</option>
              <option>Role</option>
              <option>Recent Login</option>
              <option>Date Added</option>
            </select>
          </div>
        </div>
      </div>

      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Staff Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Last Login</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${filteredStaff.map(s => `
              <tr>
                <td><div class="staff-avatar">${getInitials(s.name)}</div></td>
                <td><strong class="clickable-name" onclick="viewStaffProfile('${s.id}')">${s.name}</strong></td>
                <td class="text-muted">${s.email}</td>
                <td class="text-muted">${maskPhone(s.phone)}</td>
                <td>${getRoleBadge(s.role)}</td>
                <td><span class="${s.lastLogin.includes('hours') || s.lastLogin.includes('minutes') || s.lastLogin.includes('now') ? 'text-success' : 'text-muted'}">${s.lastLogin}</span></td>
                <td>
                  ${getStatusBadge(s.status)}
                </td>
                <td>
                  <div class="action-menu-container">
                    <button class="btn-icon" onclick="toggleActionMenu(event, '${s.id}')">•••</button>
                    <div class="action-menu" id="menu-${s.id}">
                      <div class="action-menu__item" onclick="viewStaffProfile('${s.id}')">👁️ View Profile</div>
                      <div class="action-menu__item" onclick="editStaffInfo('${s.id}')">✏️ Edit Staff Info</div>
                      <div class="action-menu__item" onclick="resetPassword('${s.id}')">🔑 Reset Password</div>
                      <div class="action-menu__divider"></div>
                      <div class="action-menu__item text-danger" onclick="handleAccountAction('${s.id}', 'Deactivate')">⛔ Deactivate Account</div>
                      <div class="action-menu__item text-danger" onclick="handleAccountAction('${s.id}', 'Remove')">🗑️ Remove Staff</div>
                    </div>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;

    document.getElementById('staff-search').addEventListener('input', e => {
      searchQuery = e.target.value;
      updateList();
    });
    document.getElementById('staff-role-filter').addEventListener('change', e => {
      roleFilter = e.target.value;
      updateList();
    });
    document.getElementById('staff-sort-filter').addEventListener('change', e => {
      sortKey = e.target.value;
      updateList();
    });
  }

  render();
}

// ── Modals & Actions ──────────────────────────────────────
function createModal(title, content) {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay active';
  modal.innerHTML = `
    <div class="modal-container" style="max-width: 600px;">
      <div class="modal-header">
        <h3 class="modal-title">${title}</h3>
        <button class="modal-close" onclick="closeModal()">✕</button>
      </div>
      <div class="modal-body">
        ${content}
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

window.closeModal = function() {
  const modal = document.querySelector('.modal-overlay');
  if (modal) {
    modal.classList.remove('active');
    setTimeout(() => modal.remove(), 300);
  }
};

window.toggleActionMenu = function(event, id) {
  event.stopPropagation();
  const menu = document.getElementById(`menu-${id}`);
  const allMenus = document.querySelectorAll('.action-menu');
  allMenus.forEach(m => { if(m !== menu) m.classList.remove('active'); });
  if (menu) menu.classList.toggle('active');
};

document.addEventListener('click', () => {
  document.querySelectorAll('.action-menu').forEach(m => m.classList.remove('active'));
});

window.viewUserProfile = function(id) {
  const u = registeredUsers.find(user => user.id === id);
  if (!u) return;
  const content = `
    <div class="profile-modal">
      <div style="display:flex; gap:20px; align-items:center;">
        <div class="staff-avatar" style="width:80px; height:80px; font-size:32px;">${getInitials(u.name)}</div>
        <div>
          <h2 style="margin:0">${u.name}</h2>
          <p class="text-muted" style="margin:4px 0">${u.email}</p>
          <p class="text-muted" style="margin:4px 0">${u.phone}</p>
          <div style="margin-top:8px">${getTierBadge(u.totalBookings)}</div>
          <p class="text-muted" style="font-size:12px; margin-top:8px">Member since: ${formatLongDate(u.registeredDate)}</p>
        </div>
      </div>
      
      <div style="margin-top:24px; padding-top:16px; border-top:1px solid var(--light-gray)">
        <label style="font-weight:600; font-size:14px; display:block; margin-bottom:8px">Account Status:</label>
        <select class="chart-card__filter" style="width:100%" onchange="updateUserStatus('${u.id}', this.value)">
          <option ${u.status === 'Active' ? 'selected' : ''}>Active</option>
          <option ${u.status === 'Suspended' ? 'selected' : ''}>Suspended</option>
          <option ${u.status === 'Blocked' ? 'selected' : ''}>Blocked</option>
        </select>
      </div>

      <div style="margin-top:24px; display:grid; grid-template-columns:1fr 1fr; gap:16px; background:#F8F9FA; padding:16px; border-radius:8px;">
        <div>
          <p class="text-muted" style="font-size:12px; margin:0">Total Bookings</p>
          <p style="font-weight:700; font-size:18px; margin:4px 0">${u.totalBookings}</p>
        </div>
        <div>
          <p class="text-muted" style="font-size:12px; margin:0">Total Spent</p>
          <p style="font-weight:700; font-size:18px; margin:4px 0">${formatPeso(u.totalSpent)}</p>
        </div>
        <div>
          <p class="text-muted" style="font-size:12px; margin:0">Last Stay</p>
          <p style="font-weight:600; font-size:14px; margin:4px 0">${formatLongDate(u.lastStay)}</p>
        </div>
        <div>
          <p class="text-muted" style="font-size:12px; margin:0">Member Tier</p>
          <p style="font-weight:600; font-size:14px; margin:4px 0">${u.memberTier}</p>
        </div>
      </div>

      <div style="margin-top:24px">
        <label style="font-weight:600; font-size:14px; display:block; margin-bottom:12px">Recent Bookings:</label>
        <div style="border:1px solid var(--light-gray); border-radius:8px; overflow:hidden">
          <div style="padding:10px 16px; border-bottom:1px solid var(--light-gray); display:flex; justify-content:space-between; font-size:13px">
            <span>#1234 • Deluxe 101</span>
            <strong>${formatPeso(13600)}</strong>
          </div>
          <div style="padding:10px 16px; display:flex; justify-content:space-between; font-size:13px">
            <span>#1189 • Suite 205</span>
            <strong>${formatPeso(19000)}</strong>
          </div>
        </div>
      </div>

      <div style="margin-top:32px; display:flex; gap:12px">
        <button class="btn btn--outline" style="flex:1" onclick="viewUserHistory('${u.id}')">View All Bookings</button>
        <button class="btn btn--outline" style="flex:1" onclick="sendUserEmail('${u.id}')">Send Email</button>
        <button class="btn btn--danger" style="flex:1" onclick="handleAccountAction('${u.id}', 'Suspend')">Suspend</button>
      </div>
    </div>
  `;
  createModal('User Profile', content);
};

window.viewStaffProfile = function(id) {
  const s = staffMembers.find(staff => staff.id === id);
  if (!s) return;
  const content = `
    <div class="profile-modal">
      <div style="display:flex; gap:20px; align-items:center;">
        <div class="staff-avatar" style="width:80px; height:80px; font-size:32px;">${getInitials(s.name)}</div>
        <div>
          <h2 style="margin:0">${s.name}</h2>
          <p class="text-muted" style="margin:4px 0">${s.email}</p>
          <p class="text-muted" style="margin:4px 0">${s.phone}</p>
          <div style="margin-top:8px">${getRoleBadge(s.role)}</div>
          <p class="text-muted" style="font-size:12px; margin-top:8px">Member since: ${formatLongDate(s.dateAdded)}</p>
        </div>
      </div>

      <div style="margin-top:24px; padding-top:16px; border-top:1px solid var(--light-gray)">
        <label style="font-weight:600; font-size:14px; display:block; margin-bottom:8px">Status:</label>
        <select class="chart-card__filter" style="width:100%" onchange="updateStaffStatus('${s.id}', this.value)">
          <option ${s.status === 'Active' ? 'selected' : ''}>Active</option>
          <option ${s.status === 'Inactive' ? 'selected' : ''}>Inactive</option>
        </select>
      </div>

      <div style="margin-top:24px">
        <label style="font-weight:600; font-size:14px; display:block; margin-bottom:12px">📊 Activity:</label>
        <ul style="padding:0; margin:0; list-style:none; font-size:13px; color:#555;">
          <li style="margin-bottom:8px">• Last Login: ${s.lastLogin}</li>
          <li style="margin-bottom:8px">• Total Logins: 324</li>
          <li style="margin-bottom:8px">• Account Created: ${formatLongDate(s.dateAdded)}</li>
        </ul>
      </div>

      <div style="margin-top:24px">
        <label style="font-weight:600; font-size:14px; display:block; margin-bottom:12px">🔑 Permissions:</label>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; font-size:13px; color:#555;">
          <div>✓ Manage Bookings</div>
          <div>✓ View Reports</div>
          <div>✓ Manage Users</div>
          <div>✓ Access Settings</div>
          ${s.role === 'Administrator' ? '<div>✓ Full Admin Access</div>' : ''}
        </div>
      </div>

      <div style="margin-top:32px; display:flex; gap:12px">
        <button class="btn btn--outline" style="flex:1" onclick="editStaffInfo('${s.id}')">Edit Profile</button>
        <button class="btn btn--outline" style="flex:1" onclick="resetPassword('${s.id}')">Reset Password</button>
        <button class="btn btn--danger" style="flex:1" onclick="handleAccountAction('${s.id}', 'Deactivate')">${s.status === 'Active' ? 'Deactivate' : 'Activate'}</button>
      </div>
    </div>
  `;
  createModal('Staff Profile', content);
};

window.viewGuestDetails = function(id) {
  const g = guestUsers.find(guest => guest.id === id);
  if (!g) return;
  const content = `
    <div class="profile-modal">
      <h2 style="margin:0">${g.name}</h2>
      <p class="text-muted" style="margin:4px 0">${g.email || 'No email provided'}</p>
      <p class="text-muted" style="margin:4px 0">${g.phone}</p>
      <div style="display:flex; gap:8px; margin-top:8px">
        <span class="badge" style="background:#F8F9FA; color:#666; border:1px solid #E5E5E5;">👤 Guest User</span>
        ${g.bookingCount >= 10 ? '<span class="badge badge--gold">⭐ Frequent Guest</span>' : ''}
      </div>
      <p class="text-muted" style="font-size:12px; margin-top:8px">First visit: ${formatLongDate(g.firstBooking)}</p>

      <div style="margin-top:24px; display:grid; grid-template-columns:1fr 1fr; gap:16px; background:#F8F9FA; padding:16px; border-radius:8px;">
        <div>
          <p class="text-muted" style="font-size:12px; margin:0">Total Bookings</p>
          <p style="font-weight:700; font-size:18px; margin:4px 0">${g.bookingCount}</p>
        </div>
        <div>
          <p class="text-muted" style="font-size:12px; margin:0">Total Spent</p>
          <p style="font-weight:700; font-size:18px; margin:4px 0">${formatPeso(g.totalSpent)}</p>
        </div>
      </div>

      <div style="margin-top:24px">
        <label style="font-weight:600; font-size:14px; display:block; margin-bottom:12px">Recent Bookings:</label>
        <div style="border:1px solid var(--light-gray); border-radius:8px; overflow:hidden">
          <div style="padding:10px 16px; border-bottom:1px solid var(--light-gray); font-size:13px">
            Walk-in • Suite 205 • ${formatLongDate(g.lastVisit)} • <strong>${formatPeso(19000)}</strong>
          </div>
        </div>
      </div>

      <div style="margin-top:32px; display:flex; gap:12px">
        <button class="btn btn--outline" style="flex:1" onclick="viewGuestHistory('${g.id}')">View All Bookings</button>
        <button class="btn btn--primary" style="flex:1" onclick="inviteToRegister('${g.id}')">Invite to Register</button>
      </div>
    </div>
  `;
  createModal('Guest Information', content);
};

window.inviteToRegister = function(id) {
  const g = guestUsers.find(guest => guest.id === id);
  if (!g) return;
  const estTier = g.bookingCount >= 10 ? '🥇 Gold' : (g.bookingCount >= 5 ? '🥈 Silver' : 'Regular');
  const content = `
    <div>
      <p style="margin-bottom:20px; color:var(--dark-gray); line-height:1.5">
        Send an invitation to <strong>${g.name}</strong> to create a registered account.
      </p>
      <div style="margin-bottom:16px">
        <label style="font-size:13px; font-weight:600; display:block; margin-bottom:6px">Email:</label>
        <input type="email" class="topbar__search-input" style="width:100%; padding: 0 12px; border: 1px solid var(--light-gray);" value="${g.email || ''}" placeholder="Enter guest email">
      </div>
      <div style="display:flex; flex-direction:column; gap:12px; margin-bottom:20px">
        <label style="display:flex; align-items:center; gap:8px; font-size:13px">
          <input type="checkbox" checked> Transfer booking history (${g.bookingCount} bookings)
        </label>
        <label style="display:flex; align-items:center; gap:8px; font-size:13px">
          <input type="checkbox" checked> Award loyalty points for past stays (Est. tier: <strong>${estTier}</strong>)
        </label>
      </div>
      <div>
        <label style="font-size:13px; font-weight:600; display:block; margin-bottom:6px">Message (optional):</label>
        <textarea style="width:100%; height:80px; padding:12px; border:1px solid var(--light-gray); border-radius:8px; font-family:inherit; font-size:13px" placeholder="Add a personal message..."></textarea>
      </div>
      <div style="margin-top:32px; display:flex; justify-content:flex-end; gap:12px">
        <button class="btn btn--outline" onclick="closeModal()">Cancel</button>
        <button class="btn btn--primary" onclick="confirmInvite('${g.id}')">Send Invitation</button>
      </div>
    </div>
  `;
  createModal('Invite Guest to Create Account', content);
};

window.confirmInvite = function(id) {
  closeModal();
  alert('Invitation sent successfully!');
};

window.handleAddStaff = function() {
  const content = `
    <div>
      <div style="display:grid; gap:16px">
        <div>
          <label style="font-size:13px; font-weight:600; display:block; margin-bottom:6px">Full Name:</label>
          <input type="text" class="topbar__search-input" style="width:100%; padding:0 12px; border:1px solid var(--light-gray);" placeholder="e.g. Juan Admin">
        </div>
        <div>
          <label style="font-size:13px; font-weight:600; display:block; margin-bottom:6px">Email:</label>
          <input type="email" class="topbar__search-input" style="width:100%; padding:0 12px; border:1px solid var(--light-gray);" placeholder="e.g. juan@hotelava.com">
        </div>
        <div>
          <label style="font-size:13px; font-weight:600; display:block; margin-bottom:6px">Phone:</label>
          <input type="text" class="topbar__search-input" style="width:100%; padding:0 12px; border:1px solid var(--light-gray);" placeholder="+63 XXX XXX XXXX">
        </div>
        <div>
          <label style="font-size:13px; font-weight:600; display:block; margin-bottom:6px">Role:</label>
          <select class="chart-card__filter" style="width:100%">
            <option>Receptionist</option>
            <option>Manager</option>
            <option>Maintenance</option>
            <option>Administrator</option>
          </select>
        </div>
        <div>
          <label style="font-size:13px; font-weight:600; display:block; margin-bottom:6px">Initial Password:</label>
          <input type="password" class="topbar__search-input" style="width:100%; padding:0 12px; border:1px solid var(--light-gray);" value="HotelAva2024!">
          <p style="font-size:11px; color:#666; margin-top:4px">(Staff will be asked to change on first login)</p>
        </div>
      </div>
      <div style="margin-top:32px; display:flex; justify-content:flex-end; gap:12px">
        <button class="btn btn--outline" onclick="closeModal()">Cancel</button>
        <button class="btn btn--primary" onclick="closeModal()">Add Staff Member</button>
      </div>
    </div>
  `;
  createModal('Add New Staff Member', content);
};

window.handleExport = function(type) {
  alert(`Exporting ${type} data as CSV...`);
};

window.handleAccountAction = function(id, action) {
  if (confirm(`Are you sure you want to ${action} this account?`)) {
    alert(`Account ${action}ed successfully.`);
    closeModal();
  }
};

window.updateUserStatus = (id, status) => { alert(`User ${id} status updated to ${status}`); };
window.updateStaffStatus = (id, status) => { alert(`Staff ${id} status updated to ${status}`); };
window.editStaffInfo = (id) => { alert('Edit staff form'); };
window.resetPassword = (id) => { alert('Password reset email sent'); };
window.viewUserHistory = (id) => { alert('Viewing booking history'); };
window.viewGuestHistory = (id) => { alert('Viewing guest visit history'); };
window.sendUserEmail = (id) => { alert('Opening email composer'); };

window.handleAddUser = () => { alert('Add user modal'); };

// ── Mobile Sidebar Toggle ─────────────────────────────────
window.openSidebar = function() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  if (sidebar) sidebar.style.transform = 'translateX(0)';
  if (overlay) {
    overlay.style.display = 'block';
    setTimeout(() => { overlay.style.opacity = '1'; }, 10);
  }
};

window.closeSidebar = function() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  if (overlay) overlay.style.opacity = '0';
  if (sidebar) sidebar.style.transform = 'translateX(-100%)';
  setTimeout(() => {
    if (overlay) overlay.style.display = 'none';
  }, 300);
};

// Auto-close sidebar on link click (mobile)
document.addEventListener('click', (e) => {
  if (window.innerWidth <= 1024 && e.target.closest('.sidebar__link')) {
    closeSidebar();
  }
});

