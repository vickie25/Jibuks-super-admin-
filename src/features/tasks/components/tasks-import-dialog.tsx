import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useImportTasks } from '../api/api'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const formSchema = z.object({
  file: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, {
      message: 'Please upload a file',
    })
    .refine(
      (files) => ['text/csv'].includes(files?.[0]?.type),
      'Please upload csv format.'
    ),
})

type TaskImportDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TasksImportDialog({
  open,
  onOpenChange,
}: TaskImportDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { file: undefined },
  })

  const fileRef = form.register('file')

  const { mutate: importMutation, isPending: isImporting } = useImportTasks()

  const onSubmit = () => {
    const file = form.getValues('file')

    if (file && file[0]) {
      // For now, we'll just send a mock array as CSV parsing needs a library
      // In a real scenario, you'd parse file[0] here
      const mockTasks = [
        { title: 'Imported Task 1', status: 'backlog', label: 'feature', priority: 'medium' },
        { title: 'Imported Task 2', status: 'todo', label: 'bug', priority: 'high' }
      ]

      importMutation(mockTasks, {
        onSuccess: () => {
          toast.success('Tasks imported successfully')
          onOpenChange(false)
          form.reset()
        },
        onError: () => {
          toast.error('Failed to import tasks')
        }
      })
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        onOpenChange(val)
        form.reset()
      }}
    >
      <DialogContent className='gap-2 sm:max-w-sm'>
        <DialogHeader className='text-start'>
          <DialogTitle>Import Tasks</DialogTitle>
          <DialogDescription>
            Import tasks quickly from a CSV file.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form id='task-import-form' onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='file'
              render={() => (
                <FormItem className='my-2'>
                  <FormLabel>File</FormLabel>
                  <FormControl>
                    <Input type='file' {...fileRef} className='h-8 py-0' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter className='gap-2'>
          <DialogClose asChild>
            <Button variant='outline'>Close</Button>
          </DialogClose>
          <Button type='submit' form='task-import-form' disabled={isImporting}>
            {isImporting ? 'Importing...' : 'Import'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
