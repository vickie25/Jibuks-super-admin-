import { useState } from 'react'
import { useParams, useNavigate } from '@tanstack/react-router'
import { 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Users as UsersIcon, 
  CreditCard,
  Settings,
  Lock,
  Activity,
  History,
  FileText,
  Percent,
  Search,
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
  Layers
} from 'lucide-react'

import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
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
import { ScrollArea } from '@/components/ui/scroll-area'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export function TenantMonitoringDashboard() {
  const { tenantId } = useParams({ from: '/_authenticated/users/$tenantId/activity' })
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [financialSubTab, setFinancialSubTab] = useState('accounts')

  // Mock data matching Stitch designs (Doris Salon & Barber)
  const tenant = {
    name: 'Doris Salon & Barber',
    id: `JBK-${tenantId || '2031'}`,
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
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main className='flex-1 space-y-6 p-4 pt-6 md:p-8'>
        {/* Dashboard Title & Hero */}
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

        {/* Dashboard Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className='space-y-6'>
          <TabsList className='inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground w-full lg:w-auto overflow-x-auto overflow-y-hidden no-scrollbar'>
            <TabsTrigger value='overview' className='gap-2'><LayoutDashboard size={14} /> Overview</TabsTrigger>
            <TabsTrigger value='financials' className='gap-2'><Wallet size={14} /> Financial Architect</TabsTrigger>
            <TabsTrigger value='audit' className='gap-2'><History size={14} /> Audit Logs</TabsTrigger>
            <TabsTrigger value='modules' className='gap-2'><Activity size={14} /> Module Control</TabsTrigger>
            <TabsTrigger value='system' className='gap-2'><Settings size={14} /> System Control</TabsTrigger>
          </TabsList>

          <>
            {/* OVERVIEW CONTENT */}
            <TabsContent value='overview' className='m-0 space-y-6 focus-visible:outline-none outline-none'>
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

                <div>
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
                </div>
            </TabsContent>

            {/* FINANCIALS CONTENT */}
            <TabsContent value='financials' className='m-0 space-y-6 focus-visible:outline-none outline-none'>
                <div>
                    <div className='grid gap-6 md:grid-cols-4'>
                        <div className='md:col-span-1 space-y-4'>
                            <Card className='shadow-sm border-none'>
                                <CardHeader className='pb-3'>
                                    <CardTitle className='text-base font-semibold'>Financial Modules</CardTitle>
                                </CardHeader>
                                <CardContent className='p-2 space-y-1'>
                                    <Button 
                                        variant='ghost' 
                                        onClick={() => setFinancialSubTab('accounts')}
                                        className={`w-full justify-start gap-3 h-10 px-3 ${financialSubTab === 'accounts' ? 'bg-muted' : ''}`}
                                    >
                                        <FileText size={16} /> Chart of Accounts
                                    </Button>
                                    <Button 
                                        variant='ghost' 
                                        onClick={() => setFinancialSubTab('fx')}
                                        className={`w-full justify-start gap-3 h-10 px-3 ${financialSubTab === 'fx' ? 'bg-muted' : ''}`}
                                    >
                                        <Globe size={16} /> FX Configuration
                                    </Button>
                                    <Button 
                                        variant='ghost' 
                                        onClick={() => setFinancialSubTab('tax')}
                                        className={`w-full justify-start gap-3 h-10 px-3 ${financialSubTab === 'tax' ? 'bg-muted' : ''}`}
                                    >
                                        <Percent size={16} /> Tax Profiles
                                    </Button>
                                    <Button 
                                        variant='ghost' 
                                        onClick={() => setFinancialSubTab('reconciliation')}
                                        className={`w-full justify-start gap-3 h-10 px-3 ${financialSubTab === 'reconciliation' ? 'bg-muted' : ''}`}
                                    >
                                        <RefreshCcw size={16} /> Reconciliations
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                        <div className='md:col-span-3 space-y-6'>
                            <>
                                {financialSubTab === 'accounts' && (
                                    <div>
                                        <Card className='shadow-sm border-none'>
                                            <CardHeader>
                                                <div className='flex items-center justify-between'>
                                                    <div>
                                                        <CardTitle className='text-lg'>Chart of Accounts</CardTitle>
                                                        <CardDescription>Primary ledger structure for {tenant.name}</CardDescription>
                                                    </div>
                                                    <div className='flex items-center gap-2'>
                                                        <Input placeholder='Search accounts...' className='w-[200px] h-8' />
                                                        <Button size='sm' className='h-8'>Add Account</Button>
                                                    </div>
                                                </div>
                                            </CardHeader>
                                            <CardContent>
                                                <Table>
                                                    <TableHeader>
                                                        <TableRow>
                                                            <TableHead>Code</TableHead>
                                                            <TableHead>Account Name</TableHead>
                                                            <TableHead>Type</TableHead>
                                                            <TableHead className='text-right'>Current Balance (KES)</TableHead>
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                        {accounts.map((acc) => (
                                                            <TableRow key={acc.code}>
                                                                <TableCell className='font-mono text-xs'>{acc.code}</TableCell>
                                                                <TableCell className='font-medium'>{acc.name}</TableCell>
                                                                <TableCell>
                                                                    <Badge variant='outline' className='text-[10px] uppercase font-bold py-0 h-4'>
                                                                        {acc.type}
                                                                    </Badge>
                                                                </TableCell>
                                                                <TableCell className='text-right font-semibold'>{acc.balance}</TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </CardContent>
                                        </Card>
                                    </div>
                                )}

                                {financialSubTab === 'fx' && (
                                    <div className='space-y-6'>
                                        <Card className='shadow-sm border-none'>
                                            <CardHeader>
                                                <CardTitle className='text-lg'>FX Market Configuration</CardTitle>
                                                <CardDescription>Manage currency exchange rates and data providers</CardDescription>
                                            </CardHeader>
                                            <CardContent className='space-y-6'>
                                                <div className='grid gap-6 md:grid-cols-2'>
                                                    <div className='space-y-3 p-4 rounded-xl border bg-muted/10'>
                                                        <div className='flex items-center gap-2 text-sm font-semibold'>
                                                            <Server size={14} className='text-primary' /> Source Provider
                                                        </div>
                                                        <div className='flex items-center justify-between'>
                                                            <span className='text-sm'>OANDA Data Feed</span>
                                                            <Badge variant='outline' className='text-emerald-600 bg-emerald-500/5'>Global FX Active</Badge>
                                                        </div>
                                                        <p className='text-[11px] text-muted-foreground'>High-fidelity market data refreshed every 60s.</p>
                                                    </div>
                                                    <div className='space-y-3 p-4 rounded-xl border bg-muted/10'>
                                                        <div className='flex items-center gap-2 text-sm font-semibold'>
                                                            <Zap size={14} className='text-amber-500' /> Volatility Alert
                                                        </div>
                                                        <div className='flex items-center justify-between'>
                                                            <span className='text-sm'>Market State</span>
                                                            <Badge variant='outline' className='text-amber-600 bg-amber-500/5'>High Volatility</Badge>
                                                        </div>
                                                        <p className='text-[11px] text-muted-foreground'>System auto-frequency increased due to G10 swings.</p>
                                                    </div>
                                                </div>
                                                <Separator />
                                                <div className='space-y-4'>
                                                    <h4 className='text-sm font-semibold'>Common Conversions (KES Base)</h4>
                                                    <div className='grid gap-4 grid-cols-3'>
                                                        {['USD', 'EUR', 'GBP'].map((cur) => (
                                                            <div key={cur} className='p-3 rounded-lg border text-center space-y-1'>
                                                                <p className='text-[10px] font-bold text-muted-foreground'>{cur}</p>
                                                                <p className='text-lg font-bold'>148.50</p>
                                                                <p className='text-[9px] text-emerald-500'>+0.2% today</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                )}

                                {financialSubTab === 'tax' && (
                                    <div className='space-y-6'>
                                        <Card className='shadow-sm border-none'>
                                            <CardHeader>
                                                <CardTitle className='text-lg'>Tax Profile Configuration</CardTitle>
                                                <CardDescription>Legal tax entities and VAT settings for {tenant.name}</CardDescription>
                                            </CardHeader>
                                            <CardContent className='space-y-6'>
                                                <div className='grid gap-4 md:grid-cols-3'>
                                                    <div className='space-y-1'>
                                                        <p className='text-[10px] uppercase font-bold text-muted-foreground'>Tax Status</p>
                                                        <p className='text-sm font-semibold'>Registered (VAT)</p>
                                                    </div>
                                                    <div className='space-y-1'>
                                                        <p className='text-[10px] uppercase font-bold text-muted-foreground'>Country</p>
                                                        <p className='text-sm font-semibold'>Kenya</p>
                                                    </div>
                                                    <div className='space-y-1'>
                                                        <p className='text-[10px] uppercase font-bold text-muted-foreground'>VAT ID</p>
                                                        <p className='text-sm font-mono'>P051234567Z</p>
                                                    </div>
                                                </div>
                                                <Separator />
                                                <div className='space-y-4'>
                                                    <div className='flex items-center justify-between'>
                                                        <h4 className='text-sm font-semibold'>Compliance Checklist</h4>
                                                        <Badge className='bg-amber-500/10 text-amber-600 border-none shadow-none text-[10px]'>1 Action Required</Badge>
                                                    </div>
                                                    <div className='space-y-3'>
                                                        {[
                                                            { title: 'VAT Configured', desc: 'Primary rate of 16% is set.', done: true },
                                                            { title: 'Rules Defined', desc: 'Standard, zero-rated and exempt rules added.', done: true },
                                                            { title: 'Missing Category Mapping', desc: 'Hardware sales needs rule assignment.', done: false },
                                                        ].map((item, i) => (
                                                            <div key={i} className='flex items-start gap-3 p-3 rounded-xl border bg-muted/5'>
                                                                <div className={`mt-0.5 h-4 w-4 rounded-full flex items-center justify-center ${item.done ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'}`}>
                                                                    {item.done ? <CheckCircle2 size={10} /> : <AlertTriangle size={10} />}
                                                                </div>
                                                                <div>
                                                                    <p className='text-sm font-semibold'>{item.title}</p>
                                                                    <p className='text-xs text-muted-foreground'>{item.desc}</p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                )}
                            </>
                        </div>
                    </div>
                </div>
            </TabsContent>

            {/* AUDIT LOGS CONTENT */}
            <TabsContent value='audit' className='m-0 space-y-6 focus-visible:outline-none outline-none'>
                <div>
                    <Card className='shadow-sm border-none'>
                        <CardHeader>
                            <div className='flex items-center justify-between'>
                                <div>
                                    <CardTitle className='text-xl'>Comprehensive Audit Log</CardTitle>
                                    <CardDescription>View every action performed by users and system processes</CardDescription>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <div className='relative'>
                                        <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
                                        <Input placeholder='Filter events...' className='pl-8 w-[250px] h-9' />
                                    </div>
                                    <Button variant='outline' size='icon' className='h-9 w-9'><Filter size={16} /></Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow className='hover:bg-transparent'>
                                        <TableHead className='w-[200px]'>Timestamp</TableHead>
                                        <TableHead>Action</TableHead>
                                        <TableHead>Actor</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead className='text-right'>Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {auditLogs.map((log) => (
                                        <TableRow key={log.id} className='group'>
                                            <TableCell className='text-xs text-muted-foreground font-mono'>
                                                Oct 24, 2023 • 14:45:12
                                            </TableCell>
                                            <TableCell className='font-medium'>
                                                <div className='flex items-center gap-2'>
                                                    {log.status === 'success' ? <CheckCircle2 size={12} className='text-emerald-500' /> : <AlertTriangle size={12} className='text-amber-500' />}
                                                    {log.action}
                                                </div>
                                            </TableCell>
                                            <TableCell>{log.user}</TableCell>
                                            <TableCell>
                                                <Badge variant='secondary' className='text-[10px] uppercase py-0 h-4'>{log.category}</Badge>
                                            </TableCell>
                                            <TableCell className='text-right'>
                                                <Button variant='ghost' size='sm' className='h-8 px-2 group-hover:bg-muted'>
                                                    View Context <ChevronRight size={14} className='ml-1' />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </TabsContent>

            {/* MODULES CONTENT */}
            <TabsContent value='modules' className='m-0 space-y-6 focus-visible:outline-none outline-none'>
                <div className='grid gap-6 md:grid-cols-2'>
                    {modules.map((mod) => (
                        <Card key={mod.name} className='shadow-sm border-none overflow-hidden'>
                            <div className={`h-1 w-full ${mod.active ? 'bg-primary' : 'bg-muted'}`} />
                            <CardHeader className='pb-3'>
                                <div className='flex items-center justify-between'>
                                    <div className='flex items-center gap-3'>
                                        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${mod.active ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                                            {mod.icon}
                                        </div>
                                        <CardTitle className='text-base'>{mod.name}</CardTitle>
                                    </div>
                                    <Switch checked={mod.active} />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className='text-sm text-muted-foreground leading-relaxed'>
                                    {mod.description}
                                </p>
                                <div className='mt-4 flex items-center justify-between'>
                                    <div className='flex items-center gap-2'>
                                        <div className={`h-2 w-2 rounded-full ${mod.active ? 'bg-emerald-500' : 'bg-muted'}`} />
                                        <span className='text-[10px] uppercase font-bold tracking-wider text-muted-foreground'>
                                            {mod.active ? 'Module Active' : 'Disabled'}
                                        </span>
                                    </div>
                                    <Button variant='ghost' size='sm' className='h-7 text-[11px] gap-1 px-2'>
                                        Config <Settings size={12} />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </TabsContent>

            {/* SYSTEM CONTENT */}
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
