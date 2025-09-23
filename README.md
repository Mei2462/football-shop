Pertanyaan Tugas 4: Implementasi Autentikasi, Session, dan Cookies pada Django

Pertanyaan:
1. Apa itu Django AuthenticationForm? Jelaskan juga kelebihan dan kekurangannya.
-> AuthenticationForm adalah form bawaan Django yang digunakan untuk mengelola proses login pengguna dengan memverifikasi akun dan password, melihat apakah pengguna aktif, dan memberikan pesan error jika kredensial tidak valid.

Keuntungan dari AuthenticationForm adalah sbb:
1. Sudah terintegrasi dengan sistem autentikasi Django secara langsung.
2. Termasuk validasi keamanan, seperti cek pengguna aktif dan hashing password.
3. Mudah digunakan dan tidak memerlukan pembuatan formulir manual.
4. Bisa dipanjangkan untuk menambahkan field tambahan, seperti "Remember Me".

Kekurangan dari AuthenticationForm adalah sbb:
1. Desain sederhana dan mungkin tidak fleksibel untuk UI/UX kontemporer.
2. Harus digunakan dalam konteks yang tepat, seperti ketika request.POST disertakan.
3. Secara default tidak mendukung captcha atau autentikasi 2-faktor.

2. Apa perbedaan antara autentikasi dan otorisasi? Bagaiamana Django mengimplementasikan kedua konsep tersebut?
-> Autentikasi adalah proses yang digunakan untuk memastikan identitas pengguna, biasanya menggunakan nama pengguna dan kata sandi. 

Django melakukan autentikasi dengan cara berikut:
1. Djago.Contribution.Auth
2. Form berupa AuthenticationForm
3. View berupa LoginView, LogoutView
4. Fungsi berupa authenticate(), login(), logout()

Contoh autentikasi pada Django adalah pada saat user melakukan login pada suatu website dan klik button login, browser akan mengirimkan data login ke server Django melalui metode POST. Dan pada Django akan memproses form login tersebut menggunakan AuthenticationForm yang secara otomatis akan cek username dan password, serta apakah user tersebut aktif/terblokir. Setelah itu, Django akan memanggil form.is_valid() untuk memastikan kredensial yang benar sekaligus mengautentikasi user tsb. Jika sudah berhasil, maka Django akan menyimpan data user ke dalam session hingga user tersebut logout dan session tersebut akan dihapus juga.

Otorisasi adalah proses di mana, setelah autentikasi, pengguna diberi akses ke fitur tertentu.

Django melakukan otorisasi dengan cara berikut:
1. Sistem permission seperti add, change, delete, view.
2. Dekorator berupa @login_required dan @permission_required.
3. Middleware berupa AuthenticationMiddleware.

Contoh otorisasi pada Django adalah pada saat user yang sedang aktif ingin menggunakan suatu fitur yang telah diatur berdasarkan role seperti dosen yang ingin mengakses fitur "Ubah Nilai". Setelah login, akun dosen tersebut akan diidentifikasi oleh middleware AuthenticationMiddleware yang akan mengenali user yang sedang login melalui session, melekatkan objek request.user ke setiap permintaan, serta menyediakan akses ke informasi user di semua bagian aplikasi. Sehingga Django akan mengetahui bahwa dosen memiliki permission ke fitur apa saja, dan bisa mengakses view apa saja.

3. Apa saja kelebihan dan kekurangan session dan cookies dalam konteks menyimpan state di aplikasi web?
-> Cookie adalah istilah yang digunakan untuk menggambarkan data kecil yang disimpan browser pengguna.

Kelebihan:
1. Bisa dibaca secara langsung oleh browser (misalnya untuk memilih tema).
2. Bisa digunakan lintas domain dan request setelah dikonfigurasi.

Kekurangan:
1. Dapat dimodifikasi oleh pengguna sehingga tidak aman untuk data sensitif.
2. Ukurannya yang terbatas yaitu 4 KB.
3. Memerlukan perlindungan tambahan (HttpOnly, Secure, dan SameSite).

Sessions adalah data state yang disimpan di server dan cookie yang hanya mengandung ID sesi (sessionid).

Kelebihan:
1. Lebih aman karena data tidak disimpan di client.
2. Memiliki kemampuan untuk menyimpan volume data yang lebih besar dan kompleks.

Kekurangan:
1. Bergantung pada memori server.
2. Perlu manajemen penyimpanan yang besar jika ada banyak pengguna.

4. Apakah penggunaan cookies aman secara default dalam pengembangan web, atau apakah ada risiko potensial yang harus diwaspadai? Bagaimana Django menangani hal tersebut?
-> Cookies tidak sepenuhnya aman secara default. Berikut adalah risiko potensial yang perlu diwaspadai:
1. Serangan XSS (Cross-site Scripting) dapat mencuri cookie jika tidak ditandai sebagai HttpOnly.
2. Jika digunakan tanpa perlindungan token dapat terjadi CSRF (Request Forgery Cross-Site).
3. Jika tidak dienkripsi atau ditandatangani, user dapat mengubah cookie.

Untuk menangani risiko-risiko ini, Django melakukan:
1. Menandai session cookie sebagai aman dengan SESSION_COOKIE_HTTPONLY = True (default), SESSION_COOKIE_SECURE = True (HTTPS), dan CSRF_COOKIE_SECURE = True.
2. Menandai CSRF token dalam setiap form POST dengan {% csrf_token %} dalam template serta CsrfViewMiddleware yang memvalidasi token.
3. Menandatangani cookie dengan secret key dan menolak cookie jika telah dimodifikasi.

5. Jelaskan bagaimana cara kamu mengimplementasikan checklist di atas secara step-by-step (bukan hanya sekadar mengikuti tutorial).
-> 1.	Langkah pertama yang saya lakukan adalah menambahkan fungsi registrasi, login dan logout di file views.py pada direktori main. Saya menambahkan tiga fungsi baru, yaitu register yang berfungsi untuk mendaftarkan akun user baru menggunakan UserCreationForm(form bawaan Django untuk membuat akun user baru dengan validasi otomatis), login_user yang berfungsi untuk autentikasi data dari user menggunakan AuthenticationForm (form bawaan Django untuk autentikasi user) agar bisa mengakses fitur tertentu pada web page dan logout_user yang berfungsi untuk mengarahkan user untuk kembali ke halaman login.
2.	Saya juga menambahkan decorator login_required diatas fungsi-fungsi pada file views.py yang hanya boleh diakses oleh user yang sudah login (yaitu pada fungsi show_main dan show_product), jika user belum login dan mencoba untuk mengakses fitur web page yang direstriksi diatas, maka akan diarahkan langsung ke halaman login.
3.	Setelah itu, saya menambahkan route URL fungsi-fungsi diatas pada file urls.py yang berada dalam direktori main. Saya memastikan melakukan import fungsi register, login_user, dan logout_user dari file views.py dan setelahnya menambahkan url pattern dari masing-masing fungsi tersebut kedalam list url patterns.
4.	Saya menambahkan file yang bernama login.html dan register.html pada direktori templates dalam direktori main. Pada file register.html berfungsi sebagai template untuk menampilkan form pendaftaran (UserCreationForm) user baru dan menerima input data dari user dalam pembuatan akun. Sedangkan pada file login.html berfungsi sebagai template halaman login pengguna yang sudah terdaftar sebelumnya menggunakan form dari AuthenticationForm dan menyediakan link yang mengarahkan pada halaman registrasi jika user tidak memiliki akun. Pada file main.html juga ditambahkan tampilan button logout user.
5.	Kemudian, saya melakukan import yang diperlukan pada file views.py untuk menerapkan cookies (last_login) yang terdiri dari import datetime untuk mendapatkan waktu saat itu, HttpResponseRedirect untuk modifikasi respons HTTP (menambahkan cookie dan redirect ke URL tujuan) dan reverse untuk mendapatkan URL dari fitur dalam view yang terdaftar dalam url pattern di urls.py. Pada bagian fungsi show_main, login_user dan logout_user dilakukan beberapa penambahan untuk penerapan cookies. Pada fungsi show_main bagian context, ditambahkan baris kode yang mengambil nilai cookie (last_login) dari browser, jika tidak ada akan dikembalikan nilai ‘Never’.Fungsi login_user ditambahkan baris kode yang dapat menyimpan cookie pada sisi browser dengan nilai waktu login pada saat itu setelah redirect ke halaman show_main, sedangkan pada fungsi logout_user ditambahkan baris kode yang akan menghapus cookie (last_login) setelah redirect ke halaman login kembali.
6.	Kembali pada file main.html, saya menambahkan potongan kode untuk menampilkan waktu terakhir sesi login user tersebut.
7.	Kemudian, pada file models.py dalam direktori main dilakukan import User bawaan dari Django yang dimana merupakan akun user yang dibuat sebelumnya. Saya menambahkan atribut user dengan model relasi many-to-one (menghubungkan model yang dibuat dengan user bawaan Django) yang dalam kasus ini menghubungkan produk-produk dengan satu aku penjual.
8.	Tak lupa, setelah menambahkan model saya membuat file migrasi model dan menjalankan migrasi model dengan perintah python manage.py makemigrations dan python manage.py migrate.
9.	Setelah melakukan migrasi, kembali ke file views.py, saya melakukan penambahan beberapa baris kode di fungsi create_product yang bertujuan untuk menyimpan objek model tidak langsung ke database sehingga memungkinkan beberapa penyesuaian secara manual sebelum menyimpan, menetapkan user yang mebuat produk dan akhirnya baru disimpan ke database setelah menambahkan user.
10.	Untuk menampilkan informasi username dari user yang sedang login dan fitur filter menampilkan semua produk dan menampilkan hanya produk dari user yang sedang login tersebut, saya melakukan penambahan pada file views.py di fungsi show_main, pada bagian context yang akan menampilkan nama, saya menggantinya menjadi data username yang dinamis. Saya juga menambahkan baris kode yang bertujuan untuk melakukan filter menampilkan produk berdasarkan user dan filter yang menampilkan semua produk yang ada.
11.	Kemudian, saya menambahkan baris kode yang berfungsi untuk menampilkan button filter (menampilkan semua produk dan menampilkan produk penjual yang sedang login) pada file main.html dan saya juga menambahkan baris kode yang akan menampilkan nama penjual yang membuat katalog produk tersebut pada halaman detail produk yang dimana akan menampilkan penjual dengan nama ‘Anonymous’ jika tidak terdapat informasi penjual yang membuat katalog produk tersebut pada file product_detail.html.
12.	Setelah semua ditambahkan, saya menjalankan server dan membuka link http://localhost:8000/ pada browser untuk memastikan tampilan sesuai dengan apa yang diinginkan.
13.	Untuk memastikan semua fitur berjalan dengan baik, pada server lokal saya membuat dua akun yang berbeda dan masing-masing saya tambahkan tiga jenis dummy data yang berbeda.
14.	Setelah semua dipastikan berjalan dengan baik, langkah terakhir adalah melakukan add, commit dan push ke GitHub.