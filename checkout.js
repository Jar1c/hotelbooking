/* ============================================================
   HOTEL AVA – CHECKOUT LOGIC
   Handles parameter parsing, rendering, and validation
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    initCheckout();
    setupCheckoutListeners();
});

let selectedRoom = null;
let bookingData = {
    roomId: null,
    checkin: '',
    checkout: '',
    nights: 2
};

function initCheckout() {
    const params = new URLSearchParams(window.location.search);
    bookingData.roomId = parseInt(params.get('roomId'));
    bookingData.checkin = params.get('checkin');
    bookingData.checkout = params.get('checkout');

    if (!bookingData.roomId) {
        window.location.href = 'index.html';
        return;
    }

    selectedRoom = rooms.find(r => r.id === bookingData.roomId);
    if (!selectedRoom) {
        window.location.href = 'index.html';
        return;
    }

    calculateNights();
    renderSummary();
    updateDatesInUI();
}

function calculateNights() {
    if (bookingData.checkin && bookingData.checkout) {
        const d1 = new Date(bookingData.checkin);
        const d2 = new Date(bookingData.checkout);
        const diff = Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24));
        bookingData.nights = diff > 0 ? diff : 2;
    } else {
        bookingData.nights = 2;
    }
}

function renderSummary() {
    const summaryCard = document.getElementById('booking-summary-card');
    const total = selectedRoom.price * bookingData.nights;

    summaryCard.innerHTML = `
        <div class="summary-header">
            <h3 class="summary-room-name">${selectedRoom.name}</h3>
            <div class="summary-dates">
                ${formatDateLong(bookingData.checkin)} – ${formatDateLong(bookingData.checkout)} (${bookingData.nights} nights)
            </div>
        </div>
        <div class="summary-content">
            <div class="summary-row">
                <span>Room charge</span>
                <span>${formatPrice(selectedRoom.price * bookingData.nights)}</span>
            </div>
            <div class="summary-row">
                <span>Total due today</span>
                <span style="color:var(--alert-green); font-weight:700;">₱0</span>
            </div>
            <div class="summary-row summary-total">
                <span>Total price</span>
                <span>${formatPrice(total)}</span>
            </div>
        </div>
    `;
}

function updateDatesInUI() {
    if (!bookingData.checkin) return;

    const checkinDate = new Date(bookingData.checkin);
    
    // Cancellation deadline: 1 day before checkin
    const cancelDate = new Date(checkinDate);
    cancelDate.setDate(checkinDate.getDate() - 1);
    
    // No payment until date: 2 days before checkin
    const payLaterDate = new Date(checkinDate);
    payLaterDate.setDate(checkinDate.getDate() - 2);

    const deadlineStr = formatDateLong(cancelDate);
    const payLaterStr = formatDateLong(payLaterDate);

    document.getElementById('cancel-deadline').textContent = deadlineStr;
    document.querySelectorAll('.deadline').forEach(el => el.textContent = deadlineStr);
    document.querySelectorAll('.pay-later-date').forEach(el => el.textContent = payLaterStr);
}

function formatDateLong(dateStr) {
    if (!dateStr) return 'N/A';
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
}

// ── Event Listeners & Validation ──────────────────────────

function setupCheckoutListeners() {
    const mobileInput = document.getElementById('mobile');
    mobileInput.addEventListener('input', () => {
        mobileInput.value = formatMobileNumber(mobileInput.value);
        validateCheckoutForm();
    });

    const inputs = ['first-name', 'last-name', 'email', 'mobile'];
    inputs.forEach(id => {
        document.getElementById(id).addEventListener('input', validateCheckoutForm);
        document.getElementById(id).addEventListener('blur', () => {
            const rules = {
                'first-name': { min: 2, pattern: /^[A-Za-z\s]+$/, errorMsg: 'Please enter a valid first name' },
                'last-name': { min: 2, pattern: /^[A-Za-z\s]+$/, errorMsg: 'Please enter a valid last name' },
                'email': { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, errorMsg: 'Please enter a valid email address' },
                'mobile': { custom: (val) => val.replace(/\D/g, '').length !== 10 ? 'Please enter a valid 10-digit mobile number' : '' }
            }[id];
            validateField(id, rules);
        });
    });

    document.getElementById('checkout-form').addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateCheckoutForm(true)) {
            showSuccessModal();
        }
    });

    // Payment selection toggle
    document.querySelectorAll('.payment-option').forEach(opt => {
        opt.addEventListener('click', () => {
            document.querySelectorAll('.payment-option').forEach(el => el.classList.remove('selected'));
            opt.classList.add('selected');

            // Show/Hide QR code for InstaPay
            const qrContainer = document.getElementById('instapay-qr-container');
            if (opt.dataset.payment === 'instapay') {
                qrContainer.classList.add('active');
            } else {
                qrContainer.classList.remove('active');
            }
            
            // Re-validate form when payment mode changes
            validateCheckoutForm();
        });
    });

    // File upload listener
    const fileInput = document.getElementById('proof-upload');
    const filenameDisplay = document.getElementById('filename-display');
    
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            filenameDisplay.textContent = e.target.files[0].name;
            filenameDisplay.style.color = 'var(--alert-green)';
            filenameDisplay.style.fontWeight = '600';
        } else {
            filenameDisplay.textContent = 'No file selected';
            filenameDisplay.style.color = 'var(--text-gray)';
            filenameDisplay.style.fontWeight = '400';
        }
        validateCheckoutForm();
    });
}

function formatMobileNumber(value) {
    const digits = value.replace(/\D/g, '').substring(0, 10);
    let formatted = '';
    if (digits.length > 0) formatted += digits.substring(0, 3);
    if (digits.length > 3) formatted += ' ' + digits.substring(3, 6);
    if (digits.length > 6) formatted += ' ' + digits.substring(6, 10);
    return formatted;
}

function validateField(id, rules) {
    const input = document.getElementById(id);
    const error = document.getElementById(`${id}-error`);
    let message = '';
    
    if (input.value.trim() === '') {
        message = 'This field is required';
    } else if (rules.pattern && !rules.pattern.test(input.value.trim())) {
        message = rules.errorMsg || 'Invalid format';
    } else if (rules.min && input.value.trim().length < rules.min) {
        message = rules.errorMsg || `Minimum ${rules.min} characters required`;
    } else if (rules.custom) {
        message = rules.custom(input.value) || '';
    }

    if (message) {
        input.classList.add('invalid');
        error.textContent = message;
        return false;
    } else {
        input.classList.remove('invalid');
        error.textContent = '';
        return true;
    }
}

function validateCheckoutForm(showErrors = false) {
    const fields = [
        { id: 'first-name', rules: { min: 2, pattern: /^[A-Za-z\s]+$/, errorMsg: 'Please enter a valid first name' } },
        { id: 'last-name', rules: { min: 2, pattern: /^[A-Za-z\s]+$/, errorMsg: 'Please enter a valid last name' } },
        { id: 'email', rules: { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, errorMsg: 'Please enter a valid email address' } },
        { id: 'mobile', rules: { custom: (val) => val.replace(/\D/g, '').length !== 10 ? 'Please enter a valid 10-digit mobile number' : '' } }
    ];

    let isValid = true;
    fields.forEach(field => {
        const fieldValid = showErrors ? validateField(field.id, field.rules) : checkFieldSilent(field.id, field.rules);
        if (!fieldValid) isValid = false;
    });

    // Additional check for Proof of Payment if InstaPay is selected
    const selectedPayOption = document.querySelector('.payment-option.selected');
    if (selectedPayOption && selectedPayOption.dataset.payment === 'instapay') {
        const fileInput = document.getElementById('proof-upload');
        if (!fileInput.files || fileInput.files.length === 0) {
            isValid = false;
        }
    }

    const btn = document.getElementById('submit-booking');
    if (btn) btn.disabled = !isValid;
    return isValid;
}

function checkFieldSilent(id, rules) {
    const input = document.getElementById(id);
    const val = input.value.trim();
    if (val === '') return false;
    if (rules.pattern && !rules.pattern.test(val)) return false;
    if (rules.min && val.length < rules.min) return false;
    if (rules.custom && rules.custom(val)) return false;
    return true;
}

function showSuccessModal() {
    const modal = document.getElementById('success-modal');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}
