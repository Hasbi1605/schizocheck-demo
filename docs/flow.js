// SchizoCheck static demo glue.
// The pages are the original Laravel app's own rendered output; this script
// only wires the screening flow (biodata -> confirm -> 6 question steps ->
// result) in the browser, using the app's exact Certainty Factor engine
// (forward chaining, CF combine) and knowledge base (data.js / KB).
(function () {
  var INTERPRETATIONS = [
    { min: 0.8, level: "Sangat Tinggi", desc: "Sangat disarankan untuk segera berkonsultasi dengan psikiater." },
    { min: 0.6, level: "Tinggi", desc: "Disarankan untuk berkonsultasi dengan profesional kesehatan mental." },
    { min: 0.4, level: "Sedang", desc: "Perlu monitoring dan evaluasi lebih lanjut." },
    { min: 0.2, level: "Rendah", desc: "Gejala minimal, tetap jaga kesehatan mental." },
    { min: 0.0, level: "Sangat Rendah", desc: "Tidak terindikasi gejala signifikan." }
  ];
  function interpret(cf) {
    for (var i = 0; i < INTERPRETATIONS.length; i++) if (cf >= INTERPRETATIONS[i].min) return INTERPRETATIONS[i];
    return INTERPRETATIONS[INTERPRETATIONS.length - 1];
  }
  function barColor(pct) { return pct >= 60 ? "#dc3545" : pct >= 40 ? "#ffc107" : pct >= 20 ? "#17a2b8" : "#6c757d"; }
  function fmtPct(cf) { var p = Math.round(cf * 10000) / 100; return (p % 1 === 0 ? p.toFixed(0) : String(p)) + "%"; }
  function fmtNum(v) { return String(Math.round(v * 10000) / 10000); }
  function ucwords(s) { return s.replace(/_/g, " ").replace(/\b\w/g, function (c) { return c.toUpperCase(); }); }
  var page = location.pathname.split("/").pop() || "index.html";

  document.addEventListener("DOMContentLoaded", function () {
    // Demo bar
    var bar = document.createElement("div");
    bar.style.cssText = "position:fixed;left:0;right:0;bottom:0;z-index:9998;background:rgba(15,23,42,.92);color:#e2e8f0;font-size:13px;padding:7px 14px;text-align:center";
    bar.innerHTML = "Demo statis SchizoCheck — tampilan persis dari aplikasi Laravel aslinya; screening berjalan 100% di browser dengan mesin Certainty Factor yang sama. " +
      '<a href="https://github.com/Hasbi1605/ES-Skizofrenia" target="_blank" rel="noopener" style="color:#7dd3fc">Lihat kode sumber</a>';
    document.body.appendChild(bar);

    var biodata = null, answers = {};
    try {
      biodata = JSON.parse(localStorage.getItem("schizo-biodata") || "null");
      answers = JSON.parse(localStorage.getItem("schizo-answers") || "{}");
    } catch (e) {}

    // --- Biodata page (screening.html) ---
    if (page === "screening.html") {
      var form = document.querySelector("form");
      if (form) form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var data = {};
        ["name", "age", "email", "address", "phone"].forEach(function (n) {
          var el = form.querySelector('[name="' + n + '"]');
          data[n] = el ? el.value.trim() : "";
        });
        localStorage.setItem("schizo-biodata", JSON.stringify(data));
        localStorage.removeItem("schizo-answers");
        localStorage.removeItem("schizo-result");
        location.href = "confirm.html";
      });
      return;
    }

    // --- Confirm page ---
    if (page === "confirm.html") {
      if (biodata && biodata.name) {
        var strong = document.querySelector(".user-info strong");
        if (strong) strong.textContent = biodata.name;
      }
      return;
    }

    // --- Question steps ---
    var stepMatch = page.match(/^step(\d)\.html$/);
    if (stepMatch) {
      var step = parseInt(stepMatch[1], 10);
      var qform = document.getElementById("questionForm") || document.querySelector("form");
      // restore previous answers
      Object.keys(answers).forEach(function (code) {
        var input = qform.querySelector('input[name="answers[' + code + ']"][value="' + answers[code] + '"]');
        if (input) input.checked = true;
      });
      qform.addEventListener("submit", function (ev) {
        ev.preventDefault();
        qform.querySelectorAll('input[type="radio"]:checked').forEach(function (inp) {
          var m = inp.name.match(/answers\[(G\d+)\]/);
          if (m) answers[m[1]] = inp.value;
        });
        localStorage.setItem("schizo-answers", JSON.stringify(answers));
        if (step < 6) { location.href = "step" + (step + 1) + ".html"; return; }
        // compute results (same engine as the Laravel controller)
        var results = KB.diagnoses.map(function (d) {
          var combined = 0, first = true;
          KB.rules.filter(function (r) { return r.diagnosis === d.kode; }).forEach(function (r) {
            var key = answers[r.gejala];
            if (!key) return;
            var cfUser = KB.cfUserValues[key] || 0;
            if (cfUser <= 0) return;
            var kombi = r.cf_pakar * cfUser;
            combined = first ? kombi : combined + kombi * (1 - combined);
            first = false;
          });
          return { kode: d.kode, nama: d.nama, cf: Math.round(combined * 10000) / 10000 };
        });
        results.sort(function (a, b) { return b.cf - a.cf; });
        localStorage.setItem("schizo-result", JSON.stringify({
          biodata: biodata, answers: answers, results: results, at: new Date().toISOString()
        }));
        location.href = "result.html";
      });
      return;
    }

    // --- Result page ---
    if (page === "result.html") {
      var stored = null;
      try { stored = JSON.parse(localStorage.getItem("schizo-result") || "null"); } catch (e) {}
      if (!stored) { location.href = "screening.html"; return; }
      var res = stored.results, top = res[0];
      var interp = interpret(top.cf);

      var mainCard = document.querySelector(".result-main-card");
      if (mainCard) {
        var h2 = mainCard.querySelector("h2"); if (h2) h2.textContent = top.nama;
        var circle = mainCard.querySelector(".cf-circle span"); if (circle) circle.textContent = fmtPct(top.cf);
        var alertBox = mainCard.querySelector(".alert");
        if (alertBox) alertBox.innerHTML = '<i class="bi bi-info-circle me-2"></i> Tingkat Kepastian: <strong>' + interp.level + "</strong>";
        var desc = mainCard.querySelector("p.mb-0"); if (desc) desc.textContent = interp.desc;
      }

      // Data Peserta
      if (stored.biodata) {
        document.querySelectorAll(".user-info-card .col-md-6, .user-info-card .col-md-3").forEach(function (col) {
          var label = col.querySelector("small"), val = col.querySelector("p");
          if (!label || !val) return;
          var t = label.textContent.trim();
          if (t === "Nama") val.textContent = stored.biodata.name || "-";
          else if (t === "Umur") val.textContent = (stored.biodata.age || "-") + " tahun";
          else if (t.indexOf("Tanggal") === 0) {
            var d = new Date(stored.at);
            var months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
            val.textContent = d.getDate() + " " + months[d.getMonth()] + " " + d.getFullYear() + ", " +
              String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0");
          }
        });
      }

      var byKode = {};
      res.forEach(function (r) { byKode[r.kode] = r; });

      // Diagnosis bars: re-sort + patch
      var items = Array.prototype.slice.call(document.querySelectorAll(".diagnosis-item"));
      if (items.length) {
        var parent = items[0].parentNode;
        var topStyle = items[0].getAttribute("style") || "";
        var plainStyle = items.length > 1 ? (items[1].getAttribute("style") || "") : "";
        items.sort(function (a, b) {
          return (byKode[b.querySelector(".badge").textContent.trim()].cf) - (byKode[a.querySelector(".badge").textContent.trim()].cf);
        });
        items.forEach(function (item, idx) {
          var kode = item.querySelector(".badge").textContent.trim();
          var r = byKode[kode]; if (!r) return;
          var pct = Math.round(r.cf * 10000) / 100, color = barColor(pct);
          item.querySelectorAll("span.fw-bold").forEach(function (s) { s.textContent = fmtPct(r.cf); s.style.color = color; });
          var barEl = item.querySelector(".progress-bar");
          if (barEl) { barEl.style.width = fmtPct(r.cf); barEl.style.backgroundColor = color; barEl.setAttribute("aria-valuenow", String(pct)); }
          var badgeTop = item.querySelector(".badge.bg-success");
          if (idx === 0) {
            item.setAttribute("style", topStyle);
            if (!badgeTop) {
              var strong = item.querySelector("strong");
              var b = document.createElement("span");
              b.className = "badge bg-success ms-2"; b.textContent = "Tertinggi";
              strong.parentNode.insertBefore(b, strong.nextSibling);
            }
          } else {
            item.setAttribute("style", plainStyle);
            if (badgeTop) badgeTop.remove();
          }
          parent.appendChild(item);
        });
      }

      // Detail sections: patch CF final + table rows; re-sort accordion items
      var detailItems = Array.prototype.slice.call(document.querySelectorAll(".accordion-item")).filter(function (it) {
        return /P0\d - /.test(it.textContent);
      });
      detailItems.forEach(function (item) {
        var m = item.textContent.match(/(P0\d) - /);
        if (!m) return;
        var r = byKode[m[1]]; if (!r) return;
        item.querySelectorAll(".badge").forEach(function (b) {
          if (b.textContent.indexOf("CF Final:") === 0) b.textContent = "CF Final: " + fmtPct(r.cf);
        });
        item.querySelectorAll("tbody tr").forEach(function (tr) {
          var cells = tr.querySelectorAll("td");
          if (cells.length < 5) return;
          var codeEl = tr.querySelector("small.fw-bold");
          if (!codeEl) return;
          var code = codeEl.textContent.trim();
          var key = stored.answers[code];
          var cfUser = key ? (KB.cfUserValues[key] || 0) : 0;
          if (!key || cfUser <= 0) { tr.style.display = "none"; return; }
          var rule = KB.rules.filter(function (x) { return x.gejala === code && x.diagnosis === r.kode; })[0];
          cells[1].textContent = ucwords(key);
          cells[3].textContent = fmtNum(cfUser);
          if (rule) cells[4].textContent = fmtNum(rule.cf_pakar * cfUser);
        });
      });
      if (detailItems.length) {
        var dParent = detailItems[0].parentNode;
        detailItems.sort(function (a, b) {
          return byKode[b.textContent.match(/(P0\d) - /)[1]].cf - byKode[a.textContent.match(/(P0\d) - /)[1]].cf;
        });
        detailItems.forEach(function (it) { dParent.appendChild(it); });
      }

      // Family guide title for the top diagnosis
      document.querySelectorAll("h1,h2,h3,h4,h5,h6").forEach(function (h) {
        if (h.textContent.indexOf("Panduan Penanganan:") === 0) h.textContent = "Panduan Penanganan: " + top.nama;
      });
    }
  });
})();
