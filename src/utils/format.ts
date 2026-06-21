export const currency = (value: number | string, code = 'USD') =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: code }).format(Number(value || 0))

export const dateTime = (value?: string) =>
  value ? new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value)) : '—'

export const titleCase = (value: string) =>
  value.replaceAll('_', ' ').replace(/\b\w/g, (letter) => letter.toUpperCase())
