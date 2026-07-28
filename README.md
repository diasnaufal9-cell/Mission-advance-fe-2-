# 🎓 VideoBelajar — Web-Based Learning Platform

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.12-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![Zustand](https://img.shields.io/badge/Zustand-5-443E38?style=for-the-badge)](https://zustand-demo.pmnd.rs/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![React Router](https://img.shields.io/badge/React_Router-7-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)](https://reactrouter.com/)
[![Axios](https://img.shields.io/badge/Axios-1.18-5A29E4?style=for-the-badge)](https://axios-http.com/)

**VideoBelajar** adalah platform pembelajaran daring (*e-learning*) modern berbasis video. Proyek ini dibangun sebagai implementasi standar industri *Frontend Web Development*, berfokus pada arsitektur modular, integrasi REST API, manajemen *state* terpisah (*Dual-State Strategy*), serta pengalaman pengguna (*UX*) yang responsif.

---

## 📑 Daftar Isi
- [Fitur Utama](#-fitur-utama)
- [Arsitektur & State Management](#-arsitektur--state-management)
- [Tech Stack & Dependensi](#-tech-stack--dependensi)
- [Struktur Proyek](#-struktur-proyek)
- [Panduan Instalasi & Penggunaan](#-panduan-instalasi--penggunaan)
- [Alur Autentikasi & Keamanan](#-alur-autentikasi--keamanan)
- [Pengembang](#-pengembang)

---

## ✨ Fitur Utama

### 👥 Area Publik (Siswa)
* **Katalog Kursus Interaktif:**
  * Pencarian kursus secara *real-time* berdasarkan kata kunci.
  * Filter berdasarkan kategori (Programming, Desain, Marketing, Bisnis).
  * Pengurutan (*sorting*) berdasarkan harga dan popularitas.
  * Sistem halaman (*pagination*) dinamis.
* **Autentikasi & Profil Pengguna:**
  * Register & Login dengan validasi form (email unik, konfirmasi kata sandi).
  * Input nomor telepon internasional dengan pemilih kode negara.
  * Manajemen profil pengguna.
  * Sesi login tetap tersimpan meski halaman di-*refresh* (*persistent session*).

### 🛠️ Area Admin (Dashboard Management)
* **Dashboard Statistik:** Ringkasan performa platform dan total data.
* **Manajemen Kursus (CRUD):** Tambah, lihat, ubah, dan hapus data kursus.
* **Manajemen Pengguna:** Pengelolaan daftar pengguna terdaftar.
* **Protected Routes:** Akses khusus admin dengan proteksi jalur navigasi.
* **Notifikasi Toast:** Umpan balik visual (*toast notification*) untuk setiap aksi CRUD dan error.

---

## 🏗️ Arsitektur & State Management

Proyek ini menggunakan strategi **Dual-State Management** untuk memisahkan tanggung jawab *data flow* agar aplikasi tetap ringan dan terorganisir:

```text
               ┌─────────────────────────────────────────┐
               │              React App                  │
               └────┬───────────────────────────────┬────┘
                    │                               │
       ┌────────────▼──────────┐       ┌────────────▼──────────┐
       │   Zustand Auth Store  │       │  Redux Toolkit Store  │
       ├───────────────────────┤       ├───────────────────────┤
       │ - User Session        │       │ - Course Data List    │
       │ - Login / Logout State│       │ - Filter & Search     │
       │ - Persistent Auth     │       │ - Course CRUD State   │
       └────────────┬──────────┘       └────────────┬──────────┘
                    │                               │
                    └───────────────┬───────────────┘
                                    │
                         ┌──────────▼──────────┐
                         │   Axios Service     │
                         ├─────────────────────┤
                         │ - Centralized API   │
                         └─────────────────────┘

src/
├── assets/             # Asset statis (gambar, icon, svg)
├── components/         # Komponen UI Reusable
│   ├── layout/         # Komponen tata letak (Navbar, Footer, Sidebar, AdminLayout)
│   └── ui/             # Komponen UI kecil (CourseCard, Hero, Pagination, SearchBox, dll)
├── context/            # React Context (e.g., ThemeContext untuk Mode Gelap/Terang)
├── pages/              # Halaman Aplikasi
│   ├── admin/          # Halaman Dashboard Admin (Dashboard, Products, Users)
│   └── public/         # Halaman Publik (Home, Courses, CourseDetail, Login, Register, Profile)
├── services/           # Konfigurasi Axios & endpoint API
├── store/              # Manajemen State
│   ├── redux/          # Redux Store & Slices (courseSlice.js, store.js)
│   └── useAuthStore.js # Zustand Auth Store
└── utils/              # Fungsi Bantuan / Helper Functions