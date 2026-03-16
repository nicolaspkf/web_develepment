// Hamburger menu toggle
var hamburger = document.getElementById('hamburger');
var navLinks = document.getElementById('nav-links');

if (hamburger) {
  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('show');
  });

  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      hamburger.classList.remove('open');
      navLinks.classList.remove('show');
    });
  });
}

// Event filter buttons
var filterBtns = document.querySelectorAll('.filter-btn');
var eventCards = document.querySelectorAll('.event-card[data-category]');

filterBtns.forEach(function (btn) {
  btn.addEventListener('click', function () {
    filterBtns.forEach(function (b) { b.classList.remove('active'); });
    btn.classList.add('active');
    var category = btn.getAttribute('data-filter');
    eventCards.forEach(function (card) {
      if (category === 'all' || card.getAttribute('data-category') === category) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Form validation + email sending
document.querySelectorAll('form[data-validate]').forEach(function (form) {
  var successEl = form.parentElement.querySelector('.form-success');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var valid = true;

    form.querySelectorAll('[required]').forEach(function (input) {
      var group = input.closest('.form-group');
      if (!input.value.trim()) {
        group.classList.add('invalid');
        valid = false;
      } else if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
        group.classList.add('invalid');
        valid = false;
      } else {
        group.classList.remove('invalid');
      }
    });

    if (valid) {
      // Gather form data
      var formData = {};
      new FormData(form).forEach(function (value, key) {
        formData[key] = value;
      });

      // Build email body
      var subject = encodeURIComponent('DAK Application: ' + (formData.name || ''));
      var body = encodeURIComponent(
        'Name: ' + (formData.name || '') + '\n' +
        'Email: ' + (formData.email || '') + '\n' +
        'Programme: ' + (formData.program || '') + '\n\n' +
        'Message:\n' + (formData.message || '')
      );

      // Determine recipient — dev (localhost) includes test email
      var isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      var recipients = isLocalhost
        ? 'dak@itu.dk,rodepost0@gmail.com'
        : 'dak@itu.dk';

      // Open mailto
      window.location.href = 'mailto:' + recipients + '?subject=' + subject + '&body=' + body;

      // Show success
      form.style.display = 'none';
      if (successEl) successEl.classList.add('show');
    }
  });

  form.querySelectorAll('[required]').forEach(function (input) {
    input.addEventListener('input', function () {
      input.closest('.form-group').classList.remove('invalid');
    });
  });
});

// =============================================
// Fidget effects: letter wave on headings
// =============================================
function setupWaveText() {
  document.querySelectorAll('.wave-text').forEach(function (el) {
    if (el.dataset.waveReady) return;
    el.dataset.waveReady = '1';

    var text = el.textContent;
    el.textContent = '';

    for (var i = 0; i < text.length; i++) {
      var span = document.createElement('span');
      span.className = 'letter' + (text[i] === ' ' ? ' space' : '');
      span.textContent = text[i] === ' ' ? '\u00A0' : text[i];
      span.style.animationDelay = (i * 0.04) + 's';
      el.appendChild(span);
    }
  });
}

// Run on load
setupWaveText();
