(function () {
  function el(tag, attrs, children) {
    var e = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === 'class') e.className = attrs[k];
        else e.setAttribute(k, attrs[k]);
      });
    }
    (children || []).forEach(function (c) {
      e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    });
    return e;
  }

  function textInput(value) {
    var i = document.createElement('input');
    i.type = 'text';
    i.value = value || '';
    return i;
  }

  function textArea(value, rows) {
    var t = document.createElement('textarea');
    t.rows = rows || 4;
    t.value = value || '';
    return t;
  }

  function button(label, cls, onClick) {
    var b = document.createElement('button');
    b.type = 'button';
    if (cls) b.className = cls;
    b.textContent = label;
    b.addEventListener('click', onClick);
    return b;
  }

  // ---------- Wöchentlicher Rhythmus ----------

  function addWeeklyRow(what, when) {
    var list = document.getElementById('weekly-list');
    var row = el('div', { class: 'row' });
    var whatInput = textInput(what);
    var whenInput = textInput(when);
    row.appendChild(whatInput);
    row.appendChild(whenInput);
    row.appendChild(button('Entfernen', 'danger', function () { row.remove(); }));
    list.appendChild(row);
  }

  // ---------- Termin-Tabellen ----------

  function addTableSection(section) {
    section = section || { title: '', columns: ['Datum', 'Was'], rows: [] };
    var list = document.getElementById('tables-list');
    var box = el('div', { class: 'table-section' });

    box.appendChild(document.createTextNode('Titel:'));
    var titleInput = textInput(section.title);
    titleInput.className = 'section-title-input';
    box.appendChild(titleInput);

    var colHeaders = el('div', { class: 'col-headers' });
    (section.columns || []).forEach(function (col) {
      colHeaders.appendChild(textInput(col));
    });
    box.appendChild(colHeaders);

    var rowsBox = el('div', { class: 'rows-box' });
    box.appendChild(rowsBox);

    function columnCount() {
      return colHeaders.querySelectorAll('input').length;
    }

    function addRow(rowValues) {
      var tr = el('div', { class: 'table-row' });
      var count = columnCount();
      for (var i = 0; i < count; i++) {
        tr.appendChild(textInput(rowValues && rowValues[i] || ''));
      }
      tr.appendChild(button('✕', 'danger', function () { tr.remove(); }));
      rowsBox.appendChild(tr);
    }

    (section.rows || []).forEach(function (row) { addRow(row); });

    var actions = el('div', { class: 'actions-bar' });
    actions.appendChild(button('+ Zeile', 'secondary', function () { addRow(); }));
    actions.appendChild(button('Tabelle entfernen', 'danger', function () { box.remove(); }));
    box.appendChild(actions);

    list.appendChild(box);
  }

  // ---------- Impuls-Einträge ----------

  function addEntry(entry, prepend) {
    entry = entry || {
      id: '', dateLabel: '', datetime: '', quote: '', teaser: '', paragraphs: [], author: ''
    };
    var list = document.getElementById('entries-list');
    var card = el('div', { class: 'entry-card' });

    card.appendChild(el('label', {}, ['Monat / Jahr (Anzeige, z.B. "Oktober 2026")']));
    var dateLabelInput = textInput(entry.dateLabel);
    card.appendChild(dateLabelInput);

    card.appendChild(el('label', {}, ['Datetime-Kennung (z.B. "2026-10")']));
    var datetimeInput = textInput(entry.datetime);
    card.appendChild(datetimeInput);

    card.appendChild(el('label', {}, ['ID (Anker im Archiv, z.B. "impuls-2026-10")']));
    var idInput = textInput(entry.id);
    card.appendChild(idInput);

    card.appendChild(el('label', {}, ['Bibelzitat']));
    var quoteInput = textArea(entry.quote, 2);
    card.appendChild(quoteInput);

    card.appendChild(el('label', {}, ['Kurztext (Teaser auf der Startseite; leer = erster Absatz wird verwendet)']));
    var teaserInput = textArea(entry.teaser, 3);
    card.appendChild(teaserInput);

    card.appendChild(el('label', {}, ['Volltext (ein Absatz pro Leerzeile getrennt)']));
    var paragraphsInput = textArea((entry.paragraphs || []).join('\n\n'), 8);
    card.appendChild(paragraphsInput);

    card.appendChild(el('label', {}, ['Autor']));
    var authorInput = textInput(entry.author);
    card.appendChild(authorInput);

    var actions = el('div', { class: 'actions-bar' });
    actions.appendChild(button('Eintrag entfernen', 'danger', function () { card.remove(); }));
    card.appendChild(actions);

    if (prepend && list.firstChild) {
      list.insertBefore(card, list.firstChild);
    } else {
      list.appendChild(card);
    }
  }

  // ---------- Laden ----------

  function loadData() {
    var status = document.getElementById('load-status');
    Promise.all([
      fetch('assets/data/termine.json').then(function (r) { return r.json(); }),
      fetch('assets/data/impulse.json').then(function (r) { return r.json(); })
    ]).then(function (results) {
      var termine = results[0];
      var impulse = results[1];

      document.getElementById('meeting-place').value = termine.meetingPlace || '';
      document.getElementById('termine-note').value = termine.note || '';
      (termine.weeklySchedule || []).forEach(function (item) {
        addWeeklyRow(item.what, item.when);
      });
      (termine.tables || []).forEach(function (section) {
        addTableSection(section);
      });
      (impulse.entries || []).forEach(function (entry) {
        addEntry(entry, false);
      });

      status.textContent = 'Aktuelle Daten geladen.';
    }).catch(function (err) {
      status.textContent = 'Daten konnten nicht geladen werden (' + err.message + '). Leere Formulare werden angezeigt.';
      console.error(err);
    });
  }

  // ---------- Sammeln & Export ----------

  function collectTermine() {
    var data = {
      meetingPlace: document.getElementById('meeting-place').value.trim(),
      weeklySchedule: [],
      tables: [],
      note: document.getElementById('termine-note').value.trim()
    };

    document.querySelectorAll('#weekly-list .row').forEach(function (row) {
      var inputs = row.querySelectorAll('input');
      var what = inputs[0].value.trim();
      var when = inputs[1].value.trim();
      if (what || when) data.weeklySchedule.push({ what: what, when: when });
    });

    document.querySelectorAll('#tables-list .table-section').forEach(function (box) {
      var title = box.querySelector('.section-title-input').value.trim();
      var columns = Array.prototype.map.call(
        box.querySelectorAll('.col-headers input'),
        function (i) { return i.value.trim(); }
      );
      var rows = [];
      box.querySelectorAll('.rows-box .table-row').forEach(function (tr) {
        var cells = Array.prototype.map.call(
          tr.querySelectorAll('input'),
          function (i) { return i.value.trim(); }
        );
        if (cells.some(function (c) { return c !== ''; })) rows.push(cells);
      });
      data.tables.push({ title: title, columns: columns, rows: rows });
    });

    return data;
  }

  function collectImpulse() {
    var entries = [];
    document.querySelectorAll('#entries-list .entry-card').forEach(function (card) {
      var inputs = card.querySelectorAll('input[type="text"]');
      var textareas = card.querySelectorAll('textarea');
      var dateLabel = inputs[0].value.trim();
      var datetime = inputs[1].value.trim();
      var id = inputs[2].value.trim();
      var quote = textareas[0].value.trim();
      var teaser = textareas[1].value.trim();
      var paragraphs = textareas[2].value.split(/\n\s*\n/).map(function (p) { return p.trim(); }).filter(Boolean);
      var author = inputs[3].value.trim();

      entries.push({
        id: id, dateLabel: dateLabel, datetime: datetime,
        quote: quote, teaser: teaser, paragraphs: paragraphs, author: author
      });
    });
    return { entries: entries };
  }

  function download(filename, obj) {
    var blob = new Blob([JSON.stringify(obj, null, 2) + '\n'], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }

  document.addEventListener('DOMContentLoaded', function () {
    loadData();

    document.getElementById('add-weekly').addEventListener('click', function () {
      addWeeklyRow('', '');
    });

    document.getElementById('add-table').addEventListener('click', function () {
      var count = parseInt(window.prompt('Wie viele Spalten soll die neue Tabelle haben?', '2'), 10);
      if (!count || count < 1) count = 2;
      var columns = [];
      for (var i = 0; i < count; i++) columns.push('Spalte ' + (i + 1));
      addTableSection({ title: 'Neue Tabelle', columns: columns, rows: [] });
    });

    document.getElementById('add-entry').addEventListener('click', function () {
      addEntry(null, true);
    });

    document.getElementById('export-btn').addEventListener('click', function () {
      download('termine.json', collectTermine());
      download('impulse.json', collectImpulse());
      document.getElementById('export-status').textContent =
        'Heruntergeladen: termine.json und impulse.json → jetzt nach assets/data/ hochladen.';
    });
  });
})();
