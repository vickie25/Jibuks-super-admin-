import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function PurchasesDashboard() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Purchases Module</h2>
      </div>

      <Tabs defaultValue="vendors" className="space-y-4">
        <TabsList>
          <TabsTrigger value="vendors">Vendors / Suppliers</TabsTrigger>
          <TabsTrigger value="bills">Purchase Bills</TabsTrigger>
          <TabsTrigger value="payments">Supplier Payments</TabsTrigger>
          <TabsTrigger value="analytics">Purchase Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="vendors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Vendors</CardTitle>
              <CardDescription>Manage suppliers and view statements.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-32 flex items-center justify-center text-muted-foreground border rounded-md">
                Vendors list will render here.
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bills">
          <Card>
            <CardHeader>
              <CardTitle>Purchase Bills</CardTitle>
            </CardHeader>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
