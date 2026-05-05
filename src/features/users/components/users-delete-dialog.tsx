'use client'

import { useState } from 'react'
import { AlertTriangle } from 'lucide-react'
import { showSubmittedData } from '@/lib/show-submitted-data'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { type Tenant } from '../data/tenant-schema'

type TenantDeleteDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: Tenant
}

export function UsersDeleteDialog({
  open,
  onOpenChange,
  currentRow,
}: TenantDeleteDialogProps) {
  const [value, setValue] = useState('')

  const handleDelete = () => {
    if (value.trim() !== currentRow.slug) return

    onOpenChange(false)
    showSubmittedData(currentRow, 'The following tenant has been deleted:')
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      disabled={value.trim() !== currentRow.slug}
      title={
        <span className='text-destructive'>
          <AlertTriangle
            className='me-1 inline-block stroke-destructive'
            size={18}
          />{' '}
          Delete Tenant
        </span>
      }
      desc={
        <div className='space-y-4'>
          <p className='mb-2'>
            Are you sure you want to delete{' '}
            <span className='font-bold'>{currentRow.name}</span>?
            <br />
            This action will permanently remove the tenant{' '}
            <span className='font-bold'>
              {currentRow.slug}
            </span>{' '}
            and all associated data from the platform. This cannot be undone.
          </p>

          <Label className='my-2'>
            Tenant Slug:
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder='Enter slug to confirm deletion.'
            />
          </Label>

          <Alert variant='destructive'>
            <AlertTitle>Warning!</AlertTitle>
            <AlertDescription>
              Please be careful, this operation is permanent and cannot be reversed.
            </AlertDescription>
          </Alert>
        </div>
      }
      confirmText='Delete'
      destructive
    />
  )
}
