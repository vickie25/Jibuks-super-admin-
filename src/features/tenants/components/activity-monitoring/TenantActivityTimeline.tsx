import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

interface TimelineEvent {
  id: string
  title: string
  description: string
  category: 'Sales' | 'Purchases' | 'Banking' | 'Inventory'
  timestamp: string
}

const MOCK_EVENTS: TimelineEvent[] = [
  { id: '1', title: 'Invoice #INV-1002 Paid', description: 'Customer XYZ paid $1,500.00 via Bank Transfer', category: 'Sales', timestamp: 'Today, 2:30 PM' },
  { id: '2', title: 'New Bill Created', description: 'Bill #BILL-045 created for Supplier ABC', category: 'Purchases', timestamp: 'Today, 11:15 AM' },
  { id: '3', title: 'Bank Reconciliation', description: 'Reconciled 15 transactions for Main Account', category: 'Banking', timestamp: 'Yesterday, 4:00 PM' },
  { id: '4', title: 'Stock Adjustment', description: 'Added 50 units of SKU-101', category: 'Inventory', timestamp: 'Yesterday, 9:20 AM' },
]

export function TenantActivityTimeline() {
  const [isLoading, setIsLoading] = useState(true)
  const [events, setEvents] = useState<TimelineEvent[]>([])

  useEffect(() => {
    // Simulate API fetch
    const timer = setTimeout(() => {
      setEvents(MOCK_EVENTS)
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tenant Activity Timeline</CardTitle>
        <CardDescription>
          Chronological view of important business events like sales, purchases, and banking.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex gap-4">
                <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-3 w-[200px]" />
                </div>
              </div>
            ))
          ) : events.length > 0 ? (
            events.map((event) => (
              <div key={event.id} className="flex gap-4">
                <div className="mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-secondary">
                  <span className="text-xs font-semibold">{event.category[0]}</span>
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">{event.title}</p>
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                </div>
                <div className="text-sm text-muted-foreground">
                  {event.timestamp}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-muted-foreground py-8">
              No recent activity.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
