Tautan menuju screenshot postman: https://drive.google.com/drive/folders/1Pj3INFwI7sRf2jW_XK4rvzwQQtUE0Cy5?usp=sharing

Pertanyaan:
1. Jelaskan mengapa kita memerlukan data delivery dalam pengimplementasian sebuah platform? 
-> Karena aplikasi modern tidak hanya menampilkan data statis tetapi juga membutuhkan komunikasi data dinamis antara client (browser atau aplikasi seluler) dan server. Tanpa data delivery, aplikasi tidak dapat menampilkan informasi terbaru, menyimpan data pengguna, atau menyinkronkan sistem. Misalnya, ketika seseorang mengisi formulir, memilih produk, atau melihat daftar berita terbaru, data harus dikirim dari klien ke server, atau sebaliknya.

2. Menurutmu, mana yang lebih baik antara XML dan JSON? Mengapa JSON lebih populer dibandingkan XML? 
-> Menurut saya, JSON adalah pilihan yang lebih baik untuk pengembangan platform kontemporer karena lebih ringan, mudah digunakan, dan kompatibel dengan teknologi web saat ini. Beberapa kelebihan yang telah disebutkan sebelumnya juga merupakan alasan mengapa JSON menjadi lebih populer dibandingkan XML yang lebih baik digunakan dalam konteks sejarah bisnis atau ketika format yang sangat ketat diperlukan untuk validasi. 

3. Jelaskan fungsi dari method is_valid() pada form Django dan mengapa kita membutuhkan method tersebut? 
-> Method is_valid() digunakan untuk memastikan bahwa data yang dikirimkan melalui form sesuai dengan aturan atribut yang ditetapkan saat deklarasi class. 

4. Mengapa kita membutuhkan csrf_token saat membuat form di Django? Apa yang dapat terjadi jika kita tidak menambahkan csrf_token pada form Django? Bagaimana hal tersebut dapat dimanfaatkan oleh penyerang?
-> Mekanisme keamanan csrf_token digunakan untuk mencegah serangan Cross-Site Request Forgery (CSRF), yaitu serangan di mana penyerang akan mencoba mengirim permintaan palsu atas nama pengguna yang sudah ter-login.

Saat pengguna membuka formulir, Django memasukkan token khusus ke dalam halaman. Setelah formulir dikirim, token ini dicocokkan oleh Django untuk memastikan bahwa permintaan benar-benar berasal dari halaman situs tersebut, bukan dari situs pihak ketiga yang berbahaya.

jika kita tidak menambahkan csrf_token, penyerang dapat membuat situs palsu yang mengirim form POST ke server Django dengan kredensial pengguna yang sedang login, misalnya untuk mengganti password, menghapus/menambahkan informasi, hingga melakukan transaksi atas nama pengguna.

5. Jelaskan bagaimana cara kamu mengimplementasikan checklist di atas secara step-by-step (bukan hanya sekadar mengikuti tutorial).
-> 
1. Saya menambahkan empat fungsi di file views.py pada direktori main, yaitu fungsi show_xml, show_json, show_xml_by_id, dan show_json_by_id yang berfungsi untuk mengkonversi data menjadi format data xml dan json serta konversi data berdasarkan id ke dalam format data xml dan json.
2. Setelah itu saya menambahkan URL route pada urls.py yang berada dalam direktori main dengan memastikan semua fungsi telah di-import dengan baik dan baru ditambahkan kedalam url patterns fungsi-fungsi baru yang ditambahkan sebelumnya.
3. Saya membuat direktori templates dan membuat file base.html pada root direktori yang berfungsi untuk menjadi sebuah template yang akan dipakai oleh aplikasi main ataupun aplikasi lainnya yang berada dalam proyek, tidak lupa setelah membuat template global, saya juga mendaftarkannya ke settings.py root agar django bisa membaca direktori templates.
4. Tidak lupa, saya juga melakukan beberapa penyesuaian pada models.py dalam direktori main seperti menambahkan atribut id agar bisa memberikan identitas unik pada product dan menambahkan fungsi yang nantinya menampilkan harga dan stok product, dilanjutkan dengan melakukan migrasi data baru tersebut ke database.
5. Saya membuat file forms.py yang berisi kode yang berfungsi untuk membuat form yang secara otomatis terhubung dengan model Product sehingga terjadi penyimpanan data secara langsung ke database tanpa memerlukan penulisan ulang secara manual.
6. Setelah itu, saya menambahkan fungsi create_product dan show_product di file views.py pada direktori main yang berfungsi untuk menerima input form dari user dalam menambahkan product ke database dan menampilkan informasi detail dari sebuah product berdasarkan id yang ada, dilanjutkan dengan menambahkan URL route pada urls.py kedua fungsi diatas dengan memastikan kedua fungsi tersebut telah di-import dan ditambahkan pada url patterns.
6. Saya juga menambahkan penyesuaian pada file main.html pada direktori templates yang berada dalam direktori main. Saya menambahkan tampilan tombol untuk membuat produk dan looping menampilkan isi product list (name, category, price, stock, thumbnail, deskripsi singkat, tombol untuk mengakses product details).
7. Melengkapi fungsi dari main.html saya juga menambahkan file create_product.html pada direktori yang sama dengan main.html yang dimana berfungsi untuk menampilkan form pengisian untuk menambahkan product baru. Selain itu, saya juga menambahkan file product_detail.html yang juga merupakan fitur pelengkap dari main.html, yaitu berfungsi untuk menampilkan deskripsi lengkap dari sebuah product.
8. Saya juga menambahkan CSRF_TRUSTED_ORIGINS yang berisi link domain pws pada file settings.py dalam direktori proyek agar mengizinkan akses post dari domain pws dari yang secara default django memblokir semua akses dari domain asing.
9. Setelah semua ditambahkan, saya menjalankan server dan membuka link http://localhost:8000/ pada browser untuk memastikan tampilan sesuai dengan apa yang diinginkan, saya juga mencoba untuk menambahkan sebuah produk baru untuk memastikan fitur berjalan dengan baik.
10. Setelah semua dipastikan baik, saya mencoba untuk mengakses empat url yang menampilkan data dalam format data xml dan json serta menampilkan data berdasarkan id dalam format xml dan json pada aplikasi postman, setelah status yang ditunjukkan adalah kode status 200 OK, saya melakukan dokumentasi dan melampirkan link dokumentasi pada file ini.
11. Langkah terakhir adalah melakukan add, commit dan push ke gitHub.

6. Apakah ada feedback untuk asdos di tutorial 2 yang sudah kalian kerjakan?
-> Pada tutorial 2 saya mengalami kendala karena terdapat kode pada tutorial yang kurang lengkap. Namun, asdos telah memberikan bimbingan dengan baik. Sehingga, tidak ada feedback untuk kinerja asdos di tutorial 2 ini.