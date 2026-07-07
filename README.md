# 💼 Admin UI Dashboard

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=flat-square&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.2-06B6D4?style=flat-square&logo=tailwindcss)
![Material UI](https://img.shields.io/badge/Material--UI-9.1-007FFF?style=flat-square&logo=mui)

Sebuah admin dashboard modern dan responsif yang dibangun dengan teknologi terkini untuk memberikan pengalaman pengguna yang optimal. Aplikasi ini dilengkapi dengan sistem autentikasi, tema warna dinamis, dan visualisasi data yang interaktif.

---

## ✨ Fitur Utama

### 🎨 **Tema Dinamis**

- Pilih dari berbagai warna tema (Teal, Blue, Purple, Orange, Red) yang langsung diterapkan ke seluruh aplikasi
- UI responsif yang menyesuaikan dengan pilihan tema Anda
- Navbar, charts, dan tombol berubah warna secara real-time

### 🔐 **Autentikasi Penuh**

- Login dan registrasi dengan email & password
- JWT token-based authentication
- Protected routes dan user session management
- Form validation menggunakan Formik & Yup

### 📊 **Dashboard Interaktif**

- Visualisasi data dengan Material-UI Charts (Bar Chart, Line Chart)
- Statistik real-time tentang transaksi dan pengeluaran
- Ringkasan balance, goals, dan expenses breakdown
- Responsive design yang sempurna di semua ukuran layar

### 🔄 **State Management**

- React Context API untuk tema, autentikasi, dan counter
- Efficient re-rendering dengan context hooks
- Global state yang mudah di-maintain

### 🎯 **UX/UI Modern**

- Komponen yang dapat digunakan kembali (reusable components)
- Navigasi sidebar intuitif
- Notifikasi dan feedback interaktif
- Tailwind CSS untuk styling yang clean dan modern

---

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ dan npm/npm

### Instalasi

```bash
# Clone repository
git clone https://github.com/nabsx/admin-ui.git
cd admin-ui

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.development.local

# Jalankan development server
npm run dev
```

Server akan berjalan di `http://localhost:5173`

---

## 🔑 Test Credentials

Gunakan kredensial berikut untuk testing:

```
Email: hello@example.com
Password: 123456
```

---

## 📁 Struktur Folder

```
src/
├── components/          # Reusable UI components
│   ├── Elements/       # Basic components (Button, Input, Card, etc)
│   ├── Fragments/      # Composite components (Forms, CardBalance, etc)
│   └── Layouts/        # Page layouts (MainLayout, etc)
├── pages/              # Page components
│   ├── dashboard.jsx   # Main dashboard page
│   ├── balance.jsx     # Balance page
│   ├── SignIn.jsx      # Login page
│   ├── SignUp.jsx      # Register page
│   └── error.jsx       # Error handling page
├── context/            # React Context (Theme, Auth, Counter)
├── services/           # API services dan axios configuration
├── data/               # Mock data
├── utils/              # Utility functions
├── App.jsx             # Main app component dengan routing
└── main.jsx            # Entry point
```

---

## 🛠️ Tech Stack

| Technology       | Purpose                     | Version |
| ---------------- | --------------------------- | ------- |
| **React**        | UI Library                  | 18.3.1  |
| **Vite**         | Build tool & Dev Server     | 5.4     |
| **React Router** | Client-side routing         | 7.17    |
| **Tailwind CSS** | Utility-first CSS framework | 4.2     |
| **Material-UI**  | Component library           | 9.1     |
| **Formik**       | Form state management       | 2.4.9   |
| **Yup**          | Form validation             | 1.7     |
| **Axios**        | HTTP client                 | 1.18    |
| **JWT Decode**   | JWT token parsing           | 4.0     |

---

## 📝 Available Scripts

```bash
# Development server dengan HMR
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Run Cypress tests
npm run test:e2e
```

---

## 🎨 Customization

### Mengubah Tema

Tema dapat diubah melalui theme selector di sidebar. Component secara otomatis akan menggunakan `theme.color` dari ThemeContext.

### Menambah Route Baru

```jsx
// Di App.jsx
{
  path: "/new-page",
  element: (
    <RequireAuth>
      <NewPage />
    </RequireAuth>
  ),
}
```

### Membuat Component Baru

```jsx
// src/components/Elements/MyComponent.jsx
import React from "react";

export default function MyComponent({ prop1, prop2 }) {
  return <div>{/* Component content */}</div>;
}
```

---

## 🔐 Autentikasi

Aplikasi menggunakan JWT (JSON Web Token) untuk autentikasi:

1. User login dengan email & password
2. Server mengembalikan JWT token
3. Token disimpan di browser storage
4. Setiap request akan menyertakan token di header
5. Protected routes mengecek token validity

---

## 🚨 Error Handling

- Global error page untuk 404 dan error lainnya
- Form validation dengan pesan error yang informatif
- API error handling dengan Axios interceptors
- User feedback melalui snackbar notifications

---

## 📱 Responsive Design

Dashboard fully responsive dengan breakpoints:

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

---

## 🤝 Contributing

Kontribusi sangat diterima! Silakan:

1. Fork repository
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📄 License

Project ini dilisensikan di bawah MIT License - lihat file `LICENSE` untuk detail lebih lanjut.

---

## 🤩 Highlights

- ✅ **Modern & Clean UI** - Design yang elegant dan user-friendly
- ✅ **Fast Performance** - Built dengan Vite untuk development speed
- ✅ **Scalable Architecture** - Component-based structure yang mudah di-expand
- ✅ **Type Safe (Ready)** - Siap untuk TypeScript migration
- ✅ **Fully Responsive** - Mobile-first approach
- ✅ **Dark Mode Ready** - Theme system yang extensible

---

## 📚 Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Material-UI](https://mui.com)
- [React Router](https://reactrouter.com)

---

## 💬 Support

Jika ada pertanyaan atau butuh bantuan:

1. Cek [Issues](https://github.com/nabsx/admin-ui/issues) yang sudah ada
2. Buat issue baru dengan deskripsi detail
3. Sertakan screenshots atau error messages

---

**Made with ❤️ by NABHAAN AURYSHAFA ADHIGANA**

_Last Updated: 2026_
