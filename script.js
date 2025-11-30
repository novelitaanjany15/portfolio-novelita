/* ===============================
   1. Salam Otomatis Berdasarkan Waktu
==================================*/
function salamWaktu() {
  const jam = new Date().getHours();
  const el = document.getElementById("salam");
  if (!el) return;

  let salam = "";
  if (jam >= 5 && jam < 12) salam = "Selamat Pagi";
  else if (jam >= 12 && jam < 16) salam = "Selamat Siang";
  else if (jam >= 16 && jam < 19) salam = "Selamat Sore";
  else salam = "Selamat Malam";

  el.innerText = `${salam}, Selamat datang di portofolio NOVELITA!`;
}
salamWaktu();


/* ===============================
   2. Quotes Otomatis Setiap 3 Detik
==================================*/
const quotes = [
  "Code today, create tomorrow.",
  "Setiap bug adalah peluang untuk belajar hal baru.",
  "Teknologi berubah cepat—teruslah berkembang.",
  "Problem solving adalah seni dalam Informatika.",
  "Belajar algoritma berarti belajar cara berpikir.",
  "Desain yang baik adalah ketika pengguna tidak perlu berpikir lagi.",
  "Error bukan akhir, tapi awal untuk memperbaiki.",
  "Informatika bukan hanya tentang coding, tapi tentang solusi."
];

(function loopQuotes() {
  const el = document.getElementById("quotes");
  if (!el) return;

  el.innerText = quotes[Math.floor(Math.random() * quotes.length)];
  setTimeout(loopQuotes, 3000);
})();


/* ===============================
   3. Fetch API Contoh User
==================================*/
async function getUser() {
  const el = document.getElementById("userApi");
  if (!el) return;

  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
    if (!res.ok) throw new Error("Fetch gagal");

    const user = await res.json();
    el.innerText = `Nama: ${user.name} | Email: ${user.email}`;
  } catch (err) {
    el.innerText = "Nama: Novelita Fatma Anjany | Email: novelitaanjany15@gmail.com";
    console.error(err);
  }
}
getUser();


/* ===============================
   4. Validasi Form Kontak
==================================*/
const form = document.querySelector(".kontak-form");
const notif = document.getElementById("notif");

form?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nama = form.querySelector("#nama").value.trim();
  const email = form.querySelector("#email").value.trim();
  const pesan = form.querySelector("#pesan").value.trim();

  // Validasi field kosong
  if (!nama || !email || !pesan) {
    alert("Semua field wajib diisi!");
    return;
  }

  // Validasi format email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert("Format email tidak valid!");
    return;
  }

  // Validasi minimal panjang pesan
  if (pesan.length < 5) {
    alert("Pesan terlalu pendek. Minimal 5 karakter.");
    return;
  }

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      notif.style.display = "block"; // tampilkan notifikasi
      setTimeout(() => notif.style.display = "none", 5000); // hilangkan otomatis setelah 5 detik
      form.reset(); // reset form setelah submit sukses
      alert(`Terima kasih, ${nama}. Pesan Anda berhasil dikirim.`);
    } else {
      alert("Terjadi kesalahan, coba lagi.");
    }
  } catch (err) {
    alert("Terjadi kesalahan jaringan.");
    console.error(err);
  }
});
