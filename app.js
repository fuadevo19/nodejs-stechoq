const readline = require("readline");

console.log("=========================");
console.log("Daftar Menu Makanan");
console.log("=========================");
console.log("1. Ikan Gurame Bakar");
console.log("2. Nasi Goreng");
console.log("3. Mie Goreng");
console.log("4. Mie Kuah");
console.log("=========================");

let pesan = [];

function tambahPesan(name, menu, jumlah) {
  const pesanan = {
    nama: name,
    menu: menu,
    jumlah: jumlah,
  };
  pesan.push(pesanan);

  pesan.sort((a, b) => a.nama.localeCompare(b.nama));
}

function cariPesanan(nama) {
  pesan.sort((a, b) => a.nama.localeCompare(b.nama));
  let low = 0;
  let high = pesan.length - 1;
  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    if (pesan[mid].nama === nama) {
      return pesan[mid];
    } else if (pesan[mid].nama < nama) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return null;
}

function hapusPesan(nama) {
  const index = pesan.findIndex((pesanan) => pesanan.nama === nama);
  if (index !== -1) {
    pesan.splice(index, 1);
    console.log(`Pesanan atas nama ${nama} berhasil dihapus.`);
  } else {
    console.log("Pesanan tidak ditemukan.");
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function tanyaPesan() {
  rl.question("Masukkan nama anda: ", (nama) => {
    rl.question("Masukkan nama menu: ", (menu) => {
      rl.question("Masukkan jumlah menu: ", (jumlah) => {
        tambahPesan(nama, menu, jumlah);
        rl.question("Tambahkan pesanan lagi? (y/n): ", (jawab) => {
          if (jawab.toLowerCase() === "y") {
            tanyaPesan();
          } else {
            console.log("-------------------------");
            console.log("Daftar Pesanan:");
            pesan.forEach((pesanan, index) => {
              console.log(`Pesanan ke-${index + 1}:`);
              console.log(`Nama: ${pesanan.nama}`);
              console.log(`Menu: ${pesanan.menu}`);
              console.log(`Jumlah: ${pesanan.jumlah}`);
              console.log("-------------------------");
            });

            rl.question("Cari pesanan berdasarkan nama: ", (namaCari) => {
              const pesananDitemukan = cariPesanan(namaCari);
              if (pesananDitemukan) {
                console.log("Pesanan ditemukan:");
                console.log(`Nama: ${pesananDitemukan.nama}`);
                console.log(`Menu: ${pesananDitemukan.menu}`);
                console.log(`Jumlah: ${pesananDitemukan.jumlah}`);
              } else {
                console.log("Pesanan tidak ditemukan.");
              }

              rl.question("Hapus pesanan berdasarkan nama: ", (namaHapus) => {
                hapusPesan(namaHapus);
                rl.close();
              });
            });
          }
        });
      });
    });
  });
}

tanyaPesan();
