/**
 * CoveBit IT Support — Interactive Script
 * Handles mobile navigation, sticky header transitions, FAQ accordions,
 * package pre-selection in GBP, live Stripe and PayPal payment links,
 * and booking engine validation & confirmation state.
 */

const PRICING_PACKAGES = {
  'quick-fix': {
    id: 'quick-fix',
    name: 'Quick Fix',
    price: 29,
    priceStr: '£29',
    stripeUrl: 'https://buy.stripe.com/6oU14ndJgfoZfg848mbAs0i',
    paypalUrl: 'https://www.paypal.com/ncp/payment/27SLV2A4MWL9E',
    category: 'Remote Support'
  },
  'remote-hour': {
    id: 'remote-hour',
    name: 'Remote Hour',
    price: 55,
    priceStr: '£55',
    stripeUrl: 'https://buy.stripe.com/cNieVdbB8dgR3xq7kybAs0h',
    paypalUrl: 'https://www.paypal.com/ncp/payment/TZUL2C2DF6BXA',
    category: 'Remote Support'
  },
  'extended-session': {
    id: 'extended-session',
    name: 'Extended Session',
    price: 95,
    priceStr: '£95',
    stripeUrl: 'https://buy.stripe.com/7sY28r48GfoZ4Bu0WabAs0g',
    paypalUrl: 'https://www.paypal.com/ncp/payment/C764ZLTQB9YBU',
    category: 'Remote Support'
  },
  'extra-hour': {
    id: 'extra-hour',
    name: 'Extra Hour',
    price: 50,
    priceStr: '£50',
    stripeUrl: 'https://buy.stripe.com/28E6oHgVsekV9VO8oCbAs0f',
    paypalUrl: 'https://www.paypal.com/ncp/payment/GEMW5VQYJ2CD2',
    category: 'Remote Support'
  },
  'same-day': {
    id: 'same-day',
    name: 'Same-Day Priority',
    price: 75,
    priceStr: '£75',
    stripeUrl: 'https://buy.stripe.com/6oUaEXcFc1y90lebAObAs0e',
    paypalUrl: 'https://www.paypal.com/ncp/payment/9MKA6L5EFA8QS',
    category: 'Remote Support'
  },
  'evening-weekend': {
    id: 'evening-weekend',
    name: 'Evening / Weekend',
    price: 85,
    priceStr: '£85',
    stripeUrl: 'https://buy.stripe.com/4gM9AT5cK3Ghec47kybAs0d',
    paypalUrl: 'https://www.paypal.com/ncp/payment/96QCTFCXU7TUS',
    category: 'Remote Support'
  },
  'user-setup': {
    id: 'user-setup',
    name: 'User Setup',
    price: 75,
    priceStr: '£75',
    stripeUrl: 'https://buy.stripe.com/8x2eVd9t00u5ec47kybAs0c',
    paypalUrl: 'https://www.paypal.com/ncp/payment/FLYWNSKPJR9R8',
    category: 'Setup & Onboarding'
  },
  'm365-setup-5': {
    id: 'm365-setup-5',
    name: 'M365 Setup (5)',
    price: 150,
    priceStr: '£150',
    stripeUrl: 'https://buy.stripe.com/5kQdR9eNkdgR6JCbAObAs0b',
    paypalUrl: 'https://www.paypal.com/ncp/payment/GN63VU3U2J3TU',
    category: 'Setup & Onboarding'
  },
  'm365-setup-10': {
    id: 'm365-setup-10',
    name: 'M365 Setup (10)',
    price: 225,
    priceStr: '£225',
    stripeUrl: 'https://buy.stripe.com/6oUbJ19t01y90le48mbAs0a',
    paypalUrl: 'https://www.paypal.com/ncp/payment/NTYUTJF8GSDLW',
    category: 'Setup & Onboarding'
  },
  'health-check': {
    id: 'health-check',
    name: 'Health Check',
    price: 149,
    priceStr: '£149',
    stripeUrl: 'https://buy.stripe.com/5kQ00jbB8ekV5FycESbAs09',
    paypalUrl: 'https://www.paypal.com/ncp/payment/JV4NQMVHFHUR6',
    category: 'Health Checks & Audits'
  },
  'health-check-fixes': {
    id: 'health-check-fixes',
    name: 'Health Check + Fixes',
    price: 299,
    priceStr: '£299',
    stripeUrl: 'https://buy.stripe.com/bJe00j5cK4Klec49sGbAs08',
    paypalUrl: 'https://www.paypal.com/ncp/payment/FCUA3E3FH8VWW',
    category: 'Health Checks & Audits'
  },
  'health-check-30days': {
    id: 'health-check-30days',
    name: 'Health Check + 30 Days',
    price: 499,
    priceStr: '£499',
    stripeUrl: 'https://buy.stripe.com/6oU14n8oW4Kl6JC6gubAs07',
    paypalUrl: 'https://www.paypal.com/ncp/payment/PGAJPZCDFKNV2',
    category: 'Health Checks & Audits'
  },
  'essential-monthly': {
    id: 'essential-monthly',
    name: 'Essential First Month',
    price: 99,
    priceStr: '£99',
    stripeUrl: 'https://buy.stripe.com/bJeeVddJgfoZ2tm20ebAs06',
    paypalUrl: 'https://www.paypal.com/ncp/payment/C3BFMJLY8H4XC',
    category: 'Monthly Retainers'
  },
  'business-monthly': {
    id: 'business-monthly',
    name: 'Business First Month',
    price: 199,
    priceStr: '£199',
    stripeUrl: 'https://buy.stripe.com/28EdR98oW5Op9VO0WabAs05',
    paypalUrl: 'https://www.paypal.com/ncp/payment/T9MPTKX39KC88',
    category: 'Monthly Retainers'
  },
  'business-plus-monthly': {
    id: 'business-plus-monthly',
    name: 'Business Plus First Month',
    price: 349,
    priceStr: '£349',
    stripeUrl: 'https://buy.stripe.com/4gMaEXeNkccNc3WgV8bAs04',
    paypalUrl: 'https://www.paypal.com/ncp/payment/PESPDXQRWNG7Q',
    category: 'Monthly Retainers'
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileNav();
  initFaqAccordion();
  initBookingEngine();
  initPaymentPartners();
  initContactForm();
  initScrollReveal();
});

/* --------------------------------------------------------------------------
   Sticky Header
   -------------------------------------------------------------------------- */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   Mobile Navigation Drawer & Dropdowns
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const dropdownParents = document.querySelectorAll('.nav-item-dropdown');

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('is-open');
      toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !toggleBtn.contains(e.target) && navMenu.classList.contains('is-open')) {
        navMenu.classList.remove('is-open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  dropdownParents.forEach(dropdown => {
    const trigger = dropdown.querySelector('.dropdown-trigger');
    if (trigger) {
      trigger.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          dropdown.classList.toggle('is-open');
        }
      });
    }
  });
}

/* --------------------------------------------------------------------------
   FAQ Accordion
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherTrigger = otherItem.querySelector('.faq-trigger');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
        }
      });

      if (isActive) {
        item.classList.remove('active');
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   Payment Partner Method Switching (Stripe & PayPal)
   -------------------------------------------------------------------------- */
function initPaymentPartners() {
  const paymentRadios = document.querySelectorAll('input[name="payment_partner"]');
  const panels = {
    stripe: document.getElementById('panel-stripe'),
    paypal: document.getElementById('panel-paypal')
  };

  if (!paymentRadios.length) return;

  paymentRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      const selected = radio.value;
      Object.keys(panels).forEach(key => {
        if (panels[key]) {
          if (key === selected) {
            panels[key].classList.add('active');
          } else {
            panels[key].classList.remove('active');
          }
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   Booking Engine (Spec-Compliant Form + Package + Live Stripe/PayPal Links)
   -------------------------------------------------------------------------- */
function initBookingEngine() {
  const form = document.getElementById('covebit-booking-form');
  const confirmationState = document.getElementById('booking-confirmation-state');
  if (!form || !confirmationState) return;

  const dateInput = document.getElementById('booking-date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }

  // Handle package selection dropdown or radios
  const packageSelect = document.getElementById('booking-package-select');
  const packageRadioCards = document.querySelectorAll('input[name="selected_package"]');

  function updatePaymentLinks(packageKey) {
    const pkg = PRICING_PACKAGES[packageKey];
    if (!pkg) return;

    // Update Stripe direct button link
    const stripeBtn = document.getElementById('stripe-direct-checkout-btn');
    if (stripeBtn) {
      stripeBtn.href = pkg.stripeUrl;
      const priceTxt = stripeBtn.querySelector('.stripe-price-txt');
      if (priceTxt) {
        priceTxt.textContent = pkg.priceStr;
      }
    }

    // Update PayPal direct button links
    const paypalBtn = document.getElementById('paypal-direct-checkout-btn');
    if (paypalBtn) {
      paypalBtn.href = pkg.paypalUrl;
      const priceTxt = paypalBtn.querySelector('.paypal-price-txt');
      if (priceTxt) {
        priceTxt.textContent = pkg.priceStr;
      }
    }
    const paypalCardBtn = document.getElementById('paypal-card-checkout-btn');
    if (paypalCardBtn) {
      paypalCardBtn.href = pkg.paypalUrl;
    }

    // Update price summary badge
    const priceDisplay = document.getElementById('selected-pkg-price-badge');
    if (priceDisplay) {
      priceDisplay.textContent = `${pkg.name} — ${pkg.priceStr} GBP`;
    }
  }

  // Phone and Email Input Validation for Booking Form
  const phoneInput = document.getElementById('booking-phone');
  const phoneErrorMsg = document.getElementById('phone-error-msg');
  const emailInput = document.getElementById('booking-email');
  const emailErrorMsg = document.getElementById('email-error-msg');
  const nameInput = document.getElementById('booking-name');
  const serviceSelect = document.getElementById('booking-service');
  const timeSelect = document.getElementById('booking-time');
  const issueInput = document.getElementById('booking-issue');
  const deliveryRemoteRadio = document.getElementById('delivery-remote');
  const deliveryOnCallRadio = document.getElementById('delivery-oncall');
  const paymentPartnerSection = document.getElementById('payment-partner-section');
  const oncallQuoteSection = document.getElementById('oncall-quote-section');
  const bookingSubmitBtn = document.getElementById('booking-submit-btn');

  // Payment Direct Buttons & Indicators
  const stripeDirectBtn = document.getElementById('stripe-direct-checkout-btn');
  const paypalDirectBtn = document.getElementById('paypal-direct-checkout-btn');
  const paypalCardBtn = document.getElementById('paypal-card-checkout-btn');
  const paymentGateWarning = document.getElementById('payment-gate-warning');
  const paymentGateStatus = document.getElementById('payment-gate-status');

  // Track if client completed/initiated payment before clicking "Confirm & Reserve IT Session"
  let clientPaidBeforeSubmit = false;
  let clientPaidProvider = '';

  // 3-Step Guided Form Navigation Elements
  let currentStep = 1;
  const stepPanels = {
    1: document.getElementById('step-1-panel'),
    2: document.getElementById('step-2-panel'),
    3: document.getElementById('step-3-panel')
  };
  const stepTabs = {
    1: document.getElementById('step-tab-1'),
    2: document.getElementById('step-tab-2'),
    3: document.getElementById('step-tab-3')
  };
  const stepLines = {
    1: document.getElementById('step-line-1'),
    2: document.getElementById('step-line-2')
  };

  const btnStep1Next = document.getElementById('btn-step-1-next');
  const btnStep2Prev = document.getElementById('btn-step-2-prev');
  const btnStep2Next = document.getElementById('btn-step-2-next');
  const btnStep3Prev = document.getElementById('btn-step-3-prev');
  const btnEditReservation = document.getElementById('btn-edit-reservation');

  function showPhoneErr(msg) {
    if (phoneErrorMsg) {
      phoneErrorMsg.textContent = msg;
      phoneErrorMsg.style.display = 'block';
    }
    if (phoneInput) phoneInput.classList.add('input-error');
  }

  function clearPhoneErr() {
    if (phoneErrorMsg) {
      phoneErrorMsg.textContent = '';
      phoneErrorMsg.style.display = 'none';
    }
    if (phoneInput) phoneInput.classList.remove('input-error');
  }

  if (phoneInput) {
    phoneInput.addEventListener('input', () => {
      let val = phoneInput.value.trim();
      if (val.startsWith('+44')) {
        val = '0' + val.slice(3);
      }
      val = val.replace(/\D/g, '').slice(0, 11);
      phoneInput.value = val;

      if (val.length > 0 && !val.startsWith('0')) {
        showPhoneErr('Phone number must start with 07');
      } else if (val.length >= 2 && !val.startsWith('07')) {
        showPhoneErr('Phone number must start with 07');
      } else if (val.length > 0 && val.length < 11) {
        showPhoneErr(`Must be exactly 11 digits (${val.length}/11 entered)`);
      } else if (val.length === 11 && val.startsWith('07')) {
        clearPhoneErr();
      } else {
        clearPhoneErr();
      }
      updatePaymentGateStatus();
    });

    phoneInput.addEventListener('blur', () => {
      const val = phoneInput.value.trim();
      if (val.length > 0 && !/^07\d{9}$/.test(val)) {
        showPhoneErr('Phone number must start with 07 and be exactly 11 digits (e.g. 07979515140)');
      } else if (val.length === 11 && /^07\d{9}$/.test(val)) {
        clearPhoneErr();
      }
      updatePaymentGateStatus();
    });
  }

  function showEmailErr(msg) {
    if (emailErrorMsg) {
      emailErrorMsg.textContent = msg;
      emailErrorMsg.style.display = 'block';
    }
    if (emailInput) emailInput.classList.add('input-error');
  }

  function clearEmailErr() {
    if (emailErrorMsg) {
      emailErrorMsg.textContent = '';
      emailErrorMsg.style.display = 'none';
    }
    if (emailInput) emailInput.classList.remove('input-error');
  }

  if (emailInput) {
    emailInput.addEventListener('input', () => {
      const val = emailInput.value.trim();
      if (val.length > 0 && !val.includes('@')) {
        showEmailErr("Email address must include an '@' mark");
      } else if (val.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        showEmailErr("Please enter a valid email address (e.g. name@example.com)");
      } else {
        clearEmailErr();
      }
      updatePaymentGateStatus();
    });

    emailInput.addEventListener('blur', () => {
      const val = emailInput.value.trim();
      if (val.length > 0) {
        if (!val.includes('@')) {
          showEmailErr("Email address must include an '@' mark (e.g. name@example.com)");
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
          showEmailErr("Please enter a valid email address (e.g. name@example.com)");
        } else {
          clearEmailErr();
        }
      }
      updatePaymentGateStatus();
    });
  }

  // Step 1 Validation: Services Selection
  function validateStep1(options = {}) {
    const focusFirst = options.focusFirst || false;
    const showErrors = options.showErrors || false;
    const missing = [];
    let firstInvalidEl = null;

    // 1. Package
    const checkedRadio = document.querySelector('input[name="selected_package"]:checked');
    const selectedPkg = (packageSelect && packageSelect.value) || (checkedRadio && checkedRadio.value);
    if (!selectedPkg) {
      missing.push('Select an IT Support Package');
      if (!firstInvalidEl) firstInvalidEl = packageSelect;
    }

    // 2. Service Needed
    if (!serviceSelect || !serviceSelect.value) {
      missing.push('Service Needed');
      if (!firstInvalidEl) firstInvalidEl = serviceSelect;
      if (showErrors && serviceSelect) serviceSelect.classList.add('input-error');
    } else if (serviceSelect) {
      serviceSelect.classList.remove('input-error');
    }

    // 3. Support Delivery Method
    const sessionTypeRadio = document.querySelector('input[name="session_type"]:checked');
    if (!sessionTypeRadio || !sessionTypeRadio.value) {
      missing.push('Support Delivery Method');
      if (!firstInvalidEl) firstInvalidEl = deliveryRemoteRadio;
    }

    const isValid = missing.length === 0;

    if (!isValid && focusFirst && firstInvalidEl) {
      firstInvalidEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      firstInvalidEl.focus();
    }

    return {
      isValid,
      missing,
      firstInvalidEl
    };
  }

  // Step 2 Validation: User Details & Reservation
  function validateStep2(options = {}) {
    const focusFirst = options.focusFirst || false;
    const showErrors = options.showErrors || false;
    const missing = [];
    let firstInvalidEl = null;

    // 1. Full Name
    const nameVal = nameInput ? nameInput.value.trim() : '';
    if (!nameVal) {
      missing.push('Your Full Name');
      if (!firstInvalidEl) firstInvalidEl = nameInput;
      if (showErrors && nameInput) nameInput.classList.add('input-error');
    } else if (nameInput) {
      nameInput.classList.remove('input-error');
    }

    // 2. Email Address (Mandatory '@')
    const emailVal = emailInput ? emailInput.value.trim() : '';
    if (!emailVal) {
      missing.push("Email Address (must include '@')");
      if (!firstInvalidEl) firstInvalidEl = emailInput;
      if (showErrors && emailInput) {
        showEmailErr("Email address is required and must include an '@' mark");
      }
    } else if (!emailVal.includes('@') || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
      missing.push("Valid Email Address (must include '@' mark)");
      if (!firstInvalidEl) firstInvalidEl = emailInput;
      if (showErrors && emailInput) {
        showEmailErr("Email address must include an '@' mark (e.g. name@example.com)");
      }
    } else if (emailInput) {
      clearEmailErr();
    }

    // 3. Phone Number (Mandatory '07' & 11 digits)
    const rawPhone = phoneInput ? phoneInput.value.trim() : '';
    const cleanPhone = rawPhone.replace(/\D/g, '');
    if (!rawPhone) {
      missing.push('Phone Number (11 digits starting with 07)');
      if (!firstInvalidEl) firstInvalidEl = phoneInput;
      if (showErrors && phoneInput) {
        showPhoneErr('Phone number is required (must start with 07 and be 11 digits)');
      }
    } else if (!/^07\d{9}$/.test(cleanPhone)) {
      missing.push('Phone Number (must start with 07 and be exactly 11 digits)');
      if (!firstInvalidEl) firstInvalidEl = phoneInput;
      if (showErrors && phoneInput) {
        showPhoneErr('Phone number must start with 07 and be exactly 11 digits (e.g. 07979515140)');
      }
    } else if (phoneInput) {
      clearPhoneErr();
    }

    // 4. Preferred Date
    if (!dateInput || !dateInput.value) {
      missing.push('Preferred Date');
      if (!firstInvalidEl) firstInvalidEl = dateInput;
      if (showErrors && dateInput) dateInput.classList.add('input-error');
    } else if (dateInput) {
      dateInput.classList.remove('input-error');
    }

    // 5. Preferred Time Slot
    if (!timeSelect || !timeSelect.value) {
      missing.push('Preferred Time Slot');
      if (!firstInvalidEl) firstInvalidEl = timeSelect;
      if (showErrors && timeSelect) timeSelect.classList.add('input-error');
    } else if (timeSelect) {
      timeSelect.classList.remove('input-error');
    }

    // 6. Brief Description of the Issue
    const issueVal = issueInput ? issueInput.value.trim() : '';
    if (!issueVal) {
      missing.push('Brief Description of the Issue');
      if (!firstInvalidEl) firstInvalidEl = issueInput;
      if (showErrors && issueInput) issueInput.classList.add('input-error');
    } else if (issueInput) {
      issueInput.classList.remove('input-error');
    }

    const isValid = missing.length === 0;

    if (!isValid && focusFirst && firstInvalidEl) {
      firstInvalidEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      firstInvalidEl.focus();
    }

    return {
      isValid,
      missing,
      firstInvalidEl
    };
  }

  // Unified validation for all required fields marked with * in Book Online
  function validateBookingForm(options = {}) {
    const focusFirst = options.focusFirst || false;
    const showErrors = options.showErrors || false;

    const s1 = validateStep1({ focusFirst: false, showErrors });
    const s2 = validateStep2({ focusFirst: false, showErrors });

    const missing = [...s1.missing, ...s2.missing];
    const isValid = missing.length === 0;
    const firstInvalidEl = s1.firstInvalidEl || s2.firstInvalidEl;

    if (!isValid && focusFirst && firstInvalidEl) {
      if (s1.missing.length > 0) {
        goToStep(1, { skipScroll: true });
      } else if (s2.missing.length > 0) {
        goToStep(2, { skipScroll: true });
      }
      firstInvalidEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      firstInvalidEl.focus();
    }

    return {
      isValid,
      missing,
      firstInvalidEl
    };
  }

  // Live Step 3 Session Recap Box Update (Complete Booking Summary)
  function updateStep3Recap() {
    // 1. Package
    const checkedRadio = document.querySelector('input[name="selected_package"]:checked');
    const selectedPkgKey = (packageSelect && packageSelect.value) || (checkedRadio && checkedRadio.value) || 'remote-hour';
    const pkg = PRICING_PACKAGES[selectedPkgKey] || PRICING_PACKAGES['remote-hour'];
    const recapPkg = document.getElementById('recap-package');
    if (recapPkg) recapPkg.textContent = `${pkg.name} — ${pkg.priceStr} GBP`;

    // 2. Service
    const recapService = document.getElementById('recap-service');
    if (recapService) {
      recapService.textContent = (serviceSelect && serviceSelect.selectedIndex > 0) ? serviceSelect.options[serviceSelect.selectedIndex].text : 'General IT Support';
    }

    // 3. Delivery Method
    const isOnCall = deliveryOnCallRadio && deliveryOnCallRadio.checked;
    const recapDelivery = document.getElementById('recap-delivery');
    if (recapDelivery) {
      recapDelivery.textContent = isOnCall ? 'On-Call Visit (London & Surrounds)' : 'Remote Screen-Share (UK-Wide)';
    }

    // 4. Client Name
    const recapName = document.getElementById('recap-name');
    if (recapName) recapName.textContent = (nameInput && nameInput.value.trim()) || '—';

    // 5. Email Address
    const recapEmail = document.getElementById('recap-email');
    if (recapEmail) recapEmail.textContent = (emailInput && emailInput.value.trim()) || '—';

    // 6. Phone Number
    const recapPhone = document.getElementById('recap-phone');
    if (recapPhone) recapPhone.textContent = (phoneInput && phoneInput.value.trim()) || '—';

    // 7. Date & Time
    const recapDateTime = document.getElementById('recap-datetime');
    if (recapDateTime) {
      const d = (dateInput && dateInput.value) || '';
      const t = (timeSelect && timeSelect.value) || '';
      recapDateTime.textContent = (d && t) ? `${d} (${t})` : (d || t || '—');
    }

    // 8. Contact (backward compatibility)
    const recapContact = document.getElementById('recap-contact');
    if (recapContact) {
      const em = (emailInput && emailInput.value.trim()) || '';
      const ph = (phoneInput && phoneInput.value.trim()) || '';
      recapContact.textContent = (em || ph) ? `${em} • ${ph}` : '—';
    }

    // 9. Issue Description
    const recapIssue = document.getElementById('recap-issue');
    if (recapIssue) {
      recapIssue.textContent = (issueInput && issueInput.value.trim()) || '—';
    }

    // 10. Postcode for on-call
    const oncallSummaryPostcode = document.getElementById('oncall-summary-postcode');
    const recapPostcodeContainer = document.getElementById('recap-postcode-container');
    const recapPostcode = document.getElementById('recap-postcode');
    const postcodeVal = (document.getElementById('booking-postcode') || {}).value || '';
    if (oncallSummaryPostcode) {
      oncallSummaryPostcode.textContent = postcodeVal.trim() ? postcodeVal.trim() : 'As specified in Step 2';
    }
    if (recapPostcodeContainer) {
      recapPostcodeContainer.style.display = (isOnCall && postcodeVal.trim()) ? 'block' : 'none';
    }
    if (recapPostcode) {
      recapPostcode.textContent = postcodeVal.trim() || '—';
    }

    // 11. Confirm Booking Button Label
    if (bookingSubmitBtn) {
      bookingSubmitBtn.textContent = isOnCall ? 'Submit Request for Custom On-Call Quote' : 'Confirm Booking';
    }
  }

  // 3-Step Navigation Controller
  function goToStep(targetStep, options = {}) {
    const skipScroll = options.skipScroll || false;
    if (targetStep < 1 || targetStep > 3) return;

    currentStep = targetStep;

    // Update Stepper Tabs
    for (let s = 1; s <= 3; s++) {
      const tab = stepTabs[s];
      const numSpan = document.getElementById(`step-num-${s}`);
      if (!tab) continue;

      if (s < targetStep) {
        tab.classList.remove('active', 'disabled');
        tab.classList.add('completed');
        if (numSpan) numSpan.innerHTML = '✓';
      } else if (s === targetStep) {
        tab.classList.remove('disabled', 'completed');
        tab.classList.add('active');
        if (numSpan) numSpan.textContent = String(s);
      } else {
        tab.classList.remove('active', 'completed');
        tab.classList.remove('disabled');
        if (numSpan) numSpan.textContent = String(s);
      }
    }

    // Update Step Connecting Lines
    if (stepLines[1]) stepLines[1].classList.toggle('completed', targetStep >= 2);
    if (stepLines[2]) stepLines[2].classList.toggle('completed', targetStep >= 3);

    // Toggle Step Panels
    for (let s = 1; s <= 3; s++) {
      const panel = stepPanels[s];
      if (panel) {
        panel.classList.toggle('active', s === targetStep);
      }
    }

    if (targetStep === 3) {
      updateStep3Recap();
      updatePaymentGateStatus();
    }

    if (!skipScroll && form) {
      form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Stepper Buttons & Tab Navigation Listeners
  if (btnStep1Next) {
    btnStep1Next.addEventListener('click', () => {
      const s1 = validateStep1({ focusFirst: true, showErrors: true });
      if (s1.isValid) {
        goToStep(2);
      } else {
        alert('Please complete the following before proceeding to Step 2:\n\n• ' + s1.missing.join('\n• '));
      }
    });
  }

  if (btnStep2Prev) {
    btnStep2Prev.addEventListener('click', () => goToStep(1));
  }

  if (btnStep2Next) {
    btnStep2Next.addEventListener('click', () => {
      const s2 = validateStep2({ focusFirst: true, showErrors: true });
      if (s2.isValid) {
        goToStep(3);
      } else {
        alert('Please complete all required fields marked with * before proceeding to payment:\n\n• ' + s2.missing.join('\n• '));
      }
    });
  }

  if (btnStep3Prev) {
    btnStep3Prev.addEventListener('click', () => goToStep(2));
  }

  if (btnEditReservation) {
    btnEditReservation.addEventListener('click', () => goToStep(2));
  }

  if (stepTabs[1]) {
    stepTabs[1].addEventListener('click', () => goToStep(1));
  }
  if (stepTabs[2]) {
    stepTabs[2].addEventListener('click', () => {
      const s1 = validateStep1({ focusFirst: true, showErrors: true });
      if (s1.isValid) {
        goToStep(2);
      } else {
        alert('Please complete Step 1 before proceeding:\n\n• ' + s1.missing.join('\n• '));
      }
    });
  }
  if (stepTabs[3]) {
    stepTabs[3].addEventListener('click', () => {
      const s1 = validateStep1({ focusFirst: true, showErrors: true });
      if (!s1.isValid) {
        goToStep(1);
        alert('Please complete Step 1 before proceeding:\n\n• ' + s1.missing.join('\n• '));
        return;
      }
      const s2 = validateStep2({ focusFirst: true, showErrors: true });
      if (s2.isValid) {
        goToStep(3);
      } else {
        goToStep(2);
        alert('Please complete Step 2 before proceeding to payment:\n\n• ' + s2.missing.join('\n• '));
      }
    });
  }

  // Update dynamic payment status indicator
  function updatePaymentGateStatus() {
    const res = validateBookingForm({ focusFirst: false, showErrors: false });
    if (paymentGateStatus) {
      if (res.isValid) {
        paymentGateStatus.innerHTML = '✓ All required details complete — click below for instant secure checkout.';
        paymentGateStatus.style.color = '#059669';
        paymentGateStatus.style.fontWeight = '700';
      } else {
        paymentGateStatus.innerHTML = '🔒 Please complete all required details (marked with <span style="color: #dc2626; font-weight: 700;">*</span>) before initiating payment.';
        paymentGateStatus.style.color = 'var(--text-muted)';
        paymentGateStatus.style.fontWeight = 'normal';
      }
    }
    if (res.isValid && paymentGateWarning) {
      paymentGateWarning.style.display = 'none';
    }
  }

  // Gating function: completely blocks Stripe / PayPal payment if * fields are not filled
  function handlePaymentGatedClick(e, providerName) {
    const res = validateBookingForm({ focusFirst: true, showErrors: true });
    if (!res.isValid) {
      e.preventDefault();
      e.stopPropagation();

      if (paymentGateWarning) {
        paymentGateWarning.style.display = 'block';
        paymentGateWarning.innerHTML = `⚠️ <strong>Cannot initiate ${providerName} payment yet:</strong> Please complete all required fields marked with <span style="color:#dc2626; font-weight:800;">*</span> above before proceeding to checkout.<br><span style="font-size:0.82rem; display:block; margin-top:0.4rem; font-weight:500; line-height: 1.45;">Missing: ${res.missing.join(', ')}</span>`;
        paymentGateWarning.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      alert(`Cannot initiate ${providerName} payment:\n\nPlease complete all required fields marked with * before proceeding to checkout:\n\n• ` + res.missing.join('\n• '));

      if (res.firstInvalidEl) {
        res.firstInvalidEl.focus();
      }
      return false;
    }

    if (paymentGateWarning) {
      paymentGateWarning.style.display = 'none';
    }

    // Client initiated payment before clicking "Confirm & Reserve IT Session"
    clientPaidBeforeSubmit = true;
    clientPaidProvider = providerName;

    if (paymentGateStatus) {
      paymentGateStatus.innerHTML = `✓ <strong>${providerName} payment opened.</strong> Once finished, click "Confirm & Reserve IT Session" below to log your booking reference.`;
      paymentGateStatus.style.color = '#15803d';
    }

    return true;
  }

  // Attach click listeners to direct payment buttons
  if (stripeDirectBtn) {
    stripeDirectBtn.addEventListener('click', (e) => handlePaymentGatedClick(e, 'Stripe'));
  }
  if (paypalDirectBtn) {
    paypalDirectBtn.addEventListener('click', (e) => handlePaymentGatedClick(e, 'PayPal'));
  }
  if (paypalCardBtn) {
    paypalCardBtn.addEventListener('click', (e) => handlePaymentGatedClick(e, 'PayPal Card'));
  }

  // Live input validation listeners across all booking form inputs
  const allBookingFields = [nameInput, emailInput, phoneInput, serviceSelect, dateInput, timeSelect, issueInput];
  allBookingFields.forEach(field => {
    if (field) {
      field.addEventListener('input', () => {
        if (field.value && field.value.trim()) field.classList.remove('input-error');
        updatePaymentGateStatus();
      });
      field.addEventListener('change', () => {
        if (field.value && field.value.trim()) field.classList.remove('input-error');
        updatePaymentGateStatus();
      });
    }
  });

  updatePaymentGateStatus();

  // On-Call Visit vs Remote Screen-Share Toggle & OS Installation Auto-Trigger
  function setSupportMode(isOnCall) {
    const postcodeContainer = document.getElementById('step-2-postcode-container');
    if (postcodeContainer) {
      postcodeContainer.style.display = isOnCall ? 'block' : 'none';
    }

    if (isOnCall) {
      if (paymentPartnerSection) {
        paymentPartnerSection.style.display = 'none';
        paymentPartnerSection.querySelectorAll('input').forEach(inp => inp.disabled = true);
      }
      if (oncallQuoteSection) {
        oncallQuoteSection.style.display = 'block';
      }
      if (bookingSubmitBtn) {
        bookingSubmitBtn.textContent = 'Submit Request for Custom On-Call Quote';
      }
    } else {
      if (paymentPartnerSection) {
        paymentPartnerSection.style.display = 'block';
        paymentPartnerSection.querySelectorAll('input').forEach(inp => inp.disabled = false);
      }
      if (oncallQuoteSection) {
        oncallQuoteSection.style.display = 'none';
      }
      if (bookingSubmitBtn) {
        bookingSubmitBtn.textContent = 'Confirm Booking';
      }
    }

    if (currentStep === 3) {
      updateStep3Recap();
    }
  }

  if (deliveryRemoteRadio) {
    deliveryRemoteRadio.addEventListener('change', () => {
      if (deliveryRemoteRadio.checked) setSupportMode(false);
    });
  }

  if (deliveryOnCallRadio) {
    deliveryOnCallRadio.addEventListener('change', () => {
      if (deliveryOnCallRadio.checked) setSupportMode(true);
    });
  }

  if (serviceSelect) {
    serviceSelect.addEventListener('change', () => {
      if (serviceSelect.value === 'os-software') {
        if (deliveryOnCallRadio) {
          deliveryOnCallRadio.checked = true;
          setSupportMode(true);
        }
      }
    });
  }

  // Sync dropdown with radio cards if both exist
  if (packageSelect) {
    packageSelect.addEventListener('change', () => {
      const selectedVal = packageSelect.value;
      updatePaymentLinks(selectedVal);

      // Check corresponding radio if present, otherwise uncheck all radios
      packageRadioCards.forEach(r => {
        r.checked = (r.value === selectedVal);
      });
    });
  }

  packageRadioCards.forEach(radio => {
    radio.addEventListener('change', () => {
      if (radio.checked) {
        if (packageSelect) packageSelect.value = radio.value;
        updatePaymentLinks(radio.value);
      }
    });
  });

  // Auto-select package from URL parameter (?plan=... or ?package=...)
  const urlParams = new URLSearchParams(window.location.search);
  const planParam = urlParams.get('plan') || urlParams.get('package');
  let initialKey = 'remote-hour'; // default £55

  if (planParam) {
    const cleanParam = planParam.toLowerCase().trim();
    if (PRICING_PACKAGES[cleanParam]) {
      initialKey = cleanParam;
    } else if (cleanParam.includes('quick') || cleanParam === '29') {
      initialKey = 'quick-fix';
    } else if (cleanParam.includes('hour') || cleanParam === '55' || cleanParam === 'remote-fix' || cleanParam === 'remote') {
      initialKey = 'remote-hour';
    } else if (cleanParam.includes('extended') || cleanParam === '95' || cleanParam === 'tune-up' || cleanParam === 'tuneup') {
      initialKey = 'extended-session';
    } else if (cleanParam.includes('extra') || cleanParam === '50') {
      initialKey = 'extra-hour';
    } else if (cleanParam.includes('sameday') || cleanParam === 'same-day' || cleanParam === '75') {
      initialKey = 'same-day';
    } else if (cleanParam.includes('weekend') || cleanParam.includes('evening') || cleanParam === '85') {
      initialKey = 'evening-weekend';
    } else if (cleanParam.includes('user-setup') || cleanParam === 'usersetup') {
      initialKey = 'user-setup';
    } else if (cleanParam.includes('m365') && cleanParam.includes('10')) {
      initialKey = 'm365-setup-10';
    } else if (cleanParam.includes('m365')) {
      initialKey = 'm365-setup-5';
    } else if (cleanParam.includes('health') && cleanParam.includes('30')) {
      initialKey = 'health-check-30days';
    } else if (cleanParam.includes('health') && cleanParam.includes('fix')) {
      initialKey = 'health-check-fixes';
    } else if (cleanParam.includes('health')) {
      initialKey = 'health-check';
    } else if (cleanParam.includes('business-plus')) {
      initialKey = 'business-plus-monthly';
    } else if (cleanParam.includes('business')) {
      initialKey = 'business-monthly';
    } else if (cleanParam.includes('essential')) {
      initialKey = 'essential-monthly';
    }
  }

  // Apply initial selection
  if (packageSelect) packageSelect.value = initialKey;
  packageRadioCards.forEach(r => {
    r.checked = (r.value === initialKey);
  });
  updatePaymentLinks(initialKey);

  // Send Booking Confirmation & Payment Request Emails to User and Engineer (dm@covebit.co.uk)
  function sendBookingConfirmationEmails(booking) {
    const adminEmail = 'dm@covebit.co.uk';
    const clientEmail = booking.email;
    const refTag = `#${booking.bookingRef}`;

    // Subject
    const subject = `Booking Confirmation & Payment Request [${refTag}] - CoveBit IT Support`;

    // Email Body with Complete Booking Summary & Remark Instructions
    const emailBody = [
      `Hello ${booking.name},`,
      '',
      `Thank you for scheduling your IT support session with CoveBit.`,
      `Your booking request has been successfully received under reference ${refTag}.`,
      '',
      '==================================================',
      'COMPLETE BOOKING SUMMARY',
      '==================================================',
      `Booking Reference : ${refTag}`,
      `Client Name       : ${booking.name}`,
      `Email Address     : ${booking.email}`,
      `Phone Number      : ${booking.phone}`,
      `Service Needed    : ${booking.service}`,
      `Selected Package  : ${booking.packageName} (${booking.priceStr} GBP)`,
      `Delivery Method   : ${booking.sessionType}`,
      `Date & Time Slot  : ${booking.date} (${booking.time})`,
      booking.postcode ? `On-Site Postcode  : ${booking.postcode}` : '',
      'Issue Description :',
      `${booking.issue}`,
      '',
      '==================================================',
      'PAYMENT INSTRUCTIONS',
      '==================================================',
      'Please make the payment to below payment option and confirm booking.',
      `'Please mention booking reference number (${refTag}) while making payment as remark.'`,
      '',
      'Payment Options:',
      `• Stripe (Credit / Debit Card) : ${booking.stripeUrl}`,
      `• PayPal (Instant Checkout)    : ${booking.paypalUrl}`,
      '',
      '==================================================',
      'WHAT HAPPENS NEXT?',
      '==================================================',
      '1. Verification: D. Meena will contact you via phone or WhatsApp (+44 7979 515140) to confirm your session slot.',
      '2. Remote Session: You will receive a secure 1-click Quick Assist / AnyDesk link at your appointment time.',
      '3. Full Control: You watch the screen live and remain in complete control at all times.',
      '',
      'Need to adjust your reservation or discuss your setup?',
      'Call: 07979 515140 | WhatsApp: https://wa.me/447979515140',
      'Email: dm@covebit.co.uk | Web: https://covebit.co.uk',
      '',
      'Best regards,',
      'D. Meena — Senior IT Systems Engineer',
      'CoveBit IT Support'
    ].filter(line => line !== '').join('\n');

    // 1. Configure pre-filled 1-click mail client button for user / verification
    const mailtoBtn = document.getElementById('confirm-email-mailto-btn');
    if (mailtoBtn) {
      const mailtoUrl = `mailto:${encodeURIComponent(adminEmail)}?cc=${encodeURIComponent(clientEmail)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
      mailtoBtn.href = mailtoUrl;
    }

    // 2. Dispatch email payload to webhook/endpoint if configured
    try {
      const payload = {
        bookingRef: booking.bookingRef,
        recipientUser: clientEmail,
        recipientAdmin: adminEmail,
        subject: subject,
        body: emailBody,
        details: booking,
        timestamp: new Date().toISOString()
      };

      const emailEndpoint = window.COVEBIT_EMAIL_ENDPOINT || null;
      if (emailEndpoint) {
        fetch(emailEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }).catch(err => {
          console.warn('Booking confirmation email webhook notification:', err);
        });
      }

      console.info(`[CoveBit] Booking confirmation email prepared for ${clientEmail} and ${adminEmail} with ref ${refTag}.`);
    } catch (e) {
      console.warn('Email dispatch handler notice:', e);
    }
  }

  // Form Submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const res = validateBookingForm({ focusFirst: true, showErrors: true });
    if (!res.isValid) {
      alert('Please fill in all required fields marked with * to schedule your session:\n\n• ' + res.missing.join('\n• '));
      return;
    }

    const isOnCall = deliveryOnCallRadio ? deliveryOnCallRadio.checked : false;

    // 1. Get package
    let selectedPackageKey = initialKey;
    if (packageSelect && packageSelect.value) {
      selectedPackageKey = packageSelect.value;
    } else {
      const checkedRadio = document.querySelector('input[name="selected_package"]:checked');
      if (checkedRadio) selectedPackageKey = checkedRadio.value;
    }

    const pkg = PRICING_PACKAGES[selectedPackageKey] || PRICING_PACKAGES['remote-hour'];

    // 2. Extract Values
    const name = (document.getElementById('booking-name') || {}).value || '';
    const email = (emailInput || {}).value || '';
    const phone = (phoneInput || {}).value || '';
    const currentServiceSelect = document.getElementById('booking-service');
    const service = currentServiceSelect ? currentServiceSelect.options[currentServiceSelect.selectedIndex].text : '';
    const sessionTypeRadio = document.querySelector('input[name="session_type"]:checked');
    const sessionType = sessionTypeRadio ? sessionTypeRadio.value : (isOnCall ? 'On-Call Visit' : 'Remote Screen-Share');
    const date = (dateInput || {}).value || '';
    const time = (timeSelect || {}).value || '';
    const issue = (issueInput || {}).value || '';
    const postcode = (document.getElementById('booking-postcode') || {}).value || '';

    // 3. Payment Partner (Stripe or PayPal) vs On-Call Quote
    let paymentMethodName = 'Stripe (Credit / Debit Card)';
    let paymentActionUrl = pkg.stripeUrl;

    if (isOnCall) {
      paymentMethodName = 'Custom Quote for On-Call Visit (No Upfront Prepayment)';
      paymentActionUrl = '';
    } else {
      const selectedPaymentInput = document.querySelector('input[name="payment_partner"]:checked');
      const paymentMethod = selectedPaymentInput ? selectedPaymentInput.value : 'stripe';
      if (paymentMethod === 'paypal') {
        paymentMethodName = 'PayPal Express';
        paymentActionUrl = pkg.paypalUrl;
      }
    }

    // Generate reference codes
    const randomCode = Math.floor(10000 + Math.random() * 90000);
    const bookingRef = `CB-${randomCode}`;

    // Populate confirmation display
    const refDisplay = document.getElementById('confirm-ref-display');
    const refRemark = document.getElementById('confirm-ref-remark');
    const emailRefTxt = document.getElementById('confirm-email-ref-txt');
    const emailClientTxt = document.getElementById('confirm-email-client-txt');
    const nameDisplay = document.getElementById('confirm-name');
    const contactDisplay = document.getElementById('confirm-contact');
    const serviceDisplay = document.getElementById('confirm-service');
    const packageDisplay = document.getElementById('confirm-package');
    const paymentDisplay = document.getElementById('confirm-payment');
    const typeDisplay = document.getElementById('confirm-type');
    const datetimeDisplay = document.getElementById('confirm-datetime');
    const issueDisplay = document.getElementById('confirm-issue');
    const confirmTitle = document.querySelector('.confirm-title');

    if (refDisplay) refDisplay.textContent = `Reference: #${bookingRef}`;
    if (refRemark) refRemark.textContent = `#${bookingRef}`;
    if (emailRefTxt) emailRefTxt.textContent = `#${bookingRef}`;
    if (emailClientTxt) emailClientTxt.textContent = email;
    if (nameDisplay) nameDisplay.textContent = name;
    if (contactDisplay) contactDisplay.textContent = `${email} | ${phone}` + (postcode ? ` | Area: ${postcode}` : '');
    if (serviceDisplay) serviceDisplay.textContent = service;
    if (packageDisplay) {
      packageDisplay.textContent = isOnCall ? `On-Call Service: ${service}` : `${pkg.name} (${pkg.priceStr} GBP)`;
    }
    if (paymentDisplay) {
      paymentDisplay.textContent = isOnCall ? 'On-Call Visit — Quote Confirmation Over Phone/WhatsApp' : `${paymentMethodName} [${pkg.priceStr}]`;
    }
    if (typeDisplay) typeDisplay.textContent = sessionType;
    if (datetimeDisplay) datetimeDisplay.textContent = `${date} at ${time}`;
    if (issueDisplay) issueDisplay.textContent = issue + (postcode ? ` [Location: ${postcode}]` : '');

    if (confirmTitle) {
      confirmTitle.textContent = isOnCall ? 'On-Call Visit Quote Request Received!' : 'Booking & Payment Request Received!';
    }

    // Trigger automated email preparation & dispatch to user and dm@covebit.co.uk
    sendBookingConfirmationEmails({
      bookingRef,
      name,
      email,
      phone,
      service,
      packageName: pkg.name,
      priceStr: pkg.priceStr,
      sessionType,
      date,
      time,
      issue,
      postcode,
      isOnCall,
      stripeUrl: pkg.stripeUrl,
      paypalUrl: pkg.paypalUrl
    });

    // Update confirmation action buttons (Both Stripe & PayPal available for client)
    const confirmPaymentBox = document.getElementById('confirm-payment-box');
    const confirmStripeBtn = document.getElementById('confirm-payment-action-btn');
    const confirmPaypalBtn = document.getElementById('confirm-paypal-btn');
    const confirmPaymentTitle = document.getElementById('confirm-payment-title');
    const confirmPaymentDesc = document.getElementById('confirm-payment-desc');
    const confirmPaidState = document.getElementById('confirm-payment-paid-state');
    const confirmPaidProviderText = document.getElementById('confirm-paid-provider-text');

    if (!isOnCall) {
      if (confirmPaymentBox) confirmPaymentBox.style.display = 'block';

      if (clientPaidBeforeSubmit) {
        // CASE 1: Client paid before "Confirm & Reserve IT Session"
        // Payment options are DISABLED to avoid double payment confusion
        if (confirmPaymentTitle) {
          confirmPaymentTitle.textContent = 'Payment Completed Prior to Reservation:';
          confirmPaymentTitle.style.color = '#166534';
        }
        if (confirmPaymentDesc) {
          confirmPaymentDesc.textContent = 'Your payment was completed before reserving. Payment options on this screen are disabled to avoid duplicate charges:';
        }
        if (confirmPaidState) {
          confirmPaidState.style.display = 'block';
        }
        if (confirmPaidProviderText) {
          confirmPaidProviderText.textContent = clientPaidProvider || 'Stripe / PayPal';
        }

        // Disable payment buttons on confirmation screen
        if (confirmStripeBtn) {
          confirmStripeBtn.href = 'javascript:void(0);';
          confirmStripeBtn.style.display = 'inline-flex';
          confirmStripeBtn.style.pointerEvents = 'none';
          confirmStripeBtn.style.opacity = '0.45';
          confirmStripeBtn.style.cursor = 'not-allowed';
          confirmStripeBtn.setAttribute('aria-disabled', 'true');
          confirmStripeBtn.innerHTML = `<span>✓ Payment Already Submitted (${pkg.priceStr})</span>`;
        }

        if (confirmPaypalBtn) {
          confirmPaypalBtn.href = 'javascript:void(0);';
          confirmPaypalBtn.style.display = 'inline-flex';
          confirmPaypalBtn.style.pointerEvents = 'none';
          confirmPaypalBtn.style.opacity = '0.45';
          confirmPaypalBtn.style.cursor = 'not-allowed';
          confirmPaypalBtn.setAttribute('aria-disabled', 'true');
          confirmPaypalBtn.innerHTML = `<span>✓ Payment Option Disabled (Avoids Duplicate)</span>`;
        }

        if (paymentDisplay) {
          paymentDisplay.innerHTML = `<span style="color: #166534; font-weight: 700;">✓ Pre-Paid via ${clientPaidProvider || 'Online Gateway'} [${pkg.priceStr}]</span>`;
        }
      } else {
        // CASE 2: Client did NOT pay before "Confirm & Reserve IT Session"
        // Payment options are ENABLED so client can pay now
        if (confirmPaymentTitle) {
          confirmPaymentTitle.textContent = 'Complete Payment Online (Stripe or PayPal):';
          confirmPaymentTitle.style.color = 'var(--primary-900)';
        }
        if (confirmPaymentDesc) {
          confirmPaymentDesc.textContent = 'Select your preferred payment method below to finalize and secure your session:';
        }
        if (confirmPaidState) {
          confirmPaidState.style.display = 'none';
        }

        if (confirmStripeBtn) {
          confirmStripeBtn.href = pkg.stripeUrl;
          confirmStripeBtn.style.display = 'inline-flex';
          confirmStripeBtn.style.pointerEvents = 'auto';
          confirmStripeBtn.style.opacity = '1';
          confirmStripeBtn.style.cursor = 'pointer';
          confirmStripeBtn.removeAttribute('aria-disabled');
          const priceSpan = confirmStripeBtn.querySelector('.confirm-stripe-price');
          if (priceSpan) {
            priceSpan.textContent = pkg.priceStr;
          } else {
            confirmStripeBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg><span>Pay <strong class="confirm-stripe-price">${pkg.priceStr}</strong> with Card (Stripe) &rarr;</span>`;
          }
        }

        if (confirmPaypalBtn) {
          confirmPaypalBtn.href = pkg.paypalUrl;
          confirmPaypalBtn.style.display = 'inline-flex';
          confirmPaypalBtn.style.pointerEvents = 'auto';
          confirmPaypalBtn.style.opacity = '1';
          confirmPaypalBtn.style.cursor = 'pointer';
          confirmPaypalBtn.removeAttribute('aria-disabled');
          const priceSpan = confirmPaypalBtn.querySelector('.confirm-paypal-price');
          if (priceSpan) {
            priceSpan.textContent = pkg.priceStr;
          } else {
            confirmPaypalBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.78.78 0 0 1 .77-.653h6.879c3.08 0 5.483.743 6.34 2.215.82 1.408.647 3.393-.513 5.9-1.229 2.656-3.344 4.148-6.289 4.148h-2.1a.78.78 0 0 0-.77.653l-1.037 4.79-.188.564zm14.162-12.72c-.066-.34-.162-.67-.29-1-.07-.22-.16-.44-.26-.65-.12-.22-.26-.43-.41-.63a4.99 4.99 0 0 0-.58-.63c-.22-.19-.46-.36-.72-.5a7.35 7.35 0 0 0-1.84-.66c-.73-.14-1.57-.21-2.52-.21H8.38a.78.78 0 0 0-.77.653L5.05 18.847a.641.641 0 0 0 .633.74h3.693l.88-4.06.03-.133a.78.78 0 0 1 .77-.653h1.838c2.945 0 5.06-1.492 6.289-4.148 1.16-2.507 1.333-4.492.513-5.9-.22-.375-.52-.705-.88-.98z"/></svg><span>Pay <strong class="confirm-paypal-price">${pkg.priceStr}</strong> with PayPal &rarr;</span>`;
          }
        }
      }
    } else {
      if (confirmPaymentBox) confirmPaymentBox.style.display = 'none';
      if (confirmStripeBtn) confirmStripeBtn.style.display = 'none';
      if (confirmPaypalBtn) confirmPaypalBtn.style.display = 'none';
    }

    // Transition UI
    form.style.display = 'none';
    confirmationState.classList.add('active');
    confirmationState.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  const newBookingBtn = document.getElementById('new-booking-trigger');
  if (newBookingBtn) {
    newBookingBtn.addEventListener('click', () => {
      clientPaidBeforeSubmit = false;
      clientPaidProvider = '';
      form.reset();
      setSupportMode(false);
      updatePaymentGateStatus();
      goToStep(1, { skipScroll: true });
      form.style.display = 'block';
      confirmationState.classList.remove('active');
      form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  // Initialize booking flow on Step 1
  goToStep(1, { skipScroll: true });
}

/* --------------------------------------------------------------------------
   Contact Page Form Validation & Submit Button Gating
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('covebit-contact-form');
  if (!form) return;

  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const phoneInput = document.getElementById('contact-phone');
  const messageInput = document.getElementById('contact-message');
  const submitBtn = document.getElementById('contact-submit-btn');
  const formNotice = document.getElementById('contact-form-notice');
  const emailErr = document.getElementById('contact-email-error');
  const phoneErr = document.getElementById('contact-phone-error');
  const successBanner = document.getElementById('contact-success-banner');

  function isNameValid() {
    return nameInput && nameInput.value.trim().length > 0;
  }

  function isEmailValid() {
    if (!emailInput) return false;
    const val = emailInput.value.trim();
    return val.length > 0 && val.includes('@') && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  }

  function isPhoneValid() {
    if (!phoneInput) return false;
    const clean = phoneInput.value.replace(/\D/g, '');
    return /^07\d{9}$/.test(clean);
  }

  function isMessageValid() {
    return messageInput && messageInput.value.trim().length > 0;
  }

  function checkFormValidity() {
    const nameOk = isNameValid();
    const emailOk = isEmailValid();
    const phoneOk = isPhoneValid();
    const messageOk = isMessageValid();

    const allValid = nameOk && emailOk && phoneOk && messageOk;

    if (submitBtn) {
      submitBtn.disabled = !allValid;
      if (allValid) {
        submitBtn.classList.remove('btn-disabled');
        if (formNotice) {
          formNotice.innerHTML = '✓ All required fields complete — ready to send message.';
          formNotice.style.color = '#059669';
        }
      } else {
        submitBtn.classList.add('btn-disabled');
        if (formNotice) {
          formNotice.innerHTML = '🔒 All fields marked with <span style="color: #dc2626; font-weight: 700;">*</span> must be filled before sending.';
          formNotice.style.color = 'var(--text-muted)';
        }
      }
    }
    return allValid;
  }

  // Real-time phone input formatting & validation
  if (phoneInput) {
    phoneInput.addEventListener('input', () => {
      let val = phoneInput.value.trim();
      if (val.startsWith('+44')) {
        val = '0' + val.slice(3);
      }
      val = val.replace(/\D/g, '').slice(0, 11);
      phoneInput.value = val;

      if (phoneErr) {
        if (val.length > 0 && (!val.startsWith('07') || val.length !== 11)) {
          phoneErr.textContent = val.length < 11 
            ? `Must start with 07 and be 11 digits (${val.length}/11 entered)`
            : 'Phone number must start with 07';
          phoneErr.style.display = 'block';
          phoneInput.classList.add('input-error');
        } else {
          phoneErr.style.display = 'none';
          phoneInput.classList.remove('input-error');
        }
      }
      checkFormValidity();
    });

    phoneInput.addEventListener('blur', () => {
      const val = phoneInput.value.trim();
      if (val.length > 0 && !/^07\d{9}$/.test(val)) {
        if (phoneErr) {
          phoneErr.textContent = 'Phone number must start with 07 and be exactly 11 digits (e.g. 07979515140)';
          phoneErr.style.display = 'block';
        }
        phoneInput.classList.add('input-error');
      } else if (val.length === 11 && /^07\d{9}$/.test(val)) {
        if (phoneErr) phoneErr.style.display = 'none';
        phoneInput.classList.remove('input-error');
      }
      checkFormValidity();
    });
  }

  // Real-time email validation
  if (emailInput) {
    emailInput.addEventListener('input', () => {
      const val = emailInput.value.trim();
      if (emailErr) {
        if (val.length > 0 && !val.includes('@')) {
          emailErr.textContent = "Email address must include an '@' mark (e.g. name@example.com)";
          emailErr.style.display = 'block';
          emailInput.classList.add('input-error');
        } else if (val.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
          emailErr.textContent = "Please enter a valid domain (e.g. name@company.co.uk)";
          emailErr.style.display = 'block';
          emailInput.classList.add('input-error');
        } else {
          emailErr.style.display = 'none';
          emailInput.classList.remove('input-error');
        }
      }
      checkFormValidity();
    });

    emailInput.addEventListener('blur', () => {
      const val = emailInput.value.trim();
      if (val.length > 0) {
        if (!val.includes('@')) {
          if (emailErr) {
            emailErr.textContent = "Email address must include an '@' mark (e.g. name@example.com)";
            emailErr.style.display = 'block';
          }
          emailInput.classList.add('input-error');
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
          if (emailErr) {
            emailErr.textContent = "Please enter a valid email address (e.g. name@example.com)";
            emailErr.style.display = 'block';
          }
          emailInput.classList.add('input-error');
        } else {
          if (emailErr) emailErr.style.display = 'none';
          emailInput.classList.remove('input-error');
        }
      }
      checkFormValidity();
    });
  }

  if (nameInput) {
    nameInput.addEventListener('input', () => {
      if (nameInput.value.trim()) nameInput.classList.remove('input-error');
      checkFormValidity();
    });
  }

  if (messageInput) {
    messageInput.addEventListener('input', () => {
      if (messageInput.value.trim()) messageInput.classList.remove('input-error');
      checkFormValidity();
    });
  }

  // Intercept click if button is somehow clicked while disabled
  if (submitBtn) {
    submitBtn.addEventListener('click', (e) => {
      if (submitBtn.disabled || !checkFormValidity()) {
        e.preventDefault();
        e.stopPropagation();
        alert('Please fill all required fields marked with * (Name, Email with @, 11-digit 07 Phone, and Message) before sending.');
        return false;
      }
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!checkFormValidity()) {
      alert('Please fill all required fields marked with * before sending your message.');
      return;
    }

    if (successBanner) {
      successBanner.style.display = 'block';
      successBanner.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      alert('Message Successfully Sent! Thank you.');
    }

    form.reset();
    checkFormValidity();
  });

  // Initial check on load
  checkFormValidity();
}

/* --------------------------------------------------------------------------
   Apple-Style Fluid Scroll Reveal
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  if (!('IntersectionObserver' in window)) return;

  const revealSelectors = [
    '.service-card',
    '.feature-card',
    '.pricing-card',
    '.booking-form-card',
    '.section-header',
    '.faq-item',
    '.contact-wrapper',
    '.stat-card',
    '.testimonial-card',
    '.area-card'
  ];

  const elements = document.querySelectorAll(revealSelectors.join(', '));
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach((el) => {
    if (!el.classList.contains('reveal-on-scroll')) {
      el.classList.add('reveal-on-scroll');
      if (el.parentElement && el.parentElement.children.length > 1) {
        const siblingIndex = Array.prototype.indexOf.call(el.parentElement.children, el);
        if (siblingIndex > 0 && siblingIndex < 6) {
          el.style.transitionDelay = `${siblingIndex * 0.08}s`;
        }
      }
    }
    observer.observe(el);
  });
}
