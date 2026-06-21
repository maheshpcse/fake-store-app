import { useCallback, useEffect, useState } from 'react'
import { getApiError } from '@/lib/axios'

export function useAsync<T>(loader: () => Promise<T>, dependencies: unknown[] = []) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const run = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      setData(await loader())
    } catch (err) {
      setError(getApiError(err))
    } finally {
      setLoading(false)
    }
  }, dependencies) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { void run() }, [run])
  return { data, loading, error, refetch: run, setData }
}
