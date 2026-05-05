import { useEffect, useState } from 'react'
import { Check, Loader2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useCreateConversation, useMessagingClients } from '../api/messaging-api'
import { type MessagingClient } from '../data/messaging-schema'

type NewChatProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConversationOpened: (conversationId: string) => void
}

function displayName(client: MessagingClient) {
  return client.name?.trim() || client.email
}

export function NewChat({
  open,
  onOpenChange,
  onConversationOpened,
}: NewChatProps) {
  const [searchInput, setSearchInput] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [selectedClient, setSelectedClient] = useState<MessagingClient | null>(
    null
  )

  useEffect(() => {
    const t = window.setTimeout(() => setDebouncedSearch(searchInput), 300)
    return () => window.clearTimeout(t)
  }, [searchInput])

  const { data, isLoading, isError } = useMessagingClients({
    page: 1,
    limit: 50,
    search: debouncedSearch,
    status: 'active',
  })

  const { mutate: createConversation, isPending } = useCreateConversation()

  const clients = data?.data ?? []

  const handleOpenChange = (newOpen: boolean) => {
    onOpenChange(newOpen)
    if (!newOpen) {
      setSelectedClient(null)
      setSearchInput('')
      setDebouncedSearch('')
    }
  }

  const handleStartChat = () => {
    if (!selectedClient) return
    createConversation(
      { clientId: selectedClient.id },
      {
        onSuccess: (conv) => {
          onConversationOpened(conv.id)
          handleOpenChange(false)
        },
      }
    )
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>New message</DialogTitle>
          <DialogDescription>
            Search for a tenant client and open a conversation. One thread per
            client.
          </DialogDescription>
        </DialogHeader>
        <div className='flex flex-col gap-4'>
          <div className='flex flex-wrap items-baseline-last gap-2'>
            <span className='min-h-6 text-sm text-muted-foreground'>To:</span>
            {selectedClient && (
              <Badge key={selectedClient.id} variant='default'>
                {displayName(selectedClient)}
                <button
                  type='button'
                  className='ms-1 rounded-full ring-offset-background outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2'
                  onClick={() => setSelectedClient(null)}
                >
                  <span className='sr-only'>Remove</span>×
                </button>
              </Badge>
            )}
          </div>
          <Command className='rounded-lg border' shouldFilter={false}>
            <CommandInput
              placeholder='Search by name or email...'
              className='text-foreground'
              value={searchInput}
              onValueChange={setSearchInput}
            />
            <CommandList>
              {isLoading ? (
                <div className='flex items-center justify-center gap-2 py-6 text-sm text-muted-foreground'>
                  <Loader2 className='size-4 animate-spin' />
                  Loading clients…
                </div>
              ) : isError ? (
                <div className='py-6 text-center text-sm text-destructive'>
                  Could not load clients. Check your connection and admin token.
                </div>
              ) : (
                <>
                  <CommandEmpty>No clients found.</CommandEmpty>
                  <CommandGroup>
                    {clients.map((client) => {
                      const active = selectedClient?.id === client.id
                      return (
                        <CommandItem
                          key={client.id}
                          value={`${client.id}-${client.email}`}
                          onSelect={() => setSelectedClient(client)}
                          className='flex items-center justify-between gap-2'
                        >
                          <div className='flex items-center gap-2'>
                            <img
                              src={client.avatarUrl || '/placeholder.svg'}
                              alt=''
                              className='h-8 w-8 rounded-full'
                            />
                            <div className='flex flex-col'>
                              <span className='text-sm font-medium'>
                                {displayName(client)}
                              </span>
                              <span className='text-xs text-muted-foreground'>
                                {client.email}
                                {client.tenantName
                                  ? ` · ${client.tenantName}`
                                  : ''}
                              </span>
                            </div>
                          </div>
                          {active && <Check className='h-4 w-4' />}
                        </CommandItem>
                      )
                    })}
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
          <Button
            onClick={handleStartChat}
            disabled={!selectedClient || isPending}
          >
            {isPending ? (
              <>
                <Loader2 className='me-2 size-4 animate-spin' />
                Opening…
              </>
            ) : (
              'Open conversation'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
