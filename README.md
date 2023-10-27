[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/-Z3-Ss4P)


# DoBrief: Aplikasi Manajemen Tugas

DoBrief adalah aplikasi manajemen tugas yang dirancang untuk memudahkan koordinasi dan kolaborasi dalam tim. 

Aplikasi ini dideploy kedalam server AWS dan dapat diakses melalui link berikut :
## https://dobrief.eswe.dev/

## **Fungsionalitas** :
### **Pembuatan Proyek**:
- Pengguna dapat masuk ke sistem dan membuat proyek baru dengan mengisi nama dan deskripsi proyek.

### **Pembuatan Tugas**:
- Pengguna dapat membuat tugas baru dalam proyek dengan menyediakan judul, deskripsi, dan prioritas.

### **Penugasan Tugas**:
- Menugaskan tugas kepada anggota tim dan menetapkan peran dalam penugasan tugas tersebut.

### **Pembaruan Status Tugas**:
- Memperbarui status tugas menjadi 'In Progress' atau 'Completed' sesuai dengan perkembangan tugas.

DoBrief memanfaatkan struktur database yang kuat untuk mendukung alur kerja di atas, memastikan bahwa informasi proyek dan tugas disimpan dengan aman dan dapat diakses dengan mudah oleh semua anggota tim yang berwenang.

## Akun Tes
- user1@mail.com
- user1234

## API Documentation
Dokumentasi api dapat diakses melalui swagger ui pada link berikut :
## https://w18.eswe.dev/v1/api-docs


## Isu dan Kendala
Backend dari aplikasi ini sudah dibuat dengan lengkap termasuk fitur pengaturan peran dinamis dan komentar. Tetapi yang pada frontend tidak dapat mengediakan ui yang dapat mengakomodasi fitur tersebut karena keterbatasan waktu.

Saat ini frontend hanya menyediakan satu halaman yang mengakomodir semua action melalui modal pada bagian project dan task.