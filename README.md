Pertanyaan Tugas 5: Desain Web menggunakan HTML, CSS dan Framework CSS

Pertanyaan:
1. Jika terdapat beberapa CSS selector untuk suatu elemen HTML, jelaskan urutan prioritas pengambilan CSS selector tersebut!
-> Ketika beberapa CSS selector untuk suatu elemen HTML yang sama,  maka CSS selector akan melakukan pengurutan prioritas berdasarkan cascade dengan urutan sbb:
1. Melihat apakah ada deklarasi !important, yang kemudian akan mengalahkan deklarasi normal (tanpa !important). Namun, jika pada dua aturan sama-sama !important, maka urutan prioritas dilanjutkan ke specificty & urutan sumber.
2. Kemudian ada asal & layer, dimana author styles pada CSS kita akan mengalahkan user agent (default browser). Jika elemen HTML menggunakan @layer dalam kategori yang sama, maka layer yang terakhirlah yang memiliki prioritas paling tinggi (bottom to top). 
3. Selanjutnya ada specificity (tingkat kekhususan selector) dengan urutan prioritas inline style -> ID selector -> class/attribute/pseudoclass -> element/pseudoelement. 
4. Jika semua poin di atas sama, maka aturan urutan terakhir yang digunakan adalah berdasarkan urutan kemunculan (source order). Pada aturan ini, yang muncul terakhir pada stylesheetlah yang diprioritaskan. 

Beberapa pengecualian untuk pengurutan priotitas: 
- :not(...) tidak menambah specificity; yang di dalamnya yang dihitung.
- :is(...) menggunakan specificity terbesar dari daftar di dalamnya.
- :where(...) selalu specificity 0, jadi ideal untuk “utilitas” yang mudah dioverride.
- !important dalam stylesheet bisa mengalahkan inline style biasa (tanpa !important).

2. Mengapa responsive design menjadi konsep yang penting dalam pengembangan aplikasi web? Berikan contoh aplikasi yang sudah dan belum menerapkan responsive design, serta jelaskan mengapa!
-> Karena web dapat diakses melalui berbagai ukuran dan densitas pixel seperti melalui ponsel, tablet, laptop, dan desktop, tata letak yang responsif sangat penting untuk meningkatkan keterbacaan karena tidak perlu selalu pinch-zoom. Selain itu, SEO seperti Google memprioritaskan situs yang ramah ponsel. Pada sisi developer pun dapat mempertahankan basis kode yang konsisten untuk semua perangkat dan membuat akses ke 1 situs yang sama.  

GitHub, Youtube, dan Airbnb adalah beberapa contoh yang sudah menggunakan responsive design. Web-web tersebut menggunakan layout fluida, grid/flex adaptif, breakpoint untuk navigasi & konten untuk memastikan konten mereka karena kelebihan yang telah disebutkan di atas. Sehingga website tetap dapat diakses melalu berbagai device (mobile, tab, maupun desktop).

Sebaliknya, masih ada Sebagian website juga yang belum menerapkan responsive design seperti Tempo.co dan SIAK NG menggunakan lebar tetap tanpa media query sehingga tampilannya yang terlalu zoom-in pada ponsel. Ketika user zoom-out, maka tampilan font menjadi terlalu kecil, tombol sulit ditekan, dan kolom yang tidak disesuaikan dengan lebar perangkat membuat user perlu untuk scroll horizontal untuk membaca seluruh tulisan pada 1 baris.

3. Jelaskan perbedaan antara margin, border, dan padding, serta cara untuk mengimplementasikan ketiga hal tersebut!
-> Dalam box model CSS, margin adalah ruang transparan di luar border. Margin ini memisahkan elemen dengan elemen lainnya, dan pada flow standard margin vertical dapat saling "collapse". Sedangkan border adalah garis yang membatasi antara margin dan padding. Dan terakhir padding adalah ruang di dalam margin yang membuat konten memiliki ruang untuk "napas" dari konten. Contohnya adalah latar belakang atau elemen latar belakang, yang dapat meluas di area padding. Sehingga, jika ditulis urutannya dari bagian terluar adalah [ margin ]  →  [ border ]  →  [ padding ]  →  [ content ].

Untuk mengimplementasikan margin, border, dan padding adalah dengan urutan sbb:
margin: 16px; //berlaku semua sisi
padding: 12px 24px; //vertikal 12, horizontal 24
border: 2px solid #333; //ketebalan, dan warna

Namun, implementasi dari margin, border, dan padding  tidak terbatas pada pixel saja, namun bisa ditentukan dengan satuan-satuan lainnya juga.

4. Jelaskan konsep flex box dan grid layout beserta kegunaannya!
->
Flexbox adalah sistem layout satu dimensi yang mengatur item sepanjang satu sumbu (row atau column). Properti inti dari container flexbox seperti display adalah flex; flex-direction; flex-wrap; justify-content; align-items; gap. Adapun properti item pada flexbox berupa
flex adalah <grow> <shrink> <basis>; align-self; order. Penggunaan flexbox ini banyak ditemukan pada cocok untuk navbar, baris kartu, alignment tengah, dan komponen yang mengalir linear.

Grid (two‑dimensional layout) berfokus pada sistem dua dimensi yang secara bersamaan mengatur baris dan kolom. Sehingga dengan grid akan memungkinkan mendeklarasikan track (grid; grid-template-columns; grid-template-rows;), area bernama (grid-template-areas), dan grid responsif (auto-fit/auto-fill, minmax) yang ideal untuk layout halaman, dashboard, galeri, tabel kartu, dan kombinasi area (header/main/aside/footer).

Lantas kapan pakai Flex vs Grid? Idealnya kita menggunakan Flexbox untuk aliran linear satu arah dan penyusunan komponen kecil. Sedangkan Grid untuk komposisi dua dimensi yang membutuhkan kontrol area yang lebih luas dan relasi baris‑kolom. Namun keduanya juga sering dikombinasikan dalam satu interface karena dapat saling melengkapi satu sama lain.

5. Jelaskan bagaimana cara kamu mengimplementasikan checklist di atas secara step-by-step (bukan hanya sekadar mengikuti tutorial)!
-> 1. Langkah pertama yang saya lakukan adalah menambahkan fungsi edit dan hapus produk di file views.py pada direktori main. Saya menambahkan tiga fungsi baru, yaitu edit_product yang akan menampilkan dan memproses form edit produk dari data produk yang sudah ada dan fungsi delete_product yang akan menghapus produk dari database berdasarkan id dari produk tersebut.
2. Setelah itu, saya menambahkan route URL fungsi-fungsi diatas pada file urls.py yang berada dalam direktori main. Saya memastikan melakukan import fungsi edit_product dan delete_product dari file views.py dan setelahnya menambahkan url pattern dari masing-masing fungsi tersebut kedalam list url patterns.
3.	Saya menambahkan file yang bernama edit_product.html pada direktori templates dalam direktori main. Pada file edit_product.html berfungsi sebagai template untuk menampilkan form edit produk yang sudah terisi dengan data sebelumnya sehingga user dapat memperbarui data produk dan menyimpan data produk yang baru ke dalam database.
4.	Kemudian, saya melakukan modifikasi di file main.html pada direktori templates yang berada dalam direktori main. modifikasi yang saya pada main.html adalah memunculkan tombol edit dan delete pada setiap produk yang terhubung dengan user yang membuat produk tersebut.
5. Saya membuka file base.html dalam direktori templates yang berada pada direktori root project, saya menambahkan script cdn tailwind pada bagian head html yang berfungsi untuk menyiapkan metadata dan style pada html menggunakan css framework tailwind.
6. Pertama-tama saya membangun navbar yang kemudian dapat diinclude ke halaman lain. Pada direktori templates/navbar/html saya membangun komponen ini dengan Tailwind yang membuat posisi navbar ini fixed di atas dan adanya hamburger menu pada tampilan mobile.
7. Untuk merapikan tampilan list produk, saya membuat HTML card_product untuk styling dan menambahkan empty state jika produk tersebut tidak memiliki thumbnail sehingga menampilkan gambar default pada direktori file yang telah ditentukan.
8. Setelah itu, saya membuat styling pada html template dengan detail-detail tambahan seperti error handling pada login, register, create product. Pada halaman main dan news detail juga saya tambahkan styling tambahan selain dari kelas tutorial sehingga dapat membuat tampilan menjadi lebih menarik. Selain itu, berdasarkan instruksi soal saya juga menambahkan halaman baru untuk edit product yang mirip dengan create product dengan menggunakan forms, namun perbedaannya adalah telah fill in field yang telah diisi pada saat create product saja. 
9.	Setelah semua ditambahkan, saya menjalankan server dan membuka link http://localhost:8000/ pada browser untuk memastikan tampilan sesuai dengan apa yang diinginkan dan function-function berjalan dengan sebagaimana mestinya.
10.	Setelah semua dipastikan berjalan dengan baik, langkah terakhir adalah melakukan add, commit dan push ke GitHub.