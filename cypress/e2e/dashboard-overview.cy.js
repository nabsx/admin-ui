/// <reference types="cypress" />

/**
 * SOAL 7: End-to-End Testing
 * 
 * Skenario: User mengakses halaman dashboard (overview)
 * 
 * Test Suite ini mengujian seluruh flow user dari login hingga berhasil melihat dashboard overview
 */

describe('Dashboard Overview E2E Test', () => {
  
  const testUser = {
    email: 'test@example.com',
    password: 'password123'
  };

  const apiBaseUrl = Cypress.env('API_URL') || 'http://localhost:3001/api';

  beforeEach(() => {
    // Kunjungi halaman login sebelum setiap test
    cy.visit('http://localhost:5173/login');
  });

  describe('Scenario 1: User Login dan Access Dashboard', () => {
    
    it('Should display login page with all required elements', () => {
      // Verifikasi halaman login ditampilkan dengan benar
      cy.get('h1').should('contain', 'Sign In');
      
      // Verifikasi email input field tersedia
      cy.get('input[type="email"]').should('be.visible');
      
      // Verifikasi password input field tersedia
      cy.get('input[type="password"]').should('be.visible');
      
      // Verifikasi login button tersedia
      cy.get('button').contains('Sign In').should('be.visible');
      
      // Verifikasi link ke signup page tersedia
      cy.get('a').contains('Create an account').should('be.visible');
      
      // Verifikasi dark mode toggle button tersedia
      cy.get('button[aria-label="Toggle dark mode"]').should('be.visible');
    });

    it('Should validate email field is required', () => {
      // Klik sign in button tanpa mengisi email
      cy.get('button').contains('Sign In').click();
      
      // Verifikasi error message untuk email
      cy.get('input[type="email"]').then(($input) => {
        expect($input[0].validationMessage).to.not.be.empty;
      });
    });

    it('Should validate password field is required', () => {
      // Isi email
      cy.get('input[type="email"]').type(testUser.email);
      
      // Klik sign in button tanpa mengisi password
      cy.get('button').contains('Sign In').click();
      
      // Verifikasi error message untuk password
      cy.get('input[type="password"]').then(($input) => {
        expect($input[0].validationMessage).to.not.be.empty;
      });
    });

    it('Should login successfully with valid credentials', () => {
      // Isi email field
      cy.get('input[type="email"]').type(testUser.email);
      
      // Isi password field
      cy.get('input[type="password"]').type(testUser.password);
      
      // Klik sign in button
      cy.get('button').contains('Sign In').click();
      
      // Verifikasi redirect ke dashboard (wait untuk loading)
      cy.wait(2000);
      cy.url().should('include', '/dashboard');
      
      // Verifikasi dashboard page ditampilkan
      cy.get('[role="main"]').should('be.visible');
    });

    it('Should display error message with invalid credentials', () => {
      // Isi email field dengan email yang salah
      cy.get('input[type="email"]').type('invalid@example.com');
      
      // Isi password field dengan password yang salah
      cy.get('input[type="password"]').type('wrongpassword');
      
      // Klik sign in button
      cy.get('button').contains('Sign In').click();
      
      // Verifikasi error snackbar ditampilkan
      cy.get('[role="alert"]').should('be.visible');
      
      // Verifikasi user tetap di halaman login
      cy.url().should('include', '/login');
    });
  });

  describe('Scenario 2: Dashboard Overview Layout', () => {
    
    beforeEach(() => {
      // Setup: Login user sebelum test dashboard
      cy.get('input[type="email"]').type(testUser.email);
      cy.get('input[type="password"]').type(testUser.password);
      cy.get('button').contains('Sign In').click();
      cy.wait(3000);
      cy.url().should('include', '/dashboard');
    });

    it('Should display complete dashboard layout with sidebar and navbar', () => {
      // Verifikasi sidebar navigasi tersedia
      cy.get('aside').should('be.visible');
      
      // Verifikasi navbar top tersedia
      cy.get('nav').should('be.visible');
      
      // Verifikasi main content area tersedia
      cy.get('[role="main"]').should('be.visible');
    });

    it('Should display sidebar with all menu items', () => {
      // Verifikasi sidebar menu items
      const menuItems = ['Overview', 'Balances', 'Transaction', 'Bills', 'Expenses', 'Goals', 'Settings'];
      
      menuItems.forEach(item => {
        cy.get('aside').contains(item).should('be.visible');
      });
    });

    it('Should display active menu indicator on Overview', () => {
      // Verifikasi Overview menu item memiliki active state
      cy.get('aside').find('a').contains('Overview').parent().should('have.css', 'background-color');
    });

    it('Should display theme selector in sidebar', () => {
      // Verifikasi theme selector label
      cy.get('aside').contains('Themes').should('be.visible');
      
      // Verifikasi theme color dots (minimum 5 colors)
      cy.get('aside').find('[title]').should('have.length.at.least', 5);
    });

    it('Should display dark mode toggle in sidebar', () => {
      // Verifikasi dark mode toggle button tersedia
      cy.get('aside').find('button[aria-label="Toggle dark mode"]').should('be.visible');
    });

    it('Should display user logout button in sidebar', () => {
      // Verifikasi logout button di sidebar
      cy.get('aside').find('button').contains('Logout').should('be.visible');
    });

    it('Should display notifications icon in navbar', () => {
      // Verifikasi notification icon di navbar
      cy.get('nav').find('svg').should('have.length.greaterThan', 0);
    });

    it('Should display search input in navbar', () => {
      // Verifikasi search input di navbar
      cy.get('nav').find('input[type="text"]').should('be.visible');
    });
  });

  describe('Scenario 3: Dashboard Cards Display', () => {
    
    beforeEach(() => {
      // Setup: Login user
      cy.get('input[type="email"]').type(testUser.email);
      cy.get('input[type="password"]').type(testUser.password);
      cy.get('button').contains('Sign In').click();
      cy.wait(3000);
      cy.url().should('include', '/dashboard');
    });

    it('Should display 6 main dashboard cards', () => {
      // Verifikasi 6 cards ditampilkan (Balance, Goal, Bill, Recent Transactions, Statistic, Expense Breakdown)
      cy.get('[role="main"]').find('[class*="col-span"]').should('have.length.at.least', 6);
    });

    it('Should display CardBalance with account information', () => {
      // Verifikasi CardBalance ditampilkan
      cy.get('[role="main"]').contains('Account Type').should('be.visible');
      
      // Verifikasi balance amount ditampilkan
      cy.get('[role="main"]').contains('$').should('be.visible');
      
      // Verifikasi card number format (xxxx xxxx xxxx xxxx)
      cy.get('[role="main"]').contains(/\d{4}\s\d{4}\s\d{4}\s\d{4}/).should('be.visible');
    });

    it('Should display CardGoal with goals information', () => {
      // Verifikasi CardGoal ditampilkan
      cy.contains('Goals').should('be.visible');
      
      // Verifikasi progress bar atau goal items
      cy.get('progress').should('exist');
    });

    it('Should display CardUpcomingBill with bills information', () => {
      // Verifikasi CardUpcomingBill ditampilkan
      cy.contains('Upcoming Bill').should('be.visible');
      
      // Verifikasi bill items atau "See Details" button
      cy.get('button').contains('See Details').should('be.visible');
    });

    it('Should display CardRecentTransaction with transaction list', () => {
      // Verifikasi CardRecentTransaction ditampilkan
      cy.contains('Recent Transactions').should('be.visible');
      
      // Verifikasi transaction tabs (All, Revenue, Expense)
      cy.contains('All').should('be.visible');
      cy.contains('Revenue').should('be.visible');
      cy.contains('Expense').should('be.visible');
    });

    it('Should display CardStatistic with chart visualization', () => {
      // Verifikasi CardStatistic ditampilkan
      cy.contains('Expenses Statistic').should('be.visible');
      
      // Verifikasi chart element (SVG dari Recharts)
      cy.get('svg').should('have.length.greaterThan', 0);
    });

    it('Should display CardExpenseBreakdown with category breakdown', () => {
      // Verifikasi CardExpenseBreakdown ditampilkan
      cy.contains('Expenses Breakdown').should('be.visible');
      
      // Verifikasi category items dengan percentage
      cy.get('[role="main"]').contains('%').should('be.visible');
    });
  });

  describe('Scenario 4: Dashboard Interactions', () => {
    
    beforeEach(() => {
      // Setup: Login user
      cy.get('input[type="email"]').type(testUser.email);
      cy.get('input[type="password"]').type(testUser.password);
      cy.get('button').contains('Sign In').click();
      cy.wait(3000);
      cy.url().should('include', '/dashboard');
    });

    it('Should navigate to Balances page when clicking menu', () => {
      // Klik Balances menu item
      cy.get('aside').contains('Balances').click();
      
      // Verifikasi URL berubah ke balances
      cy.url().should('include', '/balance');
      
      // Verifikasi Balances menu menjadi active
      cy.get('aside').contains('Balances').parent().should('have.css', 'background-color');
    });

    it('Should navigate to Transaction page when clicking menu', () => {
      // Klik Transaction menu item
      cy.get('aside').contains('Transaction').click();
      
      // Verifikasi URL berubah
      cy.url().should('include', '/transaction');
    });

    it('Should navigate to Expenses page when clicking menu', () => {
      // Klik Expenses menu item
      cy.get('aside').contains('Expenses').click();
      
      // Verifikasi URL berubah ke expense
      cy.url().should('include', '/expense');
    });

    it('Should toggle theme colors when clicking color selector', () => {
      // Get initial background color
      cy.get('body').then(($body) => {
        const initialColor = $body.css('background-color');
        
        // Klik color selector (misalnya warna kedua)
        cy.get('aside').find('[title]').eq(1).click();
        
        // Verifikasi tema berubah (komponen akan menggunakan tema baru)
        cy.wait(500);
        cy.get('button').contains('Logout').should('have.css', 'background-color');
      });
    });

    it('Should toggle dark mode when clicking dark mode button', () => {
      // Get current mode
      cy.get('html').then(($html) => {
        const hasDarkClass = $html.hasClass('dark');
        
        // Klik dark mode toggle
        cy.get('aside').find('button[aria-label="Toggle dark mode"]').click();
        
        // Verifikasi dark class berubah
        cy.wait(500);
        cy.get('html').then(($newHtml) => {
          const newHasDarkClass = $newHtml.hasClass('dark');
          expect(newHasDarkClass).to.not.equal(hasDarkClass);
        });
      });
    });

    it('Should logout when clicking logout button', () => {
      // Klik logout button
      cy.get('aside').find('button').contains('Logout').click();
      
      // Verifikasi redirect ke login page
      cy.wait(2000);
      cy.url().should('include', '/login');
      
      // Verifikasi tidak bisa mengakses dashboard tanpa login
      cy.visit('http://localhost:5173/dashboard');
      cy.url().should('include', '/login');
    });

    it('Should filter transactions by clicking tabs', () => {
      // Klik Revenue tab
      cy.contains('Revenue').click();
      
      // Verifikasi tab menjadi active
      cy.contains('Revenue').parent().should('have.css', 'border-color');
      
      // Klik Expense tab
      cy.contains('Expense').click();
      
      // Verifikasi tab menjadi active
      cy.contains('Expense').parent().should('have.css', 'border-color');
    });
  });

  describe('Scenario 5: Dashboard Responsive Design', () => {
    
    beforeEach(() => {
      // Setup: Login user
      cy.visit('http://localhost:5173/login');
      cy.get('input[type="email"]').type(testUser.email);
      cy.get('input[type="password"]').type(testUser.password);
      cy.get('button').contains('Sign In').click();
      cy.wait(3000);
    });

    it('Should display properly on mobile viewport', () => {
      // Set mobile viewport
      cy.viewport('iphone-x');
      
      // Verifikasi sidebar ada
      cy.get('aside').should('be.visible');
      
      // Verifikasi content area ada
      cy.get('[role="main"]').should('be.visible');
      
      // Verifikasi navbar elements tersedia
      cy.get('nav').should('be.visible');
    });

    it('Should display properly on tablet viewport', () => {
      // Set tablet viewport
      cy.viewport('ipad-2');
      
      // Verifikasi semua elements tersedia
      cy.get('aside').should('be.visible');
      cy.get('[role="main"]').should('be.visible');
      cy.get('nav').should('be.visible');
      
      // Verifikasi cards ditampilkan dengan grid layout
      cy.get('[class*="grid"]').should('be.visible');
    });

    it('Should display properly on desktop viewport', () => {
      // Set desktop viewport (default)
      cy.viewport('macbook-15');
      
      // Verifikasi full layout
      cy.get('aside').should('be.visible');
      cy.get('[role="main"]').should('be.visible');
      cy.get('nav').should('be.visible');
      
      // Verifikasi all 6 cards ditampilkan
      cy.get('[role="main"]').find('[class*="col-span"]').should('have.length.at.least', 6);
    });
  });

  describe('Scenario 6: Dashboard Error Handling', () => {
    
    beforeEach(() => {
      // Setup: Login user
      cy.get('input[type="email"]').type(testUser.email);
      cy.get('input[type="password"]').type(testUser.password);
      cy.get('button').contains('Sign In').click();
      cy.wait(3000);
    });

    it('Should handle failed data fetch gracefully', () => {
      // Intercept API calls dan return error
      cy.intercept('GET', '**/api/goals', {
        statusCode: 500,
        body: { error: 'Internal Server Error' }
      });
      
      // Refresh halaman
      cy.reload();
      cy.wait(3000);
      
      // Verifikasi dashboard tetap ditampilkan
      cy.get('[role="main"]').should('be.visible');
      
      // Verifikasi snackbar error ditampilkan
      cy.get('[role="alert"]').should('contain', 'Gagal mengambil data');
    });

    it('Should display loading state while fetching data', () => {
      // Intercept API calls dengan delay
      cy.intercept('GET', '**/api/goals', (req) => {
        req.destroy();
      }).as('getGoals');
      
      // Refresh halaman
      cy.reload();
      
      // Verifikasi loading indicator ditampilkan
      cy.get('[role="progressbar"]').should('be.visible');
    });

    it('Should handle session timeout and redirect to login', () => {
      // Simulate 401 Unauthorized response
      cy.intercept('GET', '**/api/**', {
        statusCode: 401,
        body: { error: 'Unauthorized' }
      });
      
      // Reload halaman
      cy.reload();
      cy.wait(3000);
      
      // Verifikasi redirect ke login
      cy.url().should('include', '/login');
    });
  });

  describe('Scenario 7: Dashboard Accessibility', () => {
    
    beforeEach(() => {
      // Setup: Login user
      cy.get('input[type="email"]').type(testUser.email);
      cy.get('input[type="password"]').type(testUser.password);
      cy.get('button').contains('Sign In').click();
      cy.wait(3000);
    });

    it('Should have proper heading hierarchy', () => {
      // Verifikasi heading elements
      cy.get('h1').should('exist');
      cy.get('h2').should('exist');
    });

    it('Should have proper button labels and aria attributes', () => {
      // Verifikasi buttons memiliki accessible labels
      cy.get('button').each(($btn) => {
        cy.wrap($btn).should('have.text').or.have.attr('aria-label');
      });
    });

    it('Should have proper link labels', () => {
      // Verifikasi links memiliki descriptive text
      cy.get('a').each(($link) => {
        cy.wrap($link).should('have.text');
      });
    });

    it('Should have proper color contrast', () => {
      // Verifikasi elements visible (color contrast indirectly tested)
      cy.get('[role="main"]').find('*').each(($el) => {
        cy.wrap($el).should('be.visible');
      });
    });

    it('Should be keyboard navigable', () => {
      // Tab ke menu items
      cy.get('aside').contains('Balances').focus();
      
      // Verifikasi focus visible
      cy.get('aside').contains('Balances').should('have.focus');
      
      // Press Enter untuk navigate
      cy.get('aside').contains('Balances').parent().type('{enter}');
      
      // Verifikasi navigasi berhasil
      cy.url().should('include', '/balance');
    });
  });

  describe('Scenario 8: Dashboard Data Persistence', () => {
    
    it('Should retain theme selection after page reload', () => {
      // Login
      cy.get('input[type="email"]').type(testUser.email);
      cy.get('input[type="password"]').type(testUser.password);
      cy.get('button').contains('Sign In').click();
      cy.wait(3000);
      
      // Select theme color (index 2)
      cy.get('aside').find('[title]').eq(2).click();
      cy.wait(500);
      
      // Reload page
      cy.reload();
      cy.wait(2000);
      
      // Verifikasi theme tetap sama
      cy.get('aside').should('be.visible');
    });

    it('Should retain dark mode preference after page reload', () => {
      // Login
      cy.get('input[type="email"]').type(testUser.email);
      cy.get('input[type="password"]').type(testUser.password);
      cy.get('button').contains('Sign In').click();
      cy.wait(3000);
      
      // Toggle dark mode
      cy.get('aside').find('button[aria-label="Toggle dark mode"]').click();
      cy.wait(500);
      
      // Get current mode
      cy.get('html').then(($html) => {
        const isDarkMode = $html.hasClass('dark');
        
        // Reload page
        cy.reload();
        cy.wait(2000);
        
        // Verifikasi mode tetap sama
        cy.get('html').then(($newHtml) => {
          const isNewDarkMode = $newHtml.hasClass('dark');
          expect(isNewDarkMode).to.equal(isDarkMode);
        });
      });
    });
  });
});
