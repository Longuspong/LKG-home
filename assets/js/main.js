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
});
