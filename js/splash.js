(function () {
  // Only play splash once per session
  if (sessionStorage.getItem('dak-splash-shown')) {
    var splashEl = document.getElementById('splash');
    if (splashEl) splashEl.style.display = 'none';
    return;
  }

  var splash = document.getElementById('splash');
  var splashBg = splash.querySelector('.splash-bg');
  var dakText = document.getElementById('dak-text');
  var flowersContainer = document.getElementById('flowers');

  var colors = ['#E874BA', '#1B362D', '#BED5FA', '#D4E335', '#000000', '#EBE4D9'];
  var flowerCount = 28;
  var exclusionRadius = 220;

  // Rounded 6-petal flower (matches the DAK flower image)
  var flowerPath = 'M100,30 C115,30 130,10 100,0 C70,10 85,30 100,30Z M145,55 C155,45 175,45 170,20 C145,25 140,45 145,55Z M145,100 C155,90 175,85 170,115 C145,110 140,95 145,100Z M100,130 C115,130 130,150 100,160 C70,150 85,130 100,130Z M55,100 C45,90 25,85 30,115 C55,110 60,95 55,100Z M55,55 C45,45 25,45 30,20 C55,25 60,45 55,55Z';

  function makeFlowerSVG(color, size) {
    return '<svg width="' + size + '" height="' + size + '" viewBox="-10 -10 220 220" xmlns="http://www.w3.org/2000/svg">' +
      '<g transform="translate(100,80)">' +
      '<ellipse cx="0" cy="-55" rx="22" ry="30" fill="' + color + '" transform="rotate(0)"/>' +
      '<ellipse cx="0" cy="-55" rx="22" ry="30" fill="' + color + '" transform="rotate(60)"/>' +
      '<ellipse cx="0" cy="-55" rx="22" ry="30" fill="' + color + '" transform="rotate(120)"/>' +
      '<ellipse cx="0" cy="-55" rx="22" ry="30" fill="' + color + '" transform="rotate(180)"/>' +
      '<ellipse cx="0" cy="-55" rx="22" ry="30" fill="' + color + '" transform="rotate(240)"/>' +
      '<ellipse cx="0" cy="-55" rx="22" ry="30" fill="' + color + '" transform="rotate(300)"/>' +
      '</g></svg>';
  }

  function spawnFlowers() {
    var vw = window.innerWidth;
    var vh = window.innerHeight;
    var cx = vw / 2;
    var cy = vh / 2;

    for (var i = 0; i < flowerCount; i++) {
      var x, y, dist;
      do {
        x = Math.random() * vw;
        y = Math.random() * vh;
        dist = Math.hypot(x - cx, y - cy);
      } while (dist < exclusionRadius);

      var size = 40 + Math.floor(Math.random() * 65);
      var color = colors[Math.floor(Math.random() * colors.length)];
      var rotation = Math.floor(Math.random() * 360);

      var el = document.createElement('div');
      el.className = 'flower';
      el.innerHTML = makeFlowerSVG(color, size);
      el.style.left = x + 'px';
      el.style.top = y + 'px';
      el.style.width = size + 'px';
      el.style.height = size + 'px';
      el.style.animationDelay = (Math.random() * 1.8) + 's';
      el.style.transform = 'rotate(' + rotation + 'deg)';
      flowersContainer.appendChild(el);
    }
  }

  function startZoom() {
    dakText.classList.add('zoom');
    setTimeout(function () { splashBg.classList.add('white-out'); }, 300);
    setTimeout(function () { splash.classList.add('hidden'); }, 600);
    setTimeout(function () {
      splash.style.display = 'none';
      sessionStorage.setItem('dak-splash-shown', '1');
    }, 1100);
  }

  spawnFlowers();
  setTimeout(startZoom, 2500);
})();
