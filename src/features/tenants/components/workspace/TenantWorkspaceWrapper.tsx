import { useState } from 'react'
import { useParams, useNavigate } from '@tanstack/react-router'
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  CreditCard,
  Settings,
  Lock,
  Activity,
  History,
  FileText,
  Percent,
  Search as SearchIcon,
  Download,
  Filter,
  CheckCircle2,
  AlertTriangle,
  ChevronLeft,
  LayoutDashboard,
  Wallet,
  Globe,
  Archive,
  RefreshCcw,
  ExternalLink,
  ChevronRight,
  ShieldAlert,
  Server,
  Zap,
  Layers,
  ShoppingCart,
  Package,
  Landmark,
  TrendingUp,
  Users as UsersIcon,
  BarChart3,
  Banknote,
} from 'lucide-react'

import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Switch } from '@/components/ui/switch'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'

// Import workspace sub-modules
import { TenantWorkspaceOverview } from './overview/TenantWorkspaceOverview'
import { SalesDashboard } from './sales/SalesDashboard'
import { AccountingDashboard } from './accounting/AccountingDashboard'
import { PurchasesDashboard } from './purchases/PurchasesDashboard'
import { InventoryDashboard } from './inventory/InventoryDashboard'
import { BankingDashboard } from './banking/BankingDashboard'
import { FixedAssetsDashboard } from './assets-lending/FixedAssetsDashboard'
import { LendingDashboard } from './assets-lending/LendingDashboard'
import { TaxAndReportsDashboard } from './reports-tax/TaxAndReportsDashboard'
import { SettingsDashboard } from './settings/SettingsDashboard'
import { StaffManagementDashboard } from './staff/StaffManagementDashboard'

export function TenantWorkspaceWrapper() {
  const { tenantId } = useParams({ from: '/_authenticated/users/$tenantId/activity' })
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')

  // Mock data matching Stitch designs (Doris Salon & Barber)
  const tenant = {
    name: 'Doris Salon & Barber',
    id: `JBK-${tenantId || '4'}`,
    email: 'contact@dorissalon.com',
    phone: '+254 712 345 678',
    location: 'Nairobi, Kenya',
    kycStatus: 'Verified',
    plan: 'Growth Tier',
    status: 'Active',
    transactions: '124k',
    storage: 42.8,
    storageLimit: 100,
    subUsers: 12,
    subUsersLimit: 15,
    established: 'June 2021',
  }

  const auditLogs = [
    { id: 'log_89432', action: 'Compliance Verified', user: 'Sarah J.', time: '2h ago', status: 'success', category: 'KYC' },
    { id: 'log_89431', action: 'Module Enabled: POS', user: 'System', time: '5h ago', status: 'success', category: 'Config' },
    { id: 'log_89430', action: 'Failed Login Attempt', user: 'Unknown', time: '12h ago', status: 'warning', category: 'Security' },
    { id: 'log_89429', action: 'Tier Upgraded: Growth', user: 'Admin Admin', time: '1d ago', status: 'success', category: 'Billing' },
    { id: 'log_89428', action: 'Inventory Restock', user: 'Manager Mark', time: '2d ago', status: 'success', category: 'Ops' },
  ]

  const modules = [
    { name: 'Inventory', description: 'Track stock levels and warehouse distribution.', active: true, icon: <Archive className='h-4 w-4' /> },
    { name: 'HR & Payroll', description: 'Manage staff records and automated salary cycles.', active: false, icon: <UsersIcon className='h-4 w-4' /> },
    { name: 'Community', description: 'User forums, engagement tools, and CRM.', active: true, icon: <Globe className='h-4 w-4' /> },
    { name: 'Manufacturing', description: 'Production planning and bill of materials.', active: false, icon: <Settings className='h-4 w-4' /> },
    { name: 'POS', description: 'Point of Sale hardware and software integration.', active: true, icon: <CreditCard className='h-4 w-4' /> },
  ]

  const accounts = [
    { code: '1001', name: 'Cash at Bank', balance: '124,500', type: 'Asset' },
    { code: '1002', name: 'Petty Cash', balance: '1,200', type: 'Asset' },
    { code: '2001', name: 'Accounts Payable', balance: '45,000', type: 'Liability' },
    { code: '3001', name: 'Service Revenue', balance: '890,000', type: 'Revenue' },
    { code: '4001', name: 'Rent Expense', balance: '120,000', type: 'Expense' },
  ]

  return (
    <div className='flex min-h-screen flex-col bg-muted/20'>
      {/* ═══════════════════════════ HEADER (Matches Stitch Design) ═══════════════════════════ */}
      <Header fixed className='border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
        <div className='flex items-center gap-2 px-4'>
          <Button variant='ghost' size='icon' onClick={() => navigate({ to: '/users' })}>
            <ChevronLeft size={20} />
          </Button>
          <Separator orientation='vertical' className='h-4 mx-1' />
          <span className='text-sm text-muted-foreground'>Tenants</span>
          <span className='text-sm text-muted-foreground'>/</span>
          <span className='text-sm font-medium'>{tenant.name}</span>
        </div>
        <div className='ms-auto flex items-center space-x-4'>
          <Search />
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      {/* ═══════════════════════════ MAIN CONTENT ═══════════════════════════ */}
      <Main className='flex-1 space-y-6 p-4 pt-6 md:p-8'>
        {/* ─── Hero Section ─── */}
        <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
          <div className='space-y-1'>
            <div className='flex items-center gap-3'>
              <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20 text-primary-foreground'>
                <Building2 size={26} />
              </div>
              <div>
                <h1 className='text-3xl font-bold tracking-tight'>{tenant.name}</h1>
                <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                  <Badge variant='outline' className='font-mono uppercase text-[10px] py-0 h-4'>{tenant.id}</Badge>
                  <span>•</span>
                  <span>Established {tenant.established}</span>
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-wrap gap-2'>
            <Button variant='outline' className='h-9 gap-2 shadow-sm'>
              <Download size={14} /> Export Report
            </Button>
            <Button className='h-9 gap-2 shadow-md shadow-primary/10'>
              <ExternalLink size={14} /> Open Tenant App
            </Button>
          </div>
        </div>

        {/* ─── Tabs Navigation (Matches Stitch layout + Business Modules) ─── */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className='space-y-6'>
          <ScrollArea orientation='horizontal' className='w-full whitespace-nowrap pb-2'>
            <TabsList className='inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground w-max'>
              <TabsTrigger value='overview' className='gap-2'><LayoutDashboard size={14} /> Overview</TabsTrigger>
              <TabsTrigger value='sales' className='gap-2'><ShoppingCart size={14} /> Sales</TabsTrigger>
              <TabsTrigger value='purchases' className='gap-2'><Package size={14} /> Purchases</TabsTrigger>
              <TabsTrigger value='inventory' className='gap-2'><Archive size={14} /> Inventory</TabsTrigger>
              <TabsTrigger value='accounting' className='gap-2'><Wallet size={14} /> Accounting</TabsTrigger>
              <TabsTrigger value='banking' className='gap-2'><Landmark size={14} /> Banking</TabsTrigger>
              <TabsTrigger value='assets' className='gap-2'><TrendingUp size={14} /> Assets</TabsTrigger>
              <TabsTrigger value='lending' className='gap-2'><Banknote size={14} /> Lending</TabsTrigger>
              <TabsTrigger value='reports' className='gap-2'><BarChart3 size={14} /> Reports</TabsTrigger>
              <TabsTrigger value='staff' className='gap-2'><UsersIcon size={14} /> Staff</TabsTrigger>
              <TabsTrigger value='settings' className='gap-2'><Settings size={14} /> Settings</TabsTrigger>
              <TabsTrigger value='system' className='gap-2'><Layers size={14} /> System Control</TabsTrigger>
            </TabsList>
            <ScrollBar orientation='horizontal' />
          </ScrollArea>

          <>
            {/* ═══════════════ OVERVIEW TAB ═══════════════ */}
            <TabsContent value='overview' className='m-0 space-y-6 focus-visible:outline-none outline-none'>
              {/* Identity + Financial Health + Platform Usage Cards */}
              <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
                <Card className='shadow-sm border-none bg-gradient-to-br from-background to-muted/30'>
                  <CardHeader className='pb-3'>
                    <CardTitle className='text-base font-semibold'>Identity & KYC</CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    <div className='space-y-2.5'>
                      <div className='flex items-center gap-3 text-sm'>
                        <div className='h-8 w-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground'>
                          <Phone size={14} />
                        </div>
                        <span>{tenant.phone}</span>
                      </div>
                      <div className='flex items-center gap-3 text-sm'>
                        <div className='h-8 w-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground'>
                          <Mail size={14} />
                        </div>
                        <span className='truncate'>{tenant.email}</span>
                      </div>
                      <div className='flex items-center gap-3 text-sm'>
                        <div className='h-8 w-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground'>
                          <MapPin size={14} />
                        </div>
                        <span>{tenant.location}</span>
                      </div>
                    </div>
                    <Separator className='opacity-50' />
                    <div className='flex items-center justify-between'>
                      <span className='text-xs text-muted-foreground'>KYC Status</span>
                      <Badge className='bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-none shadow-none'>
                        <ShieldCheck size={12} className='mr-1' /> {tenant.kycStatus}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card className='shadow-sm border-none bg-gradient-to-br from-background to-muted/30'>
                  <CardHeader className='pb-3'>
                    <CardTitle className='text-base font-semibold'>Financial Health</CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-3'>
                    <div className='flex flex-col gap-1.5'>
                      <div className='flex items-center justify-between'>
                        <span className='text-xs text-muted-foreground'>Revenue (MTD)</span>
                        <span className='text-sm font-bold'>$48,200</span>
                      </div>
                      <Progress value={65} className='h-1.5 bg-muted/50' />
                    </div>
                    <Separator className='my-2 opacity-50' />
                    <div className='grid grid-cols-2 gap-4'>
                      <div className='space-y-1'>
                        <p className='text-[10px] text-muted-foreground uppercase tracking-wider font-semibold'>Active Accounts</p>
                        <p className='text-xl font-bold'>38</p>
                      </div>
                      <div className='space-y-1 text-right'>
                        <p className='text-[10px] text-muted-foreground uppercase tracking-wider font-semibold'>Currency</p>
                        <p className='text-xl font-bold'>KES</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className='shadow-sm border-none bg-gradient-to-br from-background to-muted/30'>
                  <CardHeader className='pb-3'>
                    <CardTitle className='text-base font-semibold'>Platform Usage</CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    <div className='space-y-2'>
                      <div className='flex items-center justify-between text-xs'>
                        <span className='text-muted-foreground'>Storage Used</span>
                        <span className='font-medium'>{tenant.storage} GB / {tenant.storageLimit} GB</span>
                      </div>
                      <Progress value={tenant.storage} className='h-1.5 bg-muted/50' />
                    </div>
                    <div className='space-y-2'>
                      <div className='flex items-center justify-between text-xs'>
                        <span className='text-muted-foreground'>Sub-user Seats</span>
                        <span className='font-medium'>{tenant.subUsers} / {tenant.subUsersLimit}</span>
                      </div>
                      <Progress value={(tenant.subUsers / tenant.subUsersLimit) * 100} className='h-1.5 bg-muted/50' />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Activity Pulse Timeline */}
              <Card className='shadow-sm border-none'>
                <CardHeader>
                  <div className='flex items-center justify-between'>
                    <div>
                      <CardTitle className='text-lg'>Activity Pulse</CardTitle>
                      <CardDescription>Real-time log of administrative and system events</CardDescription>
                    </div>
                    <Button variant='ghost' size='sm' onClick={() => setActiveTab('audit')}>View Full History</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <ScrollArea className='h-[300px] pr-4'>
                    <div className='space-y-6'>
                      {auditLogs.map((log, index) => (
                        <div key={log.id} className='relative flex gap-4 pb-2'>
                          {index !== auditLogs.length - 1 && (
                            <span className='absolute left-[11px] top-6 h-full w-[1px] bg-muted' />
                          )}
                          <div className='z-10 mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-background border shadow-sm'>
                            {log.status === 'success' ? (
                              <div className='h-2 w-2 rounded-full bg-emerald-500' />
                            ) : (
                              <div className='h-2 w-2 rounded-full bg-amber-500' />
                            )}
                          </div>
                          <div className='flex flex-1 flex-col gap-1'>
                            <div className='flex items-center justify-between'>
                              <span className='text-sm font-semibold'>{log.action}</span>
                              <span className='text-[10px] text-muted-foreground font-mono'>{log.time}</span>
                            </div>
                            <p className='text-xs text-muted-foreground'>
                              Performed by <span className='font-medium text-foreground'>{log.user}</span> • 
                              Category: <Badge variant='secondary' className='text-[9px] py-0 h-3 ml-1'>{log.category}</Badge>
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            {/* ═══════════════ BUSINESS MODULE TABS ═══════════════ */}
            <TabsContent value='sales' className='m-0 space-y-6 focus-visible:outline-none outline-none'>
              <SalesDashboard />
            </TabsContent>

            <TabsContent value='purchases' className='m-0 space-y-6 focus-visible:outline-none outline-none'>
              <PurchasesDashboard />
            </TabsContent>

            <TabsContent value='inventory' className='m-0 space-y-6 focus-visible:outline-none outline-none'>
              <InventoryDashboard />
            </TabsContent>

            <TabsContent value='accounting' className='m-0 space-y-6 focus-visible:outline-none outline-none'>
              <AccountingDashboard />
            </TabsContent>

            <TabsContent value='banking' className='m-0 space-y-6 focus-visible:outline-none outline-none'>
              <BankingDashboard />
            </TabsContent>

            <TabsContent value='assets' className='m-0 space-y-6 focus-visible:outline-none outline-none'>
              <FixedAssetsDashboard />
            </TabsContent>

            <TabsContent value='lending' className='m-0 space-y-6 focus-visible:outline-none outline-none'>
              <LendingDashboard />
            </TabsContent>

            <TabsContent value='reports' className='m-0 space-y-6 focus-visible:outline-none outline-none'>
              <TaxAndReportsDashboard />
            </TabsContent>

            <TabsContent value='staff' className='m-0 space-y-6 focus-visible:outline-none outline-none'>
              <StaffManagementDashboard />
            </TabsContent>

            <TabsContent value='settings' className='m-0 space-y-6 focus-visible:outline-none outline-none'>
              <SettingsDashboard />
            </TabsContent>

            {/* ═══════════════ SYSTEM CONTROL TAB (from Stitch) ═══════════════ */}
            <TabsContent value='system' className='m-0 space-y-6 focus-visible:outline-none outline-none'>
              <div className='space-y-6'>
                <div className='grid gap-6 md:grid-cols-2'>
                  <Card className='shadow-sm border-none border-l-4 border-l-amber-500'>
                    <CardHeader>
                      <CardTitle className='text-lg flex items-center gap-2'>
                        <Lock size={18} className='text-amber-500' /> Account Security State
                      </CardTitle>
                      <CardDescription>Immediately manage tenant access and data integrity</CardDescription>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                      <Alert variant='destructive' className='bg-amber-500/5 border-amber-200 dark:border-amber-900/50 text-amber-800 dark:text-amber-300'>
                        <ShieldAlert className='h-4 w-4' />
                        <AlertTitle>Critical Action</AlertTitle>
                        <AlertDescription className='text-[11px]'>
                          Locking this account will terminate all active sessions and pause background jobs.
                        </AlertDescription>
                      </Alert>
                      <div className='flex flex-wrap gap-2'>
                        <Button variant='outline' className='border-amber-200 text-amber-700 hover:bg-amber-50 dark:border-amber-900/50 dark:text-amber-400 h-9 text-sm'>
                          Freeze Account
                        </Button>
                        <Button variant='outline' className='border-red-200 text-red-700 hover:bg-red-50 dark:border-red-900/50 dark:text-red-400 h-9 text-sm'>
                          Force Logout All
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className='shadow-sm border-none border-l-4 border-l-blue-500'>
                    <CardHeader>
                      <CardTitle className='text-lg flex items-center gap-2'>
                        <RefreshCcw size={18} className='text-blue-500' /> Data Rollback & Restore
                      </CardTitle>
                      <CardDescription>Revert system state to a previous snapshot</CardDescription>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                      <div className='space-y-2'>
                        <div className='flex items-center justify-between text-[11px]'>
                          <span className='text-muted-foreground'>Last Snapshot</span>
                          <span className='font-mono font-bold'>24 Oct 2023, 12:00 PM</span>
                        </div>
                        <div className='flex items-center justify-between text-[11px]'>
                          <span className='text-muted-foreground'>Data Integrity</span>
                          <span className='text-emerald-500 font-bold'>Verified</span>
                        </div>
                      </div>
                      <div className='flex flex-wrap gap-2'>
                        <Button variant='outline' className='border-blue-200 text-blue-700 hover:bg-blue-50 dark:border-blue-900/50 dark:text-blue-400 h-9 text-sm'>
                          Initiate Rollback
                        </Button>
                        <Button variant='outline' className='border-blue-200 text-blue-700 hover:bg-blue-50 dark:border-blue-900/50 dark:text-blue-400 h-9 text-sm'>
                          Manage Backups
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className='shadow-sm border-none'>
                  <CardHeader>
                    <CardTitle className='text-base font-semibold flex items-center gap-2'>
                      <Layers size={18} /> System Resources
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='grid gap-6 md:grid-cols-4'>
                      {[
                        { label: 'CPU Usage', val: '12%', status: 'Normal' },
                        { label: 'Memory', val: '450MB', status: 'Optimal' },
                        { label: 'DB Connections', val: '24', status: 'Active' },
                        { label: 'Latency', val: '18ms', status: 'Excellent' },
                      ].map((stat, i) => (
                        <div key={i} className='p-4 rounded-xl border bg-muted/10 space-y-1'>
                          <p className='text-[10px] text-muted-foreground uppercase font-bold'>{stat.label}</p>
                          <div className='flex items-center justify-between'>
                            <p className='text-lg font-bold'>{stat.val}</p>
                            <p className='text-[10px] text-emerald-500 font-bold'>{stat.status}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </>
        </Tabs>
      </Main>
    </div>
  )
}
