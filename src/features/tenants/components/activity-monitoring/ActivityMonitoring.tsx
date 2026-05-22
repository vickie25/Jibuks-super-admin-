import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AuditLogs } from './AuditLogs'
import { TenantActivityTimeline } from './TenantActivityTimeline'
import { ErrorMonitoring } from './ErrorMonitoring'
import { DataTools } from './DataTools'

export function ActivityMonitoring() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Activity Monitoring</h2>
      </div>
      
      <Tabs defaultValue="timeline" className="space-y-4">
        <TabsList>
          <TabsTrigger value="timeline">Activity Timeline</TabsTrigger>
          <TabsTrigger value="audit">Audit Logs</TabsTrigger>
          <TabsTrigger value="errors">Error Monitoring</TabsTrigger>
          <TabsTrigger value="tools">Data Tools</TabsTrigger>
        </TabsList>
        
        <TabsContent value="timeline" className="space-y-4">
          <TenantActivityTimeline />
        </TabsContent>
        
        <TabsContent value="audit" className="space-y-4">
          <AuditLogs />
        </TabsContent>
        
        <TabsContent value="errors" className="space-y-4">
          <ErrorMonitoring />
        </TabsContent>

        <TabsContent value="tools" className="space-y-4">
          <DataTools />
        </TabsContent>
      </Tabs>
    </div>
  )
}
