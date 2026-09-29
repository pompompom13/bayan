(function () {
  var OPEN = 12, CLOSE = 26; // ежедневно 12:00–02:00
  var root = document.documentElement;

  // --- 18+ ---
  document.getElementById('ageYes').addEventListener('click', function () {
    try { localStorage.setItem('bayan-age', 'yes'); } catch (e) {}
    root.classList.add('age-ok');
  });
  document.getElementById('ageNo').addEventListener('click', function () {
    document.getElementById('ageAsk').hidden = true;
    document.getElementById('ageDeny').hidden = false;
  });

  // --- open status (Moscow time) ---
  var msk = new Date(Date.now() + (new Date().getTimezoneOffset() + 180) * 60000);
  var h = msk.getHours() + msk.getMinutes() / 60;
  var open = h >= OPEN || h < CLOSE - 24;
  var st = document.getElementById('status');
  st.textContent = 'Кальянная у Бауманской · ' + (open ? 'открыто до 02:00' : 'откроемся в 12:00');
  st.classList.add(open ? 'is-open' : 'is-closed');

  // --- header ---
  var top = document.querySelector('.top');
  var onScroll = function () { top.classList.toggle('is-solid', window.scrollY > 40); };
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  var burger = document.getElementById('burger'), nav = document.getElementById('nav');
  burger.addEventListener('click', function () {
    var o = document.body.classList.toggle('nav-open');
    burger.setAttribute('aria-expanded', o);
  });
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') { document.body.classList.remove('nav-open'); burger.setAttribute('aria-expanded', 'false'); }
  });

  // --- reveal ---
  var els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('is-in'); io.unobserve(x.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add('is-in'); });
  }
})();
