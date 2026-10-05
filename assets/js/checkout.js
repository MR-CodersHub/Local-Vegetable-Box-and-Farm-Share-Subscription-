document.addEventListener('DOMContentLoaded', () => {
  // Initialize Page Toggles & Navigation
  initCheckout();
});

function initCheckout() {
  const cartKey = 'harvestbox_cart';
  let cart = [];

  // Load cart data
  try {
    const stored = localStorage.getItem(cartKey);
    cart = stored ? JSON.parse(stored) : [];
  } catch (e) {
    cart = [];
  }

  const emptyState = document.getElementById('checkout-empty-state');
  const activeGrid = document.getElementById('checkout-active-grid');

  if (cart.length === 0) {
    emptyState.style.display = 'block';
    activeGrid.style.display = 'none';
    return;
  } else {
    emptyState.style.display = 'none';
    activeGrid.style.display = 'grid';
  }

  // Render Cart Items Summary
  renderSummary(cart);

  // Initial Calculation
  calculateTotals(cart);

  // Setup Form Handler
  const form = document.getElementById('checkout-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateForm()) {
      processOrder(cart);
    }
  });

  // Setup Expiry/Card inputs Auto formatting
  setupInputFormatters();
}

// ══ RENDER CART ITEMS ══
function renderSummary(cart) {
  const container = document.getElementById('checkout-summary-items');
  container.innerHTML = '';

  cart.forEach(item => {
    const itemEl = document.createElement('div');
    itemEl.className = 'summary-item';
    itemEl.innerHTML = `
      <img src="${item.img || 'assets/images/product_malgova_mango.png'}" alt="${item.name}" class="summary-img">
      <div class="summary-details">
        <div class="summary-name">${item.name}</div>
        <div class="summary-qty-price">${item.qty} x ₹${item.price} ${item.unit}</div>
      </div>
      <div class="summary-item-total">₹${item.price * item.qty}</div>
    `;
    container.appendChild(itemEl);
  });
}

// ══ CALCULATE TOTALS ══
function calculateTotals(cart) {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  
  // Get active slot value
  const activeSlotRadio = document.querySelector('input[name="delivery-slot"]:checked');
  const slotVal = activeSlotRadio ? activeSlotRadio.value : 'Standard Morning';

  // Calculate delivery fee
  let delivery = 40;
  if (slotVal === 'Express Instant') {
    delivery = 40; // Express always has ₹40 charge
  } else {
    if (subtotal > 399) {
      delivery = 0; // Free Standard delivery above ₹399
    }
  }

  // Calculate GST (5%)
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + delivery + tax;

  // Render values
  document.getElementById('summary-subtotal').textContent = `₹${subtotal}`;
  document.getElementById('summary-delivery').textContent = delivery === 0 ? 'Free' : `₹${delivery}`;
  document.getElementById('summary-tax').textContent = `₹${tax}`;
  document.getElementById('summary-total').textContent = `₹${total}`;
  document.getElementById('submit-total-display').textContent = `(₹${total})`;

  // Store total globally or on form dataset
  document.getElementById('checkout-form').dataset.grandTotal = total;
}

// ══ OPTION CARD CLICK SELECTOR ══
function selectOption(type, cardEl) {
  // Clear previous selected in the same section
  const siblings = cardEl.parentNode.querySelectorAll('.option-card');
  siblings.forEach(sib => sib.classList.remove('selected'));

  // Select current
  cardEl.classList.add('selected');

  // Check radio button
  const radio = cardEl.querySelector('input[type="radio"]');
  if (radio) {
    radio.checked = true;
    
    // Toggle details sections based on payment methods
    if (type === 'payment') {
      const upiBox = document.getElementById('upi-details');
      const cardBox = document.getElementById('card-details');
      
      if (radio.value === 'UPI') {
        upiBox.style.display = 'block';
        cardBox.style.display = 'none';
      } else if (radio.value === 'Card') {
        upiBox.style.display = 'none';
        cardBox.style.display = 'block';
      } else {
        upiBox.style.display = 'none';
        cardBox.style.display = 'none';
      }
    }
  }

  // Recalculate totals (in case slot or pricing changes)
  const cartKey = 'harvestbox_cart';
  let cart = [];
  try {
    cart = JSON.parse(localStorage.getItem(cartKey)) || [];
  } catch (e) {}
  calculateTotals(cart);
}

// ══ FORM FIELD VALIDATION ══
function validateForm() {
  let isValid = true;
  
  // Helper to display error
  const setError = (id, msg) => {
    const input = document.getElementById(id);
    const err = document.getElementById(`${id}-error`);
    if (err) {
      err.textContent = msg;
      err.style.display = msg ? 'block' : 'none';
    }
    if (input) {
      if (msg) {
        input.classList.add('input-invalid');
      } else {
        input.classList.remove('input-invalid');
      }
    }
  };

  // Reset errors
  const inputs = ['checkout-name', 'checkout-email', 'checkout-phone', 'checkout-address', 'checkout-pincode'];
  inputs.forEach(id => setError(id, ''));

  // Validate Name
  const name = document.getElementById('checkout-name').value.trim();
  if (!name) {
    setError('checkout-name', 'Please enter your full name.');
    isValid = false;
  }

  // Validate Email
  const email = document.getElementById('checkout-email').value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    setError('checkout-email', 'Please enter your email address.');
    isValid = false;
  } else if (!emailRegex.test(email)) {
    setError('checkout-email', 'Please enter a valid email address.');
    isValid = false;
  }

  // Validate Phone
  const phone = document.getElementById('checkout-phone').value.trim();
  if (!phone) {
    setError('checkout-phone', 'Please enter your phone number.');
    isValid = false;
  }

  // Validate Address
  const address = document.getElementById('checkout-address').value.trim();
  if (!address) {
    setError('checkout-address', 'Please enter your full delivery address.');
    isValid = false;
  }

  // Validate Pincode
  const pincode = document.getElementById('checkout-pincode').value.trim();
  if (!pincode) {
    setError('checkout-pincode', 'Please enter your pincode.');
    isValid = false;
  } else if (!/^[0-9]{6}$/.test(pincode)) {
    setError('checkout-pincode', 'Pincode must be exactly 6 digits.');
    isValid = false;
  }

  // Validate Payment details
  const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
  if (paymentMethod === 'UPI') {
    const upiId = document.getElementById('upi-id').value.trim();
    const upiErrorEl = document.getElementById('upi-details');
    // Simple visual validation
    if (!upiId || !upiId.includes('@')) {
      document.getElementById('upi-id').classList.add('input-invalid');
      isValid = false;
      showToast('Validation Error', 'Please enter a valid UPI ID (e.g. name@upi)', 'error');
    } else {
      document.getElementById('upi-id').classList.remove('input-invalid');
    }
  } else if (paymentMethod === 'Card') {
    const cardNum = document.getElementById('card-num').value.replace(/\s+/g, '');
    const cardExp = document.getElementById('card-exp').value.trim();
    const cardCvv = document.getElementById('card-cvv').value.trim();
    
    let cardValid = true;
    if (cardNum.length < 16) {
      document.getElementById('card-num').classList.add('input-invalid');
      cardValid = false;
    } else {
      document.getElementById('card-num').classList.remove('input-invalid');
    }
    
    if (!/^\d{2}\/\d{2}$/.test(cardExp)) {
      document.getElementById('card-exp').classList.add('input-invalid');
      cardValid = false;
    } else {
      document.getElementById('card-exp').classList.remove('input-invalid');
    }

    if (cardCvv.length < 3) {
      document.getElementById('card-cvv').classList.add('input-invalid');
      cardValid = false;
    } else {
      document.getElementById('card-cvv').classList.remove('input-invalid');
    }

    if (!cardValid) {
      isValid = false;
      showToast('Validation Error', 'Please fill in all credit card details correctly', 'error');
    }
  }

  return isValid;
}

// ══ FORMAT CUSTOM CARD INPUTS ══
function setupInputFormatters() {
  const cardNum = document.getElementById('card-num');
  if (cardNum) {
    cardNum.addEventListener('input', (e) => {
      // Format 0000 0000 0000 0000
      let val = e.target.value.replace(/\D/g, '');
      let formatted = '';
      for (let i = 0; i < val.length && i < 16; i++) {
        if (i > 0 && i % 4 === 0) formatted += ' ';
        formatted += val[i];
      }
      e.target.value = formatted;
    });
  }

  const cardExp = document.getElementById('card-exp');
  if (cardExp) {
    cardExp.addEventListener('input', (e) => {
      // Format MM/YY
      let val = e.target.value.replace(/\D/g, '');
      let formatted = '';
      for (let i = 0; i < val.length && i < 4; i++) {
        if (i === 2) formatted += '/';
        formatted += val[i];
      }
      e.target.value = formatted;
    });
  }

  const cardCvv = document.getElementById('card-cvv');
  if (cardCvv) {
    cardCvv.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\D/g, '').substring(0, 3);
    });
  }

  const pincode = document.getElementById('checkout-pincode');
  if (pincode) {
    pincode.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\D/g, '').substring(0, 6);
    });
  }
}

// ══ PROCESS ORDER & SIMULATE SUCCESS ══
function processOrder(cart) {
  const loader = document.getElementById('checkout-loader');
  const title = document.getElementById('loader-status-title');
  const sub = document.getElementById('loader-status-sub');
  
  // Show loader
  loader.style.display = 'flex';

  // Step-by-step premium status updates
  setTimeout(() => {
    title.textContent = 'Reserving produce with local farm...';
    sub.textContent = 'Ensuring peak freshness selection.';
  }, 1000);

  setTimeout(() => {
    title.textContent = 'Scheduling delivery slot...';
    sub.textContent = 'Dispatching details to nearest fulfillment hub.';
  }, 2000);

  setTimeout(() => {
    // Hide loader
    loader.style.display = 'none';

    // Clear cart in localStorage
    localStorage.removeItem('harvestbox_cart');

    // Trigger Success Screen
    showSuccessScreen();
  }, 3200);
}

// ══ SHOW SUCCESS SCREEN ══
function showSuccessScreen() {
  const activeGrid = document.getElementById('checkout-active-grid');
  const successContainer = document.getElementById('checkout-success-container');
  
  // Get values from form
  const name = document.getElementById('checkout-name').value.trim();
  const address = document.getElementById('checkout-address').value.trim();
  const pincode = document.getElementById('checkout-pincode').value.trim();
  const slotVal = document.querySelector('input[name="delivery-slot"]:checked').value;
  const paymentVal = document.querySelector('input[name="payment-method"]:checked').value;
  const grandTotal = document.getElementById('summary-total').textContent;

  // Generate random Order ID
  const orderId = 'FM-' + Math.floor(100000 + Math.random() * 900000);

  // Populate Success page details
  document.getElementById('success-order-id').textContent = orderId;
  document.getElementById('success-slot').textContent = slotVal;
  document.getElementById('success-payment').textContent = paymentVal;
  document.getElementById('success-total').textContent = grandTotal;
  document.getElementById('success-address').textContent = `${address}, PIN: ${pincode}`;

  // Hide Cart UI, Show Success Screen
  activeGrid.style.display = 'none';
  successContainer.style.display = 'block';

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Update Cart Badge in Header
  document.querySelectorAll('.cart-badge').forEach(badge => {
    badge.textContent = '0';
    badge.classList.remove('active');
  });

  // Trigger celebration micro-confetti
  triggerConfetti();

  // Show Toast Success
  showToast('Order Placed!', `Your Reference ID: ${orderId}`, 'success');
}

// ══ CELEBRATION CONFETTI ENGINE ══
function triggerConfetti() {
  const colors = ['#22C55E', '#4ADE80', '#16A34A', '#FACC15', '#EAB308', '#3B82F6'];
  const confettiCount = 50;

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti-piece';
    
    // Random styling properties
    const color = colors[Math.floor(Math.random() * colors.length)];
    const left = Math.random() * 100; // Left percentage
    const size = Math.random() * 8 + 6; // Dimensions
    const delay = Math.random() * 1.5; // Delay in seconds
    const duration = Math.random() * 2 + 1.5; // Animation duration

    confetti.style.background = color;
    confetti.style.left = `${left}vw`;
    confetti.style.width = `${size}px`;
    confetti.style.height = `${size}px`;
    confetti.style.animationDelay = `${delay}s`;
    confetti.style.animationDuration = `${duration}s`;
    
    // Random rotation/shape
    if (Math.random() > 0.5) {
      confetti.style.borderRadius = '0'; // Square
    }

    document.body.appendChild(confetti);

    // Cleanup after animation completes
    setTimeout(() => {
      confetti.remove();
    }, (delay + duration) * 1000);
  }
}
