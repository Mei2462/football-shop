Tugas 6: Javascript dan AJAX

1. Apa perbedaan antara synchronous request dan asynchronous request?
-> Pada synchronous request, user harus menunggu dan seolah-olah terjebak hingga proses dari request tersebut selesai. Hal ini dikarenakan request akan dikirim dan user harus menunggu response hingga selesai dan kemudian halaman akan di-reload. 

Pada asynchronous request, semua proses akan berjalan di belakang layar dan tidak perlu untuk memuat ulang halaman. Hal ini dikarenakan response yang kemudian diberikan cukup digunakan untuk memperbarui bagian tertentu dari DOM, sehingga user dapat terus mengakses halaman tersebut tanpa harus menunggu semua request selesai diproses.

2. Bagaimana AJAX bekerja di Django (alur request–response)?
-> User action (misal klik button atau submit form) -> memicu fetch() menuju endpoint yang sudah didefine pada urls.py -> view akan memproses input user -> return data dengan JsonResponse -> JavaScript menerjemahkan response yang diberikan -> render halaman/UI. 

Note: perbedaannya hanya pada response yang dikirimkan bukan berupa HTML penuh.

3. Apa keuntungan menggunakan AJAX dibandingkan render biasa di Django
-> Pada AJAX tidak akan ada reload halaman sehingga user experience lebih maksimal dan tetap terjaga. Selain itu, karena data yang dikirim hanya berupa request saja, bandwith dan dan waktu loading pun tentunya akan lebih efisien dan cepat. Arsitektur pada AJAX pun memisahkan frontend dan backend yang membuat pengembangan selanjutnya lebih mudah, karena dapat menggunakan API yang sama untuk aplikasi mobile.

4. Bagaimana cara memastikan keamanan saat menggunakan AJAX untuk fitur Login dan Register di Django?
-> Untuk memastikan keamanan saat menggunakan AJAX pada fitur Login dan Register di Django, kita dapat:
1. Menggunakan CSRF protection berupa X-CSRFToken di header untuk POST/PUT/DELETE pada setiap permintaan yang tidak memiliki atribut GET.  
2. Batasi method POST dengan @require_POST untuk endpoint login/register/logout.
3. Tetap menggunakan validasi manual pada saat login/register dengan AuthenticationForm / UserCreationForm.
4. Menjalankan aplikasi hanya melalui HTTPS agar cookie sesi dan token tidak dapat dicuri. Hal ini dapat dilakukan dengan fitur keamanan cookie, seperti SESSION_COOKIE_SECURE, CSRF_COOKIE_SECURE, dan SESSION_COOKIE_SAMESITE='Lax'.  
5. Pertimbangkan rate limiting atau throttling untuk mencegah brute force dengan mengimplementasikan django-ratelimit / django-axes.
6. Batasi CORS hanya untuk sumber yang dapat diandalkan.

5. Bagaimana AJAX mempengaruhi pengalaman pengguna (User Experience) pada website?
-> AJAX membuat user experience menjadi:
1. Terasa lebih responsive dan lancar karena adanya response visual secara langsung untuk action yang dilakukan oleh user seperti indikator loading dan toast tanpa harus menghentikan tampilan UI website dengan reload halaman. 
2. Sehubungan tampilan UI website yang tidak memerlukan reload berulang kali setiap adanya response yang dikirim dari user, dapat menjaga kontinuitas pekerjaan user karena posisi scroll & state halaman tidak hilang.
3. Selain itu AJAX menyediakan fallback render server jika JavaScript tidak tersedia, serta menangani semua state (loading, error, empty) dengan jelas agar pengguna selalu paham apa yang sedang terjadi. Hasil akhirnya adalah pengalaman yang lebih baik dan maksimal.