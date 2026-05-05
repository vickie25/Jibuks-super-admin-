import { useState } from 'react'
import { type Table } from '@tanstack/react-table'
import { Trash2, UserX, UserCheck, Mail } from 'lucide-react'
import { toast } from 'sonner'
import { sleep } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { DataTableBulkActions as BulkActionsToolbar } from '@/components/data-table'
import { type Tenant } from '../data/tenant-schema'
import { UsersMultiDeleteDialog } from './users-multi-delete-dialog'

type DataTableBulkActionsProps<TData> = {
  table: Table<TData>
}

export function DataTableBulkActions<TData>({
  table,
}: DataTableBulkActionsProps<TData>) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const selectedRows = table.getFilteredSelectedRowModel().rows

  const handleBulkStatusChange = (status: 'active' | 'inactive') => {
    const selectedTenants = selectedRows.map((row) => row.original as Tenant)
    toast.promise(sleep(2000), {
      loading: `${status === 'active' ? 'Activating' : 'Deactivating'} tenants...`,
      success: () => {
        table.resetRowSelection()
        return `${status === 'active' ? 'Activated' : 'Deactivated'} ${selectedTenants.length} tenant${selectedTenants.length > 1 ? 's' : ''}`
      },
      error: `Error ${status === 'active' ? 'activating' : 'deactivating'} tenants`,
    })
    table.resetRowSelection()
  }

  const handleBulkInvite = () => {
    const selectedTenants = selectedRows.map((row) => row.original as Tenant)
    toast.promise(sleep(2000), {
      loading: 'Inviting tenants...',
      success: () => {
        table.resetRowSelection()
        return `Invited ${selectedTenants.length} tenant${selectedTenants.length > 1 ? 's' : ''}`
      },
      error: 'Error inviting tenants',
    })
    table.resetRowSelection()
  }

  return (
    <>
      <BulkActionsToolbar table={table} entityName='tenant'>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='outline'
              size='icon'
              onClick={handleBulkInvite}
              className='size-8'
              aria-label='Invite selected tenants'
              title='Invite selected tenants'
            >
              <Mail />
              <span className='sr-only'>Invite selected tenants</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Invite selected tenants</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='outline'
              size='icon'
              onClick={() => handleBulkStatusChange('active')}
              className='size-8'
              aria-label='Activate selected tenants'
              title='Activate selected tenants'
            >
              <UserCheck />
              <span className='sr-only'>Activate selected tenants</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Activate selected tenants</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='outline'
              size='icon'
              onClick={() => handleBulkStatusChange('inactive')}
              className='size-8'
              aria-label='Deactivate selected tenants'
              title='Deactivate selected tenants'
            >
              <UserX />
              <span className='sr-only'>Deactivate selected tenants</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Deactivate selected tenants</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='destructive'
              size='icon'
              onClick={() => setShowDeleteConfirm(true)}
              className='size-8'
              aria-label='Delete selected tenants'
              title='Delete selected tenants'
            >
              <Trash2 />
              <span className='sr-only'>Delete selected tenants</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Delete selected tenants</p>
          </TooltipContent>
        </Tooltip>
      </BulkActionsToolbar>

      <UsersMultiDeleteDialog
        table={table}
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
      />
    </>
  )
}
