// SchizoCheck — front-end port of the Laravel ScreeningController.
// Engine logic replicates the original PHP exactly:
//   cfKombi = cfPakar * cfUser; combine: cf = cfOld + cfNew * (1 - cfOld);
//   only answers with cfUser > 0 fire a rule (forward chaining).

function hitungDiagnosis(answers) {
  const results = [];
  for (const diag of KB.diagnoses) {
    let cfCombined = 0;
    let isFirst = true;
    const details = [];
    for (const rule of KB.rules) {
      if (rule.diagnosis !== diag.kode) continue;
      const ans = answers[rule.gejala];
      if (ans === undefined) continue;
      const cfUser = KB.cfUserValues[ans] ?? 0;
      if (cfUser > 0) {
        const cfKombi = rule.cf_pakar * cfUser;
        const gejala = KB.gejala.find(g => g.kode === rule.gejala);
        details.push({
          gejala_kode: rule.gejala,
          gejala_nama: gejala ? gejala.nama : rule.gejala,
          cf_pakar: rule.cf_pakar,
          cf_user: cfUser,
          cf_kombinasi: cfKombi,
          jawaban: ans,
        });
        if (isFirst) { cfCombined = cfKombi; isFirst = false; }
        else { cfCombined = cfCombined + (cfKombi * (1 - cfCombined)); }
      }
    }
    results.push({
      kode: diag.kode, nama: diag.nama, deskripsi: diag.deskripsi,
      cf_final: Math.round(cfCombined * 10000) / 10000,
      cf_percentage: Math.round(cfCombined * 10000) / 100,
      details,
    });
  }
  results.sort((a, b) => b.cf_final - a.cf_final);
  return results;
}

function getInterpretation(cf) {
  if (cf >= 0.8) return { level: "Sangat Tinggi", cls: "danger", desc: "Sangat disarankan untuk segera berkonsultasi dengan psikiater." };
  if (cf >= 0.6) return { level: "Tinggi", cls: "warning", desc: "Disarankan untuk berkonsultasi dengan profesional kesehatan mental." };
  if (cf >= 0.4) return { level: "Sedang", cls: "info", desc: "Perlu monitoring dan evaluasi lebih lanjut." };
  if (cf >= 0.2) return { level: "Rendah", cls: "secondary", desc: "Gejala minimal, tetap jaga kesehatan mental." };
  return { level: "Sangat Rendah", cls: "success", desc: "Tidak terindikasi gejala signifikan." };
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { hitungDiagnosis, getInterpretation };
}

// ---------- UI state machine (browser only) ----------
if (typeof document !== "undefined") {
  const state = { user: null, answers: {}, step: 1 };
  const ANSWER_KEYS = Object.keys(KB.cfUserValues);
  const totalSteps = KB.steps.length;

  window.showView = function (name) {
    document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
    document.getElementById("view-" + name).classList.add("active");
    window.scrollTo({ top: 0 });
  };

  window.goBiodata = function () { showView("biodata"); };

  window.submitBiodata = function (ev) {
    ev.preventDefault();
    const fd = new FormData(ev.target);
    state.user = {
      nama: fd.get("name"), umur: fd.get("age"), email: fd.get("email"),
      alamat: fd.get("address"), telepon: fd.get("phone"),
    };
    document.getElementById("confirm-summary").innerHTML =
      `<p><strong>Nama:</strong> ${escapeHtml(state.user.nama)} (${escapeHtml(state.user.umur)} tahun)</p>` +
      `<p><strong>Email:</strong> ${escapeHtml(state.user.email)}</p>` +
      `<p><strong>Telepon:</strong> ${escapeHtml(state.user.telepon)}</p>` +
      `<p><strong>Alamat:</strong> ${escapeHtml(state.user.alamat)}</p>`;
    showView("confirm");
    return false;
  };

  window.startQuestions = function () { state.step = 1; renderStep(); showView("questions"); };

  function renderStep() {
    const kategori = KB.steps[state.step - 1];
    const gejalas = KB.gejala.filter(g => g.kategori === kategori).sort((a, b) => a.kode.localeCompare(b.kode));
    document.getElementById("step-label").textContent = `Langkah ${state.step} dari ${totalSteps}`;
    document.getElementById("step-count").textContent = `${state.step * 0 + countAnswered()} dari ${KB.gejala.length} terjawab`;
    document.getElementById("progress-fill").style.width = ((state.step - 1) / totalSteps * 100) + "%";
    document.getElementById("kategori-title").textContent = "Gejala " + kategori;
    document.getElementById("question-error").hidden = true;
    const list = document.getElementById("question-list");
    list.innerHTML = "";
    for (const g of gejalas) {
      const div = document.createElement("div");
      div.className = "question";
      const opts = ANSWER_KEYS.map(k => {
        const checked = state.answers[g.kode] === k;
        return `<label class="${checked ? "checked" : ""}">
          <input type="radio" name="q_${g.kode}" value="${k}" ${checked ? "checked" : ""}
                 onchange="pickAnswer('${g.kode}', '${k}', this)">${KB.answerLabels[k]}</label>`;
      }).join("");
      div.innerHTML = `<p><span class="q-code">${g.kode}</span>${escapeHtml(g.nama)}</p><div class="options">${opts}</div>`;
      list.appendChild(div);
    }
    document.getElementById("btn-next-step").textContent = state.step === totalSteps ? "Lihat Hasil" : "Lanjut";
  }

  function countAnswered() { return Object.keys(state.answers).length; }

  window.pickAnswer = function (kode, val, el) {
    state.answers[kode] = val;
    const box = el.closest(".question");
    box.querySelectorAll("label").forEach(l => l.classList.remove("checked"));
    el.closest("label").classList.add("checked");
    document.getElementById("step-count").textContent = `${countAnswered()} dari ${KB.gejala.length} terjawab`;
    document.getElementById("question-error").hidden = true;
  };

  window.prevStep = function () {
    if (state.step === 1) { showView("confirm"); return; }
    state.step--; renderStep();
  };

  window.nextStep = function () {
    const kategori = KB.steps[state.step - 1];
    const gejalas = KB.gejala.filter(g => g.kategori === kategori);
    if (gejalas.some(g => state.answers[g.kode] === undefined)) {
      document.getElementById("question-error").hidden = false;
      return;
    }
    if (state.step < totalSteps) { state.step++; renderStep(); window.scrollTo({ top: 0 }); }
    else { renderResult(); showView("result"); }
  };

  function renderResult() {
    const results = hitungDiagnosis(state.answers);
    const top = results[0];
    const interp = getInterpretation(top.cf_final);
    document.getElementById("result-main").innerHTML = `
      <div class="result-top">
        <div class="muted">Hasil skrining untuk <strong>${escapeHtml(state.user.nama)}</strong></div>
        <div class="result-pct">${formatPct(top.cf_percentage)}%</div>
        <div class="result-name">${escapeHtml(top.nama)}</div>
        <div class="muted">${escapeHtml(top.deskripsi)}</div><br>
        <span class="badge badge-${interp.cls}">Tingkat keyakinan: ${interp.level}</span>
        <p>${escapeHtml(interp.desc)}</p>
      </div>`;
    document.getElementById("result-all").innerHTML = results.map(r => `
      <div class="rank-row">
        <div class="rank-head"><span><strong>${r.kode}</strong> — ${escapeHtml(r.nama)}</span><span>${formatPct(r.cf_percentage)}%</span></div>
        <div class="rank-bar"><div class="rank-fill" style="width:${r.cf_percentage}%"></div></div>
      </div>`).join("");
    document.getElementById("result-details").innerHTML = results.map(r => {
      if (!r.details.length) {
        return `<details><summary>${r.kode} — ${escapeHtml(r.nama)} (${formatPct(r.cf_percentage)}%)</summary>
                <p class="muted">Tidak ada gejala yang mengaktifkan aturan untuk hasil ini.</p></details>`;
      }
      const rows = r.details.map(d => `<tr>
          <td><strong>${d.gejala_kode}</strong> ${escapeHtml(d.gejala_nama)}</td>
          <td>${KB.answerLabels[d.jawaban]} (${d.cf_user})</td>
          <td>${d.cf_pakar}</td>
          <td>${d.cf_kombinasi.toFixed(4)}</td></tr>`).join("");
      return `<details><summary>${r.kode} — ${escapeHtml(r.nama)} (${formatPct(r.cf_percentage)}%)</summary>
        <table class="detail"><thead><tr><th>Gejala</th><th>Jawaban (CF user)</th><th>CF pakar</th><th>CF kombinasi</th></tr></thead>
        <tbody>${rows}</tbody></table></details>`;
    }).join("");
  }

  window.restart = function () {
    state.user = null; state.answers = {}; state.step = 1;
    document.getElementById("form-biodata").reset();
    showView("intro");
  };

  function formatPct(x) { return (Math.round(x * 100) / 100).toString().replace(".", ","); }
  function escapeHtml(s) {
    return String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
}
