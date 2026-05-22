1.3 Tenant Details

Purpose:
Master overview page for a business.

Tabs:

Overview
Users
Accounting
Sales
Purchases
Inventory
Banking
Reports
Audit Logs
Settings
1.4 Tenant Impersonation

Critical feature.

Purpose:
Admin can enter the tenant environment exactly as the tenant sees it.

Features:

Login as owner
Login as staff
Read-only mode
Full-access mode
2. BUSINESS ONBOARDING MODULE
Main Component
Business Onboarding
Sub Components
2.1 Business Identity

Fields:

Business name
Industry
Sales type
Business size
2.2 Financial Setup

Fields:

Currency
Financial year start
Default accounting method
Default accounts
2.3 Contact Information

Fields:

Phone
Address
Website
Business email
2.4 Tax & Invoice Settings

Fields:

VAT registered
VAT number/KRA PIN
Tax type
Invoice template
2.5 Onboarding Status

Features:

Complete/incomplete state
Completion timestamp
Missing steps tracker

Actions:

Force complete
Reset onboarding
3. BUSINESS DASHBOARD MODULE
Main Component
Business Dashboard

Admin should see exactly what the tenant sees.

Sub Components
3.1 Financial KPIs

Cards:

Revenue
Expenses
Net Profit
Cash & Bank
Accounts Receivable
Accounts Payable
3.2 Operational KPIs

Cards:

Customers
Suppliers
Inventory Value
Loans
Unpaid invoices
Overdue invoices
3.3 Recent Activity Feed

Items:

Journal postings
Payments
Inventory movements
Bank activity
Asset depreciation
3.4 Quick Actions

Actions:

New invoice
Cash sale
Expense
Deposit
Transfer
Cheque
4. USER & STAFF MANAGEMENT
Main Component
Staff Management
Sub Components
4.1 Staff List

Features:

View users
Roles
Status
Last login
4.2 Add Staff

Fields:

Name
Email
Role
Permissions
4.3 Role Management

Roles:

Owner
Accountant
Cashier
Sales
Inventory Manager
4.4 Permissions Matrix

Permissions:

invoices.create
invoices.delete
reports.view
inventory.adjust
etc.
5. ACCOUNTING MODULE
Main Component
Accounting

This is the core engine.

Sub Components
5.1 Chart of Accounts

Features:

Create account
Edit account
Delete account
System account protection

Types:

Asset
Liability
Equity
Income
Expense
5.2 Journals

Features:

List journals
View entries
Reverse journal
Manual journal entry
5.3 Journal Lines

Features:

Debit/credit inspection
Ledger tracing
5.4 Account Balances

Views:

Current balance
Historical balance
Ledger balance
5.5 Account Mapping

Mappings:

Revenue accounts
VAT accounts
Inventory accounts
COGS accounts
6. SALES MODULE
Main Component
Sales
Sub Components
6.1 Customers

Features:

CRUD customers
Statements
Analytics
Balance tracking
6.2 Invoices

Features:

Create invoice
Edit invoice
Delete invoice
View status

Statuses:

Draft
Unpaid
Partial
Paid
Overdue
6.3 Invoice Payments

Features:

Record payment
Allocate payment
Reverse payment
6.4 Cash Sales

Features:

Immediate payment sales
Receipt generation
6.5 Credit Notes / Returns

Features:

Customer returns
Reverse revenue
Reverse inventory
7. PURCHASES & SUPPLIERS MODULE
Main Component
Purchases
Sub Components
7.1 Vendors/Suppliers

Features:

CRUD suppliers
Supplier statements
7.2 Purchases

Features:

Supplier bills
Expense purchases
Inventory purchases

Statuses:

Draft
Unpaid
Partial
Paid
7.3 Supplier Payments

Features:

Record payment
Partial payment
Payment allocation
7.4 Purchase Analytics

Metrics:

Top suppliers
Outstanding balances
Purchase trends
8. INVENTORY MODULE
Main Component
Inventory
Sub Components
8.1 Products

Fields:

SKU
Name
Cost
Selling price
Quantity
Reorder level
8.2 Stock Adjustments

Actions:

Increase stock
Reduce stock
Damaged stock
Expiry adjustment
8.3 Stock Movements

Movement types:

Purchase
Sale
Return
Write-off
Adjustment
8.4 Inventory Valuation

Views:

Weighted Average Cost
Current stock value
8.5 Low Stock Alerts

Features:

Threshold alerts
Restock suggestions
8.6 Physical Count

Features:

Count sessions
Variance adjustments
9. BANKING MODULE
Main Component
Banking
Sub Components
9.1 Bank Accounts

Features:

List accounts
Current balances
9.2 Bank Transactions

Types:

Deposit
Withdrawal
Expense
Transfer
9.3 Transfers

Features:

Internal transfers
Transfer history
9.4 Reconciliation

Features:

Reconcile transactions
Mark reconciled/unreconciled
9.5 Bank Statements

Features:

Date filtering
Export
10. CHEQUES MODULE
Main Component
Cheques
Sub Components
10.1 Cheque List

Statuses:

Pending
Cleared
Voided
10.2 Write Cheque

Fields:

Payee
Amount
Bank account
Memo
10.3 Clear/Void Cheque

Actions:

Mark cleared
Void cheque
11. FIXED ASSETS MODULE
Main Component
Fixed Assets
Sub Components
11.1 Asset Register

Fields:

Asset name
Purchase date
Cost
Useful life
11.2 Depreciation

Features:

Run depreciation
View schedules
11.3 Disposal

Features:

Sell asset
Scrap asset
12. LENDING MODULE
Main Component
Lending
Sub Components
12.1 Loans Dashboard

Metrics:

Active loans
Outstanding balance
Bad debt
12.2 Issue Loan

Fields:

Borrower
Amount
Interest
Repayment schedule
12.3 Repayments

Features:

Record repayment
Allocation
12.4 Write-offs

Features:

Bad debt write-off
13. VAT & TAX MODULE
Main Component
Tax Management
Sub Components
13.1 VAT Rates

Fields:

Name
Rate
Code
Active status
13.2 Tax Settings

Fields:

KRA PIN
Tax registration
Tax type
13.3 Tax Reports

Reports:

VAT summary
Tax collected
Tax payable
14. REPORTS MODULE
Main Component
Reports
Sub Components
14.1 Trial Balance
14.2 Profit & Loss
14.3 Balance Sheet
14.4 Cash Flow Statement
14.5 Account Ledger
14.6 Monthly Trends
14.7 Category Analysis
14.8 Financial Summary
15. SETTINGS MODULE
Main Component
Business Settings
Sub Components
15.1 General Settings
Business name
Currency
Timezone
15.2 Invoice Settings
Templates
Numbering
Terms
15.3 Payment Methods
Cash
Bank
Mobile money
Card
15.4 Categories
Income categories
Expense categories
15.5 Item Types
Product
Service
Asset
16. AUDIT & SYSTEM CONTROL MODULE
Main Component
Audit & Monitoring
Sub Components
16.1 Audit Logs

Track:

User actions
Deletes
Accounting changes
Login activity
16.2 Tenant Activity Timeline

Track:

Sales
Purchases
Banking
Inventory changes
16.3 Error Monitoring

Track:

Failed journal posts
API errors
Inventory mismatches
16.4 Data Tools

Actions:

Seed demo data
Reset tenant
Export tenant
Archive tenant
17. RECOMMENDED ADMIN SIDEBAR STRUCTURE
Dashboard

Business Tenants
 ├── All Tenants
 ├── Create Tenant
 ├── Suspended Tenants
 ├── Demo Tenants

Tenant Workspace
 ├── Overview
 ├── Staff
 ├── Accounting
 ├── Sales
 ├── Purchases
 ├── Inventory
 ├── Banking
 ├── Cheques
 ├── Fixed Assets
 ├── Lending
 ├── VAT & Tax
 ├── Reports
 ├── Settings
 ├── Audit Logs

System
 ├── Global VAT Rates
 ├── Seed Templates
 ├── System Accounts
 ├── Monitoring
 ├── Backups
MOST IMPORTANT ARCHITECTURAL IDEA

You should structure this as:

Admin
  -> Select Tenant
      -> Open Tenant Workspace
           -> Same modules as business app

Meaning:

The tenant workspace inside admin should reuse:
the same APIs
same components
same accounting logic
same flows