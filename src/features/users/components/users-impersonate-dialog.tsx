import { ShieldAlert } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { type Tenant } from '../data/tenant-schema'

type UsersImpersonateDialogProps = {
  currentRow: Tenant | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UsersImpersonateDialog({
  currentRow,
  open,
  onOpenChange,
}: UsersImpersonateDialogProps) {
  if (!currentRow) return null

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader className='text-start'>
          <AlertDialogTitle className='flex items-center gap-2'>
            <ShieldAlert className='h-5 w-5 text-amber-500' />
            Impersonate {currentRow.name}?
          </AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className='space-y-3'>
              <p>
                You will access this account as a super-user. All actions are logged 
                and tied to your administrator profile for security auditing.
              </p>
              <div className='rounded-md bg-muted p-3 text-xs'>
                <p className='font-semibold mb-1'>{currentRow.name}</p>
                <p className='text-muted-foreground'>ID: {currentRow.slug.toUpperCase()}</p>
                <p className='mt-2 text-amber-600 dark:text-amber-400'>
                  Sensitive operation. Proceed only for support or debugging purposes. 
                  Your session ID will be logged for 24 hours.
                </p>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            onClick={() => {
              // Implementation of impersonation logic
              console.log(`Impersonating tenant: ${currentRow.id}`)
              onOpenChange(false)
            }}
          >
            Start Session
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
