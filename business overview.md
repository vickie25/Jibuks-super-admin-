You are building interactive documentation for a React Native (Expo) + Express/Prisma business finance app called **Jibuks**. 

The app is structured around a `TenantWorkspaceWrapper.tsx` — a top-level layout shell that handles routing, a sticky header, and a horizontal scrollable tab bar. Each tab renders one of the module dashboards described below.

---

### SYSTEM CONTEXT

- The backend is an Express API using Prisma/PostgreSQL.
- All business data is **tenant-scoped** via `tenantId` extracted from a JWT on every request.
- The core accounting engine is **double-entry**: every financial action creates a `Journal` with `JournalLine` debit/credit entries posted to `Account` records. Reports and dashboard metrics are all derived from these journal lines.
- On first load, the app checks `businessOnboardingComplete` in local storage. If false → onboarding flow. If true → dashboard.

---

### COMPONENTS TO DOCUMENT

For each component below, describe:
1. **What it renders** (UI sections and sub-sections)
2. **What data it fetches** (API endpoints it calls and what they return)
3. **What actions a user can perform** (CRUD, payments, etc.)
4. **What accounting/backend side-effects those actions trigger** (journal entries, model updates)
5. **How it integrates with other modules** (data dependencies, navigation links)

---

### 1. `TenantWorkspaceWrapper.tsx` — Main Wrapper

- Renders the app shell: sticky header with business name/logo and a horizontally scrollable tab bar.
- Controls routing between all module dashboards.
- On mount, checks `businessOnboardingComplete`. If incomplete → routes to onboarding flow (`business-onboarding.tsx` → `financial-setup.tsx` → `contact-information.tsx` → `tax-and-invoice.tsx` → `business-onboarding-success.tsx`).
- Onboarding calls `PUT /api/business/onboarding` which sets: `Tenant.name`, `metadata.industry`, `metadata.currency`, `metadata.financialYearStart`, `metadata.vatRegistered`, `metadata.invoiceTemplate`, etc.
- Integration: acts as the root container for all modules below.

---

### 2. `TenantWorkspaceOverview.tsx` — Overview Module

Sub-sections: **Identity & KYC**, **Financial Health**, **Platform Usage**, **Activity Pulse**

- Calls `GET /api/dashboard/business` to fetch:
  - Current month revenue (from `INCOME` journal lines)
  - Current month expenses (from `EXPENSE` journal lines)
  - Net income (revenue − expenses)
  - Cash & bank balance (from `ASSET` accounts tagged `CASH`/`BANK`)
  - Accounts receivable (from `AR`-tagged accounts)
  - Count of unpaid & overdue invoices
  - Count of customers
  - 5 most recent journals
- Quick actions: Cash Sale, Credit Sale/Invoice, Expense, Cheque
- Integration: reads aggregated data from Sales, Banking, Accounting, and Purchases modules.

---

### 3. `SalesDashboard.tsx` — Sales Module

Sub-sections: **Invoices**, **Customers**, **Revenue Tracking**

**Invoices:**
- `GET /api/invoices` — list all invoices (filter by status: unpaid, overdue)
- `POST /api/invoices` — create credit invoice (records AR debit + revenue credit in journal)
- `POST /api/invoices/:id/payment` — record payment (debits cash/bank, credits AR)
- `PUT /api/invoices/:id` — update draft invoice
- `DELETE /api/invoices/:id` — delete invoice

**Customers:**
- `GET /api/customers` — list customers
- `POST /api/customers` — create customer
- `GET /api/customers/:id/statement` — customer statement
- `GET /api/customers/:id/balance` — outstanding balance
- `GET /api/customers/:id/analytics` — customer analytics

**Revenue Tracking:** derived from invoice payments and income journal lines.

- Integration: invoice creation and payment flow into the Accounting module's journal. Customer balances feed into the Overview dashboard AR metric.

---

### 4. `PurchasesDashboard.tsx` — Purchases Module

Sub-sections: **Bills**, **Suppliers**, **Expenses**

**Bills/Purchases:**
- `POST /api/purchases` — create purchase (debits expense/inventory, credits AP)
- `POST /api/purchases/:id/payment` — pay supplier (debits AP, credits cash/bank)
- `GET /api/purchases/status/unpaid` — unpaid bills

**Suppliers:**
- `GET /api/vendors` — list suppliers
- `POST /api/vendors` — add supplier
- `GET /api/vendors/:id/statement` — supplier statement

**Expenses:** Purchases flagged as expense-type (links to EXPENSE accounts).

- Integration: Purchase payments post journal entries into Accounting. Inventory purchases also update `InventoryItem` stock levels and WAC (Weighted Average Cost).

---

### 5. `InventoryDashboard.tsx` — Inventory Module

Sub-sections: **Stock Tracking**, **Warehouses**, **Products**

- `GET /api/inventory/products` — list products with stock levels
- `POST /api/inventory/products` — create product (sets price, COGS account, revenue account)
- `POST /api/inventory/adjust` — manual stock adjustment (posts journal entry)
- `GET /api/inventory/alerts` — low-stock alerts
- `GET /api/inventory/valuation/current` — current stock value
- `POST /api/inventory/physical-count` — physical count reconciliation
- `POST /api/inventory/credit-memo` — customer return (reverses revenue + COGS)

Accounting patterns:
- Buying stock → debit Inventory Asset, credit AP/Cash
- Selling stock → debit COGS, credit Inventory; debit AR, credit Revenue
- Write-off → debit Expense, credit Inventory

- Integration: Inventory items link to `InvoiceItem` (Sales) and `PurchaseItem` (Purchases). WAC updates on every stock movement.

---

### 6. `AccountingDashboard.tsx` — Accounting Module

Sub-sections: **Chart of Accounts**, **Journal Entries**, **Ledger**

**Chart of Accounts:**
- `GET /api/accounts` — list accounts with balances
- `POST /api/accounts` — create account (ASSET, LIABILITY, EQUITY, INCOME, EXPENSE)
- `PUT /api/accounts/:id` — update account
- `DELETE /api/accounts/:id` — delete non-system accounts

**Journal Entries:**
- Every financial action (sale, purchase, payment, asset depreciation, loan) creates a `Journal` with balanced `JournalLine` debit/credit records.
- System accounts are protected (`isSystem = true`). Special accounts are looked up via `systemTag` (e.g., `CASH`, `AR`, `AP`).

**Ledger:**
- `GET /api/reports/account-transactions/:accountId` — full ledger for any account

- Integration: This is the foundation every other module builds on. All modules write to journals; all reports read from journals.

---

### 7. `BankingDashboard.tsx` — Banking Module

Sub-sections: **Bank Accounts**, **Transactions**, **Reconciliations**

- `GET /api/bank/transactions` — list transactions
- `POST /api/bank/deposit` — record deposit (debit bank, credit income/liability)
- `POST /api/bank/cheque` → also available via `POST /api/cheques/create`
- `POST /api/bank/transfer` — move funds between accounts (debit one bank, credit another)
- `PUT /api/bank/reconcile/:id` — mark transaction as reconciled
- `GET /api/bank/unreconciled` — list unreconciled items
- `GET /api/bank/statement` — bank statement for a period

Cheque lifecycle: Create → Clear → Void (each state change posts a journal entry)

- Integration: Bank transactions credit/debit Accounting accounts. Reconciliation links bank records to journal entries.

---

### 8. `FixedAssetsDashboard.tsx` — Fixed Assets Module

- `GET /api/fixed-assets` — list assets
- `POST /api/fixed-assets` — record new asset (debit Fixed Asset account, credit cash/bank/AP)
- `POST /api/fixed-assets/:id/depreciate` — run depreciation (debit Depreciation Expense, credit Accumulated Depreciation)
- `POST /api/fixed-assets/:id/dispose` — dispose asset (remove from register, post gain/loss)

- Integration: Fixed asset accounts live in the Chart of Accounts. Depreciation runs post to the journal. Asset balances appear on the Balance Sheet via Accounting module.

---

### 9. `LendingDashboard.tsx` — Lending Module

- `GET /api/lending/dashboard` — loan portfolio overview
- `POST /api/lending/issue` — issue loan (debit Loans Receivable, credit Cash/Bank)
- `POST /api/lending/repay` — record repayment (debit Cash/Bank, credit Loans Receivable)
- `POST /api/lending/:id/write-off` — write off bad debt (debit Bad Debt Expense, credit Loans Receivable)

- Integration: Loans Receivable is an ASSET account in the Chart of Accounts. All loan activity is journal-posted and visible in the Accounting ledger.

---

### 10. `TaxAndReportsDashboard.tsx` — Reports & Tax Module

Sub-sections: **Tax Profiles**, **VAT Configuration**, **Financial Statements**

**VAT:**
- `GET /api/vat-rates` — list VAT rates
- `POST /api/vat-rates` — create VAT rate (name, rate %, code)
- `PUT /api/vat-rates/:id` — update
- `DELETE /api/vat-rates/:id` — delete

**Financial Reports** (all read from journal lines):
- `GET /api/reports/profit-loss` — revenue − expenses per period
- `GET /api/reports/balance-sheet` — assets, liabilities, equity snapshot
- `GET /api/reports/trial-balance` — all account debit/credit totals
- `GET /api/reports/cash-flow` — cash movement statement
- `GET /api/reports/summary` — combined financial summary
- `GET /api/reports/monthly-trend` — month-by-month trend
- `GET /api/reports/category-analysis` — breakdown by category

- Integration: Reports are purely read from Accounting journals. VAT rates are applied in Sales and Purchases when creating invoices and bills.

---

### 11. `StaffManagementDashboard.tsx` — Staff Module

Sub-sections: **Employees**, **Payroll**, **Permissions**

- `GET /api/business/staff` — list all staff users under the tenant
- `POST /api/business/staff` — invite/add staff member (creates a `User` record linked to the same `tenantId`)
- Permissions: the first registered user is `OWNER`. Additional staff roles are managed on this dashboard.
- Payroll: staff payroll expenses eventually post to EXPENSE accounts via journal entries.

- Integration: All staff share the same tenant workspace and see tenant-scoped data. JWT middleware extracts `tenantId` from every request to enforce isolation.

---

### 12. `SettingsDashboard.tsx` — Settings Module

Sub-sections: **Company Profile**, **Preferences**, **FX Market Configuration**

**Company Profile:**
- `PUT /api/business/profile` — update name, industry, sales type, business size, currency
- `PUT /api/business/contact` — update phone, website, address, business email
- `PUT /api/business/tax-settings` — update KRA PIN, tax registration, tax type

**Preferences:**
- Invoice template selection, financial year start, default currency

**FX Market Configuration:**
- Multi-currency settings. Currency selection is stored in `Tenant.metadata.currency`.

- Integration: Currency and tax settings affect how invoices are generated (Sales), how VAT is calculated (Tax module), and how reports are denominated (Reports module).

---

### KEY INTEGRATION FLOWS TO ILLUSTRATE

1. **Sale → Accounting:** Create invoice (SalesDashboard) → posts AR debit + Revenue credit journal → visible in AccountingDashboard ledger → reflected in Overview revenue metric + Reports P&L.
2. **Purchase → Inventory → Accounting:** Create purchase with inventory item (PurchasesDashboard) → updates InventoryItem WAC and stock level → posts Inventory Asset debit + AP credit → visible in InventoryDashboard valuation + Balance Sheet.
3. **Payment → Banking → Accounting:** Record invoice payment (SalesDashboard) → creates BankTransaction → debits Bank, credits AR → reconcilable in BankingDashboard → reduces AR in Overview.
4. **Asset → Depreciation → Reports:** Add fixed asset (FixedAssetsDashboard) → periodic depreciation run → posts Depreciation Expense + Accumulated Depreciation → reflected in P&L (expense) and Balance Sheet (reduced asset value).
5. **Loan Issue → Repayment:** Issue loan (LendingDashboard) → debit Loans Receivable, credit Cash → repayment reverses → both visible in AccountingDashboard account ledger.



Now, using all of the above, produce:
- A **visual interactive diagram** or **annotated component map** showing each component, its sub-sections, the API endpoints it calls, and the arrows showing data/action flow between modules.
- For each module, write a **short developer-facing description** (3–5 sentences) explaining what it does, what it reads, what it writes, and what other modules it depends on or feeds into.