import type { PropsWithChildren } from 'react'
import { Button } from '@/components/ui/Button'
import { Loader } from '@/components/ui/Loader'

export function AsyncState({ loading, error, empty, onRetry, children }: PropsWithChildren<{
  loading: boolean; error?: string; empty?: boolean; onRetry?: () => void
}>) {
  if (loading) return <Loader />
  if (error) return <div className="state state--error"><span>!</span><h3>Couldn’t load this page</h3><p>{error}</p>{onRetry ? <Button onClick={onRetry}>Try again</Button> : null}</div>
  if (empty) return <div className="state"><span className="state__icon">◇</span><h3>Nothing here yet</h3><p>New records will appear here when the backend returns them.</p></div>
  return children
}
