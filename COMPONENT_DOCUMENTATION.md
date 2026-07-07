# Dokumentasi Component UI - Finebank Admin
## Berdasarkan Konsep Atomic Design

---

## PAGES (Halaman)
Pages adalah level tertinggi dalam Atomic Design yang merepresentasikan full page yang akan diakses pengguna.

### 1. SignIn Page
**Path:** `src/pages/SignIn.jsx`
**Deskripsi:** Halaman login pengguna untuk masuk ke aplikasi
**Komponen yang Digunakan:**
- Layout: AuthLayout
- Fragments: FormSignIn
- Elements: AppSnackbar

**State Management:**
- `snackbar`: Menampilkan notifikasi status login

**Fitur:**
- Form login dengan email dan password
- Error handling dengan snackbar notification
- Integration dengan AuthContext untuk menyimpan token

---

### 2. SignUp Page
**Path:** `src/pages/SignUp.jsx`
**Deskripsi:** Halaman registrasi pengguna baru
**Komponen yang Digunakan:**
- Layout: AuthLayout
- Fragments: FormSignUp
- Elements: AppSnackbar

**State Management:**
- `snackbar`: Menampilkan notifikasi status registrasi

**Fitur:**
- Form registrasi dengan nama, email, dan password
- Validasi input menggunakan Formik & Yup
- Redirect ke login setelah registrasi berhasil
- Error handling dengan snackbar notification

---

### 3. Dashboard Page (Overview)
**Path:** `src/pages/dashboard.jsx`
**Deskripsi:** Halaman dashboard utama yang menampilkan overview finansial pengguna
**Komponen yang Digunakan:**
- Layout: MainLayout
- Fragments: 
  - CardBalance
  - CardGoal
  - CardUpcomingBill
  - CardRecentTransaction
  - CardStatistic
  - CardExpenseBeakdown
- Elements: AppSnackbar, Card

**State Management:**
- `goals`: Data goals pengguna dari API
- `bills`: Data upcoming bills
- `snackbar`: Notifikasi untuk error

**Fitur:**
- Grid layout untuk menampilkan multiple cards
- Fetch data dari API (goalService, billsService)
- Fallback ke mock data jika API gagal
- Loading state dengan Backdrop & CircularProgress
- Dark mode support
- Logout functionality

**Layout Grid:**
```
Col 4: CardBalance | Col 4: CardGoal | Col 4: CardUpcomingBill
Col 4 (span 2): CardRecentTransaction | Col 8 (span 2): CardStatistic
Col 8 (span 2): CardExpenseBeakdown
```

---

### 4. Balance Page
**Path:** `src/pages/balance.jsx`
**Deskripsi:** Halaman untuk melihat detail balance
**Komponen yang Digunakan:**
- Layout: MainLayout

**Status:** Masih dalam tahap development (placeholder)

---

### 5. Expense Page
**Path:** `src/pages/expense.jsx`
**Deskripsi:** Halaman untuk melihat dan membandingkan pengeluaran per kategori
**Komponen yang Digunakan:**
- Layout: MainLayout
- Fragments: ExpenseCard
- Elements: AppSnackbar

**State Management:**
- `expenses`: Data pengeluaran dari API atau mock data
- `loading`: Loading state
- `error`: Error state

**Fitur:**
- Grid layout untuk menampilkan expense cards
- Filter dan kategorisasi pengeluaran
- Trend indicator (up/down)
- Loading state dengan CircularProgress
- Error handling dengan fallback ke mock data
- API integration dengan fallback mechanism

---

### 6. Error Page
**Path:** `src/pages/error.jsx`
**Deskripsi:** Halaman error (404, 500, etc)
**Komponen yang Digunakan:**
- Elements: Logo

**Fitur:**
- Menampilkan error status code dan message
- Responsive centered layout
- Dark mode support

---

## LAYOUTS (Tata Letak)
Layouts adalah komponen yang membungkus content dan menyediakan struktur umum untuk semua halaman.

### 1. AuthLayout
**Path:** `src/components/Layouts/AuthLayout.jsx`
**Deskripsi:** Layout untuk halaman autentikasi (SignIn, SignUp)
**Struktur:**
```
Container (flex, centered)
├── Left Side: Logo & Branding
└── Right Side: Form Content
```
**Props:**
- `children`: Content yang akan ditampilkan di sebelah kanan

**Fitur:**
- Responsive design (mobile: single column, desktop: two columns)
- Logo branding di sisi kiri
- Gradient background
- Dark mode support
- Centered form container

---

### 2. MainLayout
**Path:** `src/components/Layouts/MainLayout.jsx`
**Deskripsi:** Layout utama untuk halaman dashboard dan halaman authenticated lainnya
**Struktur:**
```
Container (flex)
├── Sidebar (Navigation)
│   ├── Logo
│   ├── Menu Items (Overview, Balances, Transaction, Bills, Expenses, Goals, Settings)
│   ├── Theme Selector
│   ├── Dark Mode Toggle
│   ├── Logout Button
│   └── User Profile
│
└── Main Content Area
    ├── Navbar Top
    │   ├── User Name & Date
    │   ├── Notification Icon
    │   └── Search Input
    └── Content Area
```

**Props:**
- `children`: Content utama yang akan ditampilkan

**State Management:**
- `theme`: Tema warna saat ini (dari ThemeContext)
- `isDarkMode`: Status dark mode (dari DarkModeContext)

**Fitur:**
- Sidebar navigation dengan active state indicator
- Theme color selector (5 warna)
- Dark mode toggle button
- Top navbar dengan notifications
- Responsive sidebar (collapsed pada mobile)
- Logout functionality
- User profile section
- Dark mode support

**Menu Items:**
1. Overview - `/dashboard`
2. Balances - `/balance`
3. Transaction - `/transaction`
4. Bills - `/bills`
5. Expenses - `/expense`
6. Goals - `/goals`
7. Settings - `/settings`

---

## FRAGMENTS (Potongan)
Fragments adalah komponen yang terdiri dari kombinasi beberapa Elements dan mewakili bagian spesifik dari halaman.

### 1. FormSignIn
**Path:** `src/components/Fragments/FormSignIn.jsx`
**Deskripsi:** Form untuk login pengguna
**Props:**
- `onSubmit(email, password)`: Callback ketika form di-submit

**Form Fields:**
1. Email (LabeledInput)
2. Password (LabeledInput dengan type password)
3. Remember Me (CheckBox)
4. Forgot Password (Link)
5. Login Button (Button)
6. Create Account Link

**State Management:**
- Formik untuk form state management
- Yup untuk validation schema

**Validasi:**
- Email: Required, valid email format
- Password: Required, minimal 8 karakter

**Fitur:**
- Dark mode toggle button di bawah form
- Error message display
- Loading state pada submit button
- "Forgot Password" link
- "Create an account" link ke halaman signup

---

### 2. FormSignUp
**Path:** `src/components/Fragments/FormSignUp.jsx`
**Deskripsi:** Form untuk registrasi pengguna baru
**Props:**
- `onSubmit(name, email, password)`: Callback ketika form di-submit

**Form Fields:**
1. Name (LabeledInput)
2. Email (LabeledInput)
3. Password (LabeledInput dengan type password)
4. Confirm Password (LabeledInput dengan type password)
5. Agreement Checkbox
6. Register Button

**State Management:**
- Formik untuk form state management
- Yup untuk validation schema

**Validasi:**
- Name: Required, minimal 3 karakter
- Email: Required, valid email format
- Password: Required, minimal 8 karakter
- Confirm Password: Required, harus sama dengan password

**Fitur:**
- Dark mode toggle button di bawah form
- Error message display
- Loading state pada submit button
- "Sign in here" link ke halaman login
- Terms & Conditions agreement checkbox

---

### 3. CardBalance
**Path:** `src/components/Fragments/CardBalance.jsx`
**Deskripsi:** Card yang menampilkan total balance pengguna
**Props:**
- `data`: Object berisi balance information

**Struktur:**
```
Card
├── Header (Account Type)
│   └── Credit Card
├── Amount
│   └── $25000
└── Card Details
    ├── Card Number: 3388 4556 8860 8000
    └── Action Buttons
```

**Fitur:**
- Display total balance dengan currency format
- Show account type
- Card number display
- Action buttons (View More, Transfer, etc)
- Responsive design
- Dark mode support

---

### 4. CardGoal
**Path:** `src/components/Fragments/CardGoal.jsx`
**Deskripsi:** Card yang menampilkan financial goals pengguna
**Props:**
- `data`: Array of goals dengan target amount dan progress

**Struktur:**
```
Card
├── Title: Goals
├── Goals List
│   ├── Goal Item
│   │   ├── Goal Name
│   │   ├── Current Amount
│   │   └── Progress Bar
│   └── Add Goal Button
└── View Details Link
```

**Fitur:**
- Display multiple goals dengan progress bar
- Current vs target amount comparison
- Add new goal button
- Progress percentage display
- Responsive design
- Dark mode support

---

### 5. CardUpcomingBill
**Path:** `src/components/Fragments/CardUpcomingBill.jsx`
**Deskripsi:** Card yang menampilkan upcoming bills yang harus dibayar
**Props:**
- `data`: Array of upcoming bills

**Struktur:**
```
Card
├── Title: Upcoming Bill
├── Bills List
│   ├── Bill Item
│   │   ├── Bill Name
│   │   ├── Due Date
│   │   └── Amount
│   └── See Details Button
└── Bills Info
```

**Fitur:**
- Display upcoming bills dengan due date
- Amount dan payment status
- See details button
- Responsive design
- Dark mode support

---

### 6. CardRecentTransaction
**Path:** `src/components/Fragments/CardRecentTransaction.jsx`
**Deskripsi:** Card yang menampilkan recent transactions
**Props:**
- `data`: Array of transactions

**Struktur:**
```
Card
├── Title: Recent Transactions
├── Tabs: All | Revenue | Expense
├── Transaction List
│   ├── Transaction Item
│   │   ├── Icon
│   │   ├── Transaction Name
│   │   ├── Category
│   │   └── Amount
│   └── Back Button
└── View All Link
```

**Fitur:**
- Tab filtering (All, Revenue, Expense)
- Transaction list dengan icon
- Amount display dengan +/- indicator
- Category information
- Pagination dengan back button
- Responsive design
- Dark mode support

---

### 7. CardStatistic
**Path:** `src/components/Fragments/CardStatistic.jsx`
**Deskripsi:** Card yang menampilkan statistik expenses dalam bentuk chart
**Props:**
- `data`: Array of expense statistics

**Struktur:**
```
Card
├── Title: Expenses Statistic
├── Chart (Bar Chart dengan Recharts)
└── Legend
```

**Fitur:**
- Bar chart visualization menggunakan Recharts
- Monthly expense data display
- Responsive chart sizing
- Dark mode support

---

### 8. CardExpenseBeakdown
**Path:** `src/components/Fragments/CardExpenseBeakdown.jsx`
**Deskripsi:** Card yang menampilkan breakdown pengeluaran per kategori
**Props:**
- `data`: Array of expense breakdowns per category

**Struktur:**
```
Card
├── Title: Expenses Breakdown
├── Category List
│   ├── Category Item
│   │   ├── Category Name
│   │   ├── Amount
│   │   ├── Percentage Bar
│   │   └── Percentage Number
│   └── More Items Link
└── Total Expenses
```

**Fitur:**
- Category-wise expense breakdown
- Percentage bar visualization
- Amount display
- More items link for pagination
- Responsive design
- Dark mode support

---

### 9. ExpenseCard
**Path:** `src/components/Fragments/ExpenseCard.jsx`
**Deskripsi:** Card individual untuk detail kategori expense
**Props:**
- `category`: Nama kategori expense
- `amount`: Total amount untuk kategori
- `percentage`: Percentage dari total expense
- `trend`: Trend indicator (up/down)
- `items`: Array of expense items dalam kategori

**Struktur:**
```
Card
├── Header
│   ├── Category Icon
│   ├── Category Name
│   ├── Amount
│   └── Trend Indicator
├── Expense Items List
│   ├── Item Name
│   ├── Date
│   └── Item Amount
└── Actions
```

**Fitur:**
- Category icon display
- Trend indicator (up/down dengan color)
- Expense items detail
- Amount formatting
- Responsive design
- Dark mode support

---

## ELEMENTS (Elemen)
Elements adalah komponen paling kecil dan reusable yang tidak bergantung pada komponen lain.

### 1. Button
**Path:** `src/components/Elements/Button.jsx`
**Deskripsi:** Komponen button dasar yang reusable
**Props:**
- `children`: Button label
- `onClick`: Click handler
- `className`: Additional CSS classes
- `type`: Button type (button, submit, reset)
- `disabled`: Disabled state

**Fitur:**
- Primary style (menggunakan theme color)
- Hover effect
- Disabled state
- Click handler
- Dark mode support

---

### 2. Input
**Path:** `src/components/Elements/Input.jsx`
**Deskripsi:** Komponen input field dasar
**Props:**
- `type`: Input type (text, email, password, etc)
- `placeholder`: Placeholder text
- `value`: Input value
- `onChange`: Change handler
- `backgroundColor`: Custom background color
- `border`: Custom border class

**Fitur:**
- Basic input field
- Multiple input types support
- Custom styling
- Dark mode support

---

### 3. LabeledInput
**Path:** `src/components/Elements/LabeledInput.jsx`
**Deskripsi:** Input field dengan label
**Props:**
- `label`: Label text
- `type`: Input type (text, email, password, etc)
- `placeholder`: Placeholder text
- `value`: Input value
- `onChange`: Change handler
- `error`: Error message
- `name`: Input name for form

**Fitur:**
- Labeled input field
- Error message display
- Multiple input types support
- Form integration
- Dark mode support

---

### 4. CheckBox
**Path:** `src/components/Elements/CheckBox.jsx`
**Deskripsi:** Komponen checkbox dengan label
**Props:**
- `label`: Label text
- `checked`: Checked state
- `onChange`: Change handler
- `name`: Checkbox name

**Fitur:**
- Basic checkbox
- Label association
- Checked/unchecked state
- Form integration
- Dark mode support

---

### 5. Logo
**Path:** `src/components/Elements/Logo.jsx`
**Deskripsi:** Logo komponen untuk branding
**Props:**
- `variant`: Logo variant (primary, secondary)

**Fitur:**
- Finebank.IO logo
- Multiple variants
- Responsive sizing
- Dark mode support

---

### 6. Card
**Path:** `src/components/Elements/Card.jsx`
**Deskripsi:** Wrapper card dasar untuk content
**Props:**
- `children`: Card content
- `className`: Additional CSS classes

**Fitur:**
- Card container styling
- Shadow effect
- Padding
- Responsive design
- Dark mode support

---

### 7. AppSnackbar
**Path:** `src/components/Elements/AppSnackbar.jsx`
**Deskripsi:** Notifikasi component menggunakan Material-UI Snackbar
**Props:**
- `open`: Boolean untuk show/hide
- `message`: Notifikasi message
- `severity`: Severity level (success, error, warning, info)
- `onClose`: Close handler

**Fitur:**
- Multiple severity levels
- Auto-close functionality
- Position: bottom-right
- Material-UI Snackbar integration
- Dark mode support

---

### 8. Icon
**Path:** `src/components/Elements/Icon.jsx`
**Deskripsi:** Icon components collection
**Icons yang Tersedia:**
- Logout
- Detail
- Notification
- Search
- Balance
- Transaction
- Bills
- Expenses
- Goals
- Settings
- Dropdown
- Dan lainnya

**Props:**
- `size`: Icon size
- `color`: Icon color

**Fitur:**
- Consistent icon styling
- Multiple icon options
- Size customization
- Color customization
- Dark mode support

---

### 9. BarsDataset
**Path:** `src/components/Elements/BarsDataset.jsx`
**Deskripsi:** Bar chart component untuk visualization data
**Props:**
- `data`: Array of data points
- `title`: Chart title
- `xAxisKey`: Key untuk X-axis
- `yAxisKey`: Key untuk Y-axis

**Fitur:**
- Recharts integration
- Bar chart visualization
- Data formatting
- Responsive design
- Dark mode support

---

### 10. DotsMobileStepper
**Path:** `src/components/Elements/DotsMobileStepper.jsx`
**Deskripsi:** Mobile stepper component dengan dots indicator
**Props:**
- `steps`: Array of steps
- `activeStep`: Current step index
- `onNext`: Next button handler
- `onBack`: Back button handler

**Fitur:**
- Dots indicator untuk steps
- Next/Back buttons
- Mobile optimized
- Responsive design
- Dark mode support

---

### 11. CompositionExample
**Path:** `src/components/Elements/CompositionExample.jsx`
**Deskripsi:** Example component untuk composition pattern
**Status:** Reference/Example component

---

## CONTEXT & STATE MANAGEMENT

### 1. AuthContext
**Path:** `src/context/authContext.jsx`
**Fungsi:**
- Manage user authentication state
- Store refresh token
- Provide login/logout methods
- Check authentication status

**Methods:**
- `login(token)`: Set login state dengan token
- `logout()`: Clear authentication state
- `isAuthenticated()`: Check if user is logged in

---

### 2. DarkModeContext
**Path:** `src/context/darkModeContext.jsx`
**Fungsi:**
- Manage dark/light mode state globally
- Persist theme preference ke localStorage
- Provide toggle dark mode function

**Methods:**
- `toggleDarkMode()`: Toggle between dark and light mode
- `isDarkMode`: Current mode state

---

### 3. ThemeContext
**Path:** `src/context/themeContext.jsx`
**Fungsi:**
- Manage theme color selection
- Provide theme color to all components
- Persist theme preference

**Available Themes:**
1. Blue (Primary)
2. Green (Secondary)
3. Orange (Tertiary)
4. Pink (Accent 1)
5. Yellow (Accent 2)

---

## ROUTING STRUCTURE

```
/ (redirect to /dashboard jika authenticated, else /login)
├── /login (SignIn page)
├── /register (SignUp page)
├── /dashboard (Dashboard page - Overview)
├── /balance (Balance page)
├── /transaction (Transaction page)
├── /bills (Bills page)
├── /expense (Expense page)
├── /goals (Goals page)
├── /settings (Settings page)
└── /* (Error page)
```

---

## DATA FLOW

### Authentication Flow:
```
User Input (Login Form)
↓
SignIn Page Component
↓
FormSignIn Component
↓
authService.loginService()
↓
AuthContext.login()
↓
Redirect to Dashboard
```

### Data Fetching Flow:
```
Dashboard Page Mounted
↓
useEffect triggers
↓
Fetch Goals (goalService)
Fetch Bills (billsService)
↓
Update State
↓
Render Components dengan Data
```

---

## STYLING & THEME

### Color Scheme:
- Primary: Teal/Cyan
- Secondary: Gray
- Accent: Various (Blue, Green, Orange, Pink, Yellow)

### Tailwind CSS:
- Utility-first CSS framework
- Dark mode support dengan `dark:` prefix
- Responsive design dengan breakpoints (sm, md, lg, xl)

### Material-UI Integration:
- MUI Icons
- MUI Snackbar
- MUI CircularProgress
- MUI Backdrop

---

## COMPONENT HIERARCHY EXAMPLE: Dashboard Page

```
Dashboard Page
├── MainLayout
│   ├── Sidebar
│   │   ├── Navigation Menu
│   │   ├── Theme Selector
│   │   ├── Dark Mode Toggle
│   │   └── User Profile
│   │
│   └── Main Content
│       ├── Top Navbar
│       │   ├── User Info
│       │   ├── Notification
│       │   └── Search
│       │
│       └── Grid Layout (6 Cards)
│           ├── CardBalance (Col 4)
│           ├── CardGoal (Col 4)
│           ├── CardUpcomingBill (Col 4)
│           ├── CardRecentTransaction (Col 4, Row 2)
│           ├── CardStatistic (Col 8, Row 2)
│           └── CardExpenseBeakdown (Col 8, Row 3)
```

---

## ATOMIC DESIGN SUMMARY

| Level | Components | Purpose |
|-------|-----------|---------|
| **ATOMS (Elements)** | Button, Input, CheckBox, Logo, Card, Icon, etc | Smallest, reusable UI blocks |
| **MOLECULES (Fragments)** | FormSignIn, FormSignUp, CardBalance, CardGoal, etc | Combination of atoms for specific purpose |
| **ORGANISMS (Layouts)** | AuthLayout, MainLayout | Large components containing molecules |
| **TEMPLATES (Pages)** | SignIn, SignUp, Dashboard, Balance, Expense, Error | Page layouts with complete structure |
| **PAGES** | Full pages with real data & context | Complete user-facing pages |

---

**Dokumentasi dibuat pada:** 7 Juli 2026
**Version:** 1.0
**Status:** Active Development
