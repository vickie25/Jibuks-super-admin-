import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function FixedAssetsDashboard() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Fixed Assets Module</h2>
      </div>

      <Tabs defaultValue="register" className="space-y-4">
        <TabsList>
          <TabsTrigger value="register">Asset Register</TabsTrigger>
          <TabsTrigger value="depreciation">Depreciation Schedules</TabsTrigger>
          <TabsTrigger value="disposal">Disposals</TabsTrigger>
        </TabsList>

        <TabsContent value="register" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Asset Register</CardTitle>
              <CardDescription>Track fixed assets, costs, and useful life.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-32 flex items-center justify-center text-muted-foreground border rounded-md">
                Assets list will render here.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
