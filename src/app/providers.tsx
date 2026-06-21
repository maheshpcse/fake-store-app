import { RouterProvider } from 'react-router-dom'
import { ToastViewport } from '@/components/ui/Toast'
import { router } from './router'

export function AppProviders() {
  return <><RouterProvider router={router} /><ToastViewport /></>
}
