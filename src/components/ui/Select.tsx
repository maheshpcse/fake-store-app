import { forwardRef, type SelectHTMLAttributes } from 'react'

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: Array<{ label: string; value: string | number }>
}

export const Select = forwardRef<HTMLSelectElement, Props>(({ label, error, options, ...props }, ref) => (
  <label className="field">
    {label ? <span className="field__label">{label}</span> : null}
    <select ref={ref} className={`input ${error ? 'input--error' : ''}`} {...props}>
      {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
    </select>
    {error ? <span className="field__error">{error}</span> : null}
  </label>
))
Select.displayName = 'Select'
