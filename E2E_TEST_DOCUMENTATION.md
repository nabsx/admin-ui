# End-to-End (E2E) Testing Dokumentasi
## Finebank Admin Dashboard

**File Test:** `cypress/e2e/dashboard-overview.cy.js`

---

## Pengenalan

Dokumentasi ini menjelaskan End-to-End Testing untuk fitur Dashboard Overview pada aplikasi Finebank. Test menggunakan framework Cypress untuk mengotomatisasi testing dari perspektif user.

---

## Skenario Utama: User Mengakses Halaman Dashboard (Overview)

### User Story:
```
Sebagai seorang pengguna Finebank,
Saya ingin dapat login ke aplikasi,
Agar saya dapat melihat overview dashboard finansial saya.
```

### Test Flow:
```
Login Page → Form Validation → Successful Login → Dashboard Overview → 
Dashboard Interactions → Logout
```

---

## Test Suites Breakdown

### 1. Login dan Access Dashboard
**File:** `Scenario 1: User Login dan Access Dashboard`

#### Test Cases:

##### 1.1. Display Login Page Elements
**Tujuan:** Verifikasi halaman login menampilkan semua elemen yang diperlukan

**Steps:**
```gherkin
Given: User berada di halaman login
When:  User mengakses halaman login
Then:  - Halaman menampilkan judul "Sign In"
       - Email input field visible
       - Password input field visible
       - Sign In button visible
       - Create account link visible
       - Dark mode toggle button visible
```

**Cypress Code:**
```javascript
cy.get('h1').should('contain', 'Sign In');
cy.get('input[type="email"]').should('be.visible');
cy.get('input[type="password"]').should('be.visible');
cy.get('button').contains('Sign In').should('be.visible');
cy.get('a').contains('Create an account').should('be.visible');
cy.get('button[aria-label="Toggle dark mode"]').should('be.visible');
```

---

##### 1.2. Email Validation
**Tujuan:** Verifikasi bahwa email field wajib diisi

**Steps:**
```gherkin
Given: User berada di halaman login
When:  User mengklik Sign In button tanpa mengisi email
Then:  - Browser validation error ditampilkan pada email field
       - User tetap di halaman login
```

**Cypress Code:**
```javascript
cy.get('button').contains('Sign In').click();
cy.get('input[type="email"]').then(($input) => {
  expect($input[0].validationMessage).to.not.be.empty;
});
```

---

##### 1.3. Password Validation
**Tujuan:** Verifikasi bahwa password field wajib diisi

**Steps:**
```gherkin
Given: User berada di halaman login dengan email terisi
When:  User mengklik Sign In button tanpa mengisi password
Then:  - Browser validation error ditampilkan pada password field
```

---

##### 1.4. Successful Login
**Tujuan:** Verifikasi user dapat login dengan kredensial yang valid

**Steps:**
```gherkin
Given: User berada di halaman login
When:  User mengisi email dan password dengan benar
And   User mengklik Sign In button
Then:  - Application melakukan request ke API login
       - Token disimpan di localStorage/sessionStorage
       - User diredirect ke halaman dashboard
       - Dashboard content ditampilkan
```

**Expected Result:**
- URL berubah ke `/dashboard`
- Dashboard main area visible
- User session aktif

---

##### 1.5. Invalid Credentials Error
**Tujuan:** Verifikasi error handling untuk kredensial yang salah

**Steps:**
```gherkin
Given: User berada di halaman login
When:  User mengisi email/password yang salah
And   User mengklik Sign In button
Then:  - Error snackbar ditampilkan
       - User tetap di halaman login
       - Error message menjelaskan masalah
```

---

### 2. Dashboard Overview Layout
**File:** `Scenario 2: Dashboard Overview Layout`

#### Test Cases:

##### 2.1. Complete Layout Structure
**Tujuan:** Verifikasi dashboard memiliki struktur layout yang lengkap

**Steps:**
```gherkin
Given: User sudah login dan berada di dashboard
Then:  - Sidebar navigation visible di kiri
       - Top navbar visible di atas
       - Main content area visible di tengah
```

---

##### 2.2. Sidebar Navigation Menu
**Tujuan:** Verifikasi semua menu items tersedia di sidebar

**Expected Menu Items:**
- Overview (active/selected)
- Balances
- Transaction
- Bills
- Expenses
- Goals
- Settings

**Cypress Code:**
```javascript
const menuItems = ['Overview', 'Balances', 'Transaction', 'Bills', 'Expenses', 'Goals', 'Settings'];
menuItems.forEach(item => {
  cy.get('aside').contains(item).should('be.visible');
});
```

---

##### 2.3. Active Menu Indicator
**Tujuan:** Verifikasi menu item yang active memiliki styling yang berbeda

**Expected:**
- Overview menu memiliki background color (indicates active state)
- Text berwarna putih/terang

---

##### 2.4. Theme Selector
**Tujuan:** Verifikasi theme color selector tersedia

**Expected:**
- Label "Themes" visible
- Minimum 5 color dots visible
- Color dots clickable

**Available Colors:**
1. Blue (Primary)
2. Green (Secondary)
3. Orange (Tertiary)
4. Pink (Accent)
5. Yellow (Accent)

---

##### 2.5. Dark Mode Toggle
**Tujuan:** Verifikasi dark mode button tersedia

**Expected:**
- Dark mode toggle button visible di sidebar
- Button memiliki aria-label untuk accessibility
- Icon berubah berdasarkan mode saat ini

---

##### 2.6. Logout Button
**Tujuan:** Verifikasi logout button tersedia

**Expected:**
- Logout button visible di bawah sidebar
- Button memiliki theme color background
- Button clickable dan functional

---

##### 2.7. Navbar Elements
**Tujuan:** Verifikasi top navbar memiliki elemen yang diperlukan

**Expected:**
- User name dan date display
- Notification icon visible
- Search input field visible
- Dark mode compatible

---

### 3. Dashboard Cards Display
**File:** `Scenario 3: Dashboard Cards Display`

#### Dashboard Grid Layout:
```
┌─────────────────────────────────────────────────┐
│ CardBalance (Col 4) │ CardGoal (Col 4) │ CardUpcomingBill (Col 4) │
├─────────────────────────────────────────────────┤
│ CardRecentTransaction (Col 4, Row 2) │ CardStatistic (Col 8, Row 2) │
├─────────────────────────────────────────────────┤
│ CardExpenseBeakdown (Col 8, Row 3)              │
└─────────────────────────────────────────────────┘
```

#### Test Cases:

##### 3.1. Card Count Verification
**Tujuan:** Verifikasi semua 6 cards ditampilkan

**Expected:** 6 cards visible di dashboard

---

##### 3.2. CardBalance Content
**Tujuan:** Verifikasi card balance menampilkan informasi akun

**Expected Content:**
- Account type label (e.g., "Credit Card")
- Total balance amount (e.g., "$25000")
- Card number format (e.g., "3388 4556 8860 8000")
- Action buttons

**Cypress Code:**
```javascript
cy.get('[role="main"]').contains('Account Type').should('be.visible');
cy.get('[role="main"]').contains('$').should('be.visible');
cy.get('[role="main"]').contains(/\d{4}\s\d{4}\s\d{4}\s\d{4}/).should('be.visible');
```

---

##### 3.3. CardGoal Content
**Tujuan:** Verifikasi card goals menampilkan target finansial

**Expected Content:**
- "Goals" title
- Goals items dengan progress bar
- Progress percentage

---

##### 3.4. CardUpcomingBill Content
**Tujuan:** Verifikasi card upcoming bills

**Expected Content:**
- "Upcoming Bill" title
- Bill items list
- "See Details" button

---

##### 3.5. CardRecentTransaction Content
**Tujuan:** Verifikasi card recent transactions

**Expected Content:**
- "Recent Transactions" title
- Filter tabs: All, Revenue, Expense
- Transaction list items dengan:
  - Transaction icon
  - Transaction name
  - Category
  - Amount

---

##### 3.6. CardStatistic Content
**Tujuan:** Verifikasi card statistic dengan chart

**Expected Content:**
- "Expenses Statistic" title
- Bar chart (SVG element)
- Chart data visualization

---

##### 3.7. CardExpenseBreakdown Content
**Tujuan:** Verifikasi card expense breakdown

**Expected Content:**
- "Expenses Breakdown" title
- Category list:
  - Category name
  - Amount
  - Percentage bar
  - Percentage number

---

### 4. Dashboard Interactions
**File:** `Scenario 4: Dashboard Interactions`

#### Test Cases:

##### 4.1. Navigation to Balances Page
**Steps:**
1. User klik "Balances" menu
2. URL berubah ke `/balance`
3. Balances menu menjadi active

---

##### 4.2. Navigation to Transaction Page
**Steps:**
1. User klik "Transaction" menu
2. URL berubah ke `/transaction`

---

##### 4.3. Navigation to Expenses Page
**Steps:**
1. User klik "Expenses" menu
2. URL berubah ke `/expense`

---

##### 4.4. Theme Color Selection
**Steps:**
1. User klik color dot di theme selector
2. Aplikasi theme berubah
3. Semua components menggunakan theme baru

**Expected:**
- Buttons menggunakan warna baru
- Links menggunakan warna baru
- Active states menggunakan warna baru

---

##### 4.5. Dark Mode Toggle
**Steps:**
1. User klik dark mode button
2. Halaman berubah ke dark mode
3. User klik button lagi
4. Halaman berubah ke light mode

**Expected:**
- `<html>` tag memiliki/menghilangkan class "dark"
- Semua components responsive terhadap dark mode
- Colors menyesuaikan dengan dark mode

---

##### 4.6. Logout Functionality
**Steps:**
1. User klik logout button
2. Application melakukan cleanup
3. User diredirect ke login page
4. Session berakhir

**Expected:**
- URL berubah ke `/login`
- Token dihapus dari storage
- Tidak bisa mengakses dashboard tanpa login

---

##### 4.7. Transaction Tab Filtering
**Steps:**
1. User berada di CardRecentTransaction
2. User klik "Revenue" tab
3. Transaction list di-filter (hanya revenue)
4. User klik "Expense" tab
5. Transaction list di-filter (hanya expense)

---

### 5. Dashboard Responsive Design
**File:** `Scenario 5: Dashboard Responsive Design`

#### Test Cases:

##### 5.1. Mobile Viewport (iPhone X)
**Viewport:** 375 x 812

**Expected:**
- Sidebar visible atau ada toggle untuk membuka
- Content adjusts ke width yang lebih kecil
- Cards menampilkan dalam single column atau stacked layout
- Touch-friendly button sizes

---

##### 5.2. Tablet Viewport (iPad 2)
**Viewport:** 768 x 1024

**Expected:**
- Sidebar dan content keduanya visible
- Grid layout adjusts (2-3 columns)
- Cards readable dan accessible

---

##### 5.3. Desktop Viewport (MacBook 15)
**Viewport:** 1440 x 900

**Expected:**
- Full layout dengan sidebar dan semua cards
- Multi-column grid layout (4-8 columns)
- All cards properly spaced dan aligned

---

### 6. Dashboard Error Handling
**File:** `Scenario 6: Dashboard Error Handling`

#### Test Cases:

##### 6.1. Failed API Response
**Scenario:** API returns 500 error saat fetch goals

**Steps:**
1. Intercept API call untuk goals endpoint
2. Return 500 error
3. Reload halaman

**Expected:**
- Dashboard tetap visible
- Error snackbar ditampilkan
- Fallback ke mock data (jika tersedia)

---

##### 6.2. Loading State
**Scenario:** API takes long time to respond

**Steps:**
1. Intercept API dengan delay
2. Observe loading state

**Expected:**
- Loading spinner/progress indicator ditampilkan
- User aware bahwa data sedang loading
- Timeout handling jika API tidak respond

---

##### 6.3. Session Timeout
**Scenario:** API returns 401 Unauthorized

**Steps:**
1. Intercept semua API calls
2. Return 401 response
3. Reload halaman

**Expected:**
- User diredirect ke login page
- Error message ditampilkan
- Session cleanup

---

### 7. Dashboard Accessibility
**File:** `Scenario 7: Dashboard Accessibility`

#### Test Cases:

##### 7.1. Heading Hierarchy
**Expected:**
- H1 digunakan untuk page title
- H2 digunakan untuk section titles
- Proper hierarchy tanpa skip levels

---

##### 7.2. Button and Link Labels
**Expected:**
- Semua buttons memiliki visible text atau aria-label
- Semua links memiliki descriptive text (bukan "click here")

---

##### 7.3. Color Contrast
**Expected:**
- Teks readable di light dan dark mode
- Sufficient contrast ratio (WCAG AA compliant)

---

##### 7.4. Keyboard Navigation
**Steps:**
1. Tab ke menu items
2. Menu items receivable focus
3. Enter key triggers navigation

**Expected:**
- User dapat navigate tanpa mouse
- Focus indicator visible
- Tab order logical

---

### 8. Dashboard Data Persistence
**File:** `Scenario 8: Dashboard Data Persistence`

#### Test Cases:

##### 8.1. Theme Selection Persistence
**Steps:**
1. User select theme color
2. User reload page
3. Verify theme tetap sama

**Expected:**
- Theme saved ke localStorage
- Theme restored setelah reload
- Consistent user experience

---

##### 8.2. Dark Mode Preference Persistence
**Steps:**
1. User toggle dark mode
2. User reload page
3. Verify dark mode tetap sama

**Expected:**
- Dark mode state saved
- Restored setelah reload
- Preference remembered across sessions

---

## Running Cypress Tests

### Prerequisites:
```bash
npm install cypress --save-dev
```

### Run All E2E Tests:
```bash
npm run test:e2e
# atau
npx cypress run
```

### Run Specific Test File:
```bash
npx cypress run --spec "cypress/e2e/dashboard-overview.cy.js"
```

### Open Cypress UI:
```bash
npx cypress open
```

### Run in Headless Mode:
```bash
npx cypress run --headless
```

### Run on Specific Browser:
```bash
npx cypress run --browser chrome
npx cypress run --browser firefox
npx cypress run --browser edge
```

---

## Configuration

### Environment Variables:
```javascript
// cypress.env.json
{
  "API_URL": "http://localhost:3001/api",
  "BASE_URL": "http://localhost:5173"
}
```

### cypress.config.js:
```javascript
export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    setupNodeEvents(on, config) {
      // Implement node event listeners
    },
  },
});
```

---

## Test Execution Report

### Total Test Cases: 40+

### Coverage:
- Login & Authentication: 5 tests
- Layout & Structure: 7 tests
- Cards & Content: 7 tests
- User Interactions: 7 tests
- Responsive Design: 3 tests
- Error Handling: 3 tests
- Accessibility: 5 tests
- Data Persistence: 2 tests

### Estimated Execution Time: 5-10 minutes

---

## Debugging Tips

### View Console Logs:
```javascript
cy.log('Current URL:', cy.url());
```

### Debug State:
```javascript
cy.debug();
cy.pause();
```

### Inspect Elements:
```javascript
cy.get('selector').then(($el) => {
  console.log($el);
});
```

### Wait for Network:
```javascript
cy.intercept('GET', '**/api/goals').as('getGoals');
cy.wait('@getGoals');
```

---

## Continuous Integration

### GitHub Actions Example:
```yaml
name: Cypress E2E Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npx cypress run
```

---

## Maintenance

### Update Test Data:
- Modify `testUser` object untuk kredensial baru
- Update expected text jika UI berubah

### Add New Tests:
- Follow existing test structure
- Use consistent naming conventions
- Add descriptive comments

### Refactor Common Actions:
```javascript
// Custom Commands (cypress/support/commands.js)
Cypress.Commands.add('login', (email, password) => {
  cy.get('input[type="email"]').type(email);
  cy.get('input[type="password"]').type(password);
  cy.get('button').contains('Sign In').click();
});
```

---

**Dokumentasi dibuat pada:** 7 Juli 2026
**Versi:** 1.0
**Status:** Production Ready
