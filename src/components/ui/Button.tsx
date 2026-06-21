import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'

type Props = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  loading?: boolean
}>

export function Button({ children, variant = 'primary', loading, className = '', disabled, ...props }: Props) {
  return (
    <button className={`button button--${variant} ${className}`} disabled={disabled || loading} {...props}>
      {loading ? <span className="button__spinner" /> : null}
      {loading ? 'Please wait…' : children}
    </button>
  )
}
