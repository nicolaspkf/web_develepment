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
      var formData = {};
      new FormData(form).forEach(function (value, key) {
        formData[key] = value;
      });

      var subject = encodeURIComponent('DAK Application: ' + (formData.name || ''));
      var body = encodeURIComponent(
        'Name: ' + (formData.name || '') + '\n' +
        'Email: ' + (formData.email || '') + '\n' +
        'Programme: ' + (formData.program || '') + '\n\n' +
        'Message:\n' + (formData.message || '')
      );

      var isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      var recipients = isLocalhost
        ? 'dak@itu.dk,rodepost0@gmail.com'
        : 'dak@itu.dk';

      window.location.href = 'mailto:' + recipients + '?subject=' + subject + '&body=' + body;

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
// Fidget effects: letter wave on headings + nav logo
// =============================================
function setupWaveText() {
  document.querySelectorAll('.wave-text').forEach(function (el) {
    if (el.dataset.waveReady) return;
    el.dataset.waveReady = '1';

    // For nav-logo, preserve the flower SVG span
    var flowerSpan = el.querySelector('.nav-logo-flower');

    var text = '';
    // Get only text nodes (not child elements)
    el.childNodes.forEach(function (node) {
      if (node.nodeType === 3) text += node.textContent;
    });

    // Remove text nodes but keep element children
    el.childNodes.forEach(function (node) {
      if (node.nodeType === 3) node.textContent = '';
    });

    // Remove existing text nodes
    var toRemove = [];
    el.childNodes.forEach(function (node) {
      if (node.nodeType === 3 && node.textContent.trim() === '') toRemove.push(node);
    });
    toRemove.forEach(function (n) { n.remove(); });

    // Insert letter spans before the flower (if present) or at end
    for (var i = 0; i < text.length; i++) {
      var span = document.createElement('span');
      span.className = 'letter' + (text[i] === ' ' ? ' space' : '');
      span.textContent = text[i] === ' ' ? '\u00A0' : text[i];
      span.style.animationDelay = (i * 0.04) + 's';
      if (flowerSpan) {
        el.insertBefore(span, flowerSpan);
      } else {
        el.appendChild(span);
      }
    }
  });
}

setupWaveText();

// =============================================
// Logo click: spin entire page 360°
// =============================================
document.querySelectorAll('.nav-logo').forEach(function (logo) {
  logo.addEventListener('click', function (e) {
    e.preventDefault();
    if (document.body.classList.contains('spin-page')) return;

    document.body.classList.add('spin-page');

    setTimeout(function () {
      document.body.classList.remove('spin-page');
      // Navigate to home after spin
      window.location.href = logo.href;
    }, 800);
  });
});

// =============================================
// Draggable hero flowers with throw physics
// =============================================
(function () {
  var banner = document.querySelector('.hero-banner');
  if (!banner) return;

  var flowers = banner.querySelectorAll('.hero-flower');
  if (!flowers.length) return;

  flowers.forEach(function (flower) {
    var isDragging = false;
    var startX, startY, flowX, flowY;
    var lastX, lastY, lastTime;
    var velocityX = 0, velocityY = 0;

    // Get flower position relative to banner
    function getFlowerPos() {
      var fr = flower.getBoundingClientRect();
      var br = banner.getBoundingClientRect();
      return {
        x: fr.left - br.left,
        y: fr.top - br.top
      };
    }

    function onStart(e) {
      e.preventDefault();
      isDragging = true;
      flower.classList.add('dragging');
      flower.classList.remove('thrown');

      var pos = getFlowerPos();
      flowX = pos.x;
      flowY = pos.y;

      var clientX = e.touches ? e.touches[0].clientX : e.clientX;
      var clientY = e.touches ? e.touches[0].clientY : e.clientY;
      startX = clientX - flowX;
      startY = clientY - flowY;

      lastX = clientX;
      lastY = clientY;
      lastTime = Date.now();
      velocityX = 0;
      velocityY = 0;

      // Position with left/top instead of CSS animation
      flower.style.position = 'absolute';
      flower.style.left = flowX + 'px';
      flower.style.top = flowY + 'px';
      flower.style.inset = 'auto';
      flower.style.right = 'auto';
      flower.style.bottom = 'auto';
    }

    function onMove(e) {
      if (!isDragging) return;
      e.preventDefault();

      var clientX = e.touches ? e.touches[0].clientX : e.clientX;
      var clientY = e.touches ? e.touches[0].clientY : e.clientY;

      var now = Date.now();
      var dt = now - lastTime;
      if (dt > 0) {
        velocityX = (clientX - lastX) / dt * 16; // normalize to ~60fps
        velocityY = (clientY - lastY) / dt * 16;
      }
      lastX = clientX;
      lastY = clientY;
      lastTime = now;

      flowX = clientX - startX;
      flowY = clientY - startY;

      flower.style.left = flowX + 'px';
      flower.style.top = flowY + 'px';
    }

    function onEnd() {
      if (!isDragging) return;
      isDragging = false;
      flower.classList.remove('dragging');

      // Apply throw — let it fly with velocity, bouncing inside banner
      var bannerRect = banner.getBoundingClientRect();
      var bw = bannerRect.width;
      var bh = bannerRect.height;
      var fw = flower.offsetWidth;
      var fh = flower.offsetHeight;

      // Amplify velocity for a fun throw
      var throwX = flowX + velocityX * 15;
      var throwY = flowY + velocityY * 15;

      // Clamp to stay inside banner
      throwX = Math.max(0, Math.min(throwX, bw - fw));
      throwY = Math.max(0, Math.min(throwY, bh - fh));

      flower.classList.add('thrown');
      flower.style.left = throwX + 'px';
      flower.style.top = throwY + 'px';

      // After throw animation, let it resume drifting
      setTimeout(function () {
        flower.classList.remove('thrown');
      }, 1600);
    }

    // Mouse events
    flower.addEventListener('mousedown', onStart);
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onEnd);

    // Touch events
    flower.addEventListener('touchstart', onStart, { passive: false });
    document.addEventListener('touchmove', onMove, { passive: false });
    document.addEventListener('touchend', onEnd);
  });
})();
