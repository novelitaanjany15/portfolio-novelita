/* ===============================
   1. Salam Otomatis Berdasarkan Waktu
==================================*/
(function salamWaktu() {
  const jam = new Date().getHours();
  const el = document.getElementById("salam");
  if (!el) return;

  if (jam >= 5 && jam < 12) el.innerText = "Selamat Pagi";
  else if (jam >= 12 && jam < 16) el.innerText = "Selamat Siang";
  else if (jam >= 16 && jam < 19) el.innerText = "Selamat Sore";
  else el.innerText = "Selamat Malam";
})();


/* ===============================
   2. Quotes Otomatis Setiap 3 Detik
==================================*/
const quotes = [
  "Belajar hari ini lebih baik dari menunda besok.",
  "Konsistensi adalah kunci sukses.",
  "Kesalahan adalah bagian dari proses belajar.",
  "Mulailah dari hal kecil, tapi teruslah maju."
];

(function loopQuotes() {
  const qEl = document.getElementById("quotes");
  if (!qEl) return;

  qEl.innerText = quotes[Math.floor(Math.random() * quotes.length)];
  setTimeout(loopQuotes, 3000);
})();


/* ===============================
   3. Promise – Simulasi Pengalaman
==================================*/
function getPengalaman() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { tahun: "2021", posisi: "Frontend Developer (Magang)" },
        { tahun: "2022", posisi: "Fullstack Developer (Freelance)" }
      ]);
    }, 2000);
  });
}

getPengalaman().then(data => {
  const tabel = document.getElementById("tabel-pengalaman");
  if (!tabel) return;

  data.forEach(item => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${item.tahun}</td><td>${item.posisi}</td>`;
    tabel.appendChild(row);
  });
});


/* ===============================
   4. Fetch API Contoh User
==================================*/
async function getUser() {
  const el = document.getElementById("userApi");

  try {
    const r = await fetch("https://jsonplaceholder.typicode.com/users/1");
    if (!r.ok) throw new Error("Fetch gagal");

    const user = await r.json();
    if (el) el.innerText = `Nama API: ${user.name} | Email API: ${user.email}`;
  } catch (e) {
    if (el) el.innerText = "Gagal mengambil data user dari API.";
    console.error(e);
  }
}

getUser();


/* ===============================
   5. Validasi Form Kontak
==================================*/
function kirimPesan() {
  let nama = document.getElementById("nama").value.trim();
  let email = document.getElementById("email").value.trim();
  let pesan = document.getElementById("pesan").value.trim();

  // Validasi field kosong
  if (!nama || !email || !pesan) {
    alert("Semua field wajib diisi!");
    return;
  }

  // Validasi format email
  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert("Format email tidak valid!");
    return;
  }

  // Validasi minimal panjang pesan
  if (pesan.length < 5) {
    alert("Pesan terlalu pendek. Minimal 5 karakter.");
    return;
  }

  alert(`Terima kasih, ${nama}. Pesan Anda berhasil dikirim.`);
  document.getElementById("formKontak").reset();
}
