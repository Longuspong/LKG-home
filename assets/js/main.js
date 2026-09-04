document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // In jeder Termin-Tabelle den nächsten (ersten noch nicht vergangenen)
  // Termin hervorheben. Grundlage ist das Attribut data-date="JJJJ-MM-TT".
  var today = new Date();
  today.setHours(0, 0, 0, 0);

  document.querySelectorAll('table[data-schedule]').forEach(function (table) {
    var rows = table.querySelectorAll('tbody tr[data-date]');
    for (var i = 0; i < rows.length; i++) {
      var date = new Date(rows[i].getAttribute('data-date') + 'T00:00:00');
      if (!isNaN(date.getTime()) && date >= today) {
        rows[i].classList.add('is-next');
        break;
      }
    }
  });

  // Karussell (Startseite): gleich große Folien in einem Block, per Wischen,
  // Pfeilen, Punkten oder Pfeiltasten blätterbar. Das native Scroll-Snapping
  // liefert das Wischen; JS ergänzt Punkte, Pfeile und die aktive Anzeige.
  document.querySelectorAll('[data-carousel]').forEach(function (carousel) {
    var viewport = carousel.querySelector('[data-carousel-viewport]');
    var slides = Array.prototype.slice.call(carousel.querySelectorAll('.carousel__slide'));
    var dotsWrap = carousel.querySelector('[data-carousel-dots]');
    var prevBtn = carousel.querySelector('[data-carousel-prev]');
    var nextBtn = carousel.querySelector('[data-carousel-next]');
    if (!viewport || slides.length === 0) return;

    carousel.classList.add('is-enhanced');
    var current = 0;

    var dots = slides.map(function (slide, i) {
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'carousel__dot';
      dot.setAttribute('aria-label', 'Beitrag ' + (i + 1) + ' von ' + slides.length);
      dot.addEventListener('click', function () { goTo(i); });
      if (dotsWrap) dotsWrap.appendChild(dot);
      return dot;
    });

    function setActive(i) {
      current = i;
      dots.forEach(function (dot, di) {
        var isActive = di === i;
        dot.classList.toggle('is-active', isActive);
        dot.setAttribute('aria-current', isActive ? 'true' : 'false');
      });
      if (prevBtn) prevBtn.disabled = i <= 0;
      if (nextBtn) nextBtn.disabled = i >= slides.length - 1;
    }

    function goTo(i) {
      i = Math.max(0, Math.min(slides.length - 1, i));
      viewport.scrollTo({ left: i * viewport.clientWidth, behavior: 'smooth' });
      setActive(i);
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { goTo(current - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { goTo(current + 1); });

    viewport.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); goTo(current + 1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(current - 1); }
    });

    // Aktive Folie beim Wischen/Scrollen erkennen
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            var idx = slides.indexOf(entry.target);
            if (idx !== -1) setActive(idx);
          }
        });
      }, { root: viewport, threshold: [0.6] });
      slides.forEach(function (slide) { io.observe(slide); });
    } else {
      var scrollTimer;
      viewport.addEventListener('scroll', function () {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(function () {
          setActive(Math.round(viewport.scrollLeft / viewport.clientWidth));
        }, 90);
      });
    }

    setActive(0);
  });
});
