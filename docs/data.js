// Knowledge base extracted verbatim from the SchizoCheck Laravel app (ScreeningSeeder).
const KB = {
 "diagnoses": [
  {
   "kode": "P01",
   "nama": "Skizofrenia Paranoid",
   "deskripsi": "ICD-10 F20.0 - Risiko Tinggi: Dominasi waham persekutorik/kebesaran dan halusinasi auditorik. Fungsi kognitif relatif terjaga."
  },
  {
   "kode": "P02",
   "nama": "Skizofrenia Hebefrenik",
   "deskripsi": "ICD-10 F20.1 - Risiko Tinggi: Onset 15-25 tahun, afek dangkal, giggling, perilaku tidak terprediksi. Prognosis umumnya buruk."
  },
  {
   "kode": "P03",
   "nama": "Skizofrenia Katatonik",
   "deskripsi": "ICD-10 F20.2 - Risiko Tinggi: Gangguan psikomotorik menonjol (stupor, negativisme, rigiditas, posturing, excitement)."
  },
  {
   "kode": "P04",
   "nama": "Fase Prodromal",
   "deskripsi": "Risiko Sedang: Fase awal sebelum onset penuh. Gejala subklinis yang perlu monitoring ketat."
  },
  {
   "kode": "P05",
   "nama": "Gejala Umum/Ringan",
   "deskripsi": "Risiko Rendah: Gejala umum/stres ringan yang memerlukan monitoring lebih lanjut."
  }
 ],
 "gejala": [
  {
   "kode": "G01",
   "nama": "Mendengar suara atau bisikan yang tidak didengar orang lain",
   "kategori": "Positif"
  },
  {
   "kode": "G02",
   "nama": "Melihat bayangan atau sosok yang tidak nyata",
   "kategori": "Positif"
  },
  {
   "kode": "G03",
   "nama": "Merasa diawasi, dimata-matai, atau diikuti orang lain",
   "kategori": "Positif"
  },
  {
   "kode": "G04",
   "nama": "Merasa pikiran dikendalikan atau dibaca orang lain",
   "kategori": "Positif"
  },
  {
   "kode": "G05",
   "nama": "Merasa memiliki kekuatan super atau menjadi utusan khusus",
   "kategori": "Positif"
  },
  {
   "kode": "G18",
   "nama": "Merasa pikiran bergema di dalam kepala",
   "kategori": "Positif"
  },
  {
   "kode": "G19",
   "nama": "Merasa ada pikiran asing yang disisipkan ke dalam kepala",
   "kategori": "Positif"
  },
  {
   "kode": "G20",
   "nama": "Merasa pikiran dicuri atau ditarik keluar dari kepala",
   "kategori": "Positif"
  },
  {
   "kode": "G21",
   "nama": "Merasa pikiran disiarkan sehingga orang lain tahu isi pikiran",
   "kategori": "Positif"
  },
  {
   "kode": "G06",
   "nama": "Kehilangan minat drastis pada hobi atau aktivitas yang dulu disukai",
   "kategori": "Negatif"
  },
  {
   "kode": "G07",
   "nama": "Menarik diri sepenuhnya dari teman dan keluarga",
   "kategori": "Negatif"
  },
  {
   "kode": "G08",
   "nama": "Malas merawat diri seperti jarang mandi dan berpenampilan berantakan",
   "kategori": "Negatif"
  },
  {
   "kode": "G09",
   "nama": "Ekspresi wajah datar atau kosong saat berbicara",
   "kategori": "Negatif"
  },
  {
   "kode": "G22",
   "nama": "Bicara sangat sedikit atau miskin ide",
   "kategori": "Negatif"
  },
  {
   "kode": "G23",
   "nama": "Tidak ada motivasi untuk melakukan aktivitas apapun",
   "kategori": "Negatif"
  },
  {
   "kode": "G24",
   "nama": "Tertawa atau menangis pada saat yang tidak sesuai",
   "kategori": "Negatif"
  },
  {
   "kode": "G10",
   "nama": "Bicara melantur, berpindah topik tanpa kaitan jelas",
   "kategori": "Disorganisasi"
  },
  {
   "kode": "G11",
   "nama": "Sering lupa atau kehilangan alur pikir saat bicara",
   "kategori": "Disorganisasi"
  },
  {
   "kode": "G12",
   "nama": "Perilaku aneh atau tidak wajar seperti tertawa sendiri tanpa sebab",
   "kategori": "Disorganisasi"
  },
  {
   "kode": "G25",
   "nama": "Diam tidak bergerak dalam waktu lama",
   "kategori": "Katatonik"
  },
  {
   "kode": "G26",
   "nama": "Menolak semua instruksi atau melakukan kebalikannya",
   "kategori": "Katatonik"
  },
  {
   "kode": "G27",
   "nama": "Mempertahankan posisi tubuh aneh dalam waktu lama",
   "kategori": "Katatonik"
  },
  {
   "kode": "G28",
   "nama": "Tidak mau berbicara sama sekali",
   "kategori": "Katatonik"
  },
  {
   "kode": "G29",
   "nama": "Tubuh dapat dibentuk dan mempertahankan posisi tersebut",
   "kategori": "Katatonik"
  },
  {
   "kode": "G30",
   "nama": "Gerakan berlebihan tanpa tujuan yang jelas",
   "kategori": "Katatonik"
  },
  {
   "kode": "G13",
   "nama": "Penurunan prestasi sekolah atau kerja secara tiba-tiba dan drastis",
   "kategori": "Prodromal"
  },
  {
   "kode": "G14",
   "nama": "Pola tidur sangat kacau seperti siang jadi malam atau sebaliknya",
   "kategori": "Prodromal"
  },
  {
   "kode": "G15",
   "nama": "Mudah curiga pada orang sekitar tanpa alasan yang kuat",
   "kategori": "Prodromal"
  },
  {
   "kode": "G16",
   "nama": "Merasa cemas berlebihan atau gelisah terus-menerus",
   "kategori": "Umum"
  },
  {
   "kode": "G17",
   "nama": "Sulit berkonsentrasi bahkan pada tugas ringan sehari-hari",
   "kategori": "Umum"
  }
 ],
 "rules": [
  {
   "gejala": "G01",
   "diagnosis": "P01",
   "cf_pakar": 0.95
  },
  {
   "gejala": "G01",
   "diagnosis": "P05",
   "cf_pakar": 0.2
  },
  {
   "gejala": "G02",
   "diagnosis": "P01",
   "cf_pakar": 0.6
  },
  {
   "gejala": "G03",
   "diagnosis": "P01",
   "cf_pakar": 0.95
  },
  {
   "gejala": "G03",
   "diagnosis": "P03",
   "cf_pakar": 0.3
  },
  {
   "gejala": "G04",
   "diagnosis": "P01",
   "cf_pakar": 0.9
  },
  {
   "gejala": "G05",
   "diagnosis": "P01",
   "cf_pakar": 0.85
  },
  {
   "gejala": "G18",
   "diagnosis": "P01",
   "cf_pakar": 0.9
  },
  {
   "gejala": "G19",
   "diagnosis": "P01",
   "cf_pakar": 0.9
  },
  {
   "gejala": "G20",
   "diagnosis": "P01",
   "cf_pakar": 0.9
  },
  {
   "gejala": "G21",
   "diagnosis": "P01",
   "cf_pakar": 0.85
  },
  {
   "gejala": "G06",
   "diagnosis": "P02",
   "cf_pakar": 0.7
  },
  {
   "gejala": "G06",
   "diagnosis": "P04",
   "cf_pakar": 0.5
  },
  {
   "gejala": "G06",
   "diagnosis": "P05",
   "cf_pakar": 0.2
  },
  {
   "gejala": "G07",
   "diagnosis": "P02",
   "cf_pakar": 0.75
  },
  {
   "gejala": "G07",
   "diagnosis": "P04",
   "cf_pakar": 0.6
  },
  {
   "gejala": "G08",
   "diagnosis": "P02",
   "cf_pakar": 0.8
  },
  {
   "gejala": "G08",
   "diagnosis": "P05",
   "cf_pakar": 0.3
  },
  {
   "gejala": "G09",
   "diagnosis": "P02",
   "cf_pakar": 0.85
  },
  {
   "gejala": "G22",
   "diagnosis": "P02",
   "cf_pakar": 0.8
  },
  {
   "gejala": "G23",
   "diagnosis": "P02",
   "cf_pakar": 0.85
  },
  {
   "gejala": "G24",
   "diagnosis": "P02",
   "cf_pakar": 0.9
  },
  {
   "gejala": "G24",
   "diagnosis": "P03",
   "cf_pakar": 0.4
  },
  {
   "gejala": "G13",
   "diagnosis": "P02",
   "cf_pakar": 0.55
  },
  {
   "gejala": "G13",
   "diagnosis": "P04",
   "cf_pakar": 0.7
  },
  {
   "gejala": "G13",
   "diagnosis": "P05",
   "cf_pakar": 0.2
  },
  {
   "gejala": "G25",
   "diagnosis": "P03",
   "cf_pakar": 0.95
  },
  {
   "gejala": "G26",
   "diagnosis": "P03",
   "cf_pakar": 0.9
  },
  {
   "gejala": "G27",
   "diagnosis": "P03",
   "cf_pakar": 0.9
  },
  {
   "gejala": "G28",
   "diagnosis": "P03",
   "cf_pakar": 0.85
  },
  {
   "gejala": "G29",
   "diagnosis": "P03",
   "cf_pakar": 0.95
  },
  {
   "gejala": "G30",
   "diagnosis": "P03",
   "cf_pakar": 0.8
  },
  {
   "gejala": "G10",
   "diagnosis": "P03",
   "cf_pakar": 0.5
  },
  {
   "gejala": "G10",
   "diagnosis": "P02",
   "cf_pakar": 0.4
  },
  {
   "gejala": "G11",
   "diagnosis": "P03",
   "cf_pakar": 0.4
  },
  {
   "gejala": "G11",
   "diagnosis": "P04",
   "cf_pakar": 0.5
  },
  {
   "gejala": "G11",
   "diagnosis": "P05",
   "cf_pakar": 0.2
  },
  {
   "gejala": "G12",
   "diagnosis": "P03",
   "cf_pakar": 0.75
  },
  {
   "gejala": "G12",
   "diagnosis": "P02",
   "cf_pakar": 0.6
  },
  {
   "gejala": "G14",
   "diagnosis": "P04",
   "cf_pakar": 0.55
  },
  {
   "gejala": "G14",
   "diagnosis": "P05",
   "cf_pakar": 0.5
  },
  {
   "gejala": "G15",
   "diagnosis": "P04",
   "cf_pakar": 0.6
  },
  {
   "gejala": "G15",
   "diagnosis": "P05",
   "cf_pakar": 0.4
  },
  {
   "gejala": "G16",
   "diagnosis": "P04",
   "cf_pakar": 0.5
  },
  {
   "gejala": "G16",
   "diagnosis": "P05",
   "cf_pakar": 0.7
  },
  {
   "gejala": "G17",
   "diagnosis": "P04",
   "cf_pakar": 0.55
  },
  {
   "gejala": "G17",
   "diagnosis": "P05",
   "cf_pakar": 0.5
  }
 ],
 "cfUserValues": {
  "tidak": 0.0,
  "tidak_tahu": 0.2,
  "sedikit_yakin": 0.4,
  "cukup_yakin": 0.6,
  "yakin": 0.8,
  "sangat_yakin": 1.0
 },
 "answerLabels": {
  "tidak": "Tidak",
  "tidak_tahu": "Tidak Tahu",
  "sedikit_yakin": "Sedikit Yakin",
  "cukup_yakin": "Cukup Yakin",
  "yakin": "Yakin",
  "sangat_yakin": "Sangat Yakin"
 },
 "steps": [
  "Positif",
  "Negatif",
  "Disorganisasi",
  "Katatonik",
  "Prodromal",
  "Umum"
 ]
};
