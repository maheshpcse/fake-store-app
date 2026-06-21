export const statusTone = (status: string): 'success' | 'warning' | 'danger' | 'info' | 'neutral' => {
  const value = status.toLowerCase()
  if (['success', 'paid', 'delivered', 'completed', 'active', 'processed'].some((item) => value.includes(item))) return 'success'
  if (['failed', 'cancelled', 'error', 'inactive'].some((item) => value.includes(item))) return 'danger'
  if (['pending', 'processing', 'shipped'].some((item) => value.includes(item))) return 'warning'
  return 'info'
}
