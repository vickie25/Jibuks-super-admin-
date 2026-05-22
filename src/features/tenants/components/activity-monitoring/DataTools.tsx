import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function DataTools() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Tools</CardTitle>
        <CardDescription>
          Administrative actions for tenant data management.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-2 rounded-lg border p-4">
            <h4 className="font-semibold text-sm">Seed Demo Data</h4>
            <p className="text-xs text-muted-foreground flex-1">
              Populate this tenant with sample customers, invoices, and accounting entries for testing.
            </p>
            <Button variant="secondary" className="w-full mt-2">Seed Data</Button>
          </div>
          
          <div className="flex flex-col gap-2 rounded-lg border p-4 border-destructive/20 bg-destructive/5">
            <h4 className="font-semibold text-sm text-destructive">Reset Tenant</h4>
            <p className="text-xs text-muted-foreground flex-1">
              Permanently delete all transaction data while keeping the tenant and user accounts.
            </p>
            <Button variant="destructive" className="w-full mt-2">Reset Data</Button>
          </div>

          <div className="flex flex-col gap-2 rounded-lg border p-4">
            <h4 className="font-semibold text-sm">Export Tenant</h4>
            <p className="text-xs text-muted-foreground flex-1">
              Download a complete JSON backup of the tenant's accounting and operational data.
            </p>
            <Button variant="outline" className="w-full mt-2">Export Data</Button>
          </div>

          <div className="flex flex-col gap-2 rounded-lg border p-4 border-destructive/20 bg-destructive/5">
            <h4 className="font-semibold text-sm text-destructive">Archive Tenant</h4>
            <p className="text-xs text-muted-foreground flex-1">
              Lock the tenant. Users will no longer be able to log in or modify data.
            </p>
            <Button variant="destructive" className="w-full mt-2">Archive Tenant</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
