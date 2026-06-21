import { forwardRef, type InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
}

export const Input = forwardRef<HTMLInputElement, Props>(({ label, error, hint, className = '', ...props }, ref) => (
  <label className="field">
    {label ? <span className="field__label">{label}</span> : null}
    <input ref={ref} className={`input ${error ? 'input--error' : ''} ${className}`} {...props} />
    {error ? <span className="field__error">{error}</span> : hint ? <span className="field__hint">{hint}</span> : null}
  </label>
))
Input.displayName = 'Input'
