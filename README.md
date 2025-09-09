Tautan menuju aplikasi PWS: https://mei-ching-footballshop.pbp.cs.ui.ac.id/

Pertanyaan:
1. Jelaskan bagaimana cara kamu mengimplementasikan checklist di atas secara step-by-step (bukan hanya sekadar mengikuti tutorial).
-> Langkah pertama yang saya lakukan adalah membuat repositori publik di GitHub dan menyiapkan direktori lokal proyek yang bernama football-shop. Kemudian, saya menjalankan git init di PowerShell pada direktori proyek. Untuk mengisolasi dependensi proyek, saya membuat virtual environment dengan menjalankan perintah Set-ExecutionPolicy Unrestricted -Scope Process di PowerShell. Setelahnya saya membuat file requirements.txt yang digunakan untuk instalasi dependencies dengan perintah pip install -r requirements.txt. Setelah instalasi berhasil, saya membuat proyek Django dengan nama football_shop dengan perintah django-admin startproject football_shop . , bagian titik di akhir untuk memastikan agar manage.py berada di root, yang memudahkan pengelolaan dan deployment proyek. Pada bagian konfigurasi, saya membuat dua environment file (.env -> development lokal (PRODUCTION=False) dan .env.prod -> produksi deployment (data kredensial dan PRODUCTION=True)) dan melakukan perubahan pada file settings.py. Kemudian saya melakukan migrasi, runserver dan membuka link http://localhost:8000/ untuk mengecek apakah aplikasi Django sudah dibuat dengan baik. 

Setelah aplikasi Django berhasil dibuat, saya membuat aplikasi yang bernama "main" dengan perintah python manage.py startapp main dan mendata aplikasi main ke proyek football_shop. Kemudian saya membuat templates dengan membuat direktori templates di dalam direktori dalam yang berisi file html yang akan menampilkan template tampilan nama aplikasi serta nama dan kelas di web. Setelah itu saya mulai mengubah berkas models.py dalam aplikasi sesuai dengan ketentuan soal (membuat model yang bernama Product dengan atribut name, price, description, thumbnail, category, is_featured, stock(optional) dengan metode yang mengembalikan representasi string objek(deskripsi produk yang lengkap)). Setelah membuat perubahan pada models, saya melakukan migrasi model agar perubahan tersimpan di basis data lokal. Setelah semua perubahan dilakukan, saya menghubungkan views dengan template. Pertama, saya mengimpor render dari django.shortcuts di views.py dan kemudian membuat fungsi show_main. Fungsi ini menerima permintaan, membuat data (nama aplikasi, nama, kelas) dan kemudian menggunakan render untuk mengirimkan data ke template main.html. Masuk ke langkah routing, saya membuat pola URL kosong ('') di main/urls.py yang menghubungkan root (http://localhost:8000/) ke fungsi show_main. Kemudian, di level proyek football_shop/urls.py, kita menggunakan include('main.urls') untuk memberi tahu Django bahwa dia perlu membaca routing aplikasi main. Setelah semua terhubung, saya melakukan unit testing di file tests.py untuk mengecek apakah fitur-fitur berjalan sesuai dengan yang dimaksud di berbagai kemungkinan skenario (test case).

Langkah selanjutnya yang saya lakukan adalah menambahkan file .gitignore agar file-file atau direktori yang sensitif, diabaikan oleh git sehingga tidak akan di-push ke repositori GitHub. Kemudian saya hubungkan repositori lokal dengan repositori GitHub, membuat branch yang bernama master dan melakukan add, commit dan push ke repositori GitHub. Langkah yang terakhir adalah menghubungkan git dengan pws dan deployment proyek di pws. Pada pws buat proyek baru dengan nama footballshop, edit environment sesuai dengan .env.prod dengan skema tugas_individu, tambahkan URL deployment pws di settings.py bagian allowed hosts dan push perubahan tersebut ke direktori GitHub. Setelah selesai, saya menjalankan perintah sesuai dengan informasi project command di pws dan mengisi token akses sesuai dengan informasi kredensial yang didapat saat membuat proyek baru sebelumnya. Setelah status proyek "building" telah berubah menjadi "running", klik view project dan rangkaian implementasikan checklist di atas telah terselesaikan semua.

2. Buatlah bagan yang berisi request client ke web aplikasi berbasis Django beserta responnya dan jelaskan pada bagan tersebut kaitan antara urls.py, views.py, models.py, dan berkas html.
->  
[1] Client (Browser)
    │ mengirimkan permintaan (request HTTP)
    v
[2] URL dikirim ke Server Django
    │ dicocokkan oleh
    v
[3] urls.py (URL Dispatcher)
    │ meneruskan ke
    v
[4] views.py (Logic Handler)
    │
    ├── (opsional) Panggil models.py untuk query data
    │ mengirimkan data ke
    v
[5] templates/ (HTML dirender)
    │ menghasilkan tampilan dan
    v
[6] Response HTML dikirim ke Client

Penjelasan:
Saat pengguna mengakses halaman web melalui browser, permintaan HTTP dikirim ke server Django. Request ini pertama kali ditangani oleh file pemetaan rute urls.py. Pada tahap ini, Django mencocokkan URL yang diminta dengan pola URL yang telah didefinisikan sebelumnya. Jika tidak ditemukan kecocokan, maka akan menampilkan eror 404. Namun jika ada kecocokan, permintaan akan dikirim ke fungsi yang sesuai di file views.py, yang bertanggung jawab untuk menjalankan logika utama aplikasi, seperti mengambil data dari database atau memproses input pengguna. Jika data diperlukan dari database, tampilan akan memanggil model yang ada di models.py. 

Setelah data diperoleh, view akan memanggil fungsi yang ada di dalam folder templates yang berisi interface dan elemen dinamis yang disisipkan menggunakan tag Django. Kemudian, Django akan mengembalikan halaman HTML ke browser pengguna sebagai respons HTTP setelah proses rendering selesai. 

Sehingga setiap komponen memiliki fungsi khusus yang berhubungan dengan satu sama lain yaitu, urls.py berfungsi sebagai pengarah, views.py berfungsi sebagai pengolah logika, models.py berfungsi sebagai penyedia data, dan templates berfungsi sebagai penyaji tampilan.

3. Jelaskan peran settings.py dalam proyek Django!
-> File settings.py digunakan dalam proyek Django sebagai pusat pengaturan utama yang mengatur cara aplikasi berjalan.  Dalam file ini, kita menetapkan konfigurasi penting seperti koneksi ke database, daftar aplikasi yang digunakan, pengaturan keamanan, lokasi file statis dan media, zona waktu, bahasa, dan lainnya. Django akan membaca semua pengaturan ini saat proyek dimulai untuk mengetahui bagaimana menangani permintaan pengguna, menyimpan data, merender halaman, dan mengatur keamanan.

4. Bagaimana cara kerja migrasi database di Django?
-> Proses migrasi database di Django adalah untuk memastikan struktur database sesuai dengan model yang kita definisikan di dalam file models.py, sehingga database tidak langsung diubah saat kita membuat atau mengubah sesuatu dalam model, seperti menambahkan kolom atau tabel baru. Migrasi database di Django dimulai ketika kita membuat atau mengubah model di file models.py. 

Untuk melakukan migrasi database, kita harus menjalankan perintah python manage.py makemigrations, yang akan memberi tahu Django tentang perubahan pada model dan akan membuat file file migrasi di dalam folder migrations/ dan menyimpan instruksi yang menjelaskan perubahan struktur data dalam format Python. Kemudian, ketika kita menjalankan perintah python manage.py migrate, Django akan membaca file migrasi dan menerjemahkannya menjadi perintah SQL, yang kemudian dieksekusi ke database (CRUD). Django juga memiliki tabel internal django_migrations untuk mencatat migrasi yang telah digunakan di tabel internalnya untuk menjamin bahwa proses migrasi tidak digunakan berulang kali. 

5. Menurut Anda, dari semua framework yang ada, mengapa framework Django dijadikan permulaan pembelajaran pengembangan perangkat lunak?
-> Salah satu alasan utama mengapa Django cocok dijadikan permulaan pembelajaran adalah karena Django secara default memiliki banyak fitur penting, seperti manajemen basis data, sistem autentikasi pengguna, routing URL, dan antarmuka pengguna. Oleh karena itu, user tidak perlu mengonfigurasi semuanya secara manual, dan dapat fokus pada bagaimana data disimpan dan diproses, bagaimana tampilan web dirender, serta bagaimana logika aplikasi dijalankan.

Django juga menggunakan pola arsitektur Model–Template–View (MTV). Pola ini berasal dari pola Model–View–Controller (MVC) yang populer di pengembangan perangkat lunak modern. Pola ini menawarkan cara berpikir terstruktur dalam membangun aplikasi dengan memisahkan komponen yang menangani data (Model), logika aplikasi (View), dan antarmuka pengguna (Template). Ini sangat membantu user dalam membangun model yang rapi dan modular yang akan berguna saat belajar framework dengan struktur lainnya.

Kemampuan Django untuk terintegrasi dengan database melalui pemetaan hubungan objek (ORM) juga merupakan alasan yang tidak kalah penting. ORM memungkinkan pengelolaan data menggunakan sintaks Python tanpa harus menulis perintah SQL secara langsung yang sangat membantu bagi kami yang belum belajar bahasa query sql.

6. Apakah ada feedback untuk asisten dosen tutorial 1 yang telah kamu kerjakan sebelumnya?
-> Tidak ada feedback khusus yang ingin saya sampaikan. Selama pelaksanaan tutorial 1 saya tidak mengalami kendala karena materi tutorial 1 sudah sangat jelas dan sistematis.