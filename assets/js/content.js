(function () {
  function q(sel, root) { return (root || document).querySelector(sel); }

  function buildTableSection(section) {
    var frag = document.createDocumentFragment();

    var h3 = document.createElement('h3');
    h3.textContent = section.title;
    frag.appendChild(h3);

    var wrap = document.createElement('div');
    wrap.className = 'table-scroll';

    var table = document.createElement('table');
    var thead = document.createElement('thead');
    var trh = document.createElement('tr');
    (section.columns || []).forEach(function (col) {
      var th = document.createElement('th');
      th.textContent = col;
      trh.appendChild(th);
    });
    thead.appendChild(trh);

    var tbody = document.createElement('tbody');
    (section.rows || []).forEach(function (row) {
      var tr = document.createElement('tr');
      row.forEach(function (cell) {
        var td = document.createElement('td');
        td.textContent = cell;
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });

    table.appendChild(thead);
    table.appendChild(tbody);
    wrap.appendChild(table);
    frag.appendChild(wrap);
    return frag;
  }

  function renderTermine(data) {
    var container = q('#termine-content');
    if (!container) return;
    container.innerHTML = '';

    var meetingP = document.createElement('p');
    meetingP.className = 'meeting-place';
    meetingP.appendChild(document.createTextNode('im Gemeinschaftshaus '));
    var strong = document.createElement('strong');
    strong.textContent = data.meetingPlace || '';
    meetingP.appendChild(strong);
    container.appendChild(meetingP);

    var ul = document.createElement('ul');
    ul.className = 'schedule-list';
    (data.weeklySchedule || []).forEach(function (item) {
      var li = document.createElement('li');
      var what = document.createElement('span');
      what.className = 'what';
      what.textContent = item.what;
      var when = document.createElement('span');
      when.className = 'when';
      when.textContent = item.when;
      li.appendChild(what);
      li.appendChild(when);
      ul.appendChild(li);
    });
    container.appendChild(ul);

    (data.tables || []).forEach(function (section) {
      container.appendChild(buildTableSection(section));
    });

    if (data.note) {
      var note = document.createElement('p');
      note.className = 'table-note';
      note.textContent = data.note;
      container.appendChild(note);
    }
  }

  function renderImpulsTeaser(data) {
    var container = q('#impuls-content');
    var dateEl = q('#impuls-date');
    if (!container || !data.entries || !data.entries.length) return;
    var entry = data.entries[0];

    if (dateEl) dateEl.textContent = entry.dateLabel;

    var card = document.createElement('div');
    card.className = 'impuls-card';

    var bq = document.createElement('blockquote');
    bq.textContent = entry.quote;
    card.appendChild(bq);

    var teaserText = entry.teaser || (entry.paragraphs && entry.paragraphs[0]) || '';
    var p = document.createElement('p');
    p.textContent = teaserText;
    card.appendChild(p);

    var author = document.createElement('p');
    author.className = 'impuls-author';
    author.textContent = entry.author;
    card.appendChild(author);

    var link = document.createElement('a');
    link.className = 'btn btn-outline';
    link.href = 'archiv.html#' + entry.id;
    link.textContent = 'Ganzen Impuls lesen & Archiv';
    card.appendChild(link);

    container.innerHTML = '';
    container.appendChild(card);
  }

  function renderArchiv(data) {
    var container = q('#archiv-content');
    if (!container || !data.entries) return;
    container.innerHTML = '';

    data.entries.forEach(function (entry) {
      var article = document.createElement('article');
      article.className = 'archive-entry';
      article.id = entry.id;

      var time = document.createElement('time');
      time.setAttribute('datetime', entry.datetime);
      time.textContent = entry.dateLabel;
      article.appendChild(time);

      var bq = document.createElement('blockquote');
      bq.textContent = entry.quote;
      article.appendChild(bq);

      (entry.paragraphs || []).forEach(function (text) {
        var p = document.createElement('p');
        p.textContent = text;
        article.appendChild(p);
      });

      var author = document.createElement('p');
      author.className = 'impuls-author';
      author.textContent = entry.author;
      article.appendChild(author);

      container.appendChild(article);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    if (q('#termine-content')) {
      fetch('assets/data/termine.json')
        .then(function (r) { return r.json(); })
        .then(renderTermine)
        .catch(function (err) { console.error('Termine konnten nicht geladen werden.', err); });
    }

    if (q('#impuls-content')) {
      fetch('assets/data/impulse.json')
        .then(function (r) { return r.json(); })
        .then(renderImpulsTeaser)
        .catch(function (err) { console.error('Impuls konnte nicht geladen werden.', err); });
    }

    if (q('#archiv-content')) {
      fetch('assets/data/impulse.json')
        .then(function (r) { return r.json(); })
        .then(renderArchiv)
        .catch(function (err) { console.error('Archiv konnte nicht geladen werden.', err); });
    }
  });
})();
