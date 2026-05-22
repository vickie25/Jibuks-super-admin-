import { useState, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface AuditLog {
  id: string
  action: string
  user: string
  module: string
  timestamp: string
  status: 'success' | 'warning' | 'danger'
}

const MOCK_LOGS: AuditLog[] = [
  { id: '1', action: 'User Login', user: 'owner@business.com', module: 'Auth', timestamp: '2026-05-22 08:30 AM', status: 'success' },
  { id: '2', action: 'Created Invoice #INV-001', user: 'sales@business.com', module: 'Sales', timestamp: '2026-05-22 09:15 AM', status: 'success' },
  { id: '3', action: 'Deleted Account', user: 'owner@business.com', module: 'Accounting', timestamp: '2026-05-22 10:05 AM', status: 'danger' },
  { id: '4', action: 'Journal Post Modified', user: 'accountant@business.com', module: 'Accounting', timestamp: '2026-05-22 10:45 AM', status: 'warning' },
  { id: '5', action: 'Inventory Stock Adjusted', user: 'inventory@business.com', module: 'Inventory', timestamp: '2026-05-22 11:20 AM', status: 'success' },
]

export function AuditLogs() {
  const [isLoading, setIsLoading] = useState(true)
  const [logs, setLogs] = useState<AuditLog[]>([])

  useEffect(() => {
    // Simulate API fetch
    const timer = setTimeout(() => {
      setLogs(MOCK_LOGS)
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Audit Logs</CardTitle>
        <CardDescription>
          Detailed log of user actions, deletions, accounting changes, and login activity.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Action</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Module</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-4 w-[200px]" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-[150px]" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-[120px]" /></TableCell>
                  </TableRow>
                ))
              ) : logs.length > 0 ? (
                logs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-medium">{log.action}</TableCell>
                    <TableCell>{log.user}</TableCell>
                    <TableCell>{log.module}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={log.status === 'success' ? 'default' : log.status === 'warning' ? 'secondary' : 'destructive'}
                      >
                        {log.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{log.timestamp}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
