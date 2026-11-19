(function () {
  'use strict';

  /* ---------- Snow: CSS animates, JS only creates the flakes ---------- */
  var snow = document.getElementById('snow');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (snow && !reduceMotion) {
    var count = window.innerWidth < 600 ? 24 : 45;
    var frag = document.createDocumentFragment();

    for (var i = 0; i < count; i++) {
      var flake = document.createElement('span');
      var size = 3 + Math.random() * 5;
      flake.className = 'flake';
      flake.style.left = (Math.random() * 100) + '%';
      flake.style.width = size + 'px';
      flake.style.height = size + 'px';
      flake.style.animationDuration = (8 + Math.random() * 10) + 's';
      flake.style.animationDelay = (-Math.random() * 18) + 's';
      flake.style.setProperty('--drift', ((Math.random() * 60) - 30) + 'px');
      frag.appendChild(flake);
    }
    snow.appendChild(frag);
  }

  /* ---------- Smooth scroll buttons ---------- */
  var links = document.querySelectorAll('[data-scroll]');
  Array.prototype.forEach.call(links, function (link) {
    link.addEventListener('click', function (e) {
      var target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    });
  });

  /* ---------- Photo modal ---------- */
  var modal = document.getElementById('modal');
  var modalImg = document.getElementById('modal-img');
  var modalCap = document.getElementById('modal-cap');
  var closeBtn = document.getElementById('modal-close');
  var lastFocus = null;

  function openModal(item) {
    var img = item.querySelector('img');
    lastFocus = item;
    modalImg.src = img.currentSrc || img.src;
    modalImg.alt = img.alt;
    modalCap.textContent = item.getAttribute('data-caption') || '';
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeModal() {
    modal.hidden = true;
    modalImg.removeAttribute('src');
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }

  Array.prototype.forEach.call(document.querySelectorAll('.gallery__item'), function (item) {
    item.addEventListener('click', function () { openModal(item); });
  });

  closeBtn.addEventListener('click', closeModal);

  // Tap the dark backdrop to close
  modal.addEventListener('click', function (e) {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.hidden) closeModal();
  });
})();
