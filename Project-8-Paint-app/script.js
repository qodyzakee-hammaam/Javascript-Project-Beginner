const kanvas = document.getElementById("kanvas");
const ctx = kanvas.getContext("2d");

const kuasTbl = document.getElementById("kuas");
const hapusTbl = document.getElementById("penghapus");
const bersihkanTbl = document.getElementById("bersihkan");
const pilihWarna = document.getElementById("pilih-warna");

kanvas.width = 800;
kanvas.height = 500;

let mewarnai = false;
let menghapus = false;
let warnaSekarang = "#000000";
let lineWidth = 5;

function posisiMulai(e) {
  mewarnai = true;
  gambar(e);
}

function posisiAkhir(e) {
  mewarnai = false;
  ctx.beginPath();
}

function gambar(e) {
  if (!mewarnai) return;

  ctx.lineWidth = lineWidth;
  ctx.lineCap = "round";
  ctx.strokeStyle = menghapus ? "#ffffff" : warnaSekarang;

  ctx.lineTo(
    e.clientX - kanvas.offsetLeft,
    e.clientY - kanvas.offsetTop
    );
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(
    e.clientX - kanvas.offsetLeft,
    e.clientY - kanvas.offsetTop
    );
}

function pilihKanvas() {
  menghapus = false;
  kuasTbl.classList.add("active");
  hapusTbl.classList.remove("active");
}

function PilihPenghapus() {
  menghapus = true;
  hapusTbl.classList.add("active");
  kuasTbl.classList.remove("active");
}

function hapusKanvas() {
  ctx.clearRect(0, 0, kanvas.width, kanvas.height);
}

function ubahWarna(e) {
  warnaSekarang = e.target.value;
}

kuasTbl.addEventListener("click", pilihKanvas);
hapusTbl.addEventListener("click", PilihPenghapus);
bersihkanTbl.addEventListener("click", hapusKanvas);
pilihWarna.addEventListener("input", ubahWarna);

kanvas.addEventListener("mousedown", posisiMulai);
kanvas.addEventListener("mouseup", posisiAkhir);
kanvas.addEventListener("mousemove", gambar);
