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

interface ErrorLog {
  id: string
  errorType: string
  description: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  timestamp: string
}

const MOCK_ERRORS: ErrorLog[] = [
  { id: '1', errorType: 'Journal Post Failed', description: 'Unbalanced journal entry detected in COGS calculation.', severity: 'critical', timestamp: '2026-05-22 09:12 AM' },
  { id: '2', errorType: 'API Error', description: 'Timeout connecting to KRA VAT validation endpoint.', severity: 'high', timestamp: '2026-05-22 10:25 AM' },
  { id: '3', errorType: 'Inventory Mismatch', description: 'Negative stock attempted during invoice creation.', severity: 'medium', timestamp: '2026-05-22 11:40 AM' },
]

export function ErrorMonitoring() {
  const [isLoading, setIsLoading] = useState(true)
  const [errors, setErrors] = useState<ErrorLog[]>([])

  useEffect(() => {
    // Simulate API fetch
    const timer = setTimeout(() => {
      setErrors(MOCK_ERRORS)
      setIsLoading(false)
    }, 1200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Error Monitoring</CardTitle>
        <CardDescription>
          Track system errors including failed journal posts, API errors, and inventory mismatches.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Error Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-4 w-[150px]" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-[300px]" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-[120px]" /></TableCell>
                  </TableRow>
                ))
              ) : errors.length > 0 ? (
                errors.map((error) => (
                  <TableRow key={error.id}>
                    <TableCell className="font-medium">{error.errorType}</TableCell>
                    <TableCell>{error.description}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={error.severity === 'critical' ? 'destructive' : 'secondary'}
                      >
                        {error.severity.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{error.timestamp}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    No errors found.
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
