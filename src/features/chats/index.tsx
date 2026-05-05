import {
  Fragment,
  type FormEvent,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { format, parseISO } from 'date-fns'
import {
  ArrowLeft,
  Loader2,
  MoreVertical,
  Edit,
  Paperclip,
  Phone,
  ImagePlus,
  Plus,
  Search as SearchIcon,
  Send,
  Video,
  MessagesSquare,
  RefreshCw,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import {
  flattenMessagePages,
  useConversations,
  useMarkConversationRead,
  useMessages,
  useSendMessage,
} from './api/messaging-api'
import { NewChat } from './components/new-chat'
import {
  type MessagingConversation,
  type MessagingMessage,
} from './data/messaging-schema'

const POLL_MS = 30_000

function displayName(conv: MessagingConversation) {
  return conv.clientName?.trim() || conv.clientEmail
}

function initials(conv: MessagingConversation) {
  const s = displayName(conv)
  return s
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || '?'
}

function groupMessagesByDay(messages: MessagingMessage[]) {
  const groups: { dateKey: string; items: MessagingMessage[] }[] = []
  for (const m of messages) {
    const dateKey = format(parseISO(m.createdAt), 'd MMM, yyyy')
    const last = groups[groups.length - 1]
    if (last?.dateKey === dateKey) last.items.push(m)
    else groups.push({ dateKey, items: [m] })
  }
  return groups
}

export function Chats() {
  const [listSearch, setListSearch] = useState('')
  const [selectedConversationId, setSelectedConversationId] = useState<
    string | null
  >(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [newChatOpen, setNewChatOpen] = useState(false)
  const [draft, setDraft] = useState('')

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const {
    data: conversationsPayload,
    isLoading: convoLoading,
    isError: convoError,
    refetch: refetchConversations,
    isFetching: convoFetching,
  } = useConversations({ refetchInterval: POLL_MS })

  const conversations = conversationsPayload?.data ?? []

  const filteredConversations = useMemo(() => {
    const q = listSearch.trim().toLowerCase()
    if (!q) return conversations
    return conversations.filter((c) => {
      const name = (c.clientName ?? '').toLowerCase()
      const email = c.clientEmail.toLowerCase()
      const tenant = (c.tenantName ?? '').toLowerCase()
      return (
        name.includes(q) || email.includes(q) || tenant.includes(q)
      )
    })
  }, [conversations, listSearch])

  const selectedConversation =
    selectedConversationId == null
      ? null
      : conversations.find((c) => c.id === selectedConversationId) ?? null

  const {
    data: messagePages,
    isLoading: messagesLoading,
    isError: messagesError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useMessages(selectedConversationId)

  const flatMessages = useMemo(
    () => flattenMessagePages(messagePages?.pages ?? []),
    [messagePages?.pages]
  )

  const grouped = useMemo(
    () => groupMessagesByDay(flatMessages),
    [flatMessages]
  )

  const { mutate: markConversationRead } = useMarkConversationRead()
  const sendMessage = useSendMessage()

  useEffect(() => {
    if (!selectedConversationId) return
    markConversationRead(selectedConversationId)
  }, [selectedConversationId, markConversationRead])

  useLayoutEffect(() => {
    if (!selectedConversationId || messagesLoading) return
    messagesEndRef.current?.scrollIntoView({ behavior: 'auto' })
  }, [selectedConversationId, messagesLoading])

  const handleSelectConversation = (conv: MessagingConversation) => {
    setSelectedConversationId(conv.id)
    setMobileOpen(true)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const body = draft.trim()
    if (!body || !selectedConversationId) return
    sendMessage.mutate(
      { conversationId: selectedConversationId, body: { body } },
      {
        onSuccess: () => {
          setDraft('')
          requestAnimationFrame(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
          })
        },
      }
    )
  }

  const lastPreview = (conv: MessagingConversation) => {
    const lm = conv.lastMessage
    if (!lm) return 'No messages yet'
    if (lm.senderRole === 'ADMIN') return `You: ${lm.body}`
    return lm.body
  }

  return (
    <>
      <Header>
        <Search />
        <div className='ms-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>

      <Main fixed>
        <section className='flex h-full gap-6'>
          <div className='flex w-full flex-col gap-2 sm:w-56 lg:w-72 2xl:w-80'>
            <div className='sticky top-0 z-10 -mx-4 bg-background px-4 pb-3 shadow-md sm:static sm:z-auto sm:mx-0 sm:p-0 sm:shadow-none'>
              <div className='flex items-center justify-between py-2'>
                <div className='flex gap-2'>
                  <h1 className='text-2xl font-bold'>Inbox</h1>
                  <MessagesSquare size={20} />
                </div>

                <div className='flex items-center gap-1'>
                  <Button
                    size='icon'
                    variant='ghost'
                    className='rounded-lg'
                    title='Refresh'
                    onClick={() => void refetchConversations()}
                    disabled={convoFetching}
                  >
                    <RefreshCw
                      className={cn(
                        'size-5 stroke-muted-foreground',
                        convoFetching && 'animate-spin'
                      )}
                    />
                  </Button>
                  <Button
                    size='icon'
                    variant='ghost'
                    onClick={() => setNewChatOpen(true)}
                    className='rounded-lg'
                  >
                    <Edit size={24} className='stroke-muted-foreground' />
                  </Button>
                </div>
              </div>

              <label
                className={cn(
                  'focus-within:ring-1 focus-within:ring-ring focus-within:outline-hidden',
                  'flex h-10 w-full items-center space-x-0 rounded-md border border-border ps-2'
                )}
              >
                <SearchIcon size={15} className='me-2 stroke-slate-500' />
                <span className='sr-only'>Search</span>
                <input
                  type='text'
                  className='w-full flex-1 bg-inherit text-sm focus-visible:outline-hidden'
                  placeholder='Search conversations…'
                  value={listSearch}
                  onChange={(e) => setListSearch(e.target.value)}
                />
              </label>
            </div>

            <ScrollArea className='-mx-3 h-full overflow-scroll p-3'>
              {convoLoading ? (
                <div className='flex justify-center py-12'>
                  <Loader2 className='size-8 animate-spin text-primary' />
                </div>
              ) : convoError ? (
                <p className='py-8 text-center text-sm text-destructive'>
                  Could not load conversations. Ensure you are signed in as an
                  admin (JWT with isAdmin).
                </p>
              ) : filteredConversations.length === 0 ? (
                <p className='py-8 text-center text-sm text-muted-foreground'>
                  {conversations.length === 0
                    ? 'No conversations yet. Start one with +.'
                    : 'No matches for your search.'}
                </p>
              ) : (
                filteredConversations.map((conv) => (
                  <Fragment key={conv.id}>
                    <button
                      type='button'
                      className={cn(
                        'group hover:bg-accent hover:text-accent-foreground',
                        'flex w-full rounded-md px-2 py-2 text-start text-sm',
                        selectedConversationId === conv.id && 'sm:bg-muted'
                      )}
                      onClick={() => handleSelectConversation(conv)}
                    >
                      <div className='flex w-full min-w-0 gap-2'>
                        <Avatar>
                          <AvatarImage
                            src={conv.avatarUrl ?? undefined}
                            alt=''
                          />
                          <AvatarFallback>{initials(conv)}</AvatarFallback>
                        </Avatar>
                        <div className='min-w-0 flex-1'>
                          <div className='flex items-center justify-between gap-1'>
                            <span className='truncate font-medium'>
                              {displayName(conv)}
                            </span>
                            {conv.unreadCount > 0 && (
                              <Badge
                                variant='default'
                                className='h-5 min-w-5 shrink-0 px-1 text-[10px]'
                              >
                                {conv.unreadCount > 99
                                  ? '99+'
                                  : conv.unreadCount}
                              </Badge>
                            )}
                          </div>
                          <span className='line-clamp-2 text-ellipsis text-muted-foreground group-hover:text-accent-foreground/90'>
                            {lastPreview(conv)}
                          </span>
                        </div>
                      </div>
                    </button>
                    <Separator className='my-1' />
                  </Fragment>
                ))
              )}
            </ScrollArea>
          </div>

          {selectedConversationId ? (
            <div
              className={cn(
                'absolute inset-0 start-full z-50 hidden w-full flex-1 flex-col border bg-background shadow-xs sm:static sm:z-auto sm:flex sm:rounded-md',
                mobileOpen && 'start-0 flex'
              )}
            >
              <div className='mb-1 flex flex-none justify-between bg-card p-4 shadow-lg sm:rounded-t-md'>
                <div className='flex gap-3'>
                  <Button
                    size='icon'
                    variant='ghost'
                    className='-ms-2 h-full sm:hidden'
                    onClick={() => setMobileOpen(false)}
                  >
                    <ArrowLeft className='rtl:rotate-180' />
                  </Button>
                  <div className='flex items-center gap-2 lg:gap-4'>
                    <Avatar className='size-9 lg:size-11'>
                      <AvatarImage
                        src={selectedConversation?.avatarUrl ?? undefined}
                        alt=''
                      />
                      <AvatarFallback>
                        {selectedConversation
                          ? initials(selectedConversation)
                          : '…'}
                      </AvatarFallback>
                    </Avatar>
                    <div className='min-w-0'>
                      <span className='col-start-2 row-span-2 block text-sm font-medium lg:text-base'>
                        {selectedConversation
                          ? displayName(selectedConversation)
                          : 'Conversation'}
                      </span>
                      <span className='col-start-2 row-span-2 row-start-2 line-clamp-1 block max-w-32 text-xs text-nowrap text-ellipsis text-muted-foreground lg:max-w-none lg:text-sm'>
                        {selectedConversation?.tenantName ??
                          selectedConversation?.clientEmail ??
                          ' '}
                      </span>
                    </div>
                  </div>
                </div>

                <div className='-me-1 flex items-center gap-1 lg:gap-2'>
                  <Button
                    size='icon'
                    variant='ghost'
                    className='hidden size-8 rounded-full sm:inline-flex lg:size-10'
                    type='button'
                    disabled
                  >
                    <Video size={22} className='stroke-muted-foreground' />
                  </Button>
                  <Button
                    size='icon'
                    variant='ghost'
                    className='hidden size-8 rounded-full sm:inline-flex lg:size-10'
                    type='button'
                    disabled
                  >
                    <Phone size={22} className='stroke-muted-foreground' />
                  </Button>
                  <Button
                    size='icon'
                    variant='ghost'
                    className='h-10 rounded-md sm:h-8 sm:w-4 lg:h-10 lg:w-6'
                    type='button'
                    disabled
                  >
                    <MoreVertical className='stroke-muted-foreground sm:size-5' />
                  </Button>
                </div>
              </div>

              <div className='flex flex-1 flex-col gap-2 rounded-md px-4 pt-0 pb-4'>
                <div className='flex min-h-0 flex-1 flex-col'>
                  {hasNextPage && (
                    <div className='flex shrink-0 justify-center py-2'>
                      <Button
                        type='button'
                        variant='outline'
                        size='sm'
                        disabled={isFetchingNextPage}
                        onClick={() => void fetchNextPage()}
                      >
                        {isFetchingNextPage ? (
                          <>
                            <Loader2 className='me-2 size-4 animate-spin' />
                            Loading older…
                          </>
                        ) : (
                          'Load older messages'
                        )}
                      </Button>
                    </div>
                  )}
                  <div className='flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto py-2 pe-2'>
                    {messagesLoading ? (
                      <div className='flex flex-1 items-center justify-center py-20'>
                        <Loader2 className='size-8 animate-spin text-primary' />
                      </div>
                    ) : messagesError ? (
                      <p className='py-12 text-center text-sm text-destructive'>
                        Failed to load messages.
                      </p>
                    ) : flatMessages.length === 0 ? (
                      <p className='py-12 text-center text-sm text-muted-foreground'>
                        No messages yet. Send one below.
                      </p>
                    ) : (
                      grouped.map(({ dateKey, items }) => (
                        <div
                          key={dateKey}
                          className='flex flex-col gap-2'
                        >
                          <div className='text-center text-xs text-muted-foreground'>
                            {dateKey}
                          </div>
                          {items.map((msg) => {
                            const isAdmin = msg.senderRole === 'ADMIN'
                            return (
                              <div
                                key={msg.id}
                                className={cn(
                                  'chat-box max-w-[85%] px-3 py-2 wrap-break-word shadow-lg',
                                  isAdmin
                                    ? 'self-end rounded-[16px_16px_0_16px] bg-primary/90 text-primary-foreground/90'
                                    : 'self-start rounded-[16px_16px_16px_0] bg-muted'
                                )}
                              >
                                <p className='whitespace-pre-wrap'>{msg.body}</p>
                                <span
                                  className={cn(
                                    'mt-1 block text-xs font-light italic',
                                    isAdmin
                                      ? 'text-end text-primary-foreground/85'
                                      : 'text-foreground/75'
                                  )}
                                >
                                  {format(parseISO(msg.createdAt), 'h:mm a')}
                                </span>
                              </div>
                            )
                          })}
                        </div>
                      ))
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </div>

                <form
                  className='flex w-full flex-none gap-2'
                  onSubmit={handleSubmit}
                >
                  <div className='flex flex-1 items-center gap-2 rounded-md border border-input bg-card px-2 py-1 focus-within:ring-1 focus-within:ring-ring focus-within:outline-hidden lg:gap-4'>
                    <div className='space-x-1'>
                      <Button
                        size='icon'
                        type='button'
                        variant='ghost'
                        className='h-8 rounded-md'
                        disabled
                      >
                        <Plus size={20} className='stroke-muted-foreground' />
                      </Button>
                      <Button
                        size='icon'
                        type='button'
                        variant='ghost'
                        className='hidden h-8 rounded-md lg:inline-flex'
                        disabled
                      >
                        <ImagePlus
                          size={20}
                          className='stroke-muted-foreground'
                        />
                      </Button>
                      <Button
                        size='icon'
                        type='button'
                        variant='ghost'
                        className='hidden h-8 rounded-md lg:inline-flex'
                        disabled
                      >
                        <Paperclip
                          size={20}
                          className='stroke-muted-foreground'
                        />
                      </Button>
                    </div>
                    <label className='flex-1'>
                      <span className='sr-only'>Message</span>
                      <input
                        type='text'
                        placeholder='Type your message…'
                        className='h-8 w-full bg-inherit focus-visible:outline-hidden'
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        disabled={sendMessage.isPending}
                      />
                    </label>
                    <Button
                      variant='ghost'
                      size='icon'
                      type='submit'
                      className='hidden sm:inline-flex'
                      disabled={
                        sendMessage.isPending || !draft.trim()
                      }
                    >
                      {sendMessage.isPending ? (
                        <Loader2 className='size-5 animate-spin' />
                      ) : (
                        <Send size={20} />
                      )}
                    </Button>
                  </div>
                  <Button
                    className='h-full sm:hidden'
                    type='submit'
                    disabled={sendMessage.isPending || !draft.trim()}
                  >
                    {sendMessage.isPending ? (
                      <Loader2 className='size-4 animate-spin' />
                    ) : (
                      <>
                        <Send size={18} /> Send
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          ) : (
            <div
              className={cn(
                'absolute inset-0 start-full z-50 hidden w-full flex-1 flex-col justify-center rounded-md border bg-card shadow-xs sm:static sm:z-auto sm:flex'
              )}
            >
              <div className='flex flex-col items-center space-y-6'>
                <div className='flex size-16 items-center justify-center rounded-full border-2 border-border'>
                  <MessagesSquare className='size-8' />
                </div>
                <div className='space-y-2 text-center'>
                  <h2 className='text-xl font-semibold'>Your messages</h2>
                  <p className='text-sm text-muted-foreground'>
                    Choose a conversation or start a new one with a client.
                  </p>
                </div>
                <Button onClick={() => setNewChatOpen(true)}>
                  New message
                </Button>
              </div>
            </div>
          )}
        </section>
        <NewChat
          open={newChatOpen}
          onOpenChange={setNewChatOpen}
          onConversationOpened={async (id) => {
            setSelectedConversationId(id)
            setMobileOpen(true)
            await refetchConversations()
          }}
        />
      </Main>
    </>
  )
}
